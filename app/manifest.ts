import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: "Portfolio OS",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff8e8",
    theme_color: "#f7ff00",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
