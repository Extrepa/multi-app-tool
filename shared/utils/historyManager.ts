/**
 * History Manager - Non-React utility for managing history state
 * Can be used in Zustand stores or other non-React contexts
 */

import type { HistoryMode } from '../types/history';

export interface HistoryManagerOptions<T> {
  mode?: HistoryMode;
  maxHistory?: number;
  transform?: (state: T) => T;
}

export interface HistoryManagerState<T> {
  past: T[];
  present: T;
  future: T[];
}

export class HistoryManager<T> {
  private mode: HistoryMode;
  private maxHistory: number;
  private transform?: (state: T) => T;
  private state: HistoryManagerState<T>;

  constructor(initialState: T, options: HistoryManagerOptions<T> = {}) {
    this.mode = options.mode || 'index-based';
    this.maxHistory = options.maxHistory ?? Infinity;
    this.transform = options.transform;

    if (this.mode === 'past-present-future') {
      const transformed = this.transform ? this.transform(initialState) : initialState;
      this.state = {
        past: [],
        present: transformed,
        future: [],
      };
    } else {
      // Index-based mode
      const transformed = this.transform ? this.transform(initialState) : initialState;
      this.state = {
        past: [],
        present: transformed,
        future: [],
      };
    }
  }

  getState(): T {
    return this.state.present;
  }

  getCanUndo(): boolean {
    return this.state.past.length > 0;
  }

  getCanRedo(): boolean {
    return this.state.future.length > 0;
  }

  pushState(newState: T): void {
    const transformed = this.transform ? this.transform(newState) : newState;

    if (this.mode === 'past-present-future') {
      // Build new past array with limit
      let newPast = [...this.state.past, this.state.present];
      if (newPast.length > this.maxHistory) {
        newPast = newPast.slice(-this.maxHistory);
      }

      this.state = {
        past: newPast,
        present: transformed,
        future: [], // Clear future when new action is performed
      };
    } else {
      // Index-based mode - treat as single history array
      const history = [...this.state.past, this.state.present, ...this.state.future];
      const currentIndex = this.state.past.length;
      
      // Truncate future and add new state
      const newHistory = history.slice(0, currentIndex + 1).concat([transformed]);
      
      // Apply history limit
      let finalHistory = newHistory;
      if (finalHistory.length > this.maxHistory) {
        finalHistory = finalHistory.slice(-this.maxHistory);
      }
      
      const newIndex = finalHistory.length - 1;
      this.state = {
        past: finalHistory.slice(0, newIndex),
        present: finalHistory[newIndex],
        future: [],
      };
    }
  }

  undo(): T | null {
    if (this.state.past.length === 0) return null;

    if (this.mode === 'past-present-future') {
      const previous = this.state.past[this.state.past.length - 1];
      const newPast = this.state.past.slice(0, -1);

      this.state = {
        past: newPast,
        present: previous,
        future: [this.state.present, ...this.state.future],
      };

      return previous;
    } else {
      // Index-based mode
      const history = [...this.state.past, this.state.present, ...this.state.future];
      const currentIndex = this.state.past.length;
      
      if (currentIndex <= 0) return null;
      
      const newIndex = currentIndex - 1;
      const previous = history[newIndex];
      
      this.state = {
        past: history.slice(0, newIndex),
        present: previous,
        future: history.slice(newIndex + 1),
      };

      return previous;
    }
  }

  redo(): T | null {
    if (this.state.future.length === 0) return null;

    if (this.mode === 'past-present-future') {
      const next = this.state.future[0];
      const newFuture = this.state.future.slice(1);

      this.state = {
        past: [...this.state.past, this.state.present],
        present: next,
        future: newFuture,
      };

      return next;
    } else {
      // Index-based mode
      const history = [...this.state.past, this.state.present, ...this.state.future];
      const currentIndex = this.state.past.length;
      
      if (currentIndex >= history.length - 1) return null;
      
      const newIndex = currentIndex + 1;
      const next = history[newIndex];
      
      this.state = {
        past: history.slice(0, newIndex),
        present: next,
        future: history.slice(newIndex + 1),
      };

      return next;
    }
  }

  clearHistory(initialState: T): void {
    const resetState = this.transform ? this.transform(initialState) : initialState;
    this.state = {
      past: [],
      present: resetState,
      future: [],
    };
  }

  getHistoryLength(): number {
    return this.state.past.length + 1 + this.state.future.length;
  }
}
