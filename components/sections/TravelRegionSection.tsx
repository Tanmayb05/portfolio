import { Reveal } from "@/components/motion";
import { TravelMap } from "@/components/sections/TravelMap";
import { USATravelMap } from "@/components/sections/USATravelMap";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { TravelEntry, TravelRegion } from "@/lib/content-types";

type TravelRegionSectionProps = {
  entries: TravelEntry[];
  region: TravelRegion;
};

const regionCopy: Record<TravelRegion, string> = {
  USA: "Interactive choropleth map of 11 visited states with 263+ places from 11 trips. Click states to explore detailed itineraries.",
  India: "I will add India state and city details when the travel notes are ready.",
  China: "I will add China province and city details when the travel notes are ready."
};

export function TravelRegionSection({
  entries,
  region
}: TravelRegionSectionProps) {
  const regionEntries = entries.filter(e => e.region === region);

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
        {region === "USA" ? (
          <USATravelMap entries={regionEntries} />
        ) : (
          <TravelMap entries={regionEntries} region={region} />
        )}
      </Reveal>
    </section>
  );
}
