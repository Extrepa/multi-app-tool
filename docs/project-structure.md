# Project Structure Documentation

**Project:** multi-tool-app
**Last Updated:** 2026-01-09

## Directory Structure
```
multi-tool-app/
- `BOOLEAN_OPERATIONS_IMPLEMENTATION.md`
- `COMPLETION_SUMMARY.md`
- `FINAL_VERIFICATION_NOTES.md`
- `IMPLEMENTATION_NOTES.md`
- `IMPLEMENTATION_NOTES_FINAL.md`
- `IMPLEMENTATION_STATUS.md`
- `IMPLEMENTATION_VERIFICATION.md`
- `INDEX.md`
- `NEXT_SESSION_PLAN.md`
- `PROJECT_STATUS.md`
- `README.md`
- `VERIFICATION_REPORT.md`
- `docs/`
  - `archive/`
  - `build docs/`
  ... (15 more items)
```

## File Organization

### Core Files

- Configuration files (package.json, tsconfig.json, etc.)
- Entry points (index.html, main.js, etc.)
- Source code directories

### Documentation

- Root documentation files
- docs/ directory (this directory)
- README.md

### Build and Distribution

- Build output directories
- Distribution files
- Compiled assets

## Key Directories

### `src/` - Source Code
- `components/Editors/` - Focus Window and Stage Canvas
- `components/Inspector/` - Contextual sidebars (SVG, FX, Scene, Export)
- `components/Library/` - Asset shelf and library management
- `state/` - Zustand store for project state
- `engine/` - Vibe logic and export pipelines
- `utils/` - Utility functions

### `specs/` - Specifications
- All 11 specification files (PRD, ARCH, UI, FX, EXPORT, etc.)

### `docs/` - Documentation
- Implementation plans and gap analysis
- Gemini implementation series
- System documentation series

## File Naming Conventions

- React components: PascalCase (e.g., `FocusWindow.tsx`)
- Utilities: camelCase (e.g., `helpers.ts`)
- Spec files: UPPERCASE (e.g., `PRD_SYSTEM_OVERVIEW.md`)

## Import/Export Structure

- ES modules
- TypeScript
- React components
- Paper.js for vector operations
