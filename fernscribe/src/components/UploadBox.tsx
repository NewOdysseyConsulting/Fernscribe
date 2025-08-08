"use client"

import { useState } from 'react'
import { upload } from '@vercel/blob/client'

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    setFile(f)
  }

  const onUpload = async () => {
    if (!file) return
    if (file.size > 2 * 1024 * 1024 * 1024) {
      setMessage('File exceeds 2GB limit')
      return
    }
    setIsUploading(true)
    setMessage(null)
    try {
      const result = await upload(file.name, file, {
        access: 'public',
        contentType: file.type,
        handleUploadUrl: '/api/upload/handle',
      })

      const blobUrl = result.url
      if (!blobUrl) throw new Error('Blob URL missing')

      const job = await fetch('/api/jobs/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceUrl: blobUrl, filename: file.name }),
      }).then((r) => r.json())

      setMessage(`Uploaded. Processing job ${job.id}. Redirecting...`)
      window.location.href = `/transcripts/${job.transcriptId}`
    } catch (e: any) {
      setMessage(e.message || 'Something went wrong')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="border rounded-lg p-6 bg-slate-50">
      <input type="file" accept="audio/*,video/*" onChange={onFileChange} />
      <button
        className="ml-3 px-4 py-2 rounded bg-brand-500 text-white disabled:opacity-50"
        disabled={!file || isUploading}
        onClick={onUpload}
      >
        {isUploading ? 'Uploading…' : 'Upload & Transcribe'}
      </button>
      {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
    </div>
  )
}