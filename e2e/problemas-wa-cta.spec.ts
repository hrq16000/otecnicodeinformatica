import { test, expect, type Page } from "@playwright/test";

/**
 * GATE E2E — CTAs de WhatsApp do cluster /problemas.
 *
 * Valida, com cliques reais (sem sair do navegador, o wa.me é interceptado):
 *  1. todo link wa.me carrega text + utm_source/medium/campaign/content/term,
 *     rota, sintoma, seção e variante;
 *  2. a seção do link bate com a seção da página (topo, faq-N…);
 *  3. a faixa de rolagem acompanha a leitura;
 *  4. a variante do A/B (msg_a/msg_b) permanece a MESMA entre o hub e as
 *     páginas de sintoma, no mesmo dispositivo.
 */

const SINTOMA = "/problemas/tela-azul";
const SLUG = "tela-azul";
/** Só os CTAs do cluster (têm `sintoma=`); CTAs globais do header/float ficam fora. */
const SEL_CTA = 'a[href*="sintoma="]';

async function bloquearWa(page: Page) {
  await page.route(/(wa\.me|api\.whatsapp\.com)/, (route) =>
    route.fulfill({ status: 204, body: "" }),
  );
}

function params(href: string) {
  return new URL(href, "https://wa.me").searchParams;
}

test.describe("/problemas — links de WhatsApp com atribuição completa", () => {
  test("todo CTA carrega UTM, rota, sintoma, seção e variante", async ({ page }) => {
    await bloquearWa(page);
    await page.goto(SINTOMA);
    await page.waitForLoadState("networkidle");

    const hrefs = await page.$$eval(SEL_CTA, (as) => as.map((a) => a.getAttribute("href") || ""));
    expect(hrefs.length).toBeGreaterThan(0);

    for (const href of hrefs) {
      const p = params(href);
      expect(p.get("text")?.length ?? 0, `sem mensagem: ${href}`).toBeGreaterThan(10);
      expect(p.get("utm_source")).toBeTruthy();
      expect(p.get("utm_medium")).toBe("cta_problema");
      expect(p.get("utm_campaign")).toBe(SLUG);
      expect(p.get("utm_content")).toMatch(/^problemas_/);
      expect(p.get("utm_term")).toMatch(/^msg_(a|b)$/);
      expect(p.get("rota")).toBe(SINTOMA);
      expect(p.get("sintoma")).toBe(SLUG);
      expect(p.get("secao")).toBeTruthy();
      expect(p.get("variante")).toMatch(/^(a|b)$/);
      expect(Number(p.get("rolagem"))).toBeGreaterThanOrEqual(0);
    }
  });

  test("a triagem entra na mensagem e a seção/rolagem acompanham o clique", async ({ page }) => {
    await bloquearWa(page);
    await page.goto(SINTOMA);
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: /^Notebook$/ }).first().click();
    const bairro = page.getByLabel(/bairro/i).first();
    if (await bairro.count()) await bairro.fill("Batel");

    // Rola até a FAQ para mudar a faixa de rolagem.
    const faq = page.locator("#faq-1");
    await faq.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const link = faq.locator(SEL_CTA).first();
    const p = params((await link.getAttribute("href")) || "");
    expect(p.get("secao")).toBe("faq-1");
    expect(p.get("dispositivo")).toBe("notebook");
    expect(p.get("text") || "").toContain("Notebook");
    expect(Number(p.get("rolagem"))).toBeGreaterThan(0);

    // Clique real: o handler registra o evento e o wa.me é interceptado.
    await link.click({ modifiers: [] }).catch(() => undefined);
  });

  test("a variante do A/B é a mesma no hub e na página de sintoma", async ({ page }) => {
    await bloquearWa(page);
    await page.goto("/problemas");
    await page.waitForLoadState("networkidle");
    const hubHref = (await page.locator(SEL_CTA).first().getAttribute("href")) || "";
    const varianteHub = params(hubHref).get("variante");
    expect(varianteHub).toMatch(/^(a|b)$/);

    await page.goto(SINTOMA);
    await page.waitForLoadState("networkidle");
    const pageHref = (await page.locator(SEL_CTA).first().getAttribute("href")) || "";
    expect(params(pageHref).get("variante")).toBe(varianteHub);

    // Persistência por dispositivo: sobrevive a um reload completo.
    await page.reload();
    await page.waitForLoadState("networkidle");
    const depois = (await page.locator(SEL_CTA).first().getAttribute("href")) || "";
    expect(params(depois).get("variante")).toBe(varianteHub);
  });
});
