import { describe, expect, it } from "vitest";
import { canalDoEvento, funilPorCanal } from "./canalAtribuicao";
import { relatorioParaCsv, relatoriosParaHtml } from "./relatorioExport";

describe("canalDoEvento", () => {
  it("classifica Google Ads por source+medium pago", () => {
    expect(canalDoEvento({ utm_source: "google", utm_medium: "cpc" })).toBe("google_ads");
    expect(canalDoEvento({ utm_source: "Google", utm_medium: "paid_search" })).toBe("google_ads");
  });

  it("separa outras mídias pagas", () => {
    expect(canalDoEvento({ utm_source: "meta", utm_medium: "cpc" })).toBe("paid_other");
  });

  it("classifica orgânico e social", () => {
    expect(canalDoEvento({ utm_source: "google", utm_medium: "organic" })).toBe("organic");
    expect(canalDoEvento({ utm_source: "instagram", utm_medium: "" })).toBe("social");
  });

  it("não confunde ausência de dados com tráfego direto", () => {
    expect(canalDoEvento({})).toBe("unknown");
    expect(canalDoEvento({ attribution_channel: "direct" })).toBe("direct");
  });

  it("nunca devolve contexto geográfico", () => {
    const canal = canalDoEvento({ utm_source: "curitiba", utm_medium: "cpc" });
    expect(canal).toBe("paid_other");
  });
});

describe("funilPorCanal", () => {
  const eventos = [
    { event_type: "page_view", session_id: "a", utm_source: "google", utm_medium: "cpc" },
    { event_type: "cta_click", session_id: "a", utm_source: "google", utm_medium: "cpc" },
    { event_type: "wa_click", session_id: "a", utm_source: "google", utm_medium: "cpc" },
    { event_type: "page_view", session_id: "b", utm_medium: "organic" },
  ];

  it("conta sessões distintas por etapa", () => {
    const [ads, organico] = funilPorCanal(eventos);
    expect(ads.canal).toBe("google_ads");
    expect(ads.bucket.sessoes.size).toBe(1);
    expect(ads.bucket.whatsapp.size).toBe(1);
    expect(organico.bucket.whatsapp.size).toBe(0);
  });

  it("zero-state não gera NaN", () => {
    expect(funilPorCanal([])).toEqual([]);
  });
});

describe("exportação de relatórios", () => {
  const rel = {
    titulo: "Conversão por rota",
    periodo: "Últimos 7 dias",
    colunas: ["Chave", "Sessões"],
    linhas: [{ Chave: '/servicos/"x"', "Sessões": 3 }],
  };

  it("gera CSV com aspas escapadas", () => {
    const csv = relatorioParaCsv(rel);
    expect(csv.split("\n")[0]).toBe('"Chave","Sessões"');
    expect(csv).toContain('"/servicos/""x"""');
  });

  it("gera HTML imprimível com escape", () => {
    const html = relatoriosParaHtml([rel], "teste");
    expect(html).toContain("<table>");
    expect(html).not.toContain("<script");
  });

  it("mostra estado vazio sem tabela", () => {
    const html = relatoriosParaHtml([{ ...rel, linhas: [] }]);
    expect(html).toContain("Sem dados no período.");
  });
});

// ── RODADA 8A — separação de tráfego interno/QA ───────────────────────────
describe("canalDoEvento — contaminação interna (Rodada 8A)", () => {
  it("classifica CTA interno do próprio site como internal, nunca direct", () => {
    expect(canalDoEvento({ utm_source: "site", utm_medium: "cta" })).toBe("internal");
    expect(canalDoEvento({ utm_source: "site", utm_medium: "cta_interno" })).toBe("internal");
  });

  it("classifica automações de CI/QA como internal mesmo com canal legado 'ads'", () => {
    expect(canalDoEvento({ utm_source: "ci", utm_medium: "cta", attribution_channel: "ads" })).toBe("internal");
    expect(canalDoEvento({ utm_source: "ga4ci", utm_medium: "cta", attribution_channel: "ads" })).toBe("internal");
  });

  it("normaliza canais legados gravados antes do contrato", () => {
    expect(canalDoEvento({ attribution_channel: "direto" })).toBe("direct");
    expect(canalDoEvento({ utm_source: "google", utm_medium: "cpc", attribution_channel: "ads" })).toBe("google_ads");
  });

  it("mantém aquisição real intacta", () => {
    expect(canalDoEvento({ utm_source: "google", utm_medium: "organic" })).toBe("organic");
    expect(canalDoEvento({ utm_source: "google", utm_medium: "cpc" })).toBe("google_ads");
  });

  it("internal não integra os canais de aquisição", () => {
    expect(ehAquisicao("internal")).toBe(false);
    expect(ehAquisicao("organic")).toBe(true);
  });
});
