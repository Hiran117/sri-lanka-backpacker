"use client";
import { useState } from "react";
import Image from "next/image";

/**
 * Wraps next/image with a shimmer skeleton placeholder until the image loads.
 * Meant to replace <Image fill ... /> calls: the parent must still be positioned.
 * Passes through all next/image props except className (merged internally).
 */
export default function ImageWithSkeleton({ className = "", ...props }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 shimmer-bg" aria-hidden="true" />
      )}
      <Image
        {...props}
        fill={props.fill ?? true}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
