# Sculptural Impasto — Curatorial Visual QA

This supplements the existing Design OS release flow. It is **not a new replacement release gate**, and scores are human review suggestions, not automated proof of originality.

## Qualitative review / 100 points

| Dimension | Weight | Reviewer should inspect |
| --- | ---: | --- |
| Surrealist idea | 25 | One coherent impossible transformation rather than unrelated fantasy decorations |
| Impasto material | 25 | Pigment relief, knife ridges, density and material-specific mark direction |
| Lighting / depth | 20 | World shadows and relief-surface lighting both legible and internally coherent |
| Editorial integration | 15 | Image framing, hierarchy and working links support genuine reading tasks |
| Responsive integrity | 15 | At 320/390 and intermediate widths: subject preserved, no text overlap |

**Provisional threshold:** at least 85/100, subject to an independent curator reviewing the real renders. A result below threshold is rejected for production. A result above threshold still fails if any critical blocker applies.

## Critical blockers (absolute rejection)

1. Artwork is an SVG render, a stack of images, separate CSS lighting, fabricated 3D or cutout parallax.
2. Image loses its impossible core relationship at a tested viewport.
3. Artworks are low-quality thumbnails enlarged to look like original master assets.
4. Text/control overlaps artwork in a way that harms reading or clickability.
5. Fake client achievements, wrongly attributed authorship or unlicensed reused paintings.
6. Aesthetic is generic embossed render, not considered sculptural oil material.
7. One visual grammar is reused for unrelated clients without evidence.

## Browser and human QA

- Run the existing Design OS type/voice/mobile/release procedures unchanged.
- Screenshots at 320, 390, 640, 768, 1024, 1440 and short landscape.
- Inspect every section: painting intact, headline, CTA, long titles, keyboard, focus, contrast, 200% zoom and reduced motion.
- Browser automation can verify element count, URL, intrinsic image resolution, collisions and code constraints. **It cannot judge beauty, actual painting technique, conceptual novelty or a client's trustworthiness.**
- Record pass/fail, reviewer, source commit, specific image crop and remaining limitations.

## Decision states

**RESEARCH** — hypothesis only.  
**PROTOTYPE** — structurally renders but art or review unresolved.  
**CURATED** — human-approved image/mapping at real desktop/mobile.  
**PRODUCTION-ELIGIBLE** — approved real source art, truthful client evidence, full Design OS release gates complete.

The generated master paintings in this experiment start at **RESEARCH**. Do not conflate a green CI status with production eligibility.