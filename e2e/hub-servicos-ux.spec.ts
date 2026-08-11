import { test, expect, devices } from "@playwright/test";

/**
 * UX do hub de serviços (mobile + desktop).
 * Garante que nenhum item do hub "pareça clicável" sem destino real:
 *  - todo <a> visível dentro do hub tem href válido (não vazio, não "#")
 *  - nenhum card com cursor-pointer/hover fica sem link interno
 */

const HUB = "/servicos";

const viewports = [
  { nome: "mobile", size: devices["Pixel 7"].viewport },
  { nome: "desktop", size: { width: 1440, height: 900 } },
];

for (const vp of viewports) {
  test(`hub /servicos sem itens falso-clicáveis (${vp.nome})`, async ({ page }) => {
    await page.setViewportSize(vp.size);
    await page.goto(HUB, { waitUntil: "domcontentloaded" });

    const main = page.locator("main");
    await expect(main).toBeVisible();

    // 1) Todo link visível precisa de href utilizável.
    const hrefs = await main.locator("a:visible").evaluateAll((els) =>
      els.map((el) => ({
        href: el.getAttribute("href"),
        text: (el.textContent || "").trim().slice(0, 60),
      })),
    );
    expect(hrefs.length).toBeGreaterThan(5);
    const semDestino = hrefs.filter(
      (l) => !l.href || l.href === "#" || l.href.trim() === "",
    );
    expect(
      semDestino,
      `Links sem destino: ${JSON.stringify(semDestino)}`,
    ).toHaveLength(0);

    // 2) Cards com aparência clicável precisam conter um link ou ser button.
    const cardsFalsos = await main
      .locator("[class*='cursor-pointer']:visible")
      .evaluateAll((els) =>
        els
          .filter(
            (el) =>
              el.tagName !== "A" &&
              el.tagName !== "BUTTON" &&
              !el.closest("a") &&
              !el.closest("button") &&
              !el.querySelector("a,button") &&
              !el.hasAttribute("onclick") &&
              el.getAttribute("role") !== "button",
          )
          .map((el) => (el.textContent || "").trim().slice(0, 60)),
      );
    expect(
      cardsFalsos,
      `Elementos com cursor-pointer sem ação: ${JSON.stringify(cardsFalsos)}`,
    ).toHaveLength(0);
  });
}
