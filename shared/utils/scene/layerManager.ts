/**
 * Layer management utilities
 * 
 * TODO: Implement layer management utilities
 * Extract common patterns from projects using layers
 */

export interface Layer {
  id: string;
  name: string;
  zIndex: number;
  visible: boolean;
  locked: boolean;
}

/**
 * Sort layers by z-index
 * 
 * @param layers - Array of layers
 * @returns Sorted layers
 */
export function sortLayersByZIndex(layers: Layer[]): Layer[] {
  return [...layers].sort((a, b) => a.zIndex - b.zIndex);
}

/**
 * Move layer to new z-index
 * 
 * @param layers - Array of layers
 * @param layerId - Layer ID to move
 * @param newZIndex - New z-index
 * @returns Updated layers
 */
export function moveLayerToZIndex(
  layers: Layer[],
  layerId: string,
  newZIndex: number
): Layer[] {
  return layers.map(layer => 
    layer.id === layerId ? { ...layer, zIndex: newZIndex } : layer
  );
}
