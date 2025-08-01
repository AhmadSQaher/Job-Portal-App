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
  resolve: {
    alias: {
      // Force all React imports to use the same version
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
    },
    // Ensure consistent module resolution
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
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
  css: {
    // Use PostCSS config for Tailwind processing
    postcss: './postcss.config.js',
    preprocessorOptions: {
      css: {
        charset: false
      }
    },
    // Inline small CSS files to reduce requests
    codeSplit: false,
    extract: true
  },
  build: {
    outDir: 'dist/app',
    minify: 'terser',
    // Add timestamp for cache busting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Large libraries - split separately for better caching
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react-dom')) {
              return 'react-dom';
            }
            if (id.includes('react') && !id.includes('react-router')) {
              return 'react';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            
            // Animation libraries
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            
            // UI libraries
            if (id.includes('lucide-react')) {
              return 'lucide-icons';
            }
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'mui-system';
            }
            
            // Utility libraries
            if (id.includes('lodash') || id.includes('date-fns') || id.includes('axios')) {
              return 'utilities';
            }
            
            // Other vendor libraries (smaller ones)
            return 'vendor';
          }
          
          // Application code splitting
          if (id.includes('/pages/')) {
            return 'pages';
          }
          if (id.includes('/components/')) {
            return 'components';
          }
          // Keep context and hooks with components to avoid dependency issues
          if (id.includes('/context/') || id.includes('/hooks/')) {
            return 'components';
          }
        },
        // Use content-based hashing for consistent deployments
        chunkFileNames: `assets/[name]-[hash].js`,
        entryFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`
      }
    },
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
    // Optimize chunk sizes - set higher limit for 3D libraries like Spline
    chunkSizeWarningLimit: 5000, // Increased to 5MB to accommodate large 3D graphics libraries like Spline
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
  },
  // Optimize image assets
  assetsInclude: ['**/*.webp', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg']
})