import projectsJson from "@/data/source/2-projects.json";
import type { Project } from "@/lib/content-types";

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

function flattenMetrics(
  metrics: { exactMetric: string; whatItMeasured: string }[]
): string[] {
  return metrics.map((metric) => metric.exactMetric);
}

export const projects: Project[] = projectsJson
  .map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    shortTitle: SHORT_TITLE_BY_SLUG[entry.slug] ?? entry.title,
    date: entry.context.whenDidYouBuildIt,
    category: CATEGORY_BY_SLUG[entry.slug] ?? "AI Systems",
    summary: entry.summary,
    problem: flattenProblem(entry.problem),
    context: flattenContext(entry.context),
    architecture: flattenArchitecture(entry.architecture),
    decisions: entry.technicalDecisions.map((decision) => decision.decision),
    tradeoffs: entry.tradeoffs,
    nextImprovements: entry.whatIWouldImproveNext,
    proofPoints: entry.technicalDecisions.map((decision) => decision.whyIChoseIt),
    metrics: flattenMetrics(entry.metrics),
    techStack: entry.techStack,
    source: ["2-projects.json"] as Project["source"]
  }))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export const featuredProjects = FEATURED_SLUGS.map((slug) =>
  projects.find((project) => project.slug === slug)
).filter((project): project is Project => project !== undefined);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const projectCategories = Array.from(
  new Set(projects.map((project) => project.category))
);
