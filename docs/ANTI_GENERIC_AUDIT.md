# Anti-AI-Generic Audit

**Goal:** judge distinctiveness and usefulness, not detect AI authorship. A project can use familiar patterns appropriately; novelty without usability does not pass.

## Mandatory evidence to inspect
- Final screenshots at 320, 390, 768, 1024 and 1440 CSS px, plus short viewport.
- Actual project content and client source mapping.
- Navigation, keyboard, touch, focus, escape, text zoom 200%, reduced motion.
- Side-by-side comparison of all seven structurally different concept directions, plus recent Lazarus client work (when available).

## Seven dimensions: editorial rubric
Give each a descriptive assessment (**strong / needs work / critical**) and cite an observed element. The assessment is qualitative, not a scientifically calibrated score.

| Dimension | Strong evidence | Critical failure |
|---|---|---|
| Identity specificity | Layout and language follow verified personal work | Swap the name and the site fits anyone |
| Information architecture | Page anatomy follows audience tasks | Universal hero → cards → CTA regardless of content |
| Typography | Chosen for identity, legible, responsive wrapping | Default pair with cramped text or arbitrary caps |
| Asset authorship | Meaningful, licensed real imagery / documents | Fake credentials, stock cliché, copied artwork |
| Interaction purpose | Feedback or meaningful narrative; interruptible | Decorative fades everywhere; scroll blocked |
| Cohesion | Typographic/image/motion system connected | Attractive fragments that don't make a whole |
| Usability/craft | Tested devices, keyboard, zoom, motion | Layout overlap, clipped text, dead actions |

## Four adversarial tests
1. **Identity Swap:** hide name, logo and portrait. Is the profession *and the individual work* still present in the experience?
2. **Skeleton:** strip colors, fonts, effects and images. Does information flow differ meaningfully from recent projects?
3. **Rationale:** for each dominant decision, write `choice → client evidence → user benefit → tradeoff`. If unsupported, revise.
4. **Blind Perception:** show screenshots and working pages to independent people, ask why something feels original/generic; collect reasons, not only ratings.

## Non-negotiable ship blockers
Fabricated client claims; inaccessible essential controls; broken responsive layout; missing focus where keyboard action is expected; broken core navigation; missing source rights for assets; content removed merely to keep a pretty screenshot.

## Corrective order
First change **concept / structure**, then image and content treatment, typography, interaction grammar; polish colors, borders and details last. Recoloring alone never resolves a structural sameness problem.

## Delivery record
Copy [the review template](../templates/REVIEW_REPORT.md). Every claimed check must include a device/viewport, observed result and status. If a browser was not available, mark visual QA **not verified**, never “passed.”
