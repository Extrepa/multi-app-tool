# Export and Roadmap

## Export Formats
- Web component (React/Vue) with embedded SVG and vibe runtime.
- Game engine bundle (Flash/OpenFL/Haxe, Phaser, PixiJS) via JSON + runtime.
- Static export (PNG/SVG snapshots).

## Bundle Structure (.vibepack)
- manifest.json: instance transforms, layering, scene graph.
- library.json: asset definitions and vibe settings.
- assets/: optimized SVG/PNG files.
- vibes.js: runtime animation math.
- styles.css: global palette variables.
- logic.ts: serialized interaction rules.

## Export Optimization
- Path simplification and SVG node cleanup.
- Atlas generation for PNG props.
- ID sanitizer to avoid collisions.

## Runtime Bridge
- Math-only animation playback (no baked video).
- Live bridge to local game engine via sockets for hot updates.

## Cloud and Collaboration
- Real-time multi-user sync (CRDT/WebSockets, presence, selective locking).
- One-click publish to CDN with versioned deploys.
- AI assist: image-to-vector, prompt-to-vibe, auto-layout.

## Extensibility
- Plugin API for custom vibes and export hooks.
- Custom inspector tabs for domain-specific logic.

## Performance and Diagnostics
- Ghost-instance proxies (bitmap until focused).
- Unused asset finder and resolution warnings.
- Debug console: JSON inspector, vibe monitor, draw call counter.

## Implementation Gap Summary
- Missing: pen tool, node editor, boolean ops, stroke lab, keyframer, filter stack.
- Partial: tool dock, layer tree, prefab workflow.
- Planned dependencies: Paper.js, SVG path parser, optional bezier-js.

## Build Order (Condensed)
1. App shell with 4-panel layout and theme tokens.
2. Zustand store with library/scene references and selection.
3. Stage drag/drop and selection sync to Focus window.
4. Node editor + pen tool + boolean ops.
5. Vibe sliders + runtime preview + export pipeline.

## Existing Build Docs (Reference Stubs)
- App shell: `build docs/App.tsx`
- Store: `build docs/useStudioStore.ts`
- Stage instance: `build docs/SceneInstance.tsx`
- Asset tray: `build docs/AssetTray.tsx`
- Focus window stub: `build docs/vibeEngine.ts`
