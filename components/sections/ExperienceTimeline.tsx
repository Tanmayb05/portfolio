import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { Reveal } from "@/components/motion";
import type { WorkExperienceItem } from "@/lib/content-types";

type ExperienceTimelineProps = {
  roles: WorkExperienceItem[];
};

export function ExperienceTimeline({ roles }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-3 top-0 hidden w-px bg-[var(--border-soft)] md:block"
      />
      <div className="space-y-5">
        {roles.map((role, index) => (
          <Reveal
            className="relative md:pl-10"
            delay={index * 90}
            key={`${role.company}-${role.title}-${role.start_date}`}
          >
            <span
              aria-hidden="true"
              className="absolute left-[0.44rem] top-7 hidden h-3 w-3 rounded-full border border-[var(--accent-teal-border)] bg-[var(--accent-teal)] shadow-[0_0_22px_var(--accent-teal-soft)] md:block"
            />
            <ExperienceCard role={role} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
