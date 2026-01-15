# System Overview and UX

## Purpose
An integrated creator suite that spans asset creation, animation, and scene layout in one workspace.

## Core Pipeline
- Forge (SVG/Pin creation) -> Lab (FX/Vibe) -> Stage (scene composition) -> Export (game/web).
- Focus window edits a single asset; Stage shows the full scene; changes sync in real time.

## Definitions
- Asset (Prop/Atom): Raw SVG/PNG in the library.
- Component (Molecule): Asset + Vibe logic and optional interaction rules.
- Scene (Organism): A graph of instances referencing library assets/components.

## Workspace Layout
- Global toolbar (top): mode switcher, project meta, save/export, global toggles.
- Tool dock (left outer): vector tools (pen, node, shapes, text, boolean, stroke).
- Layer tree (left inner): hierarchy, groups, visibility, lock, vibe indicators.
- Workspace (center): Forge view in edit mode, Stage view in layout mode.
- Inspector (right): contextual panels (transform, stylist, vibe, logic).
- Asset tray (bottom): library thumbnails, tags, search, drag to Stage.

## Mode Behavior
- Forge: zoomed, node-level editing with grid and handles.
- Stage: large canvas for layout, snapping, and transform handles.
- Lab: inspector focuses on vibe settings and playhead controls.
- Non-linear workflow: user can jump modes without losing context.

## UI Styling
- Dark, high-contrast panels with 1px borders for separation.
- Active workspace glow (Forge emerald, Stage purple, Lab pink).
- Numeric inputs in monospace; labels in clean sans-serif.
- Theme tokens for colors, spacing, radius, and shadows.

## Hotkeys (Core)
- V: Select/move tool
- A: Node editor
- P: Pen tool
- S: Shape tool
- G: Group
- Space (hold): Pan
- 1/2/3: Mode swap (Forge/Lab/Stage)

## Onboarding (First 5 Minutes)
- Draw a basic pin in Forge.
- Apply a Pulse vibe in Lab.
- Drag it into the Stage from the tray.
- Add an alternate state and preview it.

## Product Story Assets
- Landing page: hero demo of Forge->Lab->Stage pipeline, 4 pillars grid, engine badges.
- Glossary: Atom/Molecule/Organism, Forge/Stage/Lab, Vibe Check.

## Experience Goals
- Zero-latency edits (Focus updates Stage within one frame).
- Clear separation of roles while preserving fast mode switching.
