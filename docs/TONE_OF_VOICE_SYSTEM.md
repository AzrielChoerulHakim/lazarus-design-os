# Lazarus Tone of Voice System
**The website should sound like its owner, not like its generator.**

## Decision, not an automatic style
Separate typography (the visual treatment of letters) from tone of voice (word choice, rhythm, perspective, degree of formality). Neither visual style nor client profession automatically determines whether copy says *aku*, *gue*, *saya*, *kami*, or uses a third-person bio.

Choose the voice **before coding** from real client evidence, intended reader, purpose and explicit creative direction. If no samples or client language preferences are supplied, make a documented **editorial proposal**, not a claim that the client naturally speaks that way. Never invent the client's personal quotes, motivations, credentials or endorsements.

## Five starting families, never five rigid presets
| Tone id | Voice | Best use / risk |
| --- | --- | --- |
| `casual-friendly` | Conversational, close and grounded | Creative/personal audiences; avoid inappropriate informality |
| `professional-conversational` | Clear, natural and credible | Portfolios and professional services; avoid stiff translated corporate copy |
| `editorial-intellectual` | Reflective, specific, nuanced | Research, essays and selected professions; avoid pretentious abstraction |
| `playful-expressive` | Light, curious and expressive | Illustrated/creative worlds; avoid childishness where professionalism matters |
| `formal-authoritative` | Precise, restrained, rigorous | Institutional or regulated contexts; avoid empty legalistic phrasing |
| `custom` | A reasoned hybrid | Name the blend, sources and effect on reading |

**Indonesian example** (an illustrative editorial proposal, not a person's quotation):

- Generic: “Explore My Professional Journey.”
- Natural, professional: “Kenalan lebih dekat” / “Perjalanan dan pengalaman kerja.”
- More informal, only when approved: “Cerita gue sejauh ini.”
- Serious/authoritative: “Pengalaman profesional dan kompetensi.”

A Storybook Crayon visual direction can use a mature, professional-conversational voice. **An illustrated site is not permission to invent an extroverted personality.**

## Required voice profile (client-owned)
Fill `voice` in `design-contract.json` and write `templates/TONE_OF_VOICE.md` in the client workspace.
- `language`: e.g. `id-ID`, including language mixing and audience comfort.
- `tone`: one family or a justified custom hybrid.
- `audience`, `pronouns`, `rationale` and `source`: why this diction helps **this** client and reader.
- `evidenceIds`: reference verified client facts; preference given by the creative director may supplement but not replace facts.
- `preferred` and `avoid`: meaningful project-specific word examples, not a universal prohibited-words list.
- `samples`: exact copy for `opening`, `evidence` and `action`; not three placeholder slogans.
- `approval`: `editorial-draft` or `client-confirmed`; an editorial draft raises a review warning during release. The project owner is responsible for obtaining permission when necessary.

## Operational review
1. Read actual CV, portfolio examples and any client copy; separate facts from suggested phrasing.
2. Write the voice thesis and three real samples before full UI.
3. Check navigation, biography, work history, buttons, empty/error states and contact in the same register. Preserve exact names, dates and qualifications.
4. Check 320px mobile headings, punctuation, long Indonesian words and paragraph cadence; copy must not be truncated to maintain layout.
5. Run the release checks `voice-claims` and `voice-consistency`, attach observed evidence and notes. A machine can require evidence; it cannot confirm whether words authentically represent the client.

**Block release** for false attribution, invented first-person facts, inconsistent critical terminology or missing essential statements. **Review warning** if copy remains an editorial draft without client confirmation.
