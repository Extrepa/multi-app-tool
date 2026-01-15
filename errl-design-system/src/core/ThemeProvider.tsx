import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeMode, EffectMode, NeonColor, ERRL_DESIGN_SYSTEM } from './errlDesignSystem';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  effect: EffectMode;
  setEffect: (effect: EffectMode) => void;
  neonColor: NeonColor;
  setNeonColor: (color: NeonColor) => void;
  perComponentOverrides: Map<string, { theme?: ThemeMode; effect?: EffectMode; neonColor?: NeonColor }>;
  setComponentOverride: (componentId: string, overrides: { theme?: ThemeMode; effect?: EffectMode; neonColor?: NeonColor } | null) => void;
  getComponentTheme: (componentId: string) => { theme: ThemeMode; effect: EffectMode; neonColor: NeonColor };
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'errl-preview-theme';
const EFFECT_STORAGE_KEY = 'errl-preview-effect';
const NEON_COLOR_STORAGE_KEY = 'errl-preview-neon-color';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return (stored === 'light' || stored === 'dark') ? stored : 'dark';
  });

  const [effect, setEffectState] = useState<EffectMode>(() => {
    const stored = localStorage.getItem(EFFECT_STORAGE_KEY);
    return (['none', 'neon', 'rainbow', 'sparkle', 'gradient', 'fade'].includes(stored || '')) 
      ? (stored as EffectMode) 
      : 'gradient';
  });

  const [neonColor, setNeonColorState] = useState<NeonColor>(() => {
    const stored = localStorage.getItem(NEON_COLOR_STORAGE_KEY);
    return (['cyan', 'blue', 'purple', 'magenta', 'pink', 'green', 'yellow'].includes(stored || ''))
      ? (stored as NeonColor)
      : 'cyan';
  });

  const [perComponentOverrides, setPerComponentOverrides] = useState<Map<string, { theme?: ThemeMode; effect?: EffectMode; neonColor?: NeonColor }>>(new Map());

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const setEffect = (newEffect: EffectMode) => {
    setEffectState(newEffect);
    localStorage.setItem(EFFECT_STORAGE_KEY, newEffect);
  };

  const setNeonColor = (color: NeonColor) => {
    setNeonColorState(color);
    localStorage.setItem(NEON_COLOR_STORAGE_KEY, color);
  };

  const setComponentOverride = (componentId: string, overrides: { theme?: ThemeMode; effect?: EffectMode; neonColor?: NeonColor } | null) => {
    setPerComponentOverrides(prev => {
      const newMap = new Map(prev);
      if (overrides === null) {
        newMap.delete(componentId);
      } else {
        newMap.set(componentId, overrides);
      }
      return newMap;
    });
  };

  const getComponentTheme = (componentId: string): { theme: ThemeMode; effect: EffectMode; neonColor: NeonColor } => {
    const override = perComponentOverrides.get(componentId);
    return {
      theme: override?.theme ?? theme,
      effect: override?.effect ?? effect,
      neonColor: override?.neonColor ?? neonColor,
    };
  };

  // Apply theme to document root for CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const themeColors = ERRL_DESIGN_SYSTEM.themes[theme];
    
    root.style.setProperty('--errl-bg', themeColors.bg);
    root.style.setProperty('--errl-bg-alt', themeColors.bgAlt);
    root.style.setProperty('--errl-surface', themeColors.surface);
    root.style.setProperty('--errl-panel', themeColors.panel);
    root.style.setProperty('--errl-border', themeColors.border);
    root.style.setProperty('--errl-text', themeColors.text);
    root.style.setProperty('--errl-muted', themeColors.muted);
    root.style.setProperty('--errl-accent', themeColors.accent);
    root.style.setProperty('--errl-accent-2', themeColors.accent2);
  }, [theme]);

  const value: ThemeContextValue = {
    theme,
    setTheme,
    effect,
    setEffect,
    neonColor,
    setNeonColor,
    perComponentOverrides,
    setComponentOverride,
    getComponentTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useErrlTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useErrlTheme must be used within a ThemeProvider');
  }
  return context;
}

