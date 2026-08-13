// @ts-nocheck
import { test, expect } from "@playwright/test";

/**
 * Garante que o splash crítico (logo pulsando) aparece em <1s no mobile
 * e é substituído pelo app real após hidratação, sem permanecer visível.
 */
test.describe("Splash crítico — logo pulsando", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("logo aparece em <1s no mobile e some após hidratar", async ({ page }) => {
    const start = Date.now();
    await page.goto("/", { waitUntil: "commit" });

    const logo = page.locator(".app-shell-logo").first();
    await expect(logo).toBeVisible({ timeout: 1000 });
    const visibleAt = Date.now() - start;
    expect(visibleAt).toBeLessThan(1000);

    // Confirma a animação CSS (pulse) está ativa
    const animationName = await logo.evaluate((el) => getComputedStyle(el).animationName);
    expect(animationName).toMatch(/logoPulse/i);

    // Hidratação: documentElement[data-hydrated="1"]
    await page.waitForFunction(() => document.documentElement.dataset.hydrated === "1", null, {
      timeout: 8000,
    });

    // Após hidratação o splash não deve permanecer no DOM
    await expect(page.locator('[data-splash="1"]')).toHaveCount(0, { timeout: 5000 });
  });
});
