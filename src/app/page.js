import StartSelector from "@/components/StartSelector";
import Link from "next/link";
import Image from "next/image";
import { destinations } from "@/data/destinations";

const circuit = [...destinations].sort((a, b) => a.order - b.order);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-tea/10 to-cream pt-16 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block bg-gold/20 text-terracotta font-medium text-sm px-4 py-1.5 rounded-full mb-6">
            Built for backpackers, not tour agencies
          </span>

          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight text-ink mb-5">
            Sri Lanka, <span className="text-tea">stop by stop.</span>
          </h1>

          <p className="text-ink/70 text-lg max-w-2xl mx-auto mb-10">
            Real public transport routes, real costs, real durations — plus
            what to actually do once you're there. No guesswork, no getting lost.
          </p>

          <StartSelector />
        </div>
      </section>

      {/* Trail overview */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-2">
          The Classic Circuit
        </h2>
        <p className="text-ink/60 text-center mb-12">
          The route most backpackers follow — hill country to coast.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {circuit.map((dest, i) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-4/5 shadow-sm hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-xs text-cream/70 font-medium">Stop {dest.order}</span>
                <p className="text-cream font-display font-bold text-lg leading-tight">{dest.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why this site */}
      <section className="bg-tea/5 py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-display font-bold text-xl text-terracotta mb-2">Trains & Buses</p>
            <p className="text-ink/70 text-sm">Exact routes, costs and durations — no tourist markup guessing.</p>
          </div>
          <div>
            <p className="font-display font-bold text-xl text-terracotta mb-2">Explore Fully</p>
            <p className="text-ink/70 text-sm">Every stop shows what's nearby so you don't miss anything before moving on.</p>
          </div>
          <div>
            <p className="font-display font-bold text-xl text-terracotta mb-2">Budget Friendly</p>
            <p className="text-ink/70 text-sm">Hostels and food picks that fit a backpacker budget, not a resort one.</p>
          </div>
        </div>
      </section>
    </>
  );
}