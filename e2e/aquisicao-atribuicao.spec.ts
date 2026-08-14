import { test, expect } from "@playwright/test";

/**
 * RODADA 8D — E2E DE ATRIBUIÇÃO DE AQUISIÇÃO
 *
 * Simula uma sessão externa (Google Business Profile) chegando à landing real
 * e valida a cadeia sem fabricar evento:
 *   1. first touch capturado na entrada (source/medium/campaign);
 *   2. navegação interna NÃO copia UTM para a URL (canonical limpa);
 *   3. first touch sobrevive à navegação;
 *   4. o link de WhatsApp carrega a atribuição da jornada + `text=` contextual;
 *   5. tráfego sem UTM não vira "google": permanece sem first touch externo.
 *
 * O teste roda contra fixtures locais e é excluído do baseline comercial
 * (utm_source=google/ci nunca é lido como aquisição no relatório).
 */

const GBP = "utm_source=google&utm_medium=organic_gbp&utm_campaign=gbp_perfil";
const KEY = "utm_payload_v1";

const lerUtms = (page: import("@playwright/test").Page) =>
  page.evaluate((k) => JSON.parse(sessionStorage.getItem(k) || "{}"), KEY);

test.describe("aquisição — GBP até WhatsApp", () => {
  test("first touch do GBP é capturado e preservado até o CTA de WhatsApp", async ({ page }) => {
    await page.goto(`/diagnostico-tecnico?${GBP}`, { waitUntil: "domcontentloaded" });

    const primeiro = await lerUtms(page);
    expect(primeiro.utm_source).toBe("google");
    expect(primeiro.utm_medium).toBe("organic_gbp");
    expect(primeiro.utm_campaign).toBe("gbp_perfil");

    // Navegação interna: nenhuma UTM pode ser propagada para a URL interna.
    const internos = page.locator('a[href^="/"]:visible');
    if (await internos.count()) {
      const href = await internos.first().getAttribute("href");
      expect(href).not.toContain("utm_");
      await internos.first().click();
      await page.waitForLoadState("domcontentloaded");
      expect(page.url()).not.toContain("utm_");
    }

    // First touch sobrevive à navegação interna (last touch pode mudar).
    const depois = await lerUtms(page);
    expect(depois.utm_source).toBe("google");
    expect(depois.utm_campaign).toBe("gbp_perfil");

    // CTA de WhatsApp: atribuição da jornada + mensagem contextual.
    const wa = page.locator('a[href*="wa.me"]').first();
    await expect(wa).toHaveCount(1);
    const waHref = (await wa.getAttribute("href")) || "";
    expect(waHref).toContain("wa.me/");
    expect(waHref).toContain("text=");
    expect(waHref).toContain("utm_source=google");
    // Nunca reclassificar CTA de aquisição como tráfego interno.
    expect(waHref).not.toContain("utm_source=site");
  });

  test("sessão sem UTM não recebe origem externa fabricada", async ({ page }) => {
    await page.goto("/diagnostico-tecnico", { waitUntil: "domcontentloaded" });
    const utms = await lerUtms(page);
    expect(utms.utm_source).toBeUndefined();

    const wa = page.locator('a[href*="wa.me"]').first();
    if (await wa.count()) {
      const href = (await wa.getAttribute("href")) || "";
      // CTA próprio é marcado como interno — nunca como organic/cpc.
      expect(href).not.toMatch(/utm_medium=(organic|cpc|paid)\b/);
    }
  });
});
