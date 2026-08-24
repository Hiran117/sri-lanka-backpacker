import { getDestination, destinations } from "@/data/destinations";
import { getRoute, getNextInRoute } from "@/data/routes";
import { auth } from "@/auth";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PlaceChecklist from "@/components/PlaceChecklist";
import ReviewSection from "@/components/ReviewSection";
import GpsCheckin from "@/components/GpsCheckin";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import TransportIcon from "@/components/TransportIcon";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return {};
  return {
    title: `${dest.name} — LankaTrail`,
    description: dest.intro,
  };
}

export default async function DestinationPage({ params, searchParams }) {
  const { slug } = await params;
  const { route: routeSlug } = await searchParams;

  const dest = getDestination(slug);
  if (!dest) notFound();

  const session = await auth();
  const signedIn = !!session?.user?.email;
  const userEmail = session?.user?.email;

  let initialChecked = [];
  let reviews = [];
  let hasVisited = false;

  if (signedIn) {
    const [{ data: checkins }, { data: reviewRows }, { data: visit }] = await Promise.all([
      supabase
        .from("checkins")
        .select("place_name")
        .eq("user_email", userEmail)
        .eq("destination_slug", slug)
        .eq("checked", true),
      supabase
        .from("reviews")
        .select("*")
        .eq("destination_slug", slug)
        .order("created_at", { ascending: false }),
      supabase
        .from("visits")
        .select("id")
        .eq("user_email", userEmail)
        .eq("destination_slug", slug)
        .maybeSingle(),
    ]);
    initialChecked = (checkins || []).map((c) => c.place_name);
    reviews = reviewRows || [];
    hasVisited = !!visit;
  } else {
    const { data: reviewRows } = await supabase
      .from("reviews")
      .select("*")
      .eq("destination_slug", slug)
      .order("created_at", { ascending: false });
    reviews = reviewRows || [];
  }

  const route = routeSlug ? getRoute(routeSlug) : null;
  const nextSlug = routeSlug ? getNextInRoute(routeSlug, slug) : null;
  const nextDest = nextSlug ? getDestination(nextSlug) : null;

  return (
    <div>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            name: dest.name,
            description: dest.intro,
            image: dest.image,
            ...(dest.coords && {
              geo: {
                "@type": "GeoCoordinates",
                latitude: dest.coords.lat,
                longitude: dest.coords.lng,
              },
            }),
          }),
        }}
      />
      
      {/* Hero */}
      <div className="relative w-full h-72 md:h-96">
        <Image
          src={dest.image}
          alt={dest.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 pb-6">
          {route && (
            <Link
              href={`/routes/${route.slug}`}
              className="text-sm text-parchment/80 hover:text-parchment mb-3 inline-block transition-colors"
            >
              ← {route.name}
            </Link>
          )}
          <h1 className="font-display font-bold text-3xl md:text-5xl text-parchment drop-shadow-lg">{dest.name}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumbs
          className="mb-4"
          items={[
            { name: "Home", href: "/" },
            { name: "Destinations", href: "/destinations" },
            ...(route ? [{ name: route.name, href: `/routes/${route.slug}` }] : []),
            { name: dest.name },
          ]}
        />
        <p className="text-ink/70 text-lg mb-8">{dest.intro}</p>
        {dest.lastUpdated && (
  <p className="text-xs text-ink/40 font-mono -mt-6 mb-8">
    Prices & transport info verified: {new Date(dest.lastUpdated).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
  </p>
)}

        {!signedIn && (
          <div className="bg-jungle/10 border border-jungle/30 rounded-2xl p-5 mb-10 text-center">
            <p className="font-medium text-jungle mb-1">
              Sign up free to track your progress and check in with GPS
            </p>
            <Link href="/signup" className="text-sm text-jungle font-semibold hover:underline">
              Create a free account →
            </Link>
          </div>
        )}

        {/* How you got here */}
        <section className="mb-10">
          <h2 className="font-display font-bold text-xl mb-1">Getting Here</h2>
          <p className="text-ink/60 text-sm mb-4">From {dest.howYouGotHere.from}</p>
          <div className="grid gap-2">
            {dest.howYouGotHere.options.map((opt) => (
              <div
                key={opt.mode}
                className="border border-ink/10 rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between gap-1 bg-white hover:border-rust/30 hover:shadow-soft transition-all duration-300"
              >
                <span className="font-medium">{opt.mode}</span>
                <span className="text-ink/60 text-sm font-mono">
                  {opt.cost} · {opt.duration}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* GPS check-in */}
        {dest.coords && (
          <GpsCheckin
            destinationSlug={slug}
            destName={dest.name}
            coords={dest.coords}
          />
        )}

        {/* Explore here */}
        <section className="mb-10">
          <h2 className="font-display font-bold text-xl mb-4">Explore Here</h2>
          <PlaceChecklist
  destinationSlug={slug}
  destName={dest.name}
  places={dest.exploreHere}
  initialChecked={initialChecked}
  signedIn={signedIn}
/>
        </section>

        {/* Stay & Eat */}
        <section className="mb-10 grid sm:grid-cols-2 gap-4">
          <div className="border border-ink/10 rounded-xl p-5 bg-white hover:shadow-soft transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust">
                <path d="M12 2C8 2 5 5 5 9c0 5.5 7 13 7 13s7-7.5 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              <p className="font-display font-semibold">Where to Stay</p>
            </div>
            <p className="text-ink/70 text-sm mb-1">{dest.stay.area}</p>
            <p className="text-ink/50 text-xs">{dest.stay.priceRange}</p>
          </div>
          <div className="border border-ink/10 rounded-xl p-5 bg-white hover:shadow-soft transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
              </svg>
              <p className="font-display font-semibold">Food</p>
            </div>
            <p className="text-ink/70 text-sm">{dest.eat.note}</p>
          </div>
        </section>

        {/* Next stop */}
        {nextDest && (
          <Link
            href={`/destinations/${nextDest.slug}?route=${routeSlug}`}
            className="group block mb-10 border-2 border-rust rounded-xl p-5 bg-rust/5 hover:bg-rust/10 transition-all duration-300 hover:shadow-card"
          >
            <p className="text-xs text-rust font-medium mb-1 uppercase tracking-wide">Next stop</p>
            <p className="font-display font-semibold text-lg flex items-center justify-between">
              {nextDest.name}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </p>
          </Link>
        )}

        <ReviewSection destinationSlug={slug} reviews={reviews} signedIn={signedIn} />
      </div>
    </div>
  );
}
