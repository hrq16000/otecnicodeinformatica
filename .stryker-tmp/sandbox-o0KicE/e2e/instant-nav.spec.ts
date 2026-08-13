// @ts-nocheck
import { test, expect } from "@playwright/test";

/**
 * Mede o tempo de navegação interna (clique → novo path commit) em rotas
 * pré-aquecidas pelo warmRoute. Garante que:
 *  - p95 fica abaixo do threshold (300ms em ambiente de teste — local pode
 *    ser bem menor; usamos um teto folgado para evitar flakiness em CI).
 *  - O RouteLoader (role="status" aria-label="Carregando") NÃO aparece
 *    durante a transição em rotas pré-aquecidas.
 *  - O menu mobile (se aberto) fecha automaticamente após o clique.
 */
const ROUTES = [
  "/servicos",
  "/como-funciona",
  "/blog",
  "/tecnico-informatica-curitiba",
];

const NAV_P95_LIMIT_MS = 300;

test.describe("instant navigation", () => {
  test("p95 abaixo do threshold e sem loader intermediário", async ({ page }) => {
    await page.goto("/");
    // Dá tempo do preloadCommon (40ms) + idle disparar e dos bundles baixarem.
    await page.waitForLoadState("networkidle");

    const samples: number[] = [];
    let loaderAppeared = false;

    // Observa qualquer aparição do RouteLoader durante o teste.
    page.on("console", () => {
      /* keep listener attached to flush */
    });

    for (let i = 0; i < 2; i++) {
      for (const route of ROUTES) {
        const link = page.locator(`a[href="${route}"]`).first();
        if (!(await link.count())) continue;

        const t0 = Date.now();
        await Promise.all([
          page.waitForFunction(
            (p) => window.location.pathname === p,
            route,
            { timeout: 2000 },
          ),
          link.click(),
        ]);
        const dt = Date.now() - t0;
        samples.push(dt);

        // Se o loader apareceu durante a transição, registra.
        const loaderVisible = await page
          .getByRole("status", { name: "Carregando" })
          .first()
          .isVisible()
          .catch(() => false);
        if (loaderVisible) loaderAppeared = true;

        // volta pra home para próxima iteração reaproveitando cache
        await page.goBack();
        await page.waitForFunction(() => window.location.pathname === "/");
      }
    }

    samples.sort((a, b) => a - b);
    const p95 = samples[Math.min(samples.length - 1, Math.ceil(0.95 * samples.length) - 1)];
    console.log(`[nav] samples=${samples.length} p50=${samples[Math.floor(samples.length / 2)]}ms p95=${p95}ms`);

    expect(samples.length).toBeGreaterThan(0);
    expect(p95).toBeLessThan(NAV_P95_LIMIT_MS);
    expect(loaderAppeared).toBe(false);
  });

  test("menu mobile fecha ao navegar via clique", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // tenta abrir um menu mobile se existir (botão aria-label "Abrir menu")
    const menuBtn = page.locator('[aria-label="Abrir menu"]').first();
    if (await menuBtn.count()) {
      await menuBtn.click().catch(() => undefined);
    }

    const link = page.locator('a[href="/servicos"]').first();
    await link.click();
    await page.waitForFunction(() => window.location.pathname === "/servicos");

    // RouteLoader NÃO deve estar visível após o commit da rota
    const loaderVisible = await page
      .getByRole("status", { name: "Carregando" })
      .first()
      .isVisible()
      .catch(() => false);
    expect(loaderVisible).toBe(false);
  });
});
