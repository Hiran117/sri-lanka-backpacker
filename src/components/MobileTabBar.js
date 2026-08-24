"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/",
    label: "Home",
    icon: "M3 12l9-9 9 9M5 10v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V10",
  },
  {
    href: "/routes",
    label: "Routes",
    icon: "M4 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM12 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM12 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM20 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6 8v2a2 2 0 0 0 2 2h2M14 8v2a2 2 0 0 1-2 2h0M14 18h4",
  },
  {
    href: "/destinations",
    label: "Places",
    icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  },
  {
    href: "/blog",
    label: "Guides",
    icon: "M4 4a1 1 0 0 1 1-1h6a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H4V4zM20 4a1 1 0 0 0-1-1h-6a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8V4z",
  },
  {
    href: "/signin",
    label: "Account",
    icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c0-4 4-6 8-6s8 2 8 6",
  },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-parchment-light/95 backdrop-blur-md border-t border-ink/10 flex items-stretch justify-around"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {tabs.map((tab) => {
        const active = isActive(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors ${
              active ? "text-rust" : "text-ink/50"
            }`}
          >
            {active && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-rust" />
            )}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={tab.icon} />
            </svg>
            <span className="text-[10px] font-medium leading-none">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
