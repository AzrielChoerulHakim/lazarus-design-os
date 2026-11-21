# Lazarus Scroll Director — 15-system research and engineering library

**Research and documentation reviewed:** 21 November 2026.  **Status:** original design/engineering proposals informed by cited platform docs, Figma Sites feature descriptions, GSAP/Motion documentation and selected Superdesign *design prompts*; **not** claims of having browser-tested 15 third-party implementations. Figma account connectivity does not imply inspection of a private Figma file. Public sources are linked in `data/scroll-systems.json` and `docs/scroll-systems/SOURCES.md`.

## Position in Design OS

The Scroll Director is an *interaction language selector*, not a visual style library or a list of effects to stack. Its job is to decide whether a reader's task deserves a particular scroll interaction, how that interaction can function independently from the cited inspiration, and how to remove the effect without losing meaning.

**One client site ≠ fifteen scroll systems.** At most one dominant plus one supporting pattern are recommended; count high-salience Reference Engineering mechanisms in the same two-pattern project budget. No technique is mandatory. Native scrolling, ordinary content and meaningful anchors are the default.

## Taxonomy: fifteen distinctly motivated systems

| ID | System | Category / role | What it actually solves | When to reject |
| --- | --- | --- | --- | --- |
| S01 | Reading Progress Rail | Navigation / support | Where am I in a long article? | Short pages, decorative meters |
| S02 | Scroll-Synced Chapter Index | Navigation / support | Which named chapter am I reading, and how do I jump? | Too few chapters, overlay crowding |
| S03 | Native Snap Chapter Strip | Navigation / support | How can I browse a finite sequence directly? | Trapped prose, invisible offscreen panels |
| S04 | Sticky Evidence Exchange | Narrative / dominant | How does the same evidence relate to consecutive findings? | No real evidence or sticky area blocks reading |
| S05 | Data-Linked Scrollytelling | Narrative / dominant | How do sourced values change alongside their explanation? | Invented measurements / interpolation |
| S06 | SVG Journey Trace | Narrative / dominant | How do actual stages connect through time or process? | Connection resembles fictitious geographic tracking |
| S07 | Horizontal Editorial Gallery | Editorial / dominant | How do real works relate as one panoramic sequence? | Keyboard, anchor or focus leaves media unreachable |
| S08 | Layered Card Stack | Editorial / dominant | How do related chapters accumulate? | Covered interactive controls and excessive overlap |
| S09 | Depth Parallax Theatre | Editorial / dominant | How do genuine layers relate spatially? | Atmosphere without informative depth |
| S10 | Aperture & Mask Reveal | Transformation / dominant | What is newly revealed within authentic media? | Image has no evidential relationship to the reveal |
| S11 | Before–After Split Reveal | Transformation / dominant | How do two directly comparable authentic states differ? | Misaligned/unauthorized assets or misleading claims |
| S12 | Object Sequence Scrub | Transformation / dominant | What happened between sourced stages of making? | Missing frames, unaffordable media, fictitious progress |
| S13 | Typographic Disclosure | Experimental / dominant | How can a short verified statement be read in stages? | Text hidden or unreadable until animated |
| S14 | Spatial Zoom Transit | Experimental / dominant | How does a real overview relate to an important detail? | Unnecessary camera moves or motion sickness |
| S15 | Radial Chronology Navigator | Experimental / dominant | Does cyclical chronology become more understandable geometrically? | Simple linear chronology becomes harder to follow |

### Important non-equivalences

- **Scroll-triggered ≠ scroll-linked.** Enter/exit events are discrete; scroll progress timelines map the animation continuously to position. Do not use a continuous scrub for an operation needing just chapter activation.
- **Native horizontal overflow ≠ vertical-to-horizontal pinning.** The first respects direct user pan and DOM focus more naturally; the second requires geometry and focus/anchor recovery.
- **Sticky CSS ≠ GSAP pin.** Sticky is bounded by containing block and often best for static sections. JS pin changes layout, spacer and cleanup requirements. Use the simplest mechanism that serves the reader.
- **Figma Sites parallax ≠ every depth transform.** Figma documentation includes scroll behavior and distinct cursor parallax; the registry does not infer source code from a prototype description. No source screenshot is evidence of runtime fluidity.
- **Superdesign library entries are mostly design prompts.** They inform a mechanical idea, not a proven accessible implementation or a source-code license. Our demo and source files are independent original work.

## Implementation strategy

1. **Document-first.** Write client-accurate headings, paragraphs, media descriptions and links in semantic order. No effect yet.
2. **Purpose and budget.** For each proposed scroll mechanism, state the unique reader question it answers, essential evidence, source reference and at least one rejection condition. Prefer none if it adds no meaning.
3. **Static composition.** Design the complete page in normal flow at desktop and 320px. The static version is not an afterthought.
4. **Scroll model.** Identify root/container, event boundaries, normalized progress, derived active stage, resize invalidation and behavior when scrolling backward. A single canonical source owns all synchronized values.
5. **Enhance progressively.** Try CSS sticky/scroll snap/feature-detected `animation-timeline`, then `IntersectionObserver`; only then Motion/GSAP/Canvas/WebGL if justified by the requested result.
6. **Own mobile.** Narrow and short viewports usually favor vertical normal flow, small direct galleries, linear timeline and static media. Don't shrink pinned desktop stages into a two-inch viewport.
7. **Prove behavior.** Record evidence at 320/390/640/768/1024/1440, short height, reduced motion, keyboard/touch, with JS disabled, reverse scroll and browser history. Run the scroll-plan release validator plus existing Lazarus design/typography/mobile gates.

## Originality and visual identity

Scrolling technique is a **grammar**. An editorial archive can use S02 with asymmetrical annotations and a sober type hierarchy. An illustrated fable can use S09 with cut-paper scenes. A Noir chronology might use S06 with ink-like connections. None of those implies copying a Superdesign color palette, Figma component, brand layout or client artifact. If the final result still has the same hero → cards → CTA skeleton as every recent build, scroll effects did not solve the problem.

## Engineering references

Use [`docs/scroll-systems/IMPLEMENTATION_RECIPES.md`](scroll-systems/IMPLEMENTATION_RECIPES.md) for pattern-by-pattern invariants and code pathways, [`QA_MATRIX.md`](scroll-systems/QA_MATRIX.md) for acceptance tests, and [`ADOPTION.md`](scroll-systems/ADOPTION.md) for CLI/plan syntax. Sources and evidence quality are documented in [`SOURCES.md`](scroll-systems/SOURCES.md).
