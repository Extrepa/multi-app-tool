/**
 * Unified Design System Tokens
 * Merged from shared/design-system and all-components/errl-design-system
 * Includes 25 themes from theme-lab
 */

import type { UnifiedDesignSystem } from './types';
import { THEME_LAB_THEMES, type ThemeColors } from '../themes';

export const DESIGN_TOKENS: UnifiedDesignSystem = {
  colors: {
    // Core Colors (from shared/design-system)
    background: 'rgba(20, 20, 20, 0.9)',
    border: '#00ffff',
    text: '#ffffff',
    accent: '#00ffff',
    title: '#00ffff',
    
    // Interactive States
    hover: '#00ff00',
    pressed: '#222222',
    disabled: '#666666',
    focus: '#00ff00',
    
    // Status Colors
    success: '#00ff00',
    error: '#ff0000',
    warning: '#ffaa00',
    info: '#00ffff',
    
    // Special Effects
    glow: {
      white: 'rgba(255, 255, 255, 0.8)',
      cyan: 'rgba(0, 255, 255, 0.8)',
      green: 'rgba(0, 255, 0, 0.8)',
      magenta: 'rgba(255, 0, 255, 0.8)',
    },

    // Theme colors (from errl-design-system)
    themes: {
      dark: {
        bg: '#02070a',
        bgAlt: '#041017',
        surface: '#071b25',
        panel: 'rgba(7, 27, 37, 0.9)',
        border: '#163a4a',
        text: '#ecf9ff',
        muted: '#8eb7c7',
        accent: '#34e1ff',
        accent2: '#ff34f5',
        accent3: '#f5ffb7',
        accentSoft: '#0d3344',
      },
      light: {
        bg: '#fefaf5',
        bgAlt: '#f5f0eb',
        surface: '#ffffff',
        panel: 'rgba(255, 255, 255, 0.9)',
        border: '#e0d5c7',
        text: '#1a1a1a',
        muted: '#6b7280',
        accent: '#34e1ff',
        accent2: '#ff34f5',
        accent3: '#f5ffb7',
        accentSoft: '#f0f9ff',
      },
    },

    // Neon colors (from errl-design-system)
    neon: {
      cyan: '#00ffff',
      blue: '#34e1ff',
      purple: '#7b5cff',
      magenta: '#ff34f5',
      pink: '#ff00ff',
      green: '#00f5a0',
      yellow: '#f5ffb7',
      neonBlue: '#00d9f5',
      neonPurple: '#a855f7',
      neonPink: '#ff00cc',
    },
  },
  
  spacing: {
    // From shared/design-system
    padding: '16px',
    margin: '12px',
    gap: '8px',
    titlePaddingBottom: '8px',
    buttonPadding: '10px 20px',
    inputPadding: '8px 12px',
    panelPadding: '16px',

    // From errl-design-system
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  
  typography: {
    fontFamily: 'Arial, sans-serif',
    titleSize: '18px',
    titleWeight: 'bold',
    
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '3rem',
    },
    
    fontWeight: {
      normal: 'normal',
      medium: '500',
      bold: 'bold',
    },
    
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.8',
    },
  },
  
  borders: {
    // From shared/design-system
    width: '2px',
    radius: '8px',
    titleBorderBottom: '1px solid #00ffff',
    
    style: {
      solid: 'solid',
      dashed: 'dashed',
    },

    // From errl-design-system
    thin: '1px',
    medium: '2px',
    thick: '3px',
    radiusSizes: {
      small: '8px',
      medium: '12px',
      large: '16px',
    },

    // Gradient borders (from errl-design-system)
    rgbFade: 'linear-gradient(90deg, #34e1ff, #ff34f5, #7b5cff, #34e1ff)',
    rgbFadeThin: 'linear-gradient(90deg, rgba(52, 225, 255, 0.8), rgba(255, 52, 245, 0.8), rgba(123, 92, 255, 0.8))',
    rainbow: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
    neonBlue: 'linear-gradient(90deg, #00d9f5, #34e1ff)',
    neonPurple: 'linear-gradient(90deg, #7b5cff, #a855f7)',
    neonCyan: 'linear-gradient(90deg, #00ffff, #34e1ff)',
  },
  
  shadows: {
    // From shared/design-system
    panel: '0 4px 20px rgba(0, 255, 255, 0.3)',
    button: '0 0 20px rgba(0, 255, 255, 0.8)',
    text: '0 0 10px rgba(255, 255, 255, 0.5)',
    glow: {
      white: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2)',
      cyan: '0 0 10px rgba(0, 255, 255, 0.8)',
      green: '0 0 10px rgba(0, 255, 0, 0.8)',
      magenta: '0 0 10px rgba(255, 0, 255, 0.8)',
    },

    // From errl-design-system
    neonCyan: '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
    neonPurple: '0 0 10px rgba(123, 92, 255, 0.5), 0 0 20px rgba(123, 92, 255, 0.3)',
    neonBlue: '0 0 10px rgba(52, 225, 255, 0.5), 0 0 20px rgba(52, 225, 255, 0.3)',
    neonMagenta: '0 0 10px rgba(255, 52, 245, 0.5), 0 0 20px rgba(255, 52, 245, 0.3)',
    rainbow: '0 0 20px rgba(255, 0, 0, 0.3), 0 0 40px rgba(0, 255, 0, 0.2), 0 0 60px rgba(0, 0, 255, 0.2)',
  },
  
  gradients: {
    // From shared/design-system
    background: [
      '#667eea',
      '#764ba2',
      '#f093fb',
      '#4facfe',
      '#00f2fe',
    ],
    progress: [
      '#ff00ff',
      '#ff88ff',
    ],

    // From errl-design-system
    rainbow: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
    neonFlow: 'linear-gradient(135deg, #34e1ff, #ff34f5, #7b5cff)',
    cyanMagenta: 'linear-gradient(90deg, #34e1ff, #ff34f5)',
    purpleBlue: 'linear-gradient(90deg, #7b5cff, #34e1ff)',
    backgroundGradient: 'radial-gradient(circle at 20% 20%, rgba(52, 225, 255, 0.05), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255, 52, 245, 0.04), transparent 30%)',
    backgroundLight: 'radial-gradient(circle at 20% 20%, rgba(52, 225, 255, 0.02), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255, 52, 245, 0.02), transparent 30%)',
  },
  
  animations: {
    duration: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '1s',
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
};

// Helper functions (from errl-design-system)
import type { EffectMode, NeonColor, ThemeMode } from './types';

export const getErrlBorder = (effect: EffectMode = 'gradient', color?: NeonColor): string => {
  switch (effect) {
    case 'rainbow':
      return DESIGN_TOKENS.borders.rainbow;
    case 'neon':
      if (color === 'purple') return DESIGN_TOKENS.borders.neonPurple;
      if (color === 'blue') return DESIGN_TOKENS.borders.neonBlue;
      return DESIGN_TOKENS.borders.neonCyan;
    default:
      return DESIGN_TOKENS.borders.rgbFade;
  }
};

export const getErrlBackground = (theme: ThemeMode = 'dark', effect: EffectMode = 'none'): string => {
  const themeColors = DESIGN_TOKENS.colors.themes[theme];
  const base = themeColors.bg;
  
  if (effect === 'gradient') {
    const gradient = theme === 'dark' 
      ? DESIGN_TOKENS.gradients.backgroundGradient 
      : DESIGN_TOKENS.gradients.backgroundLight;
    return `${gradient}, ${base}`;
  }
  if (effect === 'rainbow') {
    return `${DESIGN_TOKENS.gradients.rainbow}, ${base}`;
  }
  return base;
};

export const getErrlGlow = (color: NeonColor | 'rainbow' = 'cyan'): string => {
  switch (color) {
    case 'purple':
      return DESIGN_TOKENS.shadows.neonPurple;
    case 'blue':
      return DESIGN_TOKENS.shadows.neonBlue;
    case 'magenta':
      return DESIGN_TOKENS.shadows.neonMagenta;
    case 'rainbow':
      return DESIGN_TOKENS.shadows.rainbow;
    default:
      return DESIGN_TOKENS.shadows.neonCyan;
  }
};

import type React from 'react';

export const getErrlPanelStyle = (
  theme: ThemeMode = 'dark',
  effect: EffectMode = 'none',
  neonColor: NeonColor = 'cyan'
): React.CSSProperties => {
  const themeColors = DESIGN_TOKENS.colors.themes[theme];
  
  const baseStyle: React.CSSProperties = {
    background: themeColors.panel,
    border: `${DESIGN_TOKENS.borders.thin} solid ${themeColors.border}`,
    borderRadius: DESIGN_TOKENS.borders.radiusSizes.medium,
    color: themeColors.text,
    backdropFilter: 'blur(10px)',
  };

  if (effect === 'neon') {
    baseStyle.boxShadow = getErrlGlow(neonColor);
    baseStyle.border = `${DESIGN_TOKENS.borders.medium} solid ${themeColors.accent}`;
  } else if (effect === 'rainbow') {
    baseStyle.boxShadow = DESIGN_TOKENS.shadows.rainbow;
  } else if (effect === 'sparkle') {
    baseStyle.boxShadow = getErrlGlow('cyan');
    baseStyle.animation = 'sparkle 2s ease-in-out infinite';
  } else if (effect === 'fade') {
    baseStyle.animation = 'fade 2s ease-in-out infinite';
  }

  return baseStyle;
};
