---
name: Phase 14 Architecture & Data Strategy
description: Complete architectural decisions and data transformation logic for Travel & Life choropleth map implementation
type: project
---

## Phase 14: Travel & Life Real Data Integration

**Status:** Planned, detailed research + plan complete

**Data Available:** 11 visited USA states, 263 places across 11 trips in `/public/usa_travel_places.json`

## Key Architectural Decisions

### Map Library: react-simple-maps + us-atlas TopoJSON

**Why:** 
- True geographic visualization (users recognize state shapes)
- Lightweight, SVG-based, no external API/auth required
- Built-in hover/click event system
- Choropleth intensity scaling straightforward
- Fits portfolio aesthetic (clean, data-focused)

**Rejected alternatives:**
- Mapbox GL: overkill for state-level, requires API key
- Leaflet: heavier, more complex for portfolio use case
- CSS Grid tile map: good fallback but less geographic

**Projection:** Albers USA (`geoAlbersUsa`) - best for contiguous US at state level

### Data Flow

```
usa_travel_places.json → content/travel.ts → lib/travel.ts helpers → USATravelMap
(raw data)              (TravelEntry[])     (search, filter, scale)  (UI render)
```

### Choropleth Intensity

Formula: `color = getColor(placeCount / maxPlaceCount)`

Scale:
- `#99f6e4` (lightest) ← 1–4 places
- `#5eead4` (light) ← 5–19 places  
- `#2dd4bf` (medium) ← 20–35 places
- `#14b8a6` (darkest) ← 36+ places

Selected state overrides with `#facc15` (yellow).

### Type System Extension

Current `TravelEntry` type lacks:
- `stateCode` (needed for TopoJSON → data lookup)
- `stateName` (for drawer header)
- `placeCount` (for choropleth intensity)
- `tripCount` (for stats display)
- `hiddenPlaceCount` (privacy disclosure)

**Change:** Add these fields; remove `mapPosition` (no longer needed for geographic map).

### Data Transformation Logic

For each state in usa_travel_places.json.states:

1. **Extract basics:** stateCode, stateName, visited flag
2. **Aggregate stats:** Sum all trip.placeCount → state.placeCount, count trips
3. **Build notes:** Group places by primary city, format "CityName: X places, Y trips"
4. **Date range:** Min(trip.start) to Max(trip.end) → "Month Year - Month Year"
5. **Filter private:** Count places matching privacy regex, store as hiddenPlaceCount
6. **Create entry:** New TravelEntry with all above fields

Result: One TravelEntry per state, with ~24 places on average across 11 states.

## Privacy Filter Strategy

**Scope:** Regex patterns to identify private/utility stops that should be hidden from public drawer view.

**Patterns:**
- Street addresses: `\d+ \w+ (St|Ave|Blvd|Rd|Dr|...)`
- Homes: "apartment", "apt", "guest house", "airbnb", "personal stay"
- Errands: "bank", "atm", "credit union", "pharmacy", "grocery", "retail", "hardware"
- Utilities: "gas station", "airport", "parking", "rental car", "dropped pin", "coordinates"

**Implementation:** Function `isPrivateOrUtilityPlace(place)` checks title + note against patterns. Used when rendering drawer.

**Key:** Raw JSON preserved unchanged; filtering applied only in UI before rendering.

## Component Architecture

### USATravelMap.tsx (main)
- Manages state: selectedCode, drawerOpen, hoveredState, searchQuery
- Renders geographic map with choropleth coloring
- Hosts StateDrawer as fixed overlay
- Integrates SearchPanel for filtering

### Supporting Components
- **SearchPanel:** Real-time state filtering, list of matching states
- **StateDrawer:** Fixed right-side drawer with trips, places, stats (capped at 18 places per state)
- **PlaceCard:** Individual place link with title, note, Google Maps URL
- **ChoroplethLegend:** Color scale guide

### Data Helpers (lib/travel.ts)
- `getVisitedStates()` - all 11 states sorted by placeCount descending
- `getStateByCode(code)` - lookup state by postal code
- `getMaxPlaceCount()` - max placeCount for choropleth scaling
- `searchStates(query)` - filter states by name, code, place titles, notes
- `isPrivateOrUtilityPlace(place)` - privacy filter
- `getPublicPlacesForState(state, limit=18)` - places excluding private, capped
- `getHiddenPrivateCount(state)` - count filtered places
- `formatDateRange(dateRange)` - trip dates for display
- STATE_NAME_TO_CODE mapping (TopoJSON names → postal codes)

## Implementation Sequence

1. **14.1** Types + Data (2h): Enhance TravelEntry, create helpers, extract real data
2. **14.2** Map (3h): Build USATravelMap with react-simple-maps, choropleth logic
3. **14.3** Search (1.5h): SearchPanel with real-time filtering
4. **14.4** Drawer (2h): StateDrawer with trips, places, stats, private filtering
5. **14.5** Data (1h): Migrate travel.ts to real entries
6. **14.6** Polish (1h): Styling, responsive, animations
7. **14.7** Test (1h): Visual, interaction, data accuracy

**Total:** ~11.5 hours

## Current Constraints

- **No photo galleries yet:** Placeholder squares remain (Phase 15)
- **USA only:** India/China still placeholder maps (Phase 16+)
- **No India/China structure:** Decided to handle after USA foundation solid

## Testing Strategy

- Unit: data helpers (filtering, privacy, search)
- Integration: map interactions (hover, click, search)
- Visual: color accuracy, responsive layout
- Acceptance: All 263 places accessible, privacy working, no console errors

## Success Criteria

✅ 11 visited states display on map with correct colors
✅ Click state opens drawer with trips and places
✅ Search filters states by name and content
✅ Private/utility places hidden from public view
✅ Google Maps links all verified
✅ Responsive on mobile (bottom sheet instead of side drawer)
✅ No broken links or console errors
