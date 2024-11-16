/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true })],
  build: {
    target: 'esnext',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts')
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        // preserveModules: true,
        exports: 'named'
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false
  }
})
