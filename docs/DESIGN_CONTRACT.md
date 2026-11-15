# Use the executable design contract

The contract connects evidence → seven proposals → selected structure → signature decision → type specimens → rendered QA. It complements the written rationale; it does not replace actual design work.

## Start a client project

From this repository, with Node 22 or later:

```sh
node scripts/design-gate.mjs init /path/to/client/design-contract.json
node scripts/design-gate.mjs check /path/to/client/design-contract.json --stage brief
```

The client directory must already exist. `init` refuses to overwrite an existing file. Alternatively use [Direction Room](../direction-room/) and download the contract. The browser tool edits brief fields, keeps imported typography/QA fields intact and stores nothing after the tab closes. It does not contact an AI service or generate plausible client facts. Export before closing; reopen the JSON later.

## Three stages, separate meanings

| Command stage | Checked | Still requires judgment |
| --- | --- | --- |
| `brief` | Source-backed facts, seven proposals, evidence references, exact duplicate structures, selection, signature, tradeoffs and comparison note | Whether facts are truthful, proposals are meaningfully distinct and the direction helps the audience |
| `design` | Brief plus three declared same-copy specimens, type specification, rights/fallback record, chosen specimen and existing artifact files | Actual monochrome rendering, identical rendered copy, font permissions and reading quality |
| `release` | Design plus available source commit, six widths and short landscape, recorded checks/reviews and artifact files | Authenticity of screenshots, visual quality, real device behavior and the truth of reviewer claims |

`COMPLETE` means completeness at the requested stage. It never means “guaranteed original”, “AI undetectable”, WCAG certified or approved for deployment. Review warnings are printed even on a complete record. Critical failures must be fixed. If prior projects or independent reviewers are unavailable, state that limit rather than inventing a result.

## Fill the record

- `facts`: stable IDs, real claims, source locations, `verified` or `uncertain`. A concept can cite only verified facts with sources.
- `concepts`: seven IDs with content order, reading grammar, media treatment, primary interaction, evidence IDs and tradeoff. The checker ignores case, punctuation and cosmetic names when comparing exact structural signatures. It cannot recognize all paraphrases.
- `selection`, `signature`, `decisions`: selected ID and reason; one specific signature with audience benefit/fallback; dominant decisions with evidence and tradeoffs.
- `avoid`: contextual defaults and why they hurt this project. Never a universal style blacklist.
- `comparison`: earlier project structures if available, plus a note explaining differences or unavailable material. Match warnings require a rendered comparison, not a cosmetic rename.
- `typography`: a relative `spec` path; `contentSource`; three `specimens` containing `id`, `path`, exact `content`; `chosenId`, `reason`, `fontRights`, and `fallback`. A single specimen sheet may contain all three, provided the report identifies them. Content declarations are checked; actual pixels still need inspection.
- `qa`: full source commit; browser/OS/device environment; screenshots with CSS width/height/path; checks/reviews with ID, status, evidence path and observed notes. Use `pass`, `fail`, `not-tested`. Only `loading-empty-error` may use `not-applicable`, with an explanation. Independent review uses `recorded` with notes or `not-tested`.

Required interaction check IDs: `keyboard`, `focus`, `touch`, `reduced-motion`, `core-actions`, `text-resize-200`, `reflow-320`, `text-spacing`, `contrast`, `font-fallback`, `content-stress`, `loading-empty-error`.

Required editorial review IDs: `identity-swap`, `structural-skeleton`, `decision-rationale`.

Screenshot widths: 320, 390, 640, 768, 1024, 1440 CSS px, and one landscape viewport with height ≤500 CSS px. These are the project's coverage policy, not proof of accessibility compliance.

## Paths and source provenance

```sh
node scripts/design-gate.mjs check /path/to/client/design-contract.json --stage design --root /path/to/client
node scripts/design-gate.mjs check /path/to/client/design-contract.json --stage release --root /path/to/client --commit FULL_REVIEWED_SHA
node scripts/design-gate.mjs check /path/to/client/design-contract.json --stage brief --json
```

Paths are relative to `--root`, which defaults to the contract directory. Files must exist, be nonempty and stay inside that directory; absolute paths, URL paths, traversal and escaping symlinks are rejected. Keep private client evidence in the client repository, not this public OS repository.

For release, commit the implementation **before** capture. Name that exact SHA in `qa.commit`. The default expected SHA is the client checkout's HEAD; use `--commit` for a later evidence-only commit. The command verifies that SHA exists and flags supported source file changes since it, including untracked source. Evidence/report files can follow capture; declared artifacts do not establish capture authenticity. The source extension check is a conservative heuristic, not a full build reproducibility system. Include runtime/data/backend checks appropriate to the actual stack in the written report.

Exit codes: `0` = complete at that stage; `1` = missing/invalid requirements; `2` = invalid invocation, unreadable file or source provenance error. JSON mode emits a structured validation report; invocation/provenance errors go to stderr with exit code 2.

## In the client CI

Pin the OS to a reviewed commit rather than assuming a mutable `main` is reproducible. Run the gate alongside the client's real build and tests. Never point the release gate at an example record or fabricate a passing fixture for the client's CI. This repository's own CI tests the validator with temporary fixtures; that is a test of the tool, not a release approval for a client site.
