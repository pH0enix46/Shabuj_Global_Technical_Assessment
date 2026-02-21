import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shabuj Global Education",
    short_name: "Shabuj Global",
    description:
      "Expert study abroad guidance, university admissions support, and visa assistance.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/shabuj-global.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/shabuj-global.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
