import { useErrlTheme as useThemeContext } from './ThemeProvider';
import { ERRL_DESIGN_SYSTEM, getErrlBorder, getErrlBackground, getErrlGlow, getErrlPanelStyle, type ThemeMode, type EffectMode, type NeonColor } from './errlDesignSystem';
import { useMemo } from 'react';

export function useErrlTheme(componentId?: string) {
  const context = useThemeContext();
  
  const { theme, effect, neonColor } = componentId 
    ? context.getComponentTheme(componentId)
    : { theme: context.theme, effect: context.effect, neonColor: context.neonColor };

  const themeColors = useMemo(() => ERRL_DESIGN_SYSTEM.themes[theme], [theme]);

  const styles = useMemo(() => ({
    background: getErrlBackground(theme, effect),
    border: getErrlBorder(effect, neonColor),
    glow: getErrlGlow(effect === 'rainbow' ? 'rainbow' : neonColor),
    panel: getErrlPanelStyle(theme, effect, neonColor),
  }), [theme, effect, neonColor]);

  const applyErrlStyle = (baseStyle: React.CSSProperties = {}): React.CSSProperties => {
    return {
      ...baseStyle,
      background: baseStyle.background || styles.background,
      color: baseStyle.color || themeColors.text,
      border: baseStyle.border || `1px solid ${themeColors.border}`,
    };
  };

  const getErrlButtonStyle = (variant: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive' = 'default'): React.CSSProperties => {
    const base: React.CSSProperties = {
      padding: `${ERRL_DESIGN_SYSTEM.spacing.sm} ${ERRL_DESIGN_SYSTEM.spacing.md}`,
      borderRadius: ERRL_DESIGN_SYSTEM.borderStyles.radius.small,
      border: `${ERRL_DESIGN_SYSTEM.borderStyles.thin} solid ${themeColors.border}`,
      color: themeColors.text,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backdropFilter: 'blur(10px)',
    };

    switch (variant) {
      case 'default':
        base.background = themeColors.panel;
        base.borderColor = themeColors.accent;
        if (effect === 'neon') {
          base.boxShadow = styles.glow;
        }
        break;
      case 'outline':
        base.background = 'transparent';
        base.borderColor = themeColors.border;
        break;
      case 'ghost':
        base.background = 'transparent';
        base.border = 'none';
        break;
      case 'secondary':
        base.background = themeColors.accentSoft;
        base.borderColor = themeColors.accent2;
        break;
      case 'destructive':
        base.background = 'rgba(255, 0, 0, 0.1)';
        base.borderColor = '#ff0000';
        break;
    }

    return base;
  };

  const getErrlCardStyle = (): React.CSSProperties => {
    return {
      ...styles.panel,
      padding: ERRL_DESIGN_SYSTEM.spacing.lg,
    };
  };

  const getErrlInputStyle = (): React.CSSProperties => {
    return {
      background: themeColors.surface,
      border: `${ERRL_DESIGN_SYSTEM.borderStyles.thin} solid ${themeColors.border}`,
      borderRadius: ERRL_DESIGN_SYSTEM.borderStyles.radius.small,
      color: themeColors.text,
      padding: `${ERRL_DESIGN_SYSTEM.spacing.sm} ${ERRL_DESIGN_SYSTEM.spacing.md}`,
    };
  };

  return {
    theme,
    effect,
    neonColor,
    themeColors,
    styles,
    setTheme: context.setTheme,
    setEffect: context.setEffect,
    setNeonColor: context.setNeonColor,
    setComponentOverride: componentId ? (overrides: { theme?: ThemeMode; effect?: EffectMode; neonColor?: NeonColor } | null) => 
      context.setComponentOverride(componentId, overrides) : undefined,
    applyErrlStyle,
    getErrlButtonStyle,
    getErrlCardStyle,
    getErrlInputStyle,
  };
}

