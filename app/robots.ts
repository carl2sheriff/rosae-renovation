import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://rosae-renovation.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/(payload)/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
