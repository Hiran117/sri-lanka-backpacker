export const routes = [
  {
    slug: "classic-circuit",
    name: "The Classic Circuit",
    tagline: "Hill country to south coast — the most-traveled backpacker route",
    popularity: "Most popular",
    days: "7-10 days",
    destinationSlugs: ["colombo", "kandy", "ella", "nuwara-eliya", "mirissa", "galle", "colombo"],
  },
  {
    slug: "cultural-triangle",
    name: "Cultural Triangle + Hill Country",
    tagline: "Ancient ruins, ancient temples, then up into tea country",
    popularity: "Highly rated",
    days: "10-12 days",
    destinationSlugs: ["colombo", "sigiriya", "dambulla", "polonnaruwa", "anuradhapura", "kandy", "ella", "colombo"],
  },
  {
    slug: "east-coast",
    name: "East Coast Escape",
    tagline: "Surf towns and quieter beaches — rising favorite among longer-stay backpackers",
    popularity: "Rising favorite",
    days: "6-8 days",
    destinationSlugs: ["colombo", "trincomalee", "arugam-bay", "colombo"],
  },
  {
    slug: "full-island",
    name: "The Full Island",
    tagline: "Everything — for backpackers with 3+ weeks",
    popularity: "For the committed",
    days: "18-21 days",
    destinationSlugs: [
      "colombo", "sigiriya", "dambulla", "polonnaruwa", "anuradhapura",
      "kandy", "ella", "nuwara-eliya", "udawalawe", "mirissa", "galle",
      "arugam-bay", "trincomalee", "jaffna", "colombo",
    ],
  },
];

export function getRoute(slug) {
  return routes.find((r) => r.slug === slug);
}

// Returns the destination slug that comes after `currentSlug` within a given route.
// Handles the case where a slug (like colombo) appears twice, at the very start and end.
export function getNextInRoute(routeSlug, currentSlug) {
  const route = getRoute(routeSlug);
  if (!route) return null;
  const idx = route.destinationSlugs.indexOf(currentSlug);
  if (idx === -1 || idx === route.destinationSlugs.length - 1) return null;
  return route.destinationSlugs[idx + 1];
}