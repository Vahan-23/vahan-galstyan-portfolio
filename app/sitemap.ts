import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { locales, routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services"];

  return locales.flatMap((locale) => {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    return routes.map((route) => ({
      url: `${siteConfig.url}${prefix}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => {
            const p = l === routing.defaultLocale ? "" : `/${l}`;
            return [l, `${siteConfig.url}${p}${route}`];
          })
        ),
      },
    }));
  });
}
