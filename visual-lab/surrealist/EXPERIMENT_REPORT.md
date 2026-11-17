# Experiment report — Surrealist Digital Editorial / 01

## V2 Curatorial audit — actual rendered comparison (17 Nov 2026)

The first live Chromium screenshots were inspected at **1440px desktop and 390px mobile** against the user-supplied Surrealist Digital Editorial reference. These are qualitative design judgements; they do not establish aesthetic quality automatically.

| Original study | Visual fault observed in screenshot | Curatorial outcome |
| --- | --- | --- |
| **The Threshold** | Flat, almost icon-like stone portal; barely articulated limestone; sky, moon and threshold did not convey sufficient scale or material tension | **RETAIN / REWORK.** Deepened moonlight, layered mist/grain, suspended masonry and a terracotta fabric-like vector band. |
| **Impossible Atlas** | Geometric figure behaved like a technical poster or conventional architecture diagram; changing the figure's rotation did not generate surreal world-building | **CUT.** Removed active tab, panel, event handlers and CSS; retain research analysis only. |
| **Unfolding Monograph** | Initial page-02 cover was a flat rust rectangle with arch decoration; lacked a convincing tactile material object | **RETAIN / REWORK.** An interim vector face was tested in Chromium, judged cartoon-like and **deleted**. The retained publication structure now uses an architectural plate, stone, moonlight, textile layers and a second spread with deeper shadow. |

**Second-pass illustration rejection.** The page-01 Monograph figure still appeared cartoon-like even after the hair geometry was converted into a broken mineral crown. It was visually inconsistent with the intended stone-sculpture realism. The source asset, HTML image element and corresponding CSS have been removed; the architectural SVG remains as a conceptual plate. The publication idea is retained for structural R&D only, not approved as an image-quality reference.

**Decision rationale.** The direction is not a license to keep every interesting interface. The Atlas introduced a task model valuable for a real evidence-rich architect, but the visual proposition failed this specific surrealist editorial study. It must not be represented as a successful surrealist reference. Two remaining structures better test a physical voyage versus a publication layout, though they still require fresh screenshot assessment.

**Source file state after curation:** two active tabpanels (Threshold, Monograph), two retained SVG artboards (the rejected sculpture SVG was deleted), and no selectable Atlas UI. The vector sculpture is original to this experiment, not the client's actual artwork or a copied photograph.

**Unfinished until screenshots are reviewed:** texture believability, figure silhouette, moonlight coherence and atmospheric depth on the newly revised render. CI will verify accessibility-oriented interactions, responsive overflow and capture fresh screenshot evidence, not artistic excellence. Do not claim a full art-direction pass merely because CI is green.

---


**Date:** 2026-11-17  
**Branch:** experiment/surrealist-direction-lab-01  
**Scope:** three proposed structural explorations; two retained after visual curation  
**Content status:** explicitly fictional and attributed as a study  
**Release status:** exploratory; *not* a client deployment or release-gate approval.

## 1. Research question and source fidelity

**Question.** Can the nocturnal, architectural, material qualities of the user-supplied Surrealist Digital Editorial reference survive three genuinely different portfolio-reading patterns?

**Source:** the user-provided Lazarus visual-direction image (01 / Surrealist Digital Editorial), visually inspected in this project. It depicts a night landscape, moon, monumental stone sculpture, classical arch, terracotta cloth, pale cream editorial sections and a serif-led hierarchy. The image is a concept reference, not accessible original code or licensed reusable artwork.

**Evidence / hypothesis separation:**
- **Observed in reference:** navy atmosphere, limestone, celestial body, sculptural depth, textile material, serif editorial layout and alternating dark/light bands.
- **Hypothesized by this lab:** a portal can become meaningful project navigation; a moon/arch can serve an atlas diagram; textile/architecture can form a publication plate. These interpretations are editorial proposals, not qualities proven by the screenshot.
- **Deliberately not copied:** original exact left headline and right bust arrangement, supplied artwork pixels, browser-frame mockup, recurring section sequence, fictitious awards, invented real client projects.

**Prototype medium:** authored HTML/CSS, original SVG illustrations, small dependency-free JavaScript; no imported photorealistic render, no copied statue geometry, no 3D/WebGL implementation. This is a layout and interaction exploration, **not** evidence that photorealistic architectural material or real-world lighting has been solved.

## 2. What changed in the repository

The prototype implementation is isolated under visual-lab/surrealist, with dedicated tests. Two existing agent/workflow documents gain optional pointers to the lab. The Design OS contract, tone families, typographic standards, Reference Atlas and Direction Room remain authoritative.

| File | Purpose |
| --- | --- |
| visual-lab/surrealist/index.html | Three semantic, separately structured interactive artboards with original SVG scenes |
| visual-lab/surrealist/styles.css | Two retained layout grammars, desktop and mobile recomposition, reduced-motion fallback |
| visual-lab/surrealist/app.js | Concept tabs, focus-aware dossier, spread pagination, optional parallax |
| visual-lab/surrealist/README.md | Art direction DNA, boundaries, comparisons and production-adaptation method |
| tests/surrealist-lab.test.mjs | Static structure, syntax, reference-integrity and accessibility-intent guards |
| scripts/check-surrealist-lab-browser.mjs | Playwright seven-viewport checks and screenshots (requires execution) |
| .github/workflows/surrealist-lab.yml | Dedicated branch CI for static/browser checks and screenshot upload |
| README.md and index.html | Add entry points from the Design OS field manual **on this branch only** |
| AGENTS.md and docs/WORKFLOW.md | Add optional Surrealist Lab references without changing evidence, tone, typography or release gates |

## 3. Three concepts and the constraints they test

### A / The Threshold — spatial narrative

**Thesis.** The hero is not just a decorative stone portal: an intentional visitor action reveals a dossier. Reading order: statement → passage → proof. The vector arch, lunar disc, mountains, gradated stone and restrained orbit express the night-world vocabulary without reproducing the portrait bust composition from the reference.

**Typography.** Large, humanistic serif statements against restrained supplementary text. Visual continuity comes from depth and void, not huge micro-labels everywhere.

**Motion.** Optional pointer displacement is subtle; content disclosure is always click-operated, keyboard reachable and usable with motion disabled.

**Risk.** A scene of this scale needs genuine project proof immediately after entering. Atmosphere does not excuse weak CV content or inaccessible actions.

### B / Impossible Atlas — archival editorial

**Thesis.** A portfolio with several documented studies may be better understood as a register of comparisons than a cinematic opening. Reading order: inquiry → numbered case list → selected diagram → evidence note.

**Typography.** Compact documentary labels, edited index headlines, longer reading measures for explanations. Pale mineral ground replaces dark immersive emphasis because comparison and reading have priority.

**Motion.** Three indexed buttons update the visible dossier, diagram treatment and plate number in one state. Real production must replace illustrative diagrams with verified client work.

**Risk.** If the client has only one project or no actual diagrams, the index is a false complexity. Do not synthesize evidence.

### C / Unfolding Monograph — artistic publication

**Thesis.** Some practices need narrative and sequence rather than dashboard cards. Reading order: thesis → large image plate → manual page turn → process record. Layers of stone, moon and terracotta fabric become a printed editorial composition.

**Typography.** Very large optical serif with deliberately asymmetric hierarchy and a legible body column. Page elements intentionally reference printed publication rather than a software UI.

**Motion.** Two spreads turn on click; no looping story, mouse-locked progress, or forced scroll. The reader can go backward and keep context.

**Risk.** Long work histories need an index and deep links. A publication-only model can hide practical professional facts.

## 4. Design comparison / recommendation logic

| Question from a real client brief | More appropriate starting point |
| --- | --- |
| Small set of highly visual projects; spatial impact genuinely explains the person's practice | A / The Threshold |
| Multiple case studies with comparable documentation, drawings or research questions | B / Impossible Atlas |
| An authored creative body of work, editorial writing or a sequence of visual projects | C / Unfolding Monograph |
| Primarily CV, few proof assets, many exact dates and credentials | **None by default.** A simpler evidence-first composition may be more appropriate. |

**No universal winner.** The desired outcome is distinctive design *because* of a client's available evidence, not theatrical spectacle because the direction is called Surrealist.

## 5. Tone of voice and originality protection

The existing Lazarus five-family Voice Director remains unchanged. No style-to-personality mapping was added. A real production brief must select language, formality, pronouns and diction on the basis of actual client voice samples, audience, and creative approval. Current demo copy is a fictional editorial proposal, not personal speech.

The two retained concept artboards are **not** substitutes for the Design OS's mandated seven structural alternatives based on a real client brief, nor substitutes for three grayscale same-copy typography specimens. They are internal exploration assets.

No invented professional achievements, fabricated testimonial, fictitious personal quotes presented as fact, fake contact action or third-party artworks were added.

## 6. Verification matrix

| Check | Status | Evidence / limit |
| --- | --- | --- |
| Distinct semantic artboards | **Source checked** | Three tab panels with independent anatomy and three original SVG illustrations |
| JavaScript syntax | **Source checked** | Remote code parsed successfully in V8 |
| Unique static IDs | **Source checked** | 34 IDs, no duplicates |
| Referenced element IDs | **Source checked** | Every direct getElementById literal resolved |
| Mobile strategy | **Specified in source** | A text-before-art; B list-before-plate; C copy-before-spread |
| Reduced-motion handling | **Specified in source** | CSS media query and JS motion gate |
| Browser interactions | **Requires CI/browser run** | Dedicated Playwright script tests dossier, index, spreads and keyboard |
| Responsive art direction | **Requires screenshot review** | 320, 390, 640, 768, 1024, 1440, short landscape |
| Typography / 200% / spacing / contrast | **Not certified** | A client-level typography proofing cycle is still required |
| Real visual asset rights and client accuracy | **Not applicable** | Original vector sketches; no real client data or photography |

Static source checks are not visual acceptance. Even a green Playwright run is only an automated indication: reviewers must inspect crops, text/illustration overlap, art direction, font fallback, and intermediate motion frames.

## 7. Remaining creative and technical limitations

1. The original reference has high-quality volumetric sculptural material. This prototype uses illustrated vector stone, sky, moon and fabric; it does **not** match a realistic 3D scene.
2. No genuine client CV, portrait, project photos or writing samples were supplied for this experiment. Content is deliberately hypothetical.
3. There is no universal reusable asset pack, 3D lighting rig or photographer-approved art direction in this branch.
4. Font display uses Google Fonts with system fallbacks; a real project must verify licensing, language coverage, loading and typography at actual content lengths.
5. In the Atlas, the diagram visibly transforms between entries but has not been authored as three distinct evidence-linked project drawings. This is acceptable for proof-of-concept interaction, not for production.
6. The Monograph contains two demonstrative spreads, not a full publication with project deep links.
7. Browser screenshot review, screen reader review, device testing and performance profiling need real execution; they are not implied by static checks.

## 8. Next research sprint — not yet implemented

- Develop three **same-copy typography studies** using actual verified content from a test brief.
- Translate the most suitable candidate to a project-specific responsive portfolio with genuine project detail and working contact.
- Make one authentic art asset pass: stone roughness, coherent moon lighting, cloth motion and atmospheric layering, avoiding the AI-rendered generic-surreal mood.
- Compare against the other six visual families using *equivalent content* and against recent Lazarus deliverables for structural similarity.
- Capture and manually annotate every section at 320/390 and other viewport widths, including short landscape and reduced motion; address any blockers before claiming a production-ready pattern.

**Research conclusion:** Surrealist Digital Editorial can support at least three different information architectures without using the same hero/cards/CTA skeleton. That is a *design hypothesis demonstrated at source-prototype level*, not a proven quality or deployment claim.