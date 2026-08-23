import { posts, getPost } from "@/data/posts";
import { destinations } from "@/data/destinations";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — LankaTrail`,
    description: post.excerpt,
  };
}

// Splits post content into text and destination-link segments.
// Matches whole destination names only (word boundaries), case-sensitive
// to avoid false hits on lowercase common words.
function linkifyDestinations(text) {
  const names = destinations
    .map((d) => d.name)
    .sort((a, b) => b.length - a.length); // longest first so "Nuwara Eliya" wins over any partial overlap

  if (names.length === 0) return [text];

  const pattern = new RegExp(`\\b(${names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "g");

  const parts = [];
  let lastIndex = 0;
  let match;
  let linked = new Set(); // only link the first occurrence per destination, per post

  while ((match = pattern.exec(text)) !== null) {
    const name = match[0];
    const dest = destinations.find((d) => d.name === name);
    const alreadyLinked = linked.has(name);

    parts.push(text.slice(lastIndex, match.index));

    if (dest && !alreadyLinked) {
      parts.push(
        <Link
          key={`${match.index}-${name}`}
          href={`/destinations/${dest.slug}`}
          className="text-jungle underline decoration-jungle/30 hover:decoration-jungle transition-colors"
        >
          {name}
        </Link>
      );
      linked.add(name);
    } else {
      parts.push(name);
    }

    lastIndex = pattern.lastIndex;
  }
  parts.push(text.slice(lastIndex));
  return parts;
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Split into paragraphs first (content uses \n\n between them),
  // then linkify each paragraph independently so link-tracking resets per block for readability.
  const paragraphs = post.content.split(/\n\n+/);

  return (
    <article className="max-w-2xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            author: { "@type": "Organization", name: "LankaTrail" },
            publisher: { "@type": "Organization", name: "LankaTrail" },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://sri-lanka-backpacker.vercel.app/blog/${post.slug}`,
            },
          }),
        }}
      />

      <p className="text-xs text-ink/50 mb-2 font-mono">{post.date}</p>
      <h1 className="font-display font-bold text-3xl md:text-4xl mb-8 leading-tight">{post.title}</h1>
      <div className="prose prose-ink max-w-none text-ink/80 leading-relaxed text-[17px]">
        {paragraphs.map((para, i) => (
          <p key={i} className="mb-5">
            {linkifyDestinations(para)}
          </p>
        ))}
      </div>
    </article>
  );
}