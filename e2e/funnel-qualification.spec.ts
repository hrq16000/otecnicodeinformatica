import { test, expect, type Page } from "@playwright/test";

/**
 * Valida a etapa curta de qualificação (nome, bairro, urgência e sintoma):
 *  - os campos vão para o analytics (GA4 / buffer de observabilidade Sentry)
 *  - a URL de origem acompanha o evento e a mensagem
 *  - a abertura do WhatsApp carrega cat / sym / cidade-bairro na mensagem
 */

const HOME = "/";
const UTM_QS = "?utm_source=ci&utm_medium=cpc&utm_campaign=qualification_e2e";

interface AppError { message?: string; context?: Record<string, unknown> }

async function installSpies(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as {
      __gtagCalls: unknown[][];
      __appErrors: AppError[];
      __waOpened: string[];
      dataLayer: unknown[];
      gtag: (...a: unknown[]) => void;
    };
    w.__gtagCalls = [];
    w.__appErrors = [];
    w.__waOpened = [];
    w.dataLayer = [];
    w.gtag = (...args: unknown[]) => {
      w.__gtagCalls.push(args);
      w.dataLayer.push(args);
    };
    // Buffer de observabilidade consumido pelo Sentry quando habilitado.
    window.addEventListener("app:funnel-qualification", (e) => {
      w.__appErrors.push((e as CustomEvent).detail);
    });
    const nativeOpen = window.open.bind(window);
    window.open = ((url?: string | URL, ...rest: unknown[]) => {
      if (url) w.__waOpened.push(String(url));
      return nativeOpen("about:blank", ...(rest as [string?, string?]));
    }) as typeof window.open;
  });
}

async function openFunnel(page: Page) {
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } }));
  });
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible({ timeout: 8000 });
  return dialog;
}

test.describe("Qualificação curta antes do WhatsApp", () => {
  test.beforeEach(async ({ page, context }) => {
    await installSpies(page);
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));
  });

  test("nome, bairro, urgência e sintoma vão para analytics e para a mensagem", async ({ page }) => {
    await page.goto(`${HOME}${UTM_QS}`);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);

    // Triagem: PC/Notebook → notebook → liga → instalar programa (rota remota)
    await dialog.getByRole("button", { name: /PC \/ Notebook/i }).click();
    await dialog.getByRole("radio", { name: /^Notebook$/i }).click();
    await dialog.getByRole("radio", { name: /Liga e inicia normalmente/i }).click();
    await dialog.getByRole("radio", { name: /Instalar ou configurar programa/i }).click();
    await dialog.getByRole("radio", { name: /Há poucos dias/i }).click();
    await dialog.getByRole("radio", { name: /Próximas 72 horas úteis/i }).click();

    // Etapa de qualificação: os dois campos são obrigatórios.
    const nome = dialog.getByLabel(/Seu nome/i);
    const bairro = dialog.getByLabel(/Bairro e cidade/i);
    await expect(nome).toBeVisible({ timeout: 8000 });
    await expect(bairro).toBeVisible();
    await nome.fill("Cliente Teste");
    await bairro.fill("Batel, Curitiba");

    // Aceita as condições apresentadas.
    const checks = dialog.getByRole("checkbox");
    const total = await checks.count();
    for (let i = 0; i < total; i++) {
      const box = checks.nth(i);
      if (await box.isVisible()) await box.check({ force: true });
    }

    await dialog.getByRole("button", { name: /Agendar agora|Abrir WhatsApp|Enviar/i }).first().click();

    // 1) Analytics recebeu a qualificação com URL de origem
    await expect
      .poll(async () =>
        page.evaluate(() => {
          const calls = (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls;
          return calls.some((c) => c[1] === "wa_funnel_qualification");
        }),
      )
      .toBe(true);

    const qual = await page.evaluate(() => {
      const calls = (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls;
      const hit = calls.find((c) => c[1] === "wa_funnel_qualification");
      return (hit?.[2] ?? null) as Record<string, unknown> | null;
    });
    expect(qual, "evento wa_funnel_qualification ausente").toBeTruthy();
    expect(qual!.has_nome).toBe(true);
    expect(String(qual!.bairro)).toMatch(/Batel/i);
    expect(String(qual!.urgencia)).not.toBe("unknown");
    expect(String(qual!.sintoma ?? "")).not.toHaveLength(0);
    expect(String(qual!.origin_url ?? "")).toContain("utm_campaign=qualification_e2e");
    // Nunca enviar o nome em claro para o analytics.
    expect(JSON.stringify(qual)).not.toContain("Cliente Teste");

    // 2) Buffer de observabilidade (Sentry) recebeu o mesmo contexto
    const obs = await page.evaluate(() => ({
      events: (window as unknown as { __appErrors: AppError[] }).__appErrors,
      buffer:
        (window as unknown as { __APP_ERRORS__?: Array<Record<string, unknown>> })
          .__APP_ERRORS__ ?? [],
    }));
    expect(obs.events.length, "evento app:funnel-qualification não disparou").toBeGreaterThan(0);
    const buffered = obs.buffer.find((e) => e.kind === "funnel_qualification");
    expect(buffered, "qualificação não chegou ao buffer de observabilidade").toBeTruthy();
    expect(String(buffered!.bairro)).toMatch(/Batel/i);
    expect(String(buffered!.origin_url)).toContain("qualification_e2e");

    // 3) A abertura do WhatsApp carrega cat / sym / cidade-bairro e a URL de origem
    const opened = await page.evaluate(
      () => (window as unknown as { __waOpened: string[] }).__waOpened,
    );
    expect(opened.length, "WhatsApp não foi aberto").toBeGreaterThan(0);
    const waUrl = new URL(opened[0]);
    expect(waUrl.hostname).toBe("wa.me");
    const text = waUrl.searchParams.get("text") ?? "";
    expect(text).toContain("cat=");
    expect(text).toContain("sym=");
    expect(text.toLowerCase()).toContain("batel");
    expect(text).toContain("Cliente Teste");
    expect(text).toContain("Página de origem:");
    expect(text).toContain("utm_campaign=qualification_e2e");
  });

  test("qualificação incompleta bloqueia a abertura do WhatsApp", async ({ page }) => {
    await page.goto(HOME);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);

    await dialog.getByRole("button", { name: /PC \/ Notebook/i }).click();
    await dialog.getByRole("radio", { name: /^Notebook$/i }).click();
    await dialog.getByRole("radio", { name: /Liga e inicia normalmente/i }).click();
    await dialog.getByRole("radio", { name: /Instalar ou configurar programa/i }).click();
    await dialog.getByRole("radio", { name: /Há poucos dias/i }).click();
    await dialog.getByRole("radio", { name: /Próximas 72 horas úteis/i }).click();

    await dialog.getByRole("button", { name: /Agendar agora|Abrir WhatsApp|Enviar/i }).first().click();

    const opened = await page.evaluate(
      () => (window as unknown as { __waOpened: string[] }).__waOpened,
    );
    expect(opened.length, "WhatsApp abriu sem qualificação").toBe(0);
  });
});
