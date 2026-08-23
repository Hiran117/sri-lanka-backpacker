import { routes, getRoute } from "@/data/routes";
import { getDestination } from "@/data/destinations";
import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) return {};
  return {
    title: `${route.name} — LankaTrail`,
    description: route.tagline,
  };
}

export default async function RoutePage({ params }) {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) notFound();

  const session = await auth();
  const signedIn = !!session?.user?.email;

  const stops = route.destinationSlugs
    .map((s) => getDestination(s))
    .filter(Boolean);

  const uniqueStopCount = new Set(route.destinationSlugs).size;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/" className="text-sm text-tea hover:underline mb-4 inline-block">
        ← All routes
      </Link>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
          {route.popularity}
        </span>
        <span className="text-xs text-ink/50">{route.days}</span>
      </div>

      <h1 className="font-display font-bold text-3xl md:text-5xl mb-3">{route.name}</h1>
      <p className="text-ink/70 text-lg mb-10">{route.tagline}</p>

      {!signedIn ? (
        <div className="bg-tea/10 border border-tea/30 rounded-2xl p-6 text-center">
          <p className="font-display font-bold text-lg text-tea mb-2">
            {uniqueStopCount} stops on this route
          </p>
          <p className="text-ink/70 text-sm mb-5">
            Sign up free to see the full day-by-day breakdown, track your progress,
            and check in with GPS as you travel this route.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {[...new Set(route.destinationSlugs)].map((slug) => {
              const d = getDestination(slug);
              return d ? (
                <span
                  key={slug}
                  className="text-xs bg-white border border-ink/10 rounded-full px-3 py-1.5"
                >
                  {d.name}
                </span>
              ) : null;
            })}
          </div>
          <Link
            href="/signup"
            className="inline-block bg-tea text-cream px-6 py-3 rounded-lg text-sm font-semibold hover:bg-tea/90"
          >
            Sign up free
          </Link>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-tea/20" />
          <div className="flex flex-col gap-6">
            {stops.map((dest, i) => (
              <Link
                key={`${dest.slug}-${i}`}
                href={`/destinations/${dest.slug}?route=${route.slug}`}
                className="relative pl-16 group"
              >
                <span className="absolute left-0 top-0 w-12 h-12 rounded-full overflow-hidden ring-4 ring-cream">
                  <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                </span>
                <div className="border border-ink/10 rounded-xl p-4 bg-white group-hover:border-terracotta transition-colors">
                  <p className="text-xs text-terracotta font-medium">
                    {i === 0 ? "Start" : i === stops.length - 1 ? "End" : `Stop ${i}`}
                  </p>
                  <p className="font-display font-semibold text-lg">{dest.name}</p>
                  <p className="text-ink/60 text-sm line-clamp-2">{dest.intro}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}