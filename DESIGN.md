# Design Constitution · Lazarus Dev

**The signature of Lazarus is the quality of the thinking, not a signature palette.** A lawyer, ceramicist and machine-learning researcher must not get the same hero and card grid with different typefaces.

## Global image-led art-direction rule — Lazarus

For portfolio website production, **do not use SVG for artistic website visuals** and **do not assemble scenes from stacked images, foreground cutouts, decorative CSS layers, pseudo-element lighting or fake parallax**. One art-directed composition is one complete raster image with coherent lighting, natural shadows, material and depth already resolved in the source. HTML may lay out text and controls around the image, never as an improvised scene-building collage. This rule overrides past vector/procedural art experiments. Image quality must be reviewed at real desktop and mobile sizes. If raster master assets are only low-quality previews, mark them **not approved for production**, and request/reuse the original-resolution asset rather than reconstruct it using stacked visual tricks.

## 1. Evidence is the design material
Rank primary sources: verified portfolio work, CV, photography and context; then audience research; then project constraints; finally reference imagery. If a CV has little evidence, choose a focused information architecture instead of manufacturing a portfolio.

## 2. Structural originality precedes visual novelty
A unique font on the same hero → services → cards → contact skeleton is cosmetic variation. Choose the shape of the experience by the user's job: dossier, archive, index, interactive map, exhibition, chronology, casebook, workspace, or a single carefully edited narrative. These are possible *forms*, not a compulsory pattern menu.

## 3. Typography is information architecture — and our highest-risk craft discipline
Before images, colors or animation, decide **what the reader must recognize, scan, compare and read**. Develop text hierarchy from real content. Choose fonts only after defining reading tasks, content density, multilingual coverage and the information architecture. Create **three grayscale, same-copy typographic specimens** for the chosen direction; defend the winning composition against rejected alternatives. Text roles include display, section, reading body, labels, caption, controls and aligned data only when actually needed. Control line length, leading, font weight, optical behavior, rag, tracking, punctuation and responsive wrapping; check fallbacks and rights. Apple demonstrates discipline in text styles, optical sizing and adaptive hierarchy — **not a universal SF Pro prescription**. Use [Typography Direction System](docs/TYPOGRAPHY_SYSTEM.md) and pass the separate [Typography QA](docs/TYPOGRAPHY_QA.md). The 45–75 character measure is a context-dependent reading heuristic, not a law. Avoid decorative all-caps micro-labels, huge serif headlines, random italics or negative tracking as defaults.

### Type decisions must stand without styling
An expressive font cannot rescue generic composition. Strip brand colors/photos from a proposed page and check whether the text hierarchy remains client-specific. The same font can serve very different clients through different measures and rhythms; conversely changing font names alone is not a new concept. Never shrink authentic text to protect a screenshot.

## 4. Apple's craft, not Apple's costume
Purpose, feedback, consistency, touch ergonomics, optical alignment, responsiveness and reduced motion are useful standards. Do **not** reuse Apple.com's page anatomy, white/gray palette, glass everywhere, imitation devices, SF font files, blue CTAs or product-shot choreography without a project reason.

## 5. Visual assets must carry evidence
The most important images are the client's actual works. Avoid generic stock, AI-generated identity evidence, fabricated credentials or copyrighted reference art. A precise crop of authentic work is more valuable than a meaningless atmospheric scene.

## 6. Interaction must be responsive and interruptible
Use movement to communicate state, causality and navigation; honor `prefers-reduced-motion`. Avoid fixed scripts that lock the UI; if drag-driven, track live pointer state and preserve continuity. Don't deploy physically elaborate motion into a basic information page unless it helps understanding.

## 7. Cohesion without monotony
Link sections through a shared editorial logic and precise details, while varying density, rhythm and scale as the narrative requires. A design system ensures consistency of *rules*, not sameness of every component.

## 8. Test instead of asserting quality
Perform the identity swap test, structural skeleton comparison, design rationale challenge and independent perception review. Record what was rendered, checked and not tested. Do not call subjective originality scores scientifically validated.

## 9. Learn from corrections without calcifying style
Record accepted user preferences and the reasoning in project-specific decisions. Generalize only reusable principles. Never transfer a client's color scheme, exact composition, or imagery to another client's site.

**Operating aphorism:** Be as deliberate as Apple; never mistake looking like Apple for being well designed.
