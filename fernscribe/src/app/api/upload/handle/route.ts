import { NextRequest, NextResponse } from 'next/server'
import { handleUpload } from '@vercel/blob/client'

export async function POST(req: NextRequest) {
  const body = await req.json()
  try {
    const result = await handleUpload({
      request: req,
      body,
      onBeforeGenerateToken: async (pathname) => {
        return {
          access: 'public',
          addRandomSuffix: true,
          contentType: undefined,
          cacheControlMaxAge: 60 * 60 * 24 * 365,
        }
      },
      onUploadCompleted: async () => {
        // No-op; URL is returned to client which then triggers the transcribe job
      },
    })

    if (result.type === 'blob.generate-client-token') {
      return NextResponse.json({ clientToken: result.clientToken })
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Upload handling failed' }, { status: 400 })
  }
}