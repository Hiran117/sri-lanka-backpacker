import { destinations } from "@/data/destinations";
import { routes } from "@/data/routes";
import { posts } from "@/data/posts";

const BASE_URL = "https://sri-lanka-backpacker.vercel.app";

export default function sitemap() {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/destinations`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/routes`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), priority: 0.7 },
  ];

  const destinationPages = destinations.map((d) => ({
    url: `${BASE_URL}/destinations/${d.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const routePages = routes.map((r) => ({
    url: `${BASE_URL}/routes/${r.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const blogPages = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.date,
    priority: 0.6,
  }));

  return [...staticPages, ...destinationPages, ...routePages, ...blogPages];
}