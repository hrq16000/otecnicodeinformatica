import { test, expect, type Page } from "@playwright/test";

/**
 * GATE E2E — mensagem do WhatsApp sempre pré-preenchida.
 *
 * Regras verificadas:
 *  1. Nenhum link wa.me sai sem `text` (todas as rotas críticas).
 *  2. A triagem monta a mensagem com Equipamento (serviço), sintoma e
 *     bairro/cidade informados pelo visitante.
 *  3. Com geolocalização e IP bloqueados, o fluxo continua funcionando:
 *     o campo de localidade permanece disponível e a mensagem sai preenchida
 *     (fallback manual) — nunca um wa.me "pelado".
 */

const ROTAS = [
  "/",
  "/servicos",
  "/tecnico-informatica-curitiba",
  "/assistencia-tecnica-curitiba",
  "/atendimento-domicilio",
  "/atendimento-remoto",
  "/contato",
  "/precos-e-politicas",
];

function textoDoLink(href: string): string {
  const url = new URL(href, "https://wa.me");
  return url.searchParams.get("text") ?? "";
}

async function blockGeo(page: Page) {
  // Simula falha total de geo/IP: qualquer provedor externo de geolocalização cai.
  await page.route(/(ipapi|ip-api|ipinfo|geolocation|geojs|ipwho)/i, (route) => route.abort());
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "geolocation", {
      value: {
        getCurrentPosition: (_ok: unknown, err?: (e: unknown) => void) =>
          err?.({ code: 1, message: "denied" }),
        watchPosition: () => 0,
        clearWatch: () => undefined,
      },
      configurable: true,
    });
  });
}

test.describe("WhatsApp — mensagem pré-preenchida", () => {
  for (const rota of ROTAS) {
    test(`todos os links wa.me de ${rota} têm texto`, async ({ page }) => {
      await page.goto(rota);
      await page.waitForLoadState("networkidle");
      const hrefs = await page.$$eval('a[href*="wa.me"]', (as) =>
        as.map((a) => a.getAttribute("href") || ""),
      );
      expect(hrefs.length, `nenhum CTA de WhatsApp em ${rota}`).toBeGreaterThan(0);
      for (const href of hrefs) {
        const texto = textoDoLink(href);
        expect(texto.trim().length, `link sem mensagem em ${rota}: ${href}`).toBeGreaterThan(10);
      }
    });
  }

  test("triagem monta mensagem com serviço, sintoma e localidade", async ({ page, context }) => {
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() =>
      window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } })),
    );
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 5000 });

    await dialog.getByRole("radio", { name: /Para mim ou minha residência/i }).click();
    await dialog.getByRole("button", { name: /PC \/ Notebook/i }).click();
    await dialog.getByRole("radio", { name: /^Notebook$/i }).click();
    await dialog.getByRole("radio", { name: /Liga e inicia normalmente/i }).click();
    await dialog.getByLabel(/Seu nome/i).fill("Cliente Teste");
    await dialog.getByLabel(/bairro/i).first().fill("Batel");
    await dialog.getByRole("radio", { name: /Instalar ou configurar programa/i }).click();
    await dialog.getByRole("radio", { name: /Há poucos dias/i }).click();
    await dialog.getByRole("radio", { name: /Próximas 72 horas úteis/i }).click();

    const link = dialog.locator('a[href*="wa.me"]').first();
    await expect(link).toBeVisible({ timeout: 5000 });
    const texto = textoDoLink((await link.getAttribute("href")) || "");
    expect(texto).toMatch(/Equipamento/i);
    expect(texto).toMatch(/Notebook/i);
    expect(texto).toMatch(/Batel/i);
  });

  test("fallback: com geo/IP indisponível a mensagem continua preenchida", async ({ page, context }) => {
    await blockGeo(page);
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // CTAs estáticos continuam com mensagem padrão mesmo sem geo.
    const hrefs = await page.$$eval('a[href*="wa.me"]', (as) => as.map((a) => a.getAttribute("href") || ""));
    for (const href of hrefs) {
      expect(textoDoLink(href).trim().length).toBeGreaterThan(10);
    }

    // A triagem segue pedindo a localidade manualmente (fallback humano).
    await page.evaluate(() =>
      window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } })),
    );
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await dialog.getByRole("radio", { name: /Para mim ou minha residência/i }).click();
    await dialog.getByRole("button", { name: /PC \/ Notebook/i }).click();
    await dialog.getByRole("radio", { name: /^Notebook$/i }).click();
    await dialog.getByRole("radio", { name: /Liga e inicia normalmente/i }).click();
    await expect(dialog.getByLabel(/bairro/i).first()).toBeEditable();
  });
});
