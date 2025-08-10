import compression from 'compression';

export function devCompression() {
  return {
    name: 'dev-compression',
    configureServer(server) {
      // Enhanced compression middleware for HTTP/2 optimization
      server.middlewares.use(compression({
        level: 9, // Maximum gzip compression
        threshold: 0, // Compress everything for HTTP/2
        memLevel: 9, // Maximum memory usage for better compression
        strategy: 0, // Default strategy, optimal for mixed content
        chunkSize: 16384, // Smaller chunks for HTTP/2 multiplexing
        windowBits: 15, // Maximum window size
        filter: (req, res) => {
          // Skip if already compressed
          if (res.getHeader('content-encoding')) {
            return false;
          }

          // Always compress text-based content for HTTP/2
          const contentType = res.getHeader('content-type') || '';
          if (contentType && (
            contentType.includes('text/') ||
            contentType.includes('application/javascript') ||
            contentType.includes('application/json') ||
            contentType.includes('application/xml') ||
            contentType.includes('image/svg+xml') ||
            contentType.includes('application/xhtml+xml') ||
            contentType.includes('application/ecmascript') ||
            contentType.includes('text/ecmascript')
          )) {
            return true;
          }

          // HTTP/2 friendly - compress more file types
          if (req.url) {
            return (
              req.url.endsWith('.js') ||
              req.url.endsWith('.mjs') ||
              req.url.endsWith('.jsx') ||
              req.url.endsWith('.ts') ||
              req.url.endsWith('.tsx') ||
              req.url.endsWith('.css') ||
              req.url.endsWith('.html') ||
              req.url.endsWith('.json') ||
              req.url.endsWith('.xml') ||
              req.url.endsWith('.svg') ||
              req.url.endsWith('.map') ||
              req.url.includes('/@vite/client') ||
              req.url.includes('/@react-refresh') ||
              req.url.includes('/node_modules/') ||
              req.url.includes('?v=') || // Vite's versioned assets
              req.url.includes('?import') ||
              req.url.includes('?direct')
            );
          }

          return false;
        }
      }));

      // HTTP/2 and performance optimization headers
      server.middlewares.use((req, res, next) => {
        // Force HTTP/2 protocol headers
        res.setHeader('Alt-Svc', 'h2=":5173"; ma=86400');
        
        // Critical resource prioritization for LCP optimization
        if (req.url && (
          req.url.includes('/src/pages/HomePage.jsx') ||
          req.url.includes('/LINXLogo.webp') ||
          req.url.includes('/src/main.jsx') ||
          req.url.includes('/src/App.jsx')
        )) {
          // Highest priority for LCP-critical resources (excluding CSS for now)
          res.setHeader('Cache-Control', 'public, max-age=3600');
          res.setHeader('X-Priority', 'critical');
          res.setHeader('Priority', 'u=0, i'); // Resource Hints priority
        } else if (req.url && req.url.includes('/src/index.css')) {
          // Special handling for CSS - load normally without preload hints
          res.setHeader('Cache-Control', 'public, max-age=300'); // Shorter cache
          res.setHeader('X-Priority', 'normal');
          // Don't set priority headers that might trigger preloading
        } else if (req.url && (
          req.url.includes('/node_modules/react/') ||
          req.url.includes('/node_modules/react-dom/')
        )) {
          // High priority for core React
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          res.setHeader('X-Priority', 'high');
          res.setHeader('Priority', 'u=1, i');
        } else if (req.url && (
          req.url.includes('/node_modules/') ||
          req.url.includes('/@vite/client') ||
          req.url.includes('/@react-refresh') ||
          req.url.includes('?v=') // Vite's versioned assets
        )) {
          // Long cache for dependencies and versioned assets
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          res.setHeader('X-Priority', 'medium');
        } else if (req.url && (
          req.url.includes('framer-motion') ||
          req.url.includes('@splinetool') ||
          req.url.includes('lucide-react')
        )) {
          // Lower priority for heavy/optional libraries
          res.setHeader('Cache-Control', 'public, max-age=86400');
          res.setHeader('X-Priority', 'low');
          res.setHeader('Priority', 'u=4, i');
        } else if (req.url && (
          req.url.endsWith('.js') ||
          req.url.endsWith('.css') ||
          req.url.endsWith('.jsx') ||
          req.url.endsWith('.ts') ||
          req.url.endsWith('.tsx')
        )) {
          // Medium cache for development files
          res.setHeader('Cache-Control', 'public, max-age=3600');
          res.setHeader('X-Priority', 'medium');
        }

        // Essential HTTP/2 and performance headers
        res.setHeader('Vary', 'Accept-Encoding, Accept');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        
        // HTTP/2 server push hints for critical resources
        if (req.url === '/' || req.url === '/index.html') {
          // Push critical resources
          res.setHeader('Link', [
            '</src/main.jsx>; rel=modulepreload; as=script',
            '</src/App.jsx>; rel=modulepreload; as=script',
            '</src/index.css>; rel=preload; as=style',
            '</LINXLogo.webp>; rel=preload; as=image'
          ].join(', '));
        }
        
        next();
      });
    }
  };
}
