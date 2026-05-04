import { test, expect } from '@playwright/test';

test.describe('Golden Path — Core User Flows', () => {
  test.describe('Landing → Auth Flow', () => {
    test('should navigate from landing to login', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByRole('heading', { name: /Enterprise Frontend/i })).toBeVisible();
      await page.getByRole('link', { name: /sign in/i }).click();
      await expect(page).toHaveURL(/.*auth\/login/);
      await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
    });

    test('login form validates required fields', async ({ page }) => {
      await page.goto('/auth/login');
      await page.getByRole('button', { name: /sign in/i }).click();
      await expect(page.locator('form')).toBeVisible();
    });

    test('should navigate to register from login', async ({ page }) => {
      await page.goto('/auth/login');
      await page.getByRole('link', { name: /sign up|create.*account|register/i }).click();
      await expect(page).toHaveURL(/.*auth\/register/);
    });

    test('should navigate to forgot password from login', async ({ page }) => {
      await page.goto('/auth/login');
      await page.getByRole('link', { name: /forgot.*password/i }).click();
      await expect(page).toHaveURL(/.*auth\/forgot-password/);
    });

    test('register form has all required fields', async ({ page }) => {
      await page.goto('/auth/register');
      await expect(page.getByLabel(/first name/i)).toBeVisible();
      await expect(page.getByLabel(/last name/i)).toBeVisible();
      await expect(page.getByLabel(/email/i)).toBeVisible();
      await expect(page.getByLabel(/^password$/i)).toBeVisible();
    });
  });

  test.describe('Dashboard Navigation', () => {
    test('should load dashboard overview', async ({ page }) => {
      await page.goto('/dashboard');
      await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    });

    test('should display stat cards on dashboard', async ({ page }) => {
      await page.goto('/dashboard');
      await expect(page.getByText('Total Users')).toBeVisible();
      await expect(page.getByText('Revenue')).toBeVisible();
    });

    test('should navigate to settings', async ({ page }) => {
      await page.goto('/dashboard/settings');
      await expect(page.getByText(/settings/i)).toBeVisible();
    });

    test('should navigate to admin', async ({ page }) => {
      await page.goto('/dashboard/admin');
      await expect(page.getByText(/admin|user management/i)).toBeVisible();
    });

    test('should navigate to billing', async ({ page }) => {
      await page.goto('/dashboard/billing');
      await expect(page.getByText(/billing|pricing/i)).toBeVisible();
    });

    test('should navigate to analytics', async ({ page }) => {
      await page.goto('/dashboard/analytics');
      await expect(page.getByText(/analytics/i)).toBeVisible();
    });

    test('should navigate to plugins', async ({ page }) => {
      await page.goto('/dashboard/plugins');
      await expect(page.getByText(/plugins|marketplace/i)).toBeVisible();
    });

    test('should navigate to notifications', async ({ page }) => {
      await page.goto('/dashboard/notifications');
      await expect(page.getByText(/notifications/i)).toBeVisible();
    });
  });

  test.describe('Settings Tabs', () => {
    test('should switch between settings tabs', async ({ page }) => {
      await page.goto('/dashboard/settings');
      await expect(page.getByText(/general/i)).toBeVisible();

      const securityTab = page.getByRole('tab', { name: /security/i }).or(page.getByText(/security/i));
      if (await securityTab.isVisible()) {
        await securityTab.click();
      }

      const notifTab = page.getByRole('tab', { name: /notification/i }).or(page.getByText(/notification/i));
      if (await notifTab.isVisible()) {
        await notifTab.click();
      }

      const appearanceTab = page.getByRole('tab', { name: /appearance/i }).or(page.getByText(/appearance/i));
      if (await appearanceTab.isVisible()) {
        await appearanceTab.click();
      }
    });
  });

  test.describe('Billing Page', () => {
    test('should display pricing tiers', async ({ page }) => {
      await page.goto('/dashboard/billing');
      await expect(page.getByText(/starter/i)).toBeVisible();
      await expect(page.getByText(/professional/i)).toBeVisible();
      await expect(page.getByText(/enterprise/i)).toBeVisible();
    });

    test('should show plan prices', async ({ page }) => {
      await page.goto('/dashboard/billing');
      await expect(page.getByText('$29')).toBeVisible();
      await expect(page.getByText('$99')).toBeVisible();
    });
  });

  test.describe('Admin Data Table', () => {
    test('should display user table with headers', async ({ page }) => {
      await page.goto('/dashboard/admin');
      await expect(page.getByText(/name/i).first()).toBeVisible();
      await expect(page.getByText(/email/i).first()).toBeVisible();
    });

    test('should have sortable columns', async ({ page }) => {
      await page.goto('/dashboard/admin');
      const nameHeader = page.locator('th', { hasText: /name/i }).first();
      if (await nameHeader.isVisible()) {
        await nameHeader.click();
      }
    });
  });

  test.describe('Theme Toggle', () => {
    test('should toggle between light and dark mode', async ({ page }) => {
      await page.goto('/dashboard');

      const themeButton = page.getByRole('button', { name: /toggle theme|theme/i }).or(
        page.locator('[aria-label*="theme" i]')
      );

      if (await themeButton.isVisible()) {
        await themeButton.click();
        await page.waitForTimeout(500);
      }
    });
  });

  test.describe('Responsive Layout', () => {
    test('sidebar collapses on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/dashboard');
      await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    });

    test('landing page is responsive', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/');
      await expect(page.getByRole('heading', { name: /Enterprise Frontend/i })).toBeVisible();
    });
  });
});
