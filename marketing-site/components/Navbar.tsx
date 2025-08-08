"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <nav className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-medium tracking-tight text-zinc-200 hover:text-white">
          Acme
        </Link>
        <div className="hidden gap-8 md:flex">
          <Link href="#features" className="text-sm text-zinc-300 hover:text-white">Features</Link>
          <Link href="#pricing" className="text-sm text-zinc-300 hover:text-white">Pricing</Link>
          <Link href="#faq" className="text-sm text-zinc-300 hover:text-white">FAQ</Link>
        </div>
        <div className="hidden md:block">
          <Link href="#cta" className="btn-primary">Start free</Link>
        </div>
        <button aria-label="Toggle menu" className="md:hidden btn-ghost" onClick={() => setOpen(!open)}>
          Menu
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-black/80 p-4 md:hidden">
          <div className="grid gap-3">
            <Link href="#features" className="text-sm text-zinc-300 hover:text-white">Features</Link>
            <Link href="#pricing" className="text-sm text-zinc-300 hover:text-white">Pricing</Link>
            <Link href="#faq" className="text-sm text-zinc-300 hover:text-white">FAQ</Link>
            <Link href="#cta" className="btn-primary w-full text-center">Start free</Link>
          </div>
        </div>
      )}
    </header>
  );
}