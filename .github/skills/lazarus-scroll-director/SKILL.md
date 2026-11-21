---
name: lazarus-scroll-director
description: Design, select, implement and audit 15 intentional scrolling systems for Lazarus Design OS. Use when a client site needs scroll-linked navigation, scrollytelling, horizontal editorial progression, SVG journeys, media reveals, process/data scrubbing, or accessible scroll fallbacks. Choose by verified reader task, not visual trend; use the scroll registry and decision/release gates.
---

# Lazarus Scroll Director — scroll must serve the story

**This is an original project-local agent skill, separate from `lazarus-reference-atlas`.** It supplements rather than replaces `AGENTS.md`, `DESIGN.md`, `docs/WORKFLOW.md`, `lazarus-type-director`, and mobile/voice/anti-generic QA. Nothing here authorizes copying a referenced site's appearance, code or media.

## When to invoke

Use when a client project asks for unusual scrolling, scroll-driven narratives, parallax, sticky chapters, horizontal scrolling, scroll-linked image transformation, timelines or visual motion research. If the brief is principally textual, **the correct decision may be zero scroll systems**.

Read, in order:
1. The client's verified documents, real media, reader tasks and existing implementation.
2. `AGENTS.md`, `DESIGN.md`, `docs/WORKFLOW.md` and the project `design-contract.json`.
3. `docs/SCROLL_SYSTEMS.md` and `data/scroll-systems.json` (15 mechanics, evidence/rejection gates, source attribution and specific fallback).
4. `docs/scroll-systems/IMPLEMENTATION_RECIPES.md`, `docs/scroll-systems/QA_MATRIX.md`, and `docs/scroll-systems/ADOPTION.md`.
5. If a pattern overlaps one of the seven existing studies, consult `docs/REFERENCE_ENGINEERING.md` and the matching original **notes only**. Original reference code/assets may not be redistributed.

## Selection protocol — mandatory for meaningful scroll changes

1. Define the **reader job** in one sentence: what should scroll help someone understand, find, compare or remember? Identify real evidence IDs. Do not substitute artificial numeric signals for missing client data.
2. Inventory the proposed sections *in ordinary DOM order*. Decide which content is actually helped by scroll. Design the full **no-JavaScript document** first.
3. `node scripts/scroll-director.mjs catalog` to inspect all patterns; `recommend --jobs <tag,...> --evidence <tag,...>` to shortlist. Recommendation is a tag matcher, **not creative judgment, rank or automatic selection**.
4. Choose **zero or one dominant scroll system**. Add up to one supporting mechanism only if it solves a *different* reader job. Two support systems without a dominant one are possible but need explicit restraint. Total high-salience mechanisms across this skill and `lazarus-reference-atlas` **must remain at most two per client project**; don't count a concept twice across both plan files.
5. Reject at least one superficially plausible alternative, naming the *specific* UX/data reason. Provide a nonanimated composition with equal content value before committing to animation.
6. Record the client plan via `node scripts/scroll-director.mjs init /path/to/client/scroll-plan.json`, fill verified source IDs, intended state, platform, anti-imitation exclusions and each fallback; run `check --stage decision` before the effects are coded. Where an Atlas plan exists, pass `--reference-plan /path/to/reference-engineering-plan.json` to check the combined mechanism budget.

## Engineering requirements

- **Input and state:** Distinguish scroll-triggered (discrete on entry) from scroll-linked (continuous progress). Choose one canonical normalized progress or section ID. Derive all visible readouts and states from it; preserve state while scrolling upward. Geometry must be recomputed after images, fonts and responsive changes. Never call layout measurement separately for every animated property.
- **Progressive enhancement:** Semantic DOM/anchors/real data stay complete with JS disabled. Visual scenes are enhancements, never the only way to access content. Avoid invisible paragraphs, deliberately delayed loaders, or mandatory cinematic introductions.
- **Technology choice:** Start with native CSS sticky, overflow, scroll snap, `IntersectionObserver`, or feature-detected CSS `animation-timeline`. Use Motion for React stateful mapping. Use GSAP ScrollTrigger only for justified advanced pin/scrub timelines. Add Canvas/WebGL only if a real visual task merits the asset/rendering cost. A library is not itself a design rationale.
- **Accessibility:** Maintain focus/fragment navigation and document order. Keep essential words readable at all scroll states. Support keyboard and touch; a native scroll must never be hijacked. Include a correct `prefers-reduced-motion` presentation: **remove pinning/forced traversal if it causes inflated empty sections**, not merely set transition-duration to zero. Scroll-snap must not trap large content.
- **Motion lifecycle:** Avoid perpetual work offscreen. Use passive listeners with `requestAnimationFrame` coalescing for JS geometry or `IntersectionObserver` for discrete state. Tear down observers, matchMedia contexts and animation timelines on unmount/reflow. No arbitrary `400vh` sections, fake physics or excessive `will-change` layers.
- **Performance:** Document media licensing, image/video weights, DPR cap and fallback. Avoid animating layout dimensions; prefer compositor-friendly transforms on decorative layers. Verify actual behavior on lower-powered devices, rather than claiming all JS animation is GPU accelerated.
- **Art direction:** The scroll grammar must be **client-specific**. Keep typography from Type Director, language from Voice Director, mobile composition from Mobile Integrity. Do not automatically transfer Superdesign, Figma or source demo visuals.

## 15-system taxonomy

| Family | Patterns |
| --- | --- |
| Navigation | `reading-progress-rail`, `chapter-index-sync`, `native-snap-strip` |
| Narrative | `sticky-evidence-exchange`, `data-linked-scrub`, `svg-journey-trace` |
| Editorial | `horizontal-editorial-gallery`, `layered-card-stack`, `depth-parallax-theatre` |
| Transformation | `aperture-mask-reveal`, `before-after-wipe`, `object-sequence-scrub` |
| Experimental | `typographic-disclosure`, `spatial-zoom-transit`, `radial-chronology` |

Read the registry entry, not just the label. Some have strict evidence/asset prerequisites. Catalog entries tagged `research-only` are **mechanism specifications**, not claimed tested browser components. The native Snap, Sticky Evidence, and supporting Progress Rail are showcased in the independently authored `scroll-lab/` demonstration; it is not a production client theme.

## Release gate

Test rendered desktop and **each real section** at 320/390 CSS px, full page at 640/768/1024/1440, short heights and landscape, 200% text resize, keyboard tab sequence, pointer/touch, reverse scroll, navigation by URL anchor and Browser Back, no JS, reduced motion, refresh in the middle of the narrative and resource failures. Where relevant test actual chart values, snapshot authenticity, image alignment, memory/performance, and scene cleanup.

Record screenshot/test evidence and the inspected source SHA in `scroll-plan.json`. Run:

```sh
node scripts/scroll-director.mjs check /path/to/client/scroll-plan.json \
  --stage release --root /path/to/client \
  --reference-plan /path/to/client/reference-engineering-plan.json
```

If no Reference Engineering plan exists, omit `--reference-plan` and **manually** inspect the combined two-pattern budget. `docs/scroll-systems/QA_MATRIX.md` defines mandatory and conditional checks. A `pass` status is allowed only when an actual observed nonempty evidence file exists inside the client root. Untested = not approved. The validator checks documentary completeness, **not performance, WCAG conformity, actual originality or user value**.

## Required deliverables

`scroll-plan.json`, selected system rationale and reader-job benefit, original implementation, complete static/mobile/reduced-motion fallbacks, rejected alternatives, tested screenshot paths + SHA, and explicit outstanding risks. If the scroll experience adds spectacle but makes the underlying website less understandable, remove it.
