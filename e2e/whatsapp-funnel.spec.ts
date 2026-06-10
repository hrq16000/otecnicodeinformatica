import { test, expect, type Page } from "@playwright/test";

const ROUTE = "/assistencia-tecnica-curitiba";
const UTM_QS = "?utm_source=ci&utm_medium=cpc&utm_campaign=funnel_e2e&gclid=CI_GCLID_999";

async function installGtagSpy(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls = [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = function (
      ...args: unknown[]
    ) {
      (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls.push(args);
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push(args);
    };
  });
}

async function getGtagCalls(page: Page) {
  return await page.evaluate(
    () => (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls || []
  );
}

test.describe("WhatsApp global funnel — modal flow + GA4 events + wa.me payload", () => {
  test.beforeEach(async ({ page, context }) => {
    await installGtagSpy(page);
    // Stop wa.me from actually navigating away in popup/new tab
    await context.route("https://wa.me/**", (route) =>
      route.fulfill({ status: 204, body: "" })
    );
  });

  test("anchor click opens funnel, fills steps, dispatches GA4 events, opens wa.me with answers + utm/gclid", async ({ page, context }) => {
    await page.goto(`${ROUTE}${UTM_QS}`);
    await page.waitForLoadState("networkidle");

    // Intercept window.open to capture the final wa.me URL
    const opened: string[] = [];
    await page.exposeFunction("__captureOpen", (u: string) => opened.push(u));
    await page.evaluate(() => {
      const orig = window.open;
      (window as unknown as { open: typeof window.open }).open = ((url?: string | URL) => {
        const href = typeof url === "string" ? url : url?.toString();
        if (href) (window as unknown as { __captureOpen: (u: string) => void }).__captureOpen(href);
        return null;
      }) as typeof window.open;
      // mark so the funnel's monkey-patch wraps this
      void orig;
    });

    // Click the first WhatsApp anchor on the page
    const ctas = page.locator('a[href*="wa.me/5541997452053"]');
    const count = await ctas.count();
    expect(count, "page must expose WhatsApp CTAs").toBeGreaterThan(0);

    await ctas.first().scrollIntoViewIfNeeded();
    await ctas.first().click({ force: true });

    // Modal should be visible
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByText("Antes de abrir o WhatsApp")).toBeVisible();

    // Step 1: choose "Consertar equipamento"
    await dialog.getByRole("button", { name: /Consertar equipamento/i }).click();

    // Step 2: equipamento + marca + problema placa
    await dialog.getByPlaceholder(/PS5, Notebook Dell/i).fill("PlayStation 5 modelo Slim");
    await dialog.getByPlaceholder(/Marca e modelo/i).fill("Sony PS5 Slim 1TB");
    await dialog.getByRole("button", { name: /^Sim$/ }).click();
    await dialog.getByRole("button", { name: /Continuar/i }).click();

    // Step 3: preferência
    await dialog.getByText(/Levo até um parceiro/i).click();

    // Step 4: descrição + submit
    await dialog.getByPlaceholder(/Conte rapidamente/i).fill("Não liga. Já tentei outra tomada.");
    await dialog.getByRole("button", { name: /Abrir WhatsApp/i }).click();

    // Verify the wa.me URL we captured contains the answers AND utm/gclid
    await expect.poll(() => opened.length, { timeout: 5000 }).toBeGreaterThan(0);
    const finalUrl = opened[0];
    expect(finalUrl).toMatch(/^https:\/\/wa\.me\/5541997452053/);
    const u = new URL(finalUrl);
    const text = u.searchParams.get("text") || "";
    expect(text).toContain("PlayStation 5");
    expect(text).toContain("Sony PS5");
    expect(text).toContain("Não liga");
    expect(text).toContain("parceiro");
    expect(text).toContain("R$ 90");
    expect(text).toContain("R$ 99,99");
    expect(u.searchParams.get("utm_source")).toBe("ci");
    expect(u.searchParams.get("utm_campaign")).toBe("funnel_e2e");
    expect(u.searchParams.get("gclid")).toBe("CI_GCLID_999");

    // GA4 events: open, step, submit, opened — all with utm/gclid attribution
    const calls = await getGtagCalls(page);
    const events = calls
      .filter((c) => c[0] === "event")
      .map((c) => ({ name: c[1] as string, payload: (c[2] || {}) as Record<string, unknown> }));

    const required = ["wa_funnel_open", "wa_funnel_step", "wa_funnel_submit", "wa_funnel_opened"];
    for (const name of required) {
      const hit = events.find((e) => e.name === name);
      expect(hit, `expected GA4 event ${name}. captured: ${events.map((e) => e.name).join(",")}`).toBeTruthy();
      const flat = JSON.stringify(hit!.payload);
      expect(/utm_source|utm_campaign|gclid/i.test(flat), `${name} payload missing utm/gclid: ${flat}`).toBeTruthy();
    }
  });

  test("legacy window.open(wa.me) is intercepted by the funnel (monkey-patch)", async ({ page }) => {
    await page.goto(`${ROUTE}${UTM_QS}`);
    await page.waitForLoadState("networkidle");

    // Programmatically call window.open with a wa.me URL — funnel must intercept it
    await page.evaluate(() => {
      window.open("https://wa.me/5541997452053?text=Quero%20um%20or%C3%A7amento%20preset", "_blank");
    });

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByText(/Antes de abrir o WhatsApp/i)).toBeVisible();

    // The "Só um orçamento rápido" path must work after the orcamento bug fix
    await dialog.getByRole("button", { name: /Só um orçamento rápido/i }).click();
    // Should jump to description step
    await expect(dialog.getByPlaceholder(/Conte rapidamente/i)).toBeVisible();
  });

  test("clicking every WhatsApp CTA opens the funnel (no direct navigation)", async ({ page }) => {
    await page.goto(`${ROUTE}${UTM_QS}`);
    await page.waitForLoadState("networkidle");

    const ctas = page.locator('a[href*="wa.me/5541997452053"]');
    const count = await ctas.count();
    const toClick = Math.min(count, 8);

    for (let i = 0; i < toClick; i++) {
      // Reset modal between clicks
      await page.keyboard.press("Escape").catch(() => {});
      await ctas.nth(i).scrollIntoViewIfNeeded();
      await ctas.nth(i).click({ force: true });
      const dialog = page.getByRole("dialog");
      await expect(dialog, `CTA #${i} should open the funnel modal`).toBeVisible({ timeout: 4000 });
    }
  });
});
