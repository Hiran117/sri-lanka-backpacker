import { posts, getPost } from "@/data/posts";
import { notFound } from "next/navigation";

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

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto px-4 py-12">
      <p className="text-xs text-ink/50 mb-2 font-mono">{post.date}</p>
      <h1 className="font-display font-bold text-3xl md:text-4xl mb-8 leading-tight">{post.title}</h1>
      <div className="prose prose-ink max-w-none whitespace-pre-line text-ink/80 leading-relaxed text-[17px]">
        {post.content}
      </div>
    </article>
  );
}
