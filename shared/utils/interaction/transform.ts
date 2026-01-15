/**
 * Transform utilities
 * 
 * Common patterns for transform operations across projects.
 * Extracted from figma-clone-engine, multi-tool-app, errl_scene_builder, svg_editor
 */

export interface Transform {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scaleX?: number;
  scaleY?: number;
}

export interface Constraints {
  maintainAspectRatio?: boolean;
  snapToGrid?: boolean;
  gridSize?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  bounds?: { minX?: number; minY?: number; maxX?: number; maxY?: number };
}

/**
 * Apply constraints to a transform
 * 
 * @param transform - Transform to constrain
 * @param constraints - Constraints to apply
 * @returns Constrained transform
 */
export function applyConstraints(
  transform: Transform,
  constraints: Constraints
): Transform {
  let result = { ...transform };
  
  // Snap to grid
  if (constraints.snapToGrid && constraints.gridSize) {
    result.x = Math.round(result.x / constraints.gridSize) * constraints.gridSize;
    result.y = Math.round(result.y / constraints.gridSize) * constraints.gridSize;
  }
  
  // Maintain aspect ratio
  if (constraints.maintainAspectRatio && result.width && result.height) {
    const aspectRatio = result.width / result.height;
    // When width changes, adjust height
    if (result.scaleX !== undefined && result.scaleX !== 1) {
      result.height = result.width / aspectRatio;
    }
    // When height changes, adjust width
    if (result.scaleY !== undefined && result.scaleY !== 1) {
      result.width = result.height * aspectRatio;
    }
  }
  
  // Size constraints
  if (constraints.minWidth) result.width = Math.max(result.width, constraints.minWidth);
  if (constraints.minHeight) result.height = Math.max(result.height, constraints.minHeight);
  if (constraints.maxWidth) result.width = Math.min(result.width, constraints.maxWidth);
  if (constraints.maxHeight) result.height = Math.min(result.height, constraints.maxHeight);
  
  // Position bounds
  if (constraints.bounds) {
    if (constraints.bounds.minX !== undefined) {
      result.x = Math.max(result.x, constraints.bounds.minX);
    }
    if (constraints.bounds.maxX !== undefined) {
      result.x = Math.min(result.x, constraints.bounds.maxX - result.width);
    }
    if (constraints.bounds.minY !== undefined) {
      result.y = Math.max(result.y, constraints.bounds.minY);
    }
    if (constraints.bounds.maxY !== undefined) {
      result.y = Math.min(result.y, constraints.bounds.maxY - result.height);
    }
  }
  
  return result;
}

/**
 * Apply translation to transform
 * 
 * @param transform - Transform to translate
 * @param deltaX - X delta
 * @param deltaY - Y delta
 * @returns Translated transform
 */
export function translateTransform(
  transform: Transform,
  deltaX: number,
  deltaY: number
): Transform {
  return {
    ...transform,
    x: transform.x + deltaX,
    y: transform.y + deltaY,
  };
}

/**
 * Apply scale to transform
 * 
 * @param transform - Transform to scale
 * @param scaleX - X scale factor
 * @param scaleY - Y scale factor (defaults to scaleX)
 * @returns Scaled transform
 */
export function scaleTransform(
  transform: Transform,
  scaleX: number,
  scaleY?: number
): Transform {
  const finalScaleY = scaleY ?? scaleX;
  return {
    ...transform,
    width: transform.width * scaleX,
    height: transform.height * finalScaleY,
    scaleX: (transform.scaleX ?? 1) * scaleX,
    scaleY: (transform.scaleY ?? 1) * finalScaleY,
  };
}

/**
 * Apply rotation to transform
 * 
 * @param transform - Transform to rotate
 * @param angle - Rotation angle in degrees
 * @returns Rotated transform
 */
export function rotateTransform(
  transform: Transform,
  angle: number
): Transform {
  return {
    ...transform,
    rotation: transform.rotation + angle,
  };
}

/**
 * Reset transform to default values
 * 
 * @param width - Default width
 * @param height - Default height
 * @returns Reset transform
 */
export function resetTransform(
  width: number,
  height: number
): Transform {
  return {
    x: 0,
    y: 0,
    width,
    height,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
  };
}
