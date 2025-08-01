import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import helmet from "helmet"; // Temporarily disabled for deployment debugging
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
const CURRENT_WORKING_DIR = process.cwd();

const app = express();

// Middleware setup with performance optimizations
app.use(cors({
  credentials: true,
  optionsSuccessStatus: 200 // Legacy browsers support
}));

// Temporarily remove helmet to debug deployment issues
// app.use(helmet({
//   contentSecurityPolicy: false, // Temporarily disable CSP for debugging
//   crossOriginEmbedderPolicy: false
// })); 

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
  // Prevent caching of HTML files to ensure fresh content
  if (req.url.endsWith('.html') || req.url === '/' || !req.url.includes('.')) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  } 
  // Cache control for static assets
  else if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
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

// Serve static files from the built React app with proper MIME types
app.use(express.static(path.join(__dirname, '../frontend/dist/app'), {
  setHeaders: (res, filePath) => {
    // Set proper MIME types for JavaScript files
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=UTF-8');
    } else if (filePath.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    }
    // Set cache headers for static assets
    if (filePath.includes('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Handle React Router routes - serve index.html for all non-API routes
// This MUST come last, after all API routes and static file serving
app.get('*', (req, res) => {
  // Don't serve index.html for asset requests that weren't found
  if (req.path.startsWith('/assets/')) {
    return res.status(404).send('Asset not found');
  }
  res.sendFile(path.join(__dirname, '../frontend/dist/app/index.html'));
});

export default app;
