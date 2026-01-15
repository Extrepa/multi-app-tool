/**
 * Common download utility for all export functions
 */

/**
 * Downloads a blob as a file
 * 
 * @param blob - Blob to download
 * @param filename - Name of the file
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
