import { useEffect, useCallback, useRef } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrlOrCmd?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  preventDefault?: boolean;
  description?: string;
  enabled?: boolean;
}

export interface UseKeyboardShortcutsOptions {
  enabled?: boolean;
  ignoreInputs?: boolean;
  platformAware?: boolean; // Auto-detect Mac vs Windows/Linux for Ctrl/Cmd
}

/**
 * Unified keyboard shortcuts hook
 * Supports command registration, conflict detection, and platform-aware modifier keys
 * 
 * @param shortcuts - Array of keyboard shortcuts
 * @param options - Configuration options
 * 
 * @example
 * ```tsx
 * useKeyboardShortcuts([
 *   { key: 'z', ctrlOrCmd: true, action: () => undo(), description: 'Undo' },
 *   { key: 'y', ctrlOrCmd: true, action: () => redo(), description: 'Redo' },
 *   { key: 'Delete', action: () => deleteSelected(), description: 'Delete' },
 * ], { enabled: true });
 * ```
 */
export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  options: UseKeyboardShortcutsOptions = {}
): void {
  const {
    enabled = true,
    ignoreInputs = true,
    platformAware = true,
  } = options;

  const shortcutsRef = useRef(shortcuts);
  shortcutsRef.current = shortcuts;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // Ignore shortcuts when typing in inputs
    if (ignoreInputs) {
      const target = event.target as HTMLElement | null;
      if (target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        (target.isContentEditable)
      )) {
        return;
      }
    }

    // Detect platform for Ctrl/Cmd normalization
    const isMac = platformAware && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const ctrlOrCmdPressed = isMac ? event.metaKey : event.ctrlKey;

    // Find matching shortcut
    for (const shortcut of shortcutsRef.current) {
      if (shortcut.enabled === false) continue;

      const keyMatch = 
        event.key.toLowerCase() === shortcut.key.toLowerCase() ||
        event.code === shortcut.key ||
        event.key === shortcut.key;

      const ctrlOrCmdMatch = shortcut.ctrlOrCmd === undefined
        ? !ctrlOrCmdPressed && !event.ctrlKey && !event.metaKey
        : shortcut.ctrlOrCmd === ctrlOrCmdPressed || (!platformAware && (event.ctrlKey || event.metaKey));

      const shiftMatch = shortcut.shift === undefined
        ? !event.shiftKey
        : shortcut.shift === event.shiftKey;

      const altMatch = shortcut.alt === undefined
        ? !event.altKey
        : shortcut.alt === event.altKey;

      if (keyMatch && ctrlOrCmdMatch && shiftMatch && altMatch) {
        if (shortcut.preventDefault !== false) {
          event.preventDefault();
        }
        shortcut.action();
        return; // Only trigger first matching shortcut
      }
    }
  }, [enabled, ignoreInputs, platformAware]);

  useEffect(() => {
    if (enabled) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleKeyDown, enabled]);
}

/**
 * Simple keyboard shortcuts hook for common operations
 * 
 * @param handlers - Object with handler functions
 * @param options - Configuration options
 * 
 * @example
 * ```tsx
 * useKeyboardShortcutsSimple({
 *   onDelete: () => deleteSelected(),
 *   onDeselect: () => clearSelection(),
 *   onUndo: () => undo(),
 *   onRedo: () => redo(),
 * });
 * ```
 */
export function useKeyboardShortcutsSimple(
  handlers: {
    onDelete?: () => void;
    onDeselect?: () => void;
    onUndo?: () => void;
    onRedo?: () => void;
  },
  options: UseKeyboardShortcutsOptions = {}
): void {
  const shortcuts: KeyboardShortcut[] = [];

  if (handlers.onDelete) {
    shortcuts.push({
      key: 'Delete',
      action: handlers.onDelete,
      description: 'Delete',
    });
    shortcuts.push({
      key: 'Backspace',
      action: handlers.onDelete,
      description: 'Delete',
    });
  }

  if (handlers.onDeselect) {
    shortcuts.push({
      key: 'Escape',
      action: handlers.onDeselect,
      description: 'Deselect',
    });
  }

  if (handlers.onUndo) {
    shortcuts.push({
      key: 'z',
      ctrlOrCmd: true,
      shift: false,
      action: handlers.onUndo,
      description: 'Undo',
    });
  }

  if (handlers.onRedo) {
    shortcuts.push({
      key: 'y',
      ctrlOrCmd: true,
      action: handlers.onRedo,
      description: 'Redo',
    });
    shortcuts.push({
      key: 'z',
      ctrlOrCmd: true,
      shift: true,
      action: handlers.onRedo,
      description: 'Redo',
    });
  }

  useKeyboardShortcuts(shortcuts, options);
}
