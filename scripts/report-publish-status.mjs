#!/usr/bin/env node
/**
 * STATUS DE PUBLICAÇÃO POR URL (fonte do painel /admin/publicacao).
 *
 * Consolida, para cada URL curada, os sinais que decidem se ela pode entrar
 * na próxima onda de publicação:
 *   - rascunho: existe conteúdo estático próprio (H1/meta/blocos)?
 *   - checklist: title/description presentes, tamanho dentro do limite
 *   - fotos: resultado de scripts/check-real-images.mjs (presença + exclusividade)
 *   - originalidade: similaridade com as demais URLs do mesmo grupo
 *   - pronto para sitemap: todos os itens acima OK
 *
 * Saída: public/publish-status.json (lido pelo painel) + resumo no console.
 * Nunca derruba o build — é um relatório de decisão editorial.
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { CURATED_PATHS, BASE_URL } from "./lib/curated-urls.mjs";
import { CURATED_ROUTES } from "./curated-routes-meta.mjs";

const json = (f, fallback = null) => {
  try {
    return JSON.parse(readFileSync(f, "utf8"));
  } catch {
    return fallback;
  }
};

const imagens = json("reports/real-images.json", { itens: [] });
const imagemPorPath = new Map(imagens.itens.map((i) => [i.path, i]));

const grupoDe = (path) => {
  if (path === "/") return "home";
  const [, primeiro] = path.split("/");
  return primeiro || "home";
};

/** Similaridade simples por bag-of-words entre descrições do mesmo grupo. */
const tokens = (s) =>
  new Set(
    String(s || "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3),
  );
const jaccard = (a, b) => {
  const inter = [...a].filter((w) => b.has(w)).length;
  const uniao = new Set([...a, ...b]).size;
  return uniao ? inter / uniao : 0;
};

const metaPorPath = new Map(CURATED_ROUTES.map((r) => [r.path, r]));

const metas = CURATED_PATHS.map((path) => {
  const meta = metaPorPath.get(path) ?? {};
  return {
    path,
    title: meta.title ?? "",
    description: meta.description ?? "",
    temBlocos: Array.isArray(meta.blocos) && meta.blocos.length > 0,
  };
});

const registros = metas.map((m) => {
  const grupo = grupoDe(m.path);
  const tk = tokens(`${m.title} ${m.description}`);
  const pares = metas
    .filter((o) => o.path !== m.path && grupoDe(o.path) === grupo)
    .map((o) => jaccard(tk, tokens(`${o.title} ${o.description}`)));
  const similaridade = pares.length ? Math.max(...pares) : 0;

  const foto = imagemPorPath.get(m.path) ?? null;
  const precisaFoto = grupo === "problemas" || grupo === "bairros";

  const checklist = {
    rascunho: Boolean(m.title && m.description),
    conteudo: m.temBlocos,
    metaTitle: m.title.length > 0 && m.title.length <= 65,
    metaDescription: m.description.length >= 80 && m.description.length <= 165,
    fotos: !precisaFoto || Boolean(foto && foto.status === "ok" && foto.exclusiva),
    originalidade: similaridade < 0.6,
  };

  const pendencias = Object.entries(checklist)
    .filter(([, ok]) => !ok)
    .map(([k]) => k);

  return {
    path,
    url: `${BASE_URL}${path === "/" ? "/" : path}`,
    grupo,
    title: m.title,
    description: m.description,
    similaridade: Number(similaridade.toFixed(2)),
    foto: foto ? { src: foto.src ?? null, status: foto.status, exclusiva: foto.exclusiva } : null,
    checklist,
    pendencias,
    estado: pendencias.length === 0 ? "pronto" : pendencias.length <= 1 ? "revisao" : "rascunho",
  };
});

const relatorio = {
  generatedAt: new Date().toISOString(),
  base: BASE_URL,
  total: registros.length,
  prontos: registros.filter((r) => r.estado === "pronto").length,
  revisao: registros.filter((r) => r.estado === "revisao").length,
  rascunho: registros.filter((r) => r.estado === "rascunho").length,
  urls: registros,
};

mkdirSync("public", { recursive: true });
writeFileSync("public/publish-status.json", `${JSON.stringify(relatorio, null, 2)}\n`);
mkdirSync("reports", { recursive: true });
writeFileSync("reports/publish-status.json", `${JSON.stringify(relatorio, null, 2)}\n`);

console.log(
  `Status de publicação: ${relatorio.prontos} prontos · ${relatorio.revisao} em revisão · ${relatorio.rascunho} rascunho (de ${relatorio.total})`,
);
for (const r of registros.filter((x) => x.estado !== "pronto").slice(0, 15)) {
  console.log(`  · ${r.path} → ${r.pendencias.join(", ")}`);
}
if (!existsSync("reports/real-images.json")) {
  console.log("  (dica: rode `npm run check:real-images` antes para avaliar as fotos)");
}
