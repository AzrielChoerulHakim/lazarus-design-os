# LAZARUS DESIGN OS
**A research-led creative engineering system for websites that do not feel AI-generated.**

> **Borrow the method. Never the look.** Our goal is not to make every site look like Apple. Our goal is Apple-level *intentionality and craft* applied to a visual identity that belongs to each client.

## Why it exists
Most AI-generated websites fail through **structural sameness** as well as visual sameness: identical hero → cards → CTA sequences, default typography, decorative scroll effects, interchangeable copy, and no evidence of the client's identity. Different colors are not different creative directions. This repository turns research, design principles, technique references, and QA into a repeatable workflow.

## Start here
0. **[Direction Room](direction-room/)** — write a real brief, compare seven structures, trace decisions to client evidence, import/export the project record. Follow the **[Originality Protocol](docs/ORIGINALITY_PROTOCOL.md)** and **[executable design contract](docs/DESIGN_CONTRACT.md)**.
1. [AGENTS.md](AGENTS.md) — mandatory instructions for coding agents.
2. [DESIGN.md](DESIGN.md) — philosophy and decision hierarchy.
3. [Research evidence](docs/RESEARCH_EVIDENCE.md) — what is demonstrated versus hypothesized.
4. [Apple craft standard](docs/APPLE_CRAFT_STANDARD.md) — adopt purpose, feedback, typography and care; **do not copy Apple's look**.
5. **[Typography Direction System](docs/TYPOGRAPHY_SYSTEM.md)** — content-first type hierarchy, optical craft, client-specific typography, font rights and three same-copy design specimens.
6. **[Typography QA](docs/TYPOGRAPHY_QA.md)** — test real words, responsiveness, resize/reflow, user spacing override, fallback and contrast.
7. **[Tone of Voice System](docs/TONE_OF_VOICE_SYSTEM.md)** — human, client-specific language, pronouns, vocabulary, approval and copy QA.
8. **[Mobile Visual Integrity System](docs/MOBILE_VISUAL_INTEGRITY.md)** — mobile-specific composition, art/text overlap, section-level QA and screenshot inspection.
9. [Seven-study Reference Atlas](docs/REFERENCE_ATLAS.md) — *mechanisms*, selection criteria and source analyses.
10. [Anti-generic audit](docs/ANTI_GENERIC_AUDIT.md) — structured review of the actual rendered website.
11. [Skill registry](docs/SKILL_REGISTRY.md) — external skill links plus original internal skills.
11a. **[Reference Engineering](docs/REFERENCE_ENGINEERING.md)** — seven studied sources, twelve independently implementable mechanisms, decision validator, fallback recipes and source-bound QA.
11b. **[Scroll Director](docs/SCROLL_SYSTEMS.md)** — 15 independent scrolling systems with evidence criteria, original engineering recipes, release QA and a live [Scroll Lab](scroll-lab/) demonstration.
12. [Project brief](templates/PROJECT_BRIEF.md) → [type spec](templates/TYPE_SPEC.md) → [decisions record](templates/DESIGN_DECISIONS.md).
13. [Panduan penggunaan Bahasa Indonesia](docs/GETTING_STARTED_ID.md) — cara menerapkan sistem ke proyek klien.

## New mandatory typography workflow
**Real client reading tasks → seven distinct typographic grammars → select a concept → three monochrome same-copy type specimens → [TYPE_SPEC](templates/TYPE_SPEC.md) → code → [Typography QA](docs/TYPOGRAPHY_QA.md) + visual audit.** Apple typography is a craft model, **not** a San Francisco font or Apple.com layout preset. No release claim without tested screenshots and font rights.

## New mandatory copy and mobile gates
**Verified CV + client reading context → voice profile with actual copy → mobile composition plan with all sections and overlap risks → implement → section-by-section 320/390 visual review + six-width/short-height QA → delivery.**
See [TONE_OF_VOICE](templates/TONE_OF_VOICE.md) and [MOBILE_VISUAL_QA](templates/MOBILE_VISUAL_QA.md). `scripts/design-gate.mjs` now blocks missing plans, voice samples and mobile inspection evidence. The optional [Playwright geometry probe](scripts/mobile-visual-audit.mjs) captures screenshots and flags marked critical/decorative intersections; a clean report does **not** replace human review.

## Try the Typography Proofing Lab
**[Open the interactive Type Lab](type-lab/)** — paste verified client headlines, paragraphs and context; compare **the same words** across dossier, reading and index grammars, then check mobile-sized preview columns and reading measure. It uses no external font downloads and stores no typed content. This is a concept-proofing instrument, **not a browser accessibility certification or a house style**. See [Type Lab README](type-lab/README.md).

## Seven Visual Directions — actual concept explorer
**[View the interactive seven-concept prototype](concepts/)** — seven distinct page anatomies, typography systems, media treatments and navigational ideas for the SAME fictional architecture client (ATELIER SERA). Use [the concept rationale](concepts/README.md) to understand the decisions. This is a speculative study, **not seven client websites**. For GitHub Pages, enable root/branch publishing first; expected URL: https://azrielchoerulhakim.github.io/lazarus-design-os/concepts/ .

## Website catalogue
Open [index.html](index.html), or serve locally:
```sh
python3 -m http.server 8000
# open http://localhost:8000
```
Static HTML/CSS/JS, no build step. Search seven studies, filter by interaction family, and open their technical notes.

## Required workflow
**Evidence → seven structurally distinct concept directions and their reading grammars → choose one → three type specimens + TYPE_SPEC → build → typography/visual/browser audit → iterate → ship**. A build passing is not a design review passing. Never invent material from a CV. Distinctiveness has to remain after removing the brand name and portrait.

## Important: public repository and source rights
This repository is currently **PUBLIC**. Seven historical source studies were supplied during the project, but **their original source files and bundled assets are intentionally NOT published here** until redistribution rights are checked. The atlas contains descriptions, technique notes, and identifiers only. The external Apple/Anthropic/Emil/community skills remain linked rather than copied. See [source policy](docs/SOURCE_POLICY.md).

## Use in a client repo
Make this repository readable to the agent (a link without access is not enough). Copy [templates/CLIENT_AGENT.md](templates/CLIENT_AGENT.md) to the client project's `AGENTS.md`; fill the project brief; then direct the agent to this repository's **AGENTS.md, DESIGN.md, WORKFLOW, and audit**. Do not copy any reference's look.

## Project agent skills
Original, project-local skills live in [`.github/skills/`](.github/skills/):
- [`lazarus-anti-generic`](.github/skills/lazarus-anti-generic/SKILL.md) — evidence-led structural divergence and critique.
- **[`lazarus-type-director`](.github/skills/lazarus-type-director/SKILL.md)** — primary typography art direction, apples-to-web craft adaptation, same-copy specimens and QA gates.
- **[`lazarus-voice-director`](.github/skills/lazarus-voice-director/SKILL.md)** — grounded tone, pronouns and natural copy.
- **[`lazarus-mobile-integrity`](.github/skills/lazarus-mobile-integrity/SKILL.md)** — deliberate mobile composition and visual collision prevention.
- [`lazarus-apple-craft`](.github/skills/lazarus-apple-craft/SKILL.md) — Apple-level interaction, hierarchy and quality without visual imitation.
- [`lazarus-reference-atlas`](.github/skills/lazarus-reference-atlas/SKILL.md) — select at most two evidence-backed mechanisms from the 12-mechanism [Reference Engineering registry](data/reference-mechanisms.json), implement independently, and verify fallback, provenance and QA.
- **[`lazarus-scroll-director`](.github/skills/lazarus-scroll-director/SKILL.md)** — choose from 15 purposeful scroll grammars using verified reader jobs; allow no more than one dominant plus one supporting mechanism, sharing the global two-mechanism limit with Reference Engineering.

These project skills follow [GitHub Copilot's documented `.github/skills/<skill>/SKILL.md` convention](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills); skill selection is contextual and depends on the coding agent's support. The third-party skills cited in the registry are *linked*, not copied or installed.

## Verification
```sh
node scripts/check-atlas.mjs
node scripts/reference-engineering.mjs registry-check
node scripts/scroll-director.mjs registry-check
node --test tests/scroll-director.test.mjs
node --test tests/reference-engineering.test.mjs
node --test tests/design-contract.test.mjs
node --check scripts/mobile-visual-audit.mjs
node scripts/design-gate.mjs init /path/to/client/design-contract.json
node scripts/design-gate.mjs check /path/to/client/design-contract.json --stage brief
```
CI runs the static checks, contract regression tests and browser checks for the tools. `brief`, `design` and `release` are separate gates; each checks recorded evidence, not originality or accessibility certification. See [the contract guide](docs/DESIGN_CONTRACT.md) for artifacts, source provenance and client CI use. The [v4 review](docs/V4_REVIEW.md) records the tested commit, actual screenshots, results and outstanding checks.

**Status:** version 4 · evidence-to-decision workflow, 2026-11-16. Includes the existing typography system and seven studies. Rules and completeness checks are not a guarantee of originality. Judge the actual work against real client content and independent feedback.
