/**
 * RODADA 8H — contrato de status da distribuição operacional.
 * O que importa aqui: PUBLISHED sem prova não sobrevive.
 */
import { describe, expect, it } from "vitest";
import {
  estadoDistribuicao,
  matrizOperacional,
  normalizarStatus,
  publicacoesPorCanal,
} from "@/lib/distribuicaoOperacional";

describe("status de distribuição", () => {
  it("rebaixa PUBLISHED sem published_at para READY", () => {
    const r = normalizarStatus({ status: "PUBLISHED", published_at: null });
    expect(r.status).toBe("READY");
    expect(r.motivo).toMatch(/published_at/);
  });

  it("aceita PUBLISHED com data ISO", () => {
    expect(normalizarStatus({ status: "PUBLISHED", published_at: "2026-08-14" }).status).toBe("PUBLISHED");
  });

  it("bloqueia status fora do contrato", () => {
    expect(normalizarStatus({ status: "no ar", published_at: null }).status).toBe("BLOCKED");
  });

  it("preserva READY e SCHEDULED", () => {
    expect(normalizarStatus({ status: "READY" }).status).toBe("READY");
    expect(normalizarStatus({ status: "SCHEDULED" }).status).toBe("SCHEDULED");
  });
});

describe("matriz operacional do Cluster 1", () => {
  const linhas = matrizOperacional();

  it("cobre as 9 combinações pauta × canal com link rastreável", () => {
    expect(linhas).toHaveLength(9);
    for (const l of linhas) {
      expect(l.url).toContain("utm_source=");
      expect(l.url).toContain("utm_content=");
    }
  });

  it("não declara publicação sem prova", () => {
    expect(publicacoesPorCanal(linhas)).toEqual({ gbp: 0, facebook: 0, instagram: 0 });
    expect(estadoDistribuicao(linhas)).toBe("PRONTO_PARA_PUBLICAR");
  });

  it("aponta apenas para landings da coorte", () => {
    for (const l of linhas) expect(l.landing.startsWith("/")).toBe(true);
  });
});
