import { destinations } from "@/data/destinations";
import Link from "next/link";

export const metadata = {
  title: "Full Circuit Guide — LankaTrail",
  description: "The complete backpacker route through Sri Lanka, stop by stop.",
};

export default function FullCircuitPage() {
  const sorted = [...destinations].sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">
        The Full Circuit
      </h1>
      <p className="text-ink/70 text-lg mb-12">
        Just landed? Here's the classic route, start to finish. Tap any stop
        to see how to get there, what to explore, and where to stay.
      </p>

      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-tea/20" />

        <div className="flex flex-col gap-6">
          {sorted.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="relative pl-12 group"
            >
              <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-tea text-cream flex items-center justify-center font-display font-bold text-sm">
                {dest.order}
              </span>
              <div className="border border-ink/10 rounded-xl p-4 bg-white group-hover:border-terracotta transition-colors">
                <p className="font-display font-semibold text-lg">{dest.name}</p>
                <p className="text-ink/60 text-sm">{dest.intro}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}