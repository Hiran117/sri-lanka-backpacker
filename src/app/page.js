import StartSelector from "@/components/StartSelector";
import Link from "next/link";
import { routes } from "@/data/routes";
import { getDestination } from "@/data/destinations";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const signedIn = !!session?.user?.email;

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

          {!signedIn && (
            <p className="text-ink/50 text-sm mt-6">
              <Link href="/signup" className="text-tea font-medium hover:underline">
                Create a free account
              </Link>{" "}
              to track your progress, check in with GPS, and leave reviews as you travel.
            </p>
          )}
        </div>
      </section>

      {/* Routes overview */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-2">
          Choose Your Route
        </h2>
        <p className="text-ink/60 text-center mb-12">
          Every route starts and ends in Colombo. Pick based on your time and style.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {routes.map((route) => {
            const uniqueSlugs = route.destinationSlugs.filter(
              (s, i, arr) => arr.indexOf(s) === i
            );
            const previewDests = uniqueSlugs
              .slice(0, 4)
              .map((s) => getDestination(s)?.name)
              .filter(Boolean);

            return (
              <Link
                key={route.slug}
                href={`/routes/${route.slug}`}
                className="group border border-ink/10 rounded-2xl p-5 bg-white hover:border-terracotta hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                    {route.popularity}
                  </span>
                  <span className="text-xs text-ink/50">{route.days}</span>
                </div>
                <p className="font-display font-bold text-xl mb-1">{route.name}</p>
                <p className="text-ink/60 text-sm mb-3">{route.tagline}</p>
                <p className="text-xs text-ink/50">
                  {uniqueSlugs.length} stops · {previewDests.join(" → ")}
                  {uniqueSlugs.length > 4 ? "..." : ""}
                </p>
                {!signedIn && (
                  <p className="text-xs text-tea font-medium mt-3">
                    Sign in to see the full day-by-day route →
                  </p>
                )}
              </Link>
            );
          })}
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