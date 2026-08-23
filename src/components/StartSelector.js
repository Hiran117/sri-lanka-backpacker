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
  const [mode, setMode] = useState(null);
  const router = useRouter();

  return (
    <div className="bg-parchment/95 backdrop-blur-md border border-parchment-light/30 rounded-2xl p-5 md:p-8 max-w-xl mx-auto shadow-lift">
      <p className="font-display font-semibold text-lg md:text-xl mb-4 text-ink">
        Where are you starting from?
      </p>

      {!mode && (
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            onClick={() => setMode("routes")}
            className="rounded-xl bg-jungle text-parchment py-3.5 px-4 font-medium hover:bg-jungle-light transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Just landed — pick a route
          </button>
          <button
            onClick={() => setMode("select")}
            className="rounded-xl border-2 border-jungle text-jungle py-3.5 px-4 font-medium hover:bg-jungle/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            I'm already at a place
          </button>
        </div>
      )}

      {mode === "routes" && (
        <div className="flex flex-col gap-2.5">
          {routes.map((route) => (
            <button
              key={route.slug}
              onClick={() => router.push(`/routes/${route.slug}`)}
              className="text-left rounded-xl border border-ink/10 p-4 hover:border-rust hover:shadow-soft transition-all duration-300 bg-white hover:scale-[1.01] active:scale-[0.99]"
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
            className="text-sm text-ink/50 mt-2 text-left hover:text-ink/70 transition-colors"
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
              className="text-left rounded-lg border border-ink/10 py-3 px-4 hover:border-rust hover:text-rust hover:bg-rust/5 transition-all duration-300 font-medium"
            >
              {d.name}
            </button>
          ))}
          <button
            onClick={() => setMode(null)}
            className="text-sm text-ink/50 mt-2 text-left hover:text-ink/70 transition-colors"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}
