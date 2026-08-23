"use client";

import { useMemo, useState } from "react";

import { StickerBadge } from "@/components/ui/StickerBadge";
import { SystemFlow } from "@/components/ui/SystemFlow";
import type { Accent, Architecture } from "@/lib/content-types";

type BuildMode = {
  id: string;
  label: string;
  accent: Accent;
  summary: string;
  stack: string[];
  architecture: Architecture;
};

const buildModes: BuildMode[] = [
  {
    id: "cloud",
    label: "Cloud",
    accent: "green",
    summary:
      "Infrastructure paths where deploys, validation, and rollback behavior are designed before the feature ships.",
    stack: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    architecture: {
      nodes: [
        {
          id: "change",
          label: "Change",
          detail: "Service upgrade, deployment config, or platform migration.",
          kind: "input"
        },
        {
          id: "pipeline",
          label: "Pipeline",
          detail: "Automated checks, environment targeting, and release gates.",
          kind: "process"
        },
        {
          id: "platform",
          label: "Platform",
          detail: "AWS services, Kubernetes workloads, and infrastructure state.",
          kind: "storage"
        },
        {
          id: "signal",
          label: "Signal",
          detail: "Health checks and operational feedback decide the next action.",
          kind: "output"
        }
      ],
      edges: [
        { from: "change", to: "pipeline", label: "validate" },
        { from: "pipeline", to: "platform", label: "deploy" },
        { from: "platform", to: "signal", label: "observe" },
        { from: "signal", to: "pipeline", label: "rollback or promote" }
      ]
    }
  },
  {
    id: "backends",
    label: "Backends",
    accent: "blue",
    summary:
      "API systems with clear contracts, typed boundaries, persistence, and operational visibility.",
    stack: ["FastAPI", "Express", "PostgreSQL", "Redis"],
    architecture: {
      nodes: [
        {
          id: "client",
          label: "Client",
          detail: "Product UI, script, agent, or integration request.",
          kind: "input"
        },
        {
          id: "contract",
          label: "Contract",
          detail: "Validated request shape and stable response schema.",
          kind: "process"
        },
        {
          id: "service",
          label: "Service",
          detail: "Business logic, orchestration, and failure handling.",
          kind: "process"
        },
        {
          id: "state",
          label: "State",
          detail: "Database, cache, queue, or external dependency.",
          kind: "storage"
        },
        {
          id: "response",
          label: "Response",
          detail: "Useful output with errors surfaced in plain terms.",
          kind: "output"
        }
      ],
      edges: [
        { from: "client", to: "contract", label: "parse" },
        { from: "contract", to: "service", label: "execute" },
        { from: "service", to: "state", label: "read/write" },
        { from: "service", to: "response", label: "return" }
      ]
    }
  },
  {
    id: "ai",
    label: "AI Systems",
    accent: "purple",
    summary:
      "LLM and ML systems that ground outputs in retrieval, validation, and measured behavior.",
    stack: ["RAG", "Gemini", "PyTorch", "Evaluation"],
    architecture: {
      nodes: [
        {
          id: "question",
          label: "Question",
          detail: "User task, document query, or prediction request.",
          kind: "input"
        },
        {
          id: "retrieval",
          label: "Retrieval",
          detail: "Relevant source chunks, features, or examples are selected.",
          kind: "process"
        },
        {
          id: "model",
          label: "Model",
          detail: "LLM, classifier, or forecasting model produces an answer.",
          kind: "external"
        },
        {
          id: "guardrail",
          label: "Guardrail",
          detail: "Citations, schemas, and evaluation checks constrain output.",
          kind: "process"
        },
        {
          id: "answer",
          label: "Answer",
          detail: "Decision-ready result with evidence or confidence context.",
          kind: "output"
        }
      ],
      edges: [
        { from: "question", to: "retrieval", label: "ground" },
        { from: "retrieval", to: "model", label: "context" },
        { from: "model", to: "guardrail", label: "validate" },
        { from: "guardrail", to: "answer", label: "ship" }
      ]
    }
  },
  {
    id: "devtools",
    label: "Dev Tools",
    accent: "yellow",
    summary:
      "Automation that turns repeated engineering judgment into commands, checks, and reliable feedback loops.",
    stack: ["Python", "Boto3", "CLI", "Validation"],
    architecture: {
      nodes: [
        {
          id: "operator",
          label: "Operator",
          detail: "Engineer intent or production runbook action.",
          kind: "input"
        },
        {
          id: "tool",
          label: "Tool",
          detail: "Script, CLI, or workflow codifies the repeated path.",
          kind: "process"
        },
        {
          id: "checks",
          label: "Checks",
          detail: "Preflight validation catches risky state early.",
          kind: "process"
        },
        {
          id: "action",
          label: "Action",
          detail: "The tool changes infrastructure, data, or release state.",
          kind: "output"
        }
      ],
      edges: [
        { from: "operator", to: "tool", label: "intent" },
        { from: "tool", to: "checks", label: "preflight" },
        { from: "checks", to: "action", label: "apply" },
        { from: "action", to: "operator", label: "report" }
      ]
    }
  },
  {
    id: "data",
    label: "Data Systems",
    accent: "red",
    summary:
      "Pipelines that convert messy raw inputs into modeled, queryable, and inspectable product surfaces.",
    stack: ["Spark", "ETL", "SQL", "Dashboards"],
    architecture: {
      nodes: [
        {
          id: "raw",
          label: "Raw data",
          detail: "Exports, APIs, trip records, logs, or documents.",
          kind: "input"
        },
        {
          id: "clean",
          label: "Clean",
          detail: "Deduplicate, validate, enrich, and checkpoint.",
          kind: "process"
        },
        {
          id: "model",
          label: "Model",
          detail: "Forecasts, aggregates, materialized views, or embeddings.",
          kind: "storage"
        },
        {
          id: "serve",
          label: "Serve",
          detail: "API and dashboard layers expose the useful shape.",
          kind: "output"
        }
      ],
      edges: [
        { from: "raw", to: "clean", label: "ingest" },
        { from: "clean", to: "model", label: "transform" },
        { from: "model", to: "serve", label: "query" }
      ]
    }
  }
];

export function SystemBuilder() {
  const [selectedId, setSelectedId] = useState(buildModes[0].id);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const activeId = previewId ?? selectedId;
  const activeMode = useMemo(
    () => buildModes.find((mode) => mode.id === activeId) ?? buildModes[0],
    [activeId]
  );
  const selectedMode =
    buildModes.find((mode) => mode.id === selectedId) ?? buildModes[0];
  const isPreviewing = Boolean(previewId && previewId !== selectedId);

  return (
    <section
      aria-labelledby="system-builder-title"
      className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-4 shadow-[var(--shadow-md)] sm:p-6"
    >
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr] xl:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <StickerBadge tone="purple">03</StickerBadge>
            <p className="font-mono text-xs font-black uppercase text-[var(--text-muted)]">
              Interactive System Builder
            </p>
          </div>
          <h2
            className="mt-4 text-[length:var(--text-h2)] font-black uppercase leading-none text-[var(--ink)]"
            id="system-builder-title"
          >
            I build
          </h2>
          <p className="mt-4 max-w-[46rem] border-t-[3px] border-[var(--ink)] pt-4 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
            Cloud platforms, backend services, AI workflows, developer tools,
            and data products all need the same habit: make the moving parts
            explicit before code hides them.
          </p>

          <div
            aria-label="System type"
            className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
            role="group"
          >
            {buildModes.map((mode) => {
              const isSelected = mode.id === selectedId;
              const isActive = mode.id === activeId;

              return (
                <button
                  aria-pressed={isSelected}
                  className={`motion-focus border-[3px] border-[var(--ink)] p-3 text-left shadow-[var(--shadow-sm)] transition ${
                    isActive
                      ? "translate-x-1 translate-y-1 bg-[var(--yellow)] shadow-[2px_2px_0_var(--ink)]"
                      : "bg-[var(--paper)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
                  }`}
                  key={mode.id}
                  onClick={() => setSelectedId(mode.id)}
                  onMouseEnter={() => setPreviewId(mode.id)}
                  onMouseLeave={() => setPreviewId(null)}
                  type="button"
                >
                  <span className="font-mono text-[0.68rem] font-black uppercase text-[var(--text-muted)]">
                    {isSelected ? "Selected" : isActive ? "Preview" : "Option"}
                  </span>
                  <span className="mt-2 block text-xl font-black uppercase leading-none text-[var(--ink)]">
                    {mode.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div aria-live="polite" className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <StickerBadge tone={activeMode.accent}>
              {isPreviewing ? "Previewing" : "Locked"}
            </StickerBadge>
            <p className="font-mono text-xs font-black uppercase text-[var(--text-muted)]">
              Selected: {selectedMode.label}
            </p>
          </div>
          <SystemFlow
            accent={activeMode.accent}
            architecture={activeMode.architecture}
            description={activeMode.summary}
            direction="branching"
            title={`${activeMode.label} flow`}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {activeMode.stack.map((item) => (
              <span
                className="border-2 border-[var(--ink)] bg-[var(--paper)] px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-[var(--ink)]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
