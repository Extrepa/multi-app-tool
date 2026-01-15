# Multi-Tool Design Suite

A unified creative suite that combines SVG editing, FX/vibe logic, and scene composition in a dual-viewport interface.

## Features

- **Dual-Viewport Interface**: Focus Window (left) for detailed editing and Stage Canvas (right) for scene composition
- **SVG Editor**: High-detail editing with grid overlay and zoom controls
- **FX Lab**: Apply vibes (pulse, glow, float, shake, rotation) with live preview
- **Scene Maker**: Drag and drop assets, manage layers, transform objects
- **Asset Library**: Visual asset shelf with thumbnails
- **Export Pipeline**: Export to Flash bundle, React components, static SVG, or JSON

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Build output is generated in `dist/`.

## Deployment (Cloudflare Pages)

This repo is designed to build directly on Cloudflare Pages for the root subdomain `design.errl.wtf`.

**Cloudflare Pages settings:**
- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/`

**Environment variables (optional):**
- `VITE_GEMINI_API_KEY`
- `VITE_OPENAI_API_KEY`
- `VITE_ANTHROPIC_API_KEY`

These are only needed if you plan to use the AI tooling. Keys can also be stored locally in the browser via the UI.

## Notes on Local Dependencies

This repo vendors `shared/` and `errl-design-system/` inside the project so Cloudflare Pages can build without external workspace paths.

## Project Structure

- `src/components/Editors/` - Focus Window and Stage Canvas
- `src/components/Inspector/` - Contextual sidebars (SVG, FX, Scene, Export)
- `src/components/Library/` - Asset shelf and library management
- `src/state/` - Zustand store for project state
- `src/engine/` - Vibe logic and export pipelines
- `specs/` - All 11 specification files

## Keyboard Shortcuts

- `Cmd/Ctrl + 1` - Switch to SVG Edit mode
- `Cmd/Ctrl + 2` - Switch to FX Lab mode
- `Cmd/Ctrl + 3` - Switch to Scene Maker mode
- `Cmd/Ctrl + 4` - Switch to Export mode
- `Escape` - Clear selection

## Specifications

All specification files are located in the `specs/` directory:
- PRD_SYSTEM_OVERVIEW.md
- ARCH_DATA_SCHEMA.md
- UI_LAYOUT_SPEC.md
- FX_LAB_VIBE_LOGIC.md
- EXPORT_PIPELINE_FLASH.md
- VIBE_ENGINE_CORE.ts
- SCENE_INTERACTION_RULES.md
- SYNC_ENGINE_SPECS.md
- UI_THEME_TOKENS.json
- COMPONENT_FX_INTERFACE.md

## Sample Project

A sample project is included at `public/sample-project.json` that demonstrates the system with example assets and scene instances.

## Documentation

- [INDEX.md](INDEX.md) - Workspace index
- [PROJECT_STATUS.md](PROJECT_STATUS.md) - Current status
- [Documentation Index](docs/index.md) - Complete documentation index with links to all docs

### Implementation Documentation

**Feature Plans:**
- [Feature Implementation Plan](docs/FEATURE_IMPLEMENTATION_PLAN.md) - Comprehensive plan for missing features
- [Implementation Gap Analysis](docs/legacy/IMPLEMENTATION_GAP_ANALYSIS.md) - Current state vs. documentation requirements

**System Documentation:**
- [System Overview and UX](docs/01_SYSTEM_OVERVIEW_AND_UX.md) - System overview
- [Data Model and Sync](docs/02_DATA_MODEL_AND_SYNC.md) - Data model and synchronization
- [Editing and Interaction](docs/03_EDITING_AND_INTERACTION.md) - Editing tools and interactions
- [Vibe FX and Logic](docs/04_VIBE_FX_AND_LOGIC.md) - Visual effects and logic systems
- [Export and Roadmap](docs/05_EXPORT_AND_ROADMAP.md) - Export functionality and roadmap

**Technical Documentation:**
- [Architecture](docs/architecture.md) - Technical architecture and design
- [Project Structure](docs/project-structure.md) - File organization and structure

See [Documentation Index](docs/index.md) for complete list of all documentation files.
