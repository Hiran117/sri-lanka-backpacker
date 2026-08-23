"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/data/routes";

const destinations = [
  { slug: "colombo", name: "Colombo" },
  { slug: "kandy", name: "Kandy" },
  { slug: "ella", name: "Ella" },
  { slug: "nuwara-eliya", name: "Nuwara Eliya" },
  { slug: "mirissa", name: "Mirissa" },
  { slug: "galle", name: "Galle" },
];

export default function StartSelector() {
  const [mode, setMode] = useState(null); // null | "routes" | "select"
  const router = useRouter();

  return (
    <div className="bg-white/60 border border-ink/10 rounded-2xl p-6 md:p-8 max-w-xl mx-auto shadow-sm">
      <p className="font-display font-semibold text-lg mb-4">
        Where are you starting from?
      </p>

      {!mode && (
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            onClick={() => setMode("routes")}
            className="rounded-xl bg-jungle text-parchment py-3 px-4 font-medium hover:bg-jungle/90 transition-colors"
          >
            Just landed — pick a route
          </button>
          <button
            onClick={() => setMode("select")}
            className="rounded-xl border border-jungle text-jungle py-3 px-4 font-medium hover:bg-jungle/10 transition-colors"
          >
            I'm already at a place
          </button>
        </div>
      )}

      {mode === "routes" && (
        <div className="flex flex-col gap-3">
          {routes.map((route) => (
            <button
              key={route.slug}
              onClick={() => router.push(`/routes/${route.slug}`)}
              className="text-left rounded-xl border border-ink/10 p-4 hover:border-rust transition-colors bg-white"
            >
              <div className="flex items-center justify-between mb-1">
<span className="inline-block text-xs font-mono font-medium text-rust border-2 border-rust/40 rounded-full px-3 py-1 -rotate-2 tracking-wide uppercase">
                  {route.popularity}
                </span>
                <span className="text-xs text-ink/50">{route.days}</span>
              </div>
              <p className="font-display font-bold">{route.name}</p>
              <p className="text-ink/60 text-sm">{route.tagline}</p>
            </button>
          ))}
          <button
            onClick={() => setMode(null)}
            className="text-sm text-ink/50 mt-2 text-left"
          >
            ← Back
          </button>
        </div>
      )}

      {mode === "select" && (
        <div className="flex flex-col gap-2">
          {destinations.map((d) => (
            <button
              key={d.slug}
              onClick={() => router.push(`/destinations/${d.slug}`)}
              className="text-left rounded-lg border border-ink/10 py-2.5 px-4 hover:border-rust hover:text-rust transition-colors"
            >
              {d.name}
            </button>
          ))}
          <button
            onClick={() => setMode(null)}
            className="text-sm text-ink/50 mt-2 text-left"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}