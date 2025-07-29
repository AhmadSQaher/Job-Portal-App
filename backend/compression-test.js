import express from "express";
import compression from "compression";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enhanced compression middleware
app.use(compression({
  level: 6, // Compression level (1-9, 6 is optimal balance)
  threshold: 1024, // Only compress files larger than 1KB
  filter: (req, res) => {
    // Don't compress if client doesn't support it
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Compress all text-based content
    return compression.filter(req, res);
  }
}));

// Serve static files from frontend dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API endpoint to test compression
app.get('/api/test', (req, res) => {
  const largeData = 'A'.repeat(10000); // 10KB of data
  res.json({ 
    message: 'Compression test endpoint',
    data: largeData,
    compression: 'This response should be compressed'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Compression test server running on http://localhost:${PORT}`);
  console.log(`📦 Serving static files with compression enabled`);
  console.log(`🧪 Test compression at: http://localhost:${PORT}/api/test`);
});
