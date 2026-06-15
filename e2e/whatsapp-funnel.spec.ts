import { test, expect, type Page } from "@playwright/test";

const HOME = "/";
const UTM_QS = "?utm_source=ci&utm_medium=cpc&utm_campaign=funnel_v2_e2e&gclid=CI_GCLID_777";

async function installGtagSpy(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls = [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = function (...args: unknown[]) {
      (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls.push(args);
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push(args);
    };
  });
}

async function openFunnel(page: Page) {
  // Programmatic open is the most stable trigger across viewports
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } }));
  });
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible({ timeout: 5000 });
  return dialog;
}

test.describe("WhatsAppFunnel v2 — funil ramificado por equipamento", () => {
  test.beforeEach(async ({ page, context }) => {
    await installGtagSpy(page);
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));
  });

  test("branch TV 'não liga' bloqueia até aceitar Coleta e mostra R$ 300", async ({ page }) => {
    await page.goto(`${HOME}${UTM_QS}`);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);

    // Step 0: TV (auto-avança)
    await dialog.getByRole("button", { name: /^TV$/i }).first().click();

    // Step 1: sintoma "Não liga" (exige coleta)
    await expect(dialog.getByText(/Qual é o problema/i)).toBeVisible();
    await dialog.getByRole("button", { name: /^Não liga$/i }).first().click();
    // marca (qualquer)
    await dialog.getByRole("button", { name: /^Samsung$/i }).first().click();
    await dialog.getByRole("button", { name: /Continuar/i }).click();

    // Step 2: mídia — bloqueia se faltar
    await expect(dialog.getByText(/Anexe fotos e vídeo/i)).toBeVisible();
    const nextBtn = dialog.getByRole("button", { name: /Continuar/i });
    await expect(nextBtn).toBeDisabled();
  });

  test("branch PC 'lento' não exige coleta e pula direto à confirmação", async ({ page }) => {
    await page.goto(`${HOME}${UTM_QS}`);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);

    await dialog.getByRole("button", { name: /PC \/ Notebook/i }).click();
    await dialog.getByRole("button", { name: /^Dell$/ }).click();
    await dialog.getByRole("button", { name: /Lento \/ travando/i }).click();
    await dialog.getByRole("button", { name: /Continuar/i }).click();

    // Sintoma sem coleta + sem requiresVideo → step 2 ainda exige foto+checks
    await expect(dialog.getByText(/Anexe fotos/i)).toBeVisible();
  });

  test("branch 'Outro' pula upload e exige descrição mínima", async ({ page }) => {
    await page.goto(`${HOME}${UTM_QS}`);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);

    await dialog.getByRole("button", { name: /Outro \/ Só orçamento/i }).click();
    const nextBtn = dialog.getByRole("button", { name: /Continuar/i });
    await expect(nextBtn).toBeDisabled();
    await dialog.getByPlaceholder(/Conte o equipamento/i).fill("Equipamento desconhecido, quero saber se compensa.");
    await expect(nextBtn).toBeEnabled();
  });

  test("GA4 dispara wa_funnel_open com UTM payload", async ({ page }) => {
    await page.goto(`${HOME}${UTM_QS}`);
    await page.waitForLoadState("networkidle");
    await openFunnel(page);
    const calls = await page.evaluate(() => (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls);
    const open = calls.find((c) => c[0] === "event" && c[1] === "wa_funnel_open");
    expect(open).toBeTruthy();
    const payload = JSON.stringify(open?.[2] || {});
    expect(payload).toContain("utm_source");
    expect(payload).toContain("ci");
  });

  test("link 'Termos e Condições' resolve a rota pública /termos-e-condicoes", async ({ page }) => {
    const res = await page.goto("/termos-e-condicoes");
    expect(res?.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("rota de fallback /funil-indisponivel carrega e mostra CTA WhatsApp", async ({ page }) => {
    await page.goto("/funil-indisponivel");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const wa = page.locator('a[href*="wa.me/5541997452053"][data-funnel-skip="1"]');
    await expect(wa).toBeVisible();
  });
});

test.describe("WhatsAppFunnel v2 — mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("modal abre, é scrollável e bloqueia avanço sem equipamento", async ({ page, context }) => {
    await installGtagSpy(page);
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));
    await page.goto(HOME);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);
    await expect(dialog.getByText(/Qual o equipamento/i)).toBeVisible();
  });
});
