import type { MetadataRoute } from "next";
import { content } from "@/content";

/** Derived from content.ts, so an unbuilt route can never be listed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...content.nav.items.filter((item) => item.shipped),
    ...content.footer.legalLinks,
  ];

  return routes.map((route) => ({
    url: `${content.meta.siteUrl}${route.href === "/" ? "" : route.href}`,
    lastModified: new Date(),
    priority: route.href === "/" ? 1 : 0.7,
  }));
}
