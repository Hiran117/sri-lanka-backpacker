import { posts } from "@/data/posts";
import Link from "next/link";

export const metadata = {
  title: "Guides — LankaTrail",
  description: "Practical guides for backpacking Sri Lanka — transport, budgets, and tips.",
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">Guides</h1>
      <p className="text-ink/70 text-lg mb-12">
        Practical, no-fluff guides for backpacking Sri Lanka.
      </p>

      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="border border-ink/10 rounded-2xl p-5 bg-white hover:border-rust transition-colors"
          >
            <p className="text-xs text-ink/50 mb-1">{post.date}</p>
            <p className="font-display font-bold text-xl mb-2">{post.title}</p>
            <p className="text-ink/60 text-sm">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}