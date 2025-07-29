import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import { fileURLToPath } from 'url';

import jobRoutes from "../routes/job.routes.js";
import userRoutes from "../routes/user.routes.js";
import authRoutes from "../routes/auth.routes.js";
import employerRoutes from "../routes/employer.routes.js";
import adminRoutes from "../routes/admin.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware setup with performance optimizations
app.use(cors({
  credentials: true,
  optionsSuccessStatus: 200 // Legacy browsers support
}));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false
})); 

app.use(compression({
  level: 9, // Maximum compression level for production
  threshold: 512, // Compress files larger than 512 bytes
  filter: (req, res) => {
    // Don't compress if client doesn't support it
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Skip compression for already compressed files
    const contentType = res.getHeader('content-type');
    if (contentType && (
      contentType.includes('image/') ||
      contentType.includes('video/') ||
      contentType.includes('audio/') ||
      contentType.includes('application/pdf')
    )) {
      return false;
    }
    // Compress all text-based content
    return compression.filter(req, res);
  }
})); // ⚡ Enhanced Gzip compression

// Security and performance headers
app.use((req, res, next) => {
  // Enable HTTP/2 Server Push hints
  res.setHeader('Link', '</assets/main.js>; rel=preload; as=script');
  
  // Cache control for static assets
  if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (req.url.includes('/api/')) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=3600');
  }
  
  // Performance headers
  res.setHeader('X-DNS-Prefetch-Control', 'on');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/employers", employerRoutes);
app.use("/api/admin", adminRoutes);

// Enhanced pre-compressed static file serving
app.get('*.js', (req, res, next) => {
  const acceptEncoding = req.headers['accept-encoding'] || '';
  
  if (acceptEncoding.includes('br')) {
    req.url = req.url + '.br';
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript; charset=UTF-8');
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (acceptEncoding.includes('gzip')) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'application/javascript; charset=UTF-8');
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  next();
});

app.get('*.css', (req, res, next) => {
  const acceptEncoding = req.headers['accept-encoding'] || '';
  
  if (acceptEncoding.includes('br')) {
    req.url = req.url + '.br';
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'text/css; charset=UTF-8');
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (acceptEncoding.includes('gzip')) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css; charset=UTF-8');
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  next();
});

// Serve static files with enhanced caching
app.use(express.static(path.join(__dirname, '../../frontend/dist'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=0');
    }
  }
}));

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
