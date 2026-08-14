import { describe, expect, it } from "vitest";
import {
  EXPERIMENTOS_CRO,
  decidirExperimento,
  escolherVariante,
  inventarioProntidao,
  lacunasDeRegistro,
  prontoParaAtivar,
  type ExperimentoCro,
} from "./croRodada7";

const base: ExperimentoCro = {
  id: "teste",
  hipotese: "hipótese",
  rotas: ["/servicos/formatacao/curitiba"],
  cidades: ["curitiba"],
  ativo: true,
  variantes: [
    { id: "controle", rotulo: "Controle", peso: 1 },
    { id: "b", rotulo: "B", peso: 1 },
  ],
  registroFunil: ["page_view", "cta_click", "triage_start", "whatsapp_open", "lead"],
  amostraMinima: 200,
};

describe("croRodada7", () => {
  it("nasce fail-closed: nenhum experimento do registro está ativo", () => {
    expect(EXPERIMENTOS_CRO.every((e) => e.ativo === false)).toBe(true);
  });

  it("bloqueia rota fora do escopo", () => {
    const d = decidirExperimento({ path: "/servicos/formatacao", sessionId: "s1", registro: [base] });
    expect(d).toEqual({ habilitado: false, motivo: "sem_experimento" });
  });

  it("bloqueia cidade fora do escopo, sem fallback para Curitiba", () => {
    const d = decidirExperimento({
      path: "/servicos/formatacao/curitiba",
      cidade: "pinhais",
      sessionId: "s1",
      registro: [base],
    });
    expect(d.habilitado).toBe(false);
  });

  it("bloqueia quando o funil não registra todas as etapas", () => {
    const incompleto = { ...base, registroFunil: ["page_view", "cta_click"] as ExperimentoCro["registroFunil"] };
    const d = decidirExperimento({
      path: "/servicos/formatacao/curitiba",
      cidade: "curitiba",
      sessionId: "s1",
      registro: [incompleto],
    });
    expect(d).toMatchObject({ habilitado: false, motivo: "registro_funil_incompleto" });
    expect(lacunasDeRegistro(incompleto)).toContain("whatsapp_open");
    expect(prontoParaAtivar(incompleto)).toBe(false);
  });

  it("bloqueia toggle desligado mesmo com tudo pronto", () => {
    const d = decidirExperimento({
      path: "/servicos/formatacao/curitiba",
      cidade: "curitiba",
      sessionId: "s1",
      registro: [{ ...base, ativo: false }],
    });
    expect(d).toMatchObject({ habilitado: false, motivo: "toggle_desligado" });
  });

  it("distribui de forma determinística por sessão", () => {
    const a = escolherVariante(base, "sessao-x");
    const b = escolherVariante(base, "sessao-x");
    expect(a?.id).toBe(b?.id);
  });

  it("habilita quando escopo, toggle e registro estão completos", () => {
    const d = decidirExperimento({
      path: "/servicos/formatacao/curitiba",
      cidade: "curitiba",
      sessionId: "s1",
      registro: [base],
    });
    expect(d.habilitado).toBe(true);
  });

  it("inventário expõe lacunas para o painel", () => {
    const inv = inventarioProntidao();
    expect(inv.length).toBeGreaterThan(0);
    expect(inv[0]).toHaveProperty("lacunas");
  });
});
