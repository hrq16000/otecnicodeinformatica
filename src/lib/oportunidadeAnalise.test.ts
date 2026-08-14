import { describe, expect, it } from "vitest";
import { analisarOportunidades, cidadeDaRota, formatarTaxa, LIMIARES } from "./oportunidadeAnalise";

const evento = (i: number, tipo: string, path: string, extra: Record<string, unknown> = {}) => ({
  created_at: new Date(2026, 7, 10, 12, 0, i).toISOString(),
  event_type: tipo,
  path,
  session_id: `s${i}`,
  ...extra,
});

describe("oportunidadeAnalise", () => {
  it("marca low_evidence quando a amostra é pequena", () => {
    const rows = [evento(1, "page_view", "/servicos/formatacao/curitiba")];
    const rota = analisarOportunidades(rows).find((r) => r.dimensao === "rota");
    expect(rota?.classe).toBe("low_evidence");
  });

  it("classifica expand_candidate acima do alvo e improve_page abaixo", () => {
    const rows = [];
    for (let i = 0; i < 40; i += 1) {
      rows.push(evento(i, "page_view", "/servicos/formatacao/curitiba"));
      if (i < 8) rows.push(evento(i, "whatsapp_open", "/servicos/formatacao/curitiba"));
      rows.push(evento(100 + i, "page_view", "/servicos/limpeza/curitiba"));
      if (100 + i < 101) rows.push(evento(100 + i, "whatsapp_open", "/servicos/limpeza/curitiba"));
    }
    const rec = analisarOportunidades(rows);
    expect(rec.find((r) => r.chave === "/servicos/formatacao/curitiba")?.classe).toBe("expand_candidate");
    expect(rec.find((r) => r.chave === "/servicos/limpeza/curitiba")?.classe).toBe("improve_page");
    expect(LIMIARES.amostraMinima).toBe(30);
  });

  it("não inventa cidade em rota global", () => {
    expect(cidadeDaRota("/problemas/notebook-nao-liga")).toBeUndefined();
    expect(cidadeDaRota("/servicos/formatacao/sao-jose-dos-pinhais")).toBe("sao-jose-dos-pinhais");
    const rec = analisarOportunidades([evento(1, "page_view", "/problemas/notebook-nao-liga")]);
    expect(rec.some((r) => r.dimensao === "cidade")).toBe(false);
  });

  it("conta sessões distintas (duplo clique não infla)", () => {
    const rows = [
      evento(1, "page_view", "/a"),
      { ...evento(1, "whatsapp_open", "/a"), session_id: "s1" },
      { ...evento(2, "whatsapp_open", "/a"), session_id: "s1" },
    ];
    const rota = analisarOportunidades(rows).find((r) => r.dimensao === "rota");
    expect(rota?.whatsapp).toBe(1);
  });

  it("zero-state seguro em taxas", () => {
    expect(formatarTaxa(null)).toBe("—");
    expect(formatarTaxa(0)).toBe("0.0%");
  });
});
