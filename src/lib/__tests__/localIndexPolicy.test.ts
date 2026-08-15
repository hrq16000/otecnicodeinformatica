import { describe, expect, it } from "vitest";
import {
  BAIRROS_ANCORA_SLUGS,
  LOTE_LOCAL_1,
  canonicalFor,
  declaredEntities,
  isNoindex,
  resolveLocal,
} from "@/lib/localIndexPolicy";

describe("localIndexPolicy — regra de ouro", () => {
  it("nunca coloca no sitemap uma entidade não indexável", () => {
    for (const d of declaredEntities()) {
      if (d.indexability !== "index") expect(d.sitemap).toBe(false);
    }
  });

  it("mantém canonical autorreferente em toda entidade indexável", () => {
    for (const d of declaredEntities()) {
      if (d.indexability === "index") expect(d.canonical).toBe(d.path);
    }
  });
});

describe("localIndexPolicy — Lote Local 1", () => {
  it("declara exatamente 12 URLs", () => {
    expect(LOTE_LOCAL_1).toHaveLength(12);
  });

  it("indexa as duas cidades com operação real", () => {
    expect(isNoindex("/tecnico-informatica-curitiba")).toBe(false);
    expect(isNoindex("/tecnico-informatica-sao-jose-pinhais")).toBe(false);
  });

  // RODADA 5E: o Lote 2 promoveu 8 bairros com conteúdo próprio (13 no total).
  it("indexa somente os bairros âncora declarados na política", () => {
    expect(BAIRROS_ANCORA_SLUGS.slice(0, 5)).toEqual(["cic", "batel", "agua-verde", "centro", "portao"]);
    expect(BAIRROS_ANCORA_SLUGS).toContain("santa-felicidade");
    expect(BAIRROS_ANCORA_SLUGS).toContain("guatupe");
    for (const slug of BAIRROS_ANCORA_SLUGS) {
      expect(isNoindex(`/bairros/${slug}`)).toBe(false);
      expect(resolveLocal(`/bairros/${slug}`).sitemap).toBe(true);
    }
    // Xaxim foi promovido na Micro-Rodada Local 1 (conteúdo próprio).
    expect(isNoindex("/bairros/xaxim")).toBe(false);
    expect(resolveLocal("/bairros/xaxim").sitemap).toBe(true);
    // Bairro sem conteúdo próprio segue fora do índice.
    expect(isNoindex("/bairros/bacacheri")).toBe(true);
    expect(resolveLocal("/bairros/bacacheri").sitemap).toBe(false);
  });

  it("canonicaliza serviço × cidade sem intenção local para o serviço-pai real", () => {
    const d = resolveLocal("/servicos/manutencao-preventiva/curitiba");
    expect(d.indexability).toBe("canonicalized");
    expect(d.sitemap).toBe(false);
  });

  it("promove serviço × Curitiba com intenção local própria (Rodada 5C)", () => {
    for (const path of [
      "/servicos/conserto-notebook/curitiba",
      "/servicos/conserto-pc/curitiba",
      "/servicos/redes-wifi/curitiba",
      "/servicos/backup-recuperacao/curitiba",
      "/servicos/formatacao-computador/curitiba",
      "/servicos/remocao-virus/curitiba",
      "/servicos/upgrade-ssd/curitiba",
    ]) {
      const d = resolveLocal(path);
      expect(d.indexability).toBe("index");
      expect(canonicalFor(path)).toBe(path);
      expect(d.sitemap).toBe(true);
    }
  });

});


describe("localIndexPolicy — clusters bloqueados", () => {
  it("mantém /arrumar-pc e /cftv fora do índice", () => {
    expect(isNoindex("/arrumar-pc/sao-paulo")).toBe(true);
    expect(isNoindex("/cftv/curitiba")).toBe(true);
  });

  it("mantém /assistencia-tecnica-curitiba noindex enquanto sobrepõe a landing da cidade", () => {
    expect(isNoindex("/assistencia-tecnica-curitiba")).toBe(true);
  });

  it("normaliza barra final", () => {
    expect(resolveLocal("/bairros/batel/").path).toBe("/bairros/batel");
  });
});
