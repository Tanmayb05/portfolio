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
        className="absolute bottom-0 left-3 top-0 hidden w-[3px] bg-[var(--ink)] md:block"
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
              className="absolute left-[0.3rem] top-7 hidden h-4 w-4 border-[3px] border-[var(--ink)] bg-[var(--purple)] md:block"
            />
            <ExperienceCard role={role} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
