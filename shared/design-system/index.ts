// Unified Design System Exports
// Merged from shared/design-system and all-components/errl-design-system

export * from './src';
export { DESIGN_TOKENS } from './src/core/tokens';
export type { UnifiedDesignSystem, ThemeMode, EffectMode, NeonColor } from './src/core/types';

// Backward compatibility: Export old design-system constants
export { DESIGN_SYSTEM } from './design-system';
export type { DesignSystem } from './design-system';
