import { test, expect } from "@playwright/test";

/**
 * Confirma que numa página de bairro (Wi-Fi/Batel):
 *  1. O clique em "Agendar no Batel" dispara `wa_click` em `window.__waFunnelEvents`.
 *  2. O modal do funil abre e emite `wa_funnel_modal_open` + `wa_funnel_modal_impression`.
 */

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:4173";

const ROTAS = [
  { path: "/servicos/redes-wifi/batel", ctaText: /Agendar no Batel|Chamar Técnico no Batel/i, expectedLocation: "redes-wifi-batel" },
  { path: "/servicos/manutencao-tv/centro", ctaText: /Agendar no Centro|Chamar Técnico no Centro/i, expectedLocation: "manutencao-tv-centro" },
];

for (const rota of ROTAS) {
  test(`analytics do modal em ${rota.path}`, async ({ page }) => {
    await page.goto(`${BASE}${rota.path}`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => Array.isArray((window as any).__waFunnelEvents));

    // Clica no primeiro CTA visível de "Agendar/Chamar"
    const cta = page.getByRole("button", { name: rota.ctaText }).first();
    await expect(cta).toBeVisible();
    await cta.click();

    // Espera o modal renderizar (dialog do funil V5)
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 5000 });

    // Coleta eventos disparados
    const events = await page.evaluate(() => (window as any).__waFunnelEvents as Array<{ name: string; payload: Record<string, unknown> }>);
    const names = events.map(e => e.name);

    expect(names).toContain("wa_click");
    expect(names).toContain("wa_funnel_modal_open");
    expect(names).toContain("wa_funnel_modal_impression");

    const wa = events.find(e => e.name === "wa_click");
    expect(wa?.payload.cta_location).toBe(rota.expectedLocation);
  });
}
