"use client";

import { useState } from "react";

import { TechStackBadge } from "@/components/cards/TechStackBadge";
import type { WorkExperienceItem } from "@/lib/content-types";

type ExperienceCardProps = {
  role: WorkExperienceItem;
};

export function ExperienceCard({ role }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleAchievements = isExpanded
    ? role.achievements
    : role.achievements.slice(0, 3);

  return (
    <article className="motion-card motion-border-glow rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 hover:bg-[var(--surface-elevated)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-teal)]">
            {role.company}
          </p>
          <h3 className="mt-3 text-xl font-semibold leading-tight text-[var(--text-primary)]">
            {role.title}
          </h3>
        </div>
        <p className="font-mono text-xs text-[var(--text-muted)]">
          {role.start_date} - {role.end_date}
        </p>
      </div>

      <ul className="mt-5 space-y-3">
        {visibleAchievements.map((achievement) => (
          <li
            className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]"
            key={achievement}
          >
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-teal)]"
            />
            <span>{achievement}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {role.tech_stack.map((tech) => (
          <TechStackBadge key={tech}>{tech}</TechStackBadge>
        ))}
      </div>

      {role.achievements.length > 3 ? (
        <button
          className="motion-focus mt-5 inline-flex rounded-full border border-[var(--border-soft)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition duration-200 hover:border-[var(--accent-teal-border)] hover:bg-[var(--accent-teal-soft)]"
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
        >
          {isExpanded ? "Show less" : "Show full role"}
        </button>
      ) : null}
    </article>
  );
}
