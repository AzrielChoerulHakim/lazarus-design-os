# 01 / Foreshore
**Study classification:** systems · WebGL atmosphere · decision interface.

**Historical source:** `foreshore.html` (originally supplied project source; deliberately **not** distributed in this public repository). Source stack: standalone HTML, CSS, vanilla JS, WebGL. Historical source typography: Space Grotesk and Plus Jakarta Sans. This is a conceptual marine decision-intelligence landing page, **not verified live data**.

## What the source demonstrates
**Environment.** A `#ocean-canvas` WebGL surface renders an atmospheric field with shader helpers and an animation function `frame(now)`. Its implementation tests visibility and elapsed frame time before drawing. That distinction matters: skipping a draw is not the same thing as canceling all future animation-frame scheduling.

**Evidence interaction.** A set of `.verdict-card` controls maps one selected value to the evidence fields on the opposite side. Active-card accessibility state (`aria-pressed`) and explanatory copy arise from one shared selection model, not disconnected DOM snippets.

**Scroll navigation.** Section highlighting is updated via a passive scroll listener whose DOM writes are grouped behind animation frames. The visual system includes reveal effects and reduced-motion behavior.

## The transferable mechanism
A visual atmosphere should describe something true about the subject, while claims and controls stay readable, keyboard-accessible and represented in the DOM. Keep one model of active state and derive all selected content from it. On lower-powered hardware, cap DPR and stop unnecessary GPU work.

## What must not be inherited
Neon cyan on nearly black, the oversized uppercase hero, glowing instrumentation and uniformly technical metadata. The literal ocean shader belongs to a marine subject; it is not an all-purpose “premium tech” background.

## Example transformation
For a researcher with **real evidence**, show a lightweight map or spatial field of their own research geography. Provide a corresponding textual evidence index with actual cited findings. A legal strategist may only need the synchronized decision-card idea, not the shader.

## Validation
WebGL absence, content without JS, low-power device, visibility lifecycle, motion preference, correct state labeling, legible data, no invented telemetry. Inspect source directly only if authorized and available.
