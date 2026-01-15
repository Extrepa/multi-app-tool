# Shared Utilities Architecture

**Created:** 2027-01-07  
**Purpose:** Detailed architecture documentation for shared utilities

---

## Overview

This document describes the architecture, design principles, and implementation details of the shared utilities package.

---

## Design Principles

### 1. Generic Over Specific

Utilities should work with multiple data types, not be tied to specific project structures.

**Good:**
```typescript
function useHistory<T>(initialState: T): HistoryHook<T>
```

**Bad:**
```typescript
function useDesignHistory(initialState: DesignState): DesignHistoryHook
```

### 2. Composable

Small, focused functions that can be combined.

**Good:**
```typescript
const result = unionPaths(path1, path2);
const simplified = simplifyPath(result, 0.1);
const offset = offsetPath(simplified, 5);
```

**Bad:**
```typescript
const result = doEverythingWithPath(path1, path2); // Too specific
```

### 3. Type-Safe

Full TypeScript support with strict types.

```typescript
interface ExportOptions {
  format?: 'json' | 'svg' | 'png';
  quality?: number;
  scale?: number;
}

function exportData(data: unknown, filename: string, options?: ExportOptions): void;
```

### 4. Tree-Shakeable

Import only what you need.

```typescript
// Good - tree-shakeable
import { exportJSON } from '@/shared/utils/export';

// Bad - imports everything
import * as exportUtils from '@/shared/utils/export';
```

### 5. Framework Agnostic

Core utilities work without React (hooks are separate).

```typescript
// Core utility (no React)
export function unionPaths(path1: Path, path2: Path): Path;

// React hook (uses core utility)
export function usePaperPaths() {
  // Uses unionPaths internally
}
```

---

## Package Structure

### Hooks (`shared/hooks/`)

React-specific hooks that use core utilities.

**Files:**
- `useHistory.ts` - History/undo-redo hook
- `useKeyboardShortcuts.ts` - Keyboard shortcuts hook

**Pattern:**
- React hooks only
- Use core utilities internally
- Provide React-specific APIs

### Utils (`shared/utils/`)

Framework-agnostic utilities organized by domain.

**Structure:**
- `export/` - Export utilities (JSON, SVG, PNG, ZIP)
- `paper/` - Paper.js wrappers and utilities
- `scene/` - Scene graph utilities
- `interaction/` - Drag/drop, selection, transform utilities

**Pattern:**
- Pure functions
- No React dependencies
- Can be used in any context

### Design System (`shared/design-system/`)

Unified React-focused design system.

**Structure:**
- `src/tokens.ts` - Design tokens
- `src/core/` - Core functionality (ThemeProvider, hooks)
- `src/components/` - React components
- `src/styles/` - CSS files

**Pattern:**
- React-focused
- Theme management
- Component library

### Types (`shared/types/`)

Shared TypeScript type definitions.

**Files:**
- `history.ts` - History types
- `scene.ts` - Scene graph types
- `export.ts` - Export types

**Pattern:**
- Type definitions only
- No runtime code
- Reusable across projects

---

## API Design Patterns

### Function Naming

- **Verbs for actions:** `exportJSON`, `unionPaths`, `simplifyPath`
- **Nouns for utilities:** `sceneGraph`, `layerManager`
- **Hooks prefix with `use`:** `useHistory`, `useKeyboardShortcuts`

### Error Handling

```typescript
// Validate inputs
if (!path1 || !path2) {
  throw new Error('Paths required for union operation');
}

// Return null/undefined for optional operations
function findNode(id: string): Node | undefined {
  return nodes[id];
}
```

### Options Pattern

```typescript
interface ExportOptions {
  format?: 'json' | 'svg' | 'png';
  quality?: number;
  scale?: number;
}

function exportData(data: unknown, filename: string, options?: ExportOptions): void;
```

---

## Import/Export Patterns

### Barrel Exports

Each directory has an `index.ts` that re-exports all utilities:

```typescript
// shared/utils/export/index.ts
export { exportJSON } from './jsonExporter';
export { exportSVG } from './svgExporter';
export { exportPNG } from './pngExporter';
export { exportZIP } from './zipExporter';
export { downloadBlob } from './download';
export type { ExportOptions, PNGExportOptions } from './types';
```

### Main Export

Root `index.ts` exports everything:

```typescript
// shared/index.ts
export * from './hooks';
export * from './utils';
export * from './design-system';
export * from './types';
```

### Selective Imports

Projects should import only what they need:

```typescript
// Good - tree-shakeable
import { useHistory } from '@/shared/hooks';
import { exportJSON } from '@/shared/utils/export';

// Also good - barrel exports are tree-shakeable
import { useHistory, useKeyboardShortcuts } from '@/shared/hooks';
```

---

## Testing Strategy

### Unit Tests

- Test each utility function independently
- Test edge cases
- Test error handling
- 90%+ coverage target

### Integration Tests

- Test utilities working together
- Test with React components (for hooks)
- Test with real data

### Performance Tests

- Benchmark critical operations
- Compare before/after migrations
- Ensure no performance degradation

---

## Versioning Strategy

### Semantic Versioning

- **Major** - Breaking changes
- **Minor** - New features (backward compatible)
- **Patch** - Bug fixes

### Breaking Changes

- Require major version bump
- Provide migration guide
- Deprecation period (2 versions)

### Deprecation Process

1. Mark as deprecated in JSDoc
2. Add deprecation notice
3. Keep for 2 versions
4. Remove in next major version

---

## Build Configuration

### TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### Package.json

```json
{
  "name": "@errl/shared",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./hooks": "./dist/hooks/index.js",
    "./utils": "./dist/utils/index.js",
    "./design-system": "./dist/design-system/index.js"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0"
  },
  "dependencies": {
    "paper": "^0.12.18"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "vitest": "^4.0.0"
  }
}
```

---

## Performance Considerations

### Bundle Size

- Keep utilities small and focused
- Use tree-shaking
- Avoid large dependencies
- Lazy load when possible

### Runtime Performance

- Optimize hot paths
- Cache expensive operations
- Use efficient algorithms
- Benchmark critical operations

---

## Security Considerations

### Input Validation

- Validate all inputs
- Sanitize file names
- Prevent path traversal
- Validate data formats

### Safe Operations

- Use safe defaults
- Handle errors gracefully
- Don't expose internal state
- Validate external data

---

## Migration Strategy

### Backward Compatibility

- Maintain old APIs during migration
- Provide compatibility layers
- Gradual migration approach
- Clear migration paths

### Testing During Migration

- Test each project after migration
- Visual regression testing
- Performance benchmarking
- Rollback procedures ready

---

## Future Considerations

### Potential Additions

- Three.js utilities (if consensus reached)
- AI service utilities (Gemini wrapper)
- More interaction utilities
- Animation utilities

### Expansion Guidelines

- Must be used by 3+ projects
- Must be truly shared
- Must follow design principles
- Must have tests and documentation

---

## References

- [README](README.md) - Usage guide
- [Consolidation Strategy](../CONSOLIDATION_STRATEGY.md) - Strategic approach
- [Code Patterns](../CODE_PATTERNS.md) - Common patterns
- [Pattern Reference](../PATTERN_REFERENCE.md) - Quick reference
