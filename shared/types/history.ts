/**
 * Type definitions for history/undo-redo systems
 */

export type HistoryMode = 'index-based' | 'past-present-future';

export interface UseHistoryOptions<T> {
  mode?: HistoryMode;
  maxHistory?: number;
  onStateChange?: (state: T) => void;
  transform?: (state: T) => T;
}

export interface IndexBasedHistory<T> {
  index: number;
  history: T[];
}

export interface PastPresentFutureHistory<T> {
  past: T[];
  present: T;
  future: T[];
}

export interface HistoryHook<T> {
  state: T;
  setState: (next: T | ((prev: T) => T)) => void;
  pushToHistory?: (state: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clearHistory: () => void;
  historyLength: number;
}

// Type for past-present-future mode where pushToHistory is always present
export interface PastPresentFutureHistoryHook<T> extends Omit<HistoryHook<T>, 'pushToHistory'> {
  pushToHistory: (state: T) => void;
}
