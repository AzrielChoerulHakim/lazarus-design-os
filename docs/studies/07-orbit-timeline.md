# 07 / Orbit Timeline
**Study classification:** interaction · geometry-driven navigation · chronology.

**Historical source:** `preview.html`, an HTML/CSS/JS standalone orbit navigator originally examined as the Orbit Timeline study. Original code is not redistributed.

## What the source demonstrates
Chapter data drive circular node positions via CSS angle variables, while `go(index)` maps discrete selection into page scroll. An `update()` procedure derives current phase from scroll progress and synchronizes rotation, highlighted year/node, details and current-state indicators.

Crucially, reduced-motion behavior creates a semantic **linear timeline**. It does not leave the user with an inaccessible frozen circle or remove the information.

## Transferable mechanism
Several presentations of the same chronology should share one source of truth. Selection by click and by scrolling must converge on the same state. Complex graphics need a complete direct-reading alternative.

## Do not reproduce
An obligatory orbit for every professional history, indigo nodes, concentric branding, source sample bios or the exact circular geometry. An index of dates and work titles is often clearer than a wheel.

## Example transformation
For a legal scholar, a chronology might index real publications and judgments, with accessible document links. A researcher could map changing methods through time. The orbit is optional; chronology integrity is not.

## QA
Keyboard, touch, active-state semantics, reverse scroll, order for screen readers, content height in landscape, reduced-motion alternative and factual years. The sample content is not a real client's CV.
