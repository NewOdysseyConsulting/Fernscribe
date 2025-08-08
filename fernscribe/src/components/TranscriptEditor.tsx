"use client"

import { useEffect, useRef, useState } from 'react'

type Segment = { id: string; startMs: number; endMs: number; text: string }

export default function TranscriptEditor({ segments }: { segments: Segment[] }) {
  const [query, setQuery] = useState('')
  const [replace, setReplace] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query) return
    const el = containerRef.current
    if (!el) return
    const mark = el.querySelector('mark')
    mark?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [query])

  const highlighted = segments.map((s) => {
    const text = query
      ? s.text.replace(new RegExp(query, 'ig'), (m) => `<mark class="bg-yellow-200">${m}</mark>`)
      : s.text
    return { ...s, text }
  })

  const onReplaceAll = () => {
    if (!query) return
    // In MVP, client-side replace only for display
    const re = new RegExp(query, 'ig')
    highlighted.forEach((s) => (s.text = s.text.replace(re, replace)))
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input className="border px-2 py-1 rounded" placeholder="Find" value={query} onChange={(e) => setQuery(e.target.value)} />
        <input className="border px-2 py-1 rounded" placeholder="Replace" value={replace} onChange={(e) => setReplace(e.target.value)} />
        <button className="px-3 py-1.5 rounded border" onClick={onReplaceAll}>Replace All</button>
      </div>
      <div ref={containerRef} className="prose max-w-none">
        {highlighted.map((s) => (
          <p key={s.id} dangerouslySetInnerHTML={{ __html: s.text }} />
        ))}
      </div>
    </div>
  )
}