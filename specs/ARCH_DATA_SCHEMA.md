# Data Architecture & JSON Schema

## State Management Strategy
The application uses a "Source of Truth" Library. The Scene Maker only stores **references** to IDs in the Library.

## The Unified Project Schema
```json
{
  "project": {
    "meta": { "name": "Untitled", "resolution": [1920, 1080] },
    "library": {
      "assets": [
        {
          "id": "uuid_01",
          "name": "Neon_Star",
          "type": "svg",
          "data": "<svg>...</svg>",
          "fx": { "glow": true, "pulse": 0.5 }
        }
      ],
      "components": [
        {
          "id": "comp_01",
          "name": "Health_UI",
          "base_asset": "uuid_01",
          "logic": "vibe_check_script_v1"
        }
      ]
    },
    "scene": {
      "layers": [
        {
          "id": "layer_1",
          "objects": [
            { "ref": "uuid_01", "x": 100, "y": 100, "z": 1, "scale": 1.0 }
          ]
        }
      ]
    }
  }
}
```

## Implementation Requirements

1. **Sync Engine:** When `library.assets[i].data` changes, re-render all objects in `scene.layers` referencing that ID.
2. **Export Modules:** 
   - PNG/SVG Export for individual assets.
   - JSON Manifest export for the full Scene.
   - Script-bundled export for FX Lab components.

