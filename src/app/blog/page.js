import { posts } from "@/data/posts";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Guides — LankaTrail",
  description: "Practical guides for backpacking Sri Lanka — transport, budgets, and tips.",
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Reveal>
        <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">Guides</h1>
        <p className="text-ink/70 text-lg mb-12">
          Practical, no-fluff guides for backpacking Sri Lanka.
        </p>
      </Reveal>

      <div className="flex flex-col gap-5">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 60}>
            <Link
              href={`/blog/${post.slug}`}
              className="card-press group block border border-ink/10 rounded-2xl p-5 md:p-6 bg-white hover:border-rust hover:shadow-lift transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-jungle/5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <p className="text-xs text-ink/50 mb-2 font-mono">{post.date}</p>
                <p className="font-display font-bold text-xl mb-2 group-hover:text-rust transition-colors">{post.title}</p>
                <p className="text-ink/60 text-sm">{post.excerpt}</p>
                <p className="text-sm text-jungle font-medium mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more →
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
