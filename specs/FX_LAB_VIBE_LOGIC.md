# FX Lab & Vibe Check Logic Specification

## Objective
The FX Lab takes a static SVG/PNG "Prop" and applies non-destructive visual effects and behavioral logic to turn it into a "Component."

## Vibe Parameters (The "Vibe Check")
Every component should support a standard set of "Vibe" properties:
1. **Pulse:** Scaling the asset up and down (Speed, Intensity).
2. **Glow:** CSS filters or SVG filters for neon/bloom effects (Radius, Color, Flicker).
3. **Float:** Sinusoidal movement on the Y-axis (Amplitude, Frequency).
4. **Shake:** Random jitter for "unstable" or "energy" objects.
5. **Rotation:** Constant spin or "pendulum" swing.

## Scripting / Logic Bridge
- **Trigger System:** Components should have basic triggers (OnHover, OnClick, OnLoad).
- **State Changes:** Toggle between "Vibe A" and "Vibe B" (e.g., a button that glows brighter when hovered).

## Implementation for Cursor
- Use CSS Keyframes or a library like `Framer Motion` or `GSAP` to handle these vibes.
- Ensure the "Scene Maker" can toggle these animations on/off globally to save performance during layout.

