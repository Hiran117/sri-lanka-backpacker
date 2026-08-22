"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="bg-white/60 border border-ink/10 rounded-2xl p-6 md:p-8 max-w-xl mx-auto shadow-sm">
      <p className="font-display font-semibold text-lg mb-4">
        Where are you starting from?
      </p>

      {!mode && (
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            onClick={() => router.push("/routes/full-circuit")}
            className="rounded-xl bg-tea text-cream py-3 px-4 font-medium hover:bg-tea/90 transition-colors"
          >
            Just landed — guide me A to Z
          </button>
          <button
            onClick={() => setMode("select")}
            className="rounded-xl border border-tea text-tea py-3 px-4 font-medium hover:bg-tea/10 transition-colors"
          >
            I'm already at a place
          </button>
        </div>
      )}

      {mode === "select" && (
        <div className="flex flex-col gap-2">
          {destinations.map((d) => (
            <button
              key={d.slug}
              onClick={() => router.push(`/destinations/${d.slug}`)}
              className="text-left rounded-lg border border-ink/10 py-2.5 px-4 hover:border-terracotta hover:text-terracotta transition-colors"
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