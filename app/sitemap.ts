import type { MetadataRoute } from "next";
import { services, site } from "@/lib/content";

/** Served at /sitemap.xml. New services in lib/content.ts are added automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/llms.txt`, lastModified, changeFrequency: "monthly", priority: 0.3 },
    { url: `${site.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
