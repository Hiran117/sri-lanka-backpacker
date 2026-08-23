import { destinations } from "@/data/destinations";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "All Destinations — LankaTrail",
  description: "Every stop on the Sri Lanka backpacker circuit — transport, sights, hostels, food.",
};

export default function DestinationsIndexPage() {
  const sorted = [...destinations].sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">
        Destinations
      </h1>
      <p className="text-ink/70 text-lg mb-12">
        Every stop on the circuit. Tap one to see how to get there and what to do.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map((dest) => (
          <Link
            key={dest.slug}
            href={`/destinations/${dest.slug}`}
            className="group border border-ink/10 rounded-2xl overflow-hidden bg-white hover:border-rust hover:shadow-md transition-all"
          >
            <div className="relative w-full h-40">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <span className="text-xs font-medium text-rust">Stop {dest.order}</span>
              <p className="font-display font-bold text-xl mt-1 mb-2">{dest.name}</p>
              <p className="text-ink/60 text-sm line-clamp-3">{dest.intro}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}