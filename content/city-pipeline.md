# City-Month Pipeline

A scalable editorial process for discovering and expanding city-month concepts.
The goal is not to cover every city. Only moments that earn a page.

---

## Why this document exists

Handcrafting each page from scratch is slow and inconsistent.
This pipeline separates the two hardest problems:

1. **Finding** city-months that deserve to exist
2. **Writing** city-months well enough to earn a page

They require different thinking. This document keeps them separate.

---

## Editorial rules (active at every stage)

- Compare behavior, not weather
- Write routines, not attractions
- Write rituals, not recommendations
- Specific places should reveal routines, not fill a list
- If a sentence could apply to another city, rewrite it
- The goal is not peak tourism, peak weather, or peak activity
- Ask first: **"What routine becomes possible here that isn't possible the rest of the year?"**

Reject any concept that answers: "It's a great time to visit because the weather is nice."

---

## Stage 1 — Discover

**Input:** A list of cities and candidate months.

**Output:** Short concept cards. No full prose. No page copy. No itineraries.

Each card contains only:

| Field | What it is |
|-------|-----------|
| `city` + `month` | Identity |
| `storyline` | The subtitle. One clause. Should be surprising. |
| `archetype` | Electric · Open · Local · Quiet |
| `season` | The local name for this moment in the year |
| `thesis` | One sentence. What this month does to the way daily life feels. |
| `local word` | One term that names something the city does this month |
| `seasonal contrast` | Three behavioral beats: Before / This month / After |
| `confidence` | 1–5. Editorial gut read. 5 = build it now. |
| `why this month` | One sentence. Why this month and not the one next to it. |

**Rules for Stage 1:**

- No prose sections
- No scene-setting
- No weather descriptions
- No superlatives ("best," "perfect," "beautiful")
- The local word must name a behavior or feeling, not a landmark or dish

---

## Stage 2 — Select

Human review. Choose only city-months that satisfy all three:

- **Create yearning** — someone who has never been there wants to go
- **Feel different from existing pages** — the behavioral thesis is not already covered
- **Reveal something unavailable year round** — locals would call this out as specific to this month

**Reject city-months that feel generic.**

Generic signs:
- The thesis could apply to three other cities
- The local word is decorative, not behavioral
- The seasonal contrast is about temperature, not routine

---

## Disqualifiers

Reject expansion if any of these are true.

- **The month only changes weather.** Warmer, clearer, cooler — these are conditions, not behavioral mechanisms. A thesis built on weather is a postcard.
- **The routine could apply to another city unchanged.** If the behavior described would be equally true of three other cities in the same month, it has not found its subject.
- **The local word feels decorative rather than behavioral.** A local word that names a mood, a landscape, or a dish is atmosphere. A local word must name something people *do* — or the feeling that drives them to do it.
- **The page produces admiration but not yearning.** Admiration says: "That sounds nice." Yearning says: "I want to be there right now." A page that produces only admiration has not found the right emotional mechanism.
- **The city-month feels like a postcard instead of a temporary routine.** If the concept is primarily visual — light, color, landscape — it belongs in a photograph. A page earns its existence by describing how behavior changes, not how things look.

---

## Stage 3 — Expand

Only after human approval of a concept card.

Generate in this order:

1. `PAGE` object skeleton (all fields, minimal prose)
2. Scene anchors (2–3 named places + one specific observation each)
3. Local word (term + translation + editorial body)
4. Seasonal contrast (three behavioral beats)
5. Full prose for each section

Write the result to `content/{city}-{month}.json` and run `npm run build`.
See `content/content-standard.md` for required fields and length targets.

**Editorial tests (run before marking a page ready):**

- **Visitor test:** "I want to go." — Does the concept create yearning without a photograph?
- **Local test:** "I wish it were that month right now." — Does a resident recognize something true?
- **Routine test:** "Would someone change how they spend Tuesday?" — Does the city change behavior, not just scenery?

A page that fails any of these tests goes back to Stage 1.

---

## Candidate city-month batch

First-pass concepts only. No page copy. Ordered as submitted.

---

### Palermo — October · *The Locals Return*

**Archetype:** Raw  
**Season:** La ripresa (the resumption)

**Thesis:** Palermo in October is what the city looks like when it stops performing for visitors and starts performing for itself.

**Local word:** *u friscu* — the first cool evening after summer, when the heat breaks and the street can breathe again. Sicilian. Not a date; a moment that arrives when the tourists have already left.

**Small ritual:** An arancino from Ballarò before 9am, eaten standing, because the queue is finally short enough to bother.

**Seasonal contrast:**

| | |
|--|--|
| Summer | The city endures. Locals organize around the heat. |
| October | The city exhales. The street returns to the people who live on it. |
| Winter | The street empties. People go inside and stay. |

**Confidence:** 4  
**Why this month:** October is when the ratio of residents to visitors inverts. The routines that define Palermo — the market, the evening walk, the street corner — become visible again without the layer of performance over them.

---

### Dublin — May · *Everyone Comes Back Outside*

**Archetype:** Open  
**Season:** The Stretch

**Thesis:** Dublin in May is when the city collectively remembers it has outdoor spaces, and acts on that memory before the chance passes.

**Local word:** *the stretch* — what Irish people say about the evenings getting longer. "There's a great stretch in the evenings." A phrase, not a word, but it names something precisely: the sense that borrowed time has arrived and someone decided to spend it outside.

**Small ritual:** A pint in a pub garden because in May it's finally, barely, technically possible without a coat — and that's enough of a reason.

**Seasonal contrast:**

| | |
|--|--|
| January | People move between buildings as quickly as possible. |
| May | People find reasons to be outside even when it's still too cold. |
| August | Outdoor life becomes routine and stops feeling like a victory. |

**Confidence:** 4  
**Why this month:** "The stretch" is one of the most behaviorally specific phrases in Irish English, and it names the exact mechanism the project is interested in: collective permission to be outside. May is when the permission is freshest and the gratitude is most visible.

---

### Tokyo — April · *The Annual Permission*

**Archetype:** Electric  
**Season:** The Bloom

**Thesis:** Tokyo in April is when the city collectively agrees that sitting under a tree doing nothing productive is the correct thing to do with an afternoon.

**Local word:** *mono no aware* (物の哀れ) — the bittersweet awareness that beautiful things are temporary. The cherry blossoms last seven days. The city has known this for centuries and responds by stopping. The urgency of impermanence is what drives the behavior — not the blossoms themselves.

**Small ritual:** Conbini beer under Ueno's cherry trees at 2pm on a weekday, with colleagues who stopped being colleagues an hour ago.

**Seasonal contrast:**

| | |
|--|--|
| March | Everyone watches the forecast. The city is waiting. |
| April | The city stops. |
| May | Normal life resumes. Nobody mentions it. |

**Confidence:** 5  
**Why this month:** A city of relentless efficiency that collectively stops for two weeks. The behavioral thesis is unlike anything in the project. The urgency created by impermanence — *mono no aware* — is why April and not May. By May, the moment has passed and the city is already moving again.

---

### Munich — June · *Feierabend*

**Archetype:** Local  
**Season:** Garden Season

**Thesis:** Munich in June is when the beer garden stops being a destination and becomes an interruption you build into the commute home.

**Local word:** *Feierabend* — literally "celebration evening," practically: the ritual end of the working day. In June, Munich's answer to Feierabend is the beer garden, not as event but as habit. The Englischer Garten biergarten on a Tuesday is not a special occasion. It is what happens after work when the light lasts.

**Small ritual:** A maß of Helles at a long communal table, shoes off, on a Tuesday. Nobody made a reservation. Nobody sent a message asking if people were going. They just went.

**Seasonal contrast:**

| | |
|--|--|
| April | Beer gardens open but only the committed go. |
| June | The beer garden becomes part of the commute. |
| October | Oktoberfest turns the same spaces into a performance for everyone else. |

**Confidence:** 3  
**Why this month:** Feierabend is genuinely editorial, and the beer garden as commute-stop is a real behavioral routine. Confidence is lower because beer gardens are Munich's most expected story. The Feierabend angle may be strong enough to separate it from tourism — needs testing against the editorial rules before expanding.

---

### Buenos Aires — November · *Before December*

**Archetype:** Electric  
**Season:** La Previa

**Thesis:** Buenos Aires in November is when the city accelerates — the evenings last, the streets fill, and everyone knows December will take it all away.

**Local word:** *la previa* — the gathering that happens before anything official begins. In November, the whole city exists in a kind of permanent previa: before summer, before the exodus to the coast, before the year ends. The energy is anticipatory, which is its own kind of electricity.

**Small ritual:** Fernet and Coke on a balcony in Villa Crespo, when the jacarandas have turned the street purple below. No occasion. The occasion is that it's November.

**Seasonal contrast:**

| | |
|--|--|
| August | The city contracts. Cold. Early evenings. |
| November | The city erupts before summer takes everyone away. |
| January | Buenos Aires empties for the coast. The city is briefly itself and nobody is there to see it. |

**Confidence:** 3  
**Why this month:** The behavioral energy is real but the thesis needs a sharper anchor. "City before the holiday exodus" applies to many places. The jacaranda detail is specific but visual rather than behavioral. Expand only if a more specific routine can be grounded in November.

---

### Mexico City — February · *The City's Own Audience*

**Archetype:** Quiet  
**Season:** Temporada chilanga

**Thesis:** Mexico City in February is when the cultural life runs at full speed with only the people who live there watching.

**Local word:** *chilango* — what Mexico City residents call themselves. Reclaimed, used with pride. In February, CDMX is entirely chilango: the museums are full of locals, the markets have space to move through, the morning is cold and specific in a way that belongs to residents.

**Small ritual:** Tamales from a street cart in Condesa on a cold February morning, eaten before the sun burns off the altitude chill, standing next to people on their way to work.

**Seasonal contrast:**

| | |
|--|--|
| December | Posadas, visitors, surfaces crowded. |
| February | The city is quiet, cold, and entirely local. |
| April | Spring break returns the visitors. |

**Confidence:** 3  
**Why this month:** Interesting but the thesis currently relies on the absence of tourists rather than the presence of something unique to February. Needs a stronger behavioral anchor specific to February before it earns expansion.

---

### Stockholm — June · *When the City Dissolves*

**Archetype:** Open  
**Season:** Midsommar

**Thesis:** Stockholm in June is when the city becomes infrastructure for leaving it.

**Local word:** *friluftsliv* — outdoor life as a philosophical requirement, not a recreational choice. In June, Stockholm doesn't just encourage outdoor life. It disappears into it. The city empties to the archipelago. The streets that are full in March are half-empty at midsommar.

**Small ritual:** Strawberries and snaps at the end of a dock, with people you met an hour ago, somewhere in the archipelago where Stockholm no longer applies.

**Seasonal contrast:**

| | |
|--|--|
| November | The city hunkers. Indoor, close, deliberate. |
| June | The city empties into the archipelago. What remains is uncrowded and long-lit. |
| September | People come back with something to say about the summer. |

**Confidence:** 3  
**Why this month:** The "city dissolves" thesis is genuine but risks overlap with Copenhagen June. The differentiation — Stockholm leaving the city, Copenhagen extending it — is real but needs to be editorially precise. Hold until Copenhagen June is established and the contrast is clear.

---

### Melbourne — January · *How to Wait for the Breeze*

**Archetype:** Raw  
**Season:** Heat Season

**Thesis:** Melbourne in January is when the city arranges its entire day around a single meteorological event: the afternoon cool change.

**Local word:** *cool change* — the southerly wind that arrives in Melbourne's late afternoon in summer and drops the temperature fifteen degrees in under an hour. Not a forecast term. A civic religion. You discuss it with strangers. You plan around it. When it arrives, the city exhales.

**Small ritual:** Fish and chips on St Kilda pier at 7pm, after the cool change has arrived and everything is suddenly manageable again.

**Seasonal contrast:**

| | |
|--|--|
| November | It starts to warm. The evenings hint at summer. |
| January | Everything reorganizes around the cool change. |
| April | The relief of autumn. People remember what they like about Melbourne. |

**Confidence:** 4  
**Why this month:** The cool change is one of the most behaviorally interesting local phenomena in any city — a meteorological event that reorganizes social life. January is when it matters most. Directly in the spirit of the project: behavior driven by conditions, not by attractions.

---

### Lisbon — September · *After the Gridlock*

**Archetype:** Quiet  
**Season:** September Light

**Thesis:** Lisbon in September is what the city feels like when the light is at its clearest and the people asking for directions have mostly gone home.

**Local word:** *tasca* — the neighborhood wine bar that only works when it's full of regulars. August returns tourists and displaces the regulars. September gives the tascas back. You can tell the difference in five minutes. The room sounds different when everyone at the table already knows the person behind the bar.

**Small ritual:** Ginjinha from a plastic cup at Largo de São Domingos, no particular reason, middle of the afternoon, because the square has space in it again.

**Seasonal contrast:**

| | |
|--|--|
| August | The city is slow under tourists and heat. |
| September | The tascas fill with regulars. The Atlantic light is clean. |
| November | The rains come. The city gets serious about itself. |

**Confidence:** 4  
**Why this month:** The "reclamation" pattern fits the project's interest in locals recovering their city. The September Atlantic light on the Tagus is genuinely specific to Lisbon's geography. The tasca as behavioral anchor is stronger than saudade as a local word. Watch for overlap with Palermo October — both are "locals return" — differentiation should be geographic and tonal.

---

### Vancouver — July · *The Payoff*

**Archetype:** Open  
**Season:** The Payoff

**Thesis:** Vancouver in July is when the geography the city is famous for finally becomes part of how people actually live in it.

**Local word:** *the mountains are out* — what Vancouver locals say on clear days when the North Shore mountains are visible. Not a joke. A phrase used with genuine relief. The mountains are a presence that arrives and departs. In July, they stay. The city's relationship with its setting becomes legible.

**Small ritual:** Swimming at Jericho Beach, sitting on a driftwood log afterward, watching the mountains go pink, the city behind you and temporarily irrelevant.

**Seasonal contrast:**

| | |
|--|--|
| October | The rains arrive. The mountains disappear behind cloud for months. |
| July | The mountains are out. The water is warm. The evenings last. |
| February | Everything is grey. You remember what July felt like. |

**Confidence:** 4  
**Why this month:** The "geography becoming available" thesis is behavioral, not scenic. The "mountains are out" phrase is editorial: specific, local, and names something precise about the city's relationship with its setting. July is when that relationship is most alive.

---

### New Orleans — November · *The Real Season*

**Archetype:** Local  
**Season:** The Quiet Season

**Thesis:** New Orleans in November is when the city stops performing and becomes a neighborhood.

**Local word:** *lagniappe* (lan-yap) — a little something extra, given freely, without reason. In November, the city is full of lagniappe: a band playing on a Tuesday in a bar with twelve people in it, a second line that wasn't announced anywhere. Not because November is special. Because when the performance stops, the city still has things to say.

**Small ritual:** Coffee and beignets at Café Du Monde at 7am, because in November there is actually somewhere to sit, and the person next to you is from here.

**Seasonal contrast:**

| | |
|--|--|
| February | Mardi Gras. The city performs for itself and for everyone else. |
| November | The city is quietly alive. Locals only. |
| July | The heat makes every outdoor decision a negotiation. |

**Confidence:** 4  
**Why this month:** The behavioral contrast with February is the whole thesis, and it's built in. The city at its most performative vs the city as it actually lives. Lagniappe is genuinely useful as a local word — it names something about the city's relationship with abundance and generosity, not about a dish or a place.

---

### Seoul — October · *The City Climbs*

**Archetype:** Local  
**Season:** Deungsan Season

**Thesis:** Seoul in October reveals that the city is mostly mountain, and that Koreans have always known this.

**Local word:** *deungsan* (등산) — mountain hiking as a cultural institution. Not recreation. Not fitness. Obligation, routine, almost devotion. In Seoul, the mountains run through the city — Bukhansan, Inwangsan, Namsan — and in October, the trails fill with people of every age in full technical gear who have been planning the autumn foliage climb since August. The mountain is the social club.

**Small ritual:** Makgeolli and pajeon at a mountain restaurant (*sanjang*, 산장) halfway up Bukhansan, after the descent has begun and before the legs have stopped hurting. The ritual does not work without the climb.

**Seasonal contrast:**

| | |
|--|--|
| Summer | The mountains are green. The heat keeps people on the trails early. |
| October | The foliage turns and the city climbs together. The trails are social. |
| January | The trails freeze. Only the dedicated go, and they go alone. |

**Confidence:** 5  
**Why this month:** Deungsan culture is specific to Korea in a way that has no direct equivalent in any other city in this batch. The thesis — that Seoul reveals its mountain identity in October — reframes a city most visitors don't visit for its mountains. The behavioral routine is observable, specific, and deeply local. October is the only month when all of this is simultaneously true: the foliage, the trail culture at its peak, the social dimension of the climb.

---

## Strongest five

Ranked by editorial readiness and behavioral specificity.

---

**1. Seoul — October** (confidence: 5)

Deungsan culture is the most specific, least-told story in this batch. No other city in the project has a behavioral thesis built on the city being physically different from how visitors perceive it. The thesis reframes Seoul entirely. The local word (*deungsan*) is behavioral, not decorative. The ritual (*makgeolli* and *pajeon* at a *sanjang*) only makes sense after the climb — it earns its place. This is the next page.

**2. Tokyo — April** (confidence: 5)

A city of relentless efficiency that collectively stops for two weeks. The *mono no aware* angle elevates the concept above cherry blossom tourism into something the project is actually about: the urgency of impermanence creating specific, observable behavior. The conbini beer under Ueno's trees is a scene that writes itself. Hold this for the page after Seoul.

**3. Dublin — May** (confidence: 4)

"The stretch" is one of the most editorial phrases in this batch — it names a precise feeling without being translatable. The behavioral thesis (collective permission to be outside) fits the project perfectly. May is the right month because the permission is freshest: it's too cold to be comfortable, but people go outside anyway, because the light has returned and they are grateful for it.

**4. Melbourne — January** (confidence: 4)

The cool change as a behavioral organizer is the kind of local knowledge this project is built for. A meteorological event that reorganizes social life. The thesis has nothing to do with attractions. You can fail to plan anything in Melbourne in January and still find yourself arranging your whole day around what time the cool change is expected. That is exactly the project's interest.

**5. New Orleans — November** (confidence: 4)

The city-as-performance vs. city-as-neighborhood contrast is built into New Orleans in a way that's unique to it. The Mardi Gras foil is earned, not invented. *Lagniappe* is a real editorial word — it names the city's relationship with generosity without being attached to a specific dish or attraction. November is the month when the city is most itself and least observed.

---

## Recommendation

**Build Seoul — October next.**

It earns expansion for three reasons:

1. **It reframes the city.** Most visitors do not go to Seoul for its mountains. The page would say something that travel writing has not said about Seoul — not because the information is new, but because the behavioral lens is new.

2. **The local word does real work.** *Deungsan* is not a mood or a landscape. It is a practice. The word describes something people do on a schedule, together, with specific gear, at a specific time of year. That makes it editorial rather than atmospheric.

3. **The ritual is earned.** *Makgeolli* and *pajeon* at a *sanjang* only appears after the climb. It cannot be decoupled from the behavior that precedes it. That is exactly what the ritual field is for.

To begin: generate the `PAGE` object skeleton for Seoul — October. Use the concept card above as the source. Do not write full prose until the skeleton is approved.

---

## Discovery batch — the seven open months

Run against February, March, April, May, August, September and December, the
months still holding only one city. Scored for confidence alone; archetype
balance was explicitly not a constraint.

Every card below had to answer the standing question — *what routine becomes
possible here that isn't possible the rest of the year* — with a behavior, not
a condition.

---

### Reykjavík — December · *The Book Flood*

**Archetype:** Quiet
**Season:** Jólabókaflóð

**Thesis:** Reykjavík in December is a city where the shortest days produced a
habit of reading together on a single night.

**Local word:** *jólabókaflóð* — the Christmas book flood. Icelandic publishers
release most of the year's titles in the weeks before Christmas, a catalogue
arrives at every household, books are given on the evening of the 24th, and the
country reads them that night. Not a marketing season. A distribution of
attention that the darkness made sensible.

**Seasonal contrast:**

| | |
|--|--|
| October | The dark is arriving and the catalogue has not yet landed. |
| December | Four hours of light, and an entire city that has agreed to stay in. |
| June | The light never leaves and nobody is indoors to read anything. |

**Confidence:** 5
**Why this month:** The mechanism is causally tied to December and nothing else —
the darkness is the reason the habit exists, and the night it resolves on is
fixed. It is the rare concept where the behavior could not be lifted to another
city or another month without collapsing.

---

### Vienna — February · *The Season of Borrowed Formality*

**Archetype:** Electric
**Season:** Ballsaison

**Thesis:** Vienna in February is when formality stops belonging to the elite and
becomes something your profession does.

**Local word:** *Ballsaison* — the ball season. Roughly four hundred and fifty
balls between January and Ash Wednesday, most of them thrown by trades and
professional guilds rather than by society: the confectioners, the hunters, the
coffeehouse owners. Adults book waltz courses in January in order to attend the
one their occupation holds.

**Seasonal contrast:**

| | |
|--|--|
| November | Dance schools fill with people who will not say why. |
| February | Your trade holds a ball and you go, having practised. |
| April | The rooms return to being concert halls and nobody dances in them. |

**Confidence:** 4
**Why this month:** The season is bounded by Ash Wednesday, so February is when
it is densest and most ordinary — the point at which a ball is a Tuesday
obligation rather than an occasion.

---

### Valencia — March · *Two O'Clock, Every Day*

**Archetype:** Electric
**Season:** Falles

**Thesis:** Valencia in March gives the whole city a standing two o'clock
appointment with an explosion.

**Local word:** *mascletà* — the daytime percussive firework display held at two
in the afternoon in the Plaça de l'Ajuntament, every day from the first of March
to the nineteenth. Judged on rhythm rather than light. People attend on a lunch
break, several times a week, and argue afterwards about whether the ending was
any good.

**Seasonal contrast:**

| | |
|--|--|
| January | The neighbourhood workshops are building and the streets are quiet. |
| March | The city stops at two, every day, for five minutes of noise. |
| May | The same squares are ordinary, and the ground has been swept. |

**Confidence:** 4
**Why this month:** A daily civic appointment attended on a lunch break is a
routine, not a festival attendance — and it exists on exactly nineteen days of
the year.

---

### Tbilisi — September · *Everyone Goes to the Village*

**Archetype:** Local
**Season:** Rtveli

**Thesis:** Tbilisi in September empties toward the countryside because the grapes
decide when, and the city arranges itself around the gap.

**Local word:** *rtveli* — the grape harvest. Not an agricultural event so much
as an obligation of descent: families return to the village they came from,
work for several days, and press into buried clay vessels. Offices lose people
for a week and nobody treats the absence as unusual.

**Seasonal contrast:**

| | |
|--|--|
| July | The heat empties the city toward the mountains, for relief rather than work. |
| September | The city thins out because the harvest called, and returns carrying wine. |
| December | Everyone is back and the year's wine is on every table. |

**Confidence:** 4
**Why this month:** The timing is set by the fruit rather than the calendar, which
makes it the clearest case in the batch of conditions dictating routine.

---

### Stockholm — August · *The Last Light*

**Archetype:** Open
**Season:** Kräftskiva

**Thesis:** Stockholm in August behaves like a city spending down something it
knows is about to run out.

**Local word:** *kräftskiva* — the crayfish party. Held outdoors in August,
under paper lanterns, in paper hats, with singing between drinks. Faintly silly
on purpose. The silliness is the point: it is the last outdoor gathering of the
year and everyone present knows the arithmetic of what is coming.

**Seasonal contrast:**

| | |
|--|--|
| June | Midsummer, and the light feels infinite because it nearly is. |
| August | The dark returns a few minutes a night and the parties move outdoors anyway. |
| November | Afternoon is over by three and nobody eats outside. |

**Confidence:** 4
**Why this month:** August is the only month where the light is both still usable
and visibly leaving, which is what gives the gathering its urgency.

---

### Seville — April · *The Week That Runs on Invitation*

**Archetype:** Electric
**Season:** Feria de Abril

**Thesis:** Seville in April moves its entire social life to a temporary city
that most people cannot enter.

**Local word:** *caseta* — the private tent. Around a thousand of them, belonging
to families, firms and associations, and the great majority are not public. The
month's social geography is a question of whose caseta you have been asked into,
which is why the fairground fills after midnight and not before.

**Seasonal contrast:**

| | |
|--|--|
| February | The city is ordinary and the fairground is an empty lot. |
| April | Everyone works the day and goes to a tent at midnight for a week. |
| August | Forty degrees, and the same streets are abandoned by three. |

**Confidence:** 4
**Why this month:** Access-by-invitation is a genuinely different mechanism from
anything built so far, and the fairground exists for one week a year.

---

### Bergen — May · *The Day the Country Dresses as Itself*

**Archetype:** Local
**Season:** Syttende mai

**Thesis:** Bergen in May hands the streets to children in inherited costume and
puts no soldiers in the parade at all.

**Local word:** *bunad* — the regional folk costume, made to a pattern specific to
the district a family comes from, frequently inherited, and expensive enough to
be a genuine possession. Worn in the street by ordinary adults on the
seventeenth, without irony.

**Seasonal contrast:**

| | |
|--|--|
| March | Wet and dark, and the costume is in a cupboard. |
| May | The children's parade takes the city and the adults dress by district. |
| July | The light is long but the streets belong to visitors. |

**Confidence:** 3
**Why this month:** The strongest image in the batch, but it leans on a single
date rather than a month-long routine, which is the weakness the score reflects.
Kyoto — May is the safer alternative: the gardens become usable and the blossom
crowds have gone, at the cost of being a quieter, less surprising claim.

---

## Build status

Do not let the pipeline become the product. The pipeline exists only to help
select pages worth writing.

For what is built, see the generated table in `README.md` — it is regenerated by
`scripts/build.js` and cannot go stale. This section tracks only what is left.

### Concept cards still unbuilt

- **Stockholm — June** · *When the City Dissolves* — confidence 3  
  Mechanism: midsummer removes the boundary between day and night

### Retired by the one-city-one-month rule

A city gets a single month. These cards are dead as written, because the city
has already been used elsewhere. The mechanism may still be worth rehoming to a
city that has no month yet.

- **Mexico City — February** · *The City's Own Audience* — Mexico City is March  
  Mechanism: the cultural season runs with only residents watching

- **Lisbon — September** · *After the Gridlock* — Lisbon is February  
  Mechanism: the city returns to itself after the August exodus

Both were **Quiet**, which is still one of the thinnest archetypes.

### Gap to 24

Twenty-four cities across twelve months means two per month. Seven months were
short; the discovery batch above proposes one card for each, pending Stage 2
approval.

| Month | Card | Confidence |
|-------|------|-----------|
| February | Vienna · *The Season of Borrowed Formality* | 4 |
| March | Valencia · *Two O'Clock, Every Day* | 4 |
| April | Seville · *The Week That Runs on Invitation* | 4 |
| May | Bergen · *The Day the Country Dresses as Itself* | 3 |
| August | Stockholm · *The Last Light* | 4 |
| September | Tbilisi · *Everyone Goes to the Village* | 4 |
| December | Reykjavík · *The Book Flood* | 5 |

Taking Stockholm for August retires the unbuilt **Stockholm — June** card, since
a city gets one month. This is a deliberate trade: June already holds two
cities, and the August mechanism scores higher than midsummer, which is both
more expected and better covered elsewhere.
