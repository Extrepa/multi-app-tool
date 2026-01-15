# Vibe, FX, and Logic

## Core Vibe Parameters
- Pulse: scale oscillation (speed, intensity).
- Glow: drop shadow or SVG filter (radius, color, flicker).
- Float: sinusoidal Y motion (amplitude, frequency).
- Shake: random jitter (intensity, speed).
- Rotation: constant spin or pendulum swing.

## Vibe Engine Math
- Generate animation curves from vibe settings.
- Use CSS keyframes or Framer Motion for live previews.
- Export math parameters for engine runtime playback.

## Vibe Lab UI
- Effect selector and parameter sliders.
- Live preview toggle and global play/pause.
- Presets (ghostly, aggressive, stable, flicker).
- On-canvas handles for amplitude control.
- Multi-select applies the same vibe to many instances.

## Templates and Batch FX
- Vibe templates saved in library for reuse.
- Tag-based batch apply (e.g., apply to all "Tree" assets).
- Local overrides per instance.

## Keyframer and Filters
- Lightweight timeline with start/end keyframes.
- Filter stack: blur, drop shadow, inner glow, chromatic shift.
- Audio-reactive mapping for glow/scale parameters.

## Interaction and Logic Hooks
- Trigger system: onHover, onClick, onTimer, onCollision.
- Responses: playVibe, switchState, emitSignal.
- Logic tab in inspector with When/Then UI.
- Serialize triggers in export JSON.

## Advanced Workflow Hooks
- Variable mapper for external game signals (e.g., global.bass_hit).
- Vibe sharing (copy/paste vibe strings).
