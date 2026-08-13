// ─────────────────────────────────────────────────────────────
// ESPELHO DE BUILD — POLÍTICA LOCAL (Rodada 5).
// Lê exatamente o mesmo JSON consumido pelo runtime
// (src/lib/localIndexPolicy.json). Nenhum gate mantém lista própria.
// ─────────────────────────────────────────────────────────────
import { readFileSync } from "node:fs";
import { join } from "node:path";

const data = JSON.parse(
  readFileSync(join(process.cwd(), "src/lib/localIndexPolicy.json"), "utf8"),
);

export const ENTIDADES = data.entities;
export const BAIRROS_ANCORA = data.bairrosAncora.map((b) => b.slug);
export const SERVICO_BAIRRO_INDEXAVEIS = data.servicoBairroIndexaveis;
export const LOTE_LOCAL_1 = data.loteLocal1;
export const PREFIXOS_NAO_INDEXAVEIS = data.prefixosNaoIndexaveis;

const normalize = (p) => (p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p) || "/";
const byPath = new Map(ENTIDADES.map((e) => [e.path, e]));

/** Família da rota, inferida quando não declarada. */
export function familia(path) {
  const p = normalize(path);
  if (p === "/") return "HOME";
  if (p.startsWith("/bairros/")) return "BAIRRO";
  if (/^\/tecnico-informatica-[a-z-]+$/.test(p)) return "CIDADE";
  const svc = p.match(/^\/servicos\/[^/]+\/([^/]+)$/);
  if (svc) return BAIRROS_ANCORA.includes(svc[1]) ? "SERVICO_BAIRRO" : "SERVICO_CIDADE";
  return "OUTRA_LOCAL";
}

/** Decisão de política (mesma semântica do resolvedor TS). */
export function resolveLocal(path) {
  const p = normalize(path);
  const declared = byPath.get(p);
  const family = declared?.family ?? familia(p);
  const wrap = (d) => ({
    path: p,
    family,
    ...d,
    canonical: d.canonical || p,
    sitemap: d.indexability === "index" && d.sitemap,
  });

  if (declared) return wrap({ ...declared, canonical: declared.canonical ?? p });

  const prefixo = PREFIXOS_NAO_INDEXAVEIS.find((x) => p.startsWith(x.prefix));
  if (prefixo)
    return wrap({ indexability: prefixo.indexability, sitemap: false, reason: prefixo.reason });

  if (family === "BAIRRO") {
    const slug = p.replace("/bairros/", "");
    return BAIRROS_ANCORA.includes(slug)
      ? wrap({
          indexability: "index",
          sitemap: true,
          parent: "/tecnico-informatica-curitiba",
          tier: "ANCORA",
          reason: "Bairro âncora aprovado pelo checklist anticanibalização.",
        })
      : wrap({
          indexability: "noindex",
          sitemap: false,
          parent: "/tecnico-informatica-curitiba",
          tier: "NOINDEX",
          reason: "Bairro sem conteúdo próprio suficiente — fora do índice (política de poda).",
        });
  }

  if (family === "SERVICO_BAIRRO") {
    const pai = `/servicos/${p.split("/")[2]}`;
    return SERVICO_BAIRRO_INDEXAVEIS.includes(p)
      ? wrap({ indexability: "index", sitemap: true, parent: pai, reason: "Blocos autorais 4S." })
      : wrap({
          indexability: "noindex",
          sitemap: false,
          parent: pai,
          reason: "Serviço × bairro sem blocos autorais — noindex por padrão.",
        });
  }

  if (family === "SERVICO_CIDADE") {
    const pai = `/servicos/${p.split("/")[2]}`;
    return wrap({
      indexability: "canonicalized",
      canonical: pai,
      sitemap: false,
      parent: pai,
      reason: "Serviço × cidade sem intenção local adicional: autoridade no serviço-pai.",
    });
  }

  return wrap({ indexability: "index", sitemap: true, reason: "Rota não-local." });
}

/** Conjunto de caminhos locais que a política autoriza no sitemap. */
export function pathsIndexaveis() {
  return [
    ...ENTIDADES.filter((e) => e.indexability === "index").map((e) => e.path),
    ...BAIRROS_ANCORA.map((s) => `/bairros/${s}`),
    ...SERVICO_BAIRRO_INDEXAVEIS,
  ];
}

/** `true` se o caminho pertence a alguma família local governada. */
export function isLocalPath(path) {
  const p = normalize(path);
  return (
    byPath.has(p) ||
    p.startsWith("/bairros/") ||
    /^\/tecnico-informatica-/.test(p) ||
    /^\/servicos\/[^/]+\/[^/]+$/.test(p) ||
    PREFIXOS_NAO_INDEXAVEIS.some((x) => p.startsWith(x.prefix))
  );
}
