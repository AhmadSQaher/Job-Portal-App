#!/bin/bash

echo "🚀 Starting build process..."

# Install frontend dependencies and build
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "🔨 Building frontend..."
npm run build

# Copy frontend build to backend directory for Render deployment
echo "📁 Copying frontend build to backend directory..."
mkdir -p ../backend/frontend/dist
cp -r dist/app ../backend/frontend/dist/

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd ../backend
npm install

echo "✅ Build completed successfully!"
echo "📂 Frontend files copied to: backend/frontend/dist/app/"
