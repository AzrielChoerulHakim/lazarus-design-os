# V4 implementation review

Reviewed 16 November 2026. This is a review of the Design OS tooling, not a claim that any future client website is original.

**Tested source:** `7412879e9926f65b4e34bff563c4b31bbed2c901`.
**Automated run:** [Verify Design OS, run 43806919123](https://github.com/AzrielChoerulHakim/lazarus-design-os/actions/runs/43806919123), completed successfully.
**Environment:** Ubuntu 24.04, Node 22, Playwright 1.56.1, Chromium 141.0.7390.37.

The subsequent documentation and evidence commit changes no application source. The complete capture set is in the run's `design-os-browser-evidence` artifact (SHA-256 `2bec69d413067ce23b07f64c3098bfb516f930704d79db28967492aa9483f01c`). Selected captures and reports are retained in [qa/v4](../qa/v4/) because Actions artifacts expire.

## What changed and why

The repository previously explained the standard through documents and studies. V4 adds an editable decision record and checks that expose missing evidence and duplicated structures before implementation. The goal is to make the standard usable on every client project.

- Direction Room connects verified facts, seven proposals, a selected direction and its rationale. It imports and exports the same JSON used by the command-line checks.
- Brief, design and release checks have different requirements. A release record must identify a reviewed source commit and local QA artifacts; an ordinary successful build is insufficient.
- The Originality Protocol explicitly addresses content, imagery, page structure, interaction and comparison with previous work. The studio's own surrealist branding is not a client preset.
- The tool never produces a percentage or certification of originality. Exact normalized structural duplicates are detectable; semantic similarity and quality require rendered review.

## Recorded verification

| Area | Result | Evidence / scope |
| --- | --- | --- |
| Static repository integrity | Pass | `node scripts/check-atlas.mjs` in the run |
| Contract and CLI regressions | 13 tests pass | `node --test tests/design-contract.test.mjs`; malformed data, unverified references, duplicate structures, stage requirements, import paths, overwrite prevention, symlink escapes and source provenance |
| Direction Room layouts | Pass | Three panels at 320×900, 390×844, 640×900, 768×1024, 1024×768, 1440×900 and 844×390; no document overflow in the tested states |
| Long content and spacing | Pass | Long entries and user text-spacing overrides at every viewport; textareas expand and remain manually resizable |
| Controls and data | Pass | Edit, add/remove, select, lossless JSON import/export, invalid-import preservation, unsaved-replacement cancellation, literal rendering of hostile-looking text, no hidden persistence |
| Keyboard and touch | Pass within scope | Seven-concept tab arrow/Home/End navigation and visible focus; Chromium touch emulation |
| Reduced motion | Pass | Reduced-motion mode disables smooth scrolling; no essential animation |
| Enlarged text | Synthetic stress test passes | Text doubled at a narrow viewport on the brief panel; this is **not** native browser zoom |
| Type Lab and catalogue | Pass | Existing proofing controls, three same-copy specimens and six viewport widths; no horizontal page overflow |
| Visual inspection | Reviewed | Desktop decision panel, mobile 320/390 layouts and doubled-text capture inspected; hierarchy, wrapping, focus and control boundaries checked |

Reports: [Direction Room JSON](../qa/v4/direction-room-report.json) and [Type Lab JSON](../qa/v4/type-lab-report.json). Captures: [desktop](../qa/v4/desktop.jpg), [320px](../qa/v4/mobile-320.png), [390px](../qa/v4/mobile-390.png), [doubled text](../qa/v4/text-200.png).

## Contrast and typography

Opaque sRGB color pairs calculated from the CSS:

| Text / background | Ratio |
| --- | ---: |
| Ink `#101b29` / paper `#e4ebf3` | 14.43:1 |
| Muted `#46586a` / paper | 6.10:1 |
| Muted / sheet `#f7f9fc` | 6.95:1 |
| Blue `#1848e5` / sheet | 6.43:1 |
| White / blue | 6.78:1 |
| Review secondary `#c4d0de` / ink | 11.09:1 |
| Lime `#d5fd3b` / ink | 14.82:1 |
| Remove action `#6f2a26` / sheet | 9.78:1 |

These pairs exceed 4.5:1. This is not an audit of every rendered state or non-text boundary. See the [filled type specification](V4_TYPE_SPEC.md) for roles, font handling and remaining checks.

## Defects corrected during review

| Observed problem | Cause | Correction / subsequent evidence |
| --- | --- | --- |
| Imported content assertion raced the file reader | Browser test continued before asynchronous parsing completed | Await the resulting notice; complete browser run passes |
| Long evidence text needed unnecessary internal scrolling | Fixed minimum textarea sizing did not grow with content | Content-based field sizing with manual resize retained; long-content checks pass |
| File buttons wrapped poorly with enlarged text | Intrinsic flex sizing had no useful wrapping basis | Flexible 7.5em basis on small screens; doubled-text capture inspected |
| Nested contract roots could misresolve changed source paths | Git paths and artifact paths used different roots | Resolve the actual repository root; nested-root regression passes |
| An HTML application file cited as evidence could evade provenance checks | Artifact exclusions were too broad | Restrict exclusions to report/media formats; regression rejects changed HTML source |

## Boundaries of the result

- Native browser zoom, physical devices, Safari/Firefox, a screen reader and platform-by-platform font fallback were not verified. Synthetic enlargement and touch emulation are explicitly narrower checks.
- No independent blind design review or previous-client comparison was performed. The seven proposals and rationale are documented in [V4_DESIGN_DECISIONS.md](V4_DESIGN_DECISIONS.md); they do not substitute for client feedback.
- Artifact existence and recorded statuses do not prove a truthful screenshot or review. Source detection is extension-based, not a complete dependency graph; application data must not be mislabeled as QA evidence.
- No full accessibility or performance certification is claimed. The repository-wide client release checklist still requires the outstanding checks for each actual client build.

## Reproduce

Use Node 22 and the pinned browser package:

```sh
node scripts/check-atlas.mjs
node --test tests/design-contract.test.mjs
npm install --no-save --no-audit --no-fund playwright@1.56.1
npx playwright install --with-deps chromium
node scripts/check-type-lab-browser.mjs
node scripts/check-direction-room-browser.mjs
```

The browser scripts start a local test server by default, or accept an existing preview URL through `LAZARUS_BASE_URL`. Screenshots are written to `screenshots/`; check the rendered evidence as well as the command exit status.
