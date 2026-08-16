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
| `archetype` | one of Electric, Open, Local, Quiet, Raw, Slow |
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

The earlier pages run lighter than this — several sit at roughly half the
reference `scene` length. That is the drift the standard exists to stop, not a
backlog you have to clear before writing anything new.

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
| Raw | `#8a6a4a` | umber — the season has teeth |
| Slow | `#5f8a63` | sage — the city is unhurried |

Chosen for separation on the paper background: minimum pairwise perceptual
distance ΔE 19.7 (the 13 hand-picked colors this replaced had pairs as close as
ΔE 4.5), and minimum contrast 2.79:1 against `--paper`.
