import { destinations, getDestination } from "@/data/destinations";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-terracotta font-medium mb-2">
        Stop {dest.order} of {destinations.length}
      </p>
      <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">{dest.name}</h1>
      <p className="text-ink/70 text-lg mb-10">{dest.intro}</p>

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
        <div className="grid gap-3">
          {dest.exploreHere.map((place) => {
            const url = mapLink(place.name, dest.name);
            return (
              <Link
                key={place.name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink/10 rounded-xl p-4 bg-white hover:border-terracotta transition-colors flex justify-between items-center gap-2"
              >
                <div>
                  <p className="font-medium">{place.name}</p>
                  <p className="text-ink/60 text-sm">{place.note}</p>
                </div>
                <span className="text-terracotta text-sm whitespace-nowrap">Get route →</span>
              </Link>
            );
          })}
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

      <section className="bg-terracotta/10 rounded-2xl p-6 text-center">
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