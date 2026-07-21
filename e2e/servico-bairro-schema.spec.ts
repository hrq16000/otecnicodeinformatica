import { test, expect } from "@playwright/test";

// ─────────────────────────────────────────────────────────────
// VALIDAÇÃO DE SCHEMA POR ROTA /servicos/{servico}/{bairro}
//
// Para cada bairro indexável (Wi-Fi e Manutenção de TV Smart) confere que
// a página renderiza:
//   1. <link rel="canonical"> apontando para https://tecnico.curitiba.br
//      no path esperado (sem trailing slash).
//   2. Um bloco JSON-LD @graph contendo obrigatoriamente:
//      - LocalBusiness (com @id "…/#localbusiness")
//      - Service (com @id "<canonical>#service", offers.price coerente)
//      - FAQPage (com mainEntity não vazio)
//   3. Ausência de aggregateRating (política do projeto).
//
// Fail-closed: qualquer bairro que perder um dos três tipos de schema
// quebra a suíte, mesmo se a página renderizar visualmente.
// ─────────────────────────────────────────────────────────────

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:4173";
const SITE = "https://tecnico.curitiba.br";

const BAIRROS = [
  "batel", "centro", "agua-verde", "cic", "portao", "bigorrilho",
  "cabral", "santa-felicidade", "boa-vista", "cristo-rei", "cajuru", "boqueirao",
];

const SERVICOS = [
  { slug: "redes-wifi", precoEsperado: "99.99" },
  { slug: "manutencao-tv", precoEsperado: "299.99" },
] as const;

for (const svc of SERVICOS) {
  for (const bairro of BAIRROS) {
    const path = `/servicos/${svc.slug}/${bairro}`;
    test(`schema válido em ${path}`, async ({ page }) => {
      await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });

      // ── Canonical
      const canonical = await page
        .locator('link[rel="canonical"][data-canonical-servico-bairro]')
        .first()
        .getAttribute("href");
      expect(canonical, "canonical presente").toBe(`${SITE}${path}`);

      // ── JSON-LD @graph
      const blocks = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      expect(blocks.length, "ao menos 1 bloco JSON-LD").toBeGreaterThan(0);

      const parsed = blocks.map((raw) => {
        try {
          return JSON.parse(raw);
        } catch (err) {
          throw new Error(`JSON-LD inválido em ${path}: ${(err as Error).message}`);
        }
      });

      // Coleta entidades: expande @graph e itens de topo
      const entities: Array<Record<string, unknown>> = [];
      for (const p of parsed) {
        const list = Array.isArray(p) ? p : [p];
        for (const item of list) {
          if (item && typeof item === "object") {
            if (Array.isArray((item as any)["@graph"])) {
              entities.push(...((item as any)["@graph"] as any[]));
            } else {
              entities.push(item as Record<string, unknown>);
            }
          }
        }
      }

      const byType = (t: string) =>
        entities.filter((e) => {
          const raw = e["@type"];
          return Array.isArray(raw) ? raw.includes(t) : raw === t;
        });

      // LocalBusiness
      const lb = byType("LocalBusiness");
      expect(lb.length, "LocalBusiness presente").toBeGreaterThan(0);
      expect(lb[0]["@id"], "LocalBusiness @id ancorado").toBe(`${SITE}/#localbusiness`);

      // Service
      const svcEntities = byType("Service");
      expect(svcEntities.length, "Service presente").toBeGreaterThan(0);
      const service = svcEntities[0] as any;
      expect(service["@id"], "Service @id auto-referente").toBe(`${SITE}${path}#service`);
      expect(service.url, "Service.url canonical").toBe(`${SITE}${path}`);
      expect(service.offers?.price, "Offer.price coerente").toBe(svc.precoEsperado);
      expect(service.offers?.priceCurrency).toBe("BRL");

      // FAQPage
      const faq = byType("FAQPage");
      expect(faq.length, "FAQPage presente").toBeGreaterThan(0);
      const mainEntity = (faq[0] as any).mainEntity;
      expect(Array.isArray(mainEntity) && mainEntity.length > 0, "FAQPage com perguntas").toBe(true);

      // aggregateRating proibido
      const hasRating = entities.some((e) => "aggregateRating" in e || (Array.isArray(e["@type"]) ? e["@type"].includes("AggregateRating") : e["@type"] === "AggregateRating"));
      expect(hasRating, "aggregateRating inventado proibido").toBe(false);
    });
  }
}
