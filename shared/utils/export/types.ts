/**
 * Type definitions for export utilities
 */

export interface ExportOptions {
  format?: 'json' | 'svg' | 'png' | 'zip';
  quality?: number;
  scale?: number;
}

export interface PNGExportOptions {
  quality?: number;
  scale?: number;
  format?: 'png' | 'jpg' | 'webp';
  backgroundColor?: string;
  transparentBg?: boolean;
}

export interface SVGExportOptions {
  includeStyles?: boolean;
  includeScripts?: boolean;
  backgroundColor?: string;
  noExportSelector?: string;
  removeBorder?: boolean;
  width?: number;
  height?: number;
}

export interface ZIPExportOptions {
  compression?: 'none' | 'deflate' | 'store';
}
