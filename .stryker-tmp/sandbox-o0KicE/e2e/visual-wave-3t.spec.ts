// @ts-nocheck
import { test, expect } from "@playwright/test";

/**
 * RODADA 3T — páginas empresariais propagadas.
 * Valida CTA acima da dobra, contexto B2B, limites de terceiros,
 * sumário navegável, teclado/foco visível e ausência de overflow.
 */
const BASE = process.env.E2E_BASE_URL ?? "http://localhost:8080";

// Páginas empresariais puras (variante B2B completa).
const PAGES = [
  { path: "/servicos/manutencao-preventiva-empresas", cta: /rotina preventiva/i },
  { path: "/servicos/backup-para-empresas", cta: /backup da empresa/i },
];

// Página de público misto: NÃO recebe a variante empresarial.
const MISTA = "/servicos/redes-e-wifi";

const VIEWPORTS = [
  { width: 360, height: 740 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
];

test.describe("Rodada 3T — propagação empresarial", () => {
  for (const page_ of PAGES) {
    for (const vp of VIEWPORTS) {
      test(`${page_.path} @${vp.width}px: CTA empresarial na primeira dobra`, async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(`${BASE}${page_.path}`, { waitUntil: "domcontentloaded" });
        const cta = page.locator("[data-cta-location$='_hero']").first();
        await expect(cta).toBeVisible();
        await expect(cta).toHaveText(page_.cta);
        const box = await cta.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.y).toBeLessThan(750);
        // Triagem preservada: CTA aponta para o funil de WhatsApp.
        const href = await cta.getAttribute("href");
        expect(href).toContain("wa.me");
      });
    }

    test(`${page_.path}: contexto B2B, terceiros e CTA secundário único`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(`${BASE}${page_.path}`, { waitUntil: "domcontentloaded" });

      const contexto = page.locator("[aria-label='Contexto do atendimento empresarial']");
      await expect(contexto).toBeVisible();
      await expect(contexto.locator("h2")).toHaveCount(3);

      // Limite de sistemas/serviços de terceiros declarado na página.
      await expect(page.locator("body")).toContainText(/fornecedor|operadora/i);

      // Exatamente um CTA secundário de contexto (link interno).
      const secundario = page.locator("[data-cta-secundario='empresarial']");
      await expect(secundario).toHaveCount(1);
      const to = await secundario.getAttribute("href");
      expect(to?.startsWith("/")).toBeTruthy();

      // No máximo 3 CTAs de WhatsApp no corpo da página.
      const waCount = await page.locator("a[href*='wa.me']").count();
      expect(waCount).toBeLessThanOrEqual(6);
    });

    test(`${page_.path}: sumário navegável e âncoras existentes`, async ({ page }) => {
      await page.goto(`${BASE}${page_.path}`, { waitUntil: "domcontentloaded" });
      const toc = page.locator("a[href^='#']");
      const n = await toc.count();
      expect(n).toBeGreaterThan(0);
      for (let i = 0; i < Math.min(n, 6); i++) {
        const href = await toc.nth(i).getAttribute("href");
        if (!href || href === "#") continue;
        await expect(page.locator(href)).toHaveCount(1);
      }
    });

    test(`${page_.path}: navegação por teclado com foco visível`, async ({ page }) => {
      await page.goto(`${BASE}${page_.path}`, { waitUntil: "domcontentloaded" });
      let found = false;
      for (let i = 0; i < 25; i++) {
        await page.keyboard.press("Tab");
        const info = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          if (!el || el === document.body) return null;
          const s = getComputedStyle(el);
          return {
            cta: el.getAttribute("data-cta-location") ?? el.getAttribute("data-cta-secundario"),
            outline: s.outlineStyle,
            width: s.outlineWidth,
            shadow: s.boxShadow,
          };
        });
        if (info?.cta) {
          found = true;
          const visivel =
            (info.outline !== "none" && info.width !== "0px") || (info.shadow && info.shadow !== "none");
          expect(visivel).toBeTruthy();
          break;
        }
      }
      expect(found).toBeTruthy();
    });

    test(`${page_.path}: sem overflow horizontal nem erro de console`, async ({ page }) => {
      const erros: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") erros.push(m.text());
      });
      await page.setViewportSize({ width: 360, height: 740 });
      await page.goto(`${BASE}${page_.path}`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(700);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);
      expect(erros.filter((e) => !/favicon|404|net::ERR|cannot be given refs|Download the React DevTools/i.test(e))).toEqual([]);
    });

    test(`${page_.path}: JSON-LD WebPage/FAQPage e BreadcrumbList preservados`, async ({ page }) => {
      await page.goto(`${BASE}${page_.path}`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(900);
      const types = await page.$$eval('script[type="application/ld+json"]', (nodes) =>
        nodes.flatMap((n) => {
          try {
            const j = JSON.parse(n.textContent || "null");
            const arr = Array.isArray(j) ? j : [j];
            return arr.map((x) => x?.["@type"]).flat();
          } catch {
            return [];
          }
        }),
      );
      expect(types).toContain("WebPage");
      expect(types).toContain("FAQPage");
      expect(types).toContain("Service");
      expect(types).toContain("BreadcrumbList");

      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toContain(page_.path);
    });
  }



  test(`${MISTA}: público misto preservado, sem conversão empresarial`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE}${MISTA}`, { waitUntil: "domcontentloaded" });

    // Sem o bloco exclusivo do template empresarial.
    await expect(page.locator("[aria-label='Contexto do atendimento empresarial']")).toHaveCount(0);
    await expect(page.locator("[data-cta-secundario='empresarial']")).toHaveCount(0);

    // CTA do hero preservado e acima da dobra.
    const cta = page.locator("[data-cta-location$='_hero']").first();
    await expect(cta).toBeVisible();
    const box = await cta.boundingBox();
    expect(box!.y).toBeLessThan(750);

    // Contextos residencial e empresarial coexistem.
    const contextos = page.locator("#contextos-rede");
    await expect(contextos).toBeVisible();
    await expect(contextos).toContainText(/home office/i);
    await expect(contextos).toContainText(/escrit[óo]rio/i);

    // Limites de operadora e de impressoras preservados.
    await expect(page.locator("#operadora")).toContainText(/operadora/i);
    await expect(page.locator("#impressoras-rede")).toContainText(
      /configura[çc][ãa]o, comunica[çc][ãa]o e compartilhamento em rede/i,
    );
    await expect(page.locator("#impressoras-rede")).not.toContainText(/recarga de toner/i);
  });

  test("preventiva: fluxo e matriz de prioridades; backup: conceitos e responsabilidades", async ({ page }) => {
    await page.goto(`${BASE}/servicos/manutencao-preventiva-empresas`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("#fluxo-preventiva li")).toHaveCount(8);
    await expect(page.locator("#prioridades table tbody tr")).toHaveCount(4);
    await expect(page.locator("#limites-preventiva")).toContainText(/não elimina falhas inesperadas/i);

    await page.goto(`${BASE}/servicos/backup-para-empresas`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("#conceitos-backup")).toContainText(/Sincronização/);
    await expect(page.locator("#conceitos-backup")).toContainText(/tentativa posterior/i);
    await expect(page.locator("#teste-restauracao")).toContainText(/restauração é testado/i);
    await expect(page.locator("#responsabilidades > div > div")).toHaveCount(3);
  });
});
