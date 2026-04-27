"use client";

import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import type { TravelEntry } from "@/lib/content-types";
import {
  getVisitedStates,
  getMaxPlaceCount,
  getChoroplethColor,
  getChoroplethIntensity,
  getStateByCode,
} from "@/lib/travel";
import { ChoroplethLegend } from "@/components/travel/ChoroplethLegend";
import { StateDrawer } from "@/components/travel/StateDrawer";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface USATravelMapProps {
  entries: TravelEntry[];
}

export function USATravelMap({ entries }: USATravelMapProps) {
  const [selectedState, setSelectedState] = useState<TravelEntry | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const visitedStates = useMemo(
    () => getVisitedStates(entries),
    [entries]
  );

  const maxPlaceCount = useMemo(
    () => getMaxPlaceCount(entries),
    [entries]
  );

  const stateMap = useMemo(() => {
    const map: Record<string, TravelEntry> = {};
    for (const state of entries) {
      if (state.stateCode) {
        map[state.stateCode] = state;
      }
    }
    return map;
  }, [entries]);

  const isVisited = (stateName: string): boolean => {
    // Match state name from geography to our entries
    const state = visitedStates.find(
      (s) => s.stateName?.toLowerCase() === stateName.toLowerCase()
    );
    return !!state;
  };

  const getStateColor = (stateName: string): string => {
    const state = visitedStates.find(
      (s) => s.stateName?.toLowerCase() === stateName.toLowerCase()
    );
    if (!state || !state.placeCount) return "#f0f0f0";

    const intensity = getChoroplethIntensity(state.placeCount, maxPlaceCount);
    return getChoroplethColor(intensity);
  };

  return (
    <div className="w-full space-y-6">
      <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden">
        <ComposableMap projection="geoAlbersUsa">
          <ZoomableGroup center={[-95, 37.5]} zoom={1}>
            <Geographies url={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties?.name || "";
                  const visited = isVisited(stateName);
                  const color = getStateColor(stateName);
                  const isHovered = hoveredState === stateName;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        if (visited) {
                          const state = visitedStates.find(
                            (s) =>
                              s.stateName?.toLowerCase() ===
                              stateName.toLowerCase()
                          );
                          setSelectedState(state || null);
                        }
                      }}
                      onMouseEnter={() => {
                        if (visited) setHoveredState(stateName);
                      }}
                      onMouseLeave={() => setHoveredState(null)}
                      style={{
                        default: {
                          fill: color,
                          stroke: "#d0d0d0",
                          strokeWidth: 0.75,
                          cursor: visited ? "pointer" : "default",
                          transition: "all 200ms ease-in-out",
                        },
                        hover: {
                          fill: visited
                            ? getChoroplethColor(
                                getChoroplethIntensity(
                                  Math.min(
                                    (visitedStates.find(
                                      (s) =>
                                        s.stateName?.toLowerCase() ===
                                        stateName.toLowerCase()
                                    )?.placeCount || 0) * 1.1,
                                    maxPlaceCount
                                  ),
                                  maxPlaceCount
                                )
                              )
                            : color,
                          stroke: visited ? "#1a5f7a" : "#d0d0d0",
                          strokeWidth: visited ? 2 : 0.75,
                          filter: visited ? "drop-shadow(0 0 3px rgba(42, 127, 168, 0.3))" : "none",
                        },
                        pressed: {
                          fill: color,
                          stroke: "#1a5f7a",
                          strokeWidth: 2,
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <ChoroplethLegend maxPlaceCount={maxPlaceCount} />

      <StateDrawer
        state={selectedState}
        isOpen={!!selectedState}
        onClose={() => setSelectedState(null)}
      />
    </div>
  );
}
