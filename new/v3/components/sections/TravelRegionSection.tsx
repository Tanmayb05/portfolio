import { Reveal } from "@/components/motion";
import { TravelMap } from "@/components/sections/TravelMap";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { TravelEntry, TravelRegion } from "@/lib/content-types";

type TravelRegionSectionProps = {
  entries: TravelEntry[];
  region: TravelRegion;
};

const regionCopy: Record<TravelRegion, string> = {
  USA: "I am starting with the available USA placeholders from the source notes.",
  India: "I will add India state and city details when the travel notes are ready.",
  China: "I will add China province and city details when the travel notes are ready."
};

export function TravelRegionSection({
  entries,
  region
}: TravelRegionSectionProps) {
  return (
    <section className="border-b border-[var(--border-soft)] py-20 sm:py-24">
      <Reveal>
        <SectionHeading
          eyebrow={region}
          title={`${region} travel layer`}
          description={regionCopy[region]}
        />
      </Reveal>

      <Reveal className="mt-10" delay={120}>
        <TravelMap entries={entries} region={region} />
      </Reveal>
    </section>
  );
}
