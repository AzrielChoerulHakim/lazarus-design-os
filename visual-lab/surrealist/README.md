# Surrealist Field Lab / 01

**Experimental branch:** experiment/surrealist-direction-lab-01  
**Parent system:** [Lazarus Design OS](../../README.md)  
**Status:** Exploratory prototypes. **Not** a verified client website, production template, or photorealistic final design.

## What this is

The visual reference provided by Lazarus has a very specific grammar: nocturnal blue atmosphere, improbable classical architecture, stone/plaster surfaces, a celestial disc, terracotta textile, controlled editorial serif, and tactile depth. The reference uses a left-side typographic opening against a sculptural monument, followed by selected work, an editorial about, and a rust-colored ending.

That is a **visual language**, not a reusable page skeleton. This lab asks: can three structural proposals, of which two survived visual critique carry that language without copying the original reference's exact composition? We use one fictional test brief to control for content variation.

**Fictional study client:** SERA, a speculative architecture practice. The headings and three study titles are editorial placeholders, not professional claims, portfolio achievements or quotes from a real person. All depicted artwork is original vector construction in the page source. No assets, fonts or source files from the original reference artwork were copied.

## Explore locally

From the repository root:

~~~bash
python3 -m http.server 8000
~~~

Open http://localhost:8000/visual-lab/surrealist/.

Select the three direction tabs. The **two retained studies** respond to actual interaction:
- **01 / The Threshold:** click *Enter the first room* for a substantive dossier. Pointer movement provides optional depth on compatible desktops. Close via the cross or Escape.
- **02 / Unfolding Monograph:** move between two publication spreads with previous/next buttons. No forced scrolling.

Keyboard: Left/Right and Home/End on the concept tabs. The artboards have visible focus states. Reduced-motion preferences disable transitions and parallax.

## Two retained directions after rendered review

| Study | Information architecture | Typography | Visual center | Meaningful interaction | Cost |
| --- | --- | --- | --- | --- | --- |
| **A · The Threshold** | Arrival → threshold → dossier → evidence | Expansive poetic serif + deliberately secondary supporting text | A distant, illuminated architectural passage (no portrait bust) | Open a concise project dossier; optional subtle pointer depth | Atmosphere can exceed its informational value unless real project evidence appears immediately |
| **B · Unfolding Monograph** | Editorial thesis → image plate → spread → deeper work | Overscale publication headline + hand-set page logic | Textile, stone and horizon as a printed plate | Manual page turn expresses chapter changes | Publications need reading/search fallback for large content sets |

They intentionally **do not** share identical hero blocks, project-card grids, CTA order, or scroll transitions. Shared motifs may be architectural, but the *reader's task* changes.

## Curatorial decision / 17 November 2026

**RETAIN** A — The Threshold, with a denser moonlit scene, suspended stone fragment, authored grain and restrained terracotta veil. **RETAIN** B — Unfolding Monograph, now using an original fractured marble figure, mineral shadows and two materially different editorial spreads. **CUT** Impossible Atlas from the active gallery and JS/CSS: despite useful indexing, the visual plate was an ordinary geometric diagram and failed the intended material, atmosphere and impossible-world language. Its rationale is preserved in EXPERIMENT_REPORT.md, not shipped as a design direction.

This is a subjective creative review based on actual Chromium screenshots, **not** an objective originality score. A successful browser run is still not equivalent to a final art-direction approval.

## Visual DNA — not a uniform token kit

- **Material:** pale mineral surfaces, imperfect edges, distant terrain, celestial light and textile weight. The aim is spatial tension and an authored texture, not prepackaged gradients or glowing glass.
- **Color relationship:** deep blue nocturnes against limestone/chalk; warm terracotta/copper as directional material rather than random CTA red. The Atlas and Monograph deliberately invert the balance for evidence-heavy reading.
- **Typography:** expressive italic display with intentionally measured secondary reading; the monograph favors dramatic asymmetric typesetting, while the atlas favors legibility in a labelled index.
- **Composition:** A is cinematic depth; B is a publication spread. The proposed Atlas was rejected after review because it read like conventional architectural information design rather than the surrealist world. Don't transpose one structure into another by palette swapping.
- **Motion:** A provides spatial continuity, B visualizes selection, C communicates pagination. No autoplay, scroll-jacking or mandatory 3D.
- **Mobile:** on small screens A becomes text first then illustration; B becomes publication copy then image spread. The illustrations cannot sit on top of legible content.

## Relationship to the existing Design OS

This lab is additive. It does **not** modify [Tone of Voice](../../docs/TONE_OF_VOICE_SYSTEM.md), the existing [Reference Atlas](../../docs/REFERENCE_ATLAS.md), the seven client-specific alternatives in the Direction Room, or the release gates.

The seven named *visual families* provided by Lazarus are different from the seven *technical mechanism* studies in the Reference Atlas. Neither should replace the other. The voice is selected from client evidence and audiences **independently** from any visual family. A whimsical or surreal surface does not give permission to write first-person quotations or attribute eccentricity to the client.

The **three grayscale same-copy typography specimens** in the Design OS workflow are still mandatory when a real client is selected. These color artboards do not pretend to fulfill that client-specific gate.

## If promoted to a real client project

1. Read their CV, authenticated work, photographs, writing and practical audience goals.
2. Keep the seven-structure comparison demanded by Design OS; this lab offers only three explorations *within one style family*.
3. Pick the visual direction independently from the five tone-of-voice starting families; justify any hybrid.
4. Run the real-content typography gate and font/license review, and write a verified source ledger.
5. Replace these SVG scene sketches with appropriately licensed photographs, authorized illustrations or original 3D assets **only if** they serve the person's real work.
6. Include complete project details, contact actions and functional navigation; the current concept buttons are not a finished portfolio.
7. Perform actual browser QA: section-by-section screenshots at 320 and 390 CSS px, 640/768/1024/1440, short landscape, text enlargement, contrast, navigation, touch, keyboard and reduced motion.

## Testability

- Static checks: node --test tests/surrealist-lab.test.mjs
- Browser and screenshot checks (requires Playwright/Chromium): node scripts/check-surrealist-lab-browser.mjs
- Screenshots and test report are written under screenshots/surrealist-lab/.

See [EXPERIMENT_REPORT.md](EXPERIMENT_REPORT.md) for the evidence matrix, known limitations and next creative hypotheses. **Do not mark the visual integrity gate as passed solely from source inspection or a script's success.**