import { test, expect } from "@playwright/test";

/**
 * RODADA 8F — PRESERVAÇÃO DO FIRST TOUCH NO CLUSTER EDITORIAL
 *
 * O risco real: a pessoa entra por um post do GBP num guia
 * informacional, navega até o serviço e converte lá. Se a atribuição
 * for reescrita no caminho, o guia parece inútil e a decisão seguinte
 * é errada — cortar justamente o conteúdo que trouxe a sessão.
 *
 * Este teste percorre a jornada real e exige que o first touch
 * continue apontando para a entrada, mesmo com a conversão em outra
 * rota.
 */

const ENTRADA =
  "/blog/quanto-custa-formatar-um-computador?utm_source=google&utm_medium=organic_gbp&utm_campaign=gbp_post&utm_content=custo-formatacao";

test.describe("First touch do cluster de formatação", () => {
  test("entrada por GBP no guia é preservada até a conversão em outra rota", async ({ page }) => {
    await page.goto(ENTRADA);
    await page.waitForLoadState("networkidle");

    const first = await page.evaluate(() => {
      const bruto = sessionStorage.getItem("touch_first_v1") ?? localStorage.getItem("touch_first_v1");
      return bruto ? JSON.parse(bruto) : null;
    });

    expect(first, "first touch precisa ser gravado na entrada").toBeTruthy();
    expect(first.landing_route ?? first.route).toContain("/blog/quanto-custa-formatar-um-computador");
    expect(JSON.stringify(first)).toContain("organic_gbp");

    // Navega para o serviço — segunda rota da mesma sessão.
    await page.goto("/servicos/formatacao");
    await page.waitForLoadState("networkidle");

    const depois = await page.evaluate(() => {
      const bruto = sessionStorage.getItem("touch_first_v1") ?? localStorage.getItem("touch_first_v1");
      return bruto ? JSON.parse(bruto) : null;
    });

    expect(depois, "first touch não pode sumir na navegação interna").toBeTruthy();
    expect(depois.landing_route ?? depois.route).toContain("/blog/quanto-custa-formatar-um-computador");
    expect(JSON.stringify(depois)).toContain("organic_gbp");
  });

  test("navegação interna não cria uma nova origem orgânica falsa", async ({ page }) => {
    await page.goto(ENTRADA);
    await page.waitForLoadState("networkidle");
    await page.goto("/problemas/computador-lento");
    await page.waitForLoadState("networkidle");

    const first = await page.evaluate(() => {
      const bruto = sessionStorage.getItem("touch_first_v1") ?? localStorage.getItem("touch_first_v1");
      return bruto ? JSON.parse(bruto) : null;
    });

    expect(JSON.stringify(first)).not.toContain("/problemas/computador-lento");
  });

  test("CTA de WhatsApp no serviço carrega a mensagem contextual", async ({ page }) => {
    await page.goto(ENTRADA);
    await page.waitForLoadState("networkidle");
    await page.goto("/servicos/formatacao");
    await page.waitForLoadState("networkidle");

    const hrefs = await page.locator('a[href*="wa.me"]').evaluateAll((as) =>
      as.map((a) => (a as HTMLAnchorElement).href),
    );
    expect(hrefs.length, "a página de serviço precisa ter CTA de WhatsApp").toBeGreaterThan(0);
    for (const h of hrefs) {
      expect(h).toContain("5541997086380");
      expect(h).toContain("text=");
    }
  });
});
