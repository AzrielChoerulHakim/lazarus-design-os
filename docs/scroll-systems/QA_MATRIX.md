# Scroll Director · Practical acceptance matrix

**Warning:** An automated registry/plan pass is only evidence-record validation. It does not certify visual quality, accessibility, real-world performance or safe source licensing. Every item below needs an actual observed browser result, not a promise or guessed result.

## Universal release checks (all scroll plans, including plans with no effects)

| QA ID | What to inspect | Failure condition |
| --- | --- | --- |
| `no-js-content` | Disable scripting; view all content/links/assets in normal document order | Evidence or CTA depends on a scroll callback |
| `reduced-motion` | Emulate `prefers-reduced-motion: reduce`; inspect actual layout | Giant empty pinned stages, frozen masks, hidden text |
| `mobile-320` | Screenshot **every section** at 320 CSS px | Overflow/clipped copy, overlapping graphics, focus loss |
| `mobile-390` | Repeat at 390 CSS px; both portrait/short-height as relevant | Different mobile collision not observed at 320 |
| `short-height` | 320×568, 390×667 and landscape/short laptop | Sticky scene taller than scrollport or unreachable controls |
| `keyboard` | Tab/Shift+Tab, Enter, Space, arrows if the widget defines them | Offscreen focus / can't leave scroll-scene |
| `reverse-scroll` | Slow/fast backward travel; revisit stages | Wrong active chapter / media readout / first or final state |
| `touch` | Test touch swipe/scroll and interact with buttons | Pointer-only activation or gesture capture |
| `scroll-escape` | Scroll through and past each effect with wheel, keyboard and touch | Locked wheel, snap trap, no exit path |
| `semantic-reading-order` | Inspect DOM order and assistive technology reading path | Visual reordering changes story meaning |
| `performance` | Record environment, responsiveness, memory/network behavior | Jank, endless offscreen RAF, massive frame payload |
| `source-rights` | Check exact assets/media/licenses and claims | Unverified source, borrowed media, falsified data |

## Conditional checks

Read the `qa` array of **each** selected registry system. E.g.:
- S02: fragment link, deep link, hash change, Browser Back, header offset and active `aria-current`.
- S03: oversize item, snap escape, keyboard focus on offscreen content and drag/touch.
- S04: reverse scene activation, viewport short-height, focus and mobile recomposition.
- S05: source values/units, static table and synchronization after moving backward.
- S06: measured SVG path length, chronology dates, mobile resizing and reverse drawing.
- S07: horizontal travel distance after asset/font load, keyboard focus recovery, resizing, mobile unpin.
- S09/S14: reduced motion, vestibular discomfort, decorative containment and text contrast.
- S10/S11: full-image fallback, authentic image pairing, captions, cropping and keyboard-operated direct comparison.
- S12: missed or unavailable frames, context loss, limited cache, preload timeout and non-animated stage storyboard.
- S13: every progress state must retain legible text, screen-reader paragraph and 200% enlargement.
- S15: linear alternative's complete chronological order and working anchor links.

## Viewports / failure matrix

- Minimum full-page captures: **320, 390, 640, 768, 1024, 1440 CSS px**. For 320 and 390 capture section-level screenshots and record focus/collision notes.
- Short-height and landscape separate; a width-only responsive QA is insufficient for sticky stages.
- Simulate 200% text increase, text-spacing override, font fallback, missing assets, JS-disabled, reduced-motion, low-power mobile and navigation initiated by anchors/back button.
- Record actual screenshot/video/test-log paths and the source commit SHA reviewed. If a test was not performed, record `not-tested` and **do not mark release complete**.

## Scroll effects that must stop release

Forced scroll-jacking, inaccessible hidden sections, essential content gated by JS or animation, snap trapping the viewport, borrowed visual assets without rights, fabricated metrics/timestamps, undisclosed reduced-motion failures, and mobile focus/copy collision.
