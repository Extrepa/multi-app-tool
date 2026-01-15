import { useState, useCallback } from 'react';
import type { UseHistoryOptions, HistoryHook, IndexBasedHistory, PastPresentFutureHistory } from '../types/history';

/**
 * Unified history hook supporting both index-based and past/present/future patterns
 * 
 * @param initialState - Initial state value
 * @param options - Configuration options
 * @returns History hook with undo/redo capabilities
 * 
 * @example
 * // Index-based mode (default)
 * const { state, setState, undo, redo } = useHistory(initialState);
 * 
 * @example
 * // Past/present/future mode
 * const { state, setState, pushToHistory, undo, redo } = useHistory(initialState, {
 *   mode: 'past-present-future'
 * });
 */
export function useHistory<T>(
  initialState: T,
  options: UseHistoryOptions<T> = {}
): HistoryHook<T> {
  const {
    mode = 'index-based',
    maxHistory = Infinity,
    onStateChange,
    transform,
  } = options;

  // Index-based implementation
  if (mode === 'index-based') {
    const [index, setIndex] = useState(0);
    const [history, setHistory] = useState<T[]>([initialState]);

    const setState = useCallback(
      (next: T | ((prev: T) => T)) => {
        setHistory((prev) => {
          const current = prev[index];
          const resolved = typeof next === 'function' 
            ? (next as (p: T) => T)(current) 
            : next;
          
          // Apply transformation if provided
          const transformed = transform ? transform(resolved) : resolved;
          
          // Truncate future and add new state
          const newHistory = prev.slice(0, index + 1).concat([transformed]);
          
          // Apply history limit
          let finalHistory = newHistory;
          let finalIndex = newHistory.length - 1;
          
          if (finalHistory.length > maxHistory) {
            finalHistory = finalHistory.slice(-maxHistory);
            finalIndex = finalHistory.length - 1;
          }
          
          setIndex(finalIndex);
          
          // Call state change callback
          if (onStateChange) {
            onStateChange(transformed);
          }
          
          return finalHistory;
        });
      },
      [index, maxHistory, transform, onStateChange]
    );

    const undo = useCallback(() => {
      setIndex((i) => {
        const newIndex = Math.max(i - 1, 0);
        if (onStateChange && newIndex !== i) {
          onStateChange(history[newIndex]);
        }
        return newIndex;
      });
    }, [history, onStateChange]);

    const redo = useCallback(() => {
      setIndex((i) => {
        const newIndex = Math.min(i + 1, history.length - 1);
        if (onStateChange && newIndex !== i) {
          onStateChange(history[newIndex]);
        }
        return newIndex;
      });
    }, [history, onStateChange]);

    const clearHistory = useCallback(() => {
      setHistory([initialState]);
      setIndex(0);
      if (onStateChange) {
        onStateChange(initialState);
      }
    }, [initialState, onStateChange]);

    return {
      state: history[index],
      setState,
      undo,
      redo,
      canUndo: index > 0,
      canRedo: index < history.length - 1,
      clearHistory,
      historyLength: history.length,
    };
  }

  // Past/present/future implementation
  const [history, setHistory] = useState<PastPresentFutureHistory<T>>({
    past: [],
    present: transform ? transform(initialState) : initialState,
    future: [],
  });

  const setState = useCallback(
    (next: T | ((prev: T) => T)) => {
      setHistory((prev) => {
        const resolved = typeof next === 'function' 
          ? (next as (p: T) => T)(prev.present) 
          : next;
        return {
          ...prev,
          present: resolved,
        };
      });
    },
    []
  );

  const pushToHistory = useCallback(
    (newState: T) => {
      setHistory((prev) => {
        // Apply transformation if provided
        const transformed = transform ? transform(newState) : newState;
        
        // Build new past array with limit
        let newPast = [...prev.past, prev.present];
        if (newPast.length > maxHistory) {
          newPast = newPast.slice(-maxHistory);
        }
        
        const newHistory = {
          past: newPast,
          present: transformed,
          future: [], // Clear future when new action is performed
        };
        
        // Call state change callback
        if (onStateChange) {
          onStateChange(transformed);
        }
        
        return newHistory;
      });
    },
    [maxHistory, transform, onStateChange]
  );

  const undo = useCallback(() => {
    setHistory((prev) => {
      if (prev.past.length === 0) return prev;
      
      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, -1);
      
      const newHistory = {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future],
      };
      
      if (onStateChange) {
        onStateChange(previous);
      }
      
      return newHistory;
    });
  }, [onStateChange]);

  const redo = useCallback(() => {
    setHistory((prev) => {
      if (prev.future.length === 0) return prev;
      
      const next = prev.future[0];
      const newFuture = prev.future.slice(1);
      
      const newHistory = {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      };
      
      if (onStateChange) {
        onStateChange(next);
      }
      
      return newHistory;
    });
  }, [onStateChange]);

  const clearHistory = useCallback(() => {
    const resetState = transform ? transform(initialState) : initialState;
    setHistory({
      past: [],
      present: resetState,
      future: [],
    });
    if (onStateChange) {
      onStateChange(resetState);
    }
  }, [initialState, transform, onStateChange]);

  return {
    state: history.present,
    setState,
    pushToHistory,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    clearHistory,
    historyLength: history.past.length + 1 + history.future.length,
  };
}
