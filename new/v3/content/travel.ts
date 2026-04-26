import type { TravelEntry } from "@/lib/content-types";

export const travelEntries: TravelEntry[] = [
  {
    slug: "seattle-trip",
    title: "Seattle Trip",
    region: "USA",
    status: "placeholder",
    notes: ["TBD"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "la-crazy-experience",
    title: "LA Crazy Experience",
    region: "USA",
    status: "placeholder",
    notes: ["TBD"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "san-diego-crazy-experience",
    title: "San Diego Crazy Experience",
    region: "USA",
    status: "placeholder",
    notes: ["TBD"],
    source: ["readme_portfolio.md"]
  }
];

export const travelRegions = ["USA", "India", "China"] as const;
