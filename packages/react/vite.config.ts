import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' }), dts({ insertTypesEntry: true })],
  build: {
    target: 'esnext',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.tsx'),
        'hooks/use-aboba': resolve(__dirname, 'src/hooks/use-aboba.ts')
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'selectable-grid'],
      output: {
        preserveModules: true,
        exports: 'named',
        globals: {
          react: 'React',
          'selectable-grid': 'SelectableGrid'
        }
      }
    }
  }
})
