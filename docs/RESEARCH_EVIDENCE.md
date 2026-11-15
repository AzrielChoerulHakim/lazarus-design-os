# Why AI-generated websites look alike: research ledger

This ledger separates **published findings**, **professional design critique**, and **Lazarus hypotheses**. It is not a claim that a classifier can detect AI authorship from a website screenshot.

## Evidence
- **Goree and colleagues, CHI 2021:** `Investigating the Homogenization of Web Design`. Historical web-design homogenization existed before modern generative AI. See https://doi.org/10.1145/3411764.3445156 . Do not attribute that historical trend entirely to AI.
- **Wadinambiarachchi and colleagues, CHI 2024:** `The Effects of Generative AI on Design Fixation and Divergent Thinking`. A study of AI visual ideation and design fixation, **not** a direct benchmark for AI-built websites. Search publication: https://dl.acm.org/doi/proceedings/10.1145/3613904 .
- **Nielsen Norman Group:** AI prototyping and UX evaluation show that plausible-looking screens may still have poor information hierarchy or interactions. See https://www.nngroup.com/articles/ai-prototyping/ .
- **Apple Human Interface Guidelines:** platform-level design principles, accessibility and motion. Primary source: https://developer.apple.com/design/human-interface-guidelines/ .
- **Anthropic frontend-design skill:** practitioner instructions explicitly identifying recurring AI UI motifs. This is an engineering/design practice source, **not peer-reviewed research**: https://github.com/anthropics/skills/tree/main/skills/frontend-design .

## Observation (qualitative; not a diagnostic guarantee)
Common AI-generated outputs may repeat:
- centered oversized hero, generic subtitle, two buttons;
- cream + editorial serif + terracotta, or dark + single saturated accent;
- eyebrow labels, numbered sections with no semantic sequence, identical cards;
- decorative glow/grain/glass, uniform fade-up reveals;
- boilerplate agency language and unsupported claims.

None of these prove AI authorship. The problem is **indiscriminate repetition without context-specific justification**, not the mere presence of a design technique.

## Hypotheses to test at Lazarus
H1. Client-evidence-based creative theses produce higher identity specificity than style-only prompts.
H2. Seven structurally divergent concept proposals may reduce same-layout repetition compared with seven cosmetic variants. This numerical choice is a Lazarus working standard, **not an evidence-based optimal count**.
H3. Browser-based visual inspection reveals issues that build/tests miss.
H4. Remembering design corrections as explicit decisions reduces repeat rejection.

These hypotheses are **not yet experimentally validated for Lazarus**.

## Suggested evaluation
Give multiple distinct portfolio briefs to the same implementation stack and comparable model budget. Randomize ordinary prompting vs Design OS workflow. Have independent reviewers who do not know the condition score: client specificity, distinctiveness of structure, content credibility, typography, responsive usability, accessibility, and “AI-generic impression.” Collect qualitative explanations; avoid interpreting a few aesthetic ratings as scientific proof.

## Method discipline
Use primary publications rather than circulating numerical claims without checking methods. Acknowledge limitations, context, and the distinction between design style and authorship attribution. Update this ledger when new reproducible evidence becomes available.
