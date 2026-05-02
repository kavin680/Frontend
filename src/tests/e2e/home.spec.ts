import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the hero section', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /Enterprise Frontend/i })
    ).toBeVisible();
  });

  test('should have sign in and get started buttons', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible();
    await expect(
      page.getByRole('link', { name: /get started/i })
    ).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/.*auth\/login/);
  });

  test('should display feature cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Dashboard System')).toBeVisible();
    await expect(page.getByText('Enterprise Auth')).toBeVisible();
    await expect(page.getByText('Plugin Architecture')).toBeVisible();
  });
});
