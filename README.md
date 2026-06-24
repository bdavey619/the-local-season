# The Local Season

An editorial travel project about when cities feel most alive — and how places change the way you live.

> "Travel isn't just where you go. It's how a place changes the way you live."

## City-months

| Page | Storyline | Archetype |
|------|-----------|-----------|
| **Copenhagen — June** (`index.html`) | The Longest Evenings | Electric |
| **San Diego — September** (`san-diego-september.html`) | Summer After Summer | Local |

## Framework

Each city-month page is structured around eight editorial sections:

- **The Scene** — a specific moment, named place, named time
- **What locals are doing** — visible behaviors, not general impressions
- **A word for it** — one local term that names something the city does this month
- **What changes** — how the visitor's perception shifts
- **What you start doing** — new behaviors, grounded and observable
- **What you stop controlling** — what the city releases you from planning
- **What returns** — what comes back that was missing
- **One line to remember** — a single sentence that lands without the page behind it
- **Not always like this** — seasonal contrast: why this month, in three sentences

## Adding a new city-month

All page content lives in a `PAGE` object. The renderer (`assets/render.js`) builds the full HTML from that object — no HTML editing required for new pages.

**Steps:**

1. Copy an existing page (e.g. `san-diego-september.html`) to a new file:
   ```
   cp san-diego-september.html [city]-[month].html
   ```

2. Replace the `PAGE` object in the new file with your city data. Required fields:

   ```js
   const PAGE = {
     city:           "City Name",
     month:          "Month",
     storyline:      "Subtitle",
     archetype:      "Local",          // Electric | Quiet | Slow | Raw | Open | Local
     accentColor:    "#c4853a",        // hex — drives the --accent CSS token
     accentColorDim: "rgba(196,133,58,.15)",

     thesis:    "One sentence. What the city does to the visitor in this month.",

     season:    "Local Season",        // not yet rendered
     metadata:  { energy: 3, daylight: 4, streetLife: 3, socialHours: 3, comfort: 5, momentum: 4 },

     scene:        "Opening scene — specific place, specific time, observed behavior.",
     sceneAnchors: [
       { place: "Place Name", text: "One specific observation." },
     ],
     locals:   "Visible behaviors. Not what locals enjoy — what they actually do.",
     localWord: {
       term:          "the phrase",
       pronunciation: "optional",      // omit if English or no phonetic needed
       translation:   "what it means",
       body:          "One or two sentences. The word as an editorial pause.",
     },
     changes:  "How the visitor's perception shifts.",
     start:    "New behaviors the visitor picks up.",
     stop:     "What the visitor stops optimizing or planning.",
     returns:  "What comes back that was missing.",
     remember: "One sentence. Should land without the page behind it.",

     seasonalContrast: {
       title: "Not always like this",
       items: [
         { label: "Before month",   body: "One sentence.",  current: false },
         { label: "This month",     body: "One sentence.",  current: true  },
         { label: "After month",    body: "One sentence.",  current: false },
       ],
     },

     next: [
       { city: "Other City", month: "Month", storyline: "Subtitle", href: "other-city-month.html" },
     ],
   };
   ```

3. Add a link (`href`) to this new page in the `next` array of related existing pages.

4. Update this README's city-months table.

## Editorial rules (enforce on every city-month)

- Every section must describe visible behavior, not attractions
- If copy could apply to 20 other cities, rewrite it
- Prefer concrete scenes over abstract observations
- Use at most one untranslated local term per section
- Recommendations should change routine, not just suggest places
- The scene anchor is a named location + a specific observation, not a review
- `localWord` is an editorial pause, not a glossary entry
- `remember` should land without explanation

## Development

Static HTML. No build step. Open any `.html` file directly in a browser.

**Future conversion path → Next.js / Tailwind:**
- `PAGE` → a typed `CityMonth` data module in `content/[city]-[month].ts`
- Each section in `render.js` → a React component
- CSS custom properties → Tailwind theme tokens via `tailwind.config.ts`
- `archetype` drives colour-scheme variants via a theme map
