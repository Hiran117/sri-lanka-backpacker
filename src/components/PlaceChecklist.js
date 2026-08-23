"use client";
import { useState, useTransition } from "react";
import { togglePlace } from "@/app/destinations/[slug]/actions";

export default function PlaceChecklist({ destinationSlug, places, initialChecked, signedIn }) {
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
            <span className="font-medium text-jungle">{progress}%</span>
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
          return (
            <button
              key={place.name}
              onClick={() => toggle(place.name)}
              className={`text-left border rounded-xl p-4 flex justify-between items-center gap-2 transition-colors ${
                isChecked
                  ? "border-jungle bg-jungle/10"
                  : "border-ink/10 bg-white hover:border-rust"
              }`}
            >
              <div>
                <p className="font-medium">
                  {isChecked && "✓ "}
                  {place.name}
                </p>
                <p className="text-ink/60 text-sm">{place.note}</p>
              </div>
              {!signedIn && (
                <span className="text-xs text-jungle whitespace-nowrap font-medium">
                  Sign in to track →
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}