/**
 * Shared Thumbnail Generator
 * Consolidated from ai-studio-gallery/thumbgen/
 * 
 * Generates thumbnails for HTML gallery files using Playwright
 * 
 * Usage:
 *   node generate-thumbs.js [source-dir] [output-dir] [viewport-width] [viewport-height]
 * 
 * Defaults:
 *   source-dir: parent directory (where script is run from)
 *   output-dir: ./thumbnails
 *   viewport: 1200x900
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Get arguments or use defaults
const sourceDir = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, '..', '..');
const outDir = process.argv[3] ? path.resolve(process.argv[3]) : path.join(sourceDir, 'thumbnails');
const viewportWidth = parseInt(process.argv[4]) || 1200;
const viewportHeight = parseInt(process.argv[5]) || 900;

const viewport = { width: viewportWidth, height: viewportHeight };

// Find HTML files (excluding index.html)
const htmlFiles = fs.readdirSync(sourceDir)
  .filter((name) => name.endsWith('.html'))
  .filter((name) => name !== 'index.html');

if (htmlFiles.length === 0) {
  console.log('No HTML files found (excluding index.html)');
  process.exit(0);
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  console.log(`Generating thumbnails from ${sourceDir} to ${outDir}`);
  console.log(`Viewport: ${viewportWidth}x${viewportHeight}`);
  console.log(`Found ${htmlFiles.length} HTML files\n`);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport });

  for (const file of htmlFiles) {
    const filePath = path.join(sourceDir, file);
    const fileUrl = `file://${filePath}`;
    console.log(`Capturing ${file}...`);
    
    try {
      await page.goto(fileUrl, { waitUntil: 'load' });
      await page.waitForTimeout(800); // Wait for animations/rendering

      const target = path.join(outDir, `${path.basename(file, '.html')}.png`);
      await page.screenshot({ path: target, fullPage: false });
      console.log(`  ✓ Saved to ${target}`);
    } catch (error) {
      console.error(`  ✗ Error capturing ${file}:`, error.message);
    }
  }

  await browser.close();
  console.log(`\n✓ Generated ${htmlFiles.length} thumbnails`);
})();
