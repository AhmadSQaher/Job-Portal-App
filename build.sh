#!/bin/bash

echo "🚀 Starting build process..."

# Install frontend dependencies and build
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "🔨 Building frontend..."
npm run build

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd ../backend
npm install

echo "✅ Build completed successfully!"
