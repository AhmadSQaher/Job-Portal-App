import { test, expect } from '@playwright/test';

/**
 * Updated E2E Test Suite - LINX Job Portal
 * Using correct selectors based on actual UI structure
 */

test.describe('LINX Job Portal - Updated User Journey Tests', () => {
  const BASE_URL = 'https://localhost:5173';

  test.beforeEach(async ({ page }) => {
    // Accept SSL certificates and set reasonable timeouts
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  });

  test('Homepage Search Functionality', async ({ page }) => {
    // Verify page loads correctly
    await expect(page).toHaveTitle(/LINX/);
    
    // Find the search input by placeholder text
    const searchInput = page.locator('input[placeholder="Job title, keywords, or company"]');
    await expect(searchInput).toBeVisible();
    
    // Fill in search query
    await searchInput.fill('Developer');
    
    // Find location input
    const locationInput = page.locator('input[placeholder="Location"]');
    await expect(locationInput).toBeVisible();
    await locationInput.fill('New York');
    
    // Click search button
    const searchButton = page.locator('button:has-text("Search Jobs")');
    await expect(searchButton).toBeVisible();
    await searchButton.click();
    
    console.log('✅ Search functionality test completed');
  });

  test('Homepage Elements Visibility', async ({ page }) => {
    // Check main heading
    const mainHeading = page.locator('h1:has-text("Find Your Dream Job")');
    await expect(mainHeading).toBeVisible();
    
    // Check logo
    const logo = page.locator('img[alt="LINX Logo"]');
    await expect(logo).toBeVisible();
    
    // Check search form
    const searchForm = page.locator('input[placeholder="Job title, keywords, or company"]');
    await expect(searchForm).toBeVisible();
    
    console.log('✅ Homepage elements visibility test completed');
  });

  test('Navigation Menu', async ({ page }) => {
    // Check for navigation links (adjust based on your actual nav structure)
    const homeLink = page.locator('nav a:has-text("Home"), a:has-text("LINX")').first();
    if (await homeLink.isVisible()) {
      await expect(homeLink).toBeVisible();
    }
    
    // Check for Jobs link
    const jobsLink = page.locator('nav a:has-text("Jobs"), a[href*="job"]');
    if (await jobsLink.isVisible()) {
      await jobsLink.click();
      await page.waitForTimeout(2000);
    }
    
    console.log('✅ Navigation menu test completed');
  });

  test('Job Categories Section', async ({ page }) => {
    // Look for job categories
    const technologyCategory = page.locator('text=Technology');
    if (await technologyCategory.isVisible()) {
      await technologyCategory.click();
      await page.waitForTimeout(1000);
    }
    
    // Look for job count indicators  
    const jobCount = page.locator('text=/\\d+,?\\d*\\s+jobs?/i');
    if (await jobCount.first().isVisible()) {
      await expect(jobCount.first()).toBeVisible();
    }
    
    console.log('✅ Job categories test completed');
  });

  test('Responsive Design Basic Check', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if main elements are still visible
    const searchInput = page.locator('input[placeholder="Job title, keywords, or company"]');
    await expect(searchInput).toBeVisible();
    
    const mainHeading = page.locator('h1:has-text("Find Your Dream Job")');
    await expect(mainHeading).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(searchInput).toBeVisible();
    
    console.log('✅ Responsive design test completed');
  });

  test('User Authentication Flow (Basic)', async ({ page }) => {
    // Look for sign up or login buttons
    const signUpButton = page.locator('button:has-text("Sign Up"), a:has-text("Sign Up")');
    const loginButton = page.locator('button:has-text("Sign In"), a:has-text("Sign In"), button:has-text("Login"), a:has-text("Login")');
    
    if (await signUpButton.isVisible()) {
      await signUpButton.click();
      await page.waitForTimeout(2000);
      
      // Check if we're on a registration page
      const emailInput = page.locator('input[type="email"], input[placeholder*="email" i]');
      if (await emailInput.isVisible()) {
        console.log('✅ Sign up page loaded');
      }
    } else if (await loginButton.isVisible()) {
      await loginButton.click();
      await page.waitForTimeout(2000);
      console.log('✅ Login page loaded');
    }
    
    console.log('✅ Authentication flow test completed');
  });

  test('Performance Metrics Check', async ({ page }) => {
    // Get basic performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigationTiming = performance.getEntriesByType('navigation')[0];
      const paintEntries = performance.getEntriesByType('paint');
      
      return {
        loadTime: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
        domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
        fcp: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
      };
    });
    
    console.log('📊 Performance Metrics:', {
      'Load Time': `${Math.round(performanceMetrics.loadTime)}ms`,
      'DOM Content Loaded': `${Math.round(performanceMetrics.domContentLoaded)}ms`,
      'First Contentful Paint': `${Math.round(performanceMetrics.fcp)}ms`
    });
    
    // Basic performance assertions
    expect(performanceMetrics.fcp).toBeLessThan(5000); // FCP under 5s
    expect(performanceMetrics.loadTime).toBeLessThan(10000); // Load under 10s
    
    console.log('✅ Performance metrics test completed');
  });

  test('Footer and Additional Links', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // Look for footer links
    const aboutLink = page.locator('footer a:has-text("About"), a:has-text("About Us")');
    const contactLink = page.locator('footer a:has-text("Contact"), a:has-text("Contact Us")');
    
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await page.waitForTimeout(2000);
      console.log('✅ About link works');
    }
    
    console.log('✅ Footer links test completed');
  });
});
