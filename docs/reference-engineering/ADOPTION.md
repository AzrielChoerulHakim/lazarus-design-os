# Client adoption guide

This is an **additive, nonbreaking** overlay for Lazarus Design OS v4. It replaces the existing `.github/skills/lazarus-reference-atlas/SKILL.md` **in place** and introduces new files. No core Design OS schema is changed. The mechanism skill remains discoverable via the existing reference skill name.

## Copy to Lazarus Design OS repo root

The ZIP contains repository-root-relative paths; extract at the root, inspect the differences and commit yourself. It contains **no** original reference-prototype source or media. Source file hashes are documentation, not license grants. Keep original author rights and permissions separate.

## Quick start

```sh
# From lazarus-design-os repository root (Node >=22)
node scripts/reference-engineering.mjs registry-check
node scripts/reference-engineering.mjs catalog
node scripts/reference-engineering.mjs suggest --jobs show-chronology --evidence verified-chronology
node --test tests/reference-engineering.test.mjs

# Create a companion decision record in an actual client repo
node scripts/reference-engineering.mjs init /path/to/client/reference-engineering-plan.json
node scripts/reference-engineering.mjs check /path/to/client/reference-engineering-plan.json --stage decision
node scripts/reference-engineering.mjs check /path/to/client/reference-engineering-plan.json --stage release --root /path/to/client
```

To test the two independent teaching demonstrations, from **OS root** run `python3 -m http.server 8000` and open `/examples/synchronized-evidence/` or `/examples/scroll-coordination/`. Both contain explicitly fictional demonstration text; never ship them unchanged to a client.

## Decision record shape

The initializer intentionally creates **blank fields**. Populate the JSON from real client evidence. Example below explains the shape, **not actual client facts**:

```json
{
  "schemaVersion": 1,
  "noMechanismReason": "",
  "project": {
    "name": "Client working title",
    "audience": "Who reads this site and why",
    "goal": "Main reading / decision task",
    "readerJobs": ["show-chronology"],
    "constraints": "Budget mobile, static host, limited motion"
  },
  "evidence": [
    {
      "id": "F1",
      "claim": "Actual verified fact to be completed from source",
      "source": "Actual CV/work sample and location",
      "status": "verified",
      "tags": ["verified-chronology"]
    }
  ],
  "selections": [
    {
      "mechanismId": "chronology-state",
      "sourceBasis": "notes-only",
      "why": "Why this verified chronology needs synchronized navigation",
      "audienceBenefit": "How the real audience benefits from accurate selected dates",
      "evidenceIds": ["F1"],
      "implementation": "Canonical sorted data drives semantic list and active context",
      "fallback": "Complete linear dated document list without JS or animations",
      "nonTransferable": ["Indigo orbit interface", "Circular historical-layout silhouette"],
      "motionJustification": "Selection transitions are optional"
    }
  ],
  "rejectedAlternatives": [{"mechanismId": "progressive-chapter", "reason": "A pinned narrative adds unnecessary traversal"}],
  "qa": {"reviewedCommit": "", "environment": "", "checks": []}
}
```

For release, `qa.reviewedCommit` must be a 40-character source SHA; `qa.environment` describes actual test conditions. `qa.checks` contains one entry per universal and selected-mechanism QA ID:

```json
{
  "id": "keyboard",
  "status": "pass",
  "evidencePath": "qa/reference/keyboard-observation.md",
  "notes": "Observed keyboard traversal on the actual browser and recorded the result."
}
```

Supply `--root` explicitly for `release`. Every declared evidence file must exist, be nonempty and stay within the client root. An existence check does not prove the observation was performed. Replace all illustrative copy before asserting a real `pass`.

## CI integration (optional after review)

Add to the client repository's existing quality workflow **after** the standard `design-gate.mjs` checks and site build:

```sh
node /path/to/lazarus-design-os/scripts/reference-engineering.mjs check \
  ./reference-engineering-plan.json --stage release --root .
```

A `decision` stage is useful before implementation. The main OS `brief`, `design`, `release`, typography, mobile and originality reviews remain mandatory. No automatic merging with `design-contract.json` has been attempted; such a change needs a tested schema migration.

## Portable interfaces

Use `lib/scroll-progress.mjs` only when scroll-driven reading is genuinely helpful; it does **not** implement pinning or source-specific layout. No dependency is required. `stageProgress(rect, viewportHeight)` and `activePhase(progress, count)` are pure functions, while `observeStageProgress` registers one passive/coalesced scroll observer and returns a cleanup function. It does not replace proper semantic HTML, mobile reflow or reduced-motion work.

## Deliberate zero-mechanism outcome

If a client's best solution is a straightforward semantic profile, you may record `selections: []` and a specific `noMechanismReason` of at least 20 characters. Provide the actual reader job, verified evidence and at least one rejected alternative. The optional companion `release` check still requires universal truth, rights, mobile and accessibility evidence. Do not force an animation just to make use of the catalog.
