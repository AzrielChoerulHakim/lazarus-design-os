# Responsive Painting Mapping — independent composition

**Rule:** responsive art direction is not desktop image zoom. The user explicitly rejects layered scene construction. Preserve one complete image and independent interface components.

## Breakpoint decisions

| Canvas width | Editorial layout | Artwork | Test |
| --- | --- | --- | --- |
| 1440+ | Chosen asymmetrical, multi-column or sequential grammar | Whole painting with deliberate surrounding space | Read art direction against reference and text scan path |
| 1024 | Maintain grammar if reading still works, otherwise collapse | One intact art figure | No overlap; focus and text still visible |
| 768 | Two-column only where meaningful | Preserve dominant paradox, avoid focal crop | Headline measures and navigation |
| 640 | Section-first reading order | Whole image below/beside text as authored | Strong contrast, no clipping |
| 390 / 320 | Single-column, actual content order | Prefer full-bleed *framed* single scene, object-fit contain; optional separately authored complete phone painting | Every section; 200% text, controls, image alt, narrow height |
| Short landscape | Reading/controls remain reachable without forced height | Intrinsic aspect-ratio | No scroll trap |

## Mobile decision hierarchy

1. Keep critical client identity, role, primary link and verified project evidence readable.
2. Preserve the surreal paradox in one image; if its subject is too small, brief a separately composed **full mobile painting**.
3. Place copy outside the image when relief detail is high.
4. Avoid hard-coded viewport-height heros and sticky copy over artwork.
5. Evaluate each actual section, not only overall horizontal overflow.
6. Use existing [Mobile Visual Integrity](../../docs/MOBILE_VISUAL_INTEGRITY.md) as the release authority.

## Raster delivery

Save full-quality, provenance-tracked masters separately. Export optimized WebP (or AVIF with validated fallbacks) in independently authored desktop/mobile versions where justified. Keep accessible alt text. Report actual native dimensions, file size and screenshot render tests. Browser-only enlargement of a tiny transferred thumbnail is **not** an asset-quality pass.

## Motion

No 3D object motion, no cutout parallax, no fake lighting. Standard transitions between **entire editorial sections** are optional if they have a reading purpose and respect reduced motion. Never require animation to understand the work.