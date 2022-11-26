import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' }), dts({ insertTypesEntry: true })],
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'SelectableGrid',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'selectable-grid'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'selectable-grid': 'SelectableGrid'
        }
      }
    }
  }
})
