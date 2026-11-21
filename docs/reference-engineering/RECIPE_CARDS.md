# Engineering recipe cards

These twelve original recipes abstract engineering behavior from the seven historical studies; they do not license copying code, visual identity or content. The machine-readable selection gate and definitive QA IDs are in `data/reference-mechanisms.json`.

## 01 · `evidence-state` — Foreshore

**When:** A reader toggles several sourced explanations or comparable records. **Invariant:** One canonical `selectedId` determines active control, label, narrative and any data detail. Use native buttons for state toggles or links for addressable sections. Don't spread parallel states across components. **Failure:** `aria-pressed` says A while explanation shows B, keyboard can't select, or visual states imply a scientific result the source doesn't support. **Fallback:** Static list of complete claims and citations. See `examples/synchronized-evidence/`.

## 02 · `visibility-aware-drawing` — Foreshore

**When:** A justified spatial atmosphere or simulation materially improves comprehension. **Invariant:** Keep DOM evidence above graphics, cap DPR, allocate only one animation loop, pause on visibility loss/offscreen, clean up context and listeners, handle `webglcontextlost` gracefully. Distinguish skipping draw from stopping RAF scheduling. **Failure:** Background consumes battery when hidden or an opaque canvas hides source evidence. **Fallback:** Responsive, licensed still image or lightweight SVG.

## 03 · `progressive-chapter` — Halfmile

**When:** A real process or journey genuinely benefits from scrubbing. **Invariant:** Map scroll geometry to a **clamped** progress value, then derive phase and accompanying explanation from one model. Reverse navigation must update the model symmetrically. Don't intercept the wheel or prevent normal scroll. **Failure:** Arbitrary 300–400svh stalls, copied courier motif, synthetic clocks, or short-height text clipping. **Fallback:** Ordered list of stages. `lib/scroll-progress.mjs` provides a small independent coordinator.

## 04 · `linear-recomposition` — Halfmile

**When:** A pinned/cinematic layout needs a safe reduced-motion and no-JS design. **Invariant:** The main content exists in the HTML from the start. Reduced motion restores normal flow, readable height, logical focus sequence and a complete information experience. **Failure:** Setting animation duration to zero while leaving a 400svh empty pinned container. **Fallback:** The normal document itself — it should already exist.

## 05 · `meaningful-media-reveal` — Ninth Meridian

**When:** Two states, a restoration or a meaningful scene exposure require revealing a true photograph. **Invariant:** Baseline photo and caption stand alone, masks never reduce the only access to the evidence, source and crop remain truthful, contrast works throughout. A reveal is optional editorial interpretation. **Failure:** Circular clipping for decoration, unlicensed media, or source framing copied exactly. **Fallback:** Before/after stills and descriptive captions.

## 06 · `synchronized-process-plot` — Cullet

**When:** Real source measurements justify both plot and narrative. **Invariant:** One documented dataset with units and assumptions drives `valueAt(t)`, phase, legend and readable table. Avoid unconstrained interpolation that invents precision between sparse measurements. **Failure:** Source-independent temperatures, mismatched phase/readout, inaccessible Canvas-only values. **Fallback:** Real data table or honest qualitative steps.

## 07 · `measured-display-type` — Cullet

**When:** A wide authentic name or display phrase requires optical fitting beyond fluid CSS. **Invariant:** Semantic text first, CSS wrap first, measuring only when necessary, test font readiness and fallback; do not solve overflows by shrinking meaningful text to illegibility. **Failure:** Computed fit on a font that hasn't loaded, 200% zoom clipping, or a source-shaped wordmark. **Fallback:** Natural line breaks at accessible sizes.

## 08 · `poster-first-video` — MØDE

**When:** Real footage reveals work in a way a still cannot. **Invariant:** A licensed poster appears immediately, video has appropriate semantics, user controls where required, reduced-motion and data-saver paths, and factual transcript/captions. **Failure:** Autoplay is the only way to understand the case, source clip becomes proof of a client's accomplishment, playback failure produces emptiness. **Fallback:** Poster + explanatory text + a usable link.

## 09 · `reversible-dialog` — MØDE

**When:** An in-place detail genuinely reduces context switching. **Invariant:** Prefer native `<dialog>`, manage the initiating focus and return, support Escape, touch and dismissal, keep landmarks/reading order usable. **Failure:** A fake glass panel with trapped keyboard focus, or lost return point after close. **Fallback:** Direct details page or inline disclosure.

## 10 · `dom-measured-plot` — Pencil Sketch Loader

**When:** Showing an actual transition from plan/blueprint to real artifact helps demonstrate the making process. **Invariant:** Measure **real rendered DOM** after layout and fonts; align SVG to annotated targets; observe resize and teardown. Animation cannot block controls. **Failure:** Drawing generic frame strokes unrelated to element bounds, reflow drift after font changes, compulsory waiting. **Fallback:** Finished artifact + optional static sketch diagram.

## 11 · `interruptible-phase-machine` — Pencil Sketch Loader

**When:** A multi-stage reveal is an optional explanation of process. **Invariant:** Name states, permitted transitions, cancellation/skip and guaranteed `done`; clean timers and effects. Content must already be available and keyboard accessible. **Failure:** A showpiece loader delays a ready page or cannot be interrupted. **Fallback:** Immediate final content.

## 12 · `chronology-state` — Orbit Timeline

**When:** A sourced chronology benefits from more than one view. **Invariant:** One sorted record array drives date, title, navigation and selected details. Direct selection and scroll map to the same active index. All years and names need real citations. **Failure:** A decorative wheel obscures simple history or changes selection without changing descriptions. **Fallback:** Normal linked ordered chronology; no circular presentation required.

## Composition rules

- Prefer **one mechanism**. Two are allowed only when their state ownership, data and fallback are explicitly compatible.
- Never use a source mechanism merely to make a generic layout look less generic. **Repair information architecture first.**
- If only a small graphic is needed, implement the smallest explanatory SVG/CSS approach instead of a Canvas/WebGL render loop.
- When a study's signature is recognizable, strip it and compare the resulting page against actual client evidence. Change the structure, not just the skin.
