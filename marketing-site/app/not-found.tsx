import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center text-center">
      <p className="mb-2 text-sm text-zinc-400">404</p>
      <h1 className="mb-3">Page not found</h1>
      <p className="mb-6 max-w-md text-zinc-400">The page you’re looking for doesn’t exist or has been moved.</p>
      <Link href="/" className="btn-primary">Back home</Link>
    </main>
  );
}