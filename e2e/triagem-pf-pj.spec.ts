import { test, expect, type Page } from "@playwright/test";

/**
 * Rodada 2 — Triagem PF × PJ.
 * Valida a bifurcação antes de abrir o WhatsApp, os eventos de analytics
 * com `customer_type` e a consistência dos schemas após navegação SPA.
 */

const HOME = "/";

async function installSpies(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls = [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = function (...args: unknown[]) {
      (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls.push(args);
    };
  });
}

async function openFunnel(page: Page) {
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } }));
  });
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible({ timeout: 5000 });
  return dialog;
}

function gtagEvents(page: Page) {
  return page.evaluate(() => (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls || []);
}

test.describe("Triagem PF × PJ", () => {
  test.beforeEach(async ({ page, context }) => {
    await installSpies(page);
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));
  });

  test("a primeira etapa pergunta PF × PJ antes de qualquer equipamento", async ({ page }) => {
    await page.goto(HOME);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);

    await expect(dialog.getByText(/Este atendimento é para quem/i)).toBeVisible();
    await expect(dialog.getByRole("radio", { name: /Para mim ou minha residência/i })).toBeVisible();
    await expect(dialog.getByRole("radio", { name: /Para uma empresa ou organização/i })).toBeVisible();
    // Sem vazamento do ramo PF antes da escolha.
    await expect(dialog.getByText(/Qual o equipamento/i)).toHaveCount(0);
  });

  test("ramo PF segue para equipamento e dispara wa_funnel_branch=residential", async ({ page }) => {
    await page.goto(HOME);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);

    await dialog.getByRole("radio", { name: /Para mim ou minha residência/i }).click();
    await expect(dialog.getByText(/Qual o equipamento/i)).toBeVisible({ timeout: 5000 });

    const events = await gtagEvents(page);
    const branch = events.find((c) => c[0] === "event" && c[1] === "wa_funnel_branch");
    expect(branch).toBeTruthy();
    expect((branch?.[2] as Record<string, unknown>)?.customer_type).toBe("residential");
  });

  test("ramo PJ mostra etapas empresariais e nunca a grade de equipamentos residenciais", async ({ page }) => {
    await page.goto(HOME);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);

    await dialog.getByRole("radio", { name: /Para uma empresa ou organização/i }).click();
    await expect(dialog.getByText(/Atendimento para empresa/i)).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByText(/Qual o equipamento/i)).toHaveCount(0);

    const events = await gtagEvents(page);
    const branch = events.find((c) => c[0] === "event" && c[1] === "wa_funnel_branch");
    expect((branch?.[2] as Record<string, unknown>)?.customer_type).toBe("business");

    // Eventos de etapa carregam o ramo automaticamente.
    const stepEvent = events.filter((c) => c[1] === "wa_funnel_step").pop();
    expect((stepEvent?.[2] as Record<string, unknown>)?.customer_type).toBe("business");
  });

  test("trocar de ramo limpa o estado do ramo anterior", async ({ page }) => {
    await page.goto(HOME);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);

    await dialog.getByRole("radio", { name: /Para mim ou minha residência/i }).click();
    await expect(dialog.getByText(/Qual o equipamento/i)).toBeVisible({ timeout: 5000 });
    await dialog.getByRole("button", { name: /^TV$/i }).first().click();
    await expect(dialog.getByText(/O que aconteceu/i)).toBeVisible({ timeout: 5000 });

    await dialog.getByRole("button", { name: /Voltar/i }).click();
    await dialog.getByRole("button", { name: /Voltar/i }).click();
    await dialog.getByRole("radio", { name: /Para uma empresa ou organização/i }).click();

    await expect(dialog.getByText(/Atendimento para empresa/i)).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByText(/O que aconteceu/i)).toHaveCount(0);
  });

  test("schemas permanecem únicos após navegação SPA com o funil aberto", async ({ page }) => {
    await page.goto(HOME);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);
    await dialog.getByRole("radio", { name: /Para uma empresa ou organização/i }).click();
    await expect(dialog.getByText(/Atendimento para empresa/i)).toBeVisible({ timeout: 5000 });

    await page.keyboard.press("Escape");
    await page.goto("/servicos");
    await page.waitForLoadState("networkidle");

    const keys = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')).map(
        (s) => s.dataset.schemaKey || "unkeyed",
      ),
    );
    expect(new Set(keys).size).toBe(keys.length);
  });
});
