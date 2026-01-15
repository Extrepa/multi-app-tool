/**
 * Paper.js path simplification utilities
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
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    paperInstance.setup(canvas);
    const path = new paperInstance.Path(pathData);
    return path;
  } catch (error) {
    console.error('Failed to convert SVG path to Paper.js Path', error);
    return null;
  }
};

/**
 * Simplify path data string
 * 
 * @param pathData - SVG path data string
 * @param tolerance - Simplification tolerance
 * @returns Simplified path data string or null
 */
export async function simplifyPathData(pathData: string, tolerance?: number): Promise<string | null> {
  if (!pathData) return null;

  if (!isPaperAvailable()) {
    const { loadPaperJS } = await import('./booleanOps');
    const loaded = await loadPaperJS();
    if (!loaded) return null;
  }

  const paperInstance = getPaper();
  if (!paperInstance) return null;

  try {
    const path = svgPathToPaper(pathData, paperInstance);
    if (!path) return null;
    if (typeof path.simplify === 'function') {
      path.simplify(tolerance);
    }
    const result = path.pathData || null;
    paperInstance.project.clear();
    return result;
  } catch (error) {
    console.error('Error simplifying path', error);
    return null;
  }
}

/**
 * Simplify all paths in an SVG
 * 
 * @param svg - SVG string
 * @param tolerance - Simplification tolerance
 * @returns Updated SVG string or null
 */
export async function simplifySvgPaths(svg: string, tolerance?: number): Promise<string | null> {
  if (!svg) return null;
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, 'image/svg+xml');
  const paths = Array.from(doc.querySelectorAll('path'));
  if (paths.length === 0) return null;

  for (const pathEl of paths) {
    const d = pathEl.getAttribute('d');
    if (!d) continue;
    const simplified = await simplifyPathData(d, tolerance);
    if (simplified) {
      pathEl.setAttribute('d', simplified);
    }
  }

  return new XMLSerializer().serializeToString(doc);
}

/**
 * Simplify a Paper.js Path object
 * 
 * @param path - Paper.js Path object
 * @param tolerance - Simplification tolerance
 * @returns Simplified path
 */
export function simplifyPath(path: any, tolerance?: number): any {
  if (!path) {
    throw new Error('Path required for simplification');
  }
  if (typeof path.simplify === 'function') {
    path.simplify(tolerance);
  }
  return path;
}
