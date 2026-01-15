# Errl Design System

Shared design system for all Errl projects. Provides neon colors, themes, effects, and React components for consistent styling across the monorepo.

## Features

- **Themes**: Light and dark mode support
- **Neon Colors**: Cyan, blue, purple, magenta, pink, green, yellow
- **Effects**: Neon glow, rainbow borders, sparkle animations, gradients, fading
- **RGB Gradient Borders**: Thin borders with RGB fading effects
- **Ghost/Transparent Backgrounds**: Backdrop blur with transparency
- **React Components**: ThemeProvider, ErrlWrapper, ThemeControls

## Installation

This is a local package in the monorepo. To use it in other projects:

### 1. Add Alias in Vite Config

Add to your project's `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@errl-design-system': path.resolve(__dirname, '../errl-design-system/src'),
    },
  },
});
```

### 2. Add Alias in TypeScript Config

Add to your project's `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@errl-design-system/*": ["../errl-design-system/src/*"]
    }
  }
}
```

## Usage

### Import CSS

Import the design system CSS in your main entry file:

```typescript
import '@errl-design-system/styles/errlDesignSystem.css';
```

### Use Theme Provider

Wrap your app with `ThemeProvider`:

```tsx
import { ThemeProvider } from '@errl-design-system';

function App() {
  return (
    <ThemeProvider>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Use Design System Hook

Access theme and effects in components:

```tsx
import { useErrlTheme } from '@errl-design-system';

function MyComponent() {
  const { theme, effect, themeColors, getErrlButtonStyle } = useErrlTheme();
  
  return (
    <button style={getErrlButtonStyle('default')}>
      Click me
    </button>
  );
}
```

### Use ErrlWrapper Component

Wrap components with Errl styling:

```tsx
import { ErrlWrapper } from '@errl-design-system';

function MyComponent() {
  return (
    <ErrlWrapper applyBorder={true} applyGlow={true}>
      <div>Content with Errl styling</div>
    </ErrlWrapper>
  );
}
```

### Use Theme Controls

Add theme/effect controls to your UI:

```tsx
import { ThemeControls } from '@errl-design-system';

function SettingsPanel() {
  return (
    <div>
      <ThemeControls compact={true} />
    </div>
  );
}
```

## API Reference

### Core Exports

#### `ERRL_DESIGN_SYSTEM`

Main design system object containing:
- `themes`: Dark and light theme colors
- `neon`: Neon color palette
- `borders`: RGB gradient border definitions
- `gradients`: Gradient presets
- `shadows`: Glow and shadow effects
- `borderStyles`: Border width and radius definitions
- `spacing`: Spacing scale

#### `ThemeProvider`

React context provider for theme management.

**Props:**
- `children: ReactNode` - Child components

#### `useErrlTheme(componentId?: string)`

Hook to access theme and design system utilities.

**Returns:**
- `theme: ThemeMode` - Current theme ('light' | 'dark')
- `effect: EffectMode` - Current effect mode
- `neonColor: NeonColor` - Current neon color
- `themeColors` - Theme color object
- `styles` - Computed styles object
- `setTheme`, `setEffect`, `setNeonColor` - Theme setters
- `getErrlButtonStyle(variant)` - Get button styles
- `getErrlCardStyle()` - Get card styles
- `getErrlInputStyle()` - Get input styles
- `applyErrlStyle(baseStyle)` - Apply Errl styles to existing style object

#### `useErrlThemeContext()`

Direct access to theme context (use `useErrlTheme` instead in most cases).

### Component Exports

#### `ErrlWrapper`

Wrapper component that applies Errl Design System styles.

**Props:**
- `children: ReactNode` - Child components
- `componentId?: string` - Component ID for per-component theme overrides
- `effect?: EffectMode` - Override effect mode
- `className?: string` - Additional CSS classes
- `style?: React.CSSProperties` - Additional inline styles
- `applyBorder?: boolean` - Apply RGB gradient border (default: true)
- `applyGlow?: boolean` - Apply neon glow effect (default: false)
- `applyBackground?: boolean` - Apply theme background (default: true)

#### `ThemeControls`

UI component for theme and effect selection.

**Props:**
- `componentId?: string` - Component ID for per-component overrides
- `showGlobalToggle?: boolean` - Show global/per-component toggle (default: true)
- `compact?: boolean` - Use compact layout (default: false)

### Helper Functions

#### `getErrlBorder(effect?: EffectMode, color?: NeonColor): string`

Get border style based on effect and color.

#### `getErrlBackground(theme?: ThemeMode, effect?: EffectMode): string`

Get background style based on theme and effect.

#### `getErrlGlow(color?: NeonColor | 'rainbow'): string`

Get glow/shadow style based on color.

#### `getErrlPanelStyle(theme?: ThemeMode, effect?: EffectMode, neonColor?: NeonColor): React.CSSProperties`

Get complete panel style object.

## Types

```typescript
type ThemeMode = 'light' | 'dark';
type EffectMode = 'none' | 'neon' | 'rainbow' | 'sparkle' | 'gradient' | 'fade';
type NeonColor = 'cyan' | 'blue' | 'purple' | 'magenta' | 'pink' | 'green' | 'yellow';
```

## CSS Variables

The design system provides CSS variables that can be used in your styles:

```css
--errl-bg
--errl-bg-alt
--errl-surface
--errl-panel
--errl-border
--errl-text
--errl-muted
--errl-accent
--errl-accent-2
--errl-accent-3
--errl-accent-soft
--errl-neon-cyan
--errl-neon-blue
--errl-neon-purple
--errl-neon-magenta
--errl-neon-pink
--errl-neon-green
--errl-neon-yellow
```

## Utility Classes

- `.rainbow-border` - Rainbow animated border
- `.sparkle` - Sparkle animation effect
- `.neon-glow` - Neon cyan glow effect
- `.neon-glow-purple` - Neon purple glow effect
- `.neon-glow-blue` - Neon blue glow effect
- `.fade-effect` - Fade animation
- `.shimmer-effect` - Shimmer animation

## Examples

### Basic Button with Errl Styling

```tsx
import { useErrlTheme } from '@errl-design-system';

function Button() {
  const { getErrlButtonStyle } = useErrlTheme();
  
  return (
    <button style={getErrlButtonStyle('default')}>
      Click me
    </button>
  );
}
```

### Card with Theme-Aware Styling

```tsx
import { ErrlWrapper, useErrlTheme } from '@errl-design-system';

function Card() {
  const { getErrlCardStyle } = useErrlTheme();
  
  return (
    <ErrlWrapper applyBorder={true} applyGlow={true}>
      <div style={getErrlCardStyle()}>
        Card content
      </div>
    </ErrlWrapper>
  );
}
```

### Component with Per-Component Theme Override

```tsx
import { ErrlWrapper, useErrlTheme } from '@errl-design-system';

function SpecialComponent() {
  const { setComponentOverride } = useErrlTheme('special-component');
  
  useEffect(() => {
    setComponentOverride?.('special-component', { 
      theme: 'light', 
      effect: 'neon',
      neonColor: 'purple' 
    });
  }, []);
  
  return (
    <ErrlWrapper componentId="special-component">
      Special content
    </ErrlWrapper>
  );
}
```

## Project Structure

```
errl-design-system/
├── src/
│   ├── core/
│   │   ├── errlDesignSystem.ts    # Core constants and types
│   │   ├── ThemeProvider.tsx      # React context provider
│   │   └── useErrlTheme.ts        # Custom hook
│   ├── components/
│   │   ├── ErrlWrapper.tsx        # Wrapper component
│   │   ├── ThemeControls.tsx       # Theme controls UI
│   │   └── ThemeControls.css      # Theme controls styles
│   ├── styles/
│   │   └── errlDesignSystem.css   # CSS variables and animations
│   └── index.ts                    # Main exports
├── package.json
└── README.md
```

## License

ISC

