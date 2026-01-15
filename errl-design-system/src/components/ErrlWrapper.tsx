import React, { ReactNode } from 'react';
import { useErrlTheme } from '../core/useErrlTheme';
import { EffectMode } from '../core/errlDesignSystem';

interface ErrlWrapperProps {
  children: ReactNode;
  componentId?: string;
  effect?: EffectMode;
  className?: string;
  style?: React.CSSProperties;
  applyBorder?: boolean;
  applyGlow?: boolean;
  applyBackground?: boolean;
}

export function ErrlWrapper({
  children,
  componentId,
  effect: overrideEffect,
  className = '',
  style = {},
  applyBorder = true,
  applyGlow = false,
  applyBackground = true,
}: ErrlWrapperProps) {
  const { theme, effect, neonColor, themeColors, styles } = useErrlTheme(componentId);
  
  const activeEffect = overrideEffect || effect;

  const wrapperStyle: React.CSSProperties = {
    ...style,
    color: themeColors.text,
  };

  if (applyBackground) {
    if (activeEffect === 'gradient' || activeEffect === 'rainbow') {
      wrapperStyle.background = styles.background;
    } else {
      wrapperStyle.background = themeColors.bg;
    }
  }

  if (applyBorder && activeEffect !== 'none') {
    if (activeEffect === 'rainbow' || activeEffect === 'neon' || activeEffect === 'gradient') {
      // Use border-image for gradient borders
      wrapperStyle.border = `${activeEffect === 'neon' ? '2px' : '1px'} solid transparent`;
      wrapperStyle.borderImage = styles.border;
      wrapperStyle.borderImageSlice = 1;
    } else {
      wrapperStyle.border = `1px solid ${themeColors.border}`;
    }
  }

  if (applyGlow && activeEffect === 'neon') {
    wrapperStyle.boxShadow = styles.glow;
  } else if (activeEffect === 'rainbow') {
    wrapperStyle.boxShadow = styles.glow;
  }

  // Apply animations
  if (activeEffect === 'sparkle') {
    wrapperStyle.animation = 'sparkle 2s ease-in-out infinite';
  } else if (activeEffect === 'fade') {
    wrapperStyle.animation = 'fade 2s ease-in-out infinite';
  }

  // Add backdrop blur for ghost/transparent effect
  if (activeEffect === 'gradient' || activeEffect === 'none') {
    wrapperStyle.backdropFilter = 'blur(10px)';
  }

  return (
    <div className={`errl-wrapper ${className}`} style={wrapperStyle}>
      {children}
    </div>
  );
}

