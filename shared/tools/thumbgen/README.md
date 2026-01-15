# Shared Thumbnail Generator

Consolidated thumbnail generator for HTML gallery files. Extracted from `ai-studio-gallery/thumbgen/` for reuse across gallery projects.

## Features

- Generates thumbnails for HTML files using Playwright
- Configurable viewport size
- Skips index.html automatically
- Creates thumbnails directory if needed
- Error handling for individual files

## Installation

```bash
cd shared/tools/thumbgen
npm install
```

## Usage

### Basic Usage (from gallery directory)

```bash
# From your gallery directory
node ../../shared/tools/thumbgen/generate-thumbs.js
```

This will:
- Look for HTML files in current directory
- Generate thumbnails in `./thumbnails/`
- Use default viewport (1200x900)

### Advanced Usage

```bash
node generate-thumbs.js [source-dir] [output-dir] [width] [height]
```

**Examples:**

```bash
# Custom source and output directories
node generate-thumbs.js /path/to/gallery /path/to/thumbnails

# Custom viewport size
node generate-thumbs.js . ./thumbnails 800 600

# Full custom
node generate-thumbs.js ./demos ./thumbs 1920 1080
```

## Parameters

1. **source-dir** (optional) - Directory containing HTML files (default: parent directory)
2. **output-dir** (optional) - Directory for thumbnails (default: `./thumbnails`)
3. **width** (optional) - Viewport width in pixels (default: 1200)
4. **height** (optional) - Viewport height in pixels (default: 900)

## Requirements

- Node.js
- Playwright (installed via `npm install`)
- HTML files to generate thumbnails from

## Notes

- Automatically skips `index.html`
- Waits 800ms after page load for animations/rendering
- Creates output directory if it doesn't exist
- Continues processing even if individual files fail

## Integration

### For ai-studio-gallery

```bash
cd ai-studio-gallery
node ../shared/tools/thumbgen/generate-thumbs.js . ./thumbnails
```

### For components-ready-gallery

```bash
cd components-ready-gallery
node ../shared/tools/thumbgen/generate-thumbs.js . ./thumbnails
```

## Migration from ai-studio-gallery/thumbgen/

The original thumbnail generator has been consolidated here. To use:

1. Use this shared version instead of local copy
2. Update any scripts that reference the old location
3. Remove local thumbgen directory (optional)
