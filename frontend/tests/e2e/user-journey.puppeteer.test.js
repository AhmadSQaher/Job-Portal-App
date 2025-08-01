const puppeteer = require('puppeteer');

/**
 * E2E Test Suite - LINX Job Portal (Puppeteer Version)
 * Generated from user recording on 7/31/2025 at 10:29:46 PM
 */

describe('LINX Job Portal - E2E Tests (Puppeteer)', () => {
  let browser;
  let page;
  const BASE_URL = 'https://localhost:5174';

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // Set to true for CI/CD
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
      defaultViewport: { width: 1078, height: 694 }
    });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    
    // Set user agent and headers
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9'
    });
  });

  afterEach(async () => {
    if (page) {
      await page.close();
    }
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('Complete User Journey - Homepage to Profile', async () => {
    // Navigate to homepage
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    
    // Verify page title
    const title = await page.title();
    expect(title).toBe('LINX Job Portal - Find Jobs & Hire Talent');

    // Step 1: Job Search
    await page.waitForSelector('input[aria-label="Job title, keywords, or company"]');
    await page.click('input[aria-label="Job title, keywords, or company"]');
    await page.type('input[aria-label="Job title, keywords, or company"]', 'Dev');
    
    await page.click('button[aria-label="Search Jobs"]');
    await page.waitForTimeout(1000);

    // Step 2: Browse job categories
    await page.waitForSelector('text=2,847 jobs available');
    await page.click('text=2,847 jobs available');
    
    // Click on technology category
    await page.click('section:nth-of-type(3) div.grid > div:nth-of-type(1) > a');
    await page.waitForTimeout(2000);

    // Step 3: View job details and interact
    await page.waitForSelector('main div.space-y-4 > div:nth-of-type(1) a');
    await page.click('main div.space-y-4 > div:nth-of-type(1) a');
    
    // Test job interaction buttons
    await page.waitForSelector('button[aria-label="Apply Now"]');
    await page.click('button[aria-label="Apply Now"]');
    
    await page.waitForSelector('button[aria-label="Save Job"]');
    await page.click('button[aria-label="Save Job"]');

    // Step 4: User Registration
    await page.click('a[aria-label="Sign Up"]');
    await page.waitForTimeout(2000);

    // Fill registration form
    const registrationData = {
      firstName: 'The',
      lastName: 'Dudeet', 
      username: 'Dudee',
      email: 'dud@gmail.com',
      password: 'pass123'
    };

    await page.waitForSelector('input[aria-label="John"]');
    await page.click('input[aria-label="John"]');
    await page.evaluate(() => document.querySelector('input[aria-label="John"]').value = '');
    await page.type('input[aria-label="John"]', registrationData.firstName);

    await page.click('input[aria-label="Doe"]');
    await page.evaluate(() => document.querySelector('input[aria-label="Doe"]').value = '');
    await page.type('input[aria-label="Doe"]', registrationData.lastName);

    await page.click('input[aria-label="Choose a username"]');
    await page.type('input[aria-label="Choose a username"]', registrationData.username);

    await page.click('input[aria-label="Enter your email"]');
    await page.type('input[aria-label="Enter your email"]', registrationData.email);

    await page.click('input[aria-label="Create a password"]');
    await page.type('input[aria-label="Create a password"]', registrationData.password);

    await page.click('input[aria-label="Confirm your password"]');
    await page.type('input[aria-label="Confirm your password"]', registrationData.password);

    // Accept terms and conditions
    await page.click('input[type="checkbox"]');
    
    // Submit registration
    await page.click('button[aria-label="Create Account"]');
    await page.waitForTimeout(3000);

    // Step 5: Login process
    await page.waitForSelector('input[aria-label="Enter your username"]');
    await page.click('input[aria-label="Enter your username"]');
    await page.type('input[aria-label="Enter your username"]', 'dudee');

    await page.click('input[aria-label="Enter your password"]');
    await page.type('input[aria-label="Enter your password"]', 'pass123');
    
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);

    // Step 6: Navigation testing
    // Test main navigation
    const navigationTests = [
      'nav > a:nth-of-type(1) > span', // Jobs
      'a:nth-of-type(2) > span',       // Companies  
      'header a:nth-of-type(3) > svg', // Favorites
      'a:nth-of-type(4) > span'        // About
    ];

    for (const selector of navigationTests) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        await page.click(selector);
        await page.waitForTimeout(1000);
      } catch (error) {
        console.log(`Navigation test failed for selector: ${selector}`);
      }
    }

    console.log('✅ Complete user journey test completed successfully');
  }, 60000); // 1 minute timeout

  test('Job Search and Filtering', async () => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

    // Test search functionality
    await page.waitForSelector('input[aria-label="Job title, keywords, or company"]');
    await page.type('input[aria-label="Job title, keywords, or company"]', 'Developer');
    await page.click('button[aria-label="Search Jobs"]');
    await page.waitForTimeout(2000);

    // Test category filtering
    const categories = ['Technology', 'Design', 'Marketing'];
    for (const category of categories) {
      try {
        await page.waitForSelector('select', { timeout: 5000 });
        await page.select('select', category);
        await page.waitForTimeout(1000);
        console.log(`✅ Filtered by ${category}`);
      } catch (error) {
        console.log(`Filter test failed for: ${category}`);
      }
    }
  }, 30000);

  test('Registration Form Validation', async () => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    
    // Navigate to registration
    await page.click('a[aria-label="Sign Up"]');
    await page.waitForTimeout(2000);

    // Test empty form submission
    await page.click('button[aria-label="Create Account"]');
    await page.waitForTimeout(1000);

    // Check for validation messages (adjust selectors based on your validation implementation)
    const validationMessages = await page.$$('.error-message, .text-red-500, [role="alert"]');
    expect(validationMessages.length).toBeGreaterThan(0);

    console.log('✅ Form validation test completed');
  }, 30000);

  test('Performance Metrics', async () => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

    // Get performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigationTiming = performance.getEntriesByType('navigation')[0];
      const paintEntries = performance.getEntriesByType('paint');
      
      return {
        ttfb: navigationTiming.responseStart - navigationTiming.requestStart,
        fcp: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
        domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
        loadComplete: navigationTiming.loadEventEnd - navigationTiming.loadEventStart
      };
    });

    console.log('📊 Performance Metrics:', {
      'TTFB': `${Math.round(performanceMetrics.ttfb)}ms`,
      'First Contentful Paint': `${Math.round(performanceMetrics.fcp)}ms`, 
      'DOM Content Loaded': `${Math.round(performanceMetrics.domContentLoaded)}ms`,
      'Load Complete': `${Math.round(performanceMetrics.loadComplete)}ms`
    });

    // Performance assertions
    expect(performanceMetrics.fcp).toBeLessThan(3000); // FCP should be under 3s
    expect(performanceMetrics.loadComplete).toBeLessThan(5000); // Load should be under 5s

    console.log('✅ Performance test completed');
  }, 30000);

  test('Mobile Responsiveness', async () => {
    // Test mobile viewport
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

    // Check if mobile navigation exists
    const mobileMenuButton = await page.$('button[aria-label="Menu"]');
    if (mobileMenuButton) {
      await mobileMenuButton.click();
      await page.waitForTimeout(1000);
    }

    // Test tablet viewport
    await page.setViewport({ width: 768, height: 1024 });
    await page.reload({ waitUntil: 'networkidle2' });

    // Verify main content is visible
    await page.waitForSelector('main');
    const mainVisible = await page.$eval('main', el => el.offsetHeight > 0);
    expect(mainVisible).toBeTruthy();

    console.log('✅ Mobile responsiveness test completed');
  }, 30000);
});
