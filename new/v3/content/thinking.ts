import type { ThinkingEntry } from "@/lib/content-types";

export const thinkingEntries: ThinkingEntry[] = [
  {
    slug: "android-bug-reproduction-systems",
    title: "Android Bug Reproduction Systems",
    category: "Problem Breakdowns",
    status: "planned",
    summary:
      "I’m breaking down how automated Android bug reproduction systems can observe, reason about, and replay failure paths.",
    tags: ["Android", "Automation", "Systems"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "distributed-logging-systems",
    title: "Distributed Logging Systems",
    category: "Problem Breakdowns",
    status: "planned",
    summary:
      "I’m studying how distributed logging systems preserve useful evidence across services, deployments, and failure modes.",
    tags: ["Distributed Systems", "Observability"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "how-instagram-recommends-reels",
    title: "How Instagram Recommends Reels",
    category: "Problem Breakdowns",
    status: "planned",
    summary:
      "I’m mapping the likely recommendation-system pieces behind Reels, from candidate generation to ranking and feedback loops.",
    tags: ["Recommendations", "ML Systems"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "how-niantic-built-ar-world-from-user-images",
    title: "How Niantic Built AR World from User Images",
    category: "Problem Breakdowns",
    status: "planned",
    summary:
      "I’m exploring how user-captured images can become a shared AR world model through vision, mapping, and infrastructure.",
    tags: ["AR", "Computer Vision", "Systems"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "how-i-evaluate-technical-projects",
    title: "How I Evaluate Technical Projects",
    category: "Technical Evaluation & Judging",
    status: "draft",
    summary:
      "I use structured evaluation, high-signal questions, system design judgment, ML rigor, and real-world viability to assess technical projects.",
    tags: ["Evaluation", "Judging", "Systems"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "how-i-ask-high-signal-questions",
    title: "How I Ask High-Signal Questions",
    category: "Technical Evaluation & Judging",
    status: "planned",
    summary:
      "I focus questions on constraints, tradeoffs, evidence, failure modes, and what the team actually learned.",
    tags: ["Evaluation", "Communication"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "what-i-look-for-when-judging-student-projects",
    title: "What I Look For When Judging Student Projects",
    category: "Technical Evaluation & Judging",
    status: "planned",
    summary:
      "I look for technical clarity, real-world viability, implementation depth, and honest reasoning about tradeoffs.",
    tags: ["CEAS Expo", "Judging"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "how-i-am-running-my-job-search-like-a-system",
    title: "How I’m Running My Job Search Like a System",
    category: "Career & Job Search",
    status: "active",
    summary:
      "I’m running my job search with daily applications, referral outreach, cold emails, and a structured improvement loop.",
    tags: ["Career", "Systems", "Process"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "what-i-learned-applying-to-100-plus-roles",
    title: "What I Learned Applying to 100+ Roles",
    category: "Career & Job Search",
    status: "planned",
    summary:
      "I’m documenting what the application process exposed about targeting, positioning, feedback, and iteration.",
    tags: ["Career", "Job Search"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "why-most-applications-fail",
    title: "Why Most Applications Fail",
    category: "Career & Job Search",
    status: "planned",
    summary:
      "I’m analyzing where applications break down and what I’m fixing in my own outreach and positioning system.",
    tags: ["Career", "Job Search"],
    source: ["readme_portfolio.md"]
  }
];

export const thinkingCategories = [
  "Problem Breakdowns",
  "Technical Evaluation & Judging",
  "Career & Job Search",
  "What I’m Learning Now",
  "Mental Models",
  "Research Notes"
] as const;
