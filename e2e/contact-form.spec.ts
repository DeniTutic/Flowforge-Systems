import { test, expect } from "@playwright/test";

test("contact form submits with mocked API", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("flowforge_newsletter_subscribed_v1", "1");
    localStorage.setItem(
      "flowforge_cookie_consent_v1",
      JSON.stringify({ choice: "accepted", at: Date.now() })
    );
  });

  await page.route("**/api/contact", async (route) => {
    if (route.request().method() !== "POST") {
      await route.continue();
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto("/#contact");
  await page.getByLabel("Name", { exact: true }).fill("E2E User");
  await page.getByLabel("Email", { exact: true }).fill("e2e@example.com");
  await page
    .getByLabel("Message", { exact: true })
    .fill("This is a test message for automated end-to-end testing.");

  await page.waitForTimeout(2600);

  await page.getByRole("button", { name: /Send Message/i }).click();

  await expect(page.getByRole("status")).toContainText(/Thank you/i);
});
