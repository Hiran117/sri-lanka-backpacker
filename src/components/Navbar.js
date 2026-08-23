"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/routes", label: "Plan a Route" },
  { href: "/blog", label: "Guides" },
];

export default function Navbar({ authSlot }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-parchment/90 backdrop-blur-md border-b border-ink/10 shadow-soft"
          : "bg-parchment/95 backdrop-blur border-b border-ink/5"
      }`}
    >
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
            <Link
              key={l.href}
              href={l.href}
              className={`relative transition-colors duration-200 ${
                isActive(l.href) ? "text-jungle" : "text-ink/70 hover:text-jungle"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-rust" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">{authSlot}</div>

        <button
          className="md:hidden relative w-10 h-10 flex flex-col gap-1.5 justify-center items-center"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`block h-0.5 w-6 bg-ink rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-ink rounded-full transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-ink rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {open && (
        <>
          <div
            className="md:hidden fixed inset-0 top-16 bg-ink/30 backdrop-blur-sm animate-overlay"
            onClick={() => setOpen(false)}
          />
          <nav className="md:hidden fixed top-16 right-0 bottom-0 w-72 max-w-[80vw] bg-parchment-light border-l border-ink/10 shadow-lift animate-slide-in flex flex-col px-5 py-6 gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`py-3.5 px-4 rounded-xl font-medium text-base transition-colors ${
                  isActive(l.href)
                    ? "text-jungle bg-jungle/10"
                    : "text-ink/80 hover:text-jungle hover:bg-ink/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-ink/10">{authSlot}</div>
          </nav>
        </>
      )}
    </header>
  );
}
