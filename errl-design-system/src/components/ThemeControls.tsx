import React from 'react';
import { useErrlTheme } from '../core/useErrlTheme';
import { ThemeMode, EffectMode, NeonColor } from '../core/errlDesignSystem';
import './ThemeControls.css';

interface ThemeControlsProps {
  componentId?: string;
  showGlobalToggle?: boolean;
  compact?: boolean;
}

export function ThemeControls({ componentId, showGlobalToggle = true, compact = false }: ThemeControlsProps) {
  const { theme, effect, neonColor, setTheme, setEffect, setNeonColor, setComponentOverride } = useErrlTheme(componentId);
  const [isGlobal, setIsGlobal] = React.useState(true);

  const handleThemeChange = (newTheme: ThemeMode) => {
    if (componentId && !isGlobal) {
      setComponentOverride?.({ theme: newTheme });
    } else {
      setTheme(newTheme);
    }
  };

  const handleEffectChange = (newEffect: EffectMode) => {
    if (componentId && !isGlobal) {
      setComponentOverride?.({ effect: newEffect });
    } else {
      setEffect(newEffect);
    }
  };

  const handleNeonColorChange = (newColor: NeonColor) => {
    if (componentId && !isGlobal) {
      setComponentOverride?.({ neonColor: newColor });
    } else {
      setNeonColor(newColor);
    }
  };

  const handleGlobalToggle = (global: boolean) => {
    setIsGlobal(global);
    if (componentId && global) {
      setComponentOverride?.(null);
    }
  };

  if (compact) {
    return (
      <div className="theme-controls-compact">
        <button
          onClick={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}
          className={`theme-toggle ${theme}`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <select
          value={effect}
          onChange={(e) => handleEffectChange(e.target.value as EffectMode)}
          className="effect-select"
        >
          <option value="none">None</option>
          <option value="neon">Neon</option>
          <option value="rainbow">Rainbow</option>
          <option value="sparkle">Sparkle</option>
          <option value="gradient">Gradient</option>
          <option value="fade">Fade</option>
        </select>
      </div>
    );
  }

  return (
    <div className="theme-controls">
      {showGlobalToggle && componentId && (
        <div className="global-toggle">
          <label>
            <input
              type="checkbox"
              checked={isGlobal}
              onChange={(e) => handleGlobalToggle(e.target.checked)}
            />
            <span>Use global theme</span>
          </label>
        </div>
      )}

      <div className="theme-controls-group">
        <label>Theme</label>
        <div className="theme-buttons">
          <button
            onClick={() => handleThemeChange('dark')}
            className={`theme-button ${theme === 'dark' ? 'active' : ''}`}
          >
            Dark
          </button>
          <button
            onClick={() => handleThemeChange('light')}
            className={`theme-button ${theme === 'light' ? 'active' : ''}`}
          >
            Light
          </button>
        </div>
      </div>

      <div className="theme-controls-group">
        <label>Effect</label>
        <select
          value={effect}
          onChange={(e) => handleEffectChange(e.target.value as EffectMode)}
          className="effect-select"
        >
          <option value="none">None</option>
          <option value="neon">Neon</option>
          <option value="rainbow">Rainbow</option>
          <option value="sparkle">Sparkle</option>
          <option value="gradient">Gradient</option>
          <option value="fade">Fade</option>
        </select>
      </div>

      {effect === 'neon' && (
        <div className="theme-controls-group">
          <label>Neon Color</label>
          <div className="neon-color-picker">
            {(['cyan', 'blue', 'purple', 'magenta', 'pink', 'green', 'yellow'] as NeonColor[]).map((color) => (
              <button
                key={color}
                onClick={() => handleNeonColorChange(color)}
                className={`neon-color-button ${neonColor === color ? 'active' : ''}`}
                style={{
                  background: `var(--errl-neon-${color})`,
                  boxShadow: neonColor === color ? `0 0 10px var(--errl-neon-${color})` : 'none',
                }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      <div className="theme-preview">
        <div
          className="preview-box"
          style={{
            background: theme === 'dark' ? '#02070a' : '#fefaf5',
            border: `1px solid ${theme === 'dark' ? '#34e1ff' : '#34e1ff'}`,
            boxShadow: effect === 'neon' ? '0 0 10px rgba(52, 225, 255, 0.5)' : 'none',
          }}
        />
      </div>
    </div>
  );
}
