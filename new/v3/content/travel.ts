import type { TravelEntry } from "@/lib/content-types";

export const travelEntries: TravelEntry[] = [
  {
    slug: "seattle-trip",
    title: "Seattle Trip",
    region: "USA",
    status: "placeholder",
    placeLabel: "Seattle",
    timeVisited: "TBD",
    tags: ["Travel", "Placeholder"],
    notes: ["TBD"],
    mapPosition: {
      x: 18,
      y: 20
    },
    source: ["readme_portfolio.md"]
  },
  {
    slug: "la-crazy-experience",
    title: "LA Crazy Experience",
    region: "USA",
    status: "placeholder",
    placeLabel: "LA",
    timeVisited: "TBD",
    tags: ["Travel", "Placeholder"],
    notes: ["TBD"],
    mapPosition: {
      x: 19,
      y: 58
    },
    source: ["readme_portfolio.md"]
  },
  {
    slug: "san-diego-crazy-experience",
    title: "San Diego Crazy Experience",
    region: "USA",
    status: "placeholder",
    placeLabel: "San Diego",
    timeVisited: "TBD",
    tags: ["Travel", "Placeholder"],
    notes: ["TBD"],
    mapPosition: {
      x: 22,
      y: 66
    },
    source: ["readme_portfolio.md"]
  }
];

export const travelRegions = ["USA", "India", "China"] as const;
