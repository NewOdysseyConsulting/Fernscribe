import { NextRequest, NextResponse } from 'next/server'
import { generateUploadURL } from '@vercel/blob'

export async function POST(req: NextRequest) {
  const { filename, contentType } = await req.json()
  const { url } = await generateUploadURL({ access: 'public', contentType, tokenPayload: { filename } })
  return NextResponse.json({ url })
}