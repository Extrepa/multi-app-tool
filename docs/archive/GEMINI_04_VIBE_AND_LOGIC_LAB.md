# Gemini Summary 04 - Vibe and Logic Lab

## Vibe Parameters
- Pulse: scale oscillation (speed, intensity).
- Glow: filter radius and color, optional flicker.
- Float: sinusoidal Y motion (amplitude, frequency).
- Shake: jitter intensity and speed.
- Rotation: spin or pendulum swing.

## Vibe Engine
- Convert vibe settings into animation curves.
- Live preview using CSS keyframes or motion library.
- Global play/pause to toggle preview.
- Global ticker drives time-based oscillators.
- Phase offset support for staggered motion.

## Vibe Panel UI
- Effect selector, intensity and speed sliders.
- Live preview toggle and on-canvas control handles.
- Preset buttons (ghostly, aggressive, stable, flicker).
- Multi-select to apply a vibe to many instances.
- Inspector controls map UI inputs to oscillator constants.

## Templates and Batch FX
- Save vibe templates in the library.
- Apply templates by tag or folder.
- Local overrides per instance.
- Preset library includes frequency, intensity, and phase.

## Multi-Vibe Stacking
- Additive stacking for position/rotation.
- Multiplicative stacking for scale/opacity.
- Inspector displays a vibe stack with toggle and delete controls.

## Keyframer and Filters
- Lightweight timeline for start/end states.
- Filter stack: blur, drop shadow, inner glow, chromatic shift.

## Audio Reactive
- Map vibe parameters to frequency bands (bass, mid, treble).
- Variable mapper for external signals (e.g., global.bass_hit).

## Interaction Logic
- Triggers: onHover, onClick, onTimer, onCollision.
- Responses: playVibe, switchState, emitSignal.
- Logic tab with When/Then rules for serialization.

## Color and Opacity Oscillators
- Color cycling for stroke/fill using HSL shifts.
- Opacity flicker for atmospheric shimmer.

## Community Sharing
- Copy/paste vibe strings for quick sharing.
