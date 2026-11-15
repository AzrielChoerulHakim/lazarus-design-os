# Lazarus Typography Direction System
**Version 1 · 2026-11-15 · Normative for Lazarus client-design work**

> Typography is the interface through which a person understands the client. It is not a font-selection ceremony, an oversized headline, or a style applied after layout.

Read this alongside DESIGN.md, APPLE_CRAFT_STANDARD.md and TYPOGRAPHY_QA.md. The rules below are design decisions and verification habits, **not** a universal CSS theme. A bold cartographic site, archival legal dossier, comic storybook and minimalist scientific index must not inherit the same type scale, fonts, spacing, sentence structure, or punctuation. Apple is a standard of craft, not a style preset.

## 1. What we learned from Apple — and what transfers to the web

**Transfer the reasoning:** Apple describes a hierarchy of text styles rather than isolated font sizes; its San Francisco and New York families use size-sensitive optical treatments; accessibility text sizing can require a layout change rather than merely shrinking or clipping text. Legibility, continuity and linguistic coverage are essential. Sources: [Apple Typography](https://developer.apple.com/design/human-interface-guidelines/typography), [Apple Fonts](https://developer.apple.com/fonts/), [Apple design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles/).

**Do not transplant:** SF Pro/New York binary font files; Apple's proprietary font distribution; Apple's wordmarks, system-wide type metrics, Apple.com hero anatomy, default blue action, or iOS text-style sizes as web-wide rules. Use the system font stack when appropriate; it is not automatically superior for an artist or book-led brand. Native point dimensions and browser CSS pixels are **not interchangeable**. Apple's design tips give 11 pt and 44 pt native guidance, **not** a rule that 11 CSS px body text is suitable for the web.

For web accessibility, use WCAG directly: [WCAG 2.2 1.4.3 contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), [1.4.4 resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text), [1.4.10 reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow), and [1.4.12 text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing). Consult the actual success criteria, not a community skill as regulatory authority.

## 2. Start with reading tasks, not a font catalogue

Before choosing a typeface, record:
- **Reader and purpose:** recruiter scanning work history; customer finding a price; legal researcher reading a 2,000-word argument; visitor browsing visual artifacts; parent following an illustrated story. Which task must be possible in ten seconds? Which needs uninterrupted reading?
- **Content inventory:** authentic headings, longest occupation/organization name, actual paragraphs, dates, acronyms, numbers, lists, tables, navigation and button labels. No lorem ipsum. Unknown personal facts stay missing.
- **Tone as a functional hypothesis:** reassuring, forensic, playful, ceremonial, exploratory, technical — chosen from client evidence and audience, never from a default "premium minimal" prompt.
- **Languages and scripts:** Bahasa Indonesia, English, proper names, punctuation, accents, numbers, all intended scripts and font fallback coverage.
- **Density and surface:** long-form reading, compact dashboard, work gallery, mobile landing, storybook, official document, high-density archive. The same 80px hero will not serve each.

**Required output:** a one-sentence *typographic thesis*. Example: "The court-administration portfolio uses restrained document labels and readable evidence records because hiring readers need to verify work without deciphering a visual metaphor." This is an illustrative hypothesis; never turn it into an assumed style for all legal clients.

## 3. Explore three typographic grammars inside the seven structural concepts

For each of the seven design directions, specify its own typographic **grammar**, not merely a font name:
1. What content leads: name, proof, task, time, publication, artifact, or question?
2. How does text occupy space: annotated dossier, inline index, long reading column, diagram labels, split narrative, or captioned images?
3. How do people traverse it: scan, read continuously, filter, compare, expand, or follow a chronology?
4. What is the relationship of display to body: quiet, abrupt, subtle, contrasting, or none?
5. What is the **reason** for the choices and the **failure risk** (e.g. long names, mobile density, poor fallback)?
6. What **type habit** would make this direction indistinguishable from other Lazarus sites? Remove or defend it.

Within the final selected direction, prepare **at least three quick typography-only specimens** before full styling: (A) content-neutral / restrained, (B) voice-led, (C) task-density-led. They may share a font when justified. Compare with the same exact real text, grayscale, and **without photography, shadows, or brand colors**. Pick based on audience comprehension, tone and reading performance; do not automatically select the most dramatic.

The three specimens are not three production themes, and seven concepts are not seven typography presets. Distinctness must survive a font replacement test: if changing fonts alone makes two concepts the same, the information architecture is not yet distinct.

## 4. Treat every text role as a designed component

Create a role inventory, using semantic names, not "font-size-20":

| Role | Purpose / content test | Variables to specify |
|---|---|---|
| Hero / primary claim | First fact or task; readable without relying on a photo | Family, weight, optical size, max measure, line breaks, responsive scale |
| Page title | Identifies current page / work | Distinction from hero, semantics, reflow |
| Section heading | Communicates change in subject | Level, spacing above/below, scan path |
| Lead / summary | Bridges title and content | Width, weight, line-height, tone |
| Body / long reading | Carries verifiable substance | Character measure, leading, paragraph spacing, font coverage |
| Evidence / metadata | Employer, date, source, version | Contrast, numeric alignment, legibility, label meaning |
| Caption / annotation | Explains authentic work | Proximity, leading, relation to media, source |
| Controls | Navigation, labels, CTAs | Short copy, wrapping, hit area, active/focus states |
| Tables / number-heavy | Financial/legal/technical data | Tabular figures when useful, units, column alignment, responsive alternative |

Do not enforce a universal ratio between roles. Use fewer roles when the brief is sparse; don't invent micro-labels to fill an imagined style sheet. If a role has no information job, delete it.

## 5. Choose typefaces as tools

Evaluate candidate fonts **on actual client content**, including the longest names, uppercase/lowercase, numbers and punctuation:
- **Character:** does letterform personality clarify the specific client, or is it an aesthetic cliché?
- **Legibility:** x-height, counters, distinguishing I/l/1/0/O, weight at 14–18 CSS px, small-size behavior.
- **Language:** glyphs for Indonesian + English + names, currency, citations, mathematical characters as required.
- **Functional features:** real italics, tabular figures, localized forms, variable axes, optical size if supported.
- **Runtime:** actual font file size, fallback metric shift, subset strategy, loading behavior, CORS, connection failures.
- **Rights:** foundry/license, permitted web embedding, attribution if required; system stack needs no redistributed binary. Do not redistribute Apple font files without authorization.

A one-family type system can be better than a fashionable sans+serif pairing. A second family requires a distinct semantic job. Avoid using monospaced tiny uppercase labels as the universal marker of seriousness.

## 6. Typeset — do not merely enlarge

### Measures, rhythm, weight and tracking
- Start long-form text around **45–75 characters per line** as a **review heuristic**, not a universal standard; adapt to language, typeface and available width. Test paragraph lengths people will actually read.
- Body copy generally benefits from enough leading to track successive lines. Try **1.45–1.7** as a **design starting range**, not a WCAG mandate; evaluate font metrics and content. Short display lines may need tighter leading but should never collide.
- Body text for normal desktop/mobile reading often starts around **16–18 CSS px**; this is a Lazarus starting hypothesis, not an official Apple or WCAG minimum. Secondary essential content should remain comfortably legible. Requiring 8–11 CSS px for meaningful labels is an **audit warning**.
- Use weight differences for semantic hierarchy before multiplying sizes. Check whether "bold" is too heavy at small sizes; verify optical alignment of mixed weights.
- Tight tracking is **not** a global sophistication token. Audit negative letter spacing at large sizes (especially beyond ~−0.04em) for collisions and weird word shapes; avoid it on small text by default. Looser uppercase tracking can aid a small label, but uppercase metadata is not mandatory.
- Test optical spacing around punctuation, slash/arrow, numerals and section rules. Do not mask broken glyph metrics with visual decorations.
- Use **intentional line breaks only where content supports them**. At 320px, long employer names, German/Indonesian compounds and dates must reflow naturally. Never insert irreversible HTML breaks to mimic one screenshot.
- Keep descriptive headings specific. "Precision in practice" or "Designed to inspire" cannot substitute for a real role or verifiable result.

### CSS example — illustrative only; NOT the Lazarus universal theme

    :root {
      --font-reading: system-ui, sans-serif;
      --measure-reading: 64ch;
    }
    body { font-family: var(--font-reading); font-size: 1rem; }
    .reading { max-inline-size: min(100%, var(--measure-reading)); line-height: 1.6; }
    .page-title { font-size: clamp(2rem, 1.35rem + 2.4vw, 4.25rem); line-height: 1.07; }
    .page-title { overflow-wrap: break-word; }
    @supports (text-wrap: balance) { .page-title { text-wrap: balance; } }
    @media (max-width: 38rem) { .article-layout { grid-template-columns: minmax(0, 1fr); } }

This is an *adaptive concept*, not a copy-paste recommendation. Test zoom: responsive \`clamp()\` can still harm enlargement if its minimum/maximum or viewport term constrains growth. Use \`font-optical-sizing: auto\` only if the selected font actually supports optical sizing. Use \`font-variant-numeric: tabular-nums\` selectively for aligned tables, not for a general prose identity. Keep meaningful text as HTML, not SVG outlines or screenshots.

## 7. Structure for accessibility, not for a perfect mockup

- Keep semantic heading order; CSS appearance does not define h1/h2 meaning.
- At **200% text enlargement**, no content/functionality loss (WCAG 1.4.4). Test browser zoom plus text-only resizing if supported.
- At **320 CSS px equivalent reflow** (often tested by 1280px viewport at 400% zoom), avoid two-dimensional reading for ordinary content (WCAG 1.4.10). Maps, tables and true 2-D diagrams have limited exceptions; provide usable alternatives.
- For WCAG 1.4.12, users must be able to override to line-height 1.5, paragraph spacing 2em, letter-spacing 0.12em, word-spacing 0.16em **without loss of information**. **Do not claim authors must use those exact spacing values by default.**
- Check WCAG AA contrast: **4.5:1 for normal text**; **3:1 for large text** as defined by WCAG, including bold-size threshold. Don't treat Apple's 11 pt guidance as equivalent to CSS px.
- Don't truncate dates, employers, credentials or CTA labels merely to preserve the composition. If a line can't fit, change the layout; don't shrink text below a legible size.
- Interactive text should remain readable in hover, focus, selected, disabled and error states. 44px targets are a useful touch design target, not a universal translation of Apple's native 44 pt rule.

## 8. A client-specific typographic review is a release gate

**Before coding:** commit a completed [Type Spec](../templates/TYPE_SPEC.md). It must include three type specimens using the same real copy, chosen rationale, and rejected alternatives.

**During coding:** inspect rendered text at 320, 390, 640, 768, 1024, 1440 CSS px; short viewport and real content length; loading and missing-font fallback. Compare screenshot **at the same viewport and commit SHA**.

**Before release:** follow [Typography QA](TYPOGRAPHY_QA.md), including browser zoom, 320px reflow, user text-spacing overrides, contrast, keyboard controls, language coverage, and mobile crops. Save evidence and record unresolved problems in the review report. A green build is not a legibility assessment.

### Non-negotiable blockers
Essential text clipped, overlapping, unreadably tiny, artificially ellipsized without a full alternative, or unavailable at 200% resize; contrast below applicable requirements; font rights unclear; core words lost on font failure; unreadable navigation; text presented as an unselectable image where native text is appropriate.

### Recurring anti-generic typography failures to call out by name
- Oversized serif headline + one "premium" sans applied indiscriminately.
- Monospace 9px all-caps eyebrow on every section.
- \`letter-spacing:-.08em\` across all displays without optical checks.
- Random italics and line breaks to manufacture editorial character.
- Every concept has a massive hero and identical centered subhead.
- Pale gray body text for atmosphere at the expense of readability.
- Fake statistics, captions, citations and labels as decorative filler.
- "Minimal" page that conceals the actual work or forces users into decorative scrolling.

These are **contextual warnings**, not universal bans. One expressive display may be exactly right when it is warranted and typeset with care.

## 9. Approval protocol

The typographic director must be able to answer, for each prominent choice:
**choice → observed client evidence → reader task → alternative considered → drawback → tested viewport**.

If this chain is incomplete, mark it as a hypothesis or change it. Obtain independent reading feedback whenever possible, preferably without showing the candidate fonts' names or design rationale. Never report originality or "Apple quality" as scientifically verified from a screenshot alone.

## Sources and scope

- Apple: [Typography](https://developer.apple.com/design/human-interface-guidelines/typography), [Fonts](https://developer.apple.com/fonts/), [Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles/), [UI design tips](https://developer.apple.com/design/tips/). This is Apple-platform guidance interpreted for original websites, **not** official Apple web standards.
- W3C: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), especially 1.4.3, 1.4.4, 1.4.10 and 1.4.12.
- Lazarus-specific numeric ranges and comparisons above are **working heuristics** pending project-specific rendered verification, not Apple requirements or externally validated universal benchmarks.
