# Composition Mapping — painting → web space

## Input / output

**Input:** one complete painting and its dimensions, subject and focal bounding zone, ranked information tasks, tested typography, breakpoints and the client-approved visual direction.

**Output:** a composition record assigning the painting a **role**, text to its own readable area, one dominant focal path and safe independent space for controls. A painting never determines the portfolio's content order by itself.

## Five mapping passes

1. **Art reading:** name the impossible transformation in one sentence. Mark dominant mass, directional movement, readable quiet areas and visual contrast. If nothing impossible can be articulated, reject the painting.
2. **Painting geometry:** use normalized coordinates (x/y from 0 to 1) for focal bounds and safe-crop boundaries, then visually inspect the actual result. Values are hypothesis, not machine-detected saliency.
3. **Reader tasks:** rank the visitor's questions from verified content (e.g. What do they do? What work proves it? How do I reach them?). Use the existing design contract and typography workflow.
4. **Choose a composition grammar:** try at least three independent arrangements and document the tradeoff—A / gallery side-by-side, B / archive folio, C / sequential passage. These are **internal visual mappings**, not replacements for the seven different client-specific structures required by Design OS.
5. **Render and reject:** audit typography, crop integrity, useable actions, source truth and mobile. Reject any variant whose formal surprise makes the visitor's task harder.

## Three structure grammars (same fictional study content)

| Variant | Reading order | Artwork role | Typography relationship | Why it might fail |
| --- | --- | --- | --- | --- |
| A / Monumental Gallery | Title and mission → one painting → selected work → contact | Intact, framed landscape in adjacent column | Caption and artwork are siblings; no text baked into art | Too theatrical for high-density credentials |
| B / Evidence Folio | Project index → one large painting plate → real-case details → contact | Folio plate, separate from factual evidence | Numbered editorial entries + separate plate | Misleading if the painting is presented as an actual project |
| C / Impossible Passage | Opening thesis → standalone painting → three consecutive editorial chapters → contact | A scene that establishes a specific narrative turn | Reading-first on mobile; explicit continuation | Can bury urgent work/credentials if visitor expects an index |

A real client does **not** automatically receive one of these. Select by audience, evidence and reading grammar, or discard all three.

## Visual hierarchy rules

- **Headline:** can be monumental only if important real words remain readable and visually separate from the artwork.
- **Negative space:** used as intentional editorial rhythm; never render ghost copy over detailed impasto relief.
- **Pigment palette:** extract as reference for **supporting interface colors**, then verify text contrast. Do not paint UI gradients or recreate relief in CSS.
- **Image edges:** retain painting as a whole by default. Any cropping is recorded and checked at 320 and 390 px; important contradiction must remain visible.
- **One scene:** one image element. Distinct real client project photographs remain legitimate, each in its own non-overlapping semantic figure, never in a composited collage.

## Reusable record

For each candidate include painting ID and source license, transformation statement, focal rectangle, quiet zones, selected layout grammar, client fact IDs, primary CTA, desktop and mobile image strategies, rejected alternatives, and screenshot evidence.

Example values live in [mapping-data.json](mapping-data.json).