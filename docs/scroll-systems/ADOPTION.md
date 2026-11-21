# Using Lazarus Scroll Director in a client repository

Requires **Node 22+** and access to the Design OS repository; the scripts operate on local JSON and don't fetch, alter or deploy client websites.

## Phase A — choose

```sh
node scripts/scroll-director.mjs registry-check
node scripts/scroll-director.mjs catalog
node scripts/scroll-director.mjs recommend \
  --jobs explore-portfolio,compare-artifacts \
  --evidence licensed-media,verified-sections
node scripts/scroll-director.mjs init /client/scroll-plan.json
```

`recommend` is a non-prescriptive tag match. `missingEvidence` means the effect has not been justified; it is **not** a suggestion to invent source data. Choose no more than two total, at most one dominant, and maintain a maximum of two high-salience mechanisms across **both** Reference Engineering and Scroll Director.

## Phase B — record a decision

A valid selection object needs:

```json
{
  "systemId": "sticky-evidence-exchange",
  "why": "Actual evidence stages require a persistent spatial comparison.",
  "readerBenefit": "Readers can compare stage-specific findings without losing the illustration.",
  "implementation": "Semantic steps plus CSS sticky illustration and one IntersectionObserver.",
  "stateSource": "The verified ordered section IDs inside the evidence chapter.",
  "sourceBasis": "docs-reviewed",
  "sourceDescription": "",
  "evidenceIds": ["source-01"],
  "nonTransferable": ["demo palette", "source layout and illustration style"],
  "rejectionConsidered": "No prolonged pinned stage and no 3D animation; neither aids comparison.",
  "fallback": {
    "noJs": "All steps show their complete evidence and accessible figure captions.",
    "reducedMotion": "Sticky illustration becomes a static figure preceding each narrative step.",
    "mobile": "The illustration is inline above the relevant passage at 320 and 390 pixels."
  }
}
```

Evidence example: `{ "id": "source-01", "claim": "...", "source": "CV page X / client file / genuine media", "status": "verified", "tags": ["verified-evidence", "verified-sections"] }`. A project must define `project.name`, `project.audience`, `project.readerJobs`, `project.constraints` and `project.baseline: "semantic-document"`. Add at least one rejected alternative with a concrete reason. For zero scroll effects, leave selections empty and add a substantial `noScrollReason`.

Check before implementation:

```sh
node scripts/scroll-director.mjs check /client/scroll-plan.json --stage decision
node scripts/scroll-director.mjs check /client/scroll-plan.json --stage decision --reference-plan /client/reference-engineering-plan.json
```

The second form enforces a **combined count <=2**. If one plan conceptually duplicates the other, record it only once rather than treating overlapping entries as two independent patterns. `sourceBasis` must say `docs-reviewed` unless a specific authorized reference implementation was actually inspected; then use `authorized-implementation-inspected` and identify it.

## Phase C — release

Fill `qa.reviewedCommit` with actual seven-to-forty-character commit SHA; `qa.environment` with tested browsers/device context; and every `qa.checks` item as `{ "id": "mobile-320", "status": "pass", "evidencePath": "qa/mobile/section01-320.png" }`. Each passed check needs a real nonempty file *inside the client root*, never a URL, bare assertion or symlink outside it. Required IDs are the universal `COMMON_CHECKS` plus each selected pattern's registry `qa` array.

```sh
node scripts/scroll-director.mjs check /client/scroll-plan.json \
  --stage release --root /client \
  --reference-plan /client/reference-engineering-plan.json
```

Do not mark tests as passing when not run. A syntactically valid plan is not itself verified browser QA. The scroll plan is a companion record to `design-contract.json`, not a replacement for its existing brief/design/release gates.
