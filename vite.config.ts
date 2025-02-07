import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Алиас для папки src
    },
  },
  
})
