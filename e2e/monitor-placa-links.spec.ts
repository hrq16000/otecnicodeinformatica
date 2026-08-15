import { test, expect } from "@playwright/test";

/**
 * Gate fail-closed: todos os links internos emitidos por
 * /servicos/conserto-monitor, /servicos/conserto-placa, /faq e pelas
 * variações de cidade e bairro precisam carregar sem 404 (hard ou soft)
 * em mobile e desktop.
 */

const SEED_PAGES = [
  "/servicos/conserto-monitor",
  "/servicos/conserto-placa",
  "/faq",
  // variações de cidade
  "/tecnico-informatica-curitiba",
  "/tecnico-informatica-sao-jose-pinhais",
  // variações de bairro
  "/bairros/batel",
  "/bairros/centro",
];

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
] as const;

for (const vp of VIEWPORTS) {
  test.describe(`links monitor/placa/FAQ — ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("nenhum link interno retorna 404", async ({ page }) => {
      const collected = new Set<string>();

      for (const seed of SEED_PAGES) {
        const seedResponse = await page.goto(seed, { waitUntil: "domcontentloaded" });
        expect(seedResponse?.status() ?? 0, `página semente indisponível: ${seed}`).toBeLessThan(400);
        await page.waitForLoadState("networkidle");

        const hrefs = await page.locator('main a[href^="/"]').evaluateAll((nodes) =>
          nodes
            .map((n) => (n as HTMLAnchorElement).getAttribute("href") || "")
            .filter((h) => h.startsWith("/") && !h.startsWith("//") && !h.startsWith("/#")),
        );

        collected.add(seed);
        hrefs.forEach((h) => collected.add(h.split("#")[0]));
      }

      expect(collected.size, "poucas rotas coletadas para o gate").toBeGreaterThan(10);

      const broken: string[] = [];

      for (const href of collected) {
        const response = await page.goto(href, { waitUntil: "domcontentloaded" });
        const status = response?.status() ?? 0;
        const softNotFound = await page
          .locator('[data-testid="not-found"], h1:has-text("404")')
          .count();

        if (status >= 400 || softNotFound > 0) {
          broken.push(`${href} (status ${status}${softNotFound ? ", soft-404" : ""})`);
        }
      }

      expect(broken, `links quebrados: ${broken.join(", ")}`).toEqual([]);
    });
  });
}
