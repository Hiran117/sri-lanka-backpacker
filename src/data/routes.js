export const routes = [
  {
    slug: "classic-circuit",
    name: "The Classic Circuit",
    lastUpdated: "2026-08-23", 
    tagline: "Hill country to south coast — the most-traveled backpacker route",
    popularity: "Most popular",
    days: "7-10 days",
    destinationSlugs: ["colombo", "kandy", "ella", "nuwara-eliya", "mirissa", "weligama", "galle", "unawatuna", "colombo"],
  },
  {
    slug: "south-coast-surf-safari",
    name: "South Coast Surf & Safari",
    lastUpdated: "2026-08-23",
    tagline: "Beaches, surf towns, and Yala's leopards — best for a shorter, beach-focused trip",
    popularity: "Rising favorite",
    days: "6-9 days",
    destinationSlugs: ["colombo", "hikkaduwa", "galle", "unawatuna", "weligama", "mirissa", "yala", "colombo"],
  },
  {
    slug: "cultural-triangle",
    name: "Cultural Triangle + Hill Country",
    lastUpdated: "2026-08-23",
    tagline: "Ancient ruins, ancient temples, then up into tea country",
    popularity: "Highly rated",
    days: "10-12 days",
    destinationSlugs: ["colombo", "sigiriya", "dambulla", "polonnaruwa", "anuradhapura", "kandy", "ella", "colombo"],
  },
  {
    slug: "east-coast",
    name: "East Coast Escape",
    lastUpdated: "2026-08-23",
    tagline: "Surf towns and quieter beaches — rising favorite among longer-stay backpackers",
    popularity: "Rising favorite",
    days: "6-8 days",
    destinationSlugs: ["colombo", "trincomalee", "arugam-bay", "colombo"],
  },
  {
    slug: "full-island",
    name: "The Full Island",
    lastUpdated: "2026-08-23",
    tagline: "Everything — for backpackers with 3+ weeks",
    popularity: "For the committed",
    days: "18-21 days",
    destinationSlugs: [
      "colombo", "sigiriya", "dambulla", "polonnaruwa", "anuradhapura",
      "kandy", "ella", "nuwara-eliya", "udawalawe", "yala", "mirissa",
      "weligama", "galle", "unawatuna", "hikkaduwa",
      "arugam-bay", "trincomalee", "jaffna", "colombo",
    ],
  },
];

export function getRoute(slug) {
  return routes.find((r) => r.slug === slug);
}

export function getNextInRoute(routeSlug, currentSlug) {
  const route = getRoute(routeSlug);
  if (!route) return null;
  const idx = route.destinationSlugs.indexOf(currentSlug);
  if (idx === -1 || idx === route.destinationSlugs.length - 1) return null;
  return route.destinationSlugs[idx + 1];
}