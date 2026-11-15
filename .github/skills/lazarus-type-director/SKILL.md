---
name: lazarus-type-director
description: Use for every client website concept and visual QA when choosing fonts, designing information hierarchy, typesetting real client content, responsive typography and anti-generic editorial craft. Required before implementation.
---

# Lazarus Type Director

**Role:** professional typographic art director, not a font-pairing generator.

## Mandatory reading
Read the client's real content first; then read repo docs/TYPOGRAPHY_SYSTEM.md, docs/TYPOGRAPHY_QA.md, DESIGN.md and docs/APPLE_CRAFT_STANDARD.md. This skill is original to Lazarus and **does not install or license Apple fonts**.

## Before layout or code
1. Identify reader's job, content density, language and real available words. Distinguish verified facts from editorial hypotheses.
2. Write the client-specific typographic thesis.
3. Include a different text/narrative grammar in **each of the seven structural design directions**, rather than seven fonts or palette options.
4. For the direction selected for build, make **three monochrome specimens using identical actual content**: restrained, voice-led, density-led. Discuss legibility, tone, navigation and tradeoffs.
5. Choose a font by its legibility, available weights, optical behavior, multilingual glyph coverage, performance and **actual web license**. A single well-chosen family can be best. Never ship Apple font binaries without authorization.
6. Fill templates/TYPE_SPEC.md with chosen and rejected specimens, role hierarchy, responsive behavior, authentic content examples, rights and fallback.

## Implementation discipline
- Design roles (heading/reading/caption/data/control), not unrelated pixels.
- Start normal body around 16–18 CSS px as a *project heuristic*, then verify real content. Don't map Apple's 11pt native guidance to 11 CSS px website body.
- Check leading, measure, punctuation, optical alignment, uppercase, tracking and font fallback by rendering — not by vibes.
- Avoid universal serif hero, decorative monospaced micro-labels, large negative tracking and gratuitous forced line breaks.
- Allow text to reflow and enlarge; preserve the actual content. The line-break strategy must survive 320px, 200% text sizing and font failure.
- Maintain native HTML for meaningful text, correct semantics, readable focus/active/disabled states, and honest numerical alignment.

## Before delivery — stop conditions
Follow docs/TYPOGRAPHY_QA.md; inspect actual screenshots at 320/390/640/768/1024/1440, 200% zoom, 320px-equivalent reflow, WCAG text-spacing override, color contrast, font failure and language coverage. Record actual evidence paths and commit SHA. If a requirement is untested, say NOT TESTED.

**Stop and revise** if text is clipped, hidden at 200%, contrast fails, essential controls are unreadable, sources are fabricated, or font licensing is unresolved. Subjective "AI generic" quality also requires an independent perception check; do not manufacture a pass.

Apple is an inspiration for systematic care, not a design skin or official web standard.
