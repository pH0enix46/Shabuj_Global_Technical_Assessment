import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://shabujglobal.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://shabujglobal.com/universities",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.9,
    },
  ];
}
