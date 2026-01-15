# Product Overview

## Purpose

Multi-Tool Design Suite is a dual-viewport creative workspace for building visual scenes. The left side is a focused editor for detailed SVG work, while the right side is a stage canvas for composition.

## Where To Start

1. Pick a mode from the left icon bar.
2. Select an asset in the shelf to load it into the editor.
3. Drag assets into the stage to compose the scene.
4. Use the inspector on the right for precise controls.
5. Export when the scene is ready.

## Core Workflow

1. Import or create assets in the library.
2. Edit vector details in the Focus Window.
3. Compose and transform in the Stage Canvas.
4. Apply FX/vibes for motion and feel.
5. Export bundles or static outputs.

## Modes

- SVG Edit: precision editing and boolean/path tools
- FX Lab: vibe stack and live preview effects
- Scene Maker: layout, layering, and transforms
- Export: packaged output formats

## Top Bar Controls

- Project name
- Health score (overall consistency and optimization)
- Screensaver toggle
- Layout preset switcher
- AI model selector
- Undo/Redo history controls

## AI Features

AI tools are optional. When enabled, they use the model selected in the top bar.

- AI Trace Tool: converts raster input into vector paths
- Model selector: chooses provider + model used by AI tools
- API keys: only required if you use AI features

## Data Model (High-Level)

- Project
  - Library: assets and components
  - Scene: layers and object instances
  - Meta: name and resolution

## Personal Notes (For Me)

- Sample project: `public/sample-project.json`
- Main composition: `src/components/MainLayout.tsx`
- Modes and hotkeys: `src/hooks/useKeyboardShortcuts.ts`
