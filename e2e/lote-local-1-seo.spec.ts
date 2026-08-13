import { test, expect } from "@playwright/test";

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
  { path: "/bairros/cidade-industrial", indexavel: true, canonical: "/bairros/cidade-industrial", sitemap: true, pai: "/tecnico-informatica-curitiba" },
  { path: "/bairros/agua-verde", indexavel: true, canonical: "/bairros/agua-verde", sitemap: true, pai: "/tecnico-informatica-curitiba" },
  { path: "/bairros/centro", indexavel: true, canonical: "/bairros/centro", sitemap: true, pai: "/tecnico-informatica-curitiba" },
  { path: "/bairros/portao", indexavel: true, canonical: "/bairros/portao", sitemap: true, pai: "/tecnico-informatica-curitiba" },
  // Serviço × cidade: canonicalizados no serviço-pai (anticanibalização)
  { path: "/servicos/manutencao-de-notebook/curitiba", indexavel: false, canonical: "/servicos/manutencao-de-notebook", sitemap: false, pai: "/servicos/manutencao-de-notebook" },
  { path: "/servicos/manutencao-de-computador/curitiba", indexavel: false, canonical: "/servicos/manutencao-de-computador", sitemap: false, pai: "/servicos/manutencao-de-computador" },
  { path: "/servicos/formatacao/curitiba", indexavel: false, canonical: "/servicos/formatacao", sitemap: false, pai: "/servicos/formatacao" },
  { path: "/servicos/remocao-de-virus/curitiba", indexavel: false, canonical: "/servicos/remocao-de-virus", sitemap: false, pai: "/servicos/remocao-de-virus" },
  { path: "/servicos/recuperacao-de-dados/curitiba", indexavel: false, canonical: "/servicos/recuperacao-de-dados", sitemap: false, pai: "/servicos/recuperacao-de-dados" },
];

let sitemapPaths: Set<string> | null = null;

async function carregarSitemap(request: import("@playwright/test").APIRequestContext, baseURL: string) {
  if (sitemapPaths) return sitemapPaths;
  const paths = new Set<string>();
  const indexRes = await request.get(`${baseURL}/sitemap-index.xml`);
  const arquivos = indexRes.ok()
    ? [...(await indexRes.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    : [`${baseURL}/sitemap.xml`];
  for (const arquivo of arquivos) {
    const res = await request.get(arquivo);
    if (!res.ok()) continue;
    for (const m of (await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)) {
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
  test(`contrato SEO — ${caso.path}`, async ({ page, request, baseURL }) => {
    const base = baseURL ?? "http://localhost:8080";
    await page.goto(caso.path, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    // 1. meta robots coerente com a política
    const robots = (await page.locator('meta[name="robots"]').first().getAttribute("content")) ?? "";
    expect(robots, `${caso.path} sem meta robots`).not.toBe("");
    expect(/noindex/i.test(robots), `${caso.path}: robots "${robots}"`).toBe(!caso.indexavel);

    // 2. canonical apontando para o alvo declarado
    const canonical = await page.locator('link[rel="canonical"]').first().getAttribute("href");
    expect(canonical, `${caso.path} sem canonical`).toBeTruthy();
    expect(new URL(canonical!, base).pathname.replace(/\/$/, "") || "/").toBe(caso.canonical);

    // 3. sitemap
    const paths = await carregarSitemap(request, base);
    expect(paths.has(caso.path.replace(/\/$/, "")), `${caso.path} no sitemap`).toBe(caso.sitemap);

    // 4. breadcrumbs visíveis
    await expect(page.locator('nav[aria-label*="rilha" i], nav[aria-label*="readcrumb" i]').first()).toBeVisible();

    // 5. JSON-LD com BreadcrumbList e um nó de página/negócio
    const tipos = await page.evaluate(() => {
      const out: string[] = [];
      const coleta = (n: unknown) => {
        if (Array.isArray(n)) return n.forEach(coleta);
        if (n && typeof n === "object") {
          const o = n as Record<string, unknown>;
          if (typeof o["@type"] === "string") out.push(o["@type"] as string);
          if (Array.isArray(o["@type"])) out.push(...(o["@type"] as string[]));
          if (o["@graph"]) coleta(o["@graph"]);
        }
      };
      document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
        try {
          coleta(JSON.parse(s.textContent || "null"));
        } catch {
          /* bloco inválido é coberto por outro gate */
        }
      });
      return out;
    });
    expect(tipos, `${caso.path} sem BreadcrumbList`).toContain("BreadcrumbList");
    expect(
      tipos.some((t) => ["WebPage", "LocalBusiness", "Service", "FAQPage"].includes(t)),
      `${caso.path} sem nó de página (tipos: ${tipos.join(", ")})`,
    ).toBe(true);

    // 6. link interno para o pai declarado
    const linkPai = page.locator(`a[href="${caso.pai}"], a[href$="${caso.pai}"]`).first();
    await expect(linkPai, `${caso.path} sem link para o pai ${caso.pai}`).toHaveCount(1);
  });
}
