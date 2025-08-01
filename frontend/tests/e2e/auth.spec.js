import { test, expect } from '@playwright/test';

/**
 * Authentication Flow Tests
 * Tests user registration, login, and profile management
 */

test.describe('Authentication & User Management', () => {
  const BASE_URL = 'https://localhost:5173';

  test('User Registration Flow', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Navigate to registration
    await page.locator('a[aria-label="Sign Up"]').click();
    await expect(page).toHaveURL(/.*register.*|.*signup.*/);

    // Test form validation - empty submission
    await page.locator('button[aria-label="Create Account"]').click();
    
    // Should show validation errors
    const errorMessages = page.locator('.error, .text-red-500, [role="alert"]');
    await expect(errorMessages.first()).toBeVisible({ timeout: 5000 });

    // Fill valid registration data
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      username: `testuser_${Date.now()}`,
      email: `test_${Date.now()}@example.com`,
      password: 'TestPassword123!'
    };

    await page.locator('input[aria-label*="first" i], input[placeholder*="first" i]').fill(testUser.firstName);
    await page.locator('input[aria-label*="last" i], input[placeholder*="last" i]').fill(testUser.lastName);
    await page.locator('input[aria-label*="username" i], input[placeholder*="username" i]').fill(testUser.username);
    await page.locator('input[aria-label*="email" i], input[placeholder*="email" i]').fill(testUser.email);
    await page.locator('input[aria-label*="password" i], input[placeholder*="password" i]').first().fill(testUser.password);
    await page.locator('input[aria-label*="confirm" i], input[placeholder*="confirm" i]').fill(testUser.password);

    // Accept terms if checkbox exists
    const termsCheckbox = page.locator('input[type="checkbox"]');
    if (await termsCheckbox.isVisible()) {
      await termsCheckbox.check();
    }

    // Submit registration
    await page.locator('button[aria-label="Create Account"], button:has-text("Sign Up"), button:has-text("Register")').click();
    
    // Should redirect to login or dashboard
    await page.waitForURL(/login|dashboard|profile/, { timeout: 10000 });
  });

  test('User Login Flow', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Navigate to login
    await page.locator('a:has-text("Sign In"), a:has-text("Login"), a[href*="login"]').click();
    
    // Test empty login
    await page.locator('button:has-text("Sign In"), button:has-text("Login")').click();
    
    // Should show validation
    const errorMessage = page.locator('.error, .text-red-500, [role="alert"]');
    await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });

    // Test with valid credentials (using test user)
    await page.locator('input[type="text"], input[placeholder*="username" i], input[aria-label*="username" i]').fill('testuser');
    await page.locator('input[type="password"]').fill('password123');
    
    await page.locator('button:has-text("Sign In"), button:has-text("Login")').click();
    
    // Wait for navigation (could be dashboard or stay on login with error)
    await page.waitForTimeout(3000);
  });

  test('Profile Management', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Assume user is logged in (in real test, you'd login first)
    // Navigate to profile
    await page.locator('a[href*="profile"], button:has-text("Profile")').click();
    
    // Test profile editing
    const editButton = page.locator('button:has-text("Edit"), button[aria-label="Edit"]');
    if (await editButton.isVisible()) {
      await editButton.click();
      
      // Edit profile fields
      const nameInput = page.locator('input[name="name"], input[placeholder*="name" i]').first();
      if (await nameInput.isVisible()) {
        await nameInput.fill('Updated Name');
      }
      
      // Save changes
      await page.locator('button:has-text("Save"), button[aria-label="Save"]').click();
      
      // Verify success message or updated data
      await expect(page.locator('text=saved, text=updated')).toBeVisible({ timeout: 5000 });
    }
  });

  test('Password Reset Flow', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Navigate to login
    await page.locator('a:has-text("Sign In"), a:has-text("Login")').click();
    
    // Click forgot password
    const forgotPasswordLink = page.locator('a:has-text("Forgot"), a:has-text("Reset")');
    if (await forgotPasswordLink.isVisible()) {
      await forgotPasswordLink.click();
      
      // Enter email for reset
      await page.locator('input[type="email"]').fill('test@example.com');
      await page.locator('button:has-text("Reset"), button:has-text("Send")').click();
      
      // Should show success message
      await expect(page.locator('text=sent, text=check your email')).toBeVisible({ timeout: 5000 });
    }
  });

  test('Logout Functionality', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Assume user is logged in
    // Look for logout button/link
    const logoutButton = page.locator('button:has-text("Logout"), a:has-text("Logout"), button:has-text("Sign Out")');
    
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      
      // Should redirect to homepage or login
      await expect(page.locator('text=Sign In, text=Login')).toBeVisible({ timeout: 5000 });
    }
  });
});
