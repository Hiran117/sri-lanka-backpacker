import { routes, getRoute } from "@/data/routes";
import { getDestination } from "@/data/destinations";
import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) return {};
  const uniqueStops = [...new Set(route.destinationSlugs)]
    .map((s) => getDestination(s)?.name)
    .filter(Boolean);
  return {
    title: `${route.name} — LankaTrail`,
    description: `${route.tagline}. ${route.days}, stops: ${uniqueStops.join(", ")}.`,
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: route.name,
            description: route.tagline,
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            itemListElement: stops.map((dest, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: dest.name,
              url: `https://sri-lanka-backpacker.vercel.app/destinations/${dest.slug}`,
            })),
          }),
        }}
      />

      <Reveal>
        <Breadcrumbs
          className="mb-4"
          items={[
            { name: "Home", href: "/" },
            { name: "Routes", href: "/routes" },
            { name: route.name },
          ]}
        />
        <Link href="/routes" className="text-sm text-jungle hover:underline mb-4 inline-block">
          ← All routes
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-rust bg-rust/10 px-2.5 py-1 rounded-full">
            {route.popularity}
          </span>
          <span className="text-xs text-ink/50">{route.days}</span>
        </div>

        <h1 className="font-display font-bold text-3xl md:text-5xl mb-3">{route.name}</h1>
        <p className="text-ink/70 text-lg mb-3">{route.tagline}</p>

        {route.lastUpdated && (
          <p className="text-xs text-ink/40 font-mono mb-10">
            Route info verified:{" "}
            {new Date(route.lastUpdated).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </Reveal>

      <div className="relative">
        <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-jungle/20" />
        <div className="flex flex-col gap-6">
          {stops.map((dest, i) => (
            <Link
              key={`${dest.slug}-${i}`}
              href={`/destinations/${dest.slug}?route=${route.slug}`}
              className="relative pl-16 group"
            >
              <span className="absolute left-0 top-0 w-12 h-12 rounded-full overflow-hidden ring-4 ring-parchment z-10">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="48px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </span>
              <div className="relative border border-ink/15 rounded-xl p-4 bg-white group-hover:border-rust group-hover:shadow-card transition-all duration-300 overflow-hidden">
                <p className="text-xs text-rust font-mono font-medium uppercase tracking-wide">
                  {i === 0 ? "Start" : i === stops.length - 1 ? "End" : `Stop ${String(i).padStart(2, "0")}`}
                </p>
                <p className="font-display font-bold text-lg group-hover:text-rust transition-colors">{dest.name}</p>
                <p className="text-ink/60 text-sm line-clamp-2">{dest.intro}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {!signedIn && (
        <Reveal className="mt-10">
          <div className="bg-jungle/10 border border-jungle/30 rounded-2xl p-6 text-center">
            <p className="font-display font-bold text-lg text-jungle mb-2">
              Track your progress on this route
            </p>
            <p className="text-ink/70 text-sm mb-5">
              Sign up free to check off places, verify visits with GPS, and leave reviews as you go.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-jungle text-parchment px-6 py-3 rounded-lg text-sm font-semibold hover:bg-jungle-light transition-colors"
            >
              Sign up free
            </Link>
          </div>
        </Reveal>
      )}
    </div>
  );
}