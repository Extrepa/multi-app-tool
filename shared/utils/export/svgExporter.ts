/**
 * SVG export utility
 */

import { downloadBlob } from './download';
import type { SVGExportOptions } from './types';

/**
 * Clone and clean SVG element for export
 */
function cloneAndCleanSvg(
  svg: SVGSVGElement,
  options?: SVGExportOptions
): SVGSVGElement {
  const { backgroundColor, noExportSelector = '.no-export', removeBorder = true } = options || {};
  const clone = svg.cloneNode(true) as SVGSVGElement;

  // Remove UI helpers
  if (noExportSelector) {
    clone.querySelectorAll(noExportSelector).forEach((el) => el.remove());
  }
  if (removeBorder) {
    clone.style.border = 'none';
  }

  // Ensure xmlns so standalone SVG opens cleanly
  if (!clone.getAttribute('xmlns')) {
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  }

  // Set dimensions if provided
  if (options?.width) {
    clone.setAttribute('width', String(options.width));
  }
  if (options?.height) {
    clone.setAttribute('height', String(options.height));
  }

  // Inject background if requested
  if (backgroundColor) {
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('fill', backgroundColor);
    clone.insertBefore(bg, clone.firstChild);
  }

  return clone;
}

/**
 * Exports SVG element or string as SVG file
 * 
 * @param svg - SVG element or string
 * @param filename - Name of the file (without .svg extension)
 * @param options - Export options
 */
export function exportSVG(
  svg: SVGSVGElement | string,
  filename: string,
  options?: SVGExportOptions
): void {
  let svgString: string;
  
  if (typeof svg === 'string') {
    svgString = svg;
  } else {
    // Clean and clone SVG if options provided
    const cleaned = (options?.backgroundColor || options?.noExportSelector || options?.removeBorder)
      ? cloneAndCleanSvg(svg, options)
      : svg;
    const serializer = new XMLSerializer();
    svgString = serializer.serializeToString(cleaned);
  }
  
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const fullFilename = filename.endsWith('.svg') ? filename : `${filename}.svg`;
  downloadBlob(blob, fullFilename);
}

/**
 * Export SVG element as clean SVG string (without downloading)
 */
export function exportSVGString(
  svg: SVGSVGElement,
  options?: SVGExportOptions
): string {
  const cleaned = cloneAndCleanSvg(svg, options);
  const serializer = new XMLSerializer();
  return serializer.serializeToString(cleaned);
}
