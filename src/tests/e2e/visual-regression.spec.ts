import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.describe('Landing Page', () => {
    test('homepage renders correctly', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByRole('heading', { name: /Enterprise Frontend/i })).toBeVisible();
      await expect(page).toHaveScreenshot('homepage.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });
  });

  test.describe('Auth Pages', () => {
    test('login page renders correctly', async ({ page }) => {
      await page.goto('/auth/login');
      await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
      await expect(page).toHaveScreenshot('login.png', {
        maxDiffPixelRatio: 0.05,
      });
    });

    test('register page renders correctly', async ({ page }) => {
      await page.goto('/auth/register');
      await expect(page.getByRole('heading', { name: /create.*account/i })).toBeVisible();
      await expect(page).toHaveScreenshot('register.png', {
        maxDiffPixelRatio: 0.05,
      });
    });

    test('forgot password page renders correctly', async ({ page }) => {
      await page.goto('/auth/forgot-password');
      await expect(page.getByRole('heading', { name: /forgot.*password/i })).toBeVisible();
      await expect(page).toHaveScreenshot('forgot-password.png', {
        maxDiffPixelRatio: 0.05,
      });
    });
  });

  test.describe('Dashboard Pages', () => {
    test('dashboard overview renders correctly', async ({ page }) => {
      await page.goto('/dashboard');
      await expect(page.getByText(/Total Users|Dashboard/i)).toBeVisible();
      await expect(page).toHaveScreenshot('dashboard-overview.png', {
        maxDiffPixelRatio: 0.05,
      });
    });

    test('settings page renders correctly', async ({ page }) => {
      await page.goto('/dashboard/settings');
      await expect(page.getByText(/Settings/i)).toBeVisible();
      await expect(page).toHaveScreenshot('settings.png', {
        maxDiffPixelRatio: 0.05,
      });
    });

    test('admin page renders correctly', async ({ page }) => {
      await page.goto('/dashboard/admin');
      await expect(page.getByText(/Admin|User Management/i)).toBeVisible();
      await expect(page).toHaveScreenshot('admin.png', {
        maxDiffPixelRatio: 0.05,
      });
    });

    test('billing page renders correctly', async ({ page }) => {
      await page.goto('/dashboard/billing');
      await expect(page.getByText(/Billing|Pricing/i)).toBeVisible();
      await expect(page).toHaveScreenshot('billing.png', {
        maxDiffPixelRatio: 0.05,
      });
    });

    test('analytics page renders correctly', async ({ page }) => {
      await page.goto('/dashboard/analytics');
      await expect(page.getByText(/Analytics/i)).toBeVisible();
      await expect(page).toHaveScreenshot('analytics.png', {
        maxDiffPixelRatio: 0.05,
      });
    });

    test('plugins page renders correctly', async ({ page }) => {
      await page.goto('/dashboard/plugins');
      await expect(page.getByText(/Plugins|Marketplace/i)).toBeVisible();
      await expect(page).toHaveScreenshot('plugins.png', {
        maxDiffPixelRatio: 0.05,
      });
    });
  });

  test.describe('Theme Variations', () => {
    test('dark mode renders correctly', async ({ page }) => {
      await page.goto('/');
      await page.emulateMedia({ colorScheme: 'dark' });
      await expect(page.getByRole('heading', { name: /Enterprise Frontend/i })).toBeVisible();
      await expect(page).toHaveScreenshot('homepage-dark.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });

    test('dashboard dark mode renders correctly', async ({ page }) => {
      await page.goto('/dashboard');
      await page.emulateMedia({ colorScheme: 'dark' });
      await expect(page.getByText(/Total Users|Dashboard/i)).toBeVisible();
      await expect(page).toHaveScreenshot('dashboard-dark.png', {
        maxDiffPixelRatio: 0.05,
      });
    });
  });

  test.describe('Responsive Layouts', () => {
    test('homepage mobile layout', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/');
      await expect(page.getByRole('heading', { name: /Enterprise Frontend/i })).toBeVisible();
      await expect(page).toHaveScreenshot('homepage-mobile.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });

    test('homepage tablet layout', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await expect(page.getByRole('heading', { name: /Enterprise Frontend/i })).toBeVisible();
      await expect(page).toHaveScreenshot('homepage-tablet.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });

    test('dashboard mobile layout', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/dashboard');
      await expect(page.getByText(/Total Users|Dashboard/i)).toBeVisible();
      await expect(page).toHaveScreenshot('dashboard-mobile.png', {
        maxDiffPixelRatio: 0.05,
      });
    });
  });
});
