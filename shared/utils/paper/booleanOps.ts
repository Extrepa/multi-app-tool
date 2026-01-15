/**
 * Paper.js boolean operations utilities
 * Supports both Paper.js Path objects and SVG path strings
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

export type BooleanOperation = 'union' | 'subtract' | 'intersect' | 'exclude';

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
    let imported: any = null;
    try {
      imported = paperInstance.project.importSVG(`<svg><path d="${pathData}"/></svg>`, {
        expandShapes: true,
        insert: false
      });
    } catch (importError) {
      // importSVG failed, will use fallback
    }
    
    if (imported && imported.children && imported.children.length > 0) {
      const path = imported.children[0];
      if (path && path.pathData) {
        return path;
      }
    }
    
    // Fallback: direct path creation
    try {
      return new paperInstance.Path(pathData);
    } catch (pathError) {
      console.warn('Direct path creation failed, path may be invalid:', pathError);
      return null;
    }
  } catch (error) {
    console.error('Error converting SVG path to Paper.js:', error);
    return null;
  }
};

/**
 * Load Paper.js dynamically if not already loaded
 */
export const loadPaperJS = async (): Promise<boolean> => {
  if (isPaperAvailable()) {
    return true;
  }

  // Check if already loading
  if ((window as any).__paperLoading) {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (isPaperAvailable()) {
          clearInterval(checkInterval);
          resolve(true);
        }
      }, 100);
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve(false);
      }, 5000);
    });
  }

  try {
    (window as any).__paperLoading = true;
    
    // Load Paper.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.18/paper-full.min.js';
    script.async = true;
    
    return new Promise((resolve) => {
      script.onload = () => {
        if ((window as any).paper) {
          const canvas = document.createElement('canvas');
          (window as any).paper.setup(canvas);
          (window as any).__paperLoading = false;
          resolve(true);
        } else {
          (window as any).__paperLoading = false;
          resolve(false);
        }
      };
      script.onerror = () => {
        (window as any).__paperLoading = false;
        resolve(false);
      };
      document.head.appendChild(script);
    });
  } catch (error) {
    console.error('Error loading Paper.js:', error);
    (window as any).__paperLoading = false;
    return false;
  }
};

/**
 * Perform boolean operation on two SVG path strings
 * 
 * @param path1 - First SVG path string
 * @param path2 - Second SVG path string
 * @param operation - Boolean operation type
 * @returns Resulting SVG path string or null
 */
export async function performBooleanOperation(
  path1: string,
  path2: string,
  operation: BooleanOperation
): Promise<string | null> {
  if (!isPaperAvailable()) {
    const loaded = await loadPaperJS();
    if (!loaded) {
      console.warn('Paper.js not available, boolean operations require Paper.js');
      return null;
    }
  }

  const paperInstance = getPaper();
  if (!paperInstance) return null;

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    paperInstance.setup(canvas);
    
    const paperPath1 = svgPathToPaper(path1, paperInstance);
    const paperPath2 = svgPathToPaper(path2, paperInstance);

    if (!paperPath1 || !paperPath2) {
      paperInstance.project.clear();
      return null;
    }

    let result: any = null;

    switch (operation) {
      case 'union':
        result = paperPath1.unite(paperPath2);
        break;
      case 'subtract':
        result = paperPath1.subtract(paperPath2);
        break;
      case 'intersect':
        result = paperPath1.intersect(paperPath2);
        break;
      case 'exclude':
        result = paperPath1.exclude(paperPath2);
        break;
    }

    if (!result || !result.pathData) {
      paperInstance.project.clear();
      return null;
    }

    const svgPath = result.pathData;
    paperInstance.project.clear();
    
    return svgPath;
  } catch (error) {
    console.error('Error performing boolean operation:', error);
    return null;
  }
}

/**
 * Perform boolean operation on multiple paths
 */
export async function performBooleanOperationMultiple(
  paths: string[],
  operation: BooleanOperation
): Promise<string | null> {
  if (paths.length < 2) return paths[0] || null;

  let result = paths[0];
  for (let i = 1; i < paths.length; i++) {
    const opResult = await performBooleanOperation(result, paths[i], operation);
    if (!opResult) return null;
    result = opResult;
  }

  return result;
}

/**
 * Union two Paper.js Path objects
 */
export function unionPaths(path1: any, path2: any): any {
  if (!path1 || !path2) {
    throw new Error('Paths required for union operation');
  }
  return path1.unite(path2);
}

/**
 * Subtract path2 from path1 (Paper.js Path objects)
 */
export function subtractPaths(path1: any, path2: any): any {
  if (!path1 || !path2) {
    throw new Error('Paths required for subtract operation');
  }
  return path1.subtract(path2);
}

/**
 * Intersect two Paper.js Path objects
 */
export function intersectPaths(path1: any, path2: any): any {
  if (!path1 || !path2) {
    throw new Error('Paths required for intersect operation');
  }
  return path1.intersect(path2);
}

/**
 * Exclude overlapping area of two Paper.js Path objects
 */
export function excludePaths(path1: any, path2: any): any {
  if (!path1 || !path2) {
    throw new Error('Paths required for exclude operation');
  }
  return path1.exclude(path2);
}
