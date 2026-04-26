import type { NowItem } from "@/lib/content-types";

export const nowItems: NowItem[] = [
  {
    label: "Current learning",
    items: [
      "System Design (Base Problems)",
      "Leetcode (Backtracking, Sliding Window)",
      "Behavioral Interview Preparation"
    ],
    source: ["readme_portfolio.md"]
  },
  {
    label: "Next learning",
    items: [
      "Leetcode Graph Problems",
      "Leetcode 1D Dynamic Programming",
      "Advanced System Design"
    ],
    source: ["readme_portfolio.md"]
  },
  {
    label: "Current focus",
    items: [
      "Actively applying for Summer / Fall 2026 roles",
      "Targeting Backend, Distributed Systems, and AI Systems roles",
      "System Design mastery",
      "DSA consistency",
      "High-signal project building"
    ],
    source: ["readme_portfolio.md"]
  },
  {
    label: "Job search system",
    items: [
      "Daily applications",
      "Referral outreach",
      "Cold emails to founders / recruiters"
    ],
    source: ["readme_portfolio.md"]
  },
  {
    label: "Mental models",
    items: [
      "Eisenhower Decision Matrix",
      "Structured decision-making over instinct-based prioritization",
      "Simplification-first thinking for complex problems"
    ],
    source: ["readme_portfolio.md"]
  }
];

export const targetRoles = [
  "Backend Engineer",
  "Software Engineer",
  "DevOps Engineer",
  "Data Engineer",
  "ML Engineer / AI Engineer",
  "Data Analyst / Data Scientist"
] as const;

export const operatingPrinciples = [
  "I optimize for long-term growth over short-term comfort.",
  "I prefer truth over convenience.",
  "I value depth over surface-level output.",
  "I build systems for consistency."
] as const;
