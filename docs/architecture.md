# Architecture

## Tech Stack

- React + Vite
- TypeScript
- Zustand (state)
- Paper.js (vector)
- Framer Motion (animation)

## High-Level Layout

- UI composition: `src/App.tsx` + `src/components/MainLayout.tsx`
- Editors: `src/components/Editors/`
- Inspector panels: `src/components/Inspector/`
- Library and assets: `src/components/Library/`
- Engine and exporters: `src/engine/`
- Shared utilities: `shared/`

## Data Flow

1. Project state lives in the Zustand store (`src/state/useStore.ts`).
2. Editors and panels read/write to the store.
3. FX logic and export pipelines live in `src/engine/`.
4. Vector ops rely on Paper.js helpers in `shared/utils/paper/`.

## Rendering

- Focus Window uses Paper.js for detailed SVG editing.
- Stage Canvas renders scene composition and transforms.
