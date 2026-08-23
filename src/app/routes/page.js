import { routes } from "@/data/routes";
import { getDestination } from "@/data/destinations";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Plan a Route — LankaTrail",
  description: "Pick a curated backpacker route through Sri Lanka — cost, duration, and stops.",
};

export default function RoutesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Reveal>
        <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">
          Plan a Route
        </h1>
        <p className="text-ink/70 text-lg mb-12">
          Every route starts and ends in Colombo. Pick based on your time and style.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5">
        {routes.map((route, i) => {
          const uniqueSlugs = [...new Set(route.destinationSlugs)];
          const previewDests = uniqueSlugs
            .slice(0, 4)
            .map((s) => getDestination(s)?.name)
            .filter(Boolean);

          return (
            <Reveal key={route.slug} delay={(i % 2) * 80}>
              <Link
                href={`/routes/${route.slug}`}
                className="card-press group block border border-ink/10 rounded-2xl p-5 md:p-6 bg-white hover:border-rust hover:shadow-lift transition-all duration-300 h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-jungle/5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block text-xs font-mono font-medium text-rust border-2 border-rust/40 rounded-full px-3 py-1 -rotate-2 tracking-wide uppercase">
                      {route.popularity}
                    </span>
                    <span className="text-xs text-ink/50 font-medium">{route.days}</span>
                  </div>
                  <p className="font-display font-bold text-xl md:text-2xl mb-1 group-hover:text-rust transition-colors">{route.name}</p>
                  <p className="text-ink/60 text-sm mb-4">{route.tagline}</p>
                  <p className="text-xs text-ink/50 flex items-center gap-1.5 flex-wrap">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-jungle" />
                    {uniqueSlugs.length} stops · {previewDests.join(" → ")}
                    {uniqueSlugs.length > 4 ? "..." : ""}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
