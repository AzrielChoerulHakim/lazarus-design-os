# Direction Room — type specification

**Project:** Lazarus Design OS, Direction Room.
**Reader and task:** designers and coding agents comparing seven structures, recording evidence and transferring a decision record to a client repository.
**Sources:** existing repository tools and audits; the explicitly labeled example in `direction-room/example.mjs` is repository material, not client credentials.
**Languages:** Indonesian interface and bilingual entered content. Long sentences, punctuation, IDs and source paths are included in browser stress tests.
**Reviewed:** 16 November 2026, source `7412879e9926f65b4e34bff563c4b31bbed2c901`.

## Thesis and specimens

Use a working-sheet hierarchy so labels, editable answers and review findings remain close while the reader makes a decision. The tradeoff is a long document, addressed through three task stages rather than smaller type.

The [three monochrome specimens](v4-type-specimens.html) use the same repository copy:

| Specimen | Grammar | Decision |
| --- | --- | --- |
| Linear reading | Continuous prose with a generous reading measure | Rejected: relationships between fields become harder to compare |
| Compact matrix | Aligned labels and tightly grouped information | Rejected: excessive horizontal density on phones |
| Working sheet | Labels adjacent to answers; vertically flowing detail | Selected: supports editing and review; requires progressive disclosure |

No previous client sites were used as a comparison set. The existing atlas and proofing lab are tools with different tasks, not evidence of cross-client distinctiveness.

## Implemented roles

| Role / example | Family | Weight / size | Leading / tracking | Reflow |
| --- | --- | --- | --- | --- |
| Title / “Direction Room.” | System sans | 650; clamp(2rem, 1.35rem + 3vw, 3.5rem) | 1.2 / −.055em | No forced break; wraps when necessary |
| Section / “Tujuh struktur. Satu brief.” | System sans | Bold; 1.5rem | 1.2 / −.025em | Section title up to 26ch |
| Introduction and answers | System sans | 400; 1rem | 1.65 body; 1.5 controls / normal | Introduction 52ch; prose at most 68ch; textareas expand |
| Labels and metadata | System sans | 650 labels, 400 hints; .875rem | 1.5–1.6 / normal | Wrap, no fixed-height text clipping |
| Navigation and buttons | System sans | 400/650; .875–1rem | 1.5 / normal | Minimum 2.75rem control height; multiline controls |
| IDs / “F1”; command syntax | Local monospace | IDs 600 at 1rem; command .875rem | 1.5 IDs / normal | Commands wrap; no unnecessary code scrolling |
| Review title | System sans | 500; 1.65rem | 1.2 / −.025em | 14ch desktop limit removed on phones |

Font stack: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`; IDs use `ui-monospace, monospace`. No font files are downloaded, hosted or redistributed. Rendering uses fonts supplied by the viewer's platform. Missing named faces fall through to generic families; platform metrics vary. No custom font license is asserted. Numeric information is counts and IDs, not a financial table; tabular numeral features are not requested. No special italic or optical-size setting is required.

The document uses one h1, section h2 and subsection h3. Form labels are semantic labels; DOM reading order follows the editing task. No automatic uppercase transform, manual title line break or rasterized text is used. The matrix is intentionally a horizontally scrollable table on narrow screens; ordinary prose and the page remain vertically readable.

## Actual proofing and remaining work

The [review report](V4_REVIEW.md) links all retained evidence. Chromium checks pass at 320, 390, 640, 768, 1024 and 1440px plus 844×390 landscape, including long content, spacing overrides and reduced motion. Desktop and mobile screenshots were visually inspected. The main opaque text color pairs exceed 4.5:1.

Synthetic doubled text on the brief panel passes; native 200% browser zoom remains unverified. No web-font failure path exists because no web font is requested; generic fallback on other operating systems was not individually rendered. Independent reading feedback, screen-reader review and physical-device testing remain outstanding. Therefore the full client typography release checklist is **not yet completely verified**; the recorded result is the narrower tooling QA above.
