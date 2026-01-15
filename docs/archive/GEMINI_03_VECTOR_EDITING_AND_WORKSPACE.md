# Gemini Summary 03 - Vector Editing and Workspace

## Forge Tooling
- Pen tool: click for corner, click-drag for bezier handles.
- Node editor: drag anchors and handles, toggle sharp/smooth/broken.
- Boolean ops: union, subtract, intersect, exclude.
- Stroke lab: width, cap, join, dash arrays, miter limits.
- Masking and clipping for windowed shapes.
- Forge toolbar toggle between node editing and vibe preview.

## Path Engine
- Parse SVG path data into editable nodes.
- Rebuild path strings on drag for live updates.
- Grid snapping and point snapping for precision.

## Selection Model
- Bounding box with 8 scale handles + rotation handle.
- Double-click to enter Forge on selected instance.
- Marquee multi-select and group/ungroup.

## Stage Interaction
- Drag from asset tray to create instances.
- Drop zone calculates local coordinates for placement.
- Smart guides for alignment and snapping.
- Snapping engine uses proximity detection and ignores vibe offsets.
- Layer order reflects list index (z-index).

## Transform Overlay
- Dedicated transform box component for scaling and rotation.
- Vibe-aware scaling so animations do not distort edit handles.

## Layer Tree
- Nested groups with collapse/expand.
- Visibility and lock toggles.
- Vibe indicator icons.
- Context menu actions: flatten, make prefab, copy vibe.

## Grouping
- Component containers to move multi-part rigs as a unit.
- Group actions stored in the scene hierarchy.

## Inspector (Editing Scope Only)
- Transform: x, y, width, height, rotation, z-index.
- Stylist: fill, gradient, stroke alignment, dash patterns.

## Hotkeys (Editing Focus)
- V: select tool.
- A: node editor.
- P: pen tool.
- S: shape tool.
- G: group.
- Space (hold): pan.
- 1/2/3: mode swap (Forge/Lab/Stage).
