import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * ACESSIBILIDADE DO ÍNDICE DO ARTIGO (TOC) — Rodada 9B.3.
 * Valida contraste, landmarks/roles, navegação por âncora e foco do botão
 * "copiar link da seção" nos três breakpoints de mobile.
 */

const ARTIGO = "/blog/o-que-e-informatica";
const VIEWPORTS = [
  { nome: "360", width: 360, height: 780 },
  { nome: "390", width: 390, height: 844 },
  { nome: "430", width: 430, height: 932 },
];

test.describe("TOC — acessibilidade", () => {
  for (const vp of VIEWPORTS) {
    test(`sem violações axe em ${vp.nome}px`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(ARTIGO);
      const nav = page.getByRole("navigation", { name: "Índice do artigo" });
      await expect(nav).toBeVisible();

      const resultado = await new AxeBuilder({ page })
        .include("nav[aria-label='Índice do artigo']")
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(resultado.violations).toEqual([]);
    });
  }

  test("mobile: índice inicia recolhido e abre por teclado", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(ARTIGO);
    const detalhes = page.locator("details.article-toc");
    await expect(detalhes).toHaveJSProperty("open", false);

    await page.getByText("Índice do artigo", { exact: false }).first().click();
    await expect(detalhes).toHaveJSProperty("open", true);
    await expect(page.locator("[data-toc-link]").first()).toBeVisible();
  });

  test("âncoras do índice navegam para headings existentes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(ARTIGO);
    await page.locator("details.article-toc > summary").click();
    const link = page.locator("[data-toc-link]").first();
    const id = await link.getAttribute("data-toc-link");
    await link.click();
    await expect(page.locator(`#${id}`)).toBeVisible();
    expect(page.url()).toContain(`#${id}`);
  });

  test("copiar link mantém foco no botão e anuncia via aria-live", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.setViewportSize({ width: 430, height: 932 });
    await page.goto(ARTIGO);
    await page.locator("details.article-toc > summary").click();

    const botao = page.locator(".article-toc__copy").first();
    await botao.click();
    await expect(botao).toBeFocused();
    await expect(page.locator("[aria-live='polite']")).toContainText("copiado");
  });
});
