import { execSync } from 'child_process';
import { mkdirSync, cpSync, existsSync } from 'fs';
import path from 'path';

console.log('🚀 Starting build process...');

try {
  // Install frontend dependencies and build
  console.log('📦 Installing frontend dependencies...');
  execSync('npm install', { cwd: 'frontend', stdio: 'inherit' });

  console.log('🔨 Building frontend...');
  execSync('npm run build', { cwd: 'frontend', stdio: 'inherit' });

  // Copy frontend build to backend directory for Render deployment
  console.log('📁 Copying frontend build to backend directory...');
  const backendFrontendDir = path.join('backend', 'frontend', 'dist');
  mkdirSync(backendFrontendDir, { recursive: true });
  
  const sourcePath = path.join('frontend', 'dist', 'app');
  const destPath = path.join(backendFrontendDir, 'app');
  
  if (existsSync(sourcePath)) {
    cpSync(sourcePath, destPath, { recursive: true });
    console.log('✅ Frontend build copied successfully!');
  } else {
    throw new Error('Frontend build directory not found!');
  }

  // Install backend dependencies
  console.log('📦 Installing backend dependencies...');
  execSync('npm install', { cwd: 'backend', stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
  console.log('📂 Frontend files copied to: backend/frontend/dist/app/');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
