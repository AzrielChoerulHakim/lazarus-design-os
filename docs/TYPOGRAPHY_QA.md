# Typography QA — test the rendered type, not the font list

**Mandatory after choosing a concept and again before release.** This is a reproducible review process; an automated count of CSS pixels cannot prove beautiful or readable typography.

## Input and provenance
Record the client content version, exact Git commit SHA, screenshot location, browser name/version, operating system, viewport, zoom and font loading state. If a screenshot comes from another commit, the evidence is **invalid for this release**.

### Specimen content set (replace examples with true project text)
- The actual client name / organization name and its longest variation.
- The actual page title, one complex heading, and a 100–150-word authentic paragraph.
- Longest role, project, employer, publication title, department and URL.
- Mixed capitalization and scripts, accents and punctuation, long dates, decimal figures, prices/currency if relevant.
- Navigation labels, form labels, button names, caption/source lines.
- Fallback text when custom fonts fail.
- A realistic empty state and a realistic error/warning, when the product has them.

Never invent credentials or client quotes just to complete this test.

## Test matrix

| Situation | Expected observation | Release rule |
|---|---|---|
| Desktop 1440 and 1024 CSS px | Immediate scan path; clear hierarchy; lines not too long | Review |
| Tablet 768 and intermediate 640 CSS px | Logical columns, no collisions, natural wrap | Review |
| Mobile 390 and 320 CSS px | Actual words visible; touch/keyboard controls legible | Review |
| Short viewport / landscape | No essential titles or controls covered by fixed/sticky objects | Review |
| 200% browser/text resize | No information or functionality lost; text remains readable | WCAG 1.4.4 gate |
| 320px equivalent reflow; e.g. 1280px @ 400% | Ordinary reading does not require horizontal + vertical scrolling | WCAG 1.4.10 gate |
| User text spacing overrides | 1.5 line-height, 2em paragraph margin, .12em letter and .16em word spacing cause no loss | WCAG 1.4.12 gate |
| Contrast in every state | >=4.5:1 normal, >=3:1 large text as defined by WCAG | WCAG 1.4.3 gate |
| Keyboard + focus; hover/selected/error | States remain readable, focus does not hide text | Gate if essential |
| Slow network / fonts blocked | No critical layout shift causing content loss; readable fallback; no indefinite blank text | Review |
| Alternate language/content extremes | Missing glyphs, broken punctuation, unbreakable names? | Gate if essential |
| Reduced motion | Meaning survives without animated text sequence | Gate if essential |

### How to test the text spacing override

In browser developer tools add temporary CSS **to the whole page**, not only one paragraph:

    * {
      line-height: 1.5 !important;
      letter-spacing: 0.12em !important;
      word-spacing: 0.16em !important;
    }
    p { margin-bottom: 2em !important; }

Then repeat critical tasks. This is an **override robustness test**, not a recommended normal visual style. For WCAG 1.4.12 verify equivalent values with the actual font size and context.

### What to capture from computed styles

For samples of heading, lead, body, data table, caption, navigation and CTA:
- computed font family and whether the intended face loaded
- weight, font size (CSS px), line-height, letter-spacing
- foreground/background and calculated contrast
- text container width and approximate characters per line
- line count, text clipping/ellipsis, visual relation to adjacent media
- bounding boxes, focus visibility, layout change with zoom
- subjective optical spacing, weird word shapes, rag quality, unnatural orphans, faux bold/italic

A CSS/Playwright report can **flag candidates for visual inspection**; it cannot automatically certify a good typeface, authorial style, or "Apple-level craft." Avoid false-positive absolute size bans when content is genuinely decorative.

## Review questions

1. **Hierarchy test:** without photos or colors, can three readers identify the actual topic and next useful action in 5–10 seconds?
2. **Name swap:** could another client replace the name with no structural change? Where is the original professional evidence?
3. **Monotony:** are all seven concept specimens the same sans-plus-italic-serif headline dressed differently?
4. **Body endurance:** can a reader finish several authentic paragraphs without compressed lines, extremely wide measures, pale gray text or awkward reflow?
5. **Redundancy:** how many small all-caps labels can be deleted without information loss?
6. **Font failure:** does the site work without webfonts? Did line breaks or controls collapse?
7. **Numbers/language:** do tabular data, international punctuation and diacritics render accurately?
8. **Narrative:** does the chosen type composition help read the client's actual work, or stage an invented personality?

## Status vocabulary

- **PASS (observed):** environment + screenshot/path + specific result recorded.
- **FAIL (observed):** specific break, state and affected text cited; blocking status indicated.
- **NOT TESTED:** tool/device/content not available; never reported as passed.
- **NEEDS JUDGMENT:** artistic/optical concern requiring human comparison, not a numeric verdict.

If essential text fails contrast/resize/reflow or source rights are missing, **do not ship**. Artistic originality requires independent review and cannot be declared proven by CI. Record one chosen type direction and the rejected ones in DESIGN_DECISIONS.md and TYPE_SPEC.md.
