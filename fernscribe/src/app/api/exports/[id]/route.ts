import { NextRequest, NextResponse } from 'next/server'
import { generateDOCX, generateSRT, generateTXT, generateVTT, getTranscriptData } from '@/lib/exports'

type Params = { params: { id: string } }

export async function POST(req: NextRequest, { params }: Params) {
  let format: string = 'srt'
  let clean = false
  const contentType = req.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const body = await req.json().catch(() => ({}))
    format = body.format || 'srt'
    clean = Boolean(body.clean)
  } else {
    const form = await req.formData()
    format = String(form.get('format') || 'srt')
    clean = String(form.get('clean') || 'false') === 'true'
  }

  const transcriptId = params.id
  if (format === 'srt') {
    const data = await generateSRT(transcriptId)
    return new NextResponse(data, { headers: { 'Content-Type': 'application/x-subrip' } })
  }
  if (format === 'vtt') {
    const data = await generateVTT(transcriptId)
    return new NextResponse(data, { headers: { 'Content-Type': 'text/vtt' } })
  }
  if (format === 'docx') {
    const buf = await generateDOCX(transcriptId)
    const body = new Uint8Array(buf)
    return new NextResponse(body, { headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' } })
  }
  if (format === 'txt') {
    const t = await getTranscriptData(transcriptId)
    const base = clean && t.cleanRead ? (t.cleanRead?.text ?? '') : t.segments.map((s) => s.text).join(' ')
    const txt = await generateTXT(transcriptId, base)
    return new NextResponse(txt, { headers: { 'Content-Type': 'text/plain' } })
  }
  return NextResponse.json({ error: 'Unsupported format' }, { status: 400 })
}