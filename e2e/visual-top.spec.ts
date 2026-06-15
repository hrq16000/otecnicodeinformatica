import { test, expect } from "@playwright/test";

/**
 * Regressão visual do topo (header + banner) em múltiplos viewports.
 * Snapshots ficam em e2e/visual-top.spec.ts-snapshots/. Para gerar/atualizar:
 *   npx playwright test e2e/visual-top.spec.ts --update-snapshots
 */
const viewports = [
  { name: "mobile-sm", width: 320, height: 568 },
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1366, height: 768 },
];

for (const vp of viewports) {
  test.describe(`visual topo @ ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test(`captura região do topo`, async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Espera o header montar
      const header = page.getByTestId("site-header");
      await expect(header).toBeVisible();

      // Calcula altura total do chrome
      const chromeHeight = await page.evaluate(() => {
        const styles = getComputedStyle(document.documentElement);
        const h = parseInt(styles.getPropertyValue("--site-header-height")) || 56;
        const b = parseInt(styles.getPropertyValue("--top-offer-height")) || 42;
        return h + b + 8;
      });

      await expect(page).toHaveScreenshot(`top-${vp.name}.png`, {
        clip: { x: 0, y: 0, width: vp.width, height: chromeHeight },
        maxDiffPixelRatio: 0.01,
        animations: "disabled",
      });
    });
  });
}
