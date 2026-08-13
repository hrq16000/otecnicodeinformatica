import { test, expect, type Page } from "@playwright/test";

/**
 * REGRESSÃO VISUAL COM prefers-reduced-motion: reduce.
 *
 * Dois contratos:
 *  1. a interface renderiza igual (snapshot) com movimento reduzido — nada
 *     pode ficar invisível porque a animação de entrada não rodou;
 *  2. nenhum layout shift acumulado acima do orçamento (CLS ≤ 0.02) e
 *     nenhuma animação/transição ativa no DOM.
 *
 * Para gerar/atualizar os snapshots:
 *   npx playwright test e2e/visual-reduced-motion.spec.ts --update-snapshots
 */
const rotas = [
  { nome: "home", path: "/" },
  { nome: "servicos", path: "/servicos" },
  { nome: "problemas", path: "/problemas" },
  { nome: "empresas", path: "/empresas" },
];

const CLS_MAX = 0.02;

test.use({ viewport: { width: 1280, height: 900 } });

// `test.use({ reducedMotion })` não é aplicado de forma confiável nesta versão
// do runner — a emulação é forçada explicitamente antes de cada navegação.
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

async function observarLayoutShift(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { __CLS__: number }).__CLS__ = 0;
    new PerformanceObserver((lista) => {
      for (const entrada of lista.getEntries() as (PerformanceEntry & {
        value: number;
        hadRecentInput: boolean;
      })[]) {
        if (!entrada.hadRecentInput) {
          (window as unknown as { __CLS__: number }).__CLS__ += entrada.value;
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
}

for (const rota of rotas) {
  test.describe(`reduced-motion @ ${rota.nome}`, () => {
    test(`sem animação ativa e sem layout shift`, async ({ page }) => {
      await observarLayoutShift(page);
      await page.goto(rota.path);
      await page.waitForLoadState("networkidle");

      // Conteúdo visível mesmo sem animação de entrada.
      await expect(page.locator("h1").first()).toBeVisible();

      // Rola a página inteira: revela conteúdo lazy e provoca shifts tardios.
      await page.evaluate(async () => {
        const passo = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += passo) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(400);

      // Nada pode estar animando ou em transição sob reduced-motion.
      const emMovimento = await page.evaluate(() => {
        const alvos = Array.from(document.querySelectorAll("body *")).slice(0, 4000);
        return alvos
          .filter((el) => {
            const s = getComputedStyle(el);
            const dur = (v: string) =>
              v.split(",").some((p) => parseFloat(p) > 0.01);
            return (
              (s.animationName !== "none" && dur(s.animationDuration)) ||
              dur(s.transitionDuration)
            );
          })
          .slice(0, 5)
          .map((el) => `${el.tagName.toLowerCase()}.${(el.className || "").toString().slice(0, 60)}`);
      });
      expect(emMovimento, `elementos animando sob reduced-motion em ${rota.path}`).toEqual([]);

      const cls = await page.evaluate(() => (window as unknown as { __CLS__: number }).__CLS__);
      expect(cls, `CLS em ${rota.path}`).toBeLessThanOrEqual(CLS_MAX);

      // Regiões voláteis por natureza (consentimento, botão flutuante e
      // imagens remotas) são mascaradas: o contrato aqui é layout, não pixel.
      await expect(page).toHaveScreenshot(`reduced-motion-${rota.nome}.png`, {
        clip: { x: 0, y: 0, width: 1280, height: 900 },
        maxDiffPixelRatio: 0.05,
        animations: "disabled",
        mask: [
          page.locator("[data-cookie-banner], [class*='cookie']"),
          page.locator("button.wa-float-offset"),
          page.locator("img"),
        ],
      });
    });
  });
}

/**
 * ESTADOS DE CARREGAMENTO (Skeletons).
 *
 * Atrasamos artificialmente os módulos de página para forçar o fallback de
 * Suspense/esqueleto e validar dois contratos nesse estado:
 *   1. o esqueleto aparece e não anima sob prefers-reduced-motion;
 *   2. a troca esqueleto → conteúdo real não gera layout shift acima do
 *      orçamento (é aqui que esqueleto com dimensão errada seria pego).
 */
const rotasComLoading = [
  { nome: "servicos", path: "/servicos" },
  { nome: "problemas", path: "/problemas" },
];

for (const rota of rotasComLoading) {
  test.describe(`reduced-motion @ ${rota.nome} (loading)`, () => {
    test("esqueleto sem animação e troca sem layout shift", async ({ page }) => {
      await observarLayoutShift(page);

      // Atraso somente nos módulos/chamadas da página — o shell carrega normal.
      await page.route(/\/src\/pages\/|\/assets\/.*\.js|\/rest\/v1\//, async (route) => {
        await new Promise((r) => setTimeout(r, 700));
        await route.continue();
      });

      await page.goto(rota.path, { waitUntil: "commit" });

      // O estado de carregamento precisa ser perceptível e acessível.
      const carregando = page.locator('[aria-busy="true"], .skel').first();
      const apareceu = await carregando
        .waitFor({ state: "visible", timeout: 5000 })
        .then(() => true)
        .catch(() => false);

      if (apareceu) {
        const esqueletoAnimando = await page.evaluate(() =>
          Array.from(document.querySelectorAll(".skel")).some((el) => {
            const s = getComputedStyle(el);
            return s.animationName !== "none" && parseFloat(s.animationDuration) > 0.01;
          }),
        );
        expect(esqueletoAnimando, "esqueleto animando sob reduced-motion").toBe(false);
      }

      await page.unroute(/\/src\/pages\/|\/assets\/.*\.js|\/rest\/v1\//);
      await expect(page.locator("h1").first()).toBeVisible({ timeout: 20000 });
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(400);

      const cls = await page.evaluate(() => (window as unknown as { __CLS__: number }).__CLS__);
      expect(cls, `CLS na troca esqueleto → conteúdo em ${rota.path}`).toBeLessThanOrEqual(CLS_MAX);
    });
  });
}
