import { TechStackBadge } from "@/components/cards/TechStackBadge";

type SkillGroupProps = {
  title: string;
  skills: string[];
};

export function SkillGroup({ title, skills }: SkillGroupProps) {
  return (
    <article className="motion-card border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)]">
      <h3 className="text-xl font-black uppercase leading-none text-[var(--ink)]">
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
