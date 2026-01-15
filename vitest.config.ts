import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: true,
  },
  resolve: {
    alias: [
      // Explicit aliases for specific imports (most specific first)
      // These point directly to index.ts files to ensure proper resolution
      { 
        find: '@/shared/hooks', 
        replacement: path.resolve(__dirname, '../shared/hooks/index.ts')
      },
      { 
        find: '@/shared/utils/export', 
        replacement: path.resolve(__dirname, '../shared/utils/export/index.ts')
      },
      // Regex pattern for other @/shared/* imports
      // Note: $1 must be in string concatenation, not inside path.resolve
      { 
        find: /^@\/shared\/(.+)$/, 
        replacement: path.resolve(__dirname, '../shared') + '/$1'
      },
      // Fallback for @/shared (without subpath)
      { 
        find: '@/shared', 
        replacement: path.resolve(__dirname, '../shared')
      },
      // Local @ alias (least specific, must be last)
      { 
        find: '@', 
        replacement: path.resolve(__dirname, './src')
      },
    ],
  },
});
