# LAZARUS DESIGN OS — AGENT RULES

## Purpose
This repository is a **decision system** for creating client-specific websites, not a house visual template. The intended result must not read as default AI-generated UI. This is not a guarantee: originality is assessed against the actual client brief and rendered result.

## Required reading, in order
1. The client's actual CV, imagery, real work, audience, and the existing project code.
2. [DESIGN.md](DESIGN.md) and [docs/WORKFLOW.md](docs/WORKFLOW.md).
3. [docs/RESEARCH_EVIDENCE.md](docs/RESEARCH_EVIDENCE.md) to understand what is evidence versus our hypothesis.
4. [docs/APPLE_CRAFT_STANDARD.md](docs/APPLE_CRAFT_STANDARD.md). Adopt deliberate decisions, not Apple's visual skin.
5. [docs/REFERENCE_ATLAS.md](docs/REFERENCE_ATLAS.md) and only relevant study notes under `docs/studies/`.
6. [docs/ANTI_GENERIC_AUDIT.md](docs/ANTI_GENERIC_AUDIT.md) before delivery.
If a source or project asset is inaccessible, say so. **Never claim to have examined an inaccessible source.**

## Decision hierarchy
User intent and factual content > audience needs > identity-specific structure > accessibility and usability > coherent craft > meaningful motion > decoration.

## Mandatory design process
- Identify **verified client truths** (names/dates/projects/claims only when supported by the source).
- Write a **one-sentence identity thesis** that makes an unusually specific site concept defensible.
- Propose **three genuinely different structures**, not three colorways. Compare information architecture, composition, type strategy, imagery treatment, and interaction model.
- Choose one with evidence. Record the discarded alternatives and why in `DESIGN_DECISIONS.md`.
- Study 1–2 relevant reference **mechanisms**. If original code is not available, use the technical notes as conceptual pointers only; don't pretend to have studied the code.
- Define typography as a system: actual font licensing, display/body, line length, responsive breaks, legibility, language support.
- Give each high-salience animation a job: feedback, spatial continuity, demonstration, or narrative comprehension. User input must not be blocked by nonessential motion.
- Implement and inspect. Screenshots at 320, 390, 768, 1024 and 1440 CSS px; include short-height, keyboard, touch, reduced-motion and zoom 200%.

## Generic-default failure modes
Interchangeable headlines; centered hero + two CTAs + repeated rounded cards; all-caps eyebrow labels everywhere; arbitrary 01/02/03 numbering; random blur, glow or glass; identical fade-up on every section; repeated portfolio cards with invented accomplishments; scroll-jacking; changing fonts/colors without changing underlying page anatomy.

These are **diagnostics, not hard aesthetic bans**. A component may be correct if purpose and content justify it. Never replace generic SaaS with generic Apple, generic brutalism, or generic editorial.

## External skills
Use [docs/SKILL_REGISTRY.md](docs/SKILL_REGISTRY.md) as a map, not as automatic authority. Apple HIG is primarily platform guidance. GitHub community skills are not official Apple publications. Do not paste their unverified claims, tokens, or code into client projects blindly.

## Delivery contract
Provide working implementation; clear links to actual code; `DESIGN_DECISIONS.md`; a candid visual QA report, remaining limitations, and steps to reproduce. No dead CTA, lorem ipsum, fake projects, unlicensed assets, or untested claims about accessibility/performance.
