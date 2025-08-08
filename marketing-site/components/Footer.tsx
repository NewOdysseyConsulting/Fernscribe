export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
        <p className="text-xs text-zinc-400">© {new Date().getFullYear()} Acme Inc.</p>
        <nav className="flex gap-6 text-xs text-zinc-400">
          <a href="#" className="hover:text-zinc-200">Terms</a>
          <a href="#" className="hover:text-zinc-200">Privacy</a>
          <a href="#" className="hover:text-zinc-200">Contact</a>
        </nav>
      </div>
    </footer>
  );
}