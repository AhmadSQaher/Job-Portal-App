const puppeteer = require('puppeteer');

/**
 * Simple Puppeteer E2E Test - LINX Job Portal
 * Demonstrates basic functionality testing
 */

(async () => {
  console.log('🚀 Starting Puppeteer E2E Test...');
  
  const browser = await puppeteer.launch({
    headless: false, // Show browser for demo
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
    defaultViewport: { width: 1280, height: 720 }
  });

  try {
    const page = await browser.newPage();
    
    console.log('📱 Navigating to homepage...');
    await page.goto('https://localhost:5173', { waitUntil: 'networkidle0' });
    
    // Check page title
    const title = await page.title();
    console.log(`✅ Page title: ${title}`);
    
    // Test search functionality
    console.log('🔍 Testing search functionality...');
    await page.waitForSelector('input[placeholder="Job title, keywords, or company"]');
    await page.type('input[placeholder="Job title, keywords, or company"]', 'Developer');
    await page.type('input[placeholder="Location"]', 'New York');
    
    // Click search button
    const searchButton = await page.waitForSelector('button');
    const buttons = await page.$$('button');
    
    for (const button of buttons) {
      const text = await page.evaluate(el => el.textContent, button);
      if (text.includes('Search Jobs')) {
        await button.click();
        break;
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('✅ Search functionality test completed');
    
    // Check for main elements
    const logo = await page.$('img[alt="LINX Logo"]');
    const mainHeading = await page.$('h1');
    
    if (logo) console.log('✅ Logo found');
    if (mainHeading) {
      const headingText = await page.evaluate(el => el.textContent, mainHeading);
      console.log(`✅ Main heading: "${headingText.substring(0, 50)}..."`);
    }
    
    // Get performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigationTiming = performance.getEntriesByType('navigation')[0];
      const paintEntries = performance.getEntriesByType('paint');
      
      return {
        loadTime: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
        fcp: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
      };
    });
    
    console.log('📊 Performance Metrics:');
    console.log(`   Load Time: ${Math.round(performanceMetrics.loadTime)}ms`);
    console.log(`   First Contentful Paint: ${Math.round(performanceMetrics.fcp)}ms`);
    
    console.log('🎉 All Puppeteer tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
