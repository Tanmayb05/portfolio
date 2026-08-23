import type { Metric } from "@/lib/content-types";

export type MetricHome =
  | "selected-impact"
  | "experience"
  | "project"
  | "recruiter-mode"
  | "deferred";

export type ProvenancedMetric = Metric & {
  id: string;
  home: MetricHome;
  confidence: "sourced" | "needs-context";
};

export const proofMetrics: ProvenancedMetric[] = [
  {
    id: "production-upgrades",
    value: "44",
    label: "production upgrades",
    context: "Delivered in 4 months at Siemens Industry Software.",
    source: "1-experience.json",
    home: "selected-impact",
    confidence: "sourced"
  },
  {
    id: "downtime-reduction",
    value: "50%",
    label: "downtime reduction",
    context: "Blue-Green deployment framework for production upgrades.",
    source: "1-experience.json",
    home: "selected-impact",
    confidence: "sourced"
  },
  {
    id: "environment-fleet",
    value: "40+",
    label: "production environments",
    context: "Migrated from process-based deployments to Kubernetes.",
    source: "1-experience.json",
    home: "selected-impact",
    confidence: "sourced"
  },
  {
    id: "research-speedup",
    value: "25.7x",
    label: "latency reduction",
    context: "Android bug reproduction research: 39.4s vs 1012.1s average per run.",
    source: "1-experience.json",
    home: "selected-impact",
    confidence: "sourced"
  },
  {
    id: "deployment-effectiveness",
    value: "40%",
    label: "deployment time reduction",
    context: "Python/Boto3 automation replacing legacy Ruby scripts at Siemens.",
    source: "1-experience.json",
    home: "experience",
    confidence: "sourced"
  },
  {
    id: "mcp-tools",
    value: "17",
    label: "MCP tool APIs",
    context: "PolicyPilot tool server with Zod validation at every data boundary.",
    source: "2-projects.json",
    home: "project",
    confidence: "sourced"
  }
];

export const selectedImpactMetrics = proofMetrics.filter(
  (metric) => metric.home === "selected-impact"
);
