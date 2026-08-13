import { test } from "@playwright/test";
test.use({ reducedMotion: "reduce", viewport: { width: 1280, height: 900 } });
test("debug", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  console.log(await page.evaluate(() => ({
    mm: matchMedia("(prefers-reduced-motion: reduce)").matches,
    attr: document.documentElement.dataset.reducedMotion,
    header: (() => { const h = document.querySelector("header"); const s = h && getComputedStyle(h); return s && [s.transitionDuration, s.animationName, s.animationDuration]; })(),
  })));
});
