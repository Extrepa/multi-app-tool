/**
 * Paper.js path offset utilities
 * Expand strokes into filled outlines using Paper.js expandStroke()
 */

// Try to import Paper.js if installed via npm
let paper: any = null;
try {
  // @ts-ignore - Paper.js may not have types
  paper = require('paper');
} catch (e) {
  // Paper.js not installed, will use CDN fallback
}

declare global {
  interface Window {
    paper?: any;
    Paper?: any;
  }
}

const isPaperAvailable = (): boolean => {
  if (paper) return true;
  return typeof window !== 'undefined' && (window.paper !== undefined || (window as any).Paper !== undefined);
};

const getPaper = (): any => {
  if (paper) return paper;
  if (typeof window !== 'undefined') {
    return (window as any).paper || (window as any).Paper;
  }
  return null;
};

const svgPathToPaper = (pathData: string, paperInstance: any): any => {
  const path = new paperInstance.Path(pathData);
  return path;
};

/**
 * Expand stroke to fill (offset path)
 * 
 * @param svg - SVG string or path data
 * @param strokeWidth - Stroke width to expand
 * @returns Updated SVG string or null
 */
export async function expandStrokeToFill(
  svg: string,
  strokeWidth: number
): Promise<string | null> {
  if (!svg) return null;
  
  // Load Paper.js if needed
  if (!isPaperAvailable()) {
    const { loadPaperJS } = await import('./booleanOps');
    const loaded = await loadPaperJS();
    if (!loaded) return null;
  }

  const paperInstance = getPaper();
  if (!paperInstance) return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, 'image/svg+xml');
  const paths = Array.from(doc.querySelectorAll('path'));
  if (paths.length === 0) return null;

  const canvas = document.createElement('canvas');
  canvas.width = 2000;
  canvas.height = 2000;
  paperInstance.setup(canvas);

  for (const pathEl of paths) {
    const d = pathEl.getAttribute('d');
    if (!d) continue;
    const paperPath = svgPathToPaper(d, paperInstance);
    paperPath.strokeColor = 'black';
    paperPath.strokeWidth = strokeWidth;
    const expanded = paperPath.expandStroke();
    if (expanded && expanded.pathData) {
      pathEl.setAttribute('d', expanded.pathData);
      pathEl.removeAttribute('stroke');
      pathEl.removeAttribute('stroke-width');
    }
  }

  const updated = new XMLSerializer().serializeToString(doc);
  paperInstance.project.clear();
  return updated;
}

/**
 * Offset a path by a given distance (for Paper.js Path objects)
 * 
 * @param path - Paper.js Path object
 * @param offset - Offset distance
 * @returns Offset path
 */
export function offsetPath(path: any, offset: number): any {
  if (!path) {
    throw new Error('Path required for offset operation');
  }
  path.strokeWidth = Math.abs(offset) * 2;
  return path.expandStroke();
}
