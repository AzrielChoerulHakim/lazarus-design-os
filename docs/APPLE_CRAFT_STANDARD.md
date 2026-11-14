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

## Typography review
- Have fonts been chosen for identity and legibility rather than resemblance?
- Do headlines wrap gracefully on small screens?
- Are letter-spacing and line-height correct at each scale?
- Are long-form reading widths appropriate?
- Do the language and diacritics render correctly?

## Licensing
**Do not ship Apple's San Francisco / New York font files or Apple product imagery as website assets without the appropriate license.** A CSS system-font stack uses installed platform fonts without distributing them, but still isn't a reason to impose that typography on every client.

## Primary resources
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines/
- Apple design resources: https://developer.apple.com/design/resources/
- Web animation adaptation (community skill): https://github.com/emilkowalski/skills/tree/main/skills/apple-design
- Apple-inspired web design corpus (community): https://github.com/KanishkRanjan/apple-design-skill
