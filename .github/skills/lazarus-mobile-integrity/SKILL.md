---
name: lazarus-mobile-integrity
description: Design and verify mobile-specific compositions so decorative imagery never overlaps essential UI, text or actions.
---
# Lazarus Mobile Visual Integrity
Read `docs/MOBILE_VISUAL_INTEGRITY.md` and `docs/TYPOGRAPHY_QA.md`. A media query is not a visual quality review.
1. Identify all actual sections, reading order and overlap risks before coding; record the mobile contract.
2. Recompose art, focal crops, labels and sticky elements independently from desktop when necessary.
3. Render 320, 390, 640, 768, 1024, 1440 and short landscape; inspect every section at 320 and 390 in addition to full-page views.
4. Use `scripts/mobile-visual-audit.mjs` with marked critical and decorative elements as a **heuristic**, then inspect real screenshots; animations, masks and visual taste still need human review.
5. Test menu states, zoom, long content and reduced motion; record per-section `qa.mobileInspections` and required checks. Fix collisions before delivery.
