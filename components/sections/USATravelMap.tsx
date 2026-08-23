"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { TravelEntry } from "@/lib/content-types";

// Dynamically import to avoid SSR issues with react-simple-maps
const USAGeographicMap = dynamic(
  () =>
    import("@/components/travel/usa-geographic-map").then(
      (mod) => mod.USAGeographicMap
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 border-[3px] border-[var(--ink)] bg-[var(--white)] shadow-[var(--shadow-md)]" />
    )
  }
);

interface USATravelMapProps {
  entries: TravelEntry[];
}

export function USATravelMap({ entries }: USATravelMapProps) {
  const [selectedState, setSelectedState] = useState<TravelEntry | null>(null);

  return (
    <div className="w-full">
      <USAGeographicMap
        entries={entries}
        selectedCode={selectedState?.stateCode}
        onSelectState={setSelectedState}
      />
    </div>
  );
}
