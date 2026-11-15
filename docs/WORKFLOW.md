# Client website production workflow

## 0 — Intake / evidence
Read CV, authentic photos, work samples, client's audience, client goals and existing site. Build a fact ledger separating **verified / ambiguous / absent** details. Do not hallucinate missing work.

## 1 — Diagnose the story
Write the identity thesis: `This website takes the form of ____ because the client uniquely ____ and their audience needs ____.` Define the one main job of the homepage, necessary secondary tasks and content density.

## 2 — Diverge before decorating
Explore **seven genuinely different concept directions** based on the client's evidence and audience. For each: a distinct information architecture, rough layout, typography strategy, image strategy, main interaction and major tradeoff. These are seven developed concept proposals (text/wireframes), **not seven production implementations** and **not a mandatory 1:1 mapping to the seven Reference Atlas studies**. Avoid superficial color-only variations. Compare all seven, choose one for implementation with reasons, and document why alternatives were rejected.

## 2.5 — Typography before UI code (mandatory)
Read [Typography Direction System](TYPOGRAPHY_SYSTEM.md) and use the internal `lazarus-type-director` skill if available. Write a **typographic thesis for every one of the seven directions**: role hierarchy, reading mode, actual-copy arrangement and failure mode. For the selected direction, make **three monochrome typography-only specimens using the same real content**, compare their scan paths, long-name behavior and legibility. Complete [TYPE_SPEC](../templates/TYPE_SPEC.md), including font licenses, optical/number features, language coverage, fallback and responsive behavior. Choose based on audience task — do not start by selecting a font pair, Apple UI kit or display size. **No full UI implementation until this gate is completed.**

## 3 — Reference only when needed
Read [Reference Atlas](REFERENCE_ATLAS.md) for relevant mechanisms. Read the appropriate note and the original source only **if available and authorized**. Record mechanism, transformation and protected visual carryovers to avoid.

## 4 — Design system and implementation
Specify tokens suitable for that client, not Apple/Anthropic/Lazarus defaults. Typography tokens must implement approved **semantic text roles**, not decorative pixel classes; scale/reflow after testing actual names, job titles, dense paragraphs and data. Implement semantic structure and truthful content first; responsive CSS and usable navigation second; a small number of meaningful interactions third. Animations must honor reduced-motion. All actions functional.

## 5 — Critique rendered output
Use [Anti-Generic Audit](ANTI_GENERIC_AUDIT.md). Compare to rejected alternatives and recent sites. Inspect screen heights, 320/390/640/768/1024/1440 CSS px, focus, motion and network failure scenarios. **Separately execute [Typography QA](TYPOGRAPHY_QA.md)**: 200% resize, 320px-equivalent reflow, WCAG text-spacing override, contrast per state, actual content, missing-font fallback, and language/numeric tests. Record exact screenshots and commit SHA; flag untested devices rather than claiming pass. Correct layout-level issues before cosmetic polishing.

## 6 — Document and deliver
Create `DESIGN_DECISIONS.md` using [template](../templates/DESIGN_DECISIONS.md), a completed [TYPE_SPEC.md](../templates/TYPE_SPEC.md) and a [review report](../templates/REVIEW_REPORT.md), and report only tests actually run. Deployment/production publication only when rights and access allow.
