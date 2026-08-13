// @ts-nocheck
import { test, expect } from "@playwright/test";

/**
 * Rodada 2A — comportamento da rota inexistente no SPA.
 * O status HTTP é coberto pelo gate `npm run check:soft404`; aqui validamos
 * a experiência renderizada: 404 própria, noindex e ausência de canonical.
 */
test.describe("404 do SPA", () => {
  test("rota inexistente renderiza a 404 própria com noindex e sem canonical", async ({ page }) => {
    await page.goto("/rota-que-nao-existe-2a");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Página não encontrada");
    await expect(page).toHaveTitle(/Página não encontrada/);

    const robots = await page.locator('head meta[name="robots"]').getAttribute("content");
    expect(robots).toMatch(/noindex/);
    expect(robots).toMatch(/nofollow/);

    expect(await page.locator('head link[rel="canonical"]').count()).toBe(0);
    expect(await page.locator('head script[type="application/ld+json"]').count()).toBe(0);

    // Sem oferta comercial nem link wa.me direto.
    const body = (await page.locator("main").innerText()).toLowerCase();
    expect(body).not.toContain("r$");
    expect(await page.locator('a[href*="wa.me"]').count()).toBe(0);

    await expect(page.getByRole("link", { name: /página inicial/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /serviços disponíveis/i })).toBeVisible();
  });

  const INVALID_VARIANTS = [
    "/rota-que-nao-existe-2a?utm_source=google&utm_medium=cpc",
    "/marcas/marca-inexistente-xyz",
    "/problemas/problema-inexistente-xyz?gclid=abc",
    "/procedimentos/procedimento-inexistente-xyz",
    "/servicos/formatacao/bairro-inexistente-xyz?page=2",
    "/blog/post-que-nao-existe-2026?fbclid=xyz",
  ];

  for (const url of INVALID_VARIANTS) {
    test(`slug/query inválidos renderizam a 404: ${url}`, async ({ page }) => {
      await page.goto(url);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Página não encontrada");
      const robots = await page.locator('head meta[name="robots"]').getAttribute("content");
      expect(robots).toMatch(/noindex/);
      expect(await page.locator('head link[rel="canonical"]').count()).toBe(0);
    });
  }

  test("rota válida com query string de campanha continua indexável", async ({ page }) => {
    await page.goto("/servicos?utm_source=google&utm_medium=cpc&page=2");
    const robots = await page.locator('head meta[name="robots"]').getAttribute("content");
    expect(robots).toMatch(/^index/);
  });

  test("rota válida continua renderizando conteúdo indexável", async ({ page }) => {
    await page.goto("/servicos");
    const robots = await page.locator('head meta[name="robots"]').getAttribute("content");
    expect(robots).toMatch(/^index/);
    expect(await page.locator('head link[rel="canonical"]').count()).toBeGreaterThan(0);
  });
});
