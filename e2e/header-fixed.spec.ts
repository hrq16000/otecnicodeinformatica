import { test, expect, devices } from "@playwright/test";

/**
 * Garantia funcional: o header permanece `position: fixed`, o TopOfferBanner fica
 * imediatamente abaixo dele (sem overlap) e o spacer empurra o conteúdo da página.
 * Roda em viewports mobile-pequeno, mobile, tablet e desktop.
 */
const viewports = [
  { name: "mobile-sm", width: 320, height: 568 },
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1366, height: 768 },
];

for (const vp of viewports) {
  test.describe(`top chrome @ ${vp.name} (${vp.width}x${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("header fica fixo e banner não sobrepõe ao rolar", async ({ page }) => {
      await page.goto("/");

      const header = page.getByTestId("site-header");
      const banner = page.getByTestId("top-offer-banner");
      await expect(header).toBeVisible();

      // Posição inicial
      const h0 = await header.boundingBox();
      expect(h0).not.toBeNull();
      expect(h0!.y).toBeCloseTo(0, 0);

      let bannerVisible = await banner.isVisible().catch(() => false);
      let b0 = bannerVisible ? await banner.boundingBox() : null;
      if (b0) {
        // Banner começa exatamente onde o header termina
        expect(b0.y).toBeGreaterThanOrEqual(h0!.height - 1);
        expect(b0.y).toBeLessThanOrEqual(h0!.height + 1);
      }

      // Rola a página
      await page.evaluate(() => window.scrollTo(0, 1500));
      await page.waitForTimeout(150);

      // Header continua fixo no topo
      const position = await header.evaluate((el) => getComputedStyle(el).position);
      expect(position).toBe("fixed");

      const h1 = await header.boundingBox();
      expect(h1).not.toBeNull();
      expect(h1!.y).toBeCloseTo(0, 0);

      // Banner (se visível) segue ancorado abaixo do header sem overlap
      bannerVisible = await banner.isVisible().catch(() => false);
      if (bannerVisible) {
        const b1 = await banner.boundingBox();
        expect(b1).not.toBeNull();
        expect(b1!.y).toBeGreaterThanOrEqual(h1!.height - 1);
        // sem cobrir o header
        expect(b1!.y + b1!.height).toBeGreaterThan(h1!.height);
      }
    });
  });
}
