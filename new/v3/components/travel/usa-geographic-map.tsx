"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import type { TravelEntry } from "@/lib/content-types";
import {
  getVisitedStates,
  getMaxPlaceCount,
  getChoroplethColor,
  getChoroplethIntensity,
} from "@/lib/travel";

const geoUrl = "/maps/us-states-10m.json";

// FIPS code to state code mapping
const FIPS_TO_CODE: Record<string, string> = {
  "01": "AL",
  "02": "AK",
  "04": "AZ",
  "05": "AR",
  "06": "CA",
  "08": "CO",
  "09": "CT",
  "10": "DE",
  "12": "FL",
  "13": "GA",
  "15": "HI",
  "16": "ID",
  "17": "IL",
  "18": "IN",
  "19": "IA",
  "20": "KS",
  "21": "KY",
  "22": "LA",
  "23": "ME",
  "24": "MD",
  "25": "MA",
  "26": "MI",
  "27": "MN",
  "28": "MS",
  "29": "MO",
  "30": "MT",
  "31": "NE",
  "32": "NV",
  "33": "NH",
  "34": "NJ",
  "35": "NM",
  "36": "NY",
  "37": "NC",
  "38": "ND",
  "39": "OH",
  "40": "OK",
  "41": "OR",
  "42": "PA",
  "44": "RI",
  "45": "SC",
  "46": "SD",
  "47": "TN",
  "48": "TX",
  "49": "UT",
  "50": "VT",
  "51": "VA",
  "53": "WA",
  "54": "WV",
  "55": "WI",
  "56": "WY",
};

type Props = {
  entries: TravelEntry[];
  selectedCode?: string | null;
  onSelectState: (entry: TravelEntry) => void;
};

export function USAGeographicMap({
  entries,
  selectedCode,
  onSelectState,
}: Props) {
  const visitedStates = getVisitedStates(entries);
  const maxPlaceCount = getMaxPlaceCount(entries);

  // Build a map of state codes to entries
  const stateCodeMap: Record<string, TravelEntry> = {};
  for (const state of visitedStates) {
    if (state.stateCode) {
      stateCodeMap[state.stateCode] = state;
    }
  }

  function getFill(stateCode?: string): string {
    if (!stateCode) return "#f0f0f0";

    const entry = stateCodeMap[stateCode];
    if (!entry || !entry.placeCount) return "#f0f0f0";

    if (stateCode === selectedCode) return "#facc15"; // yellow highlight

    const intensity = getChoroplethIntensity(entry.placeCount, maxPlaceCount);
    return getChoroplethColor(intensity);
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <ComposableMap
        projection="geoAlbersUsa"
        width={1000}
        height={600}
        className="w-full h-auto"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => {
                const fips = String(geo.id).padStart(2, "0");
                return fips !== "02" && fips !== "15"; // exclude Alaska + Hawaii
              })
              .map((geo) => {
                const fips = String(geo.id).padStart(2, "0");
                const stateCode = FIPS_TO_CODE[fips];
                const entry = stateCodeMap[stateCode];
                const isVisited = Boolean(entry);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (isVisited && entry) {
                        onSelectState(entry);
                      }
                    }}
                    style={{
                      default: {
                        fill: getFill(stateCode),
                        stroke: "#d1d5db",
                        strokeWidth: 0.75,
                        outline: "none",
                        cursor: isVisited ? "pointer" : "default",
                        transition: "all 200ms ease-in-out",
                      },
                      hover: {
                        fill:
                          stateCode === selectedCode
                            ? "#facc15"
                            : isVisited
                              ? "#60a5fa"
                              : "#f0f0f0",
                        stroke: isVisited ? "#1f2937" : "#d1d5db",
                        strokeWidth: isVisited ? 1.5 : 0.75,
                        outline: "none",
                        cursor: isVisited ? "pointer" : "default",
                      },
                      pressed: {
                        fill: "#facc15",
                        stroke: "#1f2937",
                        strokeWidth: 2,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
