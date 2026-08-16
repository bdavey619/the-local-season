# Content Standard

The shape a city-month must have. Derived from the two reference pages —
**Seoul — October** and **San Diego — September** — which set the editorial
weight everything else is measured against.

`scripts/build.js` enforces this file. Structural rules fail the build.
Length targets print as warnings, because prose that earns its length is more
important than prose that hits a number.

## Identity

One city appears **once**. A city is a city-month, and a city-month is a slot
that city has used up. Seoul is October; it is not also November.

A month may hold more than one city. Month is a facet, not a container.

The filename is the identity: `{city-slug}-{month-slug}.json`, and it must
agree with the `city` and `month` fields inside.

## Required fields

Every one of these must be present. The build fails without them.

| Field | Shape |
| --- | --- |
| `city`, `month` | strings; `month` must be a real calendar month |
| `storyline` | the page's subtitle — a claim, not a label |
| `archetype` | one of Electric, Open, Local, Quiet |
| `season` | the local name for this stretch of the year |
| `thesis` | the pull-quote; the whole page in one sentence |
| `metadata` | exactly: energy, daylight, streetLife, socialHours, comfort, momentum — integers 1–5 |
| `scene` | one specific moment, one place, one hour |
| `sceneAnchors` | exactly 3, each `{place, text}` |
| `locals` | what residents actually do, in the plural |
| `localWord` | `{term, translation, body}`; `pronunciation` when the term is not English |
| `changes`, `start`, `stop`, `returns`, `remember` | the behavioral core |
| `seasonalContrast` | `{title, items}` — exactly 3 items, exactly one `current: true`, and that item's label must equal `month` |

`accentColor` and `accentColorDim` are **not** authored. They are derived from
`archetype` at build time. Adding them to a content file does nothing and the
build will warn.

## Length targets

Both reference pages sit inside every range. Outside it, the build warns —
treat that as a question, not a verdict.

| Field | Words | Seoul–Oct | San Diego–Sep |
| --- | --- | --- | --- |
| `thesis` | 11–19 | 17 | 13 |
| `scene` | 82–122 | 109 | 92 |
| `locals` | 61–101 | 90 | 68 |
| `changes` | 45–59 | 51 | 53 |
| `start` | 47–71 | 63 | 53 |
| `stop` | 37–58 | 52 | 42 |
| `returns` | 31–71 | 35 | 63 |
| `remember` | 9–17 | 15 | 10 |
| `localWord.translation` | 5–13 | 6 | 12 |
| `localWord.body` | 13–35 | 15 | 31 |
| `sceneAnchors[].text` | 35–60 | 49 / 53 / 55 | 37 / 53 / 42 |
| `seasonalContrast.items[].body` | 6–20 | 17 / 12 / 11 | 6 / 6 / 8 |

All twenty-four pages sit inside every range. The nine earliest ran at roughly
half the reference weight when the standard was introduced and were brought up
in a second pass; the build has been at zero warnings since. Corpus-wide spread
is now 1.3x–2.0x per field, against 2.1x–3.7x before.

## Archetype palette

Accent color carries meaning: it encodes archetype, which is also what the
landing page filters on. Two cities of the same energy share a color on
purpose.

| Archetype | Hex | Reading |
| --- | --- | --- |
| Electric | `#c08a2e` | gold — the city is switched on |
| Open | `#4f8fa8` | blue — the city has moved outdoors |
| Local | `#b05c35` | rust — the visitors have gone |
| Quiet | `#7d7a70` | stone — the city is turned down |

Chosen for separation on the paper background: minimum pairwise perceptual
distance ΔE 28.6, and minimum contrast 2.79:1 against `--paper`.

The set was six. **Raw** (the season has teeth) and **Slow** (the city is
unhurried) were retired once each held a single page — a filter with one result
behind it is a dead end. Both pages were retired with them rather than
relabelled, because neither could wear a remaining label honestly: Mexico City —
March argued in its own text that it was *"not slow in the sense of idle."*

The cost is real. Some mechanisms no longer have a home — a season that is
actively adversarial has nowhere to sit in a set that runs switched on, moved
outdoors, visitors gone, turned down. Weigh that during Discover before
proposing a city whose whole argument is endurance.
