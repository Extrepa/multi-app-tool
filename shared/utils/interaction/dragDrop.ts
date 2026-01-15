/**
 * Drag and drop utilities
 * 
 * Common patterns for drag and drop operations across projects.
 * Extracted from figma-clone-engine, multi-tool-app, errl_scene_builder, svg_editor
 */

export interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  targetId: string;
  initialPosition: { x: number; y: number };
}

export interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

/**
 * Convert screen coordinates to world coordinates
 * 
 * @param screenX - Screen X coordinate
 * @param screenY - Screen Y coordinate
 * @param viewport - Viewport transform
 * @returns World coordinates
 */
export function screenToWorld(
  screenX: number,
  screenY: number,
  viewport: Viewport
): { x: number; y: number } {
  return {
    x: (screenX - viewport.x) / viewport.zoom,
    y: (screenY - viewport.y) / viewport.zoom,
  };
}

/**
 * Convert world coordinates to screen coordinates
 * 
 * @param worldX - World X coordinate
 * @param worldY - World Y coordinate
 * @param viewport - Viewport transform
 * @returns Screen coordinates
 */
export function worldToScreen(
  worldX: number,
  worldY: number,
  viewport: Viewport
): { x: number; y: number } {
  return {
    x: worldX * viewport.zoom + viewport.x,
    y: worldY * viewport.zoom + viewport.y,
  };
}

/**
 * Convert screen coordinates to SVG coordinates
 * Useful for SVG-based editors
 * 
 * @param svg - SVG element
 * @param screenX - Screen X coordinate
 * @param screenY - Screen Y coordinate
 * @returns SVG coordinates
 */
export function screenToSVG(
  svg: SVGSVGElement,
  screenX: number,
  screenY: number
): { x: number; y: number } {
  const svgPoint = svg.createSVGPoint();
  svgPoint.x = screenX;
  svgPoint.y = screenY;
  const ctm = svg.getScreenCTM();
  
  if (ctm) {
    const inverseCTM = ctm.inverse();
    const svgCoord = svgPoint.matrixTransform(inverseCTM);
    return { x: svgCoord.x, y: svgCoord.y };
  }
  
  // Fallback: use viewBox calculation
  const svgRect = svg.getBoundingClientRect();
  const viewBox = svg.getAttribute('viewBox');
  if (viewBox) {
    const [minX, minY, width, height] = viewBox.split(' ').map(Number);
    const scaleX = width / svgRect.width;
    const scaleY = height / svgRect.height;
    const x = (screenX - svgRect.left) * scaleX + minX;
    const y = (screenY - svgRect.top) * scaleY + minY;
    return { x, y };
  }
  
  // Final fallback: simple offset
  return {
    x: screenX - svgRect.left,
    y: screenY - svgRect.top
  };
}

/**
 * Calculate drag delta from start position
 * 
 * @param currentX - Current X position
 * @param currentY - Current Y position
 * @param startX - Start X position
 * @param startY - Start Y position
 * @returns Delta coordinates
 */
export function calculateDragDelta(
  currentX: number,
  currentY: number,
  startX: number,
  startY: number
): { deltaX: number; deltaY: number } {
  return {
    deltaX: currentX - startX,
    deltaY: currentY - startY,
  };
}

/**
 * Apply snap to grid constraint
 * 
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param gridSize - Grid size
 * @param enabled - Whether snapping is enabled
 * @returns Snapped coordinates
 */
export function snapToGrid(
  x: number,
  y: number,
  gridSize: number,
  enabled: boolean = true
): { x: number; y: number } {
  if (!enabled) return { x, y };
  return {
    x: Math.round(x / gridSize) * gridSize,
    y: Math.round(y / gridSize) * gridSize,
  };
}

/**
 * Clamp coordinates to bounds
 * 
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param bounds - Bounds object
 * @returns Clamped coordinates
 */
export function clampToBounds(
  x: number,
  y: number,
  bounds: { minX?: number; minY?: number; maxX?: number; maxY?: number }
): { x: number; y: number } {
  let clampedX = x;
  let clampedY = y;
  
  if (bounds.minX !== undefined) clampedX = Math.max(clampedX, bounds.minX);
  if (bounds.maxX !== undefined) clampedX = Math.min(clampedX, bounds.maxX);
  if (bounds.minY !== undefined) clampedY = Math.max(clampedY, bounds.minY);
  if (bounds.maxY !== undefined) clampedY = Math.min(clampedY, bounds.maxY);
  
  return { x: clampedX, y: clampedY };
}
