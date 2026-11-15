# Apple craft — an adoption guide for original websites

**Interpretation:** Apple-level *craft* is transferable. Apple branding and Apple's particular visual syntax are not the Lazarus design direction. Apple HIG governs Apple-platform experiences; Apple.com marketing pages are a different design surface.

## Principles to adapt
1. **Purpose first** — decide the single most important fact/action for each screen. If it doesn't serve the user, remove or subordinate it.
2. **Strong content hierarchy** — typography, grouping and contrast reflect information priority; white space is functional.
3. **Continuity and feedback** — input should feel immediate; state transitions communicate what changed. For drag/swipe, prefer responsive, interruptible motion over canned sequences.
4. **Consistent craft** — optical alignment, purposeful spacing and line breaks, image treatment, micro-interactions, coherent focus states.
5. **Respect user agency** — predictable navigation, non-blocking animation, easy exit/undo, keyboard and touch support.
6. **Accessibility by design** — focus indicators, text resizing/reflow, contrast, reduced motion, clear labels, semantic controls.
7. **Responsive reality** — review actual widths/heights; an attractive 1440px image is not evidence of mobile readiness.
8. **Delight with restraint** — one meaningful moment can be more distinctive than constant animation.

## Distinguish contexts
| Surface | Transfer carefully | Do not copy by default |
|---|---|---|
| Native Apple app | HIG conventions, native affordances, materials | Native controls reproduced as web divs |
| Web application | Clarity, interaction feedback, hierarchy | iOS navigation patterns when web conventions fit better |
| Marketing / portfolio site | Evidence-led storytelling, art-directed media, measured rhythm | Apple product page skeleton, giant product render + blue CTA |

## Motion engineering review
- Does the element respond at the instant of a valid interaction?
- Is the physical motion interruptible and continuously connected to pointer state?
- Can a user reverse direction without a jump?
- Is a reduced-motion alternative legible and complete?
- Is the animation meaningful for this *client*? If not, remove it.

## Typography review — required type direction, not an afterthought
Follow **[Lazarus Typography Direction System](TYPOGRAPHY_SYSTEM.md)** and **[Typography QA](TYPOGRAPHY_QA.md)**. Apple's design system uses typographic **text styles**, optical treatments and scaling to produce hierarchy. The transferable lesson is deliberate roles and adaptive composition; Apple system typefaces and their point-size values are **not** default CSS tokens.
- Has the client-specific reading task been documented before selecting a font?
- Did we compare three grayscale, same-copy type specimens for the selected design concept?
- Are heading, reading body, evidence/caption, navigation and numerical text roles justified?
- Have measure, weight, tracking, leading, optical alignment, and punctuation been inspected in real browser rendering?
- Do long names and headings wrap without awkward forced breaks at 320px and under enlargement?
- Are body text, dates, captions and labels readable without microscopic all-caps?
- Are language glyphs, diacritics, numeric alignment, genuine italics, font licensing and fallback confirmed?
- Do we have observed evidence of 200% text resize, 320px reflow, WCAG spacing override and appropriate text contrast?
- Did we identify anything that looks like the **same typography preset** across unrelated clients? If so, revisit content structure first.

## Separate Apple-platform tips from web requirements
Apple's [UI design tips](https://developer.apple.com/design/tips/) discuss 11-point text and 44-point hit targets in Apple interfaces. **Those are platform points, not web CSS pixels.** Web delivery must be tested against W3C WCAG 2.2 for contrast, text resize, reflow and spacing override. Project starting sizes (such as 16–18 CSS px for body text) are design heuristics, not Apple mandates. See [Apple fonts](https://developer.apple.com/fonts/), [WCAG contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), [resize](https://www.w3.org/WAI/WCAG22/Understanding/resize-text), [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow), [text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing).

## Licensing
**Do not ship Apple's San Francisco / New York font files or Apple product imagery as website assets without the appropriate license.** A CSS system-font stack uses installed platform fonts without distributing them, but still isn't a reason to impose that typography on every client.

## Primary resources
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines/
- Apple design resources: https://developer.apple.com/design/resources/
- Apple Typography: https://developer.apple.com/design/human-interface-guidelines/typography
- Apple Fonts: https://developer.apple.com/fonts/
- Web animation adaptation (community skill): https://github.com/emilkowalski/skills/tree/main/skills/apple-design
- Apple-inspired web design corpus (community): https://github.com/KanishkRanjan/apple-design-skill
