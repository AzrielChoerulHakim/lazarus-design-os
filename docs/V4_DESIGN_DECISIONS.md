# Direction Room — design decisions

## Evidence and task

The existing repository has seven concept studies, a three-specimen typography tool, written audits and a static integrity check. Those are verified in `concepts/`, `type-lab/`, `docs/ANTI_GENERIC_AUDIT.md` and `scripts/check-atlas.mjs`. The user requests more reliably distinctive Lazarus output. The new interface must let a designer write and compare the decisions, preserve them, and see omissions without pretending to judge artistic quality.

**Thesis:** a working decision sheet exposes the relationship between client evidence and page structure, because a team producing multiple sites needs to see repetition before implementation.

## Seven proposals considered

| Direction | Anatomy and reading grammar | Media / interaction | Cost |
| --- | --- | --- | --- |
| Decision sheet — selected | Task first, editable evidence, selected concept and adjacent review; label/value reading | No illustration; edit, compare, export | Long forms require progressive disclosure |
| Audit queue | Failures first, grouped by severity; diagnostic reading | Open each issue to its source field | Frames invention as compliance before a brief exists |
| Evidence graph | Source nodes connected to decisions; spatial reading | Trace and inspect edges | Difficult on small screens; weak long-text editing |
| Concept matrix | Seven directions aligned by dimension; comparative reading | Select a row, compare columns | Horizontal density harms phone use |
| Narrative notebook | Brief → reasoning → selected design; continuous reading | Annotate a linear document | Hard to compare alternatives without scrolling |
| Step interview | One question at a time; conversational reading | Back/next through decisions | Hides relationships and slows experienced users |
| Build terminal | Commands and generated records; procedural reading | CLI only | Useful for agents but excludes visual review in-browser |

The selected direction keeps a persistent review summary and a separate comparison view; the CLI provides the terminal workflow without making it the only interface. Existing atlas and type tools remain available.

## Typography specimens before UI

Three monochrome specimens use identical verified project copy in `docs/v4-type-specimens.html`: linear reading, compact matrix and working sheet. The working sheet is selected because labels remain adjacent to editable decisions, while long answers wrap naturally. The reading specimen buries cross-field relationships; the matrix is too dense at narrow widths.

System sans is used for controls, prose and headings; a platform monospace is confined to IDs and command syntax. No downloaded font files or font redistribution. Use real bold weights when available and a sans-serif fallback. Body 1rem / 1.65; controls 1rem / 1.5; secondary copy .875rem / 1.5; section headings 1.5rem / 1.2; page title adaptive 2–3.5rem. No decorative uppercase microcopy, forced title line breaks or fixed-height text containers. Reading measure stays around 60–68ch where space allows. All controls wrap; columns become a single flow on mobile. Indonesian/English, punctuation, numeric widths and long terms are included in QA.

## Dominant choices

- Use structured form fields because the contract needs addressable decisions; preserve a plain JSON export for agents.
- Separate blank work from a clearly marked repository example so example copy is not accidentally client evidence.
- Show omissions and duplicate structure with names and reasons; never show a percentage implying originality.
- Use no spectacle or imagery in a reasoning tool. The signature is the live connection from decision to review.
- Store work only in memory; export/import explicitly. Warn before discarding changes. No network transmission or hidden browser persistence.

## Mechanisms studied

The Cullet study's synchronized state informs a shared data model for editor, comparison and review. The Orbit study's readable fallback informs a linear mobile flow. Neither source's art, palette, effects or layout is transplanted. The study notes were read; original source implementations were not used for this feature.

See `docs/V4_REVIEW.md` for actual checks and limits; a completed form does not prove an original website.
