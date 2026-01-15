/**
 * Selection utilities
 * 
 * Common patterns for selection management across projects.
 * Extracted from figma-clone-engine, multi-tool-app, errl_scene_builder, svg_editor
 */

/**
 * Toggle selection of an item
 * 
 * @param selection - Current selection array
 * @param id - ID to toggle
 * @param multi - Whether to allow multi-select
 * @returns New selection array
 */
export function toggleSelection(
  selection: string[],
  id: string,
  multi: boolean = false
): string[] {
  if (multi) {
    return selection.includes(id)
      ? selection.filter(s => s !== id)
      : [...selection, id];
  } else {
    return selection.includes(id) ? [] : [id];
  }
}

/**
 * Check if an item is selected
 * 
 * @param selection - Current selection array
 * @param id - ID to check
 * @returns True if selected
 */
export function isSelected(selection: string[], id: string): boolean {
  return selection.includes(id);
}

/**
 * Add item to selection (multi-select)
 * 
 * @param selection - Current selection array
 * @param id - ID to add
 * @returns New selection array
 */
export function addToSelection(selection: string[], id: string): string[] {
  if (selection.includes(id)) return selection;
  return [...selection, id];
}

/**
 * Remove item from selection
 * 
 * @param selection - Current selection array
 * @param id - ID to remove
 * @returns New selection array
 */
export function removeFromSelection(selection: string[], id: string): string[] {
  return selection.filter(s => s !== id);
}

/**
 * Set selection to a single item
 * 
 * @param id - ID to select
 * @returns New selection array
 */
export function selectSingle(id: string): string[] {
  return [id];
}

/**
 * Clear selection
 * 
 * @returns Empty selection array
 */
export function clearSelection(): string[] {
  return [];
}

/**
 * Select all items from a list
 * 
 * @param items - Array of items with IDs
 * @returns Selection array with all IDs
 */
export function selectAll<T extends { id: string }>(items: T[]): string[] {
  return items.map(item => item.id);
}

/**
 * Select multiple items
 * 
 * @param ids - Array of IDs to select
 * @returns New selection array
 */
export function selectMultiple(ids: string[]): string[] {
  return [...ids];
}

/**
 * Get selected items from a list
 * 
 * @param items - Array of items with IDs
 * @param selection - Selection array
 * @returns Selected items
 */
export function getSelectedItems<T extends { id: string }>(
  items: T[],
  selection: string[]
): T[] {
  return items.filter(item => selection.includes(item.id));
}
