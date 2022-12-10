import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: true,
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Selectable-grid',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'selectable-grid'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'selectable-grid': 'SelectableGrid'
        }
      }
    }
  }
})
