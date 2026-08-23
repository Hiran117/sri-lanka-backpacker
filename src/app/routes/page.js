import { routes } from "@/data/routes";
import { getDestination } from "@/data/destinations";
import Link from "next/link";

export const metadata = {
  title: "Plan a Route — LankaTrail",
  description: "Pick a curated backpacker route through Sri Lanka — cost, duration, and stops.",
};

export default function RoutesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">
        Plan a Route
      </h1>
      <p className="text-ink/70 text-lg mb-12">
        Every route starts and ends in Colombo. Pick based on your time and style.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        {routes.map((route) => {
          const uniqueSlugs = [...new Set(route.destinationSlugs)];
          const previewDests = uniqueSlugs
            .slice(0, 4)
            .map((s) => getDestination(s)?.name)
            .filter(Boolean);

          return (
            <Link
              key={route.slug}
              href={`/routes/${route.slug}`}
              className="group border border-ink/10 rounded-2xl p-5 bg-white hover:border-terracotta hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                  {route.popularity}
                </span>
                <span className="text-xs text-ink/50">{route.days}</span>
              </div>
              <p className="font-display font-bold text-xl mb-1">{route.name}</p>
              <p className="text-ink/60 text-sm mb-3">{route.tagline}</p>
              <p className="text-xs text-ink/50">
                {uniqueSlugs.length} stops · {previewDests.join(" → ")}
                {uniqueSlugs.length > 4 ? "..." : ""}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}