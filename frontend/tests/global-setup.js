/**
 * Global Setup for E2E Tests
 * Runs once before all tests
 */

async function globalSetup() {
  console.log('🚀 Starting E2E Test Suite Setup...');
  
  // Set environment variables for testing
  process.env.NODE_ENV = 'testing';
  process.env.TEST_MODE = 'true';
  
  // Wait for server to be ready
  const maxWaitTime = 60000; // 1 minute
  const startTime = Date.now();
  
  console.log('⏳ Waiting for development server to be ready...');
  
  while (Date.now() - startTime < maxWaitTime) {
    try {
      const response = await fetch('https://localhost:5174', {
        method: 'HEAD',
        headers: { 'Accept': 'text/html' }
      });
      
      if (response.ok) {
        console.log('✅ Development server is ready!');
        break;
      }
    } catch (error) {
      // Server not ready yet, continue waiting
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('🎯 E2E Test Suite Setup Complete!');
}

module.exports = globalSetup;
