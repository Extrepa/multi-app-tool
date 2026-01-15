# Shared Gallery Template

This template provides a common structure for static HTML galleries (like `ai-studio-gallery` and `components-ready-gallery`).

## Features

- Dark theme with CSS variables
- Responsive grid layout
- Search and filter functionality
- Card-based component display
- Thumbnail support
- Hover effects and transitions

## Usage

1. Copy `index.html.template` to your gallery directory
2. Update the gallery data in the JavaScript section
3. Customize CSS variables for your theme
4. Add your HTML demo files
5. Generate thumbnails using the thumbnail generator

## Structure

```
gallery/
├── index.html          # Main gallery page (from template)
├── *.html              # Your demo files
├── thumbnails/         # Thumbnail images
└── thumbgen/           # Thumbnail generator (optional)
```

## Customization

### CSS Variables

Update these in the `<style>` section:

```css
:root {
  --bg: #0a0b10;
  --panel: rgba(255, 255, 255, 0.06);
  --accent: #22d3ee;
  /* ... */
}
```

### Gallery Data

Update the `galleryItems` array in the JavaScript section:

```javascript
const galleryItems = [
  {
    name: "Demo Name",
    file: "demo.html",
    thumbnail: "thumbnails/demo.png",
    category: "category",
    description: "Description"
  },
  // ...
];
```

## Thumbnail Generation

Use the thumbnail generator from `ai-studio-gallery/thumbgen/` to create thumbnails for your demos.
