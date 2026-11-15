# LAZARUS DESIGN OS
**A research-led creative engineering system for websites that do not feel AI-generated.**

> **Borrow the method. Never the look.** Our goal is not to make every site look like Apple. Our goal is Apple-level *intentionality and craft* applied to a visual identity that belongs to each client.

## Why it exists
Most AI-generated websites fail through **structural sameness** as well as visual sameness: identical hero → cards → CTA sequences, default typography, decorative scroll effects, interchangeable copy, and no evidence of the client's identity. Different colors are not different creative directions. This repository turns research, design principles, technique references, and QA into a repeatable workflow.

## Start here
1. [AGENTS.md](AGENTS.md) — mandatory instructions for coding agents.
2. [DESIGN.md](DESIGN.md) — philosophy and decision hierarchy.
3. [Research evidence](docs/RESEARCH_EVIDENCE.md) — what is demonstrated versus hypothesized.
4. [Apple craft standard](docs/APPLE_CRAFT_STANDARD.md) — adopt purpose, feedback, typography and care; **do not copy Apple's look**.
5. [Seven-study Reference Atlas](docs/REFERENCE_ATLAS.md) — *mechanisms*, selection criteria and source analyses.
6. [Anti-generic audit](docs/ANTI_GENERIC_AUDIT.md) — structured review of the actual rendered website.
7. [Skill registry](docs/SKILL_REGISTRY.md) — links to external agent skills; **not vendored code**.
8. [Project brief](templates/PROJECT_BRIEF.md) → [decisions record](templates/DESIGN_DECISIONS.md).
9. [Panduan penggunaan Bahasa Indonesia](docs/GETTING_STARTED_ID.md) — cara menerapkan sistem ke proyek klien.

## Website catalogue
Open [index.html](index.html), or serve locally:
```sh
python3 -m http.server 8000
# open http://localhost:8000
```
Static HTML/CSS/JS, no build step. Search seven studies, filter by interaction family, and open their technical notes.

## Required workflow
**Evidence → seven structurally distinct concept directions → select one with rationale → build → visual/browser audit → iterate → ship**. A build passing is not a design review passing. Never invent material from a CV. Distinctiveness has to remain after removing the brand name and portrait.

## Important: public repository and source rights
This repository is currently **PUBLIC**. Seven historical source studies were supplied during the project, but **their original source files and bundled assets are intentionally NOT published here** until redistribution rights are checked. The atlas contains descriptions, technique notes, and identifiers only. The external Apple/Anthropic/Emil/community skills remain linked rather than copied. See [source policy](docs/SOURCE_POLICY.md).

## Use in a client repo
Make this repository readable to the agent (a link without access is not enough). Copy [templates/CLIENT_AGENT.md](templates/CLIENT_AGENT.md) to the client project's `AGENTS.md`; fill the project brief; then direct the agent to this repository's **AGENTS.md, DESIGN.md, WORKFLOW, and audit**. Do not copy any reference's look.

## Project agent skills
Original, project-local skills live in [`.github/skills/`](.github/skills/):
- [`lazarus-anti-generic`](.github/skills/lazarus-anti-generic/SKILL.md) — evidence-led structural divergence and critique.
- [`lazarus-apple-craft`](.github/skills/lazarus-apple-craft/SKILL.md) — Apple-level interaction, hierarchy and quality without visual imitation.
- [`lazarus-reference-atlas`](.github/skills/lazarus-reference-atlas/SKILL.md) — choose implementation techniques by use case and limitations.

These project skills follow [GitHub Copilot's documented `.github/skills/<skill>/SKILL.md` convention](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills); skill selection is contextual and depends on the coding agent's support. The third-party skills cited in the registry are *linked*, not copied or installed.

## Verification
```sh
node scripts/check-atlas.mjs
```
CI uses the same dependency-free check.

**Status:** version 2 · foundation built 2026-11-15. Rules are a starting hypothesis, not a guarantee of originality. Judge against real client content and independent user feedback.
