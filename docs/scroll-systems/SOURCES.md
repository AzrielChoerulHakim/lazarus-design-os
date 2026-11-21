# Research provenance and source limitations

**Reviewed:** 2026-11-21. References describe APIs, feature capabilities or *design prompts* — they do not establish user testing, measured performance, accessibility compliance or rights to source code/media.

| ID | Type | Reference |
| --- | --- | --- |
| `figma-sites-interactions` | official-doc | [Figma Sites — add interactions](https://help.figma.com/hc/en-us/articles/35895820755095-Figma-Sites-collection-Add-interactions-to-a-website) |
| `figma-sticky` | official-doc | [Figma Sites — position elements](https://help.figma.com/hc/en-us/articles/31242774629655-Position-elements-in-a-webpage) |
| `figma-scroll` | official-doc | [Figma prototype — scroll and overflow](https://help.figma.com/hc/en-us/articles/360039818734-Prototype-scroll-and-overflow-behavior) |
| `mdn-scroll` | platform-doc | [MDN — CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) |
| `mdn-snap` | platform-doc | [MDN — CSS scroll snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap) |
| `mdn-observer` | platform-doc | [MDN — Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) |
| `mdn-motion` | platform-doc | [MDN — reduced motion media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using_for_accessibility) |
| `gsap-scrolltrigger` | library-doc | [GSAP — ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| `gsap-sequence` | library-doc | [GSAP — Image Sequence Scrub](https://gsap.com/docs/v3/HelperFunctions/helpers/imageSequenceScrub/) |
| `gsap-matchmedia` | library-doc | [GSAP — matchMedia and cleanup](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/) |
| `motion-scroll` | library-doc | [Motion — useScroll](https://motion.dev/docs/react-use-scroll) |
| `motion-transform` | library-doc | [Motion — useTransform](https://motion.dev/docs/react-use-transform) |
| `motion-text` | library-doc | [Motion — text animation](https://motion.dev/docs/text-animation) |
| `superdesign-journey` | design-prompt | [Superdesign — Scroll Journey Line](https://superdesign.dev/library/scroll-journey-line) |
| `superdesign-horizontal` | design-prompt | [Superdesign — GASP, horizontal setup](https://superdesign.dev/library/gasp) |
| `superdesign-website` | design-prompt | [Superdesign — website experiment](https://superdesign.dev/library/website) |
| `superdesign-process` | design-prompt | [Superdesign — scroll-traced curve](https://superdesign.dev/library/animated-dark-landing-page-geometric-display-type-with-a-scroll-traced-data-curve-and-ember-glow) |
| `w3c-motion` | standards | [W3C — Understanding animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) |
| `w3c-pause` | standards | [W3C — Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide) |

## Interpretation rules

- **Figma:** Official help pages document site/prototype behavior, including scroll/overflow, sticky positioning, parallax and marquee. No private Figma file or layer was examined in this research; interactions in a Figma mockup are not guarantees of production behavior.
- **Superdesign:** The linked Library items are design prompts/concepts; source implementations have **not** been independently verified. Do not infer their runtime performance or copy their HTML/media.
- **MDN:** Platform documentation describes standards and browser behavior; feature-detect advanced CSS and retain a visible baseline instead of assuming uniform support.
- **GSAP and Motion:** Official library docs inform algorithm choice. Both introduce client bundle and lifecycle obligations; do not ship either without a reader-benefit reason.
- **W3C:** Animation from interactions (WCAG 2.3.3) is an AAA criterion; the requirement to provide controls for certain auto-moving content is addressed separately in WCAG 2.2.2 (A). These are not interchangeable. Always honor reduced-motion preferences in Lazarus engineering.
- **Lazarus Reference Atlas:** Preexisting historical studies such as Halfmile, Cullet, Ninth Meridian and Orbit Timeline are cross-referenced by `relatedAtlasMechanisms` to prevent double selection. The public repo contains notes, not their proprietary original assets.

Screenshots of a design are illustrative evidence, not proof of functioning scroll behavior. The `scroll-lab/` demo contains independently written working code for only the explicitly tagged implementations.
