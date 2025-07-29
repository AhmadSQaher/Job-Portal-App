import compression from 'compression';

export function devCompression() {
  return {
    name: 'dev-compression',
    configureServer(server) {
      // Enhanced compression middleware
      server.middlewares.use(compression({
        level: 9, // Maximum gzip compression
        threshold: 0, // Compress everything, no matter how small
        memLevel: 9, // Maximum memory usage for better compression
        strategy: 0, // Default strategy
        filter: (req, res) => {
          // Don't compress if response is already compressed
          if (res.getHeader('content-encoding')) {
            return false;
          }

          // Check content type for text-based content
          const contentType = res.getHeader('content-type') || '';
          if (contentType && (
            contentType.includes('text/') ||
            contentType.includes('application/javascript') ||
            contentType.includes('application/json') ||
            contentType.includes('application/xml') ||
            contentType.includes('image/svg+xml') ||
            contentType.includes('application/xhtml+xml')
          )) {
            return true;
          }

          // Compress based on file extensions and URL patterns
          if (req.url) {
            return (
              req.url.endsWith('.js') ||
              req.url.endsWith('.mjs') ||
              req.url.endsWith('.css') ||
              req.url.endsWith('.html') ||
              req.url.endsWith('.jsx') ||
              req.url.endsWith('.ts') ||
              req.url.endsWith('.tsx') ||
              req.url.endsWith('.json') ||
              req.url.endsWith('.xml') ||
              req.url.endsWith('.svg') ||
              req.url.includes('/@vite/client') ||
              req.url.includes('/@react-refresh') ||
              req.url.includes('/node_modules/') ||
              req.url.includes('?v=') // Vite's versioned assets
            );
          }

          return false;
        }
      }));

      // Add performance headers
      server.middlewares.use((req, res, next) => {
        // Critical LCP resource prioritization
        if (req.url && (
          req.url.includes('/src/pages/HomePage.jsx') ||
          req.url.includes('/src/index.css') ||
          req.url.includes('/LINX Logo.webp')
        )) {
          // Highest priority for LCP-critical resources
          res.setHeader('Cache-Control', 'public, max-age=3600');
          res.setHeader('X-Priority', 'critical');
        } else if (req.url && (
          req.url.includes('/node_modules/') ||
          req.url.includes('/@vite/client') ||
          req.url.includes('/@react-refresh') ||
          req.url.includes('?v=') // Vite's versioned assets
        )) {
          // Long cache for dependencies and versioned assets
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (req.url && (
          req.url.endsWith('.js') ||
          req.url.endsWith('.css') ||
          req.url.endsWith('.jsx') ||
          req.url.endsWith('.ts') ||
          req.url.endsWith('.tsx')
        )) {
          // Short cache for development files
          res.setHeader('Cache-Control', 'public, max-age=3600');
        }

        // Always set Vary header for proper caching with compression
        res.setHeader('Vary', 'Accept-Encoding');
        
        // Security headers
        res.setHeader('X-Content-Type-Options', 'nosniff');
        
        next();
      });
    }
  };
}
