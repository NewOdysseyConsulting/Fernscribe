import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fernscribe',
  description: 'Transcription that nails diarization & editing',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="min-h-screen bg-white text-slate-900">
            <header className="border-b">
              <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded bg-brand-500" />
                  <span className="font-semibold">Fernscribe</span>
                </div>
                <nav className="text-sm text-slate-600">
                  <a href="/" className="hover:text-slate-900">Upload</a>
                </nav>
              </div>
            </header>
            <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}