# Client website production workflow

## 0 — Intake / evidence
Read CV, authentic photos, work samples, client's audience, client goals and existing site. Build a fact ledger separating **verified / ambiguous / absent** details. Do not hallucinate missing work.

## 1 — Diagnose the story
Write the identity thesis: `This website takes the form of ____ because the client uniquely ____ and their audience needs ____.` Define the one main job of the homepage, necessary secondary tasks and content density.

## 2 — Diverge before decorating
Explore **seven genuinely different concept directions** based on the client's evidence and audience. For each: a distinct information architecture, rough layout, typography strategy, image strategy, main interaction and major tradeoff. These are seven developed concept proposals (text/wireframes), **not seven production implementations** and **not a mandatory 1:1 mapping to the seven Reference Atlas studies**. Avoid superficial color-only variations. Compare all seven, choose one for implementation with reasons, and document why alternatives were rejected.

## 3 — Reference only when needed
Read [Reference Atlas](REFERENCE_ATLAS.md) for relevant mechanisms. Read the appropriate note and the original source only **if available and authorized**. Record mechanism, transformation and protected visual carryovers to avoid.

## 4 — Design system and implementation
Specify tokens suitable for that client, not Apple/Anthropic/Lazarus defaults. Implement semantic structure and truthful content first; responsive CSS and usable navigation second; a small number of meaningful interactions third. Animations must honor reduced-motion. All actions functional.

## 5 — Critique rendered output
Use [Anti-Generic Audit](ANTI_GENERIC_AUDIT.md). Compare to rejected alternatives and recent sites. Inspect screen heights, 320px width, zoom, focus, motion and network failure scenarios. Correct layout-level issues before cosmetic polishing.

## 6 — Document and deliver
Create `DESIGN_DECISIONS.md` using [template](../templates/DESIGN_DECISIONS.md), capture a [review report](../templates/REVIEW_REPORT.md), and report only tests actually run. Deployment/production publication only when rights and access allow.
