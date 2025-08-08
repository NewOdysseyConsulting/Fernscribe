import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

type Params = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  const t = await prisma.transcript.findUnique({
    where: { id: params.id },
    include: { segments: { orderBy: { startMs: 'asc' } }, speakers: true },
  })
  if (!t) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(t)
}