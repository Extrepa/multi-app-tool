import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: /^@\/shared/, replacement: path.resolve(__dirname, './shared') },
      { find: '@errl-design-system', replacement: path.resolve(__dirname, './errl-design-system/src') },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
})
