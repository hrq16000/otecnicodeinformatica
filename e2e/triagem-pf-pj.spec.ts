import { test, expect, type Page } from "@playwright/test";

/**
 * Rodada 2 — Triagem PF × PJ.
 * Valida a bifurcação antes de abrir o WhatsApp, os eventos de analytics
 * com `customer_type` e a consistência dos schemas após navegação SPA.
 */

const HOME = "/";

/**
 * O `index.html` cria seu próprio `window.gtag` (que empurra para `dataLayer`),
 * sobrescrevendo qualquer stub anterior. Por isso o espião intercepta o
 * `dataLayer.push` — assim capturamos os eventos GA4 reais do app.
 */
async function installSpies(page: Page) {
  await page.addInitScript(() => {
    const calls: unknown[][] = [];
    (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls = calls;
    const layer: unknown[] = [];
    const nativePush = layer.push.bind(layer);
    (layer as unknown as { push: (...a: unknown[]) => number }).push = (...args: unknown[]) => {
      for (const entry of args) {
        calls.push(Array.from(entry as ArrayLike<unknown>));
      }
      return nativePush(...(args as never[]));
    };
    (window as unknown as { dataLayer: unknown[] }).dataLayer = layer;
  });
}


/** Modal da triagem — nome acessível próprio, para não colidir com o banner de cookies (também role=dialog). */
function funnelDialog(page: Page) {
  return page.getByRole("dialog", { name: /Triagem antes do atendimento/i });
}

async function openFunnel(page: Page) {
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } }));
  });
  const dialog = funnelDialog(page);
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

/**
 * Rodada 2.1 — hardening: troca de ramo, persistência, duplo clique e mobile.
 */
test.describe("Triagem PF × PJ — hardening (2.1)", () => {
  test.beforeEach(async ({ page, context }) => {
    await installSpies(page);
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));
  });

  test("PJ → PF descarta campos empresariais do estado persistido", async ({ page }) => {
    await page.goto(HOME);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);

    await dialog.getByRole("radio", { name: /Para uma empresa ou organização/i }).click();
    await expect(dialog.getByText(/Atendimento para empresa/i)).toBeVisible({ timeout: 5000 });
    await dialog.getByRole("button", { name: /Voltar/i }).click();
    await dialog.getByRole("radio", { name: /Para mim ou minha residência/i }).click();
    await expect(dialog.getByText(/Qual o equipamento/i)).toBeVisible({ timeout: 5000 });

    const persisted = await page.evaluate(() => {
      const raw = sessionStorage.getItem("triage_state_6.0");
      return raw ? JSON.parse(raw) : null;
    });
    expect(persisted?.answers?.customerType).toBe("residential");
    expect(Object.keys(persisted?.answers?.business ?? {})).toHaveLength(0);
  });

  test("estado do ramo sobrevive ao reload da página", async ({ page }) => {
    await page.goto(HOME);
    await page.waitForLoadState("networkidle");
    let dialog = await openFunnel(page);
    await dialog.getByRole("radio", { name: /Para uma empresa ou organização/i }).click();
    await expect(dialog.getByText(/Atendimento para empresa/i)).toBeVisible({ timeout: 5000 });

    await page.reload();
    await page.waitForLoadState("networkidle");
    dialog = await openFunnel(page);
    await expect(dialog.getByText(/Atendimento para empresa/i)).toBeVisible({ timeout: 5000 });
  });

  test("sessão antiga (v5) é migrada para PF sem travar o funil", async ({ page }) => {
    await page.goto(HOME);
    await page.evaluate(() => {
      sessionStorage.clear();
      sessionStorage.setItem(
        "triage_state_5.0",
        JSON.stringify({
          version: "5.0",
          answers: { equipment: "tv", symptom: "nao-liga", fields: { nome: "Ana", bairro: "Batel, Curitiba" } },
        }),
      );
    });
    await page.reload();
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);
    await expect(dialog).toBeVisible();
    const migrated = await page.evaluate(() => {
      const raw = sessionStorage.getItem("triage_state_6.0");
      return raw ? JSON.parse(raw) : null;
    });
    expect(migrated?.answers?.customerType).toBe("residential");
    expect(await page.evaluate(() => sessionStorage.getItem("triage_state_5.0"))).toBeNull();
  });

  test("duplo clique na escolha do ramo não duplica o evento de bifurcação", async ({ page }) => {
    await page.goto(HOME);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);
    const opt = dialog.getByRole("radio", { name: /Para uma empresa ou organização/i });
    await opt.dblclick();
    await expect(dialog.getByText(/Atendimento para empresa/i)).toBeVisible({ timeout: 5000 });
    const events = await gtagEvents(page);
    const branches = events.filter((c) => c[1] === "wa_funnel_branch");
    expect(branches.length).toBeLessThanOrEqual(1);
  });

  test("mobile 320px: escolha PF/PJ visível e sem rolagem horizontal", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(HOME);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);
    await expect(dialog.getByRole("radio", { name: /Para mim ou minha residência/i })).toBeVisible();
    await expect(dialog.getByRole("radio", { name: /Para uma empresa ou organização/i })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });
});
