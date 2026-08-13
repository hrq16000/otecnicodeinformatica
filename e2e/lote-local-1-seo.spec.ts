import { test, expect } from "@playwright/test";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

/**
 * RODADA 5 — contrato SEO do Lote Local 1 (12 URLs).
 *
 * Cada URL é validada em seis dimensões: meta robots, canonical, presença no
 * sitemap, breadcrumbs visíveis, JSON-LD (BreadcrumbList + WebPage/LocalBusiness)
 * e ao menos um link interno para o pai declarado na política.
 */

type Caso = {
  path: string;
  indexavel: boolean;
  canonical: string;
  sitemap: boolean;
  pai: string;
};

const LOTE_LOCAL_1: Caso[] = [
  // Cidades âncora do lote
  { path: "/tecnico-informatica-curitiba", indexavel: true, canonical: "/tecnico-informatica-curitiba", sitemap: true, pai: "/" },
  { path: "/tecnico-informatica-sao-jose-pinhais", indexavel: true, canonical: "/tecnico-informatica-sao-jose-pinhais", sitemap: true, pai: "/" },
  // Bairros âncora
  { path: "/bairros/batel", indexavel: true, canonical: "/bairros/batel", sitemap: true, pai: "/tecnico-informatica-curitiba" },
  { path: "/bairros/cic", indexavel: true, canonical: "/bairros/cic", sitemap: true, pai: "/tecnico-informatica-curitiba" },
  { path: "/bairros/agua-verde", indexavel: true, canonical: "/bairros/agua-verde", sitemap: true, pai: "/tecnico-informatica-curitiba" },
  { path: "/bairros/centro", indexavel: true, canonical: "/bairros/centro", sitemap: true, pai: "/tecnico-informatica-curitiba" },
  { path: "/bairros/portao", indexavel: true, canonical: "/bairros/portao", sitemap: true, pai: "/tecnico-informatica-curitiba" },
  // Serviço × cidade: canonicalizados no serviço-pai (anticanibalização)
  { path: "/servicos/formatacao-computador/curitiba", indexavel: false, canonical: "/servicos/formatacao-computador", sitemap: false, pai: "/servicos/formatacao-computador" },
  { path: "/servicos/remocao-virus/curitiba", indexavel: false, canonical: "/servicos/remocao-virus", sitemap: false, pai: "/servicos/remocao-virus" },
  { path: "/servicos/conserto-notebook/curitiba", indexavel: false, canonical: "/servicos/conserto-pc-notebook", sitemap: false, pai: "/servicos/conserto-pc-notebook" },
  { path: "/servicos/conserto-pc/curitiba", indexavel: false, canonical: "/servicos/conserto-pc-notebook", sitemap: false, pai: "/servicos/conserto-pc-notebook" },
  { path: "/servicos/upgrade-ssd/curitiba", indexavel: false, canonical: "/servicos/upgrade-ssd-memoria", sitemap: false, pai: "/servicos/upgrade-ssd-memoria" },
];

// O contrato de indexação vive no HTML estático publicado (dist), não no
// runtime: a trava VITE_SITE_INDEXING_ENABLED remove canonical/robots no
// preview local. Por isso robots, canonical e JSON-LD são lidos do artefato.
const DIST = process.env.E2E_DIST_DIR ?? "dist";

function lerArtefato(path: string): string | null {
  const clean = path === "/" ? "/index" : path.replace(/\/$/, "");
  for (const candidato of [resolve(DIST, `.${clean}.html`), resolve(DIST, `.${clean}/index.html`)]) {
    if (existsSync(candidato)) return readFileSync(candidato, "utf8");
  }
  return null;
}

let sitemapPaths: Set<string> | null = null;

function carregarSitemap(): Set<string> {
  if (sitemapPaths) return sitemapPaths;
  const paths = new Set<string>();
  const arquivos = existsSync(DIST)
    ? readdirSync(DIST).filter((f) => /^sitemap.*\.xml$/.test(f) && !/images|news|index/.test(f))
    : [];
  for (const arquivo of arquivos) {
    for (const m of readFileSync(resolve(DIST, arquivo), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
      try {
        paths.add(new URL(m[1]).pathname.replace(/\/$/, "") || "/");
      } catch {
        /* ignora loc inválido */
      }
    }
  }
  sitemapPaths = paths;
  return paths;
}

for (const caso of LOTE_LOCAL_1) {
  test(`contrato SEO — ${caso.path}`, async ({ page, baseURL }) => {
    const base = baseURL ?? "http://localhost:8080";

    // Artefato publicado: fonte de verdade do contrato de indexação.
    const html = lerArtefato(caso.path);

    if (!html) {
      // Rota SPA canonicalizada (sem HTML próprio, por decisão da política):
      // o contrato é verificado no documento renderizado.
      expect(caso.indexavel, `${caso.path} é indexável e precisa de HTML estático`).toBe(false);
      await page.goto(caso.path, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle");
      const robotsRuntime = (await page.locator('meta[name="robots"]').first().getAttribute("content")) ?? "";
      expect(/noindex/i.test(robotsRuntime), `${caso.path}: robots "${robotsRuntime}"`).toBe(true);
      const canonicalRuntime = await page.locator('link[rel="canonical"]').first().getAttribute("href");
      if (canonicalRuntime) {
        expect(new URL(canonicalRuntime, base).pathname.replace(/\/$/, "")).toBe(caso.canonical);
      }
      expect(carregarSitemap().has(caso.path), `${caso.path} fora do sitemap`).toBe(false);
      await expect(page.locator(`a[href="${caso.pai}"]`).first()).toHaveCount(1);
      return;
    }

    // 1. meta robots coerente com a política
    const robots = html!.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? "";
    expect(robots, `${caso.path} sem meta robots`).not.toBe("");
    expect(/noindex/i.test(robots), `${caso.path}: robots "${robots}"`).toBe(!caso.indexavel);

    // 2. canonical apontando para o alvo declarado
    const canonical = html!.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1];
    expect(canonical, `${caso.path} sem canonical`).toBeTruthy();
    expect(new URL(canonical!, base).pathname.replace(/\/$/, "") || "/").toBe(caso.canonical);

    // 3. sitemap
    const paths = carregarSitemap();
    expect(paths.has(caso.path.replace(/\/$/, "")), `${caso.path} no sitemap`).toBe(caso.sitemap);

    // 4. JSON-LD com BreadcrumbList e um nó de página/negócio
    const tipos: string[] = [];
    for (const bloco of html!.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        const coleta = (n: unknown): void => {
          if (Array.isArray(n)) return n.forEach(coleta);
          if (n && typeof n === "object") {
            const o = n as Record<string, unknown>;
            if (typeof o["@type"] === "string") tipos.push(o["@type"] as string);
            if (Array.isArray(o["@type"])) tipos.push(...(o["@type"] as string[]));
            if (o["@graph"]) coleta(o["@graph"]);
          }
        };
        coleta(JSON.parse(bloco[1]));
      } catch {
        /* bloco inválido é coberto por outro gate */
      }
    }
    expect(tipos, `${caso.path} sem BreadcrumbList`).toContain("BreadcrumbList");
    expect(
      tipos.some((t) => ["WebPage", "LocalBusiness", "Service", "FAQPage"].includes(t)),
      `${caso.path} sem nó de página (tipos: ${tipos.join(", ")})`,
    ).toBe(true);

    // 5. breadcrumbs visíveis na aplicação renderizada
    await page.goto(caso.path, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    await expect(page.locator('nav[aria-label*="rilha" i], nav[aria-label*="readcrumb" i]').first()).toBeVisible();

    // 6. link interno para o pai declarado
    const linkPai = page.locator(`a[href="${caso.pai}"]`).first();
    await expect(linkPai, `${caso.path} sem link para o pai ${caso.pai}`).toHaveCount(1);
  });
}
