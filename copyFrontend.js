import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  console.log('🔄 Copying frontend build files...');
  
  const frontendDistPath = path.join(__dirname, 'frontend', 'dist', 'app');
  const backendPublicPath = path.join(__dirname, 'backend', 'public');
  const backendFrontendPath = path.join(__dirname, 'backend', 'frontend', 'dist', 'app');
  
  console.log(`📂 Source: ${frontendDistPath}`);
  console.log(`📂 Destination 1: ${backendPublicPath}`);
  console.log(`📂 Destination 2: ${backendFrontendPath}`);
  
  if (fs.existsSync(frontendDistPath)) {
    // Copy to backend/public (primary location)
    console.log('📁 Copying to backend/public...');
    fs.mkdirSync(backendPublicPath, { recursive: true });
    copyDir(frontendDistPath, backendPublicPath);
    
    // Also copy to backend/frontend/dist/app (backup location)
    console.log('📁 Copying to backend/frontend/dist/app...');
    fs.mkdirSync(path.dirname(backendFrontendPath), { recursive: true });
    copyDir(frontendDistPath, backendFrontendPath);
    
    console.log('✅ Frontend files copied to both locations successfully!');
    
    // List copied files for verification
    const publicFiles = fs.readdirSync(backendPublicPath);
    console.log('📋 Files in backend/public:', publicFiles);
  } else {
    console.error('❌ Frontend build directory not found at:', frontendDistPath);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error copying frontend files:', error);
  process.exit(1);
}
