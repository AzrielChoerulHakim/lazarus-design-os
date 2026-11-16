# Lazarus Mobile Visual Integrity System
**Mobile is a composition, not a compromise.**

Desktop may be excellent while mobile contains overlapping illustrations, clipped labels, awkward focal crops or motion-induced collisions. A layout merely fitting within a viewport is not an art-direction pass.

## Plan before implementation
In `mobile` in `design-contract.json`, record:
- `readingOrder`: hierarchy and content sequence on small screens.
- `sections`: real IDs for **every** homepage section (not just hero), used to enforce review coverage.
- `riskAreas`: specific likely collisions (e.g. scene foliage with a heading, portrait with CTA, fixed header with anchor).
- `illustrationPolicy`: whether art moves, crops, changes layer, changes scale or disappears on phone **without losing essential content**.
- `motionFallback`: layout in motion, when paused, and with `prefers-reduced-motion: reduce`.
- `spec`: a file with the real mobile composition plan; use the client copy of `templates/MOBILE_VISUAL_QA.md`.

Desktop layout can be substantially recomposed for mobile. Prioritize identity-specific storytelling, but keep essential reading material separate from decoration. If there are no illustrations, state the actual risk (tables, nav, chart legend, long names).

## Coverage: every real section, multiple conditions
Use screenshots at 320, 390, 640, 768, 1024 and 1440 CSS px plus short landscape (height at most 500 CSS px). At **both 320 and 390 px**, record a per-section `qa.mobileInspections` item:
```json
{"section":"experience","width":390,"path":"proof/experience-390.png","status":"pass","notes":"Illustration moved below heading; text and CTA remain unobscured."}
```
A single hero shot or a full-page scrollWidth check does **not** establish that all sections are visually safe. Each inspection must be based on a real rendered image, include a concrete observation, and name the reviewed source commit.

Check normal scroll, fixed/sticky navigation, menu open, interactive panels, loading states, 200% text enlargement, narrow reflow, slow font loads, and reduced-motion. Check tappable controls and actual text length. Include both portrait and landscape where relevant.

## Optional executable geometric probe
```sh
npm install --no-save playwright
npx playwright install chromium
node scripts/mobile-visual-audit.mjs http://localhost:8000 --output screenshots/mobile
```
Add `data-lazarus-section="experience"` to important page sections; put `data-lazarus-critical="experience heading"` on readable headings/copy/CTAs and `data-lazarus-decoration="floating foliage"` on potentially overlapping decorative layers. The probe captures viewport and marked-section images, flags horizontal overflow, clipped marked content and geometric decoration/content intersections.

**Limits:** Automated geometry catches only visible, marked elements and simple rectangles. Intentional layering may cause false positives; unmarked components, animation frames, contrast, aesthetic hierarchy and text obscured by complex masks may evade it. The script's clean result always means **manual-review-required**, never “mobile approved.” Inspect screenshots independently.

## Fix order
1. Identify the affected section and exact viewport/state.
2. Recompose **content order, layering, and illustration placement** before changing arbitrary offsets.
3. Rework responsive type sizes and measures; never sacrifice readable text to preserve an illustration.
4. Re-test menu, long headings, contact actions and motion states.
5. Capture new evidence for **the same reviewed commit** and update the inspection record.

## Release blockers
- Critical text, navigation or controls overlapped, clipped, truncated or unreachable.
- Forced horizontal prose reading at 320px, unusable zoom or keyboard focus.
- Any section missing observed 320/390 inspection evidence.
- Motion producing temporary collisions or hiding essential information, without a usable reduced-motion/paused path.

The CLI records coverage and evidence, not visual beauty. A human checks composition, contrast, crop intention, and whether the responsive art direction has retained its identity.
