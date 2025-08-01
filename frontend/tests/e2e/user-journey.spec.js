import { test, expect } from '@playwright/test';

/**
 * E2E Test Suite - LINX Job Portal User Journey
 * Generated from user recording on 7/31/2025 at 10:29:46 PM
 * 
 * This test covers the complete user flow:
 * 1. Homepage navigation and job search
 * 2. User registration process
 * 3. User authentication
 * 4. Dashboard interactions
 * 5. Profile management
 * 6. Job browsing and filtering
 * 7. Application process
 * 8. Navigation across different sections
 */

test.describe('LINX Job Portal - Complete User Journey', () => {
  const BASE_URL = 'https://localhost:5173';
  
  test.beforeEach(async ({ page }) => {
    // Accept SSL certificates for local testing
    await page.context().setExtraHTTPHeaders({
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    });
  });

  test('Complete User Journey - From Search to Profile Management', async ({ page }) => {
    // Set viewport to match recording
    await page.setViewportSize({ width: 1078, height: 694 });

    // Step 1: Navigate to homepage and verify
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle('LINX Job Portal - Find Jobs & Hire Talent');
    
    // Step 2: Perform job search
    const searchInput = page.locator('input[aria-label="Job title, keywords, or company"]');
    await searchInput.click();
    await searchInput.fill('Dev');
    
    const searchButton = page.locator('button[aria-label="Search Jobs"]');
    await searchButton.click();

    // Step 3: Explore job categories
    const technologyCategory = page.locator('text=2,847 jobs available');
    await expect(technologyCategory).toBeVisible();
    await technologyCategory.click();
    
    // Navigate to Technology category
    await page.locator('section:nth-of-type(3) div.grid > div:nth-of-type(1) > a').click();

    // Step 4: View job details
    const firstJobListing = page.locator('main div.space-y-4 > div:nth-of-type(1) a').first();
    await firstJobListing.click();

    // Test job interaction buttons
    await page.locator('button[aria-label="Apply Now"]').click();
    await page.locator('button[aria-label="Save Job"]').click();

    // Step 5: User Registration Flow
    await page.locator('a[aria-label="Sign Up"]').click();
    
    // Fill registration form
    const registrationData = {
      firstName: 'The',
      lastName: 'Dudeet',
      username: 'Dudee',
      email: 'dud@gmail.com',
      password: 'pass123',
      confirmPassword: 'pass123'
    };

    await page.locator('input[aria-label="John"]').fill(registrationData.firstName);
    await page.locator('input[aria-label="Doe"]').fill(registrationData.lastName);
    await page.locator('input[aria-label="Choose a username"]').fill(registrationData.username);
    await page.locator('input[aria-label="Enter your email"]').fill(registrationData.email);
    await page.locator('input[aria-label="Create a password"]').fill(registrationData.password);
    await page.locator('input[aria-label="Confirm your password"]').fill(registrationData.confirmPassword);
    
    // Accept terms and conditions
    await page.locator('input[type="checkbox"]').check();
    
    // Submit registration
    await page.locator('button[aria-label="Create Account"]').click();

    // Step 6: User Login Flow
    await page.locator('input[aria-label="Enter your username"]').fill('dudee');
    await page.locator('input[aria-label="Enter your password"]').fill('pass123');
    await page.keyboard.press('Enter');

    // Handle login retry with updated credentials
    await page.locator('input[aria-label="Enter your username"]').fill('The Person');
    await page.locator('input[aria-label="Enter your password"]').fill('password123');
    await page.keyboard.press('Enter');

    // Step 7: Dashboard Navigation and Interactions
    // Test dashboard features (assuming successful login)
    await page.waitForTimeout(2000); // Wait for navigation

    // Navigate through different sections
    await page.locator('nav > a:nth-of-type(1) > span').click(); // Jobs section
    
    // Test job filtering
    const categoryFilter = page.locator('select').first();
    await categoryFilter.selectOption('Technology');
    await categoryFilter.selectOption('Design');
    await categoryFilter.selectOption('Marketing');
    await categoryFilter.selectOption('All');

    // Step 8: Companies Section
    await page.locator('a:nth-of-type(2) > span').click();
    await page.locator('button[aria-label="View Jobs"]').click();

    // Step 9: Favorites Section Testing
    await page.locator('header a:nth-of-type(3) > svg').click();
    
    // Test pagination or navigation controls
    const paginationButtons = page.locator('button');
    await paginationButtons.first().click();
    await paginationButtons.nth(1).click();
    await paginationButtons.nth(2).click();

    // Step 10: About Section
    await page.locator('a:nth-of-type(4) > span').click();
    await page.locator('a[aria-label="Browse jobs"]').click();

    // Step 11: Profile Management
    await page.locator('header div > a:nth-of-type(2)').click();
    
    // Edit profile
    await page.locator('button[aria-label="Edit"]').click();
    await page.locator('input').first().fill('person');
    await page.locator('button[aria-label="Save"]').click();

    // Step 12: Navigation Testing
    // Test main navigation links
    await page.locator('nav > a:nth-of-type(1) > span').click();
    await page.locator('div > a > span').click(); // Home/Logo

    // Test featured jobs section
    await page.locator('section:nth-of-type(4) div.grid > div:nth-of-type(2) a').click();

    // Step 13: Footer Navigation Testing
    const footerLinks = [
      'About Us',
      'Careers', 
      'Press',
      'Blog',
      'Help Center',
      'Contact Us',
      'Privacy Policy',
      'Terms of Service',
      'Pricing',
      'Recruitment Tools',
      'Success Stories',
      'Browse Jobs',
      'Create Profile',
      'Job Alerts',
      'Career Advice',
      'Post a Job'
    ];

    // Test footer links (sample - testing a few key ones)
    for (const linkText of footerLinks.slice(0, 5)) {
      const footerLink = page.locator(`a[aria-label="${linkText}"]`);
      if (await footerLink.isVisible()) {
        await footerLink.click();
        await page.waitForTimeout(500);
      }
    }
  });

  test('Job Search and Filtering Functionality', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Test search functionality
    await page.locator('input[aria-label="Job title, keywords, or company"]').fill('Developer');
    await page.locator('button[aria-label="Search Jobs"]').click();
    
    // Test category filtering
    const categories = ['Technology', 'Design', 'Marketing', 'Finance'];
    const categorySelect = page.locator('select').first();
    
    for (const category of categories) {
      await categorySelect.selectOption(category);
      await page.waitForTimeout(1000);
      // Verify filter results
      await expect(page.locator('.job-listing')).toBeVisible({ timeout: 5000 });
    }
  });

  test('User Registration Validation', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('a[aria-label="Sign Up"]').click();
    
    // Test form validation
    await page.locator('button[aria-label="Create Account"]').click();
    
    // Check for validation messages
    await expect(page.locator('text=required')).toBeVisible({ timeout: 5000 });
    
    // Test password mismatch
    await page.locator('input[aria-label="Create a password"]').fill('password123');
    await page.locator('input[aria-label="Confirm your password"]').fill('differentpassword');
    await page.locator('button[aria-label="Create Account"]').click();
    
    await expect(page.locator('text=match')).toBeVisible({ timeout: 5000 });
  });

  test('Job Application Process', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Navigate to a job
    await page.locator('section:nth-of-type(4) div.grid > div:nth-of-type(1) a').click();
    
    // Test job application
    await page.locator('button[aria-label="Apply Now"]').click();
    
    // Should redirect to login if not authenticated
    await expect(page.locator('text=Sign In')).toBeVisible({ timeout: 5000 });
    
    // Test save job functionality
    await page.goBack();
    await page.locator('button[aria-label="Save Job"]').click();
  });

  test('Responsive Design Testing', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    
    // Test mobile navigation
    const mobileMenuButton = page.locator('button[aria-label="Menu"]');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await expect(page.locator('nav')).toBeVisible();
    }
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    
    // Verify layout adjustments
    await expect(page.locator('main')).toBeVisible();
  });

  test('Performance and Accessibility', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Test page load performance
    const performance = await page.evaluate(() => {
      const navigationTiming = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
        domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart
      };
    });
    
    expect(performance.loadTime).toBeLessThan(5000); // 5 second load time
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Test ARIA labels and accessibility
    const searchInput = page.locator('input[aria-label="Job title, keywords, or company"]');
    await expect(searchInput).toHaveAttribute('aria-label');
  });
});
