import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

import jobRoutes from "../routes/job.routes.js";
import userRoutes from "../routes/user.routes.js";
import authRoutes from "../routes/auth.routes.js";
import employerRoutes from "../routes/employer.routes.js";
import adminRoutes from "../routes/admin.routes.js";
import { requireAuth } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable trust proxy
app.set('trust proxy', 1);

// Configure CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-forwarded-proto', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range', 'Content-Type', 'Accept'],
  optionsSuccessStatus: 200
}));

// Additional CORS headers for preflight requests
app.options('*', cors());

// Force HTTPS when needed
app.use((req, res, next) => {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    next();
  } else if (process.env.NODE_ENV === 'production') {
    res.redirect('https://' + req.headers.host + req.url);
  } else {
    next();
  }
});

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
})); 

app.use(compression({
  level: 9, // Maximum compression level
  threshold: 256, // Compress smaller files too
  memLevel: 9, // Maximum memory for better compression
  strategy: 0, // Default strategy for mixed content
  chunkSize: 16384, // Smaller chunks for HTTP/2
  windowBits: 15, // Maximum window size
  filter: (req, res) => {
    // Skip compression for certain conditions
    if (req.headers['x-no-compression']) {
      return false;
    }
    
    // Skip already compressed content
    const contentType = res.getHeader('content-type') || '';
    if (contentType && (
      contentType.includes('image/') ||
      contentType.includes('video/') ||
      contentType.includes('audio/') ||
      contentType.includes('application/pdf') ||
      contentType.includes('application/zip') ||
      contentType.includes('application/gzip')
    )) {
      return false;
    }
    
    // Always compress text-based content for HTTP/2
    return compression.filter(req, res);
  }
})); // ⚡ Enhanced compression for HTTP/2

// HTTP/2 and performance optimization headers
app.use((req, res, next) => {
  // Force HTTP/2 advertising
  res.setHeader('Alt-Svc', 'h2=":3000"; ma=86400');
  
  // Cache control optimization for different asset types
  if (req.url.match(/\.(js|mjs|jsx)$/)) {
    // JavaScript and JSX - aggressive caching with versioning
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('ETag', 'strong');
    // Ensure correct MIME type for JSX files
    if (req.url.endsWith('.jsx')) {
      res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
    }
  } else if (req.url.match(/\.css$/)) {
    // CSS - aggressive caching
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('ETag', 'strong');
    res.setHeader('Content-Type', 'text/css; charset=UTF-8');
  } else if (req.url.match(/\.(png|jpg|jpeg|gif|ico|svg|webp|avif)$/)) {
    // Images - long cache
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (req.url.match(/\.(woff|woff2|ttf|eot|otf)$/)) {
    // Fonts - very long cache
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (req.url.includes('/api/')) {
    // API responses - no cache
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  } else if (req.url.endsWith('.html')) {
    // HTML - short cache for updates
    res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
  } else {
    // Default - moderate caching
    res.setHeader('Cache-Control', 'public, max-age=3600');
  }
  
  // HTTP/2 and performance headers
  res.setHeader('X-DNS-Prefetch-Control', 'on');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Vary header for proper caching
  res.setHeader('Vary', 'Accept-Encoding, Accept');
  
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup resume uploads directory
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Export uploadDir for use in controllers
export const getUploadDir = () => uploadDir;

// Routes
// Public job routes (for viewing jobs without auth)
app.use("/api/jobs", jobRoutes);
app.use("/api/users", requireAuth, userRoutes);
app.use("/auth", authRoutes);
app.use("/api/employers", requireAuth, employerRoutes);
app.use("/api/admin", requireAuth, adminRoutes);

// Enhanced pre-compressed static file serving with HTTP/2 optimization
app.get('*.(js|mjs|css|jsx)', (req, res, next) => {
  const acceptEncoding = req.headers['accept-encoding'] || '';
  const originalUrl = req.url;
  
  // Set proper MIME types first
  if (originalUrl.endsWith('.js') || originalUrl.endsWith('.mjs')) {
    res.set('Content-Type', 'application/javascript; charset=UTF-8');
  } else if (originalUrl.endsWith('.jsx')) {
    res.set('Content-Type', 'application/javascript; charset=UTF-8');
  } else if (originalUrl.endsWith('.css')) {
    res.set('Content-Type', 'text/css; charset=UTF-8');
  }
  
  // Prefer Brotli compression for better efficiency
  if (acceptEncoding.includes('br')) {
    req.url = originalUrl + '.br';
    res.set('Content-Encoding', 'br');
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.set('Vary', 'Accept-Encoding');
  } else if (acceptEncoding.includes('gzip')) {
    req.url = originalUrl + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.set('Vary', 'Accept-Encoding');
  }
  next();
});

// Handle JSX files specifically with correct MIME type
app.get('*.jsx', (req, res, next) => {
  res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  next();
});

// Serve static files with enhanced caching and HTTP/2 optimization
app.use(express.static(path.join(__dirname, '../../frontend/dist'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    // Set proper MIME types for different file types
    if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
    } else if (filePath.endsWith('.jsx')) {
      res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=UTF-8');
    } else if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=0');
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    } else if (filePath.endsWith('.webp')) {
      res.setHeader('Content-Type', 'image/webp');
    } else if (filePath.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    }
  }
}));

// Additional static serving for assets folder specifically 
app.use('/assets', express.static(path.join(__dirname, '../../frontend/dist/assets'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.webp')) {
      res.setHeader('Content-Type', 'image/webp');
    } else if (filePath.endsWith('.js') || filePath.endsWith('.mjs') || filePath.endsWith('.jsx')) {
      res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=UTF-8');
    }
  }
}));

// Handle specific asset routes to prevent fallback conflicts
app.get('/assets/*', (req, res, next) => {
  // This should be handled by static middleware above
  // If we reach here, the file doesn't exist
  res.status(404).json({ error: 'Asset not found' });
});

// Specific route for logo with multiple fallbacks
app.get('/LINXLogo.webp', (req, res) => {
  const logoPath = path.join(__dirname, '../../frontend/dist/LINXLogo.webp');
  const assetsLogoPath = path.join(__dirname, '../../frontend/dist/assets/LINXLogo.webp');
  
  // Try root path first
  if (require('fs').existsSync(logoPath)) {
    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.sendFile(logoPath);
  } else if (require('fs').existsSync(assetsLogoPath)) {
    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.sendFile(assetsLogoPath);
  } else {
    res.status(404).send('Logo not found');
  }
});

// Handle React Router routes - serve index.html for all non-API routes
app.get('*', (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api') || req.path.startsWith('/auth')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});

// Default fallback
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the LINX Job Portal API" });
});

export default app;
