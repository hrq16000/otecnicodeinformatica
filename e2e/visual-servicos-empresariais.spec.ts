import { test, expect } from "@playwright/test";

/**
 * Regressão visual (screenshot diff) das páginas empresariais de backup e
 * redes/Wi-Fi. Garante que o layout do hero e o CTA da primeira dobra não
 * quebrem em mudanças futuras.
 *
 * Snapshots em e2e/visual-servicos-empresariais.spec.ts-snapshots/.
 * Para gerar/atualizar:
 *   npx playwright test e2e/visual-servicos-empresariais.spec.ts --update-snapshots
 */

const paginas = [
  { slug: "backup-para-empresas", nome: "backup-dados" },
  { slug: "redes-e-wifi", nome: "rede-wifi" },
];

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1366, height: 900 },
];

for (const pagina of paginas) {
  for (const vp of viewports) {
    test.describe(`visual ${pagina.nome} @ ${vp.name}`, () => {
      test.use({ viewport: { width: vp.width, height: vp.height } });

      test("primeira dobra estável e CTA visível", async ({ page }) => {
        await page.goto(`/servicos/${pagina.slug}`);
        await page.waitForLoadState("networkidle");

        const h1 = page.locator("h1").first();
        await expect(h1).toBeVisible();

        // CTA principal precisa estar acima da dobra (<= 750px).
        const cta = page
          .getByRole("link", { name: /whatsapp|falar|orçamento|diagn/i })
          .first();
        await expect(cta).toBeVisible();
        const box = await cta.boundingBox();
        expect(box?.y ?? 9999).toBeLessThan(750);

        await expect(page).toHaveScreenshot(`${pagina.nome}-${vp.name}.png`, {
          clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 800) },
          maxDiffPixelRatio: 0.02,
          animations: "disabled",
        });
      });
    });
  }
}
