import { describe, it, expect } from "vitest";
import {
  DECISOES_4C,
  canonicalDecidido,
  alvosCanonical4c,
  canonicosPendentes4c,
} from "../problemDecisions4c";
import { temSufixoLocal } from "../problemIntentPolicy";
import {
  projetarEventoClique,
  CAMPOS_CLIQUE_PROIBIDOS,
  CAMPOS_CLIQUE_PERMITIDOS,
} from "../realtimeSafeFields";

describe("Rodada 4C — decisões das páginas em reavaliar", () => {
  it("cobre exatamente as 21 URLs herdadas e sem duplicatas", () => {
    expect(DECISOES_4C).toHaveLength(21);
    expect(new Set(DECISOES_4C.map((d) => d.url)).size).toBe(21);
  });

  it("toda URL decidida tem sufixo local (nenhuma canônica foi despublicada)", () => {
    for (const d of DECISOES_4C) expect(temSufixoLocal(d.url)).toBe(true);
  });

  it("nenhum alvo de canonical tem sufixo local nem cria cadeia", () => {
    const decididas = new Set(DECISOES_4C.map((d) => d.url));
    for (const alvo of alvosCanonical4c()) {
      expect(temSufixoLocal(alvo)).toBe(false);
      expect(decididas.has(alvo)).toBe(false);
    }
  });

  it("canonicalDecidido devolve o alvo para consolidadas e self para as demais", () => {
    expect(canonicalDecidido("/problemas/notebook-esquentando-muito-curitiba")).toBe(
      "/problemas/computador-esquentando",
    );
    expect(canonicalDecidido("/problemas/computador-nao-liga-curitiba")).toBe(
      "/problemas/computador-nao-liga-curitiba",
    );
    expect(canonicalDecidido("/problemas/computador-lento")).toBe("/problemas/computador-lento");
  });

  it("reposicionadas apontam para canônicos limpos a criar no Lote 2", () => {
    for (const alvo of canonicosPendentes4c()) {
      expect(alvo.startsWith("/problemas/")).toBe(true);
      expect(temSufixoLocal(alvo)).toBe(false);
    }
  });
});

describe("Rodada 4C — sanitização do broadcast de telemetria", () => {
  it("descarta campos proibidos e desconhecidos", () => {
    const bruto: Record<string, unknown> = {
      created_at: "2026-08-14T10:00:00Z",
      event_type: "wa_click",
      path: "/problemas/computador-lento",
      bairro: "Batel",
      cidade: "Curitiba",
      problema: "texto livre do usuário",
      viewport_width: 412,
      qualquer_coisa: 1,
    };
    const limpo = projetarEventoClique<Record<string, unknown>>(bruto);
    for (const proibido of CAMPOS_CLIQUE_PROIBIDOS) {
      expect(limpo[proibido]).toBeUndefined();
    }
    expect(limpo.qualquer_coisa).toBeUndefined();
    expect(limpo.event_type).toBe("wa_click");
    expect(limpo.path).toBe("/problemas/computador-lento");
  });

  it("não inventa chaves ausentes", () => {
    const limpo = projetarEventoClique<Record<string, unknown>>({ event_type: "wa_click" });
    expect(Object.keys(limpo)).toEqual(["event_type"]);
    expect(CAMPOS_CLIQUE_PERMITIDOS).toContain("event_type");
  });

  it("tolera payload nulo", () => {
    expect(projetarEventoClique(null)).toEqual({});
  });
});
