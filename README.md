# The Local Season

Travel is not only movement through geography.
It is temporary membership in another routine.

The Local Season is not a guide to the best time to visit.

It is an attempt to capture the version of a place people miss when they leave.

---

## Editorial test

A page succeeds when:

- Someone who has never been there wants to go.
- Someone who lives there wishes it were that month again.

Each city-month should reveal something that is not available year round.

The goal is not peak weather, peak tourism, or peak activity.

The goal is to capture the energy that makes that city feel most like itself.

---

## Principles

- Write routines, not attractions. Places should be understood through repeated behavior, not landmark lists.
- Write rituals, not recommendations. Food or drink should appear only when it explains behavior or helps the evening continue.
- Compare behavior, not weather
- Specific places should reveal routines, not fill a list
- If a sentence could apply to another city, rewrite it
- Use local language sparingly
- Contrast creates appreciation
- Recommendations should change routine, not fill an itinerary

---

## Framework

Each city-month is structured around nine editorial sections:

**The Scene** — a specific moment: named place, named time, observed behavior  
**What locals are doing** — visible behaviors, not general impressions  
**A word for it** — one local term that names something the city does this month  
**What changes** — how the visitor's perception or routine shifts  
**What you start doing** — new behaviors, grounded and observable  
**What you stop controlling** — what the city releases you from planning  
**What returns** — what comes back that was missing  
**One line to remember** — a single sentence that lands without the page behind it  
**Not always like this** — seasonal contrast in three sentences

Pages are not meant to determine the best time to visit. They explain why a moment matters.

---

## Current pages

**Copenhagen — June** · *The Longest Evenings*  
How long daylight changes routine.

**San Diego — September** · *Summer After Summer*  
How late-season conditions give weekdays back.

---

## Data model

Each page is driven by a `PAGE` object. The shared renderer (`assets/render.js`) builds the full page from that object — no HTML editing required for new pages.

**Development:** Static HTML. No build step. Open any `.html` file directly in a browser.

Key fields:

| Field | Purpose |
|-------|---------|
| `city`, `month`, `storyline` | Identity |
| `archetype` | Editorial character — drives accent colour |
| `accentColor` | Per-page hex token; overrides the shared CSS `--accent` variable |
| `season` | Seasonal tag (not yet rendered) |
| `scene` | Opening moment — specific place, time, observed behavior |
| `sceneAnchors` | 2–3 named locations with specific observations |
| `localWord` | One term that names something the city does this month |
| `seasonalContrast` | Why this month, in three behavioral sentences |
| `ritual` | Optional. How food or drink extends a routine (not yet rendered) |
| `next` | Links to other city-month pages |

Future pages require only a `PAGE` object and the shared renderer.

### Adding a new city-month

1. Copy an existing page to a new file:
   ```
   cp san-diego-september.html [city]-[month].html
   ```

2. Replace the `PAGE` object with new city data. All rendering is automatic.

3. Add an `href` entry in the `next` array of related pages.

4. Update the Current pages section of this README.

### PAGE schema

```js
const PAGE = {
  city:           "City Name",
  month:          "Month",
  storyline:      "Subtitle",
  archetype:      "Local",          // Electric | Quiet | Slow | Raw | Open | Local
  accentColor:    "#c4853a",
  accentColorDim: "rgba(196,133,58,.15)",

  thesis:    "One sentence. What this month does to the way daily life feels.",

  season:    "Local Season",        // not yet rendered
  metadata:  { energy: 3, daylight: 4, streetLife: 3, socialHours: 3, comfort: 5, momentum: 4 },

  scene:        "Opening moment — specific place, specific time, observed behavior.",
  sceneAnchors: [
    { place: "Place Name", text: "One specific observation." },
  ],
  locals:   "What locals are visibly doing. Not impressions — behaviors.",
  localWord: {
    term:          "the phrase",
    pronunciation: "optional",
    translation:   "what it means",
    body:          "One or two sentences. Editorial pause, not a glossary entry.",
  },
  changes:  "How the visitor's perception or routine shifts.",
  start:    "New behaviors the visitor picks up.",
  stop:     "What the visitor stops optimizing.",
  returns:  "What comes back that was missing.",
  remember: "One sentence. Should land without the page behind it.",

  seasonalContrast: {
    title: "Not always like this",
    items: [
      { label: "Before",     body: "One sentence.",  current: false },
      { label: "This month", body: "One sentence.",  current: true  },
      { label: "After",      body: "One sentence.",  current: false },
    ],
  },

  // Small ritual is not a food recommendation.
  // It should describe how food or drink extends a routine.
  ritual: {                           // optional; not yet rendered
    title: "Small ritual",
    body:  "",
  },

  next: [
    { city: "Other City", month: "Month", storyline: "Subtitle", href: "other-city-month.html" },
  ],
};
```

---

## Future direction

The ambition is not to cover every city. Only moments that earn a page.
