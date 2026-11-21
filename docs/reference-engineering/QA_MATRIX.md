# Reference Engineering verification matrix

This is a **complement**, not a replacement, for `docs/TYPOGRAPHY_QA.md`, `docs/MOBILE_VISUAL_INTEGRITY.md`, `docs/ANTI_GENERIC_AUDIT.md` and the primary Design OS `release` gate.

## Mandatory universal release checks

| ID | Prove by observation | Representative evidence |
| --- | --- | --- |
| `data-authenticity` | Every visible claim, number, date, media description and unit comes from a disclosed source; illustrative content is labelled | Claim-to-source audit notes |
| `source-rights` | No unauthorized video/image/font/source reproduction from the historical studies | Asset manifest, source provenance and permission notes |
| `non-imitation` | No study's recognizable composition, hero treatment, colors, typography, imagery or full effect sequence carried over | Side-by-side structured critique with screenshots |
| `keyboard` | Every interactive control is reachable/operable, focus doesn't disappear, and content is not blocked | Keyboard walkthrough notes and captures |
| `reduced-motion` | All content remains comprehensible without major animation; pinned layouts become normal flow where needed | Reduced-motion screenshot/video/notes |
| `no-js-content` | Essential facts, navigation and evidence remain accessible with JavaScript unavailable | No-script browser capture |
| `mobile-320` | Every real client section is inspected at 320 CSS px (not only the hero) | Section screenshot index + notes |
| `mobile-390` | Every real client section is inspected at 390 CSS px | Section screenshot index + notes |
| `short-height` | No clipping/trapping at landscape or small viewport height ≤500 CSS px | Screenshot and interaction notes |

Universal evidence in the companion plan must be a **nonempty file path inside the client root**, with notes describing what was seen; the validator checks existence and containment, not truth. QA marked `not-tested` blocks the companion release check. Do not fabricate a passing screenshot for a check that could not be performed.

## Additional checks by mechanism

| Mechanism | Focus checks | Failure signature |
| --- | --- | --- |
| `evidence-state` | `state-sync`, `focus` | Active label and body disagree |
| `visibility-aware-drawing` | `visibility-pause`, `context-loss`, `low-power`, `resource-failure` | RAF work persists while idle, no fallback |
| `progressive-chapter` | `reverse-scroll`, `touch`, `state-sync` | Phase only updates in forward direction |
| `linear-recomposition` | `reading-order` | Reduced motion leaves the reader trapped in a fixed scroll stage |
| `meaningful-media-reveal` | `resource-failure`, `contrast`, `mobile-crop` | Image meaning or captions vanish when animation/assets fail |
| `synchronized-process-plot` | `state-sync`, `screen-reader-summary`, `reverse-scroll` | Plot and data labels disagree |
| `measured-display-type` | `font-fallback`, `text-resize-200`, `reflow-320`, `long-content` | Real title clips when fonts/zoom change |
| `poster-first-video` | `video-failure`, `asset-rights` | Blank hero without playback; unauthorized media |
| `reversible-dialog` | `escape-close`, `focus-return`, `touch` | Focus remains behind overlay or is lost on close |
| `dom-measured-plot` | `resize`, `font-fallback`, `cleanup`, `focus` | SVG layer drifts from its actual DOM target |
| `interruptible-phase-machine` | `cleanup`, `interruption` | Content remains gated after cancel/skip |
| `chronology-state` | `chronology-order`, `state-sync` | Circular navigation and text show different dates |

## Performance/lifecycle review

For Canvas/WebGL/scroll mechanisms: capture supported browser and GPU limitations; test background/foreground transition, offscreen state, resize, high-DPR memory and teardown. Avoid numerical FPS promises without measured devices. Check that an observer pauses actual work, not just the visible draw. Scroll controls must be passive/coalesced and never hide semantic source content.

## Accessibility and usability review

Test navigation with keyboard alone, focus/active/disabled contrasts, touch target size, direct-link behavior, 200% text enlargement, 320px-equivalent reflow, long authentic Indonesian words, missing fonts, text-spacing override, reduced motion and screen-reader semantics as relevant. These are observable tests, not automatic certificates. Include Firefox/Safari/real devices when possible; if unavailable, mark the limit **NOT TESTED** in the human report.

## Release conclusion categories

- **Companion record complete:** documentary fields, recognized mechanisms, evidence IDs and declared artifacts satisfy machine guards.
- **Browser/interaction evidence inspected:** reviewer actually saw required states and recorded findings tied to the tested SHA.
- **Design accepted:** independent/art-direction review confirms the site is meaningfully tied to the client, with no source imitation and no critical failures.

These three conclusions must never be conflated.
