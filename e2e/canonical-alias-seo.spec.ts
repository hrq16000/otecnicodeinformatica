import { test, expect } from "@playwright/test";
import { SITE_URL } from "./site-env";

/**
 * Guarda de SEO: canônicos self-referentes nas rotas internas e alias
 * (termos, PF/PJ, suporte empresarial) apontando para a URL canônica.
 * Evita duplicidade e regressão silenciosa de indexação.
 */

const BASE = SITE_URL;

/** Rotas que devem ter canônico self-referente. */
const SELF_CANONICAL = [
  "/",
  "/servicos",
  "/como-funciona",
  "/precos-e-politicas",
  "/atendimento-domicilio",
  "/atendimento-remoto",
  "/empresa-de-ti-curitiba",
  "/tecnico-informatica-curitiba",
  "/servicos/formatacao",
  "/servicos/suporte-tecnico-empresarial",
];

/** Alias → canônico esperado (não pode ser self-referente). */
const ALIASES: [string, string][] = [
  ["/termos-e-condicoes", "/precos-e-politicas"],
];

/** Rotas que redirecionam (alias PF/PJ herdados). */
const REDIRECTS: [string, string][] = [
  ["/suporte-empresas", "/servicos/suporte-tecnico-empresarial"],
  ["/assistencia-tecnica-empresas-curitiba", "/servicos/suporte-tecnico-empresarial"],
];

const canonicalOf = async (page: import("@playwright/test").Page) =>
  page.locator('link[rel="canonical"]').first().getAttribute("href");

test.describe("canônicos e alias PF/PJ", () => {
  for (const path of SELF_CANONICAL) {
    test(`canônico self-referente em ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      expect(await canonicalOf(page)).toBe(`${BASE}${path === "/" ? "/" : path}`);
      // Nunca pode ficar noindex em rota comercial indexável.
      const robots = await page.locator('meta[name="robots"]').first().getAttribute("content");
      expect(robots ?? "index").not.toContain("noindex");
    });
  }

  for (const [alias, canonical] of ALIASES) {
    test(`alias ${alias} aponta para ${canonical}`, async ({ page }) => {
      await page.goto(alias, { waitUntil: "domcontentloaded" });
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      expect(await canonicalOf(page)).toBe(`${BASE}${canonical}`);
    });
  }

  for (const [from, to] of REDIRECTS) {
    test(`${from} redireciona para ${to}`, async ({ page }) => {
      await page.goto(from, { waitUntil: "domcontentloaded" });
      await expect(page).toHaveURL(new RegExp(`${to.replace(/\//g, "\\/")}$`));
      expect(await canonicalOf(page)).toBe(`${BASE}${to}`);
    });
  }

  test("um único H1 e um único canonical por rota comercial", async ({ page }) => {
    for (const path of SELF_CANONICAL) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.locator("h1"), `h1 em ${path}`).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]'), `canonical em ${path}`).toHaveCount(1);
    }
  });
});
