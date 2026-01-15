# Export Pipeline & Platform Integration

## Output Formats
1. **The Flash Bundle:** 
   - Convert the JSON Scene Graph into a format compatible with the target Flash engine (e.g., OpenFL or Haxe).
   - Bundle all SVGs into a single asset manifest.
2. **Component Module:** 
   - Export a standalone React/JS component with the SVG embedded and FX logic as props.
3. **Static Export:** 
   - High-res PNG/SVG capture of the entire Scene.

## Asset Optimization
- **Path Simplification:** Clean up redundant SVG nodes during export.
- **Atlas Generation:** Combine PNG props into a sprite sheet for game engine efficiency.

## Cursor Instructions
- Build an "Export Modal" that allows the user to select the target platform.
- Write a "Sanitizer" function that ensures IDs in the JSON don't conflict when multiple components are exported together.

