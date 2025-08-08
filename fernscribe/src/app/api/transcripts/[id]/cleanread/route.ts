import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { cleanReadText } from '@/lib/cleanRead'

type Params = { params: { id: string } }

export async function POST(_req: NextRequest, { params }: Params) {
  const t = await prisma.transcript.findUnique({
    where: { id: params.id },
    include: { segments: true },
  })
  if (!t) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const full = t.segments.sort((a, b) => a.startMs - b.startMs).map((s) => s.text).join(' ')
  const cleaned = cleanReadText(full)
  const cr = await prisma.cleanRead.upsert({
    where: { transcriptId: t.id },
    update: { text: cleaned },
    create: { transcript: { connect: { id: t.id } }, transcriptId: t.id, text: cleaned },
  })
  return NextResponse.json({ cleanReadId: cr.id, text: cleaned })
}