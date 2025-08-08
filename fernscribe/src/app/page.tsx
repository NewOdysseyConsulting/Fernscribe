import UploadBox from '@/components/UploadBox'

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Upload audio/video</h1>
        <p className="text-slate-600">MP3/WAV/MP4 • ≤ 2 hrs • ≤ 2 GB</p>
      </div>
      <UploadBox />
    </div>
  )
}