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
    <article className="motion-card border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-xs font-black uppercase text-[var(--purple)]">
            {role.company}
          </p>
          <h3 className="mt-3 text-2xl font-black uppercase leading-none text-[var(--ink)]">
            {role.title}
          </h3>
        </div>
        <p className="w-fit border-2 border-[var(--ink)] bg-[var(--paper)] px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-[var(--ink)]">
          {role.start_date} - {role.end_date}
        </p>
      </div>

      <ul className="mt-5 space-y-3 border-t-[3px] border-dashed border-[var(--ink)] pt-5">
        {visibleAchievements.map((achievement) => (
          <li
            className="grid grid-cols-[auto_1fr] gap-3 text-sm font-semibold leading-6 text-[var(--text-secondary)]"
            key={achievement}
          >
            <span
              aria-hidden="true"
              className="mt-2 h-2 w-2 border-2 border-[var(--ink)] bg-[var(--purple)]"
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
          className="motion-focus mt-5 inline-flex border-[3px] border-[var(--ink)] bg-[var(--white)] px-4 py-2 font-mono text-xs font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
        >
          {isExpanded ? "Show less" : "Show full role"}
        </button>
      ) : null}
    </article>
  );
}
