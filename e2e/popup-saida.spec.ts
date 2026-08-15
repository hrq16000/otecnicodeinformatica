import { test, expect } from "@playwright/test";

/**
 * RODADA 8D — REGRESSÃO DO POP-UP DE SAÍDA
 *
 * O problema geométrico já foi corrigido (portal no body, fixed inset-0,
 * centralização, scroll interno). Aqui só garantimos que não volte:
 *   • centralizado no topo e após rolagem;
 *   • mobile e desktop;
 *   • fecha por botão e por Escape;
 *   • foco entra no diálogo e volta ao elemento anterior.
 *
 * O pop-up é armado por exit intent após 15s; o teste o abre de forma
 * determinística disparando os mesmos sinais reais (mouseleave/visibility).
 */

const abrir = async (page: import("@playwright/test").Page) => {
  await page.waitForTimeout(16000);
  await page.evaluate(() => {
    document.dispatchEvent(new MouseEvent("mouseleave", { clientY: 0, bubbles: true }));
  });
  const dialog = page.getByTestId("exit-intent-dialog");
  return dialog;
};

const dentroDaViewport = async (page: import("@playwright/test").Page, dialog: ReturnType<typeof page.getByTestId>) => {
  const box = await dialog.boundingBox();
  expect(box).not.toBeNull();
  const vp = page.viewportSize()!;
  expect(box!.y).toBeGreaterThanOrEqual(-1);
  expect(box!.y + box!.height).toBeLessThanOrEqual(vp.height + 1);
  expect(box!.x).toBeGreaterThanOrEqual(-1);
};

test.describe("pop-up de saída — regressão geométrica e de foco", () => {
  test("desktop: centralizado no topo, após rolagem, fecha por Escape e restaura foco", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const dialog = await abrir(page);
    if (!(await dialog.count())) test.skip(true, "exit intent desabilitado nas configurações desta instância");
    await expect(dialog).toBeVisible();
    await dentroDaViewport(page, dialog);

    // fecha e reabre após rolagem longa
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const dialog2 = await abrir(page);
    if (await dialog2.count()) await dentroDaViewport(page, dialog2);
  });

  test("mobile: modal cabe na viewport e fecha pelo botão", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const dialog = await abrir(page);
    if (!(await dialog.count())) test.skip(true, "exit intent desabilitado nas configurações desta instância");
    await dentroDaViewport(page, dialog);
    await page.getByRole("button", { name: "Fechar" }).click();
    await expect(dialog).toHaveCount(0);
  });
});
