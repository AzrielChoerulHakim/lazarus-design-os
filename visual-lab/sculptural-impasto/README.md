# Sculptural Impasto — Visual Mapping Lab

**Purpose:** compare three independent page layouts using **the same text and the same selected painting**. The researcher may change painting separately from layout. This is the missing painting→website mapping layer, not a change to the existing Design OS release process.

## Try it

Serve from the repository root:

    python3 -m http.server 8000

Open http://localhost:8000/visual-lab/sculptural-impasto/ and select Gallery, Folio, or Passage. Switch the Painting Master dropdown to compare one composition against another while preserving the layout. Keyboard: arrow/Home/End on the three layout tabs.

### Layout anatomy

- **A / Gallery:** a balanced title/painting diptych, independent three-study register and short ending. Larger artwork focus; risk is insufficient real evidence.
- **B / Folio:** numbered research index, separate full-size plate and textual description. Index-first; risk is that an illustrative painting could be mistaken for real built projects.
- **C / Passage:** a slow editorial thesis, uninterrupted standalone image, then three reading chapters. Strong narrative; risk is that urgent client projects become difficult to find.

These are *structural experiments with fictional content*, not three client sites or replacements for the mandated seven client-specific concept proposals.

## Raster asset status — critical

Three generated full-resolution original painting studies are **1536×1024 PNG** in the user's delivered artifact bundle. The images currently checked into GitHub under assets/ were transferred through a connector exposing **200×133 thumbnails**. They are complete single raster scenes, but **not** high-quality master paintings. They are intentionally marked **preview-only**, cannot prove impasto surface detail, and must **not** be approved or reused in production. The user can swap in original-quality WebP at the same file paths without changing layout code.

See [master image specification](../../visual-directions/01-sculptural-impasto/COMPOSITION_MAPPING.md) and [Visual QA](../../visual-directions/01-sculptural-impasto/VISUAL_QA.md).

## Invariants

- One complete raster image per scene; image's true painting shadows are never rebuilt using SVG, DOM cutouts, CSS filters, or multi-layer art.
- Typography and active controls remain DOM elements outside the painting.
- Mobile artwork may be reauthored as a whole; never assembled from pieces.
- Artwork is not fabricated work experience or a client testimonial.
- Tone of Voice, Typography and Anti-Generic flow remain under the *existing* Design OS authorities.

## QA

Run static checks with:

    node --test tests/sculptural-impasto-mapping.test.mjs

Browser check, if Playwright and Chromium are available:

    node scripts/check-sculptural-impasto-browser.mjs

The GitHub Action scoped to this experimental branch also runs existing Design OS tests. It captures screenshots at 320, 390, 640, 768, 1024, 1440 and short landscape. **A green automated run does not certify art direction or original asset resolution.**