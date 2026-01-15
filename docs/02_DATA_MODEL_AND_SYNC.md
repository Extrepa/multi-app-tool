# Data Model and Sync

## Core Schema (Reference-Based)
- project.meta: name, resolution, fps.
- project.library.assets: raw SVG/PNG data, tags, optional states/history.
- project.library.components: asset refs + vibe/logic overrides.
- project.scene.layers or instances: ordered array of instances with transform data.

Example shape:
```json
{
  "project": {
    "meta": { "name": "Untitled", "resolution": [1920, 1080], "fps": 60 },
    "library": {
      "assets": [
        { "id": "asset_01", "name": "Neon_Star", "type": "svg", "data": "<svg>...</svg>" }
      ],
      "components": [
        { "id": "comp_01", "base_asset": "asset_01", "vibe": { "type": "pulse", "speed": 1.2 } }
      ],
      "vibe_templates": []
    },
    "scene": {
      "instances": [
        { "id": "inst_01", "ref": "asset_01", "x": 100, "y": 100, "scale": 1, "rotation": 0 }
      ]
    }
  }
}
```

## Master-Instance Sync
- Library is the source of truth; scene instances store references and transforms.
- When asset data changes, all referencing instances re-render.
- Debounce scene-wide autosave after edits; render a proxy on Stage during intense edits.

## Scene Graph and Nesting
- Nodes can be parented; parent transforms propagate to children.
- Groups and prefabs are stored as nested graphs in the library.
- Prefab instances can be unpacked locally or edited at source.

## Asset States and Versioning
- Assets can contain multiple named states (idle, active, broken).
- Instances track current_state to render the right SVG path.
- Asset history stored per asset (snapshots) for per-asset undo/redo.

## Responsive Layout and Anchoring
- Instances support anchors (left/center/right, top/middle/bottom).
- Flex-groups distribute children with spacing rules.
- Stage supports resize preview for responsive scene checks.

## Global Palette and Smart Metadata
- Palette library stores named colors; SVG fills can reference palette keys.
- Asset intelligence: tags, complexity, usage counts, dependency tracking.

## Diagnostics and Health Checks
- Unused asset finder and dependency warnings.
- Path simplification and resolution mismatch checks.

## Sample Data
- Provide a small project JSON for dev bootstrapping and UI tests.
