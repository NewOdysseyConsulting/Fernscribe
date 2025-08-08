"use client"

import { useEffect, useMemo, useState } from 'react'

type Segment = { id: string; startMs: number; endMs: number; text: string }

type Transcript = {
  id: string
  segments: Segment[]
  cleanReadId?: string | null
}

export default function TranscriptPage({ params }: { params: { id: string } }) {
  const [t, setT] = useState<Transcript | null>(null)
  const [clean, setClean] = useState(false)
  const [cleanText, setCleanText] = useState<string | null>(null)

  useEffect(() => {
    const fetchT = async () => {
      const data = await fetch(`/api/transcripts/${params.id}`, { cache: 'no-store' }).then((r) => r.json())
      setT(data)
    }
    fetchT()
    const iv = setInterval(fetchT, 5000)
    return () => clearInterval(iv)
  }, [params.id])

  const fullText = useMemo(() => t?.segments?.map((s) => s.text).join(' ') || '', [t])

  const onToggleClean = async () => {
    if (!clean) {
      const res = await fetch(`/api/transcripts/${params.id}/cleanread`, { method: 'POST' }).then((r) => r.json())
      setCleanText(res.text)
    }
    setClean((c) => !c)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Transcript</h1>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded border" onClick={onToggleClean}>
            {clean ? 'Show Original' : 'Clean-Read'}
          </button>
          <form action={`/api/exports/${params.id}`} method="POST">
            <input type="hidden" name="format" value="srt" />
            <button className="px-3 py-1.5 rounded bg-brand-500 text-white">Export SRT</button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {!t && <p className="text-slate-600">Loading…</p>}
        {t && (
          <div className="prose max-w-none">
            <p>{clean ? cleanText ?? 'Generating…' : fullText}</p>
          </div>
        )}
      </div>
    </div>
  )}