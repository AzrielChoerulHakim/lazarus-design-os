---
name: lazarus-apple-craft
description: Use for deliberate, precise web interface and animation review informed by Apple's design principles without copying Apple branding, page structures or native-only conventions.
---

# Apple craft for original web work

Load `docs/APPLE_CRAFT_STANDARD.md` and `DESIGN.md`. Treat Apple's official Human Interface Guidelines at https://developer.apple.com/design/human-interface-guidelines/ as platform guidance; do not pretend native iOS patterns are universal web rules.

## Craft questions
- What is this page's primary purpose? Which visual element makes that purpose easiest to understand?
- Is the typographic hierarchy precise in actual content and at 320px width?
- Do interactions respond directly, and do transitions preserve spatial continuity rather than interrupt users?
- Can keyboard, touch, zoom and reduced-motion users complete the same jobs?
- Could a decoration be deleted without damaging comprehension? Delete it.
- Does the client's own brand and evidence remain intact rather than yielding to Apple's white/gray/blue marketing style?

## Stop conditions
If an element has no client/context justification, ask whether it should exist. If a motion interaction is not interruptible or has no static/reduced-motion path, improve or remove it. If Apple font binaries/assets are not licensed, never distribute them.

External context (not vendored): https://github.com/emilkowalski/skills/tree/main/skills/apple-design and https://github.com/KanishkRanjan/apple-design-skill .
