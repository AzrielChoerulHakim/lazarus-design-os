# Lazarus Reference Engineering · Implementation Overlay

**Status:** Integrated into Lazarus Design OS. Client-specific browser QA and independent rendered review remain required.

This package upgrades the already-registered `lazarus-reference-atlas` skill without changing its discovery name. It adds a 7-study/12-mechanism evidence-led registry, a standalone Node.js CLI for shortlist + decision/release validation, source/rights guidance, test coverage, a small scroll state library, two runnable original progressive-enhancement demos, and a separate GitHub Actions verification workflow.

Start with [`docs/REFERENCE_ENGINEERING.md`](docs/REFERENCE_ENGINEERING.md) for the architecture, [`docs/reference-engineering/ADOPTION.md`](docs/reference-engineering/ADOPTION.md) for exact commands, or [the skill](.github/skills/lazarus-reference-atlas/SKILL.md) for coding-agent behavior.

## Usage

Run from the repository root. The existing `.github/skills/lazarus-reference-atlas/SKILL.md` is updated in place. No external assets, historical source bundles or third-party dependencies are included.

```sh
node scripts/reference-engineering.mjs registry-check
node --test tests/reference-engineering.test.mjs
node scripts/reference-engineering.mjs catalog
node scripts/reference-engineering.mjs suggest --jobs show-process --evidence verified-process
```

The `check` command operates on `reference-engineering-plan.json` **in a separate client repository**. It does not rewrite the primary `design-contract.json`, copy copyrighted reference code or certify an art direction. It checks recorded requirements and evidence paths; human review decides visual originality.

The `.github/workflows/reference-engineering.yml` workflow runs registry validation and unit tests on related changes. It does not claim browser-level client QA.

## Scope and limitations

- Source integration is **not** a verified deployment or completed client-site browser review.
- Existing Design OS V4 test suite and browser CI have not been rerun against a merged repository; run them after extraction. The add-on unit tests were run independently.
- Real mobile/Safari/Firefox/physical-device rendering must be tested for client implementations. The examples are engineering teaching pieces, not templates to sell unchanged.
- Historical study source and media rights remain unverified for redistribution. This overlay contains independently authored code only.
