# Editing and Interaction

## Forge (Vector Editing)
- Pen tool: click for corner, click-drag for Bezier handles, add/remove nodes.
- Node editor: drag anchor and control points, toggle sharp/smooth/broken nodes.
- Boolean ops: union, subtract, intersect, exclude (Paper.js recommended).
- Stroke lab: width, cap, join, dash arrays, miter limits.
- Masking: select shapes -> apply clip/mask for window effects.

## Node Types
- Sharp: no handles, straight edges.
- Smooth (mirrored): linked handles for continuous curves.
- Broken (asymmetric): independent handles for custom curvature.

## Path Engine
- Parse SVG path into nodes for edit handles.
- Rebuild path data on drag to update SVG in real time.
- Support snapping to grid and magnetic point snapping.

## Focus Window
- Zoomed asset view with grid and SVG overlay.
- Ghost tracing: optional Stage background at low opacity for alignment.
- Toggle between Nodes and Vibe controls.

## Stage Interactions
- Drag/drop assets from tray to create instances.
- Bounding box with 8 scale handles + rotation handle.
- Multi-select (shift click / marquee box) and group/ungroup.
- Smart guides for alignment and snapping.
- Layer order reflects array order; drag in layer tree to reorder.

## Layer Tree
- Nested groups with indentation and collapse/expand.
- Visibility and lock toggles.
- Vibe indicators for animated assets.
- Context menu actions: flatten, make prefab, copy vibe.

## Inspector Sections
- Transform: position, size, rotation, z-index.
- Stylist: fill, gradient, stroke styles and alignment.
- Vibe: effect selection and parameters.
- Logic: custom key/value metadata for exports.

## Workspace Separation
- 1px borders across all panels.
- Active workspace glow and mode-specific hotkeys.
