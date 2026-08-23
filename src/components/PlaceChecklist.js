"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { togglePlace } from "@/app/destinations/[slug]/actions";

function mapLink(placeName, destName) {
  const query = encodeURIComponent(`${placeName}, ${destName}, Sri Lanka`);
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

export default function PlaceChecklist({ destinationSlug, destName, places, initialChecked, signedIn }) {
  const [checkedSet, setCheckedSet] = useState(new Set(initialChecked));
  const [isPending, startTransition] = useTransition();

  const progress = Math.round((checkedSet.size / places.length) * 100);

  function toggle(placeName) {
    if (!signedIn) {
      window.location.href = "/signin";
      return;
    }
    const next = new Set(checkedSet);
    const nowChecked = !next.has(placeName);
    nowChecked ? next.add(placeName) : next.delete(placeName);
    setCheckedSet(next);
    startTransition(() => {
      togglePlace(destinationSlug, placeName, nowChecked);
    });
  }

  return (
    <div>
      {signedIn && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-ink/60">Progress</span>
            <span className="font-medium text-jungle font-mono">{progress}%</span>
          </div>
          <div className="h-2 bg-ink/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-jungle transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="grid gap-3">
        {places.map((place) => {
          const isChecked = checkedSet.has(place.name);
          const url = mapLink(place.name, destName);
          return (
            <div
              key={place.name}
              className={`flex items-center gap-2 border rounded-xl p-4 transition-colors ${
                isChecked ? "border-jungle bg-jungle/10" : "border-ink/10 bg-white hover:border-rust/30"
              }`}
            >
              <button onClick={() => toggle(place.name)} className="flex-1 text-left">
                <p className="font-medium">
                  {isChecked ? "✓ " : ""}
                  {place.name}
                </p>
                <p className="text-ink/60 text-sm">{place.note}</p>
                {!signedIn ? (
                  <span className="text-xs text-jungle font-medium">Sign in to track →</span>
                ) : null}
              </button>

              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 flex flex-col items-center gap-0.5 text-jungle hover:text-rust transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7.05 11.25 7.35 11.5a1 1 0 0 0 1.3 0C12.95 21.25 20 15.25 20 10c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                    fill="currentColor"
                  />
                </svg>
                <span className="text-[10px] font-mono">Route</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}