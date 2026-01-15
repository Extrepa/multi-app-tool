# Deployment

## Cloudflare Pages

Target: `design.errl.wtf` (root subdomain)

**Build settings**
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `/`

**Optional env vars**
- `VITE_GEMINI_API_KEY`
- `VITE_OPENAI_API_KEY`
- `VITE_ANTHROPIC_API_KEY`

## Local Build

```bash
npm install
npm run build
```

Output lives in `dist/`.
