# Two Lighting Systems / Two Depth Systems

Sculptural Impasto creates a deliberate ambiguity: there is a pictured impossible world **and** a physically implied painted surface. Treat both as separate art-direction hypotheses within a **single finished raster**.

## Light inside the world (W)

- **W-K:** dominant in-scene key, for example moonlight falling from upper-left.
- **W-B:** warm material bounce from mineral/terra pigments or depicted sunlit stone.
- **W-S:** cast and occlusion shadows that explain distant stair risers, arch interiors and ground contact.
- **W-A:** atmosphere softens distant mountains, with less edge contrast and pigment contrast farther away.

## Light over the paint (P)

- **P-R:** raking illumination grazes the raised pigment, producing local highlights and miniature shadow sides.
- **P-V:** variance of knife-mark thickness and direction follows material structure, not random procedural bump noise.
- **P-S:** small relief shadows remain subordinate to the world-scale shadows.
- **P-O:** read as an oil-paint object even in a thumbnail; make relief readable without a fake universal emboss filter.

**Critical distinction:** W/P describe *depicted* visual logic, not real measured lighting. A 2D painting contains no actual web-accessible normal map or 3D geometry. Do not invent numeric depth coordinates.

## Scene plane interpretation

| Depth | Observed kind of detail | Contrast role |
| --- | --- | --- |
| D0, far | Atmosphere, distant celestial field | Lowest local detail except deliberate bright moon |
| D1, remote | Mountains/sea/cloud horizon | Lower contrast and softer edges |
| D2, middle | Arcades, steps, interior architectural masses | Clear silhouettes, controlled relief |
| D3, main | Impossible molten architecture / paradox | Highest subject clarity |
| D4, near | Front stone and pigment ribbons | Large palpable knife marks, may be dark to frame D3 |

## Validation under visual QA

1. Point to W-K and P-R separately in the **complete, unmodified** artwork.
2. Trace the shadow direction and the relief edge highlights; document intended deviations.
3. Verify the impossible event is still readable at 320 px without overlays.
4. Check that reducing display size does not make impasto noise overwhelm the focal idea.
5. Record any damaged material logic as a creative failure; do not repair it with separate light layers in the DOM.

## Source of truth

Use the actual original master raster. Scaled-up low-resolution thumbnail derivatives cannot prove paint relief and are marked **staging only**.