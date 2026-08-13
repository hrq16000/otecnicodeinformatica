// @ts-nocheck
import { test, expect, type Page } from "@playwright/test";

/**
 * /patrocinadores (301 → /anuncie) — metadados sociais e download do mídia kit.
 * Roda em mobile e desktop porque o CTA de download muda de coluna para linha,
 * e o alvo de toque precisa continuar acessível nos dois recortes.
 */

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
] as const;

const metaContent = (page: Page, selector: string) =>
  page.locator(selector).first().getAttribute("content");

for (const vp of VIEWPORTS) {
  test.describe(`/patrocinadores — ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("redireciona para /anuncie e emite og:image/twitter:image absolutos", async ({ page }) => {
      await page.goto("/patrocinadores");
      await page.waitForLoadState("networkidle");

      // A rota legada precisa terminar na página comercial canônica.
      await expect(page).toHaveURL(/\/anuncie$/);

      const canonical = await page.locator('link[rel="canonical"]').first().getAttribute("href");
      expect(canonical).toContain("/anuncie");

      const ogImage = await metaContent(page, 'meta[property="og:image"]');
      const twitterImage = await metaContent(page, 'meta[name="twitter:image"]');

      for (const img of [ogImage, twitterImage]) {
        expect(img, "og:image/twitter:image devem existir").toBeTruthy();
        expect(img!, "crawler social exige URL absoluta https").toMatch(/^https:\/\//);
      }

      // A imagem precisa responder de verdade — evita 404 silencioso no preview.
      const imgPath = new URL(ogImage!).pathname;
      const imgResponse = await page.request.get(imgPath);
      expect(imgResponse.status(), `og:image ${imgPath} deve responder 200`).toBe(200);
      expect(imgResponse.headers()["content-type"] || "").toContain("image");
    });

    test("link do mídia kit em PDF baixa um arquivo válido", async ({ page }) => {
      await page.goto("/anuncie");
      await page.waitForLoadState("networkidle");

      const link = page.locator('a[data-cta-location="anuncie_midia_kit_pdf"]');
      await expect(link).toHaveCount(1);
      await expect(link).toBeVisible();

      const href = await link.getAttribute("href");
      expect(href).toBe("/midia-kit-tecnico-curitiba.pdf");

      // Alvo de toque confortável nos dois recortes.
      const box = await link.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);

      const pdf = await page.request.get(href!);
      expect(pdf.status()).toBe(200);
      expect(pdf.headers()["content-type"] || "").toContain("pdf");
      const body = await pdf.body();
      expect(body.subarray(0, 5).toString("latin1")).toBe("%PDF-");
      expect(body.byteLength).toBeGreaterThan(5000);
    });

    test("rodapé expõe o mídia kit com rastreio próprio", async ({ page }) => {
      await page.goto("/anuncie");
      await page.waitForLoadState("networkidle");

      const footerLink = page.locator('a[data-cta-location="footer_midia_kit_pdf"]');
      await expect(footerLink).toHaveCount(1);
      await expect(footerLink).toHaveAttribute("href", "/midia-kit-tecnico-curitiba.pdf");
      // Rótulo distinto do CTA principal — permite comparar desempenho no GA4.
      const main = page.locator('a[data-cta-location="anuncie_midia_kit_pdf"]');
      expect(await main.getAttribute("data-cta-location")).not.toBe(
        await footerLink.getAttribute("data-cta-location"),
      );
    });
  });
}
