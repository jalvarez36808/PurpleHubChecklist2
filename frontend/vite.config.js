import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3000,
    strictPort: false, // Allow fallback to next available port
    proxy: {
      '/api': {
        target: process.env.BACKEND_URL || 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  },
  // Add build options to exclude problematic dependencies
  build: {
    rollupOptions: {
      external: [
        'bun:ffi',
        'babel-runtime/helpers/asyncToGenerator',
        'camelcase',
        '@iarna/toml/lib/toml-parser.js' // Exclude the problematic TOML parser
      ]
    }
  },
  // Add optimizeDeps to exclude problematic dependencies
  optimizeDeps: {
    exclude: ['bun:ffi', 'babel-runtime/helpers/asyncToGenerator', 'camelcase', '@iarna/toml']
  }
})