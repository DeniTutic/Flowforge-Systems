import { test, expect } from "@playwright/test";

const quietStorage = () => {
  localStorage.setItem("flowforge_newsletter_subscribed_v1", "1");
  localStorage.setItem(
    "flowforge_cookie_consent_v1",
    JSON.stringify({ choice: "accepted", at: Date.now() })
  );
};

test.describe("marketing site", () => {
  test("home loads hero with correct CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Websites and AI systems that generate leads/i })
    ).toBeVisible();

    const hero = page.locator("#hero");
    await expect(hero.getByRole("link", { name: /Book a free strategy call/i })).toHaveAttribute(
      "href",
      "#contact"
    );
    await expect(hero.getByRole("link", { name: /See our work/i })).toHaveAttribute("href", "#work");
  });

  test("developer setup notes never reach the page", async ({ page }) => {
    await page.goto("/");
    const html = await page.content();
    expect(html).not.toContain("NEXT_PUBLIC_");
    expect(html).not.toContain(".env.local");
  });

  test("newsletter dialog does not interrupt the first impression", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(5000);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("dark mode is applied before hydration", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("darkMode", "true");
    });
    await page.goto("/", { waitUntil: "commit" });
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("sections are in the intended order and nav matches", async ({ page }) => {
    await page.addInitScript(quietStorage);
    await page.goto("/");
    const ids = await page.$$eval("main section[id]", (els) => els.map((e) => e.id));
    expect(ids).toEqual(["hero", "work", "process", "services", "pricing", "estimator", "faq", "contact"]);
    const nav = page.getByRole("navigation", { name: "Primary" });
    for (const label of ["Work", "Process", "Services", "Pricing"]) {
      await expect(nav.getByRole("link", { name: label, exact: true }).first()).toBeVisible();
    }
  });

  test("privacy policy page", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
  });

  test("terms page", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByRole("heading", { name: "Terms of Service" })).toBeVisible();
  });

  test("branded 404", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /doesn't exist/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Back to home/i })).toHaveAttribute("href", "/");
  });

  test("metadata routes respond", async ({ request }) => {
    for (const path of ["/sitemap.xml", "/robots.txt", "/icon", "/apple-icon", "/opengraph-image"]) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
    }
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Disallow: /admin");
  });

  test("smart project estimate section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Not sure\? Ballpark it\./i })).toBeVisible();
  });
});
