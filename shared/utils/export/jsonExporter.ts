/**
 * JSON export utility
 */

import { downloadBlob } from './download';

/**
 * Exports data as JSON file
 * 
 * @param data - Data to export
 * @param filename - Name of the file (without .json extension)
 * @param options - Export options
 */
export function exportJSON(data: unknown, filename: string, options?: { pretty?: boolean }): void {
  const jsonString = options?.pretty 
    ? JSON.stringify(data, null, 2)
    : JSON.stringify(data);
  
  const blob = new Blob([jsonString], { type: 'application/json' });
  const fullFilename = filename.endsWith('.json') ? filename : `${filename}.json`;
  downloadBlob(blob, fullFilename);
}
