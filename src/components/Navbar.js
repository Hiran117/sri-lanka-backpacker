"use client";
import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/routes", label: "Plan a Route" },
  { href: "/blog", label: "Guides" },
];

export default function Navbar({ authSlot }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-parchment/95 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-1.5 font-display font-bold text-xl text-jungle">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-rust">
          <path
            d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7.05 11.25 7.35 11.5a1 1 0 0 0 1.3 0C12.95 21.25 20 15.25 20 10c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
            fill="currentColor"
          />
          </svg>
            Lanka<span className="text-rust">Trail</span>
        </Link>

        <nav className="hidden md:flex gap-8 font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-ink/80 hover:text-jungle transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">{authSlot}</div>

        <button
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`block h-0.5 w-6 bg-ink transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-ink transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col px-4 pb-4 gap-2 font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="py-2 text-ink/80 hover:text-jungle" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="pt-2">{authSlot}</div>
        </nav>
      )}
    </header>
  );
}