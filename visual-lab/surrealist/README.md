# Surrealist Digital Editorial — Raster-Only Master Mapping

This experimental branch implements **two surviving compositions**, each using **one complete raster image**:

- **01 — The Threshold:** spatial narrative with singular image of moon, monumental sculpture, ruins, terracotta and mountains.
- **02 — Unfolding Monograph:** editorial narrative with singular image of a moonlit architectural passage and staircase.

The previous assembled SVG portal, painted stone head, layered sky, orbit overlays, CSS drapery, fake lighting and mouse parallax were deliberately removed from the active HTML/CSS/JavaScript. The rejected Impossible Atlas remains outside the active prototype.

## Non-negotiable production rule

**No inline SVG, stacked images, multiple backgrounds, gradient decoration, pseudo-element illusions, artificial parallax or fabricated depth.** A visual scene is one image. Its lighting, stone textures, shadows and depth exist in the asset itself, not a browser effect. Text and controls are separate from artwork.

## Asset provenance and transfer quality

Two full-resolution generated PNG master artworks (1448 × 1086) were supplied in this conversation:

1. wajah_batu_di_bawah_cahaya_bulan.png — hero scene.
2. arkadia_batu_di_bawah_cahaya_bulan.png — architectural passage.

Locally stored binary asset files now exist in the GitHub branch:

- assets/hero-master.webp
- assets/passage-master.webp

**Quality caveat:** the connector transfer supplied only 200 × 150 staging thumbnails. These were upscaled into 768 × 576 WebP to provide working local browser previews. They are **not** pixel-faithful copies of the 1448 × 1086 masters and lose significant texture detail. This is an explicitly outstanding production gate. Replace them at identical paths with optimized WebP files made DIRECTLY from the two original PNGs. Do not call the currently staged preview derivatives finished art direction.

To regenerate proper high-resolution derivatives with Pillow, use this Python script in the lab directory, with both original PNGs present:

    from PIL import Image
    from pathlib import Path
    sources = {
      "wajah_batu_di_bawah_cahaya_bulan.png": "assets/hero-master.webp",
      "arkadia_batu_di_bawah_cahaya_bulan.png": "assets/passage-master.webp",
    }
    for source,target in sources.items():
      image=Image.open(source).convert("RGB")
      Path(target).parent.mkdir(parents=True,exist_ok=True)
      image.save(target,format="WEBP",quality=85,method=6)

This replacement requires no layout changes or additional visual layers.

## Mapping, responsive behavior, testing

Read [LIGHTING_DEPTH_MASTER.md](LIGHTING_DEPTH_MASTER.md) for five depth planes (D0–D4), cool moon key from high-left, warm stone/terracotta bounce, receding mist and strict rules against browser-side relighting.

The source includes responsive layouts, semantic tabs, disclosure, reduced-motion support and static no-layering tests.

- Static QA: node --test tests/surrealist-lab.test.mjs
- Browser QA: node scripts/check-surrealist-lab-browser.mjs
- Artworks must load (naturalWidth > 0) at 320, 390, 640, 768, 1024, 1440 and landscape viewport sizes.
- Review real screenshots before release.

SERA is fictional and supplies no evidence of professional experience. Lazarus Design OS voice, typography, original sources and release gates remain authoritative.

**Current release status:** structural and art-direction exploration. Preview-quality raster assets must be replaced by original-quality derivatives before approving production.
