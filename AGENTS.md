# LAZARUS DESIGN OS — AGENT RULES

## Purpose
This repository is a **decision system** for creating client-specific websites, not a house visual template. The intended result must not read as default AI-generated UI. This is not a guarantee: originality is assessed against the actual client brief and rendered result.

## Required reading, in order
1. The client's actual CV, imagery, real work, audience, and the existing project code.
2. [DESIGN.md](DESIGN.md) and [docs/WORKFLOW.md](docs/WORKFLOW.md).
3. [docs/RESEARCH_EVIDENCE.md](docs/RESEARCH_EVIDENCE.md) to understand what is evidence versus our hypothesis.
4. [docs/APPLE_CRAFT_STANDARD.md](docs/APPLE_CRAFT_STANDARD.md) and **[docs/TYPOGRAPHY_SYSTEM.md](docs/TYPOGRAPHY_SYSTEM.md)**. Adopt Apple's discipline of text hierarchy, **not** Apple's fonts or visual skin.
5. **[docs/TONE_OF_VOICE_SYSTEM.md](docs/TONE_OF_VOICE_SYSTEM.md)** and **[docs/MOBILE_VISUAL_INTEGRITY.md](docs/MOBILE_VISUAL_INTEGRITY.md)** — language identity, mobile composition and overlapping-art safeguards.
6. [docs/REFERENCE_ATLAS.md](docs/REFERENCE_ATLAS.md) and only relevant study notes under `docs/studies/`.
7. [docs/ANTI_GENERIC_AUDIT.md](docs/ANTI_GENERIC_AUDIT.md) and **[docs/TYPOGRAPHY_QA.md](docs/TYPOGRAPHY_QA.md)** before delivery.
If a source or project asset is inaccessible, say so. **Never claim to have examined an inaccessible source.**

## Zero-noise visual and copy rule (all Lazarus client projects)
No meaningless details. **Before delivery, inspect the rendered desktop and mobile pages and justify every displayed word, caption, icon, SVG, arrow glyph, serial number, line, ornament and decorative asset.** Keep only details serving a clear reading, interaction, accessibility or client-specific artistic purpose; remove the rest. In particular, never automatically add chevrons/arrows beside textual links, numbered “PLATE” captions, announcements of visual technique, decorative section labels, studio credits on a client's portfolio, or sentences explaining obvious imagery. Avoid superficial “editorial” filler. If a label is necessary for navigation, factual attribution, a real state change or an artistic message, make its purpose explicit and verify it functions. Maintain verified CV content and do not eliminate accessibility metadata or genuine provenance requirements merely to make a screenshot cleaner. This is an additive editing/review rule, not a new design contract or replacement for the current workflow.

## Decision hierarchy
User intent and factual content > audience needs > identity-specific structure > accessibility and usability > coherent craft > meaningful motion > decoration.

## Executable decision record (v4)
Read [docs/ORIGINALITY_PROTOCOL.md](docs/ORIGINALITY_PROTOCOL.md) and [docs/DESIGN_CONTRACT.md](docs/DESIGN_CONTRACT.md). Keep `design-contract.json` in the client repository. Use `scripts/design-gate.mjs` to initialize and check it at `brief`, `design` and `release` stages. Brief validation comes before UI; design adds actual type artifacts; release adds source-bound QA evidence. Follow the same process manually if Node is unavailable and record that limitation. Never interpret a complete contract as proof of originality or accessibility.

Trace dominant decisions to verified fact IDs. Define one client-specific signature decision, its audience benefit and fallback. Compare content order, reading grammar and interaction against alternatives and available previous work. Fix structural sameness before polishing. Keep the studio's own surrealist branding separate from client art direction. At the first substantial rendered section, critique desktop/mobile before extending the whole page.

## Mandatory design process
- Identify **verified client truths** (names/dates/projects/claims only when supported by the source).
- Write a **one-sentence identity thesis** that makes an unusually specific site concept defensible.
- Develop **seven genuinely different client-specific concept directions** before implementation. Each must have its own information architecture, narrative/composition, type strategy, imagery treatment, interaction model and documented tradeoff. These are seven design proposals, **not seven copied Atlas looks**, not seven colorways, and not seven full coded websites. Select one based on the client's evidence and intended users.
- Choose one with evidence. Record the discarded alternatives and why in `DESIGN_DECISIONS.md`.
- Study 1–2 relevant reference **mechanisms**. If original code is not available, use the technical notes as conceptual pointers only; don't pretend to have studied the code.
- **Typography gate before UI code:** run `lazarus-type-director` (or manually read its skill and follow the same procedure). Each of the seven directions must propose a distinct typographic/reading grammar; for the chosen direction prepare **three monochrome type specimens with the same verified client text**. Complete `TYPE_SPEC.md` from the template: actual font licensing, roles, leading/measure/tracking, number styles, fallback, responsive reflow and language coverage. Do not choose a universal sans+serif pair by habit. Never redistribute Apple font files without authorization.
- **Tone-of-voice gate before implementation:** derive language, formality, pronouns and vocabulary from the client's verified identity and audience, not from the visual template. Fill `voice` in the contract, create the client `TONE_OF_VOICE.md`, draft opening/evidence/action copy, and flag unapproved first-person wording as an editorial proposal. Use `lazarus-voice-director` when available.
- **Mobile visual integrity before implementation:** specify real section IDs, reading order, illustrated-object/focal crop policy, risk areas and reduced-motion fallback in `mobile`. Recompose rather than merely shrink desktop. Use `lazarus-mobile-integrity` when available.
- Give each high-salience animation a job: feedback, spatial continuity, demonstration, or narrative comprehension. User input must not be blocked by nonessential motion.
- Implement and inspect. Screenshots at 320, 390, **640**, 768, 1024 and 1440 CSS px; include short-height, keyboard, touch, reduced-motion, **200% text resize, 320px-equivalent reflow, text-spacing override, contrast and missing-font fallback**. Treat computed CSS font values and screenshots as evidence, not proof of subjective legibility or originality.

## Tone of voice and mobile release blockers
No invented personal speech, ungrounded credentials, tone switches, or unapproved attribution stated as fact. No essential reading content colliding with illustration, sticky/fixed UI or animation. Inspect **every** section at both 320 and 390 CSS px with screenshots and notes; verify the larger widths and short landscape too. The optional `scripts/mobile-visual-audit.mjs` is a heuristic, never a substitute for human screenshot review. Release must include `voice-claims`, `voice-consistency`, `mobile-visual-overlap`, `mobile-navigation-fit`, `mobile-motion-stability` and `mobile-art-direction` reviews.

## Typography-specific release blockers
Essential words clipped or illegible; 200% enlargement loses information; reflow requires horizontal reading of ordinary prose; WCAG AA text contrast fails; license or fallback is unknown; artificially tiny captions conceal genuine evidence. Follow [Typography QA](docs/TYPOGRAPHY_QA.md). Apple-native 11pt/44pt tips are not CSS pixel mandates.

## Generic-default failure modes
Interchangeable headlines; centered hero + two CTAs + repeated rounded cards; all-caps eyebrow labels everywhere; arbitrary 01/02/03 numbering; random blur, glow or glass; identical fade-up on every section; repeated portfolio cards with invented accomplishments; scroll-jacking; changing fonts/colors without changing underlying page anatomy.

These are **diagnostics, not hard aesthetic bans**. A component may be correct if purpose and content justify it. Never replace generic SaaS with generic Apple, generic brutalism, or generic editorial.

## External skills
Use [docs/SKILL_REGISTRY.md](docs/SKILL_REGISTRY.md) as a map, not as automatic authority. Apple HIG is primarily platform guidance. GitHub community skills are not official Apple publications. Do not paste their unverified claims, tokens, or code into client projects blindly.

## Delivery contract
Keep decisions, voice, mobile inspection and type QA as internal source-bound evidence; for the Lazarus client handoff, return only the requested live GitHub Lab preview and deployable ZIP unless asked for other reports. Provide working implementation; clear links to actual code; `DESIGN_DECISIONS.md`, a completed `TYPE_SPEC.md`; a candid visual + typography QA report tied to a tested commit SHA, remaining limitations, and steps to reproduce. No dead CTA, lorem ipsum, fake projects, unlicensed assets, or untested claims about accessibility/performance.
