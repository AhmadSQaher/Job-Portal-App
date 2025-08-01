#!/usr/bin/env node

/**
 * E2E Test Runner Script
 * Runs all E2E tests with proper setup and reporting
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const CONFIG = {
  testDir: './tests/e2e',
  reportDir: './test-results',
  timeout: 300000, // 5 minutes
  retries: 2
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function checkPrerequisites() {
  log('🔍 Checking prerequisites...', 'cyan');
  
  // Check if development server is running
  try {
    const response = await fetch('https://localhost:5174');
    if (!response.ok) {
      throw new Error('Server not responding');
    }
    log('✅ Development server is running', 'green');
  } catch (error) {
    log('❌ Development server is not running. Please start it with: npm run dev', 'red');
    log('   Server should be available at https://localhost:5174', 'yellow');
    return false;
  }
  
  // Check if test directory exists
  if (!fs.existsSync(CONFIG.testDir)) {
    log('❌ Test directory not found', 'red');
    return false;
  }
  
  return true;
}

function runTests(framework = 'playwright', options = {}) {
  return new Promise((resolve, reject) => {
    log(`🚀 Starting ${framework} E2E tests...`, 'cyan');
    
    let command, args;
    
    if (framework === 'playwright') {
      command = 'npx';
      args = ['playwright', 'test'];
      
      if (options.headed) args.push('--headed');
      if (options.debug) args.push('--debug');
      if (options.project) args.push('--project', options.project);
      if (options.grep) args.push('--grep', options.grep);
    } else if (framework === 'puppeteer') {
      command = 'npx';
      args = ['jest', CONFIG.testDir + '/*.puppeteer.test.js', '--testTimeout', CONFIG.timeout];
    }
    
    const testProcess = spawn(command, args, {
      stdio: 'inherit',
      shell: true
    });
    
    testProcess.on('close', (code) => {
      if (code === 0) {
        log('✅ All tests passed!', 'green');
        resolve(code);
      } else {
        log(`❌ Tests failed with exit code: ${code}`, 'red');
        resolve(code);
      }
    });
    
    testProcess.on('error', (error) => {
      log(`❌ Error running tests: ${error.message}`, 'red');
      reject(error);
    });
  });
}

async function generateReport() {
  log('📊 Generating test reports...', 'cyan');
  
  const reportFiles = [
    'test-results/results.json',
    'test-results/results.xml',
    'playwright-report/index.html'
  ];
  
  const existingReports = reportFiles.filter(file => fs.existsSync(file));
  
  if (existingReports.length > 0) {
    log('📋 Generated reports:', 'green');
    existingReports.forEach(report => {
      log(`   - ${report}`, 'yellow');
    });
  }
}

async function main() {
  const args = process.argv.slice(2);
  const options = {
    headed: args.includes('--headed'),
    debug: args.includes('--debug'),
    project: args.find(arg => arg.startsWith('--project='))?.split('=')[1],
    grep: args.find(arg => arg.startsWith('--grep='))?.split('=')[1],
    framework: args.includes('--puppeteer') ? 'puppeteer' : 'playwright'
  };
  
  log('🎯 LINX Job Portal E2E Test Runner', 'bright');
  log('=====================================', 'bright');
  
  // Check prerequisites
  const prereqsPassed = await checkPrerequisites();
  if (!prereqsPassed) {
    process.exit(1);
  }
  
  // Create report directory
  if (!fs.existsSync(CONFIG.reportDir)) {
    fs.mkdirSync(CONFIG.reportDir, { recursive: true });
  }
  
  try {
    // Run tests
    const exitCode = await runTests(options.framework, options);
    
    // Generate reports
    await generateReport();
    
    // Summary
    log('=====================================', 'bright');
    if (exitCode === 0) {
      log('🎉 Test run completed successfully!', 'green');
    } else {
      log('⚠️  Test run completed with failures', 'yellow');
    }
    
    process.exit(exitCode);
    
  } catch (error) {
    log(`❌ Test run failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Handle CLI arguments
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { runTests, checkPrerequisites, generateReport };
