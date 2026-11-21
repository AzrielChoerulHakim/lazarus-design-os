---
name: lazarus-reference-atlas
description: Evidence-led reference engineering. Use when choosing, implementing or reviewing a technical mechanism from the seven Lazarus source studies; use the mechanism registry, source/rights record, original implementation recipes and source-bound QA instead of copying reference aesthetics.
---

# Lazarus Reference Engineering · Mechanism First

**This skill retains the existing `lazarus-reference-atlas` ID for agent compatibility.** It expands the reference atlas from reading material into an engineering selection and verification process. Read `AGENTS.md`, `DESIGN.md`, `docs/WORKFLOW.md`, `docs/REFERENCE_ATLAS.md`, `docs/REFERENCE_ENGINEERING.md` and the matching `docs/studies/*.md` before implementation.

## 1. Ground the problem
- Read verified client material and define the reader task in ordinary language. Art direction happens elsewhere; do not automatically adopt a study's colors, typography, imagery, hero layout, motion path or source code.
- Study `data/reference-mechanisms.json` (seven sources, twelve distinct reusable mechanisms). Run `node scripts/reference-engineering.mjs catalog` and `suggest --jobs ... --evidence ...` to *shortlist*, not auto-select.
- **Select no more than two mechanisms** after checking documented requirements, constraints, source availability, audience benefit and rejection conditions. A plain semantic page is often the correct answer.

## 2. Verify source and rights
- Every historical source in the PUBLIC Lazarus Design OS is documented in `docs/studies/`; original media/source archives are intentionally not distributed. See `docs/reference-engineering/SOURCE_AUDIT.md` for provenance of the separately supplied historical files inspected during development. A file hash is not a redistribution license.
- Record `sourceBasis: notes-only` unless an authorized full source was directly inspected in the *current project*. If so, identify it in `sourceDescription`. Do not imply copying or reusing proprietary code/assets is permitted.
- Identify **at least two recognizable visual signatures not to carry over** from the studied project. Keep mechanism and aesthetics independent.

## 3. Engineer the mechanism
- Define one canonical data/state model. Build readable semantic HTML and no-JS/static fallback **before** optional effects.
- Write trigger → state transition → visible result → reader benefit → recovery/keyboard/touch/motion fallback.
- Use the recipe in the registry, `docs/reference-engineering/RECIPE_CARDS.md`, and original teaching utilities/examples under `lib/` and `examples/` as starting points. They are not ready-to-publish client designs.
- Don't fabricate measurements, client artwork, results, dates or credentials. Do not stall real content behind showpiece animations.

## 4. Record a source-bound decision
- `node scripts/reference-engineering.mjs init /path/to/client/reference-engineering-plan.json`
- Fill verified evidence IDs and tags, project reader jobs, selected mechanism(s), rationale, audience benefit, implementation, fallback, excluded source signatures and at least one rejected alternative.
- `node scripts/reference-engineering.mjs check /path/to/client/reference-engineering-plan.json --stage decision`
- Keep this companion record alongside `design-contract.json`. It does not replace the `brief`, `design` or `release` gates in `scripts/design-gate.mjs`.

## 5. Test instead of asserting
- Follow universal and mechanism-specific checks in `docs/reference-engineering/QA_MATRIX.md`; review actual 320/390 mobile sections and desktop render in the OS's existing typography/mobile QA.
- Record observed result, evidence path and reviewed source SHA, then run `node scripts/reference-engineering.mjs check /path/to/client/reference-engineering-plan.json --stage release --root /path/to/client`.
- Stop on misleading data, unlicensed source carryovers, unusable no-JS content, keyboard failure, absent reduced-motion fallback, content clipped on mobile or unsynchronized state. Report NOT TESTED when something was not tested; it cannot count as a passing release.
- **Passing validation is evidence-record completeness, not originality, rights verification, WCAG certification or production readiness.** Independent aesthetic judgment remains mandatory.

## Output contract
Deliver the chosen mechanism rationale, original source-independent code, explicit fallback, `reference-engineering-plan.json`, tested viewport and interaction evidence, and unresolved limitations. Never publish the seven original historical sources/media from the private archives as part of this skill.
