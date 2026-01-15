# Multi-Tool Design Suite

Personal-only note: This repo is published publicly so Cloudflare Pages can build it, but it is intended for my own use only. Please do not reuse, fork, or redistribute without permission.

A dual-viewport creative suite that combines SVG editing, FX/vibe logic, and scene composition in one workspace.

## What This Is

- A focused editor (left) for precise SVG work
- A stage canvas (right) for scene layout and composition
- A library shelf for assets and templates
- A vibe/FX system for animation-style effects
- Export tooling for bundles, components, and static assets

## Where To Start

1. Pick a mode from the left icon bar.
2. Select an asset in the shelf to load it into the editor.
3. Drag assets into the stage to compose the scene.
4. Use the inspector for precise controls.
5. Export when ready.

## Quick Start

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

- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `/`

Optional environment variables for AI tooling:
- `VITE_GEMINI_API_KEY`
- `VITE_OPENAI_API_KEY`
- `VITE_ANTHROPIC_API_KEY`

## Personal Notes (For Me)

- Sample data loads from `public/sample-project.json`.
- Core UI lives in `src/components/` and is wired in `src/App.tsx`.
- State is centralized in `src/state/` (Zustand).
- Vector operations rely on Paper.js utilities under `shared/utils/paper/`.

## Documentation

Start here: `docs/index.md`.

Key pages:
- `docs/overview.md` - product overview and workflows
- `docs/architecture.md` - tech stack and system layout
- `docs/project-structure.md` - where things live
- `docs/deployment.md` - Cloudflare Pages setup
- `docs/updates/2026-01-15.md` - detailed update log
- `docs/archive/` - legacy notes and drafts

## AI Features

AI tools are optional and only used if you enable them:
- AI Trace Tool turns raster input into vector paths.
- Model selector in the top bar chooses the provider/model.
- API keys are only required if you use AI tools.

## Local Dependencies

This repo vendors `shared/` and `errl-design-system/` inside the project so Cloudflare Pages can build without external workspace paths.
