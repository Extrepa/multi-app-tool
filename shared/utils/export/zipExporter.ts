/**
 * ZIP export utility
 */

import { downloadBlob } from './download';
import type { ZIPExportOptions } from './types';

/**
 * Exports multiple files as ZIP archive
 * 
 * @param files - Array of files to include
 * @param filename - Name of the ZIP file (without .zip extension)
 * @param options - Export options
 */
export async function exportZIP(
  files: { name: string; content: string | Blob }[],
  filename: string,
  options?: ZIPExportOptions
): Promise<void> {
  // Dynamic import of JSZip to avoid bundling if not used
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();
  
  for (const file of files) {
    if (typeof file.content === 'string') {
      zip.file(file.name, file.content);
    } else {
      zip.file(file.name, file.content);
    }
  }
  
  const blob = await zip.generateAsync({ 
    type: 'blob',
    compression: options?.compression === 'none' ? 'STORE' : 'DEFLATE',
  });
  
  const fullFilename = filename.endsWith('.zip') ? filename : `${filename}.zip`;
  downloadBlob(blob, fullFilename);
}
