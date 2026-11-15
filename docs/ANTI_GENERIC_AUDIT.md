# Anti-AI-Generic Audit

**Goal:** judge distinctiveness and usefulness, not detect AI authorship. A project can use familiar patterns appropriately; novelty without usability does not pass.

## Mandatory evidence to inspect
- Final screenshots at 320, 390, **640**, 768, 1024 and 1440 CSS px, plus short viewport; align each screenshot to the exact reviewed commit.
- Actual project content and client source mapping.
- Navigation, keyboard, touch, focus, escape, text zoom 200%, reduced motion.
- Side-by-side comparison of all seven structurally different concept directions, plus recent Lazarus client work (when available).
- Completed **[TYPE_SPEC](../templates/TYPE_SPEC.md)** with three grayscale, same-copy type specimens for the selected direction, verified font rights and fallbacks.
- Evidence from **[Typography QA](TYPOGRAPHY_QA.md)**: 200% text resize, 320px-equivalent reflow, text-spacing override, measured contrast, language/longest-title behavior and font-blocked mode.

## Seven dimensions: editorial rubric
Give each a descriptive assessment (**strong / needs work / critical**) and cite an observed element. The assessment is qualitative, not a scientifically calibrated score.

| Dimension | Strong evidence | Critical failure |
|---|---|---|
| Identity specificity | Layout and language follow verified personal work | Swap the name and the site fits anyone |
| Information architecture | Page anatomy follows audience tasks | Universal hero → cards → CTA regardless of content |
| Typography | Same-copy specimen comparison; content-driven type roles; verified font rights, measure, optical spacing, responsive/zoom/fallback QA | Big serif + micro-mono preset; cramped labels, missing glyphs, contrast failure, content clipping |
| Asset authorship | Meaningful, licensed real imagery / documents | Fake credentials, stock cliché, copied artwork |
| Interaction purpose | Feedback or meaningful narrative; interruptible | Decorative fades everywhere; scroll blocked |
| Cohesion | Typographic/image/motion system connected | Attractive fragments that don't make a whole |
| Usability/craft | Tested devices, keyboard, zoom, motion | Layout overlap, clipped text, dead actions |

## Four adversarial tests
1. **Identity Swap:** hide name, logo and portrait. Is the profession *and the individual work* still present in the experience?
2. **Skeleton:** strip colors, fonts, effects and images. Does information flow differ meaningfully from recent projects?
3. **Rationale:** for each dominant decision, write `choice → client evidence → user benefit → tradeoff`. If unsupported, revise.
4. **Blind Perception:** show screenshots and working pages to independent people, ask why something feels original/generic; collect reasons, not only ratings.

## Typography adversarial tests
- **Font removal:** turn off custom fonts and brand colors; does the hierarchy still communicate the client's authentic work?
- **Content stress:** replace short samples with the longest true client names, headings, dates and paragraphs; can they still be read without ellipsis or tiny text?
- **Type-copy:** compare across recent projects; are the same massive display, all-caps micro-labels and negative tracking reused without a functional reason?
- **Zoom override:** inspect 200% enlargement, 320px equivalent reflow, line-height 1.5, paragraph margin 2em, letter spacing 0.12em and word spacing 0.16em. The override is a *robustness test*, not required default styling.

## Non-negotiable ship blockers
Fabricated client claims; inaccessible essential controls; broken responsive layout; missing focus where keyboard action is expected; broken core navigation; missing source rights for assets/fonts; content removed merely to keep a pretty screenshot; **essential type below applicable contrast, cropped at 200% resize, unreadable navigation or forced horizontal prose reading at 320px equivalent reflow**.

## Corrective order
First change **concept / structure**, then the verified text/content treatment and **typographic reading grammar**, then imagery/interaction, and colors/borders/details last. Replacing one font family or shrinking text cannot rescue a weak information architecture. Recoloring alone never resolves a structural sameness problem.

## Delivery record
Copy [the review template](../templates/REVIEW_REPORT.md). Every claimed check must include a device/viewport, observed result and status. If a browser was not available, mark visual QA **not verified**, never “passed.”
