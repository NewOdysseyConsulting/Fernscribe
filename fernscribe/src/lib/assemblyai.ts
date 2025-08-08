import { prisma } from '@/lib/db'

const AAI_TOKEN = process.env.ASSEMBLYAI_API_KEY
const AAI_BASE = 'https://api.assemblyai.com/v2'

if (!AAI_TOKEN) {
  // In dev, we allow missing key but calls will fail at runtime
}

async function aaiFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${AAI_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: AAI_TOKEN || '',
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`AssemblyAI error ${res.status}: ${text}`)
  }
  return res.json()
}

export type StartTranscriptionArgs = {
  fileId: string
  sourceUrl: string
  glossaryTerms?: string[]
}

export async function startTranscription({ fileId, sourceUrl, glossaryTerms }: StartTranscriptionArgs) {
  await prisma.job.updateMany({ where: { fileId, status: 'PENDING' }, data: { status: 'PROCESSING' } })

  const body = {
    audio_url: sourceUrl,
    speaker_labels: true,
    word_boost: glossaryTerms && glossaryTerms.length ? glossaryTerms : undefined,
    disfluencies: true,
    auto_chapters: false,
    filter_profanity: false,
    language_detection: true,
    punctuate: true,
    format_text: true,
    webhook_url: undefined,
  }

  const data = await aaiFetch('/transcribe', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  await prisma.job.updateMany({ where: { fileId, status: 'PROCESSING' }, data: { providerId: data.id } })
  return data.id as string
}

export async function pollAndIngestTranscript(jobId: string) {
  const job = await prisma.job.findUnique({ where: { id: jobId }, include: { file: true } })
  if (!job || !job.providerId) throw new Error('Job not found or providerId missing')

  // Poll
  let status = 'queued'
  let transcriptData: any = null
  for (;;) {
    const data = await aaiFetch(`/transcribe/${job.providerId}`)
    if (data.status === 'completed') {
      status = 'completed'
      transcriptData = data
      break
    }
    if (data.status === 'error') {
      await prisma.job.update({ where: { id: job.id }, data: { status: 'FAILED', error: data.error } })
      throw new Error(data.error)
    }
    await new Promise((r) => setTimeout(r, 5000))
  }

  // Ingest
  const existing = await prisma.transcript.findFirst({ where: { fileId: job.fileId } })
  const transcript = existing ?? (await prisma.transcript.create({ data: { fileId: job.fileId } }))

  const speakersMap = new Map<string, string>()
  const speakers = (transcriptData.utterances || []).map((u: any) => u.speaker || 'Speaker')
  Array.from(new Set(speakers)).forEach((label, idx) => speakersMap.set(label, `S${idx + 1}`))

  await prisma.$transaction([
    prisma.segment.deleteMany({ where: { transcriptId: transcript.id } }),
    prisma.speaker.deleteMany({ where: { transcriptId: transcript.id } }),
  ])

  await prisma.speaker.createMany({
    data: Array.from(speakersMap.entries()).map(([label, name]) => ({ transcriptId: transcript.id, label, name })),
  })

  const utterances: any[] = transcriptData.utterances || []
  await prisma.segment.createMany({
    data: utterances.map((u) => ({
      transcriptId: transcript.id,
      startMs: Math.round(u.start || 0),
      endMs: Math.round(u.end || 0),
      text: (u.text || '').trim(),
      speakerId: undefined,
    })),
  })

  await prisma.job.update({ where: { id: job.id }, data: { status: 'COMPLETED' } })
  return transcript.id
}