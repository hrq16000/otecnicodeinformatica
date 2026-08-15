import { test, expect } from "@playwright/test";

/**
 * /areas-atendidas — todos os links internos (cidades, regiões/bairros e
 * serviços core) precisam abrir sem 404 em mobile e desktop.
 * O teste é fail-closed: qualquer destino que renderize a página de erro
 * ou responda >=400 quebra o gate.
 */

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
] as const;

for (const vp of VIEWPORTS) {
  test.describe(`/areas-atendidas — ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("links de cidades, bairros e serviços não retornam 404", async ({ page }) => {
      await page.goto("/areas-atendidas");
      await page.waitForLoadState("networkidle");

      const hrefs = await page.locator('main a[href^="/"]').evaluateAll((nodes) =>
        Array.from(
          new Set(
            nodes
              .map((n) => (n as HTMLAnchorElement).getAttribute("href") || "")
              .filter((h) => h.startsWith("/") && !h.startsWith("//") && !h.startsWith("/#")),
          ),
        ),
      );

      expect(hrefs.length, "a página precisa expor links internos de SEO local").toBeGreaterThan(5);

      const broken: string[] = [];

      for (const href of hrefs) {
        const response = await page.goto(href, { waitUntil: "domcontentloaded" });
        const status = response?.status() ?? 0;
        const isSoft404 = await page
          .locator('[data-testid="not-found"], h1:has-text("404")')
          .count();

        if (status >= 400 || isSoft404 > 0) {
          broken.push(`${href} (status ${status}${isSoft404 ? ", soft-404" : ""})`);
        }
      }

      expect(broken, `links quebrados em /areas-atendidas: ${broken.join(", ")}`).toEqual([]);
    });
  });
}
