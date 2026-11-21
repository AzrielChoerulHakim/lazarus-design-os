# Lazarus Reference Engineering · V1

**From reference study to independent engineering decision.** This is a companion to the existing [Reference Atlas](REFERENCE_ATLAS.md), [Originality Protocol](ORIGINALITY_PROTOCOL.md) and executable `design-contract.json`. It introduces mechanism selection, a traceable decision artifact, original technical utilities and a dedicated test gate. It is **not** another visual direction library.

## Four nonnegotiable distinctions

1. **Reference** is source evidence of what a previous prototype did, not a stylistic requirement for client work.
2. **Mechanism** is a reusable interaction/state/rendering technique described without a source's exact appearance.
3. **Art direction** is determined from a particular client's content, audience and creative decision; neither an animation nor a reference chooses it.
4. **Acceptance** is based on the actual rendered site, tested behavior, correct data and legal source use. A passing validator only checks recorded requirements.

## Structure

| Artifact | Purpose | Usage |
| --- | --- | --- |
| `data/reference-mechanisms.json` | 12 independent, source-attributed mechanisms from 7 studies, each with problem, evidence tags, decision gates, fallback, recipe, QA and recognizable source signatures to exclude | Selection and design review |
| `lib/reference-engineering.mjs` | Registry checker, non-prescriptive task shortlist, plan validator, safe artifact-path checks | Reusable Node module |
| `scripts/reference-engineering.mjs` | `catalog`, `suggest`, `init`, `check`, `registry-check` | CLI, Node 22+ |
| `lib/scroll-progress.mjs` | Original pure progress/phase functions plus one passive frame-coalesced scroll observer with cleanup | Optional client engineering primitive |
| `examples/synchronized-evidence/` | Working original HTML progressive-enhancement example, shared selection + no-JS content | Teaching, not styling |
| `examples/scroll-coordination/` | Working original process stages with one scroll progress model and reduced-motion fallback | Teaching, not styling |
| `docs/reference-engineering/RECIPE_CARDS.md` | Mechanism-specific implementation invariants and failure conditions | Engineering reference |
| `docs/reference-engineering/QA_MATRIX.md` | Test matrix and evidence rules | Review before delivery |
| `docs/reference-engineering/ADOPTION.md` | Exact adoption and JSON specification | Client integration |
| `tests/reference-engineering.test.mjs` | Deterministic regression tests | CI via new workflow |
| `.github/workflows/reference-engineering.yml` | Additive CI verification of this subsystem on related changes | GitHub Actions |
| `.github/skills/lazarus-reference-atlas/SKILL.md` | Agent policy for source, choices, implementation and tests | Replaces existing skill while preserving its name |

## Decision algorithm (not an aesthetic ranking)

**Evidence → reader job → candidate mechanism → reject conditions → 0–2 decisions → accessible baseline → optional enhancement → measured review.**

1. Derive a reader job: `show-chronology`, `compare-states`, `show-process`, `demonstrate-making`, etc. These tags describe a task, not a style.
2. Tag only actual verified facts/assets for mechanisms requiring them. A real timeline requires real chronology; a temperature graph requires real process observations; video requires legitimate material.
3. `suggest` shows a task-aligned shortlist, **including** which candidates lack verified evidence. It does not assign a visual quality score or choose a winner. The ideal answer can be **no special mechanism**.
4. Choose zero, one or two mechanisms. Zero is an intentional decision requiring `noMechanismReason` (e.g., a readable CV needs no animation). Explain what each chosen mechanism improves and which alternatives were rejected. Exclude recognizable source visual signatures.
5. Render the core content without JavaScript or motion. Add the mechanism as a progressive enhancement. Keep state centralized and movement interruptible. Do not create artificial loading delays.
6. Verify and record actual QA, including typography/mobile checks from the main Design OS. Every required mechanism test at release needs a readable nonempty evidence artifact.

## What is intentionally absent

- No copied source code, footage, fonts, imagery, color tokens, component skins or branded layouts from the seven studies.
- No required cinematic hero or pinned scroll. The simple document is the baseline.
- No fabricated screenshots, performance metrics, verified data or claims of originality percentages.
- No automatic integration with the pre-existing design-contract schema or release gate: use the **companion validator**. This avoids breaking the repository's V4 contract until integration has its own migration and regression review.
- No claim of physical-device, cross-browser, accessibility or copyright certification. Those require further verification per client.

## Reference engineering anti-patterns

**Source look laundering:** recoding a source layout while changing only colors. **Effect-first design:** choosing WebGL or sticky chapters before a reader task. **Data theater:** presenting fictional telemetry as client results. **State drift:** graph, label and timeline read different models. **Fallback theater:** a `prefers-reduced-motion` CSS rule that leaves content inside huge sticky scroll regions. **QA theater:** a validator marked `pass` without observed screenshots/interaction behavior. Every case requires substantive redesign, not a new label.

## Two concrete transformations

- A verified scholar publication list could adopt **`chronology-state`**, with one sourced list of dates, current paper/document index and direct links. The orbit shape and indigo branding are discarded. The baseline is a normal bibliography.
- A ceramic studio with authenticated firing logs could adopt **`synchronized-process-plot`**, with one unit-bearing data series feeding both graph and table. No logs? Use a qualitative sequence, **not** hypothetical temperatures with a "live" label.

## Source disclosure

The seven historical prototypes were available as separate uploads for this research pass; their exact hashes and scope are recorded in [SOURCE_AUDIT](reference-engineering/SOURCE_AUDIT.md). They are **not** included in this overlay. Work derived from the studies is limited to non-expressive technical ideas and independently authored code. An uploaded copy is not a transferable permission to redistribute source media/assets.
