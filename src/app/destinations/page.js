import { destinations } from "@/data/destinations";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "All Destinations — LankaTrail",
  description: "Every stop on the Sri Lanka backpacker circuit — transport, sights, hostels, food.",
};

export default function DestinationsIndexPage() {
  const sorted = [...destinations].sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Sri Lanka Backpacker Destinations",
            itemListElement: sorted.map((dest, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: dest.name,
              url: `https://sri-lanka-backpacker.vercel.app/destinations/${dest.slug}`,
            })),
          }),
        }}
      />

      <Reveal>
        <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">
          Destinations
        </h1>
        <p className="text-ink/70 text-lg mb-12">
          Every stop on the circuit. Tap one to see how to get there and what to do.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map((dest, i) => (
          <Reveal key={dest.slug} delay={(i % 3) * 80}>
            <Link
              href={`/destinations/${dest.slug}`}
              className="card-press group block border border-ink/10 rounded-2xl overflow-hidden bg-white hover:border-rust hover:shadow-lift transition-all duration-300 h-full"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-ink/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display font-bold text-xl text-parchment drop-shadow-lg">{dest.name}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-ink/60 text-sm line-clamp-3">{dest.intro}</p>
                <p className="text-sm text-jungle font-medium mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore →
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}