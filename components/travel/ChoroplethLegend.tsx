"use client";

import { getChoroplethColor } from "@/lib/travel";

interface ChoroplethLegendProps {
  maxPlaceCount: number;
}

export function ChoroplethLegend({ maxPlaceCount }: ChoroplethLegendProps) {
  const intensities = [
    { level: "very-light", label: `1–${Math.ceil(maxPlaceCount * 0.25)}` },
    {
      level: "light" as const,
      label: `${Math.ceil(maxPlaceCount * 0.25) + 1}–${Math.ceil(maxPlaceCount * 0.5)}`,
    },
    {
      level: "medium" as const,
      label: `${Math.ceil(maxPlaceCount * 0.5) + 1}–${Math.ceil(maxPlaceCount * 0.75)}`,
    },
    {
      level: "dark" as const,
      label: `${Math.ceil(maxPlaceCount * 0.75) + 1}–${maxPlaceCount}`,
    },
  ];

  return (
    <div className="flex items-center justify-center gap-6 text-sm">
      <span className="text-gray-600">Places visited:</span>
      <div className="flex gap-4">
        {(
          intensities as Array<{
            level: "very-light" | "light" | "medium" | "dark";
            label: string;
          }>
        ).map((item) => (
          <div key={item.level} className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded border border-gray-300"
              style={{ backgroundColor: getChoroplethColor(item.level) }}
            />
            <span className="text-xs text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
