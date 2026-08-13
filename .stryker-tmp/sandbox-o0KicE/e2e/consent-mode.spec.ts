// @ts-nocheck
import { test, expect, devices } from "@playwright/test";

/**
 * Consent Mode v2 — Aceitar / Recusar e link "Saiba mais".
 * Valida o comportamento em desktop e mobile sem alterar tracking:
 *  - o banner aparece quando não há decisão salva;
 *  - "Aceitar tudo" grava analytics+ads e dispara consent update granted;
 *  - "Recusar" grava tudo negado e não injeta o script do AdSense;
 *  - "Saiba mais" leva à política de privacidade (âncora da telemetria).
 */

const CONSENT_KEY = "lgpd_consent_v2";

type Update = Record<string, string>;

/** Captura os `gtag('consent','update',...)` empurrados no dataLayer. */
const installConsentSpy = async (page: import("@playwright/test").Page) => {
  await page.addInitScript(() => {
    (window as unknown as { __consentUpdates: Update[] }).__consentUpdates = [];
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    const push = w.dataLayer.push.bind(w.dataLayer);
    w.dataLayer.push = (...args: unknown[]) => {
      for (const a of args) {
        if (Array.isArray(a) && a[0] === "consent" && a[1] === "update") {
          (window as unknown as { __consentUpdates: Update[] }).__consentUpdates.push(
            a[2] as Update,
          );
        }
      }
      return push(...(args as []));
    };
  });
};

const readUpdates = (page: import("@playwright/test").Page) =>
  page.evaluate(() => (window as unknown as { __consentUpdates: Update[] }).__consentUpdates ?? []);

const readStored = (page: import("@playwright/test").Page) =>
  page.evaluate((key) => {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as { analytics: boolean; ads: boolean }) : null;
  }, CONSENT_KEY);

const VIEWPORTS = [
  { nome: "desktop", viewport: { width: 1280, height: 900 } },
  { nome: "mobile", viewport: devices["Pixel 5"].viewport },
] as const;

for (const { nome, viewport } of VIEWPORTS) {
  test.describe(`Consent Mode v2 — ${nome}`, () => {
    test.use({ viewport });

    test("Aceitar tudo concede análise e anúncios", async ({ page }) => {
      await installConsentSpy(page);
      await page.goto("/");

      const banner = page.getByRole("dialog", { name: /privacidade e cookies/i });
      await expect(banner).toBeVisible();

      await banner.getByRole("button", { name: "Aceitar tudo" }).click();
      await expect(banner).toBeHidden();

      expect(await readStored(page)).toMatchObject({ analytics: true, ads: true });
      const updates = await readUpdates(page);
      expect(updates.length).toBeGreaterThan(0);
      expect(updates[updates.length - 1]).toMatchObject({
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    });

    test("Recusar nega todos os sinais e não injeta o AdSense", async ({ page }) => {
      await installConsentSpy(page);
      await page.goto("/");

      const banner = page.getByRole("dialog", { name: /privacidade e cookies/i });
      await banner.getByRole("button", { name: "Recusar" }).click();
      await expect(banner).toBeHidden();

      expect(await readStored(page)).toMatchObject({ analytics: false, ads: false });
      const updates = await readUpdates(page);
      expect(updates[updates.length - 1]).toMatchObject({
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
      expect(await page.locator('script[data-adsense="1"]').count()).toBe(0);
    });

    test('o link "Saiba mais" abre a política de privacidade', async ({ page }) => {
      await page.goto("/");
      const banner = page.getByRole("dialog", { name: /privacidade e cookies/i });
      const link = banner.getByRole("link", { name: "Saiba mais" });
      await expect(link).toHaveAttribute("href", /^\/politica-de-privacidade/);

      await link.click();
      await expect(page).toHaveURL(/\/politica-de-privacidade/);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  });
}
