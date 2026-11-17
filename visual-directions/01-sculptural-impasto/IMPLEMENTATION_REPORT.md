# Sculptural Impasto Visual Mapping — Implementation and QA Report

**Research date:** 2026-11-17  
**Branch:** experiment/sculptural-impasto-visual-mapping-v1 (based on main)  
**Change strategy:** additive mapping layer only; preserve original Design OS contract and production workflow.  
**Decision:** Sculptural Impasto is the selected visual family for Surrealist Digital Editorial, but the art studies are **research**, not final client assets.

## 1. What was added

- A new optional visual-directions/01-sculptural-impasto directory with seven mapping resources, a machine-readable research map and this report.
- A three-layout comparison lab: **Monumental Gallery**, **Evidence Folio** and **Impossible Passage**, all using the **same fictional Atelier Sera words**, with a separate selector for the **same painting** across layouts.
- Three original conceptual oil-impasto studies (dissolving colonnade, procession of pigmented arches, impossible hanging ocean).
- An opt-in .github/skills/lazarus-visual-mapper/SKILL.md guidance layer; it is triggered only when the direction is explicitly selected.
- Isolated static/browser tests and branch-scoped CI.
- One small optional entry in root README; not a replacement homepage or compulsory client template.

## 2. Preservation of Design OS

The following existing system authorities were **not modified**: AGENTS.md, DESIGN.md, docs/WORKFLOW.md, docs/TONE_OF_VOICE_SYSTEM.md, docs/TYPOGRAPHY_SYSTEM.md, docs/MOBILE_VISUAL_INTEGRITY.md, docs/ORIGINALITY_PROTOCOL.md, lib/design-contract.mjs and scripts/design-gate.mjs.

The new CI explicitly diffs against main and fails if any of those files change. It separately runs the existing Reference Atlas tests, design-contract regressions and mobile-audit syntax checks. No current contract fields, allowed voice presets, typography constraints or release statuses were changed.

**Important:** mapping is opt-in; it never silently introduces impasto into other visual families or client websites.

## 3. Content/source integrity

The fictional Atelier Sera identity and three conceptual studies are labeled as such in the lab. They are not fabricated professional achievements, client projects, photos or testimonials. The oil studies were newly generated as research visuals and are not reconstructions of Dalí originals.

## 4. Art-direction audit from actual screenshots

Reviewed from the isolated browser CI:
- Desktop at 1440 CSS px for Gallery, Folio and Passage.
- Mobile at 390 CSS px for Gallery; additional geometry and automated screenshot proof exists for all three at 320, 390, 640, 768, 1024, 1440, and 844×390.
- The three modes have different content reading structures, image placements and rhythm, while the data content and source art can be held constant.
- The artwork is represented by **one raster image element per artboard**, in a standalone semantic figure, with live readable text and controls outside the image.
- Layouts recomposed for narrow screens, without composited sky/stone/cloth/canvas scenes.

### Visual limitations, explicitly NOT passed

**CRITICAL ASSET QUALITY LIMIT:** The connector exposed 200×133 thumbnails of the 1536×1024 generated paintings. These preview WebP files are successfully committed to GitHub for structural QA, but look visibly soft at normal desktop scale. The detailed impasto relief, brush marks and nuanced pigment edges **cannot be approved from these previews**. They must be replaced at the same paths with original-resolution WebP files.

The original 1536×1024 source PNGs and full-resolution WebP exports are preserved in the delivery bundle **lazarus-sculptural-impasto-master-art-bundle.zip**. The bundle is a conversation artifact, not a file already present in the GitHub branch.

Other not-yet-tested client-level criteria: typography with authentic CV copy, 200% text scaling, actual font licensing, subjective originality against a real client's previous work, independent artistic review and physical mobile devices.

### Curatorial interpretation

- **Gallery** best illustrates painting as a standalone exhibition piece but is vulnerable to overshadowing credentials.
- **Folio** makes explicit the distinction between artwork and documentary evidence and is best when project records are dense.
- **Passage** has the strongest sequential editorial rhythm but may need a persistent project index for real users.

No universally selected winner. The *map* should help decide when the painting is appropriate, including when it should be rejected.

## 5. Test results and evidence

- Static module: Node assertions on 3 semantic layouts, unique IDs, unchanged copy, mapping shape, optional skill, and no artistic SVG/stacked CSS canvas.
- Existing system: Reference Atlas and design-contract regression suite, mobile audit parser.
- Browser QA: Playwright Chromium, 7 viewports × 3 layout panels = **21 captured screenshots**.
- Automated checks: image loading, one raster per visible scene, no horizontal overflow, keyboard tab traversal and painting selector state.
- Evidence: GitHub Actions branch workflow **Sculptural Impasto Mapping — Isolated QA**; screenshots published as an Action artifact.

**A CI success is a functional/structural pass, NOT a production visual approval.** A reviewer must inspect original-resolution art after replacement.

## 6. Release and merge recommendation

**Allowed now:** inspect the branch, study mapping documents, use the optional mapping skill as research, compare layout grammars, and run browser QA.

**Not allowed yet:** treat the GitHub thumbnails as master art, claim a visual quality approval, auto-publish a client's CV with these fictional studies, or alter the other six visual directions.

**Integration boundary:** retain as a branch/PR until original-resolution raster assets and human visual QA are addressed. Do not force a merge into main merely because a CI check is green.
