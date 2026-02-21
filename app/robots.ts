import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/universities", "/api/", "api-test"],
      disallow: ["/admin/", "/private/", "/_next/"],
    },
    sitemap: "https://shabujglobal.com/sitemap.xml",
  };
}
