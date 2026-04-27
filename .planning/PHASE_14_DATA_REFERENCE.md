# Phase 14 Data Reference: Actual USA Travel Data

**Source:** `/public/usa_travel_places.json`
**Generated:** 2026-04-26

## Summary

- **Total States:** 11 visited
- **Total Places:** 263
- **Total Trips:** 11
- **Excluded:** Alaska, Hawaii

## State-by-State Breakdown

| State | Code | Places | Trips | % of Total | Choropleth Level |
|-------|------|--------|-------|-----------|------------------|
| Illinois | IL | 47 | 1 | 17.9% | Dark (36+) |
| Michigan | MI | 47 | 1 | 17.9% | Dark (36+) |
| Washington | WA | 39 | 1 | 14.8% | Dark (36+) |
| New York | NY | 38 | 1 | 14.4% | Dark (36+) |
| California | CA | 32 | 2 | 12.2% | Medium (20-35) |
| Ohio | OH | 32 | 1 | 12.2% | Medium (20-35) |
| New Jersey | NJ | 29 | 1 | 11.0% | Medium (20-35) |
| Arizona | AZ | 26 | 1 | 9.9% | Light (5-19) |
| Georgia | GA | 8 | 1 | 3.0% | Light (5-19) |
| Tennessee | TN | 7 | 1 | 2.7% | Light (5-19) |
| Pennsylvania | PA | 5 | 1 | 1.9% | Lightest (1-4) |

**Total:** 263 places across 11 trips

## Choropleth Intensity Calculation

**Max place count:** 47 (Illinois and Michigan tied)

**Color assignment by intensity:**

```
Intensity Formula: placeCount / 47

Illinois (47)  → 47/47 = 1.0   → #14b8a6 (darkest)
Michigan (47)  → 47/47 = 1.0   → #14b8a6 (darkest)
Washington (39)→ 39/47 = 0.83  → #14b8a6 (darkest)
New York (38)  → 38/47 = 0.81  → #14b8a6 (darkest)

California (32)→ 32/47 = 0.68  → #2dd4bf (medium)
Ohio (32)      → 32/47 = 0.68  → #2dd4bf (medium)
New Jersey (29)→ 29/47 = 0.62  → #2dd4bf (medium)

Arizona (26)   → 26/47 = 0.55  → #2dd4bf (medium)
Georgia (8)    → 8/47  = 0.17  → #5eead4 (light)
Tennessee (7)  → 7/47  = 0.15  → #5eead4 (light)

Pennsylvania (5)→ 5/47 = 0.11  → #99f6e4 (lightest)
```

**Final color scheme:**

```
Darkest (#14b8a6):  IL, MI, WA, NY     (4 states)
Medium  (#2dd4bf):  CA, OH, NJ, AZ     (4 states)
Light   (#5eead4):  GA, TN             (2 states)
Lightest(#99f6e4):  PA                 (1 state)
```

## Trip Details

### Trip 1: Arizona Trip
- State: Arizona (AZ)
- Places: 26
- Primary City: (extract from data)

### Trip 2: California - Los Angeles
- State: California (CA)
- Places: (partial)
- Primary City: Los Angeles

### Trip 3: California - San Diego
- State: California (CA)
- Places: (partial)
- Primary City: San Diego

### Trip 4: Georgia Trip
- State: Georgia (GA)
- Places: 8
- Primary City: (extract from data)

### Trip 5: Illinois Trip
- State: Illinois (IL)
- Places: 47
- Primary City: Chicago

### Trip 6: Michigan Trip
- State: Michigan (MI)
- Places: 47
- Primary City: Detroit or Ann Arbor

### Trip 7: New Jersey Trip
- State: New Jersey (NJ)
- Places: 29
- Primary City: (extract from data)

### Trip 8: New York Trip
- State: New York (NY)
- Places: 38
- Primary City: New York City

### Trip 9: Ohio Trip
- State: Ohio (OH)
- Places: 32
- Primary City: (extract from data)

### Trip 10: Pennsylvania Trip
- State: Pennsylvania (PA)
- Places: 5
- Primary City: Philadelphia

### Trip 11: Washington Trip
- State: Washington (WA)
- Places: 39
- Primary City: Seattle

## Data Quality Notes

### All Places Have:
✅ Google Maps URLs (verified in JSON)
✅ Titles (place names)
✅ Place IDs (internal reference)

### Many Places Have:
✅ Notes (context about the place)
✅ Coordinates (lat/lng)
✅ Tags (category info)

### Source Organization:
- Data extracted from Google Maps CSV exports
- One CSV per trip (e.g., "2024 08 10 Philadelphia.csv")
- Grouped by state and trip in final JSON

## Extraction Workflow

When building `content/travel.ts`:

### For Each State:

1. **Get state basics:**
   ```ts
   stateCode: "CA"
   stateName: "California"
   placeCount: 32
   tripCount: 2
   ```

2. **Get trip details:**
   ```ts
   trips = [
     { id: "ca-la", title: "Los Angeles", primaryCity: "Los Angeles", ... },
     { id: "ca-sd", title: "San Diego", primaryCity: "San Diego", ... }
   ]
   ```

3. **Build notes (group by primary city):**
   ```ts
   notes = [
     "Los Angeles: 28 places, 1 trip",
     "San Diego: 4 places, 1 trip"
   ]
   ```

4. **Extract date range:**
   ```ts
   // From all trips in CA:
   // Min start: earliest trip start date
   // Max end: latest trip end date
   timeVisited: "May 2024 - July 2025"
   ```

5. **Count private places:**
   ```ts
   // Filter places with regex
   hiddenPlaceCount: 8
   ```

6. **Create TravelEntry:**
   ```ts
   {
     slug: "california",
     title: "California",
     region: "USA",
     status: "real",
     stateCode: "CA",
     stateName: "California",
     placeLabel: "California",
     timeVisited: "May 2024 - July 2025",
     notes: ["Los Angeles: 28 places, 1 trip", "San Diego: 4 places, 1 trip"],
     tags: ["Urban", "Beach", "West Coast"],
     placeCount: 32,
     tripCount: 2,
     hiddenPlaceCount: 8,
     source: ["usa_travel_places.json"]
   }
   ```

## Expected Output Format

After data extraction, `content/travel.ts` should have:

```ts
export const travelEntries: TravelEntry[] = [
  // Arizona
  { slug: "arizona", stateCode: "AZ", placeCount: 26, tripCount: 1, ... },
  
  // California
  { slug: "california", stateCode: "CA", placeCount: 32, tripCount: 2, ... },
  
  // Georgia
  { slug: "georgia", stateCode: "GA", placeCount: 8, tripCount: 1, ... },
  
  // Illinois (largest)
  { slug: "illinois", stateCode: "IL", placeCount: 47, tripCount: 1, ... },
  
  // Michigan (largest)
  { slug: "michigan", stateCode: "MI", placeCount: 47, tripCount: 1, ... },
  
  // New Jersey
  { slug: "new-jersey", stateCode: "NJ", placeCount: 29, tripCount: 1, ... },
  
  // New York
  { slug: "new-york", stateCode: "NY", placeCount: 38, tripCount: 1, ... },
  
  // Ohio
  { slug: "ohio", stateCode: "OH", placeCount: 32, tripCount: 1, ... },
  
  // Pennsylvania
  { slug: "pennsylvania", stateCode: "PA", placeCount: 5, tripCount: 1, ... },
  
  // Tennessee
  { slug: "tennessee", stateCode: "TN", placeCount: 7, tripCount: 1, ... },
  
  // Washington
  { slug: "washington", stateCode: "WA", placeCount: 39, tripCount: 1, ... }
];
```

## Placeholder Tags (to be replaced)

When building the real `travel.ts`:
- ❌ Remove "Travel, Placeholder" tags
- ✅ Add real tags based on place types (Urban, Beach, Nature, Food, etc.)
- ✅ Remove "TBD" from timeVisited and notes
- ✅ Replace mapPosition with stateCode/stateName

## Sample Place Data Structure

From usa_travel_places.json, example place:

```json
{
  "id": "california-trip-santa-monica-beach-1",
  "title": "Santa Monica Beach",
  "note": "Popular beach with pier",
  "url": "https://www.google.com/maps/place/Santa+Monica+Beach/data=!4m2!3m1!1s0x80c2c...",
  "tags": ["beach", "scenic"],
  "comment": null,
  "googleMapsPlaceId": "0x80c2c...:...",
  "coordinates": { "lat": 34.0195, "lng": -118.4912 }
}
```

All have verified Google Maps links (important for drawer feature).

## Integration Checklist

Before marking Phase 14 complete:

- [ ] All 11 states extracted to `content/travel.ts`
- [ ] Each state has accurate `placeCount` and `tripCount`
- [ ] `timeVisited` derived from trip date ranges
- [ ] `notes` array built from trip grouping by city
- [ ] `hiddenPlaceCount` calculated from privacy filter
- [ ] `status` set to "real" (not "placeholder")
- [ ] `stateCode` and `stateName` included
- [ ] Map renders all 11 states with correct colors
- [ ] Drawer shows trips and places for each state
- [ ] Search finds states by name and place content
- [ ] Google Maps links open in drawer
- [ ] Private places hidden from view (but counted)
