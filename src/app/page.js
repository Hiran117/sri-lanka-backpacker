import StartSelector from "@/components/StartSelector";
import Link from "next/link";

const circuit = [
  "Colombo", "Kandy", "Ella", "Nuwara Eliya", "Mirissa", "Galle",
];

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

        <div className="flex flex-wrap justify-center items-center gap-3">
          {circuit.map((place, i) => (
            <div key={place} className="flex items-center gap-3">
              <Link
                href={`/destinations/${place.toLowerCase().replace(" ", "-")}`}
                className="bg-white border border-ink/10 rounded-full px-5 py-2.5 font-medium hover:border-terracotta hover:text-terracotta transition-colors shadow-sm"
              >
                {place}
              </Link>
              {i < circuit.length - 1 && (
                <span className="text-terracotta text-lg">→</span>
              )}
            </div>
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