# Lazarus Design OS instructions for coding assistants

Before generating frontend components, read [AGENTS.md](../AGENTS.md), [DESIGN.md](../DESIGN.md), [docs/WORKFLOW.md](../docs/WORKFLOW.md), **[docs/TYPOGRAPHY_SYSTEM.md](../docs/TYPOGRAPHY_SYSTEM.md), [docs/TYPOGRAPHY_QA.md](../docs/TYPOGRAPHY_QA.md)**, and [docs/ANTI_GENERIC_AUDIT.md](../docs/ANTI_GENERIC_AUDIT.md).

Typography release gate: each of seven concepts has a distinct reading grammar; selected concept needs three grayscale specimens with identical verified client text and a completed TYPE_SPEC.md before UI code. Check font licensing/fallback, actual text at 320/390/640/768/1024/1440, 200% resize, 320px reflow, text spacing override and contrast. Use `lazarus-type-director` skill.

Scrolling architecture: consult [Scroll Systems](../docs/SCROLL_SYSTEMS.md), [Scroll Director skill](skills/lazarus-scroll-director/SKILL.md), and [15-system registry](../data/scroll-systems.json) when scroll effects are proposed. Choose at most one dominant plus one supporting system, max two across Reference Engineering + Scroll Director; write `scroll-plan.json` with real evidence and test no-JS, reduced motion, keyboard/anchor navigation, reverse scroll, short height and mobile recomposition. No decorative scroll spectacle by default.

Principles: client-specific identity and information architecture; no default hero/card/CTA scaffold; no copied Apple look; meaningful motion only; verified content; accessibility and responsive testing; no false claims of viewing source assets. Refer to [docs/SKILL_REGISTRY.md](../docs/SKILL_REGISTRY.md) for optional external reading.

Use the v4 [originality protocol](../docs/ORIGINALITY_PROTOCOL.md) and [design contract](../docs/DESIGN_CONTRACT.md). Run the brief/design/release gates on the client's actual contract. Cite verified evidence for decisions; compare skeletons before implementation; inspect the first substantial rendered section. A green gate checks records, not artistic originality. Never reuse the studio's surrealist identity as a default client style.
