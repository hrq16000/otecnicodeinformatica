import { describe, it, expect } from "vitest";
import {
  MODALIDADES,
  REGRA_CANCELAMENTO,
  NOTA_VISITA_AVULSA,
  VALOR_VISITA_LABEL,
  VALOR_PACOTE_2H_LABEL,
  VALOR_COLETA_MINIMO_LABEL,
} from "./precosConfig";

/**
 * Blindagem comercial: qualquer alteração de valor/condição quebra estes testes.
 */
describe("precosConfig — sem margem de erro", () => {
  it("mantém exatamente as três modalidades canônicas", () => {
    expect(MODALIDADES.map((m) => m.id)).toEqual(["visita-avulsa", "pacote-2h", "coleta-diagnostico"]);
  });

  it("mantém os valores oficiais", () => {
    expect(VALOR_VISITA_LABEL).toBe("R$ 99,99");
    expect(VALOR_PACOTE_2H_LABEL).toBe("R$ 279,99");
    expect(VALOR_COLETA_MINIMO_LABEL).toBe("R$ 299,99");
    expect(MODALIDADES[0].valorLabel).toBe("A partir de R$ 99,99");
    expect(MODALIDADES[0].unidade).toContain("30 minutos");
    expect(MODALIDADES[1].valorLabel).toBe("R$ 279,99");
    expect(MODALIDADES[1].unidade).toContain("2 horas");
    expect(MODALIDADES[2].valorLabel).toBe("Mínimo pré-aprovado R$ 299,99");
    expect(MODALIDADES[2].unidade).toContain("Coleta e entrega".toLowerCase());
  });

  it("declara cancelamento de 24 horas corridas após a coleta", () => {
    expect(REGRA_CANCELAMENTO).toMatch(/24 horas corridas após a coleta/);
    expect(REGRA_CANCELAMENTO).toMatch(/não é compatível/);
    expect(MODALIDADES[2].detalhes.join(" ")).toMatch(/24 horas/);
  });

  it("informa que peças não estão inclusas em todas as modalidades", () => {
    for (const m of MODALIDADES) {
      expect(m.detalhes.join(" ").toLowerCase()).toMatch(/peças/);
      expect(m.detalhes.join(" ").toLowerCase()).toMatch(/não (estão inclus|inclui)/);
    }
    expect(NOTA_VISITA_AVULSA).toMatch(/sem compromisso/);
    expect(NOTA_VISITA_AVULSA).toMatch(/R\$ 99,99/);
  });

  it("nunca promete prazo ou solução garantida", () => {
    const texto = JSON.stringify(MODALIDADES).toLowerCase();
    for (const proibido of ["mesmo dia", "garantia de solução", "resolvemos em", "orçamento"]) {
      expect(texto).not.toContain(proibido);
    }
  });
});
