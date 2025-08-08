function Logo({ label }: { label: string }) {
  return (
    <div className="flex h-10 items-center justify-center text-zinc-500">
      <svg width="100" height="20" viewBox="0 0 100 20" aria-hidden="true">
        <rect width="100" height="20" rx="4" fill="currentColor" opacity="0.12" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.6">
          {label}
        </text>
      </svg>
    </div>
  );
}

export default function LogoCloud() {
  return (
    <div className="container py-12">
      <p className="mb-6 text-center text-sm text-zinc-400">Trusted by teams at</p>
      <div className="grid grid-cols-2 items-center gap-6 opacity-80 sm:grid-cols-3 md:grid-cols-6">
        {[
          "AcmeCo",
          "Globex",
          "Initech",
          "Umbrella",
          "Soylent",
          "Hooli",
        ].map((name) => (
          <Logo key={name} label={name} />
        ))}
      </div>
    </div>
  );
}