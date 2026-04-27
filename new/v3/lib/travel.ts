import type { TravelEntry, TravelPlace, TravelTrip } from "@/lib/content-types";

// USA state name to postal code mapping
export const STATE_NAME_TO_CODE: Record<string, string> = {
  "Alabama": "AL",
  "Alaska": "AK",
  "Arizona": "AZ",
  "Arkansas": "AR",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "Florida": "FL",
  "Georgia": "GA",
  "Hawaii": "HI",
  "Idaho": "ID",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Pennsylvania": "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY",
};

// Reverse mapping for lookups
export const CODE_TO_STATE_NAME: Record<string, string> = Object.entries(
  STATE_NAME_TO_CODE
).reduce((acc, [name, code]) => {
  acc[code] = name;
  return acc;
}, {} as Record<string, string>);

// States excluded from choropleth map
export const EXCLUDED_STATE_CODES = new Set(["AK", "HI"]);

// Privacy filter regex patterns - match addresses, utilities, errands
const PRIVATE_PATTERNS = [
  /^(\d+\s+)?[A-Z][a-z]+\s+(Street|St|Avenue|Ave|Boulevard|Blvd|Road|Rd|Drive|Dr|Lane|Ln|Court|Ct|Circle|Cir|Place|Pl|Way|Trail|Terrace|Terr|Square|Sq|Park|Parkway|Pkwy|Circle|Drive|Drive|Lane|Loop|Pass|Plaza|Ridge|Rise|Row|Run|Side|Span|Spur|Square|Stadium|Station|Steppe|Steps|Stile|Stoa|Strand|Street|Strip|Strode|Stroke|Stroll|Strut|Stub|Stucco|Stud|Studio|Stuff|Stump|Stun|Stung|Stunk|Stunt|Stupa|Stupor|Sty)/,
  /Apartment|Apt|Suite|Ste|Unit|#/i,
  /Bank|Credit Union|ATM|Gas Station|Supermarket|Grocery|CVS|Walgreens|Walmart|Target|Costco|Home Depot|Lowes|Car Wash|Laundromat|Post Office|UPS|FedEx|Library|Hospital|Clinic|Pharmacy|Gym|Parking|Storage|Utility|Water|Electric/i,
];

export function isPrivateOrUtilityPlace(place: TravelPlace): boolean {
  const titleAndNote = `${place.title} ${place.note || ""}`.toLowerCase();
  return PRIVATE_PATTERNS.some((pattern) =>
    pattern.test(titleAndNote)
  );
}

export function getPublicPlacesForState(
  state: TravelEntry,
  limit = 18
): TravelPlace[] {
  if (!state.trips || state.trips.length === 0) {
    return [];
  }

  const allPlaces: TravelPlace[] = [];
  for (const trip of state.trips) {
    for (const place of trip.places) {
      if (!isPrivateOrUtilityPlace(place)) {
        allPlaces.push(place);
      }
    }
  }

  return allPlaces.slice(0, limit);
}

export function getHiddenPrivateCount(state: TravelEntry): number {
  if (!state.trips || state.trips.length === 0) {
    return 0;
  }

  let count = 0;
  for (const trip of state.trips) {
    for (const place of trip.places) {
      if (isPrivateOrUtilityPlace(place)) {
        count++;
      }
    }
  }
  return count;
}

export function getVisitedStates(entries: TravelEntry[]): TravelEntry[] {
  return entries
    .filter((entry) => entry.status === "real" && entry.region === "USA")
    .sort((a, b) => (b.placeCount || 0) - (a.placeCount || 0));
}

export function getMaxPlaceCount(entries: TravelEntry[]): number {
  let max = 0;
  for (const entry of entries) {
    if (entry.placeCount && entry.placeCount > max) {
      max = entry.placeCount;
    }
  }
  return max;
}

export function getStateByCode(
  entries: TravelEntry[],
  code: string
): TravelEntry | null {
  return entries.find((entry) => entry.stateCode === code) || null;
}

export function searchStates(
  entries: TravelEntry[],
  query: string
): TravelEntry[] {
  const q = query.toLowerCase();
  return entries.filter((entry) => {
    const matchesState =
      entry.stateName?.toLowerCase().includes(q) ||
      entry.stateCode?.toLowerCase().includes(q) ||
      entry.placeLabel.toLowerCase().includes(q);

    if (matchesState) return true;

    // Search within trips
    if (entry.trips) {
      for (const trip of entry.trips) {
        if (
          trip.title.toLowerCase().includes(q) ||
          trip.primaryCity.toLowerCase().includes(q) ||
          trip.preambleNotes.some((note) =>
            note.toLowerCase().includes(q)
          )
        ) {
          return true;
        }

        // Search within places
        for (const place of trip.places) {
          if (
            place.title.toLowerCase().includes(q) ||
            (place.note && place.note.toLowerCase().includes(q))
          ) {
            return true;
          }
        }
      }
    }

    // Search in notes
    if (entry.notes && entry.notes.some((note) => note.toLowerCase().includes(q))) {
      return true;
    }

    return false;
  });
}

export function formatDateRange(dateRange: {
  start: string;
  end: string;
}): string {
  try {
    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);

    const monthYear = (date: Date) =>
      date.toLocaleDateString("en-US", { month: "short", year: "numeric" });

    if (start.getTime() === end.getTime()) {
      return monthYear(start);
    }

    const startMonth = start.toLocaleDateString("en-US", { month: "short" });
    const endMonthYear = monthYear(end);

    // If same month, show "Jan 1–15"
    if (
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${startMonth} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`;
    }

    return `${startMonth} ${start.getDate()} – ${endMonthYear}`;
  } catch {
    return dateRange.start || "Unknown";
  }
}

export function getChoroplethIntensity(
  placeCount: number,
  maxPlaceCount: number
): "very-light" | "light" | "medium" | "dark" {
  const ratio = placeCount / maxPlaceCount;
  if (ratio >= 0.75) return "dark";
  if (ratio >= 0.5) return "medium";
  if (ratio >= 0.25) return "light";
  return "very-light";
}

export function getChoroplethColor(
  intensity: "very-light" | "light" | "medium" | "dark"
): string {
  const colors: Record<string, string> = {
    "very-light": "#e8f4f8",
    "light": "#a8d8e8",
    "medium": "#5cb8d8",
    "dark": "#2a7fa8",
  };
  return colors[intensity];
}
