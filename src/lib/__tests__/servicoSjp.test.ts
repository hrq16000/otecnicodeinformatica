import { describe, expect, it } from "vitest";
import { resolveLocal, canonicalFor, isNoindex } from "../localIndexPolicy";
import { servicoLocal, SERVICO_SJP_PATHS, TODAS_PAGINAS_LOCAIS } from "../servicoCuritibaBlocos";

const SJP = [
  "/servicos/conserto-notebook/sao-jose-dos-pinhais",
  "/servicos/conserto-pc/sao-jose-dos-pinhais",
  "/servicos/redes-wifi/sao-jose-dos-pinhais",
  "/servicos/backup-recuperacao/sao-jose-dos-pinhais",
];

const TOPONIMOS = /(sao jose dos pinhais|sao jose|curitiba|sjp)/g;
const normalizar = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(TOPONIMOS, " ")
    .replace(/\s+/g, " ")
    .trim();

const jaccard = (a: string, b: string, n = 5) => {
  const gram = (t: string) => {
    const tk = t.split(" ").filter(Boolean);
    const s = new Set<string>();
    for (let i = 0; i + n <= tk.length; i += 1) s.add(tk.slice(i, i + n).join(" "));
    return s;
  };
  const A = gram(a);
  const B = gram(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter += 1;
  return inter / (A.size + B.size - inter);
};

const corpo = (path: string) => {
  const p = TODAS_PAGINAS_LOCAIS.find((x) => x.path === path);
  if (!p) throw new Error(`sem conteúdo local para ${path}`);
  return normalizar(
    [p.subtitulo, ...p.blocos.flatMap((b) => [b.titulo, ...b.paragrafos]), ...p.faq.map((f) => `${f.pergunta} ${f.resposta}`)].join(" "),
  );
};

describe("Rodada 5D — serviço × São José dos Pinhais", () => {
  it("promove exatamente as 4 rotas com conteúdo local declarado", () => {
    expect(SERVICO_SJP_PATHS.sort()).toEqual([...SJP].sort());
    for (const path of SJP) {
      const d = resolveLocal(path);
      expect(d.indexability).toBe("index");
      expect(canonicalFor(path)).toBe(path);
      expect(d.sitemap).toBe(true);
      expect(d.parent?.startsWith("/servicos/")).toBe(true);
    }
  });

  it("mantém canonicalizado o serviço × SJP sem conteúdo local", () => {
    const d = resolveLocal("/servicos/conserto-tv/sao-jose-dos-pinhais");
    expect(d.indexability).not.toBe("index");
    expect(d.sitemap).toBe(false);
    expect(isNoindex("/servicos/conserto-tv/sao-jose-dos-pinhais")).toBe(true);
  });

  it("resolve o conteúdo local por cidade e declara a cidade correta (areaServed)", () => {
    for (const path of SJP) {
      const slug = path.split("/")[2];
      const p = servicoLocal(slug, "sao-jose-dos-pinhais");
      expect(p).not.toBeNull();
      expect(p?.cidadeNome).toBe("São José dos Pinhais");
      expect(p?.cidadeSlug).toBe("sao-jose-dos-pinhais");
    }
    expect(servicoLocal("conserto-notebook", "araucaria")).toBeNull();
  });

  it("não repete a intenção nem a metadata da versão de Curitiba", () => {
    for (const path of SJP) {
      const slug = path.split("/")[2];
      const sjp = servicoLocal(slug, "sao-jose-dos-pinhais");
      const ctb = servicoLocal(slug, "curitiba");
      if (!sjp || !ctb) continue;
      expect(sjp.intentLocal).not.toBe(ctb.intentLocal);
      expect(normalizar(sjp.title)).not.toBe(normalizar(ctb.title));
      expect(normalizar(sjp.description)).not.toBe(normalizar(ctb.description));
      // H1 local pode seguir "<serviço> em <cidade>" — a diferença exigida está
      // no corpo, na intenção e na metadata, verificadas nos demais casos.
      expect(sjp.h1).not.toBe(ctb.h1);
    }
  });

  it("mantém a similaridade Curitiba × SJP abaixo do teto, com topônimos removidos", () => {
    for (const path of SJP) {
      const slug = path.split("/")[2];
      const outra = `/servicos/${slug}/curitiba`;
      expect(jaccard(corpo(path), corpo(outra))).toBeLessThan(0.45);
    }
  });

  it("mantém originalidade entre os serviços de SJP", () => {
    for (let i = 0; i < SJP.length; i += 1) {
      for (let j = i + 1; j < SJP.length; j += 1) {
        expect(jaccard(corpo(SJP[i]), corpo(SJP[j]))).toBeLessThan(0.45);
      }
    }
  });

  it("aponta interlink obrigatório para o serviço-pai e para a landing da cidade", () => {
    for (const path of SJP) {
      const p = TODAS_PAGINAS_LOCAIS.find((x) => x.path === path)!;
      expect(p.interlinks).toContain(p.parent);
      expect(p.interlinks).toContain("/tecnico-informatica-sao-jose-pinhais");
    }
  });
});
