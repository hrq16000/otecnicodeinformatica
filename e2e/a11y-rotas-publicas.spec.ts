import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Gate de acessibilidade das rotas públicas de maior tráfego orgânico.
 * Fail-closed: qualquer violação axe séria/crítica reprova o deploy.
 * Cobre também operabilidade por teclado (foco visível e navegação por Tab).
 */
const ROTAS_PUBLICAS = [
  "/",
  "/problemas",
  "/problemas/computador-lento",
  "/problemas/tela-azul",
  "/problemas/wifi-instavel",
  "/empresas",
  "/servicos",
  "/como-funciona",
] as const;

test.describe("Acessibilidade — rotas públicas", () => {
  for (const rota of ROTAS_PUBLICAS) {
    test(`sem violações axe sérias/críticas em ${rota}`, async ({ page }) => {
      await page.goto(rota);
      await page.waitForLoadState("networkidle");
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      const graves = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(graves.map((v) => `${rota} → ${v.id}: ${v.nodes.length} nó(s)`)).toEqual([]);
    });
  }

  test("hub /problemas tem H1 único e landmark main único", async ({ page }) => {
    await page.goto("/problemas");
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("primeiro elemento focável do hub recebe foco visível via teclado", async ({ page }) => {
    await page.goto("/problemas");
    await page.keyboard.press("Tab");
    const focado = page.locator(":focus");
    await expect(focado).toHaveCount(1);
    const estilo = await focado.evaluate((el) => {
      const s = getComputedStyle(el);
      return `${s.outlineStyle}|${s.outlineWidth}|${s.boxShadow}`;
    });
    expect(estilo).not.toBe("none|0px|none");
  });
});
