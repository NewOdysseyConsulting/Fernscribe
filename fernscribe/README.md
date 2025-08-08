## Fernscribe MVP

Transcription that nails diarization & editing. Next.js (App Router), Clerk, Prisma (Postgres), Vercel Blob, Stripe, AssemblyAI.

### Quickstart

1. Copy `.env.example` to `.env.local` and fill values
2. Install deps: `npm install`
3. Push schema: `npx prisma db push`
4. Run dev: `npm run dev`

### Key routes

- POST `/api/upload/signed-url`
- POST `/api/jobs/transcribe`
- GET `/api/jobs/:id/status`
- GET `/api/transcripts/:id`
- POST `/api/transcripts/:id/cleanread`
- POST `/api/exports/:id` with `{ format: 'srt'|'vtt'|'docx'|'txt', clean?: boolean }`
- POST `/api/stripe/checkout` | `/api/stripe/webhook`

### Notes

- ASR provider: AssemblyAI with speaker labels & disfluencies
- Clean-Read removes filler words client/server-side
- Exports: SRT, VTT, DOCX, TXT (+ watermark link)
- Shareable public link: `/t/[publicToken]`