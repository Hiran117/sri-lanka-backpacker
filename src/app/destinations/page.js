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
              className="card-press group block border border-ink/10 rounded-2xl overflow-hidden bg-white hover:border-rust hover:shadow-card transition-all duration-300 h-full"
            >
              <div className="relative w-full h-44 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/40 to-transparent" />
                <span className="absolute top-3 left-3 text-xs font-medium text-parchment bg-ink/40 backdrop-blur-sm rounded-full px-3 py-1">
                  Stop {dest.order}
                </span>
              </div>
              <div className="p-5">
                <p className="font-display font-bold text-xl mb-2 group-hover:text-rust transition-colors">{dest.name}</p>
                <p className="text-ink/60 text-sm line-clamp-3">{dest.intro}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
