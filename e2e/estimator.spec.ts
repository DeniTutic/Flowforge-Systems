import { test, expect } from "@playwright/test";
import {
  GROWTH_FROM,
  STARTER_FROM,
  computeProjectEstimate,
  estimateTier,
  type AiScope,
  type Complexity,
  type Timeline,
} from "../lib/projectEstimate";

// The estimator and the pricing cards must never contradict each other. This walks every
// combination the sliders and buttons can produce and checks the contract holds for all of them.
test("estimate never starts below the package it names", () => {
  const complexities: Complexity[] = ["focused", "standard", "large"];
  const aiScopes: AiScope[] = ["none", "light", "moderate", "advanced"];
  const timelines: Timeline[] = ["flexible", "normal", "rush"];
  const seen = { Starter: 0, Growth: 0, Scale: 0 };
  let combos = 0;

  for (let sizeDepth = 1; sizeDepth <= 10; sizeDepth++) {
    for (let integrations = 0; integrations <= 10; integrations++) {
      for (const complexity of complexities) {
        for (const aiScope of aiScopes) {
          for (const timeline of timelines) {
            const input = { sizeDepth, integrations, complexity, aiScope, timeline };
            const { low, high } = computeProjectEstimate(input);
            const tier = estimateTier(low, high);
            const where = JSON.stringify(input);
            combos++;
            seen[tier]++;

            expect(low, `low end below cheapest package: ${where}`).toBeGreaterThanOrEqual(STARTER_FROM);
            expect(high, `range too narrow: ${where}`).toBeGreaterThanOrEqual(low + 700);
            expect(high - low, `range too wide: ${where}`).toBeLessThanOrEqual(12000);
            if (tier !== "Starter") {
              expect(low, `${tier} range starts below Growth's price: ${where}`).toBeGreaterThanOrEqual(GROWTH_FROM);
            }
          }
        }
      }
    }
  }

  expect(combos).toBe(3960);
  // Every package must be reachable, otherwise the badge is decoration.
  expect(seen.Starter).toBeGreaterThan(0);
  expect(seen.Growth).toBeGreaterThan(0);
  expect(seen.Scale).toBeGreaterThan(0);
});

test("pricing cards show the same starting prices the estimator uses", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("flowforge_newsletter_subscribed_v1", "1");
    localStorage.setItem("flowforge_cookie_consent_v1", JSON.stringify({ choice: "accepted", at: Date.now() }));
  });
  await page.goto("/");
  const pricing = page.locator("#pricing");
  await expect(pricing.getByText("From $2,999")).toBeVisible();
  await expect(pricing.getByText("From $7,999")).toBeVisible();
});

test("default estimate is a Starter range, not the old $1,500 floor", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("flowforge_newsletter_subscribed_v1", "1");
    localStorage.setItem("flowforge_cookie_consent_v1", JSON.stringify({ choice: "accepted", at: Date.now() }));
  });
  await page.goto("/#estimator");
  const estimator = page.locator("#estimator");
  await expect(estimator.getByText(/Starter package/)).toBeVisible();
  await expect(estimator).not.toContainText("$1,500");
});

test("summary keeps AI capitalised", () => {
  for (const aiScope of ["none", "light", "moderate", "advanced"] as AiScope[]) {
    const { summary } = computeProjectEstimate({
      sizeDepth: 5,
      complexity: "standard",
      integrations: 2,
      aiScope,
      timeline: "normal",
    });
    expect(summary, aiScope).toContain("AI");
    expect(summary, aiScope).not.toMatch(/\bai\b/);
  }
});
