import { test, expect } from "@playwright/test";

/**
 * Regressão visual + legibilidade em rotas críticas.
 * Atualizar snapshots: npx playwright test e2e/visual-critical.spec.ts --update-snapshots
 */
const routes = [
  { slug: "home", path: "/" },
  { slug: "como-funciona", path: "/como-funciona" },
  { slug: "precos", path: "/precos-e-politicas" },
  { slug: "termos", path: "/termos-e-condicoes" },
  { slug: "servicos", path: "/servicos" },
  { slug: "ordem-de-servico", path: "/ordem-de-servico" },
];

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1366, height: 900 },
];

/** Retorna elementos com contraste insuficiente (texto quase igual ao fundo). */
const CONTRAST_PROBE = `() => {
  const luminance = (rgb) => {
    const [r, g, b] = rgb.map((v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const parse = (s) => (s.match(/\\d+(\\.\\d+)?/g) || []).slice(0, 3).map(Number);
  const alphaOf = (s) => {
    const nums = (s.match(/\\d+(\\.\\d+)?/g) || []).map(Number);
    return nums.length >= 4 ? nums[3] : 1;
  };
  // Só considera fundos praticamente opacos: camadas translúcidas (bg-accent/5)
  // não representam a cor real percebida e geram falso positivo.
  const bgOf = (el) => {
    let n = el;
    while (n) {
      const c = getComputedStyle(n).backgroundColor;
      if (c && c !== 'transparent' && alphaOf(c) >= 0.9) return parse(c);
      n = n.parentElement;
    }
    return [255, 255, 255];
  };
  const hasOverlay = (root) =>
    Array.from(root.children).some((c) => {
      const s = getComputedStyle(c);
      return (
        (s.position === 'absolute' || s.position === 'fixed') &&
        s.backgroundImage !== 'none'
      );
    });
  // Texto sobre gradiente (no próprio elemento, em um ancestral ou em um
  // overlay absoluto irmão) não é medível por cor computada.
  const onGradient = (el) => {
    let n = el;
    while (n) {
      const st = getComputedStyle(n);
      if (st.backgroundImage && st.backgroundImage !== 'none') return true;
      if (hasOverlay(n)) return true;
      n = n.parentElement;
    }
    return false;
  };
  const bad = [];
  const nodes = document.querySelectorAll('h1,h2,h3,h4,p,li,a,span,strong,label');
  nodes.forEach((el) => {
    const text = (el.textContent || '').trim();
    if (!text || el.children.length > 0) return;
    const style = getComputedStyle(el);
    if (style.visibility === 'hidden' || style.display === 'none' || style.opacity === '0') return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 4 || rect.height < 4) return;
    if (style.webkitTextFillColor === 'rgba(0, 0, 0, 0)') return;
    if (onGradient(el)) return;
    const fg = parse(style.color);
    const bg = bgOf(el);
    const l1 = luminance(fg), l2 = luminance(bg);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const size = parseFloat(style.fontSize);
    const large = size >= 24 || (size >= 18.66 && parseInt(style.fontWeight, 10) >= 700);
    const min = large ? 3 : 4.5;
    if (ratio < min) bad.push(el.tagName + ' :: ' + text.slice(0, 60) + ' :: ' + ratio.toFixed(2));
  });
  return bad;
}`;

for (const vp of viewports) {
  test.describe(`rotas críticas @ ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const route of routes) {
      test(`${route.slug} legível e estável`, async ({ page }) => {
        await page.goto(route.path);
        await page.waitForLoadState("networkidle");

        await expect(page.locator("h1").first()).toBeVisible();

        const bad = (await page.evaluate(CONTRAST_PROBE)) as string[];
        expect(bad, `contraste insuficiente em ${route.path}:\n${bad.join("\n")}`).toEqual([]);

        await expect(page).toHaveScreenshot(`${route.slug}-${vp.name}.png`, {
          clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) },
          maxDiffPixelRatio: 0.02,
          animations: "disabled",
        });
      });
    }
  });
}
