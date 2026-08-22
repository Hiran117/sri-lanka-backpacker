import { destinations } from "@/data/destinations";
import Link from "next/link";

export const metadata = {
  title: "Plan a Route — LankaTrail",
  description: "Train and bus routes between every stop on the Sri Lanka backpacker circuit — cost and duration.",
};

export default function RoutesPage() {
  const sorted = [...destinations].sort((a, b) => a.order - b.order);
  // build legs: skip the first destination (Colombo has no "previous" leg)
  const legs = sorted.slice(1).map((dest) => ({
    from: dest.howYouGotHere.from,
    to: dest.name,
    toSlug: dest.slug,
    options: dest.howYouGotHere.options,
  }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">
        Plan a Route
      </h1>
      <p className="text-ink/70 text-lg mb-12">
        Every leg of the circuit — trains, buses, cost and duration.
      </p>

      <Link
        href="/routes/full-circuit"
        className="block mb-10 border border-tea rounded-xl p-4 bg-tea/5 hover:bg-tea/10 transition-colors"
      >
        <p className="font-display font-semibold text-tea">See the full circuit timeline →</p>
      </Link>

      <div className="flex flex-col gap-8">
        {legs.map((leg) => (
          <div key={leg.toSlug}>
            <div className="flex items-center gap-2 mb-3">
              <p className="font-display font-bold text-lg">
                {leg.from} <span className="text-terracotta">→</span> {leg.to}
              </p>
              <Link
                href={`/destinations/${leg.toSlug}`}
                className="text-sm text-tea hover:underline ml-auto"
              >
                View {leg.to} guide →
              </Link>
            </div>
            <div className="grid gap-2">
              {leg.options.map((opt) => (
                <div
                  key={opt.mode}
                  className="border border-ink/10 rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between gap-1 bg-white"
                >
                  <span className="font-medium">{opt.mode}</span>
                  <span className="text-ink/60 text-sm">
                    {opt.cost} · {opt.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}