import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Acme — Minimalist AI Platform",
    template: "%s — Acme",
  },
  description: "A minimalist, elegant marketing site inspired by Apple and OpenAI.",
  metadataBase: new URL("https://example.com"),
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={
          inter.className +
          " min-h-full bg-black text-zinc-100 antialiased selection:bg-white/20 selection:text-white"
        }
      >
        {children}
      </body>
    </html>
  );
}