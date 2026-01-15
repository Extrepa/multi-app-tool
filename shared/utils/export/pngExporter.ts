/**
 * PNG export utility
 */

import { downloadBlob } from './download';
import type { PNGExportOptions } from './types';

/**
 * Export SVG element as PNG (converts SVG to canvas first)
 * 
 * @param svg - SVG element to export
 * @param filename - Name of the file
 * @param options - Export options including width, height, backgroundColor
 */
export async function exportSVGAsPNG(
  svg: SVGSVGElement,
  filename: string,
  options: { width: number; height: number; transparentBg?: boolean; backgroundColor?: string }
): Promise<void> {
  const { width, height, transparentBg, backgroundColor } = options;
  
  // Clone and clean SVG
  const { exportSVGString } = await import('./svgExporter');
  const svgString = exportSVGString(svg, {
    width,
    height,
    backgroundColor: transparentBg ? undefined : backgroundColor,
  });
  
  // Convert SVG string to image
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No 2D context');
    
    if (!transparentBg && backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
    }
    
    ctx.drawImage(img, 0, 0, width, height);
    await exportPNG(canvas, filename);
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Exports canvas as PNG file
 * 
 * @param canvas - Canvas element to export
 * @param filename - Name of the file (without .png extension)
 * @param options - Export options
 */
export async function exportPNG(
  canvas: HTMLCanvasElement,
  filename: string,
  options?: PNGExportOptions
): Promise<void> {
  const scale = options?.scale || 1;
  const quality = options?.quality || 1.0;
  
  let targetCanvas = canvas;
  
  // Scale canvas if needed
  if (scale !== 1) {
    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = canvas.width * scale;
    scaledCanvas.height = canvas.height * scale;
    const ctx = scaledCanvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);
      targetCanvas = scaledCanvas;
    }
  }
  
  return new Promise((resolve, reject) => {
    targetCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to create PNG blob'));
          return;
        }
        const fullFilename = filename.endsWith('.png') ? filename : `${filename}.png`;
        downloadBlob(blob, fullFilename);
        resolve();
      },
      'image/png',
      quality
    );
  });
}

/**
 * Exports canvas as PNG at multiple scales
 * 
 * @param canvas - Canvas element to export
 * @param filename - Base name of the file (without extension)
 * @param scales - Array of scales (e.g., [1, 2, 3])
 */
export async function exportPNGMultiScale(
  canvas: HTMLCanvasElement,
  filename: string,
  scales: number[]
): Promise<void> {
  for (const scale of scales) {
    await exportPNG(canvas, `${filename}_${scale}x`, { scale });
  }
}
