// Core exports
export * from './core';

// Component exports
export * from './components';

// Design tokens (for backward compatibility)
export { DESIGN_TOKENS } from './core/tokens';
export type { UnifiedDesignSystem, ThemeMode, EffectMode, NeonColor } from './core/types';

// Theme Lab themes (25 themes)
export { THEME_LAB_THEMES, getThemeColors, getThemeNames, hasTheme } from './themes';
export type { ThemeColors } from './themes';
