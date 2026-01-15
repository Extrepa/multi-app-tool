# Errl Design System

**Created:** 2027-01-07  
**Status:** Consolidation Pending  
**Purpose:** Unified React-focused design system for all Errl projects

---

## Overview

This is the unified design system consolidating:
- `shared/design-system/` (vanilla JS/CSS)
- `all-components/errl-design-system/` (React-focused)

**Target:** React-focused unified design system with backward compatibility.

---

## Status

**Consolidation:** Pending  
**Migration:** See [MIGRATION_GUIDE_DESIGN_SYSTEMS.md](../../MIGRATION_GUIDE_DESIGN_SYSTEMS.md)

---

## Structure

```
shared/design-system/
├── README.md
├── src/
│   ├── tokens.ts           # Design tokens (merged from both)
│   ├── core/
│   │   ├── ThemeProvider.tsx
│   │   ├── useErrlTheme.ts
│   │   └── types.ts
│   ├── components/
│   │   ├── ErrlWrapper.tsx
│   │   ├── ThemeControls.tsx
│   │   └── index.ts
│   └── styles/
│       ├── design-system.css
│       ├── animations.css
│       └── utilities.css
└── index.ts
```

---

## Usage

**After consolidation:**

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
  return <button style={getErrlButtonStyle('default')}>Click</button>;
}
```

---

## Migration

See [MIGRATION_GUIDE_DESIGN_SYSTEMS.md](../../MIGRATION_GUIDE_DESIGN_SYSTEMS.md) for detailed migration instructions.

---

## References

- [Migration Guide](../../MIGRATION_GUIDE_DESIGN_SYSTEMS.md)
- [Architecture Decision Record](../../docs/decisions/001-design-system-consolidation.md)
- [Consolidation Strategy](../../CONSOLIDATION_STRATEGY.md)
