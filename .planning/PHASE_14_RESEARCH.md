# Phase 14 Research: Travel Data Architecture & Implementation Strategy

## 1. Current Data Structure Analysis

### 1.1 JSON Schema (`usa_travel_places.json`)

```ts
{
  schemaVersion: 1,
  generatedAt: "2026-04-26",
  countries: ["United States"],
  excludedFromMap: ["Alaska", "Hawaii"],
  summary: {
    tripCount: 11,
    visitedStateCount: 11,
    totalPlaces: 263,
    visitedStateCodes: ["AZ", "CA", "GA", "IL", "MI", "NJ", "NY", "OH", "PA", "TN", "WA"]
  },
  trips: TravelTrip[],
  states: Record<StateCode, TravelState>
}

type TravelTrip = {
  id: string,
  title: string,
  sourceFile: string,
  country: "United States",
  primaryCity: string,
  stateCodes: string[],
  stateNames: string[],
  dateRange: { start: ISO8601, end: ISO8601 },
  preambleNotes: string[],
  placeCount: number,
  places: TravelPlace[]
}

type TravelState = {
  stateCode: string,
  stateName: string,
  country: "United States",
  visited: boolean,
  tripIds: string[],
  trips: TravelTrip[],
  placeCount: number,
  places: TravelPlace[]
}

type TravelPlace = {
  id: string,
  title: string,
  note?: string,
  url?: string (Google Maps link),
  tags: string[],
  comment?: string,
  googleMapsPlaceId?: string,
  coordinates?: { lat, lng }
}
```

### 1.2 Key Properties

**11 Visited States:**
- Arizona (AZ)
- California (CA)
- Georgia (GA)
- Illinois (IL)
- Michigan (MI)
- New Jersey (NJ)
- New York (NY)
- Ohio (OH)
- Pennsylvania (PA)
- Tennessee (TN)
- Washington (WA)

**Estimated Distribution:**
- Total places: 263
- Average places/state: ~24
- Largest state likely: CA (urban centers: LA, San Diego, SF Bay)
- Smallest state likely: some combination of single-trip states

**Trip Data:**
- All trips have `dateRange.start` and `dateRange.end`
- Dates in ISO 8601 format (YYYY-MM-DD)
- `primaryCity` useful for map labels
- Places grouped by trip, useful for drawer organization

**Place Data:**
- All places have Google Maps URLs (critical for portfolio UX)
- Optional notes (context about the place)
- Optional coordinates (future: could animate route between places)

### 1.3 Privacy Filter Rules

From `map.md` outline, regex catches:
- Exact street addresses (e.g., "123 Main St")
- Personal residences: apartments, guest houses, Airbnb, "Personal stay"
- Errands: banks, pharmacy, retail, hardware
- Utility: gas stations, airports, parking, "dropped pin", "Coordinates"
- Rental services: car rental agencies

**Implementation:** Function in `lib/travel.ts` to identify private places before rendering.

---

## 2. Current Portfolio UI Analysis

### 2.1 Existing TravelEntry Type

```ts
type TravelEntry = {
  slug: string;                    // "seattle-trip"
  title: string;                   // "Seattle Trip"
  region: TravelRegion;           // "USA" | "India" | "China"
  status: "placeholder";          // Only "placeholder" in current code
  placeLabel: string;             // "Seattle" (for map label)
  timeVisited: string;            // "TBD"
  tags: string[];                 // ["Travel", "Placeholder"]
  notes: string[];                // ["TBD"]
  mapPosition: {                   // Absolute % positions on map
    x: number;
    y: number;
  };
  googleMapsUrl?: string;
  source: SourceDocument[];
};
```

**Problems:**
- `status: "placeholder"` - only one option, should allow "real"
- `mapPosition` - hardcoded percentages, doesn't scale to real states
- `timeVisited: "TBD"` - no structured date range
- No `placeCount`, `tripCount`, or `hiddenCount` for stats
- No `stateCode`/`stateName` for geographic map lookup
- All entries appear as "placeholders" to users

### 2.2 Current UI Components

**TravelMap.tsx:**
- Renders generic frosted-glass map background
- 3 hardcoded pins at fixed x/y percentages
- Click pin → selected entry
- No geographic data used
- Works as abstract placeholder

**TravelPopupCard.tsx:**
- Shows selected entry details in right panel
- Displays: title, place label, time visited, notes, tags
- Shows placeholder text for missing Maps URL
- No drawer/modal for expanded view

**TravelRegionSection.tsx:**
- Wraps map in section with heading and description
- Routes USA/India/China regions
- Currently all show same TravelMap placeholder

### 2.3 Current Page Layout

```
┌─────────────────────────────────────────────────────────┐
│                     Page Header                          │
│  "I want Travel & Life to feel like..."                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                      USA Travel Layer                    │
│  ┌───────────────────────┬─────────────────────────────┐
│  │   Map + 3 Pins        │  Selected Place Details     │
│  │  (TravelMap)          │   (TravelPopupCard)        │
│  │                       │                             │
│  │   • Seattle           │   Title: Seattle Trip      │
│  │   • LA                │   Place: Seattle           │
│  │   • San Diego         │   Time: TBD               │
│  │                       │   Notes: TBD              │
│  └───────────────────────┴─────────────────────────────┘
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│            India Travel Layer (similar)                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│            China Travel Layer (similar)                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│         Life Systems & Future Improvements              │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Data Extraction Strategy

### 3.1 Transformation from usa_travel_places.json to TravelEntry[]

**Input:** `states.CA` (California state data from JSON)
```json
{
  "stateCode": "CA",
  "stateName": "California",
  "country": "United States",
  "visited": true,
  "tripIds": ["la-trip", "san-diego-trip", "..."],
  "trips": [...],
  "placeCount": 47,
  "places": [...]
}
```

**Output:** Single `TravelEntry` for California
```ts
{
  slug: "california",
  title: "California",
  region: "USA",
  status: "real",
  stateCode: "CA",
  stateName: "California",
  placeLabel: "California",
  timeVisited: "May 2024 - July 2025",  // derived from trip dates
  tags: ["Urban", "Beach", "Tech"],      // derived from place types
  notes: [
    "Los Angeles: 28 places, 2 trips",
    "San Diego: 15 places, 1 trip",
    "San Francisco: 4 places, 1 trip"
  ],
  placeCount: 47,
  tripCount: 3,
  hiddenPlaceCount: 8,                   // counted by privacy filter
  source: ["usa_travel_places.json"]
}
```

### 3.2 Algorithm to Build Notes Array

For each state:
1. Group trips by primary city
2. For each city:
   - Count public places in city's trips
   - Sum trip count
   - Build note: `"{City}: {count} places, {tripCount} trips"`
3. Join all city notes

Example for California:
```
trips = [
  { primaryCity: "Los Angeles", places: 28, trips: 2 },
  { primaryCity: "San Diego", places: 15, trips: 1 },
  { primaryCity: "San Francisco", places: 4, trips: 1 }
]

notes = [
  "Los Angeles: 28 places, 2 trips",
  "San Diego: 15 places, 1 trip",
  "San Francisco: 4 places, 1 trip"
]
```

### 3.3 Algorithm to Derive Date Range

For each state:
1. Collect all trip `dateRange.start` values
2. Collect all trip `dateRange.end` values
3. Compute min(start) and max(end)
4. Format: `"{monthStart} {yearStart} - {monthEnd} {yearEnd}"`
5. Special case: if min == max, just use that month/year

Example:
```
trips = [
  { dateRange: { start: "2024-05-10", end: "2024-05-15" } },
  { dateRange: { start: "2025-07-01", end: "2025-07-10" } }
]

timeVisited = "May 2024 - July 2025"
```

### 3.4 Algorithm to Count Hidden Places

1. Identify "private/utility" regex patterns:
   ```ts
   const privatePatterns = [
     /\b\d+\s+\w+\s+(St|Ave|Blvd|Road|Lane|Drive|Pl|Ct|Dr|Rd|Street|Avenue)\b/i,  // addresses
     /apartment|apt|guest house|airbnb|personal stay|home|house|condo/i,
     /bank|credit union|atm|errand/i,
     /gas station|filling station|pump|fuel/i,
     /grocery|pharmacy|cvs|walgreens|retail|hardware|home depot/i,
     /rental car|avis|hertz|budget|enterprise|airport|terminal|parking|dropped pin|coordinates/i
   ];
   ```

2. For each place:
   - Check title and note against patterns
   - If matches: increment hidden count
   - If not: include in public list

3. Return hidden count

---

## 4. Choropleth Map Architecture

### 4.1 Stack Decision: react-simple-maps

**Why react-simple-maps:**
- Lightweight wrapper around SVG geo projections
- Uses Topojson/GeoJSON for state shapes
- Built-in mouse events (hover, click)
- Easy to style with CSS/Tailwind
- Good TypeScript support
- No external API key required
- Performant for state-level granularity

**Alternatives Considered:**

| Library | Pros | Cons | Decision |
|---------|------|------|----------|
| `react-simple-maps` | Lightweight, SVG-based, no auth | Limited city-level features | ✅ CHOSEN |
| `Mapbox GL` | Powerful, beautiful, vector tiles | Requires API key, overkill for states | ❌ Too much |
| `Leaflet` | Popular, flexible | More complex, larger bundle | ❌ Heavier |
| CSS Grid (tile map) | No dependencies, works offline | Not geographic, less intuitive | ⚠️ Fallback only |

### 4.2 Dependency: us-atlas

`us-atlas` provides TopoJSON geometries for:
- All 50 US states
- With/without Alaska and Hawaii variants
- High/medium/low resolution options

Install: `npm install us-atlas`
Import: `import usStatesTopo from "us-atlas/states-10m.json"`

The JSON structure:
```json
{
  "type": "Topology",
  "arcs": [...],
  "objects": {
    "states": {
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "MultiPolygon",
          "arcs": [...],
          "id": "01",
          "properties": { "name": "Alabama" }
        },
        ...
      ]
    }
  },
  "transform": {...}
}
```

### 4.3 State Name to Code Mapping

TopJSON geometry has state names like "California", but we need postal codes like "CA".

Create mapping function:
```ts
export const STATE_NAME_TO_CODE: Record<string, string> = {
  "Alabama": "AL",
  "Alaska": "AK",
  "Arizona": "AZ",
  // ... all 50 states
};
```

Rationale: TopJSON doesn't include postal codes, only full state names.

### 4.4 Choropleth Intensity Logic

**Input:** `placeCount` for a state, `maxPlaceCount` across all visited states

**Calculation:**
```ts
const intensity = placeCount / maxPlaceCount;  // 0.0 to 1.0

function getChoropelethColor(intensity: number): string {
  if (intensity > 0.75) return "#14b8a6";   // Darkest teal (36+ places)
  if (intensity > 0.45) return "#2dd4bf";   // Dark teal (20-35 places)
  if (intensity > 0.20) return "#5eead4";   // Light teal (5-19 places)
  return "#99f6e4";                         // Lightest teal (1-4 places)
}
```

**Visual Scale:**
```
#99f6e4 ━━━━ #5eead4 ━━━━ #2dd4bf ━━━━ #14b8a6 ━━━━ #0d9488
Lightest     Light         Medium        Dark        Darkest
```

**State Color Logic:**
```ts
const isVisited = Boolean(travelEntry);
const isSelected = stateCode === selectedCode;

const color = isSelected
  ? "#facc15"  // Yellow selection
  : isVisited
  ? getChoropelethColor(state.placeCount / maxPlaces)  // Teal intensity
  : "rgba(148, 163, 184, 0.14)";  // Gray unvisited
```

### 4.5 Map Projection

Use **Albers USA projection** (`geoAlbersUsa`):
- Centers on contiguous USA
- Suitable for state-level visualization
- Automatically excludes AK/HI if not in geometry
- Good visual balance

Configuration:
```tsx
<ComposableMap projection="geoAlbersUsa" className="h-[420px] w-full">
```

---

## 5. Search & Filter Strategy

### 5.1 Search Scope

Search index should include:
- **State data:** state name, state code
- **Trip data:** trip names, primary city names, date ranges
- **Place data:** place titles, place notes

### 5.2 Query Matching

For each state, search:
1. State name: case-insensitive substring
2. State code: exact match (e.g., "CA", "ca")
3. Place titles from all public places: case-insensitive substring
4. Place notes from all public places: case-insensitive substring
5. Trip names: case-insensitive substring

Example query: "los"
- Matches: California (has "Los Angeles" trips and places)
- Matches: Any places with "los" in title/note

### 5.3 Result Ordering

1. Exact state code matches first
2. State name prefix matches
3. State name substring matches
4. Trip/place matches ordered by parent state place count (descending)

---

## 6. State Drawer Component Architecture

### 6.1 Drawer Layout (Desktop)

```
┌──────────────────────────────┐
│      Right-side Drawer       │
│  (w: min(460px, 100vw - 2rem))
│  (h: calc(100vh - 2rem))     │
│                              │
│  ┌────────────────────────┐  │
│  │ Header                 │  │
│  │  • State Code Pill     │  │
│  │  • State Name          │  │
│  │  • Summary (places...  │  │
│  │  • Close Button        │  │
│  ├────────────────────────┤  │
│  │ Scrollable Body:       │  │
│  │  • Stats Cards         │  │
│  │  • Trips Section       │  │
│  │  • Highlights Pills    │  │
│  │  • Place Cards         │  │
│  │  • Gallery Placeholder │  │
│  │  • Hidden Count Note   │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

### 6.2 Drawer Styling

```css
{
  position: fixed;
  right: 0;
  top: 0;
  width: min(460px, calc(100vw - 2rem));
  height: calc(100vh - 2rem);
  
  background: rgba(var(--dark-bg), 0.9);
  backdrop-filter: blur(8px);
  border-left: 1px solid var(--border-soft);
  border-radius: 0 12px 12px 0;
  
  box-shadow: -12px 0 48px rgba(0,0,0,0.24);
  
  z-index: 40;
  margin: 1rem;
  overflow-y: auto;
}
```

### 6.3 Drawer Animation

- On open: slide-in from right (0.3s ease-out)
- On close: slide-out to right (0.2s ease-in)
- Backdrop (page behind drawer) dims slightly

---

## 7. Type System Design

### 7.1 Enhanced TravelEntry

```ts
type TravelEntry = {
  // Identity
  slug: string;                    // "california"
  title: string;                   // "California"
  region: TravelRegion;            // "USA"
  status: "real" | "placeholder";  // NEW: allow real data
  
  // Geographic
  stateCode: string;               // NEW: "CA"
  stateName: string;               // NEW: "California"
  
  // Content
  placeLabel: string;              // "California" (for display)
  timeVisited: string;             // "May 2024 - July 2025"
  notes: string[];                 // ["Los Angeles: 28 places, 2 trips", ...]
  tags: string[];                  // ["Urban", "Beach", "Tech"]
  
  // Statistics
  placeCount: number;              // NEW: 47
  tripCount: number;               // NEW: 3
  hiddenPlaceCount?: number;       // NEW: 8 (private/utility)
  
  // UI (remove mapPosition)
  googleMapsUrl?: string;          // Link to primary city or state
  
  // Source
  source: SourceDocument[];        // ["usa_travel_places.json"]
};
```

### 7.2 Data Types from usa_travel_places.json

```ts
type TravelPlace = {
  id: string;
  title: string;
  note?: string;
  url?: string;  // Google Maps URL
  tags: string[];
  comment?: string;
  googleMapsPlaceId?: string;
  coordinates?: { lat: number; lng: number };
};

type TravelTrip = {
  id: string;
  title: string;
  sourceFile: string;
  country: string;
  primaryCity: string;
  stateCodes: string[];
  stateNames: string[];
  dateRange: { start: string; end: string };
  preambleNotes: string[];
  placeCount: number;
  places: TravelPlace[];
};

type TravelState = {
  stateCode: string;
  stateName: string;
  country: string;
  visited: boolean;
  tripIds: string[];
  trips: TravelTrip[];
  placeCount: number;
  places: TravelPlace[];
};

type TravelDataset = {
  schemaVersion: number;
  generatedAt: string;
  description: string;
  countries: string[];
  excludedFromMap: string[];
  summary: {
    tripCount: number;
    visitedStateCount: number;
    totalPlaces: number;
    visitedStateCodes: string[];
  };
  trips: TravelTrip[];
  states: Record<string, TravelState>;
};
```

---

## 8. Implementation Order

### Why This Order?

1. **Types first** - All components depend on correct types
2. **Data helpers** - Components consume helpers, not raw data
3. **Data migration** - Fill real data into structured format
4. **Map component** - Core visualization, enables all interactions
5. **Supporting components** - Drawer, search, etc. depend on map
6. **Styling** - Polish after functionality works
7. **Testing** - Verify interactions and data correctness

---

## 9. Risk Analysis & Mitigations

### Risk 1: TopoJSON Parsing Failure

**Risk:** `us-atlas` TopoJSON doesn't parse correctly, map doesn't render.

**Mitigation:**
- Test with simple proof-of-concept first
- Log topology errors to console
- Provide tile-map fallback (CSS grid of states)

### Risk 2: Performance: 263 Places

**Risk:** Rendering all places in drawer causes slowdown.

**Mitigation:**
- Cap public places at 18 per state (already in plan)
- Use React.memo for PlaceCard components
- Lazy load gallery images
- Virtual scrolling if drawer gets heavy

### Risk 3: Privacy Filter Too Aggressive

**Risk:** Regex catches legitimate places (e.g., "Bank of California").

**Mitigation:**
- Test filter on real data first
- Review false positives with user before publishing
- Whitelist legitimate places if needed
- Keep raw JSON unmodified; filter only in UI

### Risk 4: Mobile Responsiveness

**Risk:** Drawer breaks layout on mobile (too wide, covers map).

**Mitigation:**
- Drawer width: `min(460px, calc(100vw - 2rem))`
- On mobile: render as bottom sheet instead
- Test on actual devices (not just dev tools)

### Risk 5: Search Performance

**Risk:** Searching 263 places on every keystroke lags.

**Mitigation:**
- Pre-index all state/trip/place names on load
- Debounce search input (300ms)
- Use simple string matching (not regex)

---

## 10. Future Expansion Hooks

### India & China Data Structure

When travel data for India/China is added:

**India (by state/union territory):**
```ts
{
  slug: "maharashtra",
  title: "Maharashtra",
  region: "India",
  status: "real",
  provinceCode: "MH",  // New field for non-US regions
  provinceName: "Maharashtra",
  placeCount: 45,
  tripCount: 2,
  ...
}
```

**China (by province):**
```ts
{
  slug: "beijing",
  title: "Beijing",
  region: "China",
  status: "real",
  provinceCode: "BJ",
  provinceName: "Beijing",
  placeCount: 32,
  tripCount: 1,
  ...
}
```

**Challenge:** Different geographic hierarchies
- USA: state-level (well-defined, 50 states)
- India: 28 states + 8 union territories
- China: provinces are less clearly bounded

**Approach:**
- Treat each region independently for now
- Extend TYPE system with optional `provinceCode` field
- Build separate map components per region once data exists

---

## 11. Completion Checklist

- [ ] USA travel data extracted to `content/travel.ts`
- [ ] All 11 states have real place counts, trip counts, dates
- [ ] TravelEntry type includes stateCode, placeCount, tripCount
- [ ] Data helpers (search, filter, scaling) implemented in `lib/travel.ts`
- [ ] USATravelMap component renders geographic map
- [ ] Hover shows state name and place count
- [ ] Click opens drawer with state details
- [ ] Search filters states correctly
- [ ] StateDrawer shows trips, places, and stats
- [ ] Private/utility places excluded from drawer
- [ ] Hidden place count displayed
- [ ] Google Maps links verified in drawer
- [ ] Responsive on mobile (bottom sheet instead of side drawer)
- [ ] No console errors or warnings
- [ ] All 263 places appear somewhere (drawer or hidden counter)
- [ ] Colors match Tailwind teal scale
- [ ] Transitions smooth
- [ ] Tests pass for data extraction and filtering
