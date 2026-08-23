import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";
import { thinkingEntries } from "@/content/thinking";
import { absoluteUrl } from "@/lib/metadata";

const staticRoutes = [
  "/",
  "/projects",
  "/thinking",
  "/experience",
  "/travel-life",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`);
  const thinkingRoutes = thinkingEntries.map((entry) => `/thinking/${entry.slug}`);

  return [...staticRoutes, ...projectRoutes, ...thinkingRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.includes("/projects/") ? 0.8 : 0.7
  }));
}
