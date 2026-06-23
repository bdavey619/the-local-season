# The Local Season

An editorial travel project about when cities feel most alive — and how places change the way you live.

## Current prototype

**Copenhagen — June** · *The Longest Evenings*

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

## Development

This is currently a static HTML/CSS prototype. Future versions may move to Next.js with city-month content stored as structured data.

All page content lives in a `PAGE` object at the top of `index.html`. Duplicating the file and replacing that object is all that's needed to generate a new city-month page.
