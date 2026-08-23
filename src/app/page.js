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
          <p className="text-ink/50 text-sm mt-6">
  <Link href="/signup" className="text-tea font-medium hover:underline">
    Create a free account
  </Link>{" "}
  to track your progress, check in with GPS, and leave reviews as you travel.
</p>
        </div>
      </section>

    {/* Trail overview — connected route flow */}
<section className="max-w-6xl mx-auto px-4 py-20">
  <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-2">
    The Classic Circuit
  </h2>
  <p className="text-ink/60 text-center mb-14">
    Hill country to coast — follow the route, or jump to any stop.
  </p>

  <div className="relative">
    {/* Desktop: horizontal connected flow */}
    <div className="hidden md:flex items-center justify-between relative">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-tea/20 via-terracotta/40 to-tea/20 -translate-y-1/2" />
      {circuit.map((dest, i) => (
        <div key={dest.slug} className="relative z-10 flex items-center">
          <Link
            href={`/destinations/${dest.slug}`}
            className="group flex flex-col items-center gap-3 animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-cream shadow-md group-hover:ring-terracotta transition-all">
              <Image src={dest.image} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="text-center">
              <p className="text-xs text-terracotta font-medium">Stop {dest.order}</p>
              <p className="font-display font-bold text-sm">{dest.name}</p>
            </div>
          </Link>
          {i < circuit.length - 1 && (
            <span className="text-terracotta text-2xl mx-2">→</span>
          )}
        </div>
      ))}
    </div>

    {/* Mobile: vertical connected flow */}
    <div className="md:hidden flex flex-col gap-0">
      {circuit.map((dest, i) => (
        <div key={dest.slug} className="flex flex-col items-center">
          <Link
            href={`/destinations/${dest.slug}`}
            className="group flex items-center gap-4 w-full bg-white border border-ink/10 rounded-2xl p-3 hover:border-terracotta transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
              <Image src={dest.image} alt={dest.name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs text-terracotta font-medium">Stop {dest.order}</p>
              <p className="font-display font-bold text-base">{dest.name}</p>
            </div>
          </Link>
          {i < circuit.length - 1 && (
            <span className="text-terracotta text-xl my-1">↓</span>
          )}
        </div>
      ))}
    </div>
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