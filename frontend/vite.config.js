import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import legacy from '@vitejs/plugin-legacy'
import { analyzer } from 'vite-bundle-analyzer'
import { devCompression } from './vite-compression-plugin.js'

export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh optimizations
      fastRefresh: true,
      // Optimize JSX runtime
      jsxRuntime: 'automatic'
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    // Development compression
    devCompression(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 512, // Lower threshold for better compression coverage
      compressionOptions: {
        level: 9 // Maximum compression for production
      },
      deleteOriginFile: false
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 512,
      compressionOptions: {
        level: 11 // Maximum brotli compression
      },
      deleteOriginFile: false
    }),
    // Add bundle analyzer for production builds
    process.env.ANALYZE && analyzer()
  ].filter(Boolean),
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.pem')),
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    },
    // Custom middleware for enhanced compression in development
    middlewareMode: false,
    cors: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2, // Multiple compression passes
      },
      mangle: {
        safari10: true, // Safari 10 compatibility
      },
    },
    // Optimize chunk sizes
    chunkSizeWarningLimit: 1000,
    // Enhanced rollup options for better splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor libraries
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('framer-motion')) {
              return 'animations';
            }
            if (id.includes('@splinetool')) {
              return 'spline';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'ui-libs';
            }
            // Other vendor libraries
            return 'vendor';
          }
          // Split by feature/page
          if (id.includes('/pages/')) {
            return 'pages';
          }
          if (id.includes('/components/')) {
            return 'components';
          }
        },
        // Optimize file naming for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Enable source maps for debugging
    sourcemap: false, // Disable in production for performance
    // Target modern browsers for better optimization
    target: 'esnext',
  },
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react'
    ],
    // Pre-bundle dependencies for faster dev startup
    force: false
  },
  // Enable experimental features for better performance
  esbuild: {
    target: 'esnext',
    platform: 'browser',
    treeShaking: true
  }
})