import type React from 'react';

export type ThemeMode = 'light' | 'dark';
export type EffectMode = 'none' | 'neon' | 'rainbow' | 'sparkle' | 'gradient' | 'fade';
export type NeonColor = 'cyan' | 'blue' | 'purple' | 'magenta' | 'pink' | 'green' | 'yellow';

export const ERRL_DESIGN_SYSTEM = {
  // Theme colors
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

  // Neon colors
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

  // RGB gradient borders
  borders: {
    rgbFade: 'linear-gradient(90deg, #34e1ff, #ff34f5, #7b5cff, #34e1ff)',
    rgbFadeThin: 'linear-gradient(90deg, rgba(52, 225, 255, 0.8), rgba(255, 52, 245, 0.8), rgba(123, 92, 255, 0.8))',
    rainbow: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
    neonBlue: 'linear-gradient(90deg, #00d9f5, #34e1ff)',
    neonPurple: 'linear-gradient(90deg, #7b5cff, #a855f7)',
    neonCyan: 'linear-gradient(90deg, #00ffff, #34e1ff)',
  },

  // Gradients
  gradients: {
    rainbow: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
    neonFlow: 'linear-gradient(135deg, #34e1ff, #ff34f5, #7b5cff)',
    cyanMagenta: 'linear-gradient(90deg, #34e1ff, #ff34f5)',
    purpleBlue: 'linear-gradient(90deg, #7b5cff, #34e1ff)',
    background: 'radial-gradient(circle at 20% 20%, rgba(52, 225, 255, 0.05), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255, 52, 245, 0.04), transparent 30%)',
    backgroundLight: 'radial-gradient(circle at 20% 20%, rgba(52, 225, 255, 0.02), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255, 52, 245, 0.02), transparent 30%)',
  },

  // Shadows & glows
  shadows: {
    neonCyan: '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
    neonPurple: '0 0 10px rgba(123, 92, 255, 0.5), 0 0 20px rgba(123, 92, 255, 0.3)',
    neonBlue: '0 0 10px rgba(52, 225, 255, 0.5), 0 0 20px rgba(52, 225, 255, 0.3)',
    neonMagenta: '0 0 10px rgba(255, 52, 245, 0.5), 0 0 20px rgba(255, 52, 245, 0.3)',
    rainbow: '0 0 20px rgba(255, 0, 0, 0.3), 0 0 40px rgba(0, 255, 0, 0.2), 0 0 60px rgba(0, 0, 255, 0.2)',
    panel: '0 4px 20px rgba(0, 255, 255, 0.3)',
  },

  // Border styles
  borderStyles: {
    thin: '1px',
    medium: '2px',
    thick: '3px',
    radius: {
      small: '8px',
      medium: '12px',
      large: '16px',
    },
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
};

// Helper functions
export const getErrlBorder = (effect: EffectMode = 'gradient', color?: NeonColor): string => {
  switch (effect) {
    case 'rainbow':
      return ERRL_DESIGN_SYSTEM.borders.rainbow;
    case 'neon':
      if (color === 'purple') return ERRL_DESIGN_SYSTEM.borders.neonPurple;
      if (color === 'blue') return ERRL_DESIGN_SYSTEM.borders.neonBlue;
      return ERRL_DESIGN_SYSTEM.borders.neonCyan;
    default:
      return ERRL_DESIGN_SYSTEM.borders.rgbFade;
  }
};

export const getErrlBackground = (theme: ThemeMode = 'dark', effect: EffectMode = 'none'): string => {
  const themeColors = ERRL_DESIGN_SYSTEM.themes[theme];
  const base = themeColors.bg;
  
  if (effect === 'gradient') {
    const gradient = theme === 'dark' 
      ? ERRL_DESIGN_SYSTEM.gradients.background 
      : ERRL_DESIGN_SYSTEM.gradients.backgroundLight;
    return `${gradient}, ${base}`;
  }
  if (effect === 'rainbow') {
    return `${ERRL_DESIGN_SYSTEM.gradients.rainbow}, ${base}`;
  }
  return base;
};

export const getErrlGlow = (color: NeonColor | 'rainbow' = 'cyan'): string => {
  switch (color) {
    case 'purple':
      return ERRL_DESIGN_SYSTEM.shadows.neonPurple;
    case 'blue':
      return ERRL_DESIGN_SYSTEM.shadows.neonBlue;
    case 'magenta':
      return ERRL_DESIGN_SYSTEM.shadows.neonMagenta;
    case 'rainbow':
      return ERRL_DESIGN_SYSTEM.shadows.rainbow;
    default:
      return ERRL_DESIGN_SYSTEM.shadows.neonCyan;
  }
};

export const getErrlPanelStyle = (
  theme: ThemeMode = 'dark',
  effect: EffectMode = 'none',
  neonColor: NeonColor = 'cyan'
): React.CSSProperties => {
  const themeColors = ERRL_DESIGN_SYSTEM.themes[theme];
  
  const baseStyle: React.CSSProperties = {
    background: themeColors.panel,
    border: `${ERRL_DESIGN_SYSTEM.borderStyles.thin} solid ${themeColors.border}`,
    borderRadius: ERRL_DESIGN_SYSTEM.borderStyles.radius.medium,
    color: themeColors.text,
    backdropFilter: 'blur(10px)',
  };

  if (effect === 'neon') {
    baseStyle.boxShadow = getErrlGlow(neonColor);
    baseStyle.border = `${ERRL_DESIGN_SYSTEM.borderStyles.medium} solid ${themeColors.accent}`;
  } else if (effect === 'rainbow') {
    baseStyle.boxShadow = ERRL_DESIGN_SYSTEM.shadows.rainbow;
  } else if (effect === 'sparkle') {
    baseStyle.boxShadow = getErrlGlow('cyan');
    baseStyle.animation = 'sparkle 2s ease-in-out infinite';
  } else if (effect === 'fade') {
    baseStyle.animation = 'fade 2s ease-in-out infinite';
  }

  return baseStyle;
};

