import { expect, test } from "@playwright/test";

/**
 * TOC dos pilares editoriais (Rodada 9B.2): âncoras precisas,
 * teclado, larguras móveis reais e respeito a reduced motion.
 */
const ARTIGO = "/blog/o-que-e-informatica";
const HEADER_OFFSET = 140; // header fixo + folga do scroll-mt-28

test.describe("Índice do artigo", () => {
  test("existe no HTML servido, sem depender de JS", async ({ request }) => {
    const html = await (await request.get(ARTIGO)).text();
    expect(html).toContain('aria-label="Índice do artigo"');
    expect(html).toMatch(/href="#[a-z0-9-]+"/);
  });

  test("clicar leva a viewport até o heading correto", async ({ page }) => {
    await page.goto(ARTIGO);
    const link = page.locator("nav[aria-label='Índice do artigo'] a[data-toc-link]").nth(2);
    const id = await link.getAttribute("data-toc-link");
    await link.click();
    await page.waitForTimeout(800);
    const box = await page.locator(`#${id}`).boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThan(-8);
    expect(box!.y).toBeLessThan(HEADER_OFFSET);
    expect(page.url()).toContain(`#${id}`);
  });

  test("navegação por teclado: foco e ativação", async ({ page }) => {
    await page.goto(ARTIGO);
    const link = page.locator("nav[aria-label='Índice do artigo'] a[data-toc-link]").first();
    const id = await link.getAttribute("data-toc-link");
    await link.focus();
    await expect(link).toBeFocused();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(800);
    expect(page.url()).toContain(`#${id}`);
    const box = await page.locator(`#${id}`).boundingBox();
    expect(box!.y).toBeLessThan(HEADER_OFFSET);
  });

  test("botão de copiar link expõe nome acessível", async ({ page }) => {
    await page.goto(ARTIGO);
    const botao = page.getByRole("button", { name: /Copiar link da seção/ }).first();
    await expect(botao).toBeVisible();
  });

  for (const width of [360, 390, 430]) {
    test(`funciona em ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(ARTIGO);
      const toc = page.locator("nav[aria-label='Índice do artigo']");
      await expect(toc).toBeVisible();
      const resumo = toc.locator("summary");
      if (await resumo.isVisible()) await resumo.click(); // recolhe
      if (await resumo.isVisible()) await resumo.click(); // reabre
      const link = toc.locator("a[data-toc-link]").nth(1);
      const id = await link.getAttribute("data-toc-link");
      await link.click();
      await page.waitForTimeout(800);
      const box = await page.locator(`#${id}`).boundingBox();
      expect(box!.y).toBeLessThan(HEADER_OFFSET);
      // Sem overflow horizontal no mobile.
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }

  test("reduced motion desliga o scroll suave", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(ARTIGO);
    const comportamento = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
    expect(comportamento).toBe("auto");
    await ctx.close();
  });
});
