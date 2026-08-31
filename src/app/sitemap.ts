import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://3000books.org";
  return [
    { url: base, lastModified: new Date("2026-08-31"), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date("2026-08-31"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date("2026-08-31"), changeFrequency: "yearly", priority: 0.5 },
  ];
}
