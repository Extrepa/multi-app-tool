# Gemini Summary 05 - Export and Advanced Systems

## Export Targets
- Web component bundle (React/Vue).
- Game engine bundle (Flash/OpenFL/Haxe, Phaser, PixiJS).
- Static PNG/SVG captures.

## Bundle Structure
- manifest.json: instance transforms and ordering.
- library.json: asset definitions and vibe settings.
- assets/: optimized SVG/PNG files.
- vibes.js: runtime animation math.
- styles.css: global palette variables.
- logic.ts: serialized interaction rules.

## Optimization and Sanitizing
- Path simplification to reduce node count.
- Sprite atlas generation for PNG props.
- ID sanitizer to avoid collisions.

## Runtime Bridge
- Math-only playback for small, fast runtime.
- Local live-bridge via sockets for instant game updates.
- Tiny runtime code generator for production embeds.
- Headless renderer for export-only processing.

## Collaboration and Cloud
- CRDT or WebSocket sync with presence indicators.
- Selective locking for focus edits.
- One-click publish to CDN with versioned deploys.

## AI Assist
- Image-to-vector tracing.
- Prompt-to-vibe presets.
- Auto-layout cleanup.

## Extensibility
- Plugin API for custom vibes and export hooks.
- Custom inspector tabs for domain logic.

## Performance and Diagnostics
- Ghost-instance proxies (bitmap while idle).
- Debug console: JSON inspector, vibe monitor, draw call counter.
- Project health tools: unused asset finder, resolution warnings.
- Performance dashboard for path count and memory signals.

## Serialization and Hydration
- Universal manifest schema for save/load.
- Serializer utility and project hydration on load.
- Batch export zip generator for release bundles.

## Optimization Pipeline
- SVG minification and path purifier.
- Production filter toggle to reduce preview overhead.

## Rigging and Bridge Snippet
- Multi-part character rigs with local vibes + group-level vibe.
- Standalone HTML/JS snippet for sharing a rigged character.

## Build Order (Condensed)
1. App shell and state store.
2. Drag/drop Stage and selection sync.
3. Forge tools (pen, node, boolean).
4. Lab controls and vibe preview.
5. Export pipeline and runtime bridge.
