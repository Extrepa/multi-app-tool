# Product Overview

## Purpose

Multi-Tool Design Suite is a dual-viewport creative workspace for building visual scenes. The left side is a focused editor for detailed SVG work, while the right side is a stage canvas for composition.

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

## Data Model (High-Level)

- Project
  - Library: assets and components
  - Scene: layers and object instances
  - Meta: name and resolution

## Personal Notes (For Me)

- Sample project: `public/sample-project.json`
- Main composition: `src/components/MainLayout.tsx`
- Modes and hotkeys: `src/hooks/useKeyboardShortcuts.ts`
