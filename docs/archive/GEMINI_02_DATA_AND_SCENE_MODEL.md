# Gemini Summary 02 - Data and Scene Model

## Source of Truth
- Library stores raw assets and components.
- Scene stores instance references with transforms.
- Instances point to library IDs, not copied data.

## Core Schema (Condensed)
- project.meta: name, resolution, fps.
- project.library.assets: SVG/PNG data, tags, optional states/history.
- project.library.components: base asset refs + vibe/logic.
- project.library.vibe_templates: reusable FX presets.
- project.scene.instances or layers: ordered list for z-index.

## State Engine
- Store tracks library, scene, and selectionId.
- Core actions: updatePath, applyVibe, moveInstance, addAsset, instantiateAsset.

## Sync Engine
- Editing an asset updates all instances referencing it.
- Stage uses memoized selectors to re-render instances on change.
- Proxy or ghost rendering during heavy edits for performance.
- Debounced autosave after focus edits.

## Scene Graph and Nesting
- Parent-child nodes with matrix transforms.
- Nested components and prefabs as library assets.
- Prefab instances support edit source vs unpack.

## Asset States and Versioning
- assets[].states for multi-state props (idle, active, broken).
- instances[].current_state for per-instance state.
- Per-asset history snapshots for rollback.
- Focus window undo/redo separate from scene-wide history.

## Responsive Layout
- Instance anchors (left/center/right, top/middle/bottom).
- Flex groups for container spacing rules.
- Stage resize preview to validate layouts.

## Global Palette
- Palette definitions stored in library.
- SVG fills reference palette keys, resolved at render.

## Asset Intelligence and Health
- Auto tagging (color, complexity, size).
- Usage audit and dependency tracking.
- Unused asset finder.
- Path simplification and resolution checks.
