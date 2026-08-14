import { describe, expect, it } from "vitest";
import { EXPERIMENTOS_CRO } from "./croRodada7";
import {
  amostraNecessaria,
  calcularReadiness,
  EXPERIMENT_READINESS_POLICY,
  eventoElegivel,
  mdeDetectavel,
  podeAtivar,
  type EventoReadiness,
} from "./experimentReadiness";

const EXP = EXPERIMENTOS_CRO[0];
const ROTA = EXP.rotas[0];
const BASE = "2026-08-20T12:00:00Z";

const ev = (over: Partial<EventoReadiness> = {}): EventoReadiness => ({
  created_at: BASE,
  event_type: "page_view",
  path: ROTA,
  session_id: "s1",
  journey_id: "j1",
  ...over,
});

/** Gera `n` sessões elegíveis distribuídas em `dias`, com `conv` conversões. */
function fixture(n: number, dias: number, conv: number): EventoReadiness[] {
  const out: EventoReadiness[] = [];
  for (let i = 0; i < n; i += 1) {
    const d = String(10 + (i % dias)).padStart(2, "0");
    const created = `2026-08-${d}T12:00:00Z`;
    out.push(ev({ session_id: `s${i}`, created_at: created }));
    if (i < conv) {
      out.push(ev({ session_id: `s${i}`, created_at: created, event_type: "whatsapp_open" }));
    }
  }
  return out;
}

describe("elegibilidade", () => {
  it("exclui sessão sem id", () => {
    expect(eventoElegivel(ev({ session_id: null }), EXP)).toBe(false);
  });
  it("exclui tráfego de QA", () => {
    expect(eventoElegivel(ev({ utm_source: "qa" }), EXP)).toBe(false);
  });
  it("exclui eventos pré-baseline", () => {
    expect(eventoElegivel(ev({ created_at: "2026-08-01T00:00:00Z" }), EXP)).toBe(false);
  });
  it("exclui rota fora do escopo (sem ampliar segmento)", () => {
    expect(eventoElegivel(ev({ path: "/problemas/computador-lento" }), EXP)).toBe(false);
  });
  it("aceita sessão de produção dentro do escopo", () => {
    expect(eventoElegivel(ev(), EXP)).toBe(true);
  });
});

describe("baseline e contagem", () => {
  it("conta sessões, não eventos brutos", () => {
    const r = calcularReadiness({
      eventos: [ev(), ev({ event_type: "cta_click" }), ev({ event_type: "whatsapp_open" })],
    });
    expect(r.baseline.sessoesElegiveis).toBe(1);
    expect(r.baseline.conversoesPrimarias).toBe(1);
  });

  it("registra o percentual de QA excluído", () => {
    const r = calcularReadiness({
      eventos: [ev(), ev({ session_id: "qa1", utm_source: "qa" })],
    });
    expect(r.baseline.sessoesExcluidasQa).toBe(1);
    expect(r.baseline.percentualQa).toBeCloseTo(0.5);
  });

  it("deduplica conversão repetida na mesma sessão", () => {
    const r = calcularReadiness({
      eventos: [ev(), ev({ event_type: "whatsapp_open" }), ev({ event_type: "whatsapp_open" })],
    });
    expect(r.baseline.conversoesPrimarias).toBe(1);
    expect(r.baseline.eventosDuplicados).toBe(1);
  });
});

describe("status e reason codes", () => {
  it("sem dados → NOT_READY", () => {
    const r = calcularReadiness({ eventos: [] });
    expect(r.status).toBe("NOT_READY");
    expect(r.motivos).toContain("INSUFFICIENT_SESSIONS");
    expect(podeAtivar(r)).toBe(false);
  });

  it("dados abaixo do threshold → ACCUMULATING", () => {
    const r = calcularReadiness({ eventos: fixture(40, 7, 10) });
    expect(r.status).toBe("ACCUMULATING");
    expect(r.motivos).toContain("INSUFFICIENT_SESSIONS");
    expect(r.motivos).toContain("INSUFFICIENT_CONVERSIONS");
  });

  it("janela curta bloqueia mesmo com volume", () => {
    const r = calcularReadiness({ eventos: fixture(600, 2, 60) });
    expect(r.motivos).toContain("OBSERVATION_WINDOW_INCOMPLETE");
    expect(r.status).toBe("ACCUMULATING");
  });

  it("amostra completa → READY, sem ativar o experimento", () => {
    const r = calcularReadiness({ eventos: fixture(600, 8, 60) });
    expect(r.status).toBe("READY");
    expect(r.motivos).toHaveLength(0);
    expect(podeAtivar(r)).toBe(true);
    expect(EXPERIMENTOS_CRO[0].ativo).toBe(false);
  });

  it("gate de qualidade vermelho → BLOCKED_DATA_QUALITY", () => {
    const r = calcularReadiness({
      eventos: fixture(600, 8, 60),
      gatesVermelhos: ["analytics-pii"],
    });
    expect(r.status).toBe("BLOCKED_DATA_QUALITY");
    expect(r.motivos).toContain("DATA_QUALITY_FAILURE");
    expect(podeAtivar(r)).toBe(false);
  });

  it("perda de contexto material bloqueia por qualidade", () => {
    const eventos = fixture(600, 8, 60).map((e, i) => (i % 2 === 0 ? { ...e, journey_id: null } : e));
    const r = calcularReadiness({ eventos });
    expect(r.motivos).toContain("CONTEXT_COMPLETENESS_FAILURE");
    expect(r.status).toBe("BLOCKED_DATA_QUALITY");
  });

  it("experimento com menos de 2 variações → BLOCKED_GUARDRAIL", () => {
    const r = calcularReadiness({
      eventos: fixture(600, 8, 60),
      experimento: { ...EXP, variantes: [EXP.variantes[0]] },
    });
    expect(r.status).toBe("BLOCKED_GUARDRAIL");
  });

  it("experimento ligado → RUNNING", () => {
    const r = calcularReadiness({ eventos: fixture(600, 8, 60), experimento: { ...EXP, ativo: true } });
    expect(r.status).toBe("RUNNING");
  });
});

describe("estatística", () => {
  it("amostra necessária cresce quando o MDE diminui", () => {
    const a = amostraNecessaria(0.1, 0.2);
    const b = amostraNecessaria(0.1, 0.1);
    expect(a).toBeGreaterThan(0);
    expect(b as number).toBeGreaterThan(a as number);
  });
  it("MDE detectável cai quando a amostra cresce", () => {
    expect(mdeDetectavel(0.1, 4000) as number).toBeLessThan(mdeDetectavel(0.1, 100) as number);
  });
  it("não inventa precisão sem baseline", () => {
    expect(amostraNecessaria(0, 0.2)).toBeNull();
    expect(mdeDetectavel(0, 100)).toBeNull();
  });
});

describe("versionamento e política", () => {
  it("a política aponta para o Experimento 1 versionado", () => {
    expect(EXPERIMENT_READINESS_POLICY.experimentId).toBe(EXP.id);
    expect(EXPERIMENT_READINESS_POLICY.experimentVersion).toMatch(/^experiment-\d{3}-v\d+$/);
    expect(EXPERIMENT_READINESS_POLICY.unidadeExperimental).toBe("sessao_elegivel");
  });
  it("MDE alvo tem utilidade comercial (não escolhido para caber)", () => {
    expect(EXPERIMENT_READINESS_POLICY.mdeAlvo).toBeLessThanOrEqual(0.3);
  });
});
