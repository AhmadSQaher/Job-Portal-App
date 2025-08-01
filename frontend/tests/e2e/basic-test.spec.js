import { test, expect } from '@playwright/test';

test('Basic Homepage Test', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('https://localhost:5173');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check if the page title is correct
  await expect(page).toHaveTitle(/LINX/);
  
  // Check if the main logo is visible
  const logo = page.locator('img[alt*="LINX"]');
  await expect(logo).toBeVisible();
  
  // Check if search input is present
  const searchInput = page.locator('input[placeholder*="job" i], input[aria-label*="job" i]');
  await expect(searchInput).toBeVisible();
  
  console.log('✅ Basic homepage test passed!');
});
