# Project Overview: Integrated Component & Scene Creator

## Core Concept
A unified creative suite that handles the full pipeline of asset creation:
1. **Asset Creation (The Atom):** SVG/PNG Designer and "Pin" Creator.
2. **Logic & FX (The Molecule):** Component Maker / FX Lab / Vibe Check (adding behavior to assets).
3. **Layout (The Universe):** Scene Maker (a playground for layering props and components).

## Workflow Logic
- **Starting Point:** Users create or import an SVG/PNG.
- **The "Focus" Editor:** A dedicated window for surgical editing of a single asset (SVG Editor/Pin Designer).
- **The "Stage" Canvas:** A secondary window showing the full scene where multiple assets are layered.
- **Bi-directional Sync:** Changes in the Focus Editor must update all instances of that asset in the Scene Canvas in real-time.
- **Output:** Completed Scenes (Flash/Game ready) or standalone UI Components/Modules.

## Definitions
- **Prop:** A raw SVG or PNG asset.
- **Component:** A Prop plus "Vibe" data (FX, animations, or logic scripts).
- **Scene:** A JSON-based manifest of Props and Components positioned on a 2D stage.

