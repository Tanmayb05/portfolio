import { TechStackBadge } from "@/components/cards/TechStackBadge";

type SkillGroupProps = {
  title: string;
  skills: string[];
};

export function SkillGroup({ title, skills }: SkillGroupProps) {
  return (
    <article className="motion-card motion-border-glow rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 hover:bg-[var(--surface-elevated)]">
      <h3 className="text-base font-semibold text-[var(--text-primary)]">
        {title}
      </h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <TechStackBadge key={skill}>{skill}</TechStackBadge>
        ))}
      </div>
    </article>
  );
}
