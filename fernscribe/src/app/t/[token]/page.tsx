import { prisma } from '@/lib/db'

export default async function PublicTranscript({ params }: { params: { token: string } }) {
  const t = await prisma.transcript.findFirst({
    where: { publicToken: params.token },
    include: { segments: { orderBy: { startMs: 'asc' } } },
  })
  if (!t) return <div className="text-slate-600">Not found</div>
  const text = t.segments.map((s) => s.text).join(' ')
  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none opacity-10 select-none grid place-items-center">
        <div className="rotate-[-15deg] text-6xl font-black">FERNSCRIBE</div>
      </div>
      <div className="relative bg-white p-6 rounded border">
        <h1 className="text-xl font-semibold mb-2">Transcript</h1>
        <p className="text-slate-800 leading-7">{text}</p>
      </div>
    </div>
  )
}