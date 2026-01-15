# Shared Utilities

**Created:** 2027-01-07  
**Purpose:** Shared utilities, hooks, and design system for all Errl projects

---

## Overview

This directory contains shared code extracted from multiple projects to reduce duplication and improve maintainability. All shared utilities are designed to be:

- **Generic** - Work with multiple data types
- **Composable** - Small, focused functions
- **Type-Safe** - Full TypeScript support
- **Tree-Shakeable** - Import only what you need
- **Framework Agnostic** - Core utilities work without React (hooks are separate)

---

## Directory Structure

```
shared/
├── README.md                    # This file
├── ARCHITECTURE.md              # Architecture documentation
├── package.json                 # Package metadata
├── tsconfig.json                # TypeScript config
├── hooks/
│   ├── useHistory.ts           # Unified history hook
│   ├── useKeyboardShortcuts.ts # Keyboard shortcuts hook
│   └── index.ts
├── utils/
│   ├── export/
│   │   ├── jsonExporter.ts     # JSON export utilities
│   │   ├── svgExporter.ts      # SVG export utilities
│   │   ├── pngExporter.ts     # PNG export utilities
│   │   ├── zipExporter.ts     # ZIP export utilities
│   │   ├── download.ts         # Common download utility
│   │   └── index.ts
│   ├── paper/
│   │   ├── pathOperations.ts   # Paper.js wrappers
│   │   ├── booleanOps.ts       # Boolean operations
│   │   ├── pathOffset.ts      # Path offset utilities
│   │   ├── pathSimplifier.ts  # Path simplification
│   │   └── index.ts
│   ├── scene/
│   │   ├── sceneGraph.ts       # Scene graph utilities
│   │   ├── layerManager.ts    # Layer management
│   │   └── index.ts
│   ├── interaction/
│   │   ├── dragDrop.ts        # Drag and drop utilities
│   │   ├── selection.ts       # Selection utilities
│   │   ├── transform.ts       # Transform utilities
│   │   └── index.ts
│   └── index.ts
├── design-system/
│   ├── README.md               # Design system docs
│   ├── src/
│   │   ├── tokens.ts           # Design tokens
│   │   ├── core/
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── useErrlTheme.ts
│   │   │   └── types.ts
│   │   ├── components/
│   │   │   ├── ErrlWrapper.tsx
│   │   │   ├── ThemeControls.tsx
│   │   │   └── index.ts
│   │   └── styles/
│   │       ├── design-system.css
│   │       ├── animations.css
│   │       └── utilities.css
│   └── index.ts
└── types/
    ├── history.ts               # History types
    ├── scene.ts                 # Scene graph types
    ├── export.ts                # Export types
    └── index.ts
```

---

## Usage

### Importing Shared Utilities

**Recommended Pattern:**
```typescript
// Import specific utilities
import { useHistory } from '@/shared/hooks';
import { exportJSON } from '@/shared/utils/export';
import { unionPaths } from '@/shared/utils/paper';

// Or use barrel exports
import { useHistory, useKeyboardShortcuts } from '@/shared/hooks';
import { exportJSON, exportSVG, exportPNG } from '@/shared/utils/export';
```

**Path Aliases:**
Configure in your project's `tsconfig.json` and `vite.config.ts`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/shared/*": ["../shared/*"]
    }
  }
}
```

### Using Hooks

```typescript
import { useHistory } from '@/shared/hooks';

function MyComponent() {
  const { state, setState, undo, redo, canUndo, canRedo } = 
    useHistory(initialState, { maxHistory: 50 });
  
  // Use history...
}
```

### Using Export Utilities

```typescript
import { exportJSON, exportSVG, exportPNG } from '@/shared/utils/export';

// Export JSON
exportJSON(data, 'my-file.json');

// Export SVG
exportSVG(svgElement, 'my-file.svg');

// Export PNG
await exportPNG(canvas, 'my-file.png', { scale: 2 });
```

### Using Design System

```tsx
import { ThemeProvider, useErrlTheme } from '@/shared/design-system';
import '@/shared/design-system/src/styles/design-system.css';

function App() {
  return (
    <ThemeProvider>
      <MyComponent />
    </ThemeProvider>
  );
}

function MyComponent() {
  const { theme, effect, getErrlButtonStyle } = useErrlTheme();
  return <button style={getErrlButtonStyle('default')}>Click me</button>;
}
```

---

## Adding New Shared Utilities

### Guidelines

1. **Check if it already exists** - Search existing utilities first
2. **Ensure it's truly shared** - Used by 3+ projects
3. **Make it generic** - Work with multiple data types
4. **Write tests** - Comprehensive test coverage
5. **Document it** - Clear API documentation
6. **Update this README** - Add to directory structure

### Process

1. Create utility in appropriate directory
2. Write tests
3. Document API
4. Update `index.ts` exports
5. Update this README
6. Create migration guide if needed

---

## Versioning

- **Semantic Versioning** - Follow semver (major.minor.patch)
- **Breaking Changes** - Require major version bump
- **Deprecation Period** - 2 versions before removal
- **Migration Guides** - Required for breaking changes

---

## Testing

All shared utilities must have:
- Unit tests (90%+ coverage)
- Integration tests
- Type safety checks
- Performance benchmarks (where applicable)

Run tests:
```bash
npm test
```

---

## Contributing

1. Follow code style guidelines
2. Write tests for new utilities
3. Update documentation
4. Get review before merging
5. Update migration guides if API changes

---

## Migration Status

**Last Updated:** 2027-01-07

### Completed Migrations

- ✅ **History Hooks** - All 5 projects migrated
  - `figma-clone-engine`, `errl_scene_builder`, `svg_editor`, `multi-tool-app`, `psychedelic-liquid-light-show`
  - See: [MIGRATION_GUIDE_HISTORY_HOOKS.md](../docs/migration-guides/MIGRATION_GUIDE_HISTORY_HOOKS.md)

- ✅ **Design System** - Unified system created, pilot migration complete
  - `errl_scene_builder` (pilot)
  - See: [MIGRATION_GUIDE_DESIGN_SYSTEMS.md](../docs/migration-guides/MIGRATION_GUIDE_DESIGN_SYSTEMS.md)

- ✅ **Paper.js Utilities** - Shared utilities created, `multi-tool-app` migrated
  - See: [MIGRATION_GUIDE_PAPER_JS.md](../docs/migration-guides/MIGRATION_GUIDE_PAPER_JS.md)

- ✅ **Export Utilities** - Shared utilities created, 2 projects migrated
  - `figma-clone-engine`, `errl_scene_builder`
  - See: [MIGRATION_GUIDE_EXPORT_UTILITIES.md](../docs/migration-guides/MIGRATION_GUIDE_EXPORT_UTILITIES.md)

- ✅ **Keyboard Shortcuts** - Shared hook created, `errl_scene_builder` migrated
  - Utilities available for other projects

- ✅ **Liquid Light Shows** - Simple version archived
  - See: [docs/decisions/003-liquid-light-show-merge.md](../docs/decisions/003-liquid-light-show-merge.md)

### Available Utilities (Ready for Migration)

- **Interaction Utilities** - Drag/drop, selection, transform utilities available
- **Scene Graph Utilities** - Scene graph and layer management utilities available
- **Three.js** - Decision: Keep project-specific (no shared utilities needed)

See individual migration guides for details:
- [Design Systems](../docs/migration-guides/MIGRATION_GUIDE_DESIGN_SYSTEMS.md)
- [History Hooks](../docs/migration-guides/MIGRATION_GUIDE_HISTORY_HOOKS.md)
- [Paper.js Utilities](../docs/migration-guides/MIGRATION_GUIDE_PAPER_JS.md)
- [Export Utilities](../docs/migration-guides/MIGRATION_GUIDE_EXPORT_UTILITIES.md)

---

## References

- [Architecture Documentation](ARCHITECTURE.md) - Detailed architecture
- [Consolidation Strategy](../CONSOLIDATION_STRATEGY.md) - Strategic approach
- [Pattern Reference](../PATTERN_REFERENCE.md) - Quick reference guide
- [Code Patterns](../CODE_PATTERNS.md) - Common patterns
