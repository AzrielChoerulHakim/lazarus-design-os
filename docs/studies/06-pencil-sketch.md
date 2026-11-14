# 06 / Pencil Sketch Loader
**Study classification:** interaction · measured geometry · multi-stage reveal.

**Historical source:** `pencil-sketch-loader.zip`; a React 19 + TypeScript + Vite component project, **not a standalone HTML site**. Its components live under `src/components/plot-reveal/` in the original archive.

## What the source demonstrates
A `PlotReveal` component tracks named phases: `measuring`, `plotting`, `morphing`, `waiting`, `resolving`, `done`. The geometry is derived from *real rendered HTML*, using `measure(root)` to collect annotated `[data-plot]` areas. A timeline scheduler creates deterministic stroke events; an SVG layer renders the result.

This is stronger engineering than drawing arbitrary lines over a page and calling it a wireframe. Its overlay has to follow the actual interface, including typography and positioning changes.

## Transferable mechanism
The drawing can express a real act of making: sketch → artifact, schematic → finished object, plan → completed project. Measure after actual layout and font readiness; support resize and state changes. Model the animation lifecycle explicitly so errors and interruption can be handled.

## Do not reproduce
A waiting spinner with deliberately introduced delay, gratuitous blue drafting-grid motifs, or the original demo's dashboard visuals. If content is ready, do not slow the user down for theatrics. Accountants and general CV pages rarely need this technique.

## Engineering limitations
The original uses aliases and package dependencies; do not paste a single TSX file without reconstructing its environment. Test resize, component cleanup, no-JS or server-rendered states where relevant, focus while overlaying controls, screen readers and reduced-motion immediate content.
