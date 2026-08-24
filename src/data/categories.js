// Destination category metadata: label + Tailwind text/border color classes.
// Colors map to the existing theme palette in globals.css.

export const categories = {
  beach: {
    label: "Beach",
    badge: "bg-rust/90 text-parchment border-rust",
  },
  "hill-country": {
    label: "Hill Country",
    badge: "bg-jungle-light/90 text-parchment border-jungle-light",
  },
  cultural: {
    label: "Cultural",
    badge: "bg-brass/90 text-ink border-brass",
  },
  safari: {
    label: "Safari",
    badge: "bg-jungle/90 text-parchment border-jungle",
  },
  city: {
    label: "City / Transit",
    badge: "bg-ink/80 text-parchment border-ink",
  },
};

export function getCategory(category) {
  return categories[category] || categories.city;
}
