import { test, expect } from "@playwright/test";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * RODADA 5D/5E — a cidade do funil nunca cai em Curitiba por herança.
 *
 * Nas rotas de São José dos Pinhais (serviço × cidade e bairros âncora),
 * o CTA final e os parâmetros do funil precisam carregar a cidade correta.
 * Curitiba só pode aparecer quando a rota é de Curitiba.
 */

const DIST = process.env.E2E_DIST_DIR ?? "dist";

const ROTAS_SJP = [
  "/servicos/conserto-notebook/sao-jose-dos-pinhais",
  "/servicos/conserto-pc/sao-jose-dos-pinhais",
  "/servicos/redes-wifi/sao-jose-dos-pinhais",
  "/servicos/backup-recuperacao/sao-jose-dos-pinhais",
  "/bairros/afonso-pena",
  "/bairros/cruzeiro",
  "/bairros/costeira",
  "/bairros/guatupe",
];

function lerArtefato(path: string): string | null {
  const clean = path.replace(/\/$/, "");
  for (const candidato of [resolve(DIST, `.${clean}.html`), resolve(DIST, `.${clean}/index.html`)]) {
    if (existsSync(candidato)) return readFileSync(candidato, "utf8");
  }
  return null;
}

for (const rota of ROTAS_SJP) {
  test.describe(`funil com cidade correta — ${rota}`, () => {
    test("HTML estático declara São José dos Pinhais e não herda Curitiba no CTA", () => {
      const html = lerArtefato(rota);
      expect(html, `artefato ausente para ${rota}`).toBeTruthy();
      expect(html!).toMatch(/S[aã]o Jos[eé] dos Pinhais/);

      // Nenhum CTA/data-city da página pode dizer Curitiba.
      const cidadesCta = [...html!.matchAll(/data-city=["']([^"']+)["']/g)].map((m) => m[1]);
      for (const cidade of cidadesCta) {
        expect(cidade.toLowerCase()).not.toContain("curitiba");
      }
    });

    test("CTA de WhatsApp da rota não pré-preenche Curitiba", async ({ page }) => {
      await page.goto(rota, { waitUntil: "domcontentloaded" });
      const cta = page.getByRole("link", { name: /whatsapp/i }).first();
      await expect(cta).toBeVisible();
      const href = (await cta.getAttribute("href")) ?? "";
      expect(href).toContain("wa.me");
      const mensagem = decodeURIComponent(href);
      expect(mensagem.toLowerCase()).not.toContain("curitiba");
    });
  });
}

test("rota de Curitiba continua declarando Curitiba", async ({ page }) => {
  await page.goto("/servicos/conserto-notebook/curitiba", { waitUntil: "domcontentloaded" });
  await expect(page.locator("body")).toContainText(/Curitiba/);
});
