import { test, expect } from "@playwright/test";

/**
 * RODADA 8F — PRESERVAÇÃO DO FIRST TOUCH NO CLUSTER EDITORIAL
 *
 * O risco real: a pessoa entra por um post do GBP num guia do cluster,
 * navega até o serviço e converte lá. Se a atribuição for reescrita no
 * caminho, o guia parece inútil — e a decisão seguinte seria cortar
 * justamente o conteúdo que trouxe a sessão.
 *
 * Duas fontes reais são verificadas:
 *   • `touch_first_v1` — rota de entrada (contrato de analytics).
 *   • `utm_payload_v1` — UTMs do primeiro hit (primeiro hit ganha).
 */

const ENTRADA =
  "/blog/quanto-custa-formatar-um-computador?utm_source=google&utm_medium=organic_gbp&utm_campaign=gbp_post&utm_content=custo-formatacao";

const lerAtribuicao = (page: import("@playwright/test").Page) =>
  page.evaluate(() => {
    const parse = (k: string) => {
      try {
        const raw = sessionStorage.getItem(k);
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    };
    return { first: parse("touch_first_v1"), last: parse("touch_last_v1"), utm: parse("utm_payload_v1") };
  });

test.describe("First touch do cluster de formatação", () => {
  test("entrada por GBP no guia sobrevive à navegação até o serviço", async ({ page }) => {
    await page.goto(ENTRADA);
    await page.waitForLoadState("networkidle");

    const inicio = await lerAtribuicao(page);
    expect(inicio.first, "first touch precisa ser gravado na entrada").toBeTruthy();
    expect(inicio.first.landing_route).toBe("/blog/quanto-custa-formatar-um-computador");
    expect(inicio.utm?.utm_medium).toBe("organic_gbp");
    expect(inicio.utm?.utm_content).toBe("custo-formatacao");

    await page.goto("/servicos/formatacao");
    await page.waitForLoadState("networkidle");

    const depois = await lerAtribuicao(page);
    expect(depois.first?.landing_route, "first touch não pode ser reescrito").toBe(
      "/blog/quanto-custa-formatar-um-computador",
    );
    expect(depois.utm?.utm_medium, "UTM do primeiro hit deve permanecer").toBe("organic_gbp");
    expect(depois.last?.landing_route, "last touch acompanha a rota atual").toBe("/servicos/formatacao");
  });

  test("navegação interna não inventa uma nova origem", async ({ page }) => {
    await page.goto(ENTRADA);
    await page.waitForLoadState("networkidle");
    await page.goto("/problemas/computador-lento");
    await page.waitForLoadState("networkidle");

    const { first, utm } = await lerAtribuicao(page);
    expect(first?.landing_route).not.toBe("/problemas/computador-lento");
    expect(utm?.utm_source).toBe("google");
  });

  test("CTA de WhatsApp do serviço mantém número canônico e mensagem contextual", async ({ page }) => {
    await page.goto(ENTRADA);
    await page.waitForLoadState("networkidle");
    await page.goto("/servicos/formatacao");
    await page.waitForLoadState("networkidle");

    const hrefs = await page
      .locator('a[href*="wa.me"]')
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));

    expect(hrefs.length, "a página de serviço precisa ter CTA de WhatsApp").toBeGreaterThan(0);
    for (const h of hrefs) {
      expect(h).toContain("5541997086380");
      expect(h).toContain("text=");
    }
  });
});
