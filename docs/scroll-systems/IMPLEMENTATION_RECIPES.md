# Scroll Director — implementation recipes

**Original engineering specifications, not third-party code or production-ready client components.** Build the complete content and direct navigation first. Treat CSS Scroll-Driven Animations as feature-detected enhancement; use native scroll, sticky and overflow first. A React/Motion or GSAP recommendation is conditional on project stack and behavior, not mandatory. Source links resolve by ID in `data/scroll-systems.json` and `SOURCES.md`.

## Stable lifecycle template

1. Model the exact section IDs, data points and assets once. A visual readout must never have its own independent scroll clock.
2. Establish the no-JS DOM with all headings, links, figures, media descriptions and verified values. Test it before enhancements.
3. Choose progress math: `clamp01(-rect.top / max(1, rect.height - innerHeight))` for a genuinely oversized stage; handle non-scrollable sections explicitly. For a sticky illustration, an `IntersectionObserver`/discrete selection may be simpler than continuous progress.
4. Measure layout after fonts and media load, on resize and changed browser UI, and when the effect is first visible. Do not assume device 1440×900.
5. Apply one transform/mask/progress value to every dependent element. Avoid layout thrash, forced wheel listeners, unbounded RAF and offscreen WebGL loops.
6. Remove or recompose motion when `prefers-reduced-motion` is enabled or screen height is insufficient. Never leave a 300vh pinned blank section in reduced motion.
7. Validate keyboard/focus, direct anchors, reverse scroll, touch and browser history. Add only the QA IDs relevant to the chosen pattern, in addition to universal checks.

## Failure prevention for advanced layouts

- Horizontal pinning must account for horizontal overflow *and* focus landing on offscreen panels; vertical-to-horizontal mapping is not the same as native horizontal scroll.
- If a CSS feature is unsupported, the base layer must be completely visible by default. Gate the progressive effect with `@supports` and a motion preference query.
- Set `scroll-margin-top` on deep-linked sections when sticky headers exist; test Browser Back and `#hash` refresh.
- A numeric label can only reflect verified input; decorative clocks, temperature curves, KPI gauges and fictional research data are prohibited.
- A Canvas/SVG visual is an *alternative representation*. Accompany it with a semantic equivalent that survives all rendering failures.

---
## S01 — Reading Progress Rail (`reading-progress-rail`)

**Role:** supporting · **Complexity:** low · **Related Atlas:** none.

**Reader purpose:** Show genuine position in a long readable document, not an ornamental percentage.

**Trigger:** Root document scroll relative to scrollable height.

**Canonical state:** Clamp scrollTop / max(1, scrollHeight - viewportHeight) to 0..1; guard zero-length document.

**Visible result:** An optional progress indicator complementary to headings and anchors.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** CSS animation-timeline: scroll(root block) inside @supports; keep indicator purely supplemental.
**When advanced motion is justified:** Coalesced passive scroll + resize observer or Motion useScroll for a semantic aria-valuenow when needed.

**No JS:** All document sections and headings remain readable without the rail.
**Reduced motion:** Remove the moving rail or show a static section index; do not trap reading.
**Mobile:** Use a subtle or absent rail on small screens; never overlap headers or system navigation.

**Specific QA:** `zero-scroll-height`, `bottom-reach`, `resize-progress`, `keyboard`, `reduced-motion`, `mobile-320`.

**Reject if:** Page is short, there is no longform need, or the marker pretends to represent meaningful milestones.
**Research IDs:** `mdn-scroll`, `motion-scroll`, `mdn-motion`.

**Status:** research-only. These are independently authored engineering prescriptions, not copied snippets from the source references.

## S02 — Scroll-Synced Chapter Index (`chapter-index-sync`)

**Role:** supporting · **Complexity:** medium · **Related Atlas:** chronology-state.

**Reader purpose:** Help readers find sections and know which chapter is currently being read.

**Trigger:** Section visibility crossings plus explicit anchor navigation.

**Canonical state:** One active section ID selected by a deterministic visibility policy; URL anchors remain authoritative.

**Visible result:** A linked table of contents receives aria-current="location" on its active link.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** Native sticky navigation and IntersectionObserver (activation), plus scroll-margin-top for anchors.
**When advanced motion is justified:** GSAP ScrollTrigger enter/enterBack for complex pinned contexts; same section ID model.

**No JS:** The table of contents is a functioning set of fragment links without JS.
**Reduced motion:** Disable animated index transitions, retain the exact active link.
**Mobile:** Recompose to an ordinary compact jump list rather than a persistent overlay.

**Specific QA:** `anchor-deeplink`, `hash-history`, `active-state`, `keyboard`, `reverse-scroll`, `sticky-header`, `mobile-320`.

**Reject if:** Fewer than three meaningful chapters or current-section status has no practical benefit.
**Research IDs:** `figma-sticky`, `mdn-observer`, `gsap-scrolltrigger`.

**Status:** research-only. These are independently authored engineering prescriptions, not copied snippets from the source references.

## S03 — Native Snap Chapter Strip (`native-snap-strip`)

**Role:** supporting · **Complexity:** low · **Related Atlas:** none.

**Reader purpose:** Allow direct browsing of finite media or related chapters without forced page pinning.

**Trigger:** User-driven horizontal swipe, trackpad, keyboard/tab and previous/next controls.

**Canonical state:** Native scroll position and stable item IDs; no fake carousel index separate from the DOM.

**Visible result:** A horizontally scrollable group using proximity snapping and visible neighboring context.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** overflow-x:auto; scroll-snap-type:x proximity; scroll-padding; anchor links or real buttons.
**When advanced motion is justified:** Optional JS scrollIntoView and an IntersectionObserver to update a live position label.

**No JS:** The overflow container remains natively scrollable and every item stays in DOM.
**Reduced motion:** Keep native scroll behavior; disable animated smooth scrolling.
**Mobile:** Use touch-native swiping with visible next/previous access; avoid horizontal-only text.

**Specific QA:** `keyboard-focus`, `scroll-escape`, `oversize-items`, `touch`, `long-copy`, `focus-visibility`, `mobile-320`.

**Reject if:** A carousel hides core prose, traps keyboard focus, or mandatory snapping prevents reading a tall card.
**Research IDs:** `mdn-snap`, `figma-scroll`.

**Status:** implemented-demo. These are independently authored engineering prescriptions, not copied snippets from the source references.

## S04 — Sticky Evidence Exchange (`sticky-evidence-exchange`)

**Role:** dominant · **Complexity:** medium · **Related Atlas:** evidence-state, progressive-chapter.

**Reader purpose:** Let one evidence illustration stay visible while sequential verified findings change its interpretation.

**Trigger:** Narrative steps enter a defined viewport band.

**Canonical state:** Active step ID derived from the currently intersecting section; never manage a parallel scene clock.

**Visible result:** Sticky panel updates supporting label or diagram while all evidence steps remain in document order.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** CSS position:sticky and IntersectionObserver; use real captions and figures.
**When advanced motion is justified:** Motion useScroll or GSAP ScrollTrigger only if interpolation between steps is necessary.

**No JS:** Show evidence and interpretation beside each step without a persistent stage.
**Reduced motion:** Replace sticky stage with ordinary figures and captions.
**Mobile:** At 320/390px place the figure immediately before its relevant step, not over the text.

**Specific QA:** `reverse-scroll`, `short-height`, `focus-order`, `reading-order`, `resize`, `mobile-320`, `mobile-390`, `no-js-content`.

**Reject if:** Every step uses the same unrelated image or the pinned stage is taller than the viewport.
**Research IDs:** `figma-sticky`, `mdn-observer`, `gsap-scrolltrigger`.

**Status:** implemented-demo. These are independently authored engineering prescriptions, not copied snippets from the source references.

## S05 — Data-Linked Scrollytelling (`data-linked-scrub`)

**Role:** dominant · **Complexity:** high · **Related Atlas:** synchronized-process-plot.

**Reader purpose:** Coordinate observed values, plot cursor, units and explanation from one sourced dataset.

**Trigger:** Scroll stage progress or deliberate step changes (with explicit value navigation).

**Canonical state:** One clamped progress variable resolves one deterministic row or interpolation, with data provenance.

**Visible result:** Text readout and chart marker reflect the same point, never fabricated telemetry.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** Use a static SVG chart/table first; optional CSS view timeline for visual emphasis.
**When advanced motion is justified:** GSAP scrub or Motion useScroll -> useTransform; retain exact textual value navigation.

**No JS:** A labelled table and descriptive chart expose all relevant values.
**Reduced motion:** Show chart plus static annotated values in reading order.
**Mobile:** Unpin data graphics for cramped screens; data table remains directly reachable.

**Specific QA:** `data-authenticity`, `unit-labels`, `state-sync`, `reverse-scroll`, `keyboard`, `no-js-content`, `mobile-320`.

**Reject if:** Sources lack real numeric data or the interpolation suggests unobserved precision.
**Research IDs:** `superdesign-process`, `motion-scroll`, `gsap-scrolltrigger`.

**Status:** research-only. These are independently authored engineering prescriptions, not copied snippets from the source references.

## S06 — SVG Journey Trace (`svg-journey-trace`)

**Role:** dominant · **Complexity:** medium · **Related Atlas:** progressive-chapter.

**Reader purpose:** Visually connect a documented sequence with a line that advances along actual milestones.

**Trigger:** Document or section scroll progress.

**Canonical state:** Path progress from measured length and validated stage positions, mapped to chronology IDs.

**Visible result:** stroke-dashoffset draws connecting path; real list titles remain always visible.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** SVG vector-effect where appropriate; CSS scroll timeline where supported; path visible as baseline.
**When advanced motion is justified:** Motion useScroll + pathLength / GSAP; compute real SVG length, no hardcoded decorative route units.

**No JS:** A complete ordered chronology with explicit dates and content.
**Reduced motion:** Render a static visible connector or a plain timeline list.
**Mobile:** Replace complex curves with short vertical connector or no connector.

**Specific QA:** `path-resize`, `reverse-scroll`, `no-js-content`, `reading-order`, `date-authenticity`, `mobile-320`.

**Reject if:** The route implies precise geography or time without supporting source data.
**Research IDs:** `superdesign-journey`, `motion-scroll`, `mdn-scroll`.

**Status:** research-only. These are independently authored engineering prescriptions, not copied snippets from the source references.

## S07 — Horizontal Editorial Gallery (`horizontal-editorial-gallery`)

**Role:** dominant · **Complexity:** high · **Related Atlas:** progressive-chapter.

**Reader purpose:** Present a genuine sequence of visual work as an editorial spread with spatial continuity.

**Trigger:** Vertical section scroll mapped to horizontal track travel, only when explicitly justified.

**Canonical state:** Travel distance max(0, scrollWidth - clientWidth), recomputed for resize/images/font load.

**Visible result:** Track traverses framed work while every panel has anchors, headings and accessible links.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** Prefer a native horizontal overflow gallery before considering pinned vertical-to-horizontal mapping.
**When advanced motion is justified:** GSAP ScrollTrigger pin/scrub with matchMedia cleanup, focus navigation and anchor correction.

**No JS:** All panels remain accessible in normal vertical DOM flow or via native overflow.
**Reduced motion:** No pinning; stack editorial panels vertically.
**Mobile:** Use swipe-native or vertically stacked panels; never translate offscreen focused text.

**Specific QA:** `focus-reveal`, `horizontal-escape`, `touch`, `short-height`, `content-width-resize`, `reverse-scroll`, `mobile-320`.

**Reject if:** Long reading copy, essential controls offscreen, or panels could not be reached by keyboard.
**Research IDs:** `superdesign-horizontal`, `gsap-scrolltrigger`, `gsap-matchmedia`.

**Status:** research-only. These are independently authored engineering prescriptions, not copied snippets from the source references.

## S08 — Layered Card Stack (`layered-card-stack`)

**Role:** dominant · **Complexity:** medium · **Related Atlas:** progressive-chapter.

**Reader purpose:** Convey accumulating chapters or a physical stack of related authentic artifacts.

**Trigger:** Each card enters sticky viewport position then yields to the next.

**Canonical state:** DOM order is canonical; CSS sticky top offsets establish the visual pile only.

**Visible result:** Cards overlap gradually while headings and focusable elements remain accessible.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** CSS position:sticky with finite container and short section geometry, avoid forced heights.
**When advanced motion is justified:** Optional GSAP scale/translate for restrained depth; no opacity fade that hides content.

**No JS:** Plain sequential card list with identical content and intact headings.
**Reduced motion:** Disable overlap, preserve natural flow.
**Mobile:** Unstack into full-width articles with comfortable spacing.

**Specific QA:** `tab-focus`, `short-height`, `card-overlap`, `reading-order`, `reverse-scroll`, `mobile-320`.

**Reject if:** Interactive controls are covered by later cards or stories have no accumulating relationship.
**Research IDs:** `figma-sticky`, `gsap-scrolltrigger`.

**Status:** research-only. These are independently authored engineering prescriptions, not copied snippets from the source references.

## S09 — Depth Parallax Theatre (`depth-parallax-theatre`)

**Role:** dominant · **Complexity:** high · **Related Atlas:** meaningful-media-reveal.

**Reader purpose:** Show spatial relationships in multi-layer illustration or authentic architectural imagery.

**Trigger:** Scene-local scroll progress, not pointer position.

**Canonical state:** Single progress value transformed to bounded depth offsets per decor layer.

**Visible result:** Foreground and distant layers travel at restrained relative speeds; copy stays fixed in reading order.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** CSS view timeline for transform-only optional decor with baseline layered composition.
**When advanced motion is justified:** Motion useScroll/useTransform or GSAP for geometry-linked depth; throttle Canvas loops.

**No JS:** A composed static layered image/illustration with full description.
**Reduced motion:** Zero transform, no animated zoom; show static composition.
**Mobile:** Limit travel; protect readability and prefer single-layer composition on narrow screens.

**Specific QA:** `reduced-motion`, `text-contrast`, `image-license`, `low-power`, `resize`, `mobile-320`.

**Reject if:** Motion competes with text, layers have no narrative/spatial purpose, or visual occludes controls.
**Research IDs:** `figma-sites-interactions`, `mdn-scroll`, `motion-transform`.

**Status:** research-only. These are independently authored engineering prescriptions, not copied snippets from the source references.

## S10 — Aperture & Mask Reveal (`aperture-mask-reveal`)

**Role:** dominant · **Complexity:** medium · **Related Atlas:** meaningful-media-reveal.

**Reader purpose:** Control what part of a verified image is revealed to support a real discovery.

**Trigger:** Section-local normalized scroll range.

**Canonical state:** Clip inset/radius/shape interpolated from progress with clear 0 and 1 endpoints.

**Visible result:** More of an authentic image becomes visible while caption and subject remain legible.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** Use CSS clip-path and @supports(animation-timeline: view()); baseline shows full image.
**When advanced motion is justified:** Motion useTransform to clip-path or GSAP timeline; no hidden media dependency.

**No JS:** Full authentic photograph with meaningful caption and readable context.
**Reduced motion:** Show entire still immediately (not a frozen aperture).
**Mobile:** Use contextual image crop and no forced reveal.

**Specific QA:** `content-visibility`, `image-failure`, `reduced-motion`, `contrast`, `mobile-crop`, `reverse-scroll`.

**Reject if:** Reveal conceals essential details or the image has no factual narrative role.
**Research IDs:** `mdn-scroll`, `motion-scroll`, `superdesign-website`.

**Status:** research-only. These are independently authored engineering prescriptions, not copied snippets from the source references.

## S11 — Before–After Split Reveal (`before-after-wipe`)

**Role:** dominant · **Complexity:** medium · **Related Atlas:** meaningful-media-reveal.

**Reader purpose:** Compare two documented states of the same artifact with identical framing.

**Trigger:** Scroll progress or user-controlled native range slider.

**Canonical state:** Reveal fraction clamped 0..1, with labelled before/after captions sharing one model.

**Visible result:** A split view lets readers inspect change without losing context.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** Two images same size/alignment, CSS clip-path, native range input as direct control.
**When advanced motion is justified:** Motion scroll mapping only when it does not replace direct keyboard/touch comparison.

**No JS:** Two full, correctly labelled images displayed consecutively.
**Reduced motion:** Side-by-side or stacked before/after stills; interactive range remains operable if offered.
**Mobile:** Stack images and prefer a draggable native slider with enough target size.

**Specific QA:** `alignment`, `source-authenticity`, `slider-keyboard`, `touch`, `focus`, `no-js-content`, `mobile-320`.

**Reject if:** Before/after images are unrelated or the interactive view hides material evidence.
**Research IDs:** `mdn-scroll`, `superdesign-website`.

**Status:** research-only. These are independently authored engineering prescriptions, not copied snippets from the source references.

## S12 — Object Sequence Scrub (`object-sequence-scrub`)

**Role:** dominant · **Complexity:** high · **Related Atlas:** dom-measured-plot.

**Reader purpose:** Reveal actual steps of making through ordered frames or reproducible object states.

**Trigger:** Section progress mapped to discrete frame indices.

**Canonical state:** frameIndex=floor(clamp01(progress)*(frameCount-1)); index reused for caption and object.

**Visible result:** Sourced visual stages show real change, optionally supplemented by model rotation.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** Use still frames or sprite/CSS step animation with an accessible stage index.
**When advanced motion is justified:** Canvas image-sequence/GSAP with preloading window, frame caching, DPR cap and cleanup.

**No JS:** Contact sheet of labelled stages or representative source frames.
**Reduced motion:** Provide immediately readable beginning/middle/end annotated images.
**Mobile:** Use 2–4 representative stills, without a pinned multi-screen preload stage.

**Specific QA:** `missing-frames`, `network-failure`, `memory-pressure`, `visibility-pause`, `reduced-motion`, `reverse-scroll`.

**Reject if:** Frames are generated without evidence or media budget blocks reading/performance.
**Research IDs:** `gsap-sequence`, `gsap-scrolltrigger`.

**Status:** research-only. These are independently authored engineering prescriptions, not copied snippets from the source references.

## S13 — Typographic Disclosure (`typographic-disclosure`)

**Role:** dominant · **Complexity:** medium · **Related Atlas:** progressive-chapter.

**Reader purpose:** Reveal a documented statement progressively to match a valid editorial argument.

**Trigger:** Per-word or per-phrase view progress.

**Canonical state:** Progress maps to visual emphasis only; semantic text content is always complete.

**Visible result:** Words shift emphasis or underline rather than becoming undiscoverable text.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** CSS background-size/color/opacity on decor and native readable text; limit effect to a short quote.
**When advanced motion is justified:** Motion useScroll with stable pre-rendered text spans; no per-character layout shifts.

**No JS:** Full paragraph remains visible and readable without script.
**Reduced motion:** Remove all progressive word fills and masks; full text has correct contrast.
**Mobile:** Use modest highlight; no horizontal moving marquee inside body copy.

**Specific QA:** `contrast-at-progress`, `screen-reader-text`, `font-resize`, `text-spacing`, `reduced-motion`, `mobile-320`.

**Reject if:** Text is hidden until the user scrolls, reading order breaks, or every paragraph gets animated.
**Research IDs:** `motion-text`, `superdesign-process`.

**Status:** research-only. These are independently authored engineering prescriptions, not copied snippets from the source references.

## S14 — Spatial Zoom Transit (`spatial-zoom-transit`)

**Role:** dominant · **Complexity:** high · **Related Atlas:** meaningful-media-reveal, visibility-aware-drawing.

**Reader purpose:** Explain a real nesting of scales, e.g. overview to a specific project detail.

**Trigger:** Local progress of a scene anchored to a sequence of verified visual contexts.

**Canonical state:** Camera transform bounded by specific target anchors; not an infinite decorative zoom.

**Visible result:** View transitions from contextual overview to documented detail.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** CSS transformed images and anchor targets with static accessible alternatives.
**When advanced motion is justified:** Motion/GSAP transform timeline; optional WebGL only if real 3D is essential, with resource controls.

**No JS:** Overview image and detailed crop as separate images with headings and captions.
**Reduced motion:** Replace zoom with a simple cut and explicit navigation.
**Mobile:** No large auto camera moves; stack detail and overview naturally.

**Specific QA:** `motion-sickness`, `focus-visibility`, `crop-quality`, `low-power`, `resize`, `mobile-320`.

**Reject if:** Zoom adds no information or imposes rapid viewport-scale movement.
**Research IDs:** `motion-scroll`, `mdn-motion`, `gsap-scrolltrigger`.

**Status:** research-only. These are independently authored engineering prescriptions, not copied snippets from the source references.

## S15 — Radial Chronology Navigator (`radial-chronology`)

**Role:** dominant · **Complexity:** high · **Related Atlas:** chronology-state.

**Reader purpose:** Represent a cyclical or recurring documented chronology with geometric navigation.

**Trigger:** Scroll progression or explicit selection of one dated milestone.

**Canonical state:** One canonical active year/ID derived from chronology data, shared between ring and readable list.

**Visible result:** Ring markers encode actual ordered events; each event remains a semantic link and article.

**Baseline:** Semantic HTML in reading order, content complete before enhancement.
**Native-first implementation:** Progressive enhanced SVG ring with native anchor-driven linear chronology underneath.
**When advanced motion is justified:** Motion/GSAP derive rotation from the single selected ID; never replace real chronological links.

**No JS:** Complete ordered dated timeline with real titles and active links.
**Reduced motion:** Hide ring and show linear chronology, with no fake frozen radial control.
**Mobile:** Use a readable vertical index and direct anchors.

**Specific QA:** `keyboard`, `year-authenticity`, `screen-reader-order`, `reverse-scroll`, `focus-visible`, `mobile-320`.

**Reject if:** Events are simply linear and the radial structure creates worse comprehension.
**Research IDs:** `figma-scroll`, `mdn-observer`, `motion-scroll`.

**Status:** research-only. These are independently authored engineering prescriptions, not copied snippets from the source references.
