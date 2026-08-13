// @ts-nocheck
import { test, expect } from "@playwright/test";

// Smoke: a home precisa renderizar conteúdo (logo do shell ou hero) em < 2s
// e hidratar (data-hydrated=1) antes do fallback de 8s.
test("home shows content fast and hydrates", async ({ page }) => {
  const t0 = Date.now();
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const logo = page.locator(".app-shell-logo, header img").first();
  await expect(logo).toBeVisible({ timeout: 2000 });
  const tRender = Date.now() - t0;
  expect(tRender, `first paint took ${tRender}ms`).toBeLessThan(2000);

  await page.waitForFunction(() => document.documentElement.dataset.hydrated === "1", {
    timeout: 7500,
  });
});
