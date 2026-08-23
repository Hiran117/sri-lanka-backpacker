import StartSelector from "@/components/StartSelector";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import Image from "next/image";
import { routes } from "@/data/routes";
import { getDestination } from "@/data/destinations";
import { auth } from "@/auth";

const heroImage = "https://images.pexels.com/photos/321569/pexels-photo-321569.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop";

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
      {/* Hero with background image */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Train through tea country in Ella, Sri Lanka"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-ink/60 via-ink/50 to-ink/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-20 pb-12">
          <span className="inline-block bg-brass/30 backdrop-blur-sm text-parchment font-medium text-xs sm:text-sm px-4 py-2 rounded-full mb-6 animate-fade-in-scale border border-brass/40">
            Built for backpackers, not tour agencies
          </span>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-parchment mb-5 animate-fade-in-up">
            Sri Lanka, <span className="text-brass">stop by stop.</span>
          </h1>

          <p className="text-parchment/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-1">
            Real public transport routes, real costs, real durations — plus
            what to actually do once you're there. No guesswork, no getting lost.
          </p>

          <div className="animate-fade-in-up stagger-2">
            <StartSelector />
          </div>

          {!signedIn && (
            <p className="text-parchment/60 text-sm mt-6 animate-fade-in stagger-3">
              <Link href="/signup" className="text-brass font-medium hover:underline">
                Create a free account
              </Link>{" "}
              to track your progress, check in with GPS, and leave reviews as you travel.
            </p>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-fade-in stagger-4">
          <div className="w-6 h-10 rounded-full border-2 border-parchment/40 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-parchment/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Routes overview */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <Reveal>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-center mb-2">
            Choose Your Route
          </h2>
          <p className="text-ink/60 text-center mb-12 text-sm md:text-base">
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
                  className="card-press group block border border-ink/10 rounded-2xl p-5 md:p-6 bg-white hover:border-rust hover:shadow-lift transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-jungle/5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block text-xs font-mono font-medium text-rust border-2 border-rust/40 rounded-full px-3 py-1 -rotate-2 tracking-wide uppercase">
                        {route.popularity}
                      </span>
                      <span className="text-xs text-ink/50 font-medium">{route.days}</span>
                    </div>
                    <p className="font-display font-bold text-xl md:text-2xl mb-1 group-hover:text-rust transition-colors">{route.name}</p>
<p className="text-ink/60 text-sm mb-4">{route.tagline}</p>
<p className="text-xs text-ink/50 flex items-center gap-1.5 flex-wrap">
  <span className="inline-block w-1.5 h-1.5 rounded-full bg-jungle" />
  {uniqueSlugs.length} stops · {previewDests.join(" → ")}
  {uniqueSlugs.length > 4 ? "..." : ""}
</p>
{!signedIn && (
  <p className="text-xs text-jungle font-medium mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
    Track your progress — sign in free →
  </p>
)}
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Why this site */}
      <section className="bg-jungle/5 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-center mb-2">
              Why LankaTrail
            </h2>
            <p className="text-ink/60 text-center mb-12 text-sm md:text-base">
              The info you actually need, without the fluff.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="flex flex-col items-center bg-white border border-ink/10 rounded-2xl p-6 md:p-8 hover:shadow-card transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-jungle/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust">
                      <path d={f.icon} />
                    </svg>
                  </div>
                  <p className="font-display font-bold text-xl text-rust mb-2">{f.title}</p>
                  <p className="text-ink/70 text-sm max-w-xs">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Reveal className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-linear-to-br from-jungle to-jungle-light rounded-3xl p-10 md:p-14 shadow-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-brass/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-rust/10 rounded-full translate-y-12 -translate-x-12" />
          <div className="relative">
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
        </div>
      </Reveal>
    </>
  );
}
