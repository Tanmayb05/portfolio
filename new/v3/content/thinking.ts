import type { ThinkingEntry } from "@/lib/content-types";

export const thinkingEntries: ThinkingEntry[] = [
  {
    slug: "android-bug-reproduction-systems",
    title: "Android Bug Reproduction Systems",
    category: "Problem Breakdowns",
    status: "planned",
    summary:
      "I'm breaking down how automated Android bug reproduction systems can observe, reason about, and replay failure paths.",
    focusPoints: [
      "Observation: how a system captures screen state, user actions, and failure evidence.",
      "Reasoning: how the system decides which paths matter for reproduction.",
      "Replay: how the system turns evidence into repeatable Android actions."
    ],
    tags: ["Android", "Automation", "Systems"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "distributed-logging-systems",
    title: "Distributed Logging Systems",
    category: "Problem Breakdowns",
    status: "planned",
    summary:
      "I'm studying how distributed logging systems preserve useful evidence across services, deployments, and failure modes.",
    focusPoints: [
      "Evidence: what logs need to preserve across distributed services.",
      "Traceability: how logs connect deployments, requests, and failure modes.",
      "Usefulness: how logging supports debugging instead of just storing events."
    ],
    tags: ["Distributed Systems", "Observability"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "how-instagram-recommends-reels",
    title: "How Instagram Recommends Reels",
    category: "Problem Breakdowns",
    status: "planned",
    summary:
      "I'm mapping the likely recommendation-system pieces behind Reels, from candidate generation to ranking and feedback loops.",
    focusPoints: [
      "Candidate generation: how a large content pool narrows into possible Reels.",
      "Ranking: how the system can order candidates for a user session.",
      "Feedback loops: how watch behavior can shape future recommendations."
    ],
    tags: ["Recommendations", "ML Systems"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "how-niantic-built-ar-world-from-user-images",
    title: "How Niantic Built AR World from User Images",
    category: "Problem Breakdowns",
    status: "planned",
    summary:
      "I'm exploring how user-captured images can become a shared AR world model through vision, mapping, and infrastructure.",
    focusPoints: [
      "Inputs: how user-captured images become useful mapping evidence.",
      "Vision: how the system can extract structure from image data.",
      "Infrastructure: how a shared AR world needs persistent updates."
    ],
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
    focusPoints: [
      "System design: I look for clear architecture, constraints, and failure modes.",
      "ML rigor: I look for evidence, baselines, and evaluation discipline.",
      "Viability: I ask whether the project can survive real-world use."
    ],
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
    focusPoints: [
      "Constraints: I ask what shaped the solution.",
      "Tradeoffs: I ask what the team chose not to do and why.",
      "Evidence: I ask how the team knows the system works."
    ],
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
    focusPoints: [
      "Clarity: I look for a crisp problem and system explanation.",
      "Depth: I look for implementation choices beyond the demo surface.",
      "Honesty: I look for clear limits and next improvements."
    ],
    tags: ["CEAS Expo", "Judging"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "how-i-am-running-my-job-search-like-a-system",
    title: "How I'm Running My Job Search Like a System",
    category: "Career & Job Search",
    status: "active",
    summary:
      "I'm running my job search with daily applications, referral outreach, cold emails, and a structured improvement loop.",
    focusPoints: [
      "Daily applications: I keep the system moving consistently.",
      "Referral outreach: I use network-driven paths where they make sense.",
      "Cold emails: I test direct outreach to founders and recruiters."
    ],
    tags: ["Career", "Systems", "Process"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "what-i-learned-applying-to-100-plus-roles",
    title: "What I Learned Applying to 100+ Roles",
    category: "Career & Job Search",
    status: "planned",
    summary:
      "I'm documenting what the application process exposed about targeting, positioning, feedback, and iteration.",
    focusPoints: [
      "Targeting: I review which roles and companies match my work.",
      "Positioning: I improve how I explain my systems and proof.",
      "Iteration: I track what changes after each application cycle."
    ],
    tags: ["Career", "Job Search"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "why-most-applications-fail",
    title: "Why Most Applications Fail",
    category: "Career & Job Search",
    status: "planned",
    summary:
      "I'm analyzing where applications break down and what I'm fixing in my own outreach and positioning system.",
    focusPoints: [
      "Application quality: I identify weak signal and unclear positioning.",
      "Outreach: I improve how I contact recruiters, founders, and referrals.",
      "Feedback: I look for repeatable lessons instead of one-off reactions."
    ],
    tags: ["Career", "Job Search"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "what-i-am-learning-now",
    title: "What I'm Learning Now",
    category: "What I'm Learning Now",
    status: "active",
    summary:
      "I'm focusing on System Design, Leetcode backtracking and sliding window patterns, and behavioral interview preparation.",
    focusPoints: [
      "Current: System Design base problems.",
      "Current: Leetcode backtracking and sliding window.",
      "Current: Behavioral interview preparation.",
      "Next: Graph problems, 1D dynamic programming, and advanced System Design."
    ],
    tags: ["Learning", "System Design", "DSA"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "mental-models-i-use",
    title: "Mental Models I Use",
    category: "Mental Models",
    status: "draft",
    summary:
      "I use structured prioritization, simplification-first thinking, and decision systems to make complex work easier to act on.",
    focusPoints: [
      "Eisenhower Decision Matrix: I separate urgent work from important work.",
      "Prioritization shift: I move from instinct-based prioritization to structured decision-making.",
      "Simplification-first thinking: I reduce complex problems before optimizing solutions."
    ],
    tags: ["Decision Making", "Prioritization", "Systems"],
    source: ["readme_portfolio.md"]
  },
  {
    slug: "research-notes-framework",
    title: "Research Notes Framework",
    category: "Research Notes",
    status: "planned",
    summary:
      "I'm organizing research notes around idea, weakness, and my extension for GIFDroid, LLM-based systems, vision models, screen recording analysis, and auto bug reproduction.",
    focusPoints: [
      "Idea: I capture the core technical approach.",
      "Weakness: I identify where the approach breaks or lacks evidence.",
      "My extension: I define the direction I would test or build next."
    ],
    tags: ["Research", "LLM Systems", "Vision"],
    source: ["readme_portfolio.md"]
  }
];

export const thinkingCategories = [
  "Problem Breakdowns",
  "Technical Evaluation & Judging",
  "Career & Job Search",
  "What I'm Learning Now",
  "Mental Models",
  "Research Notes"
] as const;

export function getThinkingEntryBySlug(slug: string) {
  return thinkingEntries.find((entry) => entry.slug === slug);
}

export function getThinkingEntriesByCategory() {
  return thinkingCategories.map((category) => ({
    category,
    entries: thinkingEntries.filter((entry) => entry.category === category)
  }));
}
