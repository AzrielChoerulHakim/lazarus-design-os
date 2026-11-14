# 03 / Ninth Meridian
**Study classification:** narrative · photographic chapter design · masking.

**Historical source:** `Ninth-Meridian-Standalone.html` (not republished). Standalone HTML/CSS/JS with a Canvas 2D star field. Source fonts: variable Archivo (narrow width axis) and IBM Plex Mono.

## What the source demonstrates
The page manipulates the image's *frame*: a `.frame-photo` expands through `clip-path: inset(...)`, while a separate `.iris-photo` uses a `clip-path: circle(...)` aperture. A hero image scale follows its own scroll progress. Variable-font width settings shape display typography as part of composition. A starfield is rendered in a canvas layer.

The technical lesson is not “add a cinematic reveal.” It is that image exposure can serve as an editorial transition when the underlying photograph has narrative value.

## Transferable mechanism
Identify what an image can *prove*. An architectural before/after can unfold via one controlled mask; a restoration story can expose layers with accurate captions. The visible media should still communicate at rest and without motion.

## What must not be copied
Desert-night branding, sand/navy/coral palette, observatory narrative, source photographs or the full sequence hero → frame → iris → starfield. Repetition of cinematic reveals quickly becomes a recognizable AI-generated recipe.

## Engineering review
Protect text contrast during transitions. Preload only necessary assets. Keep original photos licensed and optimized; embedded data URIs are not automatically production-friendly. Check no-JS/static alternative, mobile media crop, reduced motion, text overflow at minimum widths and ending scroll state.
