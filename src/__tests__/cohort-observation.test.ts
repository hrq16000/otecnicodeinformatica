import { describe, expect, it } from "vitest";
import {
  buildCohortRow,
  clusterStatus,
  cohortState,
  decideCluster,
  frozenCohort,
  intentMatch,
  intentVerdict,
  newMilestones,
  reachedMilestones,
  reasonCode,
  technicalRegressions,
  type UrlSignals,
} from "@/lib/cohortObservation";
import { CONTENT_COHORT, COHORT_URLS, cohortDrift } from "@/lib/contentCohort";

const tecnicoOk = {
  rota200: true,
  noSitemap: true,
  selfCanonical: true,
  indexavel: true,
  linksInternos: 3,
  clickDepth: 1,
};

const sinais = (over: Partial<UrlSignals> = {}): UrlSignals => ({
  url: "/blog/quanto-custa-formatar-um-computador",
  intent: "commercial",
  publishedAt: "2026-08-14",
  ageDays: 2,
  discovery: "UNKNOWN",
  impressions: null,
  clicks: null,
  sessions: null,
  ctaClicks: null,
  whatsapp: null,
  assists: null,
  tecnico: { ...tecnicoOk },
  ...over,
});

describe("coorte congelada", () => {
  it("contém exatamente as URLs do Cluster 1 e nenhuma extra", () => {
    expect(COHORT_URLS).toHaveLength(4);
    expect(new Set(COHORT_URLS).size).toBe(4);
    expect(cohortDrift().extras).toEqual([]);
  });

  it("expõe idade calculada sem alterar a coorte", () => {
    const congelada = frozenCohort(new Date("2026-08-20T12:00:00Z"));
    expect(congelada).toHaveLength(CONTENT_COHORT.length);
    expect(congelada[0].ageDays).toBe(6);
    expect(congelada[0].faixaIdade).toBe("0-7");
  });
});

describe("estados e reason codes", () => {
  it("sem fonte conectada o estado é UNKNOWN, nunca NOT_INDEXED", () => {
    const s = sinais();
    expect(cohortState(s)).toBe("UNKNOWN");
    expect(reasonCode(s)).toBe("NEW_CONTENT");
  });

  it("URL antiga e desconhecida deixa de ser NEW_CONTENT", () => {
    expect(reasonCode(sinais({ ageDays: 45 }))).toBe("UNKNOWN_TO_GOOGLE");
  });

  it("indexada sem impressão não é acusada de conteúdo ruim", () => {
    expect(reasonCode(sinais({ discovery: "INDEXED", impressions: 0 }))).toBe("INDEXED_NO_IMPRESSIONS");
  });

  it("sobe o estado somente até onde há evidência", () => {
    expect(cohortState(sinais({ discovery: "INDEXED", impressions: 12 }))).toBe("IMPRESSIONS");
    expect(cohortState(sinais({ discovery: "INDEXED", impressions: 12, clicks: 1 }))).toBe("CLICKS");
    expect(cohortState(sinais({ discovery: "INDEXED", impressions: 12, clicks: 1, sessions: 1 }))).toBe("SESSIONS");
    expect(cohortState(sinais({ assists: 1 }))).toBe("COMMERCIAL_ASSIST");
  });

  it("regressão técnica tem precedência sobre qualquer métrica", () => {
    const s = sinais({ discovery: "INDEXED", impressions: 500, tecnico: { ...tecnicoOk, indexavel: false } });
    expect(technicalRegressions(s.tecnico)).toContain("NOINDEX");
    expect(reasonCode(s)).toBe("TECHNICAL_REGRESSION");
  });

  it("órfã e profundidade excessiva são regressões", () => {
    expect(technicalRegressions({ ...tecnicoOk, linksInternos: 1 })).toContain("ORPHAN");
    expect(technicalRegressions({ ...tecnicoOk, clickDepth: 6 })).toContain("DEPTH_REGRESSION");
    expect(technicalRegressions({ ...tecnicoOk, clickDepth: null })).toEqual([]);
  });

  it("monta a linha do painel com faixa de idade e evidência de CTR", () => {
    const row = buildCohortRow(sinais({ discovery: "INDEXED", impressions: 0 }));
    expect(row.evidenciaCtr).toBe("NO_DATA");
    expect(row.regressoes).toEqual([]);
  });
});

describe("status do cluster", () => {
  it("sem nenhum sinal o cluster está apenas OBSERVING", () => {
    expect(clusterStatus([sinais(), sinais()])).toBe("OBSERVING");
  });

  it("evolui conforme os dados reais", () => {
    expect(clusterStatus([sinais({ discovery: "DISCOVERED" })])).toBe("DISCOVERY_IN_PROGRESS");
    expect(clusterStatus([sinais({ discovery: "INDEXED" })])).toBe("INDEXATION_IN_PROGRESS");
    expect(clusterStatus([sinais({ discovery: "INDEXED", impressions: 5 })])).toBe("GETTING_IMPRESSIONS");
    expect(clusterStatus([sinais({ discovery: "INDEXED", impressions: 5, clicks: 1 })])).toBe("GETTING_TRAFFIC");
    expect(clusterStatus([sinais({ assists: 1, sessions: 3 })])).toBe("SHOWING_COMMERCIAL_SIGNAL");
    expect(clusterStatus([sinais({ assists: 2, sessions: 40 })])).toBe("ACTIONABLE");
  });
});

describe("intenção observada", () => {
  it("classifica match, parcial e fora de intenção", () => {
    expect(intentMatch("commercial", "commercial")).toBe("MATCH");
    expect(intentMatch("commercial", "local_commercial")).toBe("PARTIAL_MATCH");
    expect(intentMatch("commercial", "informational")).toBe("OFF_INTENT");
    expect(intentMatch("commercial", null)).toBe("UNKNOWN");
  });

  it("não julga intenção com uma consulta isolada", () => {
    expect(intentVerdict("commercial", [{ intencaoObservada: "informational" }]).veredito).toBe("UNKNOWN");
  });

  it("julga a partir de amostra suficiente", () => {
    const off = Array.from({ length: 25 }, () => ({ intencaoObservada: "informational" }));
    expect(intentVerdict("commercial", off).veredito).toBe("OFF_INTENT");
    const ok = Array.from({ length: 25 }, () => ({ intencaoObservada: "commercial" }));
    expect(intentVerdict("commercial", ok).veredito).toBe("MATCH");
  });
});

describe("milestones", () => {
  it("só reconhece o que aconteceu de verdade", () => {
    expect(reachedMilestones([sinais()])).toEqual([]);
    expect(reachedMilestones([sinais({ discovery: "INDEXED" })])).toEqual(["FIRST_DISCOVERY", "FIRST_INDEXATION"]);
  });

  it("não repete milestone já registrado", () => {
    const urls = [sinais({ discovery: "INDEXED", impressions: 3 })];
    const timeline = { FIRST_DISCOVERY: "2026-08-15", FIRST_INDEXATION: "2026-08-16" };
    expect(newMilestones(timeline, urls)).toEqual(["FIRST_IMPRESSION"]);
    expect(newMilestones({ ...timeline, FIRST_IMPRESSION: "2026-08-18" }, urls)).toEqual([]);
  });
});

describe("decisão do cluster", () => {
  it("baixa amostra mantém OBSERVE", () => {
    const r = decideCluster({ urls: [sinais(), sinais({ url: "/servicos/formatacao" })] });
    expect(r.decision).toBe("OBSERVE");
    expect(r.evidencia.indexadas).toBe(0);
  });

  it("uma sessão com WhatsApp ainda é LOW_EVIDENCE, não CRO", () => {
    const r = decideCluster({ urls: [sinais({ discovery: "INDEXED", impressions: 20, clicks: 1, sessions: 1, whatsapp: 1 })], croReady: true });
    expect(r.decision).not.toBe("CRO_ELIGIBLE");
  });

  it("regressão técnica vence qualquer outra decisão", () => {
    const r = decideCluster({
      urls: [sinais({ discovery: "INDEXED", impressions: 900, tecnico: { ...tecnicoOk, rota200: false } })],
    });
    expect(r.decision).toBe("TECHNICAL_FIX");
  });

  it("impressões suficientes sem clique liberam CTR_OPTIMIZATION", () => {
    const r = decideCluster({ urls: [sinais({ discovery: "INDEXED", impressions: 400, clicks: 0 })] });
    expect(r.decision).toBe("CTR_OPTIMIZATION");
  });

  it("divergência de intenção com amostra real pede revisão", () => {
    const r = decideCluster({
      urls: [sinais({ discovery: "INDEXED", impressions: 100, clicks: 4 })],
      intent: { veredito: "OFF_INTENT", amostra: 30 },
    });
    expect(r.decision).toBe("CONTENT_INTENT_REVIEW");
  });

  it("expansão exige cluster inteiro indexado com impressões e cliques", () => {
    const urls = COHORT_URLS.map((url) => sinais({ url, discovery: "INDEXED", impressions: 50, clicks: 2 }));
    expect(decideCluster({ urls }).decision).toBe("EXPANSION_CANDIDATE");
    urls[0].discovery = "CRAWLED";
    expect(decideCluster({ urls }).decision).toBe("OBSERVE");
  });

  it("tempo sozinho nunca autoriza expansão", () => {
    const urls = COHORT_URLS.map((url) => sinais({ url, ageDays: 120 }));
    expect(decideCluster({ urls }).decision).toBe("OBSERVE");
  });
});
