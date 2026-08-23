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
      {/* Hero */}
      <div className="relative w-full h-64 md:h-80">
        <Image src={dest.image} alt={dest.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-linear-to-t from-ink/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 pb-6">
          <h1 className="font-display font-bold text-3xl md:text-5xl text-parchment">{dest.name}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {route && (
          <Link
            href={`/routes/${route.slug}`}
            className="text-sm text-jungle hover:underline mb-4 inline-block"
          >
            ← Back to {route.name}
          </Link>
        )}

        <p className="text-ink/70 text-lg mb-8">{dest.intro}</p>

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
                className="border border-ink/10 rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between gap-1 bg-white"
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
            places={dest.exploreHere}
            initialChecked={initialChecked}
            signedIn={signedIn}
          />
        </section>

        {/* Stay & Eat */}
        <section className="mb-10 grid sm:grid-cols-2 gap-4">
          <div className="border border-ink/10 rounded-xl p-4 bg-white">
            <p className="font-display font-semibold mb-1">Where to Stay</p>
            <p className="text-ink/70 text-sm mb-1">{dest.stay.area}</p>
            <p className="text-ink/50 text-xs">{dest.stay.priceRange}</p>
          </div>
          <div className="border border-ink/10 rounded-xl p-4 bg-white">
            <p className="font-display font-semibold mb-1">Food</p>
            <p className="text-ink/70 text-sm">{dest.eat.note}</p>
          </div>
        </section>

        {/* Next stop */}
        {nextDest && (
          <Link
            href={`/destinations/${nextDest.slug}?route=${routeSlug}`}
            className="block mb-10 border border-rust rounded-xl p-4 bg-rust/5 hover:bg-rust/10 transition-colors"
          >
            <p className="text-xs text-rust font-medium mb-1">Next stop</p>
            <p className="font-display font-semibold text-lg">{nextDest.name} →</p>
          </Link>
        )}

        <ReviewSection destinationSlug={slug} reviews={reviews} signedIn={signedIn} />
      </div>
    </div>
  );
}