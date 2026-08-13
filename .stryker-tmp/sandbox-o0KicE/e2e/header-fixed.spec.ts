// @ts-nocheck
import { test, expect } from "@playwright/test";

/**
 * Garantia funcional: o header permanece `position: fixed`, o TopOfferBanner fica
 * imediatamente abaixo dele (sem overlap) e o spacer empurra o conteúdo da página.
 * Roda em viewports mobile-pequeno, mobile, tablet e desktop.
 */
const viewports = [
  { name: "mobile-360", width: 360, height: 740 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop", width: 1366, height: 768 },
];

for (const vp of viewports) {
  test.describe(`top chrome @ ${vp.name} (${vp.width}x${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("header fica fixo e banner não sobrepõe ao rolar", async ({ page }) => {
      await page.addInitScript(() => {
        (window as unknown as { __cls?: number }).__cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as PerformanceEntryList & Array<{ value?: number; hadRecentInput?: boolean }>) {
            if (!entry.hadRecentInput) (window as unknown as { __cls: number }).__cls += entry.value || 0;
          }
        }).observe({ type: "layout-shift", buffered: true });
      });
      await page.goto("/");

      const header = page.getByTestId("site-header");
      const banner = page.getByTestId("top-offer-banner");
      await expect(header).toBeVisible();

      const whats = header.getByRole("link", { name: /WhatsApp/i }).first();
      const agendar = header.getByRole("link", { name: /Agendar/i }).first();
      await expect(whats).toBeVisible();
      await expect(agendar).toBeVisible();
      await whats.click({ trial: true });
      await agendar.click({ trial: true });

      for (const cta of [whats, agendar]) {
        const metrics = await cta.evaluate((el) => ({ height: el.getBoundingClientRect().height, scrollHeight: el.scrollHeight }));
        expect(metrics.scrollHeight).toBeLessThanOrEqual(metrics.height + 2);
      }

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
      await whats.click({ trial: true });
      await agendar.click({ trial: true });

      // Banner (se visível) segue ancorado abaixo do header sem overlap
      bannerVisible = await banner.isVisible().catch(() => false);
      if (bannerVisible) {
        const b1 = await banner.boundingBox();
        expect(b1).not.toBeNull();
        expect(b1!.y).toBeGreaterThanOrEqual(h1!.height - 1);
        // sem cobrir o header
        expect(b1!.y + b1!.height).toBeGreaterThan(h1!.height);
      }

      const cls = await page.evaluate(() => (window as unknown as { __cls?: number }).__cls || 0);
      expect(cls).toBeLessThan(0.02);
    });
  });
}
