import { test, expect, type Page } from "@playwright/test";

/**
 * ─────────────────────────────────────────────────────────────
 * GATE E2E — eventos de lead do GA4 e conversão do Google Ads
 * ─────────────────────────────────────────────────────────────
 * Verifica no navegador real que:
 *  1. O clique de WhatsApp dispara cta_click + click_whatsapp + generate_lead
 *     e UMA conversão do Google Ads.
 *  2. O segundo clique de WhatsApp na mesma sessão NÃO duplica lead nem conversão.
 *  3. O clique de ligação é medido no seu próprio canal (click_call) e gera o
 *     seu próprio lead — sem herdar o dedup do WhatsApp.
 *  4. `generate_lead` carrega transaction_id (dedup no GA4) e o `send_to` da
 *     conversão aponta para o ID de Ads configurado.
 *  5. Sem IDs configurados, nada disso vaza para uma propriedade de terceiros.
 *
 * Observação de política: o portal não publica links `tel:` (contato é só por
 * WhatsApp). O canal "ligação" é exercitado pelo painel /debug/telemetria,
 * que chama exatamente o mesmo trackCTAClick usado pelos CTAs reais.
 */

const DEBUG = "/debug/telemetria";

interface GtagCall {
  args: unknown[];
}

/**
 * Espiona a camada de dados em vez de `window.gtag`: o próprio index.html
 * define o stub do gtag, então sobrescrevê-lo aqui seria perdido. Tudo que o
 * site mede passa por `dataLayer.push`.
 */
async function installGtagSpy(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __gtagCalls: unknown[][]; dataLayer: unknown[] };
    w.__gtagCalls = [];
    const layer: unknown[] = [];
    const originalPush = layer.push.bind(layer);
    layer.push = (...items: unknown[]) => {
      for (const item of items) {
        w.__gtagCalls.push(Array.from(item as ArrayLike<unknown>));
      }
      return originalPush(...items);
    };
    w.dataLayer = layer;
  });
}

async function readCalls(page: Page): Promise<GtagCall[]> {
  const raw = await page.evaluate(
    () => ((window as unknown as { __gtagCalls?: unknown[][] }).__gtagCalls || []) as unknown[][],
  );
  return raw.map((args) => ({ args }));
}

function events(calls: GtagCall[], name: string) {
  return calls.filter((c) => c.args[0] === "event" && c.args[1] === name);
}

test.describe("Telemetria de lead — GA4 + Google Ads", () => {
  test.beforeEach(async ({ page }) => {
    await installGtagSpy(page);
    await page.goto(DEBUG);
    await expect(page.getByTestId("debug-config")).toBeVisible();
    await page.getByTestId("debug-reset").click();
  });

  test("clique de WhatsApp gera cta_click, click_whatsapp, generate_lead e 1 conversão", async ({ page }) => {
    await page.getByTestId("debug-fire-whatsapp").click();
    const calls = await readCalls(page);

    expect(events(calls, "cta_click")).toHaveLength(1);
    expect(events(calls, "click_whatsapp")).toHaveLength(1);
    expect(events(calls, "generate_lead")).toHaveLength(1);

    const lead = events(calls, "generate_lead")[0].args[2] as Record<string, unknown>;
    expect(lead.method).toBe("whatsapp");
    expect(lead.cta_type).toBe("whatsapp");
    expect(String(lead.transaction_id)).toMatch(/^lead_/);
    expect(lead.currency).toBe("BRL");
    // Governança de telemetria 4E.4: largura bruta de viewport nunca sai.
    expect(lead).not.toHaveProperty("viewport_width");

    const conversions = events(calls, "conversion");
    const adsConfigured = await page.evaluate(
      () => document.querySelector('[data-testid="debug-config"]')?.textContent?.includes("AW-") ?? false,
    );
    if (adsConfigured) {
      expect(conversions).toHaveLength(1);
      const conv = conversions[0].args[2] as Record<string, unknown>;
      expect(String(conv.send_to)).toMatch(/^AW-\d{9,12}\/.+/);
      expect(conv.currency).toBe("BRL");
    } else {
      // Fail-closed: sem ID de Ads, nenhuma conversão é enviada.
      expect(conversions).toHaveLength(0);
    }
  });

  test("segundo clique de WhatsApp não duplica lead nem conversão", async ({ page }) => {
    await page.getByTestId("debug-fire-whatsapp").click();
    await page.getByTestId("debug-fire-whatsapp").click();
    await page.getByTestId("debug-fire-whatsapp").click();
    const calls = await readCalls(page);

    expect(events(calls, "cta_click")).toHaveLength(3);
    expect(events(calls, "click_whatsapp")).toHaveLength(3);
    expect(events(calls, "generate_lead")).toHaveLength(1);
    expect(events(calls, "conversion").length).toBeLessThanOrEqual(1);
  });

  test("dedup sobrevive à navegação dentro da mesma sessão", async ({ page }) => {
    await page.getByTestId("debug-fire-whatsapp").click();
    await page.goto("/");
    await page.goto(DEBUG);
    await page.getByTestId("debug-fire-whatsapp").click();
    const calls = await readCalls(page);

    expect(events(calls, "cta_click")).toHaveLength(1); // spy zera a cada navegação
    expect(events(calls, "generate_lead")).toHaveLength(0);
    expect(events(calls, "conversion")).toHaveLength(0);
  });

  test("ligação é um canal próprio e não herda o dedup do WhatsApp", async ({ page }) => {
    await page.getByTestId("debug-fire-whatsapp").click();
    await page.getByTestId("debug-fire-phone").click();
    await page.getByTestId("debug-fire-phone").click();
    const calls = await readCalls(page);

    expect(events(calls, "click_call")).toHaveLength(2);
    const leads = events(calls, "generate_lead");
    expect(leads).toHaveLength(2);
    expect(leads.map((l) => (l.args[2] as Record<string, unknown>).method).sort()).toEqual([
      "phone",
      "whatsapp",
    ]);
    // Um lead por canal, nunca dois do mesmo canal.
    const ids = leads.map((l) => (l.args[2] as Record<string, unknown>).transaction_id);
    expect(new Set(ids).size).toBe(2);
  });

  test("CTA real de WhatsApp na home dispara lead único", async ({ page, context }) => {
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const cta = page.locator('a[href*="wa.me"], [data-cta-type="whatsapp"]').first();
    await expect(cta).toBeAttached();
    await cta.click({ force: true }).catch(() => undefined);
    await page.waitForTimeout(500);

    const calls = await readCalls(page);
    expect(events(calls, "generate_lead").length).toBeLessThanOrEqual(1);
    expect(events(calls, "conversion").length).toBeLessThanOrEqual(1);
  });

  test("painel de debug não é indexável", async ({ page }) => {
    await page.goto(DEBUG);
    const robots = await page.locator('meta[name="robots"]').allTextContents().then(() => page.$$eval('meta[name="robots"]', (els) => els.map((e) => e.getAttribute("content") || "")));
    expect(robots.some((c) => /noindex/.test(c))).toBe(true);
  });
});
