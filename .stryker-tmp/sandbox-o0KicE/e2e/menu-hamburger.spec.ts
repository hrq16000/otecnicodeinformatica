// @ts-nocheck
import { test, expect } from "@playwright/test";

/**
 * Regressão do bug em que o botão "hambúrguer" da Home (FastHeader) era
 * um `<a href="/servicos">` — tocá-lo navegava para /servicos antes de
 * abrir qualquer menu. Agora deve abrir um <details> nativo sem mudar de URL.
 */
const BASE = process.env.SMOKE_URL || "http://localhost:8080";

test.describe("menu mobile (FastHeader) — Home", () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14

  test("hambúrguer abre dropdown sem navegar para /servicos", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });

    const burger = page.locator('header [aria-label="Abrir menu"]');
    await expect(burger).toBeVisible({ timeout: 6000 });

    const before = page.url();
    await burger.click();

    // URL não mudou após o clique
    expect(page.url()).toBe(before);

    // Dropdown abriu e contém os links principais (incl. /servicos como item, não destino do botão)
    const dropdown = page.locator('nav[aria-label="Menu mobile"]');
    await expect(dropdown).toBeVisible();
    await expect(dropdown.locator('a[href="/servicos"]')).toBeVisible();
    await expect(dropdown.locator('a[href="/blog"]')).toBeVisible();
  });
});
