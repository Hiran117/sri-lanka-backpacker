"use client";
import { useState, useTransition } from "react";
import { submitReview } from "@/app/destinations/[slug]/actions";

export default function ReviewSection({ destinationSlug, reviews, signedIn }) {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    startTransition(async () => {
      await submitReview(destinationSlug, content);
      setContent("");
    });
  }

  return (
    <section className="mt-10">
      <h2 className="font-display font-bold text-xl mb-4">Reviews</h2>

      {signedIn ? (
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your experience here..."
            className="border border-ink/10 rounded-xl p-3 text-sm resize-none h-24"
          />
          <button
            type="submit"
            disabled={isPending}
            className="self-start bg-jungle text-parchment px-4 py-2 rounded-lg text-sm font-medium hover:bg-jungle/90 disabled:opacity-50"
          >
            {isPending ? "Posting..." : "Post review"}
          </button>
        </form>
      ) : (
        <p className="text-ink/50 text-sm mb-6">Sign in to leave a review.</p>
      )}

      <div className="flex flex-col gap-3">
        {reviews.length === 0 && (
          <p className="text-ink/40 text-sm">No reviews yet — be the first.</p>
        )}
        {reviews.map((r) => (
          <div key={r.id} className="border border-ink/10 rounded-xl p-4 bg-white">
            <p className="font-medium text-sm">{r.user_name || "Backpacker"}</p>
            <p className="text-ink/70 text-sm mt-1">{r.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}