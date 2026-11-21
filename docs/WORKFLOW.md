# Client website production workflow

Use the [originality protocol](ORIGINALITY_PROTOCOL.md) throughout. Record decisions in the executable [design contract](DESIGN_CONTRACT.md); the command-line checks enforce completeness without pretending to judge aesthetic quality.

## 0 — Intake / evidence
Read CV, authentic photos, work samples, client's audience, client goals and existing site. Build a fact ledger separating **verified / ambiguous / absent** details. Do not hallucinate missing work.

## 1 — Diagnose the story
Write the identity thesis: `This website takes the form of ____ because the client uniquely ____ and their audience needs ____.` Define the one main job of the homepage, necessary secondary tasks and content density.

## 2 — Diverge before decorating
Explore **seven genuinely different concept directions** based on the client's evidence and audience. For each: a distinct information architecture, rough layout, typography strategy, image strategy, main interaction and major tradeoff. These are seven developed concept proposals (text/wireframes), **not seven production implementations** and **not a mandatory 1:1 mapping to the seven Reference Atlas studies**. Avoid superficial color-only variations. Compare all seven, choose one for implementation with reasons, and document why alternatives were rejected.

## 2.5 — Typography before UI code (mandatory)
Read [Typography Direction System](TYPOGRAPHY_SYSTEM.md) and use the internal `lazarus-type-director` skill if available. Write a **typographic thesis for every one of the seven directions**: role hierarchy, reading mode, actual-copy arrangement and failure mode. For the selected direction, make **three monochrome typography-only specimens using the same real content**, compare their scan paths, long-name behavior and legibility. Complete [TYPE_SPEC](../templates/TYPE_SPEC.md), including font licenses, optical/number features, language coverage, fallback and responsive behavior. Choose based on audience task — do not start by selecting a font pair, Apple UI kit or display size. **No full UI implementation until this gate is completed.**

## 2.6 — Tone of Voice System (mandatory, before UI)
Use [Tone of Voice System](TONE_OF_VOICE_SYSTEM.md). Choose formal/conversational/editorial/playful language according to client evidence, real readers and the creative director's intent; it must not be inferred from the chosen art style. Record language, perspective/pronouns, approved or proposed status, vocabulary and three real copy samples in `voice` and [TONE_OF_VOICE](../templates/TONE_OF_VOICE.md). Keep quotes and first-person claims truthful; avoid translated corporate filler and unrequested slang.

## 2.7 — Mobile Visual Integrity plan (mandatory, before UI)
Use [Mobile Visual Integrity](MOBILE_VISUAL_INTEGRITY.md) and [MOBILE_VISUAL_QA](../templates/MOBILE_VISUAL_QA.md). List real sections, risks of illustration/text/fixed-header collision, mobile reading order and reduced-motion fallback in `mobile`. Plan intentional recomposition, not proportional desktop shrinking.

## 3 — Reference only when needed
Before proceeding, run the contract's `brief` and `design` stages. Define the project's signature, source evidence, audience benefit and fallback. A duplicate-structure warning requires comparison, not renaming the concept.

Read [Reference Atlas](REFERENCE_ATLAS.md) and [Reference Engineering](REFERENCE_ENGINEERING.md) for relevant mechanisms. Use `node scripts/reference-engineering.mjs catalog` or `suggest` to shortlist by verified client needs; choose **zero to two**, never by visual resemblance alone. Read the appropriate note and original source only **if available and authorized**. Record source basis, exclusions, audience benefit, transformation, static/reduced-motion fallback and method-specific QA in `reference-engineering-plan.json` in the client repository. The separate mechanism gate complements, but does not replace, the main design contract.

**Optional scroll system decision (only if a real reader job needs it):** read [Scroll Director](SCROLL_SYSTEMS.md), `data/scroll-systems.json` and `.github/skills/lazarus-scroll-director/SKILL.md`. Evaluate 15 distinct patterns, shortlist against verified evidence, and choose **zero or one dominant scroll system** plus at most one supporting technique; keep total high-salience techniques across Reference Engineering + Scroll Director to **two project-wide**. Record `scroll-plan.json`, alternatives rejected, full no-JS/reduced-motion/mobile treatments and run `node scripts/scroll-director.mjs check /client/scroll-plan.json --stage decision --reference-plan /client/reference-engineering-plan.json` when both plans exist.

## 4 — Design system and implementation
Specify tokens suitable for that client, not Apple/Anthropic/Lazarus defaults. Typography tokens must implement approved **semantic text roles**, not decorative pixel classes; scale/reflow after testing actual names, job titles, dense paragraphs and data. Implement semantic structure and truthful content first; responsive CSS and usable navigation second; a small number of meaningful interactions third. Animations must honor reduced-motion. All actions functional.

## 5 — Critique rendered output
Do an early critique after the opening and one substantial evidence section, before filling the entire page. Review the hierarchy without brand color or custom fonts and inspect the actual mobile reading path. Repair structural problems now.

Use [Anti-Generic Audit](ANTI_GENERIC_AUDIT.md). Compare to rejected alternatives and recent sites. Inspect screen heights, every actual section at **both 320 and 390 CSS px**, and full-page 320/390/640/768/1024/1440 CSS px, focus, motion and network failure scenarios. **Separately execute [Typography QA](TYPOGRAPHY_QA.md)**: 200% resize, 320px-equivalent reflow, WCAG text-spacing override, contrast per state, actual content, missing-font fallback, and language/numeric tests. Run the optional `scripts/mobile-visual-audit.mjs` geometric probe for marked content/decoration, but inspect the screenshots manually. Record `qa.mobileInspections` section-by-section, voice-consistency and mobile-art-direction reviews, actual screenshot paths and commit SHA; flag untested devices rather than claiming pass. Correct layout-level issues before cosmetic polishing.

Before delivery of any scroll mechanism, follow [Scroll QA Matrix](scroll-systems/QA_MATRIX.md), inspect keyboard, touch, reverse scroll, anchoring and normal reading flow, and run `scripts/scroll-director.mjs` release validation with actual source-linked evidence paths. These checks are additive to full Lazarus typography/mobile/design contract review.

## 6 — Document and deliver
Run the `release` gate against the actual client contract and the reviewed source commit. Resolve all blockers and disclose review warnings. Keep actual claims, copy, asset rights, functional behavior and any backend/data flows in the human review; a record checker cannot validate them.

Create `DESIGN_DECISIONS.md` using [template](../templates/DESIGN_DECISIONS.md), a completed [TYPE_SPEC.md](../templates/TYPE_SPEC.md) and a [review report](../templates/REVIEW_REPORT.md), and report only tests actually run. Deployment/production publication only when rights and access allow.
