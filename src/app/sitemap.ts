import type { MetadataRoute } from "next";
import { getBookIndex } from "@/lib/books";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://3000books.org";
  const books = await getBookIndex();
  return [
    { url: base, lastModified: new Date("2026-08-31"), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/books`, lastModified: new Date("2026-08-31"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/3000-books`, lastModified: new Date("2026-08-31"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/3000-houses`, lastModified: new Date("2026-08-31"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/3000-stories`, lastModified: new Date("2026-08-31"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date("2026-08-31"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date("2026-08-31"), changeFrequency: "yearly", priority: 0.5 },
    ...books.map((book) => ({
      url: `${base}/books/${book.slug}`,
      lastModified: new Date("2026-08-31"),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
