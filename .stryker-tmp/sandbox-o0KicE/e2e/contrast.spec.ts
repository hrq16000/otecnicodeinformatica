// @ts-nocheck
import { test, expect, type Page } from "@playwright/test";

/**
 * Checa contraste WCAG (AA) de textos/botões críticos em rotas-chave.
 * Implementação local de relative luminance + contrast ratio (sem dep externa)
 * para evitar inflar o bundle de testes. Cores `rgba(...)` com alfa < 1 são
 * compostas sobre o background apurado em runtime.
 */
const BASE = process.env.SMOKE_URL || "http://localhost:8080";

const PAGES = ["/", "/servicos", "/blog", "/faq", "/contato"];
// Selectors representativos: heading, parágrafo, link de nav e CTAs.
const SELECTORS = ["h1", "h2", "p", "header a", "header button", "a[href*='wa.me']"];

const MIN_NORMAL = 4.5;
const MIN_LARGE = 3.0;

type Rgb = { r: number; g: number; b: number; a: number };
const parseColor = (s: string): Rgb | null => {
  const m = s.match(/rgba?\(([^)]+)\)/i);
  if (!m) return null;
  const parts = m[1].split(",").map((x) => parseFloat(x.trim()));
  return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
};
const blend = (fg: Rgb, bg: Rgb): Rgb => ({
  r: fg.r * fg.a + bg.r * (1 - fg.a),
  g: fg.g * fg.a + bg.g * (1 - fg.a),
  b: fg.b * fg.a + bg.b * (1 - fg.a),
  a: 1,
});
const lum = (c: Rgb) => {
  const ch = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b);
};
const ratio = (a: Rgb, b: Rgb) => {
  const la = lum(a), lb = lum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

const auditPage = async (page: Page, path: string) => {
  const failures: string[] = [];
  for (const sel of SELECTORS) {
    const handles = await page.locator(sel).elementHandles();
    const sample = handles.slice(0, 5);
    for (const h of sample) {
      const data = await h.evaluate((el) => {
        const cs = getComputedStyle(el as Element);
        // Resolve bg: sobe na árvore até achar bg não transparente
        let bg = cs.backgroundColor;
        let node: Element | null = el as Element;
        while (node && (bg === "rgba(0, 0, 0, 0)" || bg === "transparent")) {
          node = node.parentElement;
          if (!node) break;
          bg = getComputedStyle(node).backgroundColor;
        }
        if (!bg || bg === "rgba(0, 0, 0, 0)" || bg === "transparent") bg = "rgb(255,255,255)";
        const rect = (el as HTMLElement).getBoundingClientRect();
        const visible = rect.width > 0 && rect.height > 0;
        return {
          color: cs.color,
          bg,
          fontSize: parseFloat(cs.fontSize),
          fontWeight: parseInt(cs.fontWeight, 10) || 400,
          text: (el.textContent || "").trim().slice(0, 40),
          visible,
        };
      });
      if (!data.visible || !data.text) continue;
      const fg = parseColor(data.color);
      const bg = parseColor(data.bg);
      if (!fg || !bg) continue;
      const fgFinal = fg.a < 1 ? blend(fg, bg) : fg;
      const r = ratio(fgFinal, bg);
      const large = data.fontSize >= 24 || (data.fontSize >= 18.66 && data.fontWeight >= 700);
      const min = large ? MIN_LARGE : MIN_NORMAL;
      if (r < min) {
        failures.push(
          `${path} · ${sel} · "${data.text}" → contraste ${r.toFixed(2)} (mín ${min}) · fg=${data.color} bg=${data.bg}`,
        );
      }
    }
  }
  return failures;
};

test.describe("contraste WCAG AA — rotas principais", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  for (const path of PAGES) {
    test(`contraste OK em ${path}`, async ({ page }) => {
      await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle").catch(() => { /* tolerante */ });
      const failures = await auditPage(page, path);
      expect(failures, `Falhas de contraste em ${path}:\n${failures.join("\n")}`).toEqual([]);
    });
  }
});
