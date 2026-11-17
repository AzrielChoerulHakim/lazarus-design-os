# Surrealist Digital Editorial — Master Lighting & Depth Map

## Rule fixed by Lazarus Dev

**One entire raster image per scene.** No SVG scene assembly, layered photographs, pasted statue/sky/fabric elements, decorative CSS overlay, faked 3D, multiple backgrounds, visual filters or parallax. Text and controls must occupy independent DOM regions and must not obscure any artwork.

Two complete reference images supplied by Lazarus Dev in this conversation serve as **photographic art-direction masters**, not as evidence of a real client's portfolio. They represent one coherent world with a consistent night atmosphere, moonlit mineral architecture, tactile terracotta, distant mountains and coherent cast shadows.

- **Scene 01 / Hero:** full composite of monumental broken stone face, architecture, moon, terracotta cloth and landscape. Source filename: wajah_batu_di_bawah_cahaya_bulan.png (1448 × 1086).
- **Scene 02 / Passage:** complete composite of colonnade, stair, drapery, moon, mist and mountains. Source filename: arkadia_batu_di_bawah_cahaya_bulan.png (1448 × 1086).
- Website asset contracts: assets/hero-master.webp and assets/passage-master.webp. These must be locally stored raster derivatives of the masters, not expiring signed CDN previews. **Do not publish a broken image or replace it with an SVG fallback.**

## Lighting lock

| Rule | Hero | Passage |
| --- | --- | --- |
| Primary source | Large moon high left | Moon behind arch / high left |
| Key illumination | Cool silver-ivory on left edges and upper stone | Oblique cool lunar light on stone treads, columns, arch |
| Material bounce | Subtle warm amber from limestone and terracotta cloth | Warm red-brown textile bounce on near limestone |
| Shadow direction | Away from lunar source, into broken surface pockets | Under arches, stair risers and farther column sides |
| Exposure priority | Moonlit face and architecture; protect sky negative space | Stair and midground architecture, balanced with darker near columns |
| Atmospheric falloff | Soft distant blue mountains, low-contrast valley mist | Successive colonnades and mountain silhouettes lose detail with distance |

**Do not layer HTML lighting on top.** Lighting is already inside each image. CSS controls cropping, scale and spacing only.

## Relative depth mapping, non-metric

| Plane | Visual content | Relationship |
| --- | --- | --- |
| D0 | Sky, moon and distant peaks | Most distant; lowest local contrast except the light source |
| D1 | Far mountains and cloud-filled valley | Reduced saturation and edge contrast |
| D2 | Aqueduct/colonnade and relief architecture | Transitional mid-distance with softened atmospheric depth |
| D3 | Central statue and portal OR central stairs and columns | Subject focus; highest useful material detail |
| D4 | Near stone and large terracotta drapery | Clear foreground texture and edge hierarchy |

This is a **2D visual reading map**, not true 3D depth data. No real depth maps, normal maps, relighting passes or 3D geometry are inferred from the source. To animate individual objects later, separate authorized 3D assets would be required; that approach is explicitly outside this single-image prototype.

## Responsive rules

- **Desktop:** one self-contained figure; no image collage. A: copy and figure in independent columns. B: headline then uninterrupted plate.
- **Tablet:** both layouts become reading-first, then one image.
- **Mobile (320–390 CSS px):** image remains a single unbroken rectangle, width:100%, intrinsic aspect ratio 4:3, object-fit:contain. No crop that removes the monument, moon or foreground.
- **Accessibility:** descriptive alt text and DOM reading order. No scroll trapping or motion required.

## Gate before production

- Both original composite images locally stored in GitHub (no expiring URLs).
- Browser displays both with naturalWidth greater than zero and no overflow.
- Static QA detects no SVG in active HTML or CSS, no data:image, multiple backgrounds, pseudo-visual or parallax.
- Visual review at 320, 390, 768, 1024, 1440 and landscape, including font fallback.
- Fictional content **must not** become a real person's portfolio claim.

This experiment does not alter Design OS's existing Tone of Voice, Typography Director or source-truth gates.
