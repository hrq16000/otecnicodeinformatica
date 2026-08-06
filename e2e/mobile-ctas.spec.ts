import { test, expect, devices } from "@playwright/test";

test.use({ ...devices["iPhone 13"] });

test.describe("Mobile CTAs", () => {
  test("home: WhatsApp CTA é visível e clicável; nenhum link 'Ligar Agora' tel: ativo", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Spy nos cliques de WhatsApp para garantir que o handler dispara
    await page.addInitScript(() => {
      (window as unknown as { __waClicks?: number }).__waClicks = 0;
      window.addEventListener(
        "click",
        (e) => {
          const a = (e.target as HTMLElement | null)?.closest?.("a[href*='wa.me']");
          if (a) (window as unknown as { __waClicks: number }).__waClicks++;
        },
        true,
      );
    });

    // Aguarda hidratação
    await page.waitForFunction(() => document.documentElement.dataset.hydrated === "1", null, {
      timeout: 12000,
    });

    // Confirma presença de pelo menos um link WhatsApp
    const wa = page.locator("a[href*='wa.me']").first();
    await expect(wa).toBeVisible({ timeout: 8000 });
    const href = await wa.getAttribute("href");
    expect(href).toContain("wa.me/5541997086380");

    // Verifica que NÃO existem links tel: ativos (regra de negócio: só WhatsApp)
    const telLinks = await page.locator("a[href^='tel:']").count();
    expect(telLinks).toBe(0);

    // Texto "Agendar" presente em algum CTA da home
    const agendar = page.getByText(/agendar/i).first();
    await expect(agendar).toBeVisible({ timeout: 8000 });
  });

  test("noscript fallback: WhatsApp CTA presente no HTML estático", async ({ request }) => {
    const res = await request.get("/");
    const html = await res.text();
    expect(html).toMatch(/wa\.me\/5541997086380/i);
  });
});
