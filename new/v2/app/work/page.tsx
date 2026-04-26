"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { projects, type WorkFilter, workFilters } from "@/lib/projects";

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="page container work-stack">
      <header className="work-head">
        <h1>Work</h1>
        <p>
          Production systems, ML systems, and research-backed builds focused on measurable outcomes.
        </p>
      </header>

      <div className="filter-row" role="tablist" aria-label="Project filters">
        {workFilters.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={isActive ? "filter-chip active" : "filter-chip"}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="project-grid">
        {filteredProjects.map((project) => (
          <article key={project.slug} className="project-card">
            <div className="project-topline">
              <p className="project-meta">
                {project.year} · {project.category}
              </p>
              <p className="project-impact">{project.impact}</p>
            </div>
            <h2>{project.title}</h2>
            <p>{project.detail}</p>
            <div className="tag-row">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/work/${project.slug}`} className="inline-link">
              Deep Dive →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
