# Lazarus Typography Proofing Lab

A local-first, zero-dependency companion to [Typography Direction System](../docs/TYPOGRAPHY_SYSTEM.md).

## Try it
- Open [type-lab/index.html](index.html) through GitHub Pages or serve the repository locally with \`python3 -m http.server 8000\` and browse to \`/type-lab/\`.
- Replace the heading, paragraph and source label with **real verified client text**. No text is transmitted, saved or sent to AI. The tool uses DOM \`textContent\`, not HTML interpolation.
- Compare three distinct **information/reading grammars** with the same words: evidence dossier, extended reading, information index. These are examples, not mandatory styles.
- Try 390 / 768 / 1040px preview columns, 14–22px sample body reading size, 42–78ch measure and Bahasa Indonesia/English language metadata.
- Copy the rationale, findings and actual project-specific type decisions into [TYPE_SPEC](../templates/TYPE_SPEC.md). You must still develop seven **structural directions** and three **same-copy** type specimens for the chosen direction; this lab can be a starting instrument, not a replacement for project-specific design.

## Important limitations
- The width toggle changes a **preview column/container**; it is **not equivalent to changing the browser's real viewport**. For release QA, use an actual browser at full viewport widths, 200% text enlargement, WCAG 320px-equivalent reflow and user spacing overrides. See [Typography QA](../docs/TYPOGRAPHY_QA.md).
- A sample 17px body is a starting hypothesis, not an official Apple or WCAG size requirement.
- The built-in fonts are OS/browser-provided system fonts and Georgia. They do not embed Apple's proprietary binaries. Production clients can use a properly licensed font with measured fallback.
- This proofing tool does not certify font quality, contrast, browser compatibility, accessibility, originality or legal permission. Validate actual client assets and content before publishing.
- Do not mistake its deliberately restrained interface for the Lazarus universal aesthetic. A cartoon storybook, engineering interface or legal archive may require an entirely different type language.

## Test
Run \`node scripts/check-atlas.mjs\` at repository root; it validates the Type Lab files and parses the browser script. Manual testing still matters. Source docs and prototype must be kept in sync.
