import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { startTranscription, pollAndIngestTranscript } from '@/lib/assemblyai'

export async function POST(req: NextRequest) {
  const { sourceUrl, filename } = await req.json()
  if (!sourceUrl) return NextResponse.json({ error: 'sourceUrl required' }, { status: 400 })

  const file = await prisma.file.create({ data: { sourceUrl, filename } })
  const job = await prisma.job.create({ data: { fileId: file.id, status: 'PENDING' } })
  const transcript = await prisma.transcript.create({ data: { fileId: file.id } })

  // Fire and forget background run
  ;(async () => {
    try {
      const providerId = await startTranscription({ fileId: file.id, sourceUrl })
      await pollAndIngestTranscript(job.id)
    } catch (e) {
      await prisma.job.update({ where: { id: job.id }, data: { status: 'FAILED', error: (e as Error).message } })
    }
  })()

  return NextResponse.json({ id: job.id, transcriptId: transcript.id })
}