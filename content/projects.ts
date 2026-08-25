import projectsJson from "@/data/source/2-projects.json";
import type { Accent, Architecture, Asset, Metric, Project } from "@/lib/content-types";

const CATEGORY_BY_SLUG: Record<string, Project["category"]> = {
  spendora: "AI Systems",
  "news-headline-classification": "Deep Learning",
  "media-recommendation-system": "Recommendation Systems",
  "soundscape-android": "Android",
  policypilot: "AI Systems",
  "nyc-mobility-forecasting": "Data & ML Systems",
  "spotify-personal-analytics-platform": "Full-Stack Systems"
};

const SHORT_TITLE_BY_SLUG: Record<string, string> = {
  spendora: "Spendora",
  "news-headline-classification": "Headline Classification",
  "media-recommendation-system": "Media Recommender",
  "soundscape-android": "SoundScape",
  policypilot: "PolicyPilot",
  "nyc-mobility-forecasting": "NYC Mobility Forecasting",
  "spotify-personal-analytics-platform": "Spotify Analytics"
};

const FEATURED_SLUGS = [
  "policypilot",
  "nyc-mobility-forecasting",
  "spotify-personal-analytics-platform"
];

const ACCENT_BY_SLUG: Record<string, Accent> = {
  spendora: "purple",
  "news-headline-classification": "yellow",
  "media-recommendation-system": "purple",
  "soundscape-android": "green",
  policypilot: "purple",
  "nyc-mobility-forecasting": "blue",
  "spotify-personal-analytics-platform": "green"
};

const FEATURED_ORDER_BY_SLUG = new Map(
  FEATURED_SLUGS.map((slug, index) => [slug, index + 1])
);

const LINK_UNAVAILABLE = new Set(["", "TBD"]);

function isPublishedLink(value?: string) {
  return Boolean(value && !LINK_UNAVAILABLE.has(value));
}

function architectureNodesFromSource(architecture: {
  input: string;
  backend: string;
  dataModelStorage: string;
  externalAPIs: string;
  outputUserExperience: string;
}): Architecture {
  const nodes: Architecture["nodes"] = [
    {
      id: "input",
      label: "Input",
      detail: architecture.input,
      kind: "input"
    },
    {
      id: "backend",
      label: "Backend",
      detail: architecture.backend,
      kind: "process"
    },
    {
      id: "storage",
      label: "Data / storage",
      detail: architecture.dataModelStorage,
      kind: "storage"
    },
    {
      id: "external",
      label: "External APIs",
      detail: architecture.externalAPIs,
      kind: "external"
    },
    {
      id: "output",
      label: "Output",
      detail: architecture.outputUserExperience,
      kind: "output"
    }
  ];

  return {
    nodes,
    edges: [
      { from: "input", to: "backend" },
      { from: "backend", to: "storage" },
      { from: "backend", to: "external" },
      { from: "storage", to: "output" },
      { from: "external", to: "output" }
    ]
  };
}

function flattenArchitecture(architecture: {
  input: string;
  backend: string;
  dataModelStorage: string;
  externalAPIs: string;
  outputUserExperience: string;
}): string[] {
  return [
    `Input: ${architecture.input}`,
    `Backend: ${architecture.backend}`,
    `Data & storage: ${architecture.dataModelStorage}`,
    `External APIs: ${architecture.externalAPIs}`,
    `Output: ${architecture.outputUserExperience}`
  ];
}

function flattenProblem(problem: {
  whatProblem: string;
  whoForIsWas: string;
  whyDidItMatter: string;
}): string {
  return `${problem.whatProblem} ${problem.whoForIsWas}. ${problem.whyDidItMatter}.`;
}

function flattenContext(context: {
  whenDidYouBuildIt: string;
  typeOfProject: string;
  constraints: string;
}): string {
  return `Built ${context.whenDidYouBuildIt} (${context.typeOfProject}). ${context.constraints}.`;
}

function summarizeBuilt(architecture: {
  backend: string;
  dataModelStorage: string;
  outputUserExperience: string;
}): string {
  return `${architecture.backend}; ${architecture.dataModelStorage}; ${architecture.outputUserExperience}`;
}

function ownershipFromSource(entry: (typeof projectsJson)[number]) {
  const projectType = entry.context.typeOfProject;
  const isTeamContext = /hackathon|academic|research/i.test(projectType);

  return {
    model: isTeamContext
      ? `${projectType} with defined system ownership`
      : `${projectType} build with end-to-end ownership`,
    exactOwnership: [
      `Problem framing: ${entry.problem.whatProblem}`,
      `Architecture: ${entry.architecture.backend}`,
      `Implementation: ${entry.architecture.dataModelStorage}`,
      `Evaluation: ${entry.metrics
        .filter((metric) => metric.source !== "TBD")
        .map((metric) => metric.exactMetric)
        .join("; ") || "metrics not published yet"}`
    ],
    whatExistedBefore: entry.problem.whyDidItMatter,
    personallyDesigned: entry.technicalDecisions.map(
      (decision) => `${decision.decision} because ${decision.whyIChoseIt}`
    ),
    collaboratorsOwned: isTeamContext
      ? "External datasets, APIs, academic baselines, or hackathon constraints shaped the work; the project page calls out what the source data verifies."
      : "No separate collaborator-owned subsystem is published in the source data."
  };
}

function implementationFromSource(entry: (typeof projectsJson)[number]) {
  return [
    `Input layer: ${entry.architecture.input}`,
    `Core system: ${entry.architecture.backend}`,
    `Data layer: ${entry.architecture.dataModelStorage}`,
    `External boundary: ${entry.architecture.externalAPIs}`,
    `User output: ${entry.architecture.outputUserExperience}`
  ];
}

function failureNotesFromSource(entry: (typeof projectsJson)[number]) {
  return [
    ...entry.technicalDecisions.map(
      (decision) =>
        `Rejected: ${decision.alternativeConsidered}. Chosen path: ${decision.decision}.`
    ),
    ...entry.tradeoffs
  ];
}

function askMeAboutFromSource(entry: (typeof projectsJson)[number]) {
  const metricPrompt =
    entry.metrics.find((metric) => metric.source !== "TBD")?.whatItMeasured ??
    "how I would measure the next version";

  return [
    `Why this architecture boundary exists: ${entry.architecture.backend}`,
    `How I evaluated ${metricPrompt}`,
    `The hardest tradeoff: ${entry.tradeoffs[0] ?? entry.context.constraints}`,
    `What I would change next: ${entry.whatIWouldImproveNext[0]}`
  ];
}

function flattenMetrics(
  metrics: { exactMetric: string; whatItMeasured: string; source: string }[]
): Metric[] {
  return metrics
    .filter((metric) => metric.source !== "TBD")
    .map((metric) => ({
      value: metric.exactMetric,
      label: metric.whatItMeasured,
      context: metric.whatItMeasured,
      source: metric.source
    }));
}

function visualAssetsFromSource(
  screenshotsOrVisuals: string[],
  slug: string
): Asset[] {
  return screenshotsOrVisuals.map((visual, index) => ({
    kind: index === 0 ? "product-screenshot" : "system-graphic",
    label: visual,
    alt: `${visual} for ${SHORT_TITLE_BY_SLUG[slug] ?? slug}`,
    status: "planned",
    source: "2-projects.json",
    notes: "Placeholder inventory item; add a real artifact before using as a primary visual."
  }));
}

export const projects: Project[] = projectsJson
  .map((entry) => {
    const visuals = visualAssetsFromSource(entry.screenshotsOrVisuals, entry.slug);
    const github = isPublishedLink(entry.links.github)
      ? entry.links.github
      : undefined;
    const demo = isPublishedLink(entry.links.demo) ? entry.links.demo : undefined;

    return {
      slug: entry.slug,
      name: SHORT_TITLE_BY_SLUG[entry.slug] ?? entry.title,
      title: entry.title,
      shortTitle: SHORT_TITLE_BY_SLUG[entry.slug] ?? entry.title,
      shortDescription: entry.summary,
      date: entry.context.whenDidYouBuildIt,
      category: CATEGORY_BY_SLUG[entry.slug] ?? "AI Systems",
      accent: ACCENT_BY_SLUG[entry.slug] ?? "blue",
      summary: entry.summary,
      problem: flattenProblem(entry.problem),
      built: summarizeBuilt(entry.architecture),
      outcome: entry.metrics.find((metric) => metric.source !== "TBD")?.exactMetric,
      context: flattenContext(entry.context),
      architecture: architectureNodesFromSource(entry.architecture),
      architectureSummary: flattenArchitecture(entry.architecture),
      ownership: ownershipFromSource(entry),
      decisions: entry.technicalDecisions.map((decision) => decision.decision),
      tradeoffs: entry.tradeoffs,
      implementation: implementationFromSource(entry),
      failureNotes: failureNotesFromSource(entry),
      nextImprovements: entry.whatIWouldImproveNext,
      proofPoints: entry.technicalDecisions.map((decision) => decision.whyIChoseIt),
      askMeAbout: askMeAboutFromSource(entry),
      metrics: flattenMetrics(entry.metrics),
      techStack: entry.techStack,
      stack: entry.techStack,
      featured: FEATURED_ORDER_BY_SLUG.has(entry.slug),
      featuredOrder: FEATURED_ORDER_BY_SLUG.get(entry.slug),
      github,
      demo,
      visuals,
      primaryVisual: visuals[0],
      source: ["2-projects.json"] as Project["source"]
    };
  })
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const projectCategories = Array.from(
  new Set(projects.map((project) => project.category))
);
