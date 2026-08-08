import { test, expect, type Page } from "@playwright/test";

/**
 * /publicidade (301 → /anuncie) — og:url, og:image e twitter:image em mobile e desktop.
 * Fail-closed: a rota legada precisa terminar na página comercial canônica e
 * emitir imagens sociais absolutas que respondem 200.
 */

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
] as const;

const metaContent = (page: Page, selector: string) =>
  page.locator(selector).first().getAttribute("content");

for (const vp of VIEWPORTS) {
  test.describe(`/publicidade — ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("redireciona para /anuncie com og:url self-referente e imagens sociais válidas", async ({
      page,
    }) => {
      await page.goto("/publicidade");
      await page.waitForLoadState("networkidle");

      await expect(page).toHaveURL(/\/anuncie$/);

      const canonical = await page.locator('link[rel="canonical"]').first().getAttribute("href");
      expect(canonical).toContain("/anuncie");

      const ogUrl = await metaContent(page, 'meta[property="og:url"]');
      expect(ogUrl, "og:url deve apontar para a própria página").toContain("/anuncie");
      expect(ogUrl).toBe(canonical);

      const ogImage = await metaContent(page, 'meta[property="og:image"]');
      const twitterImage = await metaContent(page, 'meta[name="twitter:image"]');

      for (const img of [ogImage, twitterImage]) {
        expect(img, "og:image/twitter:image devem existir").toBeTruthy();
        expect(img!, "crawler social exige URL absoluta https").toMatch(/^https:\/\//);
      }

      const imgPath = new URL(ogImage!).pathname;
      const imgResponse = await page.request.get(imgPath);
      expect(imgResponse.status(), `og:image ${imgPath} deve responder 200`).toBe(200);
      expect(imgResponse.headers()["content-type"] || "").toContain("image");
    });
  });
}
