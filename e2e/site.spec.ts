import { test, expect } from "@playwright/test";

test.describe("marketing site", () => {
  test("home loads hero", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Websites and AI systems that generate leads/i })
    ).toBeVisible();
  });

  test("privacy policy page", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
  });

  test("terms page", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByRole("heading", { name: "Terms of Service" })).toBeVisible();
  });

  test("smart project estimate section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Smart project estimate/i })).toBeVisible();
  });
});
