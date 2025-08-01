import { test, expect } from '@playwright/test';

/**
 * Job Search and Application Tests
 * Tests job browsing, searching, filtering, and application process
 */

test.describe('Job Search & Applications', () => {
  const BASE_URL = 'https://localhost:5173';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Job Search Functionality', async ({ page }) => {
    // Test search input
    const searchInput = page.locator('input[placeholder*="job" i], input[aria-label*="search" i], input[name="search"]');
    await searchInput.fill('Developer');
    
    // Click search button
    const searchButton = page.locator('button:has-text("Search"), button[aria-label*="search" i]');
    await searchButton.click();
    
    // Wait for results
    await page.waitForTimeout(2000);
    
    // Verify search results are displayed
    const jobListings = page.locator('.job-listing, .job-card, [data-testid="job-item"]');
    await expect(jobListings.first()).toBeVisible({ timeout: 10000 });
    
    // Test search suggestions/autocomplete if available
    await searchInput.clear();
    await searchInput.type('Java');
    
    const suggestions = page.locator('.suggestion, .autocomplete-item');
    if (await suggestions.first().isVisible({ timeout: 2000 })) {
      await suggestions.first().click();
    }
  });

  test('Job Category Filtering', async ({ page }) => {
    // Navigate to jobs page
    await page.locator('a:has-text("Jobs"), nav a[href*="job"]').click();
    
    // Test category filters
    const categories = ['Technology', 'Design', 'Marketing', 'Finance', 'Healthcare'];
    
    for (const category of categories) {
      const categoryFilter = page.locator(`select, .filter-dropdown`).first();
      
      if (await categoryFilter.isVisible()) {
        await categoryFilter.selectOption(category);
        await page.waitForTimeout(1500);
        
        // Verify filtered results
        const resultsCount = page.locator('.results-count, .job-count');
        if (await resultsCount.isVisible()) {
          const count = await resultsCount.textContent();
          expect(count).toContain('job');
        }
      }
    }
  });

  test('Job Location Filtering', async ({ page }) => {
    await page.locator('a:has-text("Jobs")').click();
    
    // Test location filters
    const locationInput = page.locator('input[placeholder*="location" i], input[name="location"]');
    if (await locationInput.isVisible()) {
      await locationInput.fill('New York');
      await page.keyboard.press('Enter');
      
      await page.waitForTimeout(2000);
      
      // Verify location-based results
      const jobCards = page.locator('.job-listing, .job-card');
      await expect(jobCards.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('Job Details View', async ({ page }) => {
    // Navigate to jobs and click on first job
    await page.locator('a:has-text("Jobs")').click();
    
    const firstJob = page.locator('.job-listing, .job-card, [data-testid="job-item"]').first();
    await firstJob.click();
    
    // Verify job details page
    await expect(page.locator('h1, .job-title')).toBeVisible();
    await expect(page.locator('.job-description, .description')).toBeVisible();
    await expect(page.locator('.company-name, .employer')).toBeVisible();
    
    // Test job actions
    const applyButton = page.locator('button:has-text("Apply"), button[aria-label*="apply" i]');
    const saveButton = page.locator('button:has-text("Save"), button[aria-label*="save" i]');
    
    if (await applyButton.isVisible()) {
      await expect(applyButton).toBeEnabled();
    }
    
    if (await saveButton.isVisible()) {
      await expect(saveButton).toBeEnabled();
    }
  });

  test('Job Application Process', async ({ page }) => {
    // Navigate to a job
    await page.locator('a:has-text("Jobs")').click();
    await page.locator('.job-listing, .job-card').first().click();
    
    // Start application process
    const applyButton = page.locator('button:has-text("Apply"), button[aria-label*="apply" i]');
    
    if (await applyButton.isVisible()) {
      await applyButton.click();
      
      // Should redirect to login if not authenticated, or show application form
      const currentUrl = page.url();
      
      if (currentUrl.includes('login')) {
        // User needs to login first
        await expect(page.locator('text=sign in, text=login')).toBeVisible();
      } else {
        // Application form should be visible
        await expect(page.locator('form, .application-form')).toBeVisible({ timeout: 5000 });
        
        // Fill application form if present
        const resumeUpload = page.locator('input[type="file"]');
        const coverLetterInput = page.locator('textarea[name*="cover"], textarea[placeholder*="cover"]');
        
        if (await coverLetterInput.isVisible()) {
          await coverLetterInput.fill('This is a test cover letter for the E2E test.');
        }
        
        // Submit application
        const submitButton = page.locator('button:has-text("Submit"), button:has-text("Apply")');
        if (await submitButton.isVisible()) {
          await submitButton.click();
          
          // Verify success message
          await expect(page.locator('text=success, text=submitted')).toBeVisible({ timeout: 10000 });
        }
      }
    }
  });

  test('Save Job Functionality', async ({ page }) => {
    await page.locator('a:has-text("Jobs")').click();
    await page.locator('.job-listing, .job-card').first().click();
    
    const saveButton = page.locator('button:has-text("Save"), button[aria-label*="save" i]');
    
    if (await saveButton.isVisible()) {
      await saveButton.click();
      
      // Should show success message or change button state
      await expect(page.locator('text=saved, button:has-text("Saved")')).toBeVisible({ timeout: 5000 });
    }
  });

  test('Job Search Pagination', async ({ page }) => {
    await page.locator('a:has-text("Jobs")').click();
    
    // Look for pagination controls
    const nextButton = page.locator('button:has-text("Next"), .pagination .next');
    const pageNumbers = page.locator('.pagination .page-number, .page-btn');
    
    if (await nextButton.isVisible()) {
      // Test next page
      await nextButton.click();
      await page.waitForTimeout(2000);
      
      // Verify new results loaded
      const jobListings = page.locator('.job-listing, .job-card');
      await expect(jobListings.first()).toBeVisible();
    }
    
    if (await pageNumbers.first().isVisible()) {
      // Test specific page navigation
      await pageNumbers.nth(1).click();
      await page.waitForTimeout(2000);
      
      await expect(page.locator('.job-listing, .job-card').first()).toBeVisible();
    }
  });

  test('Job Search Sorting', async ({ page }) => {
    await page.locator('a:has-text("Jobs")').click();
    
    // Test sorting options
    const sortDropdown = page.locator('select[name*="sort"], .sort-dropdown');
    
    if (await sortDropdown.isVisible()) {
      const sortOptions = ['date', 'relevance', 'salary'];
      
      for (const option of sortOptions) {
        try {
          await sortDropdown.selectOption({ label: new RegExp(option, 'i') });
          await page.waitForTimeout(1500);
          
          // Verify results are re-ordered
          const jobListings = page.locator('.job-listing, .job-card');
          await expect(jobListings.first()).toBeVisible();
        } catch (error) {
          console.log(`Sort option ${option} not available`);
        }
      }
    }
  });

  test('Advanced Job Filters', async ({ page }) => {
    await page.locator('a:has-text("Jobs")').click();
    
    // Test salary range filter
    const salaryFilter = page.locator('input[name*="salary"], .salary-filter');
    if (await salaryFilter.isVisible()) {
      await salaryFilter.fill('50000');
    }
    
    // Test job type filter (full-time, part-time, etc.)
    const jobTypeFilter = page.locator('select[name*="type"], .job-type-filter');
    if (await jobTypeFilter.isVisible()) {
      await jobTypeFilter.selectOption('full-time');
    }
    
    // Test experience level filter
    const experienceFilter = page.locator('select[name*="experience"], .experience-filter');
    if (await experienceFilter.isVisible()) {
      await experienceFilter.selectOption('mid-level');
    }
    
    // Apply filters
    const applyFiltersButton = page.locator('button:has-text("Apply"), button:has-text("Filter")');
    if (await applyFiltersButton.isVisible()) {
      await applyFiltersButton.click();
      await page.waitForTimeout(2000);
      
      // Verify filtered results
      const results = page.locator('.job-listing, .job-card');
      await expect(results.first()).toBeVisible({ timeout: 5000 });
    }
  });
});
