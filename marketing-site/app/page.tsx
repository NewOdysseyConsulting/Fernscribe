import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoCloud from "@/components/LogoCloud";
import Link from "next/link";

export default function Page() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-subtle-radial" />
      <Navbar />

      {/* Hero */}
      <section className="container flex min-h-[86vh] flex-col items-center justify-center gap-10 pt-24 text-center">
        <div className="surface mx-auto max-w-3xl px-6 py-3 text-xs text-zinc-300">
          <span className="opacity-70">New</span> — Introducing Acme 2.0 with realtime APIs
        </div>
        <h1 className="max-w-5xl bg-gradient-to-b from-white to-zinc-300/80 bg-clip-text text-transparent">
          Build remarkable experiences with a minimalist AI platform
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-300">
          Thoughtfully designed tools that are fast, focused, and effortless to use.
          Start shipping delightful products today.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link href="#cta" className="btn-primary">Start free</Link>
          <Link href="#features" className="btn-ghost">See features</Link>
        </div>
      </section>

      <LogoCloud />

      {/* Features */}
      <section id="features" className="container grid gap-6 py-20 md:grid-cols-3">
        {[
          {
            title: "Effortless",
            description:
              "Clean, opinionated APIs and SDKs that help you build fast without the noise.",
          },
          {
            title: "Performant",
            description:
              "Edge-first architecture, built on modern primitives with sensible defaults.",
          },
          {
            title: "Secure",
            description:
              "Enterprise-grade security with built-in compliance and auditability.",
          },
        ].map((card) => (
          <div key={card.title} className="surface p-6">
            <h3 className="mb-2">{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </section>

      {/* Pricing */}
      <section id="pricing" className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2>Simple, transparent pricing</h2>
          <p className="mt-3 text-zinc-300">Start for free. Scale as you grow.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="surface p-8">
            <h3 className="mb-2">Starter</h3>
            <p className="mb-6 text-zinc-300">Everything you need to launch</p>
            <p className="text-4xl font-semibold">$0</p>
            <p className="mb-6 text-zinc-400">up to 10k requests / mo</p>
            <Link href="#cta" className="btn-primary w-full text-center">Get started</Link>
          </div>
          <div className="surface p-8">
            <h3 className="mb-2">Pro</h3>
            <p className="mb-6 text-zinc-300">For growing teams</p>
            <p className="text-4xl font-semibold">$49</p>
            <p className="mb-6 text-zinc-400">up to 1M requests / mo</p>
            <Link href="#cta" className="btn-primary w-full text-center">Start trial</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-white/10">
            {[
              {
                q: "What is Acme?",
                a: "Acme is a minimalist AI platform that helps you build better products, faster.",
              },
              { q: "Is there a free plan?", a: "Yes, start free with generous limits." },
              { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no lock‑in." },
            ].map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none text-zinc-200">
                  <span className="transition-colors group-open:text-white">{item.q}</span>
                </summary>
                <p className="mt-2 text-zinc-400">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="container py-24">
        <div className="surface mx-auto max-w-3xl p-10 text-center">
          <h2 className="mb-3">Ready to build?</h2>
          <p className="mb-6 text-zinc-300">Create an account in minutes. No credit card required.</p>
          <Link href="#" className="btn-primary">Create account</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}