import { test, expect } from "@playwright/test";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * RODADA 5C — contrato de schema das páginas serviço × Curitiba promovidas.
 *
 * Valida no HTML estático (dist) que cada página emite Service (provider +
 * areaServed = Curitiba + url self), BreadcrumbList, WebPage e FAQPage quando
 * a página tem FAQ, e que nenhum Offer/LocalBusiness contradiz a política
 * comercial (sem preço literal inventado, sem novo LocalBusiness por serviço).
 */

const DIST = process.env.E2E_DIST_DIR ?? "dist";

const PAGINAS = [
  { path: "/servicos/conserto-notebook/curitiba", parent: "/servicos/manutencao-de-notebook" },
  { path: "/servicos/conserto-pc/curitiba", parent: "/servicos/manutencao-de-computador" },
  { path: "/servicos/redes-wifi/curitiba", parent: "/servicos/redes-e-wifi" },
  { path: "/servicos/backup-recuperacao/curitiba", parent: "/servicos/recuperacao-de-dados" },
];

function lerArtefato(path: string): string | null {
  const clean = path.replace(/\/$/, "");
  for (const candidato of [resolve(DIST, `.${clean}.html`), resolve(DIST, `.${clean}/index.html`)]) {
    if (existsSync(candidato)) return readFileSync(candidato, "utf8");
  }
  return null;
}

function nos(html: string): any[] {
  const out: any[] = [];
  const re = /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1].trim());
      const lista = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of lista) {
        out.push(item);
        if (Array.isArray(item["@graph"])) out.push(...item["@graph"]);
      }
    } catch {
      throw new Error("JSON-LD inválido no artefato estático");
    }
  }
  return out;
}

const tipo = (lista: any[], t: string) =>
  lista.filter((n) => (Array.isArray(n?.["@type"]) ? n["@type"].includes(t) : n?.["@type"] === t));

for (const pagina of PAGINAS) {
  test.describe(`schema serviço × Curitiba — ${pagina.path}`, () => {
    test("emite Service com provider, areaServed e url corretos", () => {
      const html = lerArtefato(pagina.path);
      expect(html, `artefato ausente para ${pagina.path}`).toBeTruthy();
      const grafo = nos(html!);

      const services = tipo(grafo, "Service");
      expect(services.length, "deve existir ao menos um Service").toBeGreaterThan(0);
      const service = services[0];

      expect(service.provider, "Service precisa de provider").toBeTruthy();
      const providerNome =
        typeof service.provider === "string" ? service.provider : service.provider?.name ?? service.provider?.["@id"];
      expect(String(providerNome)).toMatch(/T[ée]cnico|otecnicodeinformatica/i);

      const area = Array.isArray(service.areaServed) ? service.areaServed : [service.areaServed];
      const areaTexto = area
        .map((a: any) => (typeof a === "string" ? a : a?.name ?? ""))
        .join(" ");
      expect(areaTexto).toMatch(/Curitiba/i);

      const url = service.url ?? service.mainEntityOfPage?.["@id"] ?? service.mainEntityOfPage;
      if (url) expect(String(url)).toContain(pagina.path);
      expect(String(service.serviceType ?? service.name ?? "")).not.toHaveLength(0);
    });

    test("emite BreadcrumbList e WebPage; FAQPage quando há FAQ", () => {
      const html = lerArtefato(pagina.path)!;
      const grafo = nos(html);

      const breadcrumb = tipo(grafo, "BreadcrumbList")[0];
      expect(breadcrumb, "BreadcrumbList obrigatório").toBeTruthy();
      expect(Array.isArray(breadcrumb.itemListElement)).toBe(true);
      expect(breadcrumb.itemListElement.length).toBeGreaterThanOrEqual(3);

      expect(tipo(grafo, "WebPage").length, "WebPage obrigatório").toBeGreaterThan(0);

      const temFaqVisivel = /Perguntas frequentes/i.test(html);
      const faqs = tipo(grafo, "FAQPage");
      if (temFaqVisivel) {
        expect(faqs.length, "FAQ visível exige FAQPage").toBeGreaterThan(0);
        expect(faqs[0].mainEntity.length).toBeGreaterThanOrEqual(3);
      }
    });

    test("Offer/LocalBusiness não contradizem a política comercial", () => {
      const html = lerArtefato(pagina.path)!;
      const grafo = nos(html);

      // Nenhum LocalBusiness novo por serviço: a organização é única.
      const negocios = grafo.filter((n) => {
        const t = Array.isArray(n?.["@type"]) ? n["@type"] : [n?.["@type"]];
        return t.some((x: string) => typeof x === "string" && /LocalBusiness|ComputerRepair/i.test(x));
      });
      expect(negocios.length, "no máximo um nó de negócio (grafo institucional)").toBeLessThanOrEqual(1);

      // Offer só pode existir com preço vindo da fonte comercial central.
      const offers = grafo.flatMap((n) => {
        const o = n?.offers;
        return o ? (Array.isArray(o) ? o : [o]) : [];
      });
      for (const offer of offers) {
        expect(offer.priceCurrency ?? "BRL").toBe("BRL");
        const preco = Number(offer.price ?? offer.lowPrice ?? 0);
        expect(preco, "preço do Offer deve ser positivo e real").toBeGreaterThan(0);
      }

      // Nenhuma avaliação inventada.
      expect(html).not.toMatch(/"aggregateRating"/);
    });
  });
}
