/**
 * Unified Design System Types
 * Merged from shared/design-system and all-components/errl-design-system
 */

export type ThemeMode = 'light' | 'dark';
export type EffectMode = 'none' | 'neon' | 'rainbow' | 'sparkle' | 'gradient' | 'fade';
export type NeonColor = 'cyan' | 'blue' | 'purple' | 'magenta' | 'pink' | 'green' | 'yellow';

export interface ThemeColors {
  bg: string;
  bgAlt: string;
  surface: string;
  panel: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  accent2: string;
  accent3: string;
  accentSoft: string;
}

export interface DesignSystemColors {
  // Core Colors (from shared/design-system)
  background: string;
  border: string;
  text: string;
  accent: string;
  title: string;
  
  // Interactive States
  hover: string;
  pressed: string;
  disabled: string;
  focus: string;
  
  // Status Colors
  success: string;
  error: string;
  warning: string;
  info: string;
  
  // Special Effects
  glow: {
    white: string;
    cyan: string;
    green: string;
    magenta: string;
  };

  // Theme colors (from errl-design-system)
  themes: {
    dark: ThemeColors;
    light: ThemeColors;
  };

  // Neon colors (from errl-design-system)
  neon: {
    cyan: string;
    blue: string;
    purple: string;
    magenta: string;
    pink: string;
    green: string;
    yellow: string;
    neonBlue: string;
    neonPurple: string;
    neonPink: string;
  };
}

export interface DesignSystemSpacing {
  // From shared/design-system
  padding: string;
  margin: string;
  gap: string;
  titlePaddingBottom: string;
  buttonPadding: string;
  inputPadding: string;
  panelPadding: string;

  // From errl-design-system
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface DesignSystemTypography {
  fontFamily: string;
  titleSize: string;
  titleWeight: string;
  
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  
  fontWeight: {
    normal: string;
    medium: string;
    bold: string;
  };
  
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
}

export interface DesignSystemBorders {
  width: string;
  radius: string;
  titleBorderBottom: string;
  
  style: {
    solid: string;
    dashed: string;
  };

  // From errl-design-system
  thin: string;
  medium: string;
  thick: string;
  radiusSizes: {
    small: string;
    medium: string;
    large: string;
  };

  // Gradient borders
  rgbFade: string;
  rgbFadeThin: string;
  rainbow: string;
  neonBlue: string;
  neonPurple: string;
  neonCyan: string;
}

export interface DesignSystemShadows {
  panel: string;
  button: string;
  text: string;
  glow: {
    white: string;
    cyan: string;
    green: string;
    magenta: string;
  };

  // From errl-design-system
  neonCyan: string;
  neonPurple: string;
  neonBlue: string;
  neonMagenta: string;
  rainbow: string;
}

export interface DesignSystemGradients {
  background: string[];
  progress: string[];

  // From errl-design-system
  rainbow: string;
  neonFlow: string;
  cyanMagenta: string;
  purpleBlue: string;
  backgroundGradient: string;
  backgroundLight: string;
}

export interface DesignSystemAnimations {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

export interface UnifiedDesignSystem {
  colors: DesignSystemColors;
  spacing: DesignSystemSpacing;
  typography: DesignSystemTypography;
  borders: DesignSystemBorders;
  shadows: DesignSystemShadows;
  gradients: DesignSystemGradients;
  animations: DesignSystemAnimations;
}
