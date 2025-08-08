import { prisma } from '@/lib/db'
import { Document, Packer, Paragraph, TextRun } from 'docx'

function formatTimestamp(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const s = totalSeconds % 60
  const m = Math.floor(totalSeconds / 60) % 60
  const h = Math.floor(totalSeconds / 3600)
  const ms3 = String(ms % 1000).padStart(3, '0')
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${ms3}`
}

export async function getTranscriptData(transcriptId: string) {
  const t = await prisma.transcript.findUnique({
    where: { id: transcriptId },
    include: { segments: { orderBy: { startMs: 'asc' } }, speakers: true, cleanRead: true }
  })
  if (!t) throw new Error('Transcript not found')
  return t
}

export async function generateSRT(transcriptId: string) {
  const t = await getTranscriptData(transcriptId)
  let idx = 1
  const lines = t.segments.map((seg) => {
    const start = formatTimestamp(seg.startMs)
    const end = formatTimestamp(seg.endMs)
    const text = seg.text
    return `${idx++}\n${start} --> ${end}\n${text}\n`
  })
  const header = `NOTE Open in Fernscribe: https://app.fernscribe.com/transcripts/${t.publicToken}\n\n`
  return header + lines.join('\n')
}

export async function generateVTT(transcriptId: string) {
  const t = await getTranscriptData(transcriptId)
  const lines = t.segments.map((seg) => {
    const start = formatTimestamp(seg.startMs).replace(',', '.')
    const end = formatTimestamp(seg.endMs).replace(',', '.')
    const text = seg.text
    return `${start} --> ${end}\n${text}\n`
  })
  const header = `WEBVTT\n\nNOTE Open in Fernscribe: https://app.fernscribe.com/transcripts/${t.publicToken}\n\n`
  return header + lines.join('\n')
}

export async function generateDOCX(transcriptId: string) {
  const t = await getTranscriptData(transcriptId)
  const paragraphs: Paragraph[] = []
  for (const seg of t.segments) {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: `[${formatTimestamp(seg.startMs)}] `, bold: true }),
          new TextRun({ text: seg.text }),
        ],
      })
    )
  }
  const doc = new Document({ sections: [{ properties: {}, children: paragraphs }] })
  const buffer = await Packer.toBuffer(doc)
  return buffer
}

export async function generateTXT(transcriptId: string, text: string) {
  const t = await getTranscriptData(transcriptId)
  const watermark = `\n\n— Open in Fernscribe: https://app.fernscribe.com/transcripts/${t.publicToken}`
  return text + watermark
}