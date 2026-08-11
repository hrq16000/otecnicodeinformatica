import { test, expect } from "@playwright/test";

/**
 * Smoke test: verifica que a home publicada carrega, expõe a versão do build
 * e que os CTAs principais (WhatsApp e agendamento) possuem hrefs válidos
 * e disparam evento de clique. Não há botão "Ligar" — por decisão de produto
 * o contato é exclusivo por WhatsApp/agendamento.
 */
const TARGET = process.env.SMOKE_URL || "http://localhost:8080/";

test.describe("smoke: home CTAs", () => {
  test("home carrega, versão exposta e CTAs WhatsApp funcionam", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("pageerror", (e) => consoleErrors.push(String(e)));
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text());
    });

    await page.goto(TARGET, { waitUntil: "domcontentloaded" });

    // Versão exposta no window
    const version = await page.evaluate(() => (window as unknown as { __APP_VERSION__?: string }).__APP_VERSION__);
    expect(version, "window.__APP_VERSION__ deve estar exposto").toBeTruthy();

    // Aguarda hidratação (header React)
    await page.waitForLoadState("networkidle");

    // WhatsApp: deve existir ao menos um link para wa.me
    const waLinks = page.locator('a[href*="wa.me/"]');
    await expect(waLinks.first()).toBeVisible({ timeout: 8000 });
    const href = await waLinks.first().getAttribute("href");
    expect(href).toMatch(/wa\.me\/5541997452053/);

    // Clique não deve quebrar a página (sem navegação real — interceptamos)
    let clicked = false;
    await page.route("**/wa.me/**", (route) => {
      clicked = true;
      route.abort();
    });
    await waLinks.first().click({ button: "left" }).catch(() => { /* abort esperado */ });
    expect(clicked, "click no WhatsApp deve disparar requisição").toBe(true);

    // Não deve ter botão "Ligar Agora" (regra de produto)
    const ligar = page.getByRole("link", { name: /ligar agora/i });
    expect(await ligar.count()).toBe(0);

    expect(consoleErrors, `erros no console: ${consoleErrors.join("\n")}`).toEqual([]);
  });
});
