import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'game.js',
        chunkFileNames: 'game.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css') {
            return 'index.css';
          }
          return 'assets/[name].[ext]';
        }
      }
    }
  }
})
