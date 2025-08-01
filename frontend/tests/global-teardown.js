/**
 * Global Teardown for E2E Tests
 * Runs once after all tests
 */

async function globalTeardown() {
  console.log('🧹 Starting E2E Test Suite Cleanup...');
  
  // Clean up any test data or resources
  // Reset environment variables
  delete process.env.TEST_MODE;
  
  console.log('✅ E2E Test Suite Cleanup Complete!');
}

module.exports = globalTeardown;
