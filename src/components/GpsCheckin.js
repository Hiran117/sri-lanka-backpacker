"use client";
import { useState } from "react";
import { markVisited } from "@/app/destinations/[slug]/actions";

function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function GpsCheckin({ destinationSlug, destName, coords }) {
  const [status, setStatus] = useState("idle"); // idle | checking | success | far | error

  function handleCheckin() {
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }
    setStatus("checking");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const dist = distanceKm(
          pos.coords.latitude,
          pos.coords.longitude,
          coords.lat,
          coords.lng
        );
        if (dist <= 15) {
          await markVisited(destinationSlug);
          setStatus("success");
        } else {
          setStatus("far");
        }
      },
      () => setStatus("error"),
      { timeout: 10000 }
    );
  }

  return (
    <div className="mb-10">
      <button
        onClick={handleCheckin}
        disabled={status === "checking" || status === "success"}
        className="bg-rust text-parchment px-4 py-2 rounded-lg text-sm font-medium hover:bg-rust/90 disabled:opacity-60"
      >
        {status === "checking" && "Checking location..."}
        {status === "success" && `✓ Checked in at ${destName}`}
        {(status === "idle" || status === "far" || status === "error") &&
          "📍 I'm here — verify with GPS"}
      </button>

      {status === "far" && (
        <p className="text-sm text-rust mt-2">
          You don't seem to be near {destName} yet — check in once you arrive.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-ink/50 mt-2">
          Couldn't access your location. Check your browser's location permission.
        </p>
      )}
    </div>
  );
}