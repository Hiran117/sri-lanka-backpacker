import StartSelector from "@/components/StartSelector";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { routes } from "@/data/routes";
import { getDestination } from "@/data/destinations";
import { auth } from "@/auth";

const features = [
  {
    title: "Trains & Buses",
    desc: "Exact routes, costs and durations — no tourist markup guessing.",
    icon: "M12 2C8 2 5 5 5 9c0 5.5 7 13 7 13s7-7.5 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z",
  },
  {
    title: "Explore Fully",
    desc: "Every stop shows what's nearby so you don't miss anything before moving on.",
    icon: "M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5zm0 12.5a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z",
  },
  {
    title: "Budget Friendly",
    desc: "Hostels and food picks that fit a backpacker budget, not a resort one.",
    icon: "M12 1v22M17 5H9.5a3.5 3.5 0 100 7H14a3.5 3.5 0 110 7H6",
  },
];

export default async function Home() {
  const session = await auth();
  const signedIn = !!session?.user?.email;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-linear-to-b from-jungle/15 via-parchment to-parchment" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-jungle/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute top-20 left-0 w-72 h-72 bg-brass/10 rounded-full blur-3xl translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto text-center">
          <span className="inline-block bg-brass/20 text-rust font-medium text-sm px-4 py-1.5 rounded-full mb-6 animate-fade-in-scale">
            Built for backpackers, not tour agencies
          </span>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-tight text-ink mb-5 animate-fade-in-up">
            Sri Lanka, <span className="text-jungle">stop by stop.</span>
          </h1>

          <p className="text-ink/70 text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-1">
            Real public transport routes, real costs, real durations — plus
            what to actually do once you're there. No guesswork, no getting lost.
          </p>

          <div className="animate-fade-in-up stagger-2">
            <StartSelector />
          </div>

          {!signedIn && (
            <p className="text-ink/50 text-sm mt-6 animate-fade-in stagger-3">
              <Link href="/signup" className="text-jungle font-medium hover:underline">
                Create a free account
              </Link>{" "}
              to track your progress, check in with GPS, and leave reviews as you travel.
            </p>
          )}
        </div>
      </section>

      {/* Routes overview */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <Reveal>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-2">
            Choose Your Route
          </h2>
          <p className="text-ink/60 text-center mb-12">
            Every route starts and ends in Colombo. Pick based on your time and style.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {routes.map((route, i) => {
            const uniqueSlugs = route.destinationSlugs.filter(
              (s, idx, arr) => arr.indexOf(s) === idx
            );
            const previewDests = uniqueSlugs
              .slice(0, 4)
              .map((s) => getDestination(s)?.name)
              .filter(Boolean);

            return (
              <Reveal key={route.slug} delay={i * 80}>
                <Link
                  href={`/routes/${route.slug}`}
                  className="card-press group block border border-ink/10 rounded-2xl p-5 bg-white hover:border-rust hover:shadow-card transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block text-xs font-mono font-medium text-rust border-2 border-rust/40 rounded-full px-3 py-1 -rotate-2 tracking-wide uppercase">
                      {route.popularity}
                    </span>
                    <span className="text-xs text-ink/50 font-medium">{route.days}</span>
                  </div>
                  <p className="font-display font-bold text-xl mb-1 group-hover:text-rust transition-colors">{route.name}</p>
                  <p className="text-ink/60 text-sm mb-3">{route.tagline}</p>
                  <p className="text-xs text-ink/50 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-jungle" />
                    {uniqueSlugs.length} stops · {previewDests.join(" → ")}
                    {uniqueSlugs.length > 4 ? "..." : ""}
                  </p>
                  {!signedIn && (
                    <p className="text-xs text-jungle font-medium mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Sign in to see the full day-by-day route →
                    </p>
                  )}
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Why this site */}
      <section className="bg-jungle/5 py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-jungle/10 flex items-center justify-center mb-4">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust">
                    <path d={f.icon} />
                  </svg>
                </div>
                <p className="font-display font-bold text-xl text-rust mb-2">{f.title}</p>
                <p className="text-ink/70 text-sm max-w-xs">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Reveal className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-linear-to-br from-jungle to-jungle-light rounded-3xl p-10 md:p-14 shadow-card">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-parchment mb-3">
            Ready to explore Sri Lanka?
          </h2>
          <p className="text-parchment/70 mb-6">
            Track your stops, check in with GPS, and keep your trip organized — all free.
          </p>
          <Link
            href={signedIn ? "/routes" : "/signup"}
            className="inline-block bg-rust text-parchment px-8 py-3.5 rounded-xl font-semibold hover:bg-rust-light hover:shadow-lift transition-all duration-300"
          >
            {signedIn ? "Plan a Route" : "Create free account"}
          </Link>
        </div>
      </Reveal>
    </>
  );
}
