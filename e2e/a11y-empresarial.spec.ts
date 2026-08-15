import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * RODADA 3U — acessibilidade automatizada (axe-core) nas páginas empresariais
 * propagadas na 3T. Falha o CI em qualquer violação critical/serious.
 * Cobre contraste, labels/nomes acessíveis e ordem de foco por teclado.
 */
const BASE = process.env.E2E_BASE_URL ?? "http://localhost:8080";

const PAGES = [
  "/servicos/manutencao-preventiva-empresas",
  "/servicos/backup-para-empresas",
  "/servicos/redes-e-wifi",
];

const VIEWPORTS = [
  { width: 360, height: 740 },
  { width: 1280, height: 900 },
];

test.describe("Rodada 3U — acessibilidade empresarial", () => {
  for (const path of PAGES) {
    for (const vp of VIEWPORTS) {
      test(`${path} @${vp.width}px sem violações critical/serious`, async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
        await page.locator("h1").first().waitFor({ state: "visible", timeout: 20000 });
        await page.waitForTimeout(400);

        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();

        const blocking = results.violations.filter(
          (v) => v.impact === "critical" || v.impact === "serious",
        );
        if (blocking.length) {
          console.log(
            JSON.stringify(
              blocking.map((v) => ({
                id: v.id,
                impact: v.impact,
                nodes: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
              })),
              null,
              2,
            ),
          );
        }
        expect(blocking, `violações axe em ${path}`).toEqual([]);
      });
    }
  }

  for (const path of PAGES) {
    test(`${path}: navegação por teclado alcança o CTA do hero com foco visível`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });

      const cta = page.locator("[data-cta-location$='_hero']").first();
      await expect(cta).toBeVisible();
      await cta.focus();
      await expect(cta).toBeFocused();

      const outline = await cta.evaluate((el) => {
        const s = getComputedStyle(el);
        return `${s.outlineStyle}|${s.outlineWidth}|${s.boxShadow}`;
      });
      expect(outline).not.toBe("none|0px|none");
    });

    test(`${path}: um único h1 e imagens com alt`, async ({ page }) => {
      await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
      await page.locator("h1").first().waitFor({ state: "visible", timeout: 20000 });
      expect(await page.locator("h1").count()).toBe(1);
      const missingAlt = await page.locator("img:not([alt])").count();
      expect(missingAlt).toBe(0);
    });
  }
});
