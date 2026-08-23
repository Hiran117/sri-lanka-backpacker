import { destinations, getDestination } from "@/data/destinations";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { supabase } from "@/lib/supabase";
import PlaceChecklist from "@/components/PlaceChecklist";
import ReviewSection from "@/components/ReviewSection";
import { markVisited } from "./actions";
import Image from "next/image";
import GpsCheckin from "@/components/GpsCheckin";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return {};
  return {
    title: `${dest.name} — Backpacker Guide | LankaTrail`,
    description: dest.intro,
  };
}

function mapLink(placeName, destName) {
  const query = encodeURIComponent(`${placeName}, ${destName}, Sri Lanka`);
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

export default async function DestinationPage({ params }) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) notFound();

  const session = await auth();
  const signedIn = !!session?.user?.email;

  let initialChecked = [];
  let reviews = [];

  if (signedIn) {
    const { data: checkins } = await supabase
      .from("checkins")
      .select("place_name")
      .eq("user_email", session.user.email)
      .eq("destination_slug", slug)
      .eq("checked", true);
    initialChecked = (checkins || []).map((c) => c.place_name);
  }

  const { data: reviewRows } = await supabase
    .from("reviews")
    .select("*")
    .eq("destination_slug", slug)
    .order("created_at", { ascending: false });
  reviews = reviewRows || [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden mb-8 -mt-4">
        <Image
          src={dest.image}
          alt={dest.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/60 to-transparent" />
      </div>

      {!signedIn && (
        <div className="bg-tea/10 border border-tea/30 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <p className="font-display font-bold text-lg text-tea mb-1">
              Track your trip as you go
            </p>
            <p className="text-ink/70 text-sm">
              Sign up free to check off places, track your progress through {dest.name}, and check in with GPS when you arrive.
            </p>
          </div>
          <Link
            href="/signup"
            className="bg-tea text-cream px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-tea/90 transition-colors whitespace-nowrap text-center"
          >
            Sign up free
          </Link>
        </div>
      )}

      <p className="text-terracotta font-medium mb-2">
        Stop {dest.order} of {destinations.length}
      </p>
      <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">{dest.name}</h1>
      <p className="text-ink/70 text-lg mb-6">{dest.intro}</p>

      {signedIn && (
        <GpsCheckin destinationSlug={slug} destName={dest.name} coords={dest.coords} />
      )}

      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-4">
          Getting here from {dest.howYouGotHere.from}
        </h2>
        <div className="grid gap-3">
          {dest.howYouGotHere.options.map((opt) => (
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
      </section>

      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-4">Explore in {dest.name}</h2>
        <PlaceChecklist
          destinationSlug={slug}
          places={dest.exploreHere}
          initialChecked={initialChecked}
          signedIn={signedIn}
        />
        <div className="grid gap-2 mt-3">
          {dest.exploreHere.map((place) => (
            <Link
              key={place.name}
              href={mapLink(place.name, dest.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-tea hover:underline"
            >
              Get route to {place.name} →
            </Link>
          ))}
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-tea/5 rounded-xl p-4">
          <p className="font-display font-semibold mb-1">Where to stay</p>
          <p className="text-ink/70 text-sm">{dest.stay.area}</p>
          <p className="text-ink/60 text-sm">{dest.stay.priceRange}</p>
        </div>
        <div className="bg-tea/5 rounded-xl p-4">
          <p className="font-display font-semibold mb-1">Where to eat</p>
          <p className="text-ink/70 text-sm">{dest.eat.note}</p>
        </div>
      </section>

      <ReviewSection destinationSlug={slug} reviews={reviews} signedIn={signedIn} />

      <section className="bg-terracotta/10 rounded-2xl p-6 text-center mt-10">
        <p className="text-ink/60 mb-2">Next stop</p>
        <Link
          href={`/destinations/${dest.next.slug}`}
          className="font-display font-bold text-2xl text-terracotta hover:underline"
        >
          {dest.next.name} →
        </Link>
      </section>
    </div>
  );
}