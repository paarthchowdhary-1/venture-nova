import type { MetadataRoute } from "next";

const SITE = "https://venturenova.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/how-it-works", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/signup", priority: 0.7 },
    { path: "/login", priority: 0.4 },
    { path: "/terms", priority: 0.3 },
    { path: "/privacy", priority: 0.3 },
  ];
  return pages.map(({ path, priority }) => ({
    url: `${SITE}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
