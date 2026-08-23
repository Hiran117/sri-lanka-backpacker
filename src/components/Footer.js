import Link from "next/link";

const footerLinks = [
  { href: "/destinations", label: "Destinations" },
  { href: "/routes", label: "Plan a Route" },
  { href: "/blog", label: "Guides" },
  { href: "/signin", label: "Sign In" },
    { href: "/privacy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-parchment/70 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-1.5 font-display font-bold text-xl text-parchment mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-brass">
                <path
                  d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7.05 11.25 7.35 11.5a1 1 0 0 0 1.3 0C12.95 21.25 20 15.25 20 10c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                  fill="currentColor"
                />
              </svg>
              Lanka<span className="text-brass">Trail</span>
            </Link>
            <p className="text-sm leading-relaxed text-parchment/50">
              Built for backpackers, not tour agencies. Real transport routes,
              real costs, real adventures.
            </p>
          </div>

          <nav className="flex flex-col gap-3 md:items-end">
            <p className="text-xs font-mono uppercase tracking-wider text-brass/80 mb-1">
              Explore
            </p>
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-parchment/60 hover:text-parchment hover:translate-x-1 transition-all duration-200 md:text-right"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-parchment/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-parchment/40">
          <p>© {new Date().getFullYear()} LankaTrail — Routes · Costs · Hostels · No fluff.</p>
          <p className="font-mono">Made with 🌴 for Sri Lanka backpackers</p>
        </div>
      </div>
    </footer>
  );
}
