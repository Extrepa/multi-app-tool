# Deployment

## Cloudflare Pages

This repo is intended to build directly on Cloudflare Pages at the root subdomain `design.errl.wtf`.

**Build settings:**
- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/`

**Environment variables (optional):**
- `VITE_GEMINI_API_KEY`
- `VITE_OPENAI_API_KEY`
- `VITE_ANTHROPIC_API_KEY`

## Local build

```bash
npm install
npm run build
```

The build output is generated in `dist/`.
