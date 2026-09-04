import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

// Serves the standalone UIkit localhost example at http://localhost:5174/
export default defineConfig({
  root,
  publicDir: false,
  server: {
    port: 5174,
    strictPort: true,
    host: true,
  },
  build: {
    outDir: resolve(root, '../dist-uikit-example'),
    emptyOutDir: true,
  },
})
