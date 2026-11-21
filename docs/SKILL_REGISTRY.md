# GitHub skills · evaluated shortlist

These are **third-party instructions**, not dependencies, not official Apple software, and not copied into this repo. Their license, relevance and future changes need review before vendoring. Read specific sections; do not blindly import all instructions or default CSS tokens.

| Skill | Repository source | Role at Lazarus | Main danger |
|---|---|---|---|
| Apple Design · Emil Kowalski | https://github.com/emilkowalski/skills/tree/main/skills/apple-design | Physical, interruptible interactions and motion QA | Over-animating normal content |
| Apple Design · Kanishk Ranjan | https://github.com/KanishkRanjan/apple-design-skill | Marketing vs product UI, typography, layout, Apple quality discipline | Cloning Apple.com look and tokens |
| Apple Design Review · dickwu | https://github.com/dickwu/apple-design-skill | HIG-based critique and accessibility, best for apps | Treating native HIG as web law |
| Frontend Design · Anthropic | https://github.com/anthropics/skills/tree/main/skills/frontend-design | Subject-led art direction and recurring AI-default detection | Turning “avoid defaults” into a new formula |
| Learn Taste · Emil Kowalski | https://github.com/emilkowalski/skills/tree/main/skills/learn-taste | Capture confirmed user corrections into DESIGN.md or check | Overgeneralizing one client's preference |
| Prototype · Emil Kowalski | https://github.com/emilkowalski/skills/tree/main/skills/prototype | Three divergent options based on actual decision axes | Three cosmetic variants masquerading as exploration |

## Original Lazarus type direction skill (mandatory, not a third-party link)

**[lazarus-type-director](../.github/skills/lazarus-type-director/SKILL.md)** — first-party skill for verified-content typesetting, Apple-inspired hierarchy without copying fonts, three same-copy grayscale type specimens, font licensing, multilingual text, responsive reflow, font fallback and WCAG-type QA. It must be applied before frontend implementation; read [Typography System](TYPOGRAPHY_SYSTEM.md) and [Typography QA](TYPOGRAPHY_QA.md).

## Original Lazarus Scroll Director skill (project-local)

**[lazarus-scroll-director](../.github/skills/lazarus-scroll-director/SKILL.md)** — 15 independently specified scrolling mechanisms: navigation, narrative, editorial, transformation and experimental systems. Read [Scroll Systems](SCROLL_SYSTEMS.md), select based on real client evidence, and review no-JS/mobile/reduced-motion compatibility. Only zero or one dominant and one supporting mechanism; **never expand beyond two project-wide when combined with Reference Engineering**. The `scroll-lab/` is independently written teaching code, not a client theme.

## Routing
- **Before composition:** client evidence + **first-party Lazarus Type Director** + Anthropic frontend-design (optional external research); avoid forced aesthetics and default font pairs.
- **When establishing typography & precision:** **Lazarus Typography System and its specimen/QA gates first**; official Apple Typography and W3C WCAG are evidence sources; Kanishk's community examples are optional and must not override client evidence.
- **When considering scrolling as narrative:** use the first-party `lazarus-scroll-director` to justify the effect, specify the state/fallback, and run scroll-specific QA before choosing GSAP/Motion.
- **When adding gesture/tactility:** Emil's apple-design, only if the interaction genuinely needs physics.
- **At QA:** HIG review for platform-appropriate elements, plus Lazarus Anti-Generic Audit.
- **After revision:** learn-taste to capture only approved, reusable corrections.

## Conflict resolution
Client facts and intended audience > accessibility/usability > platform conventions > brand identity > skill tips > style presets. Never resolve a conflict by imitating Apple branding. Never assume skill documentation is authoritative about Apple licensing or browser support; confirm at primary sources.

The working environment must have access to any skill before claiming to use it. GitHub links alone do not load a skill into every session.
