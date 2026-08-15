#!/usr/bin/env node
/**
 * HARNESS SSR ÚNICO — MICRO-RODADA LOCAL 1.1
 *
 * Fonte única de HTML para os gates locais depois da migração para
 * TanStack Start + Nitro. O stack antigo gravava um HTML por rota em `dist/`;
 * o atual renderiza sob demanda. Em vez de espalhar `if (!dist) skip` pelos
 * gates (falso verde), todos passam a pedir o HTML a este módulo, que:
 *
 *   1. renderiza a rota contra UMA instância de servidor SSR (reutilizada);
 *   2. grava o resultado em `dist/<rota>/index.html` (formato que os gates já
 *      sabem ler) e registra a proveniência em `dist/ssr-snapshot-manifest.json`;
 *   3. reaproveita o snapshot enquanto ele estiver fresco (TTL), para não
 *      transformar o CI em processo de 20 minutos;
 *   4. quando nenhuma fonte confiável existe, devolve `null` e marca o estado
 *      global como BLOCKED — quem consome DEVE falhar com reason code, nunca
 *      passar em silêncio (FASE 20).
 *
 * Regras:
 *   - HTML de dist só é aceito quando o manifesto o reconhece e está dentro do
 *     TTL. HTML órfão/antigo do stack legado é tratado como inexistente.
 *   - Nenhuma lista de rotas é mantida aqui: quem chama informa as rotas, que
 *     vêm sempre das policies/sitemaps reais (FASE 5).
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync, copyFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";

export const REASONS = {
  OK: "OK",
  SSR_UNAVAILABLE: "UNKNOWN_SSR_UNAVAILABLE",
  ROUTE_NOT_RENDERED: "FAIL_ROUTE_NOT_RENDERED",
  PRODUCTION_ONLY: "SKIPPED_PRODUCTION_ONLY",
};

const TTL_MS = Number(process.env.SSR_SNAPSHOT_TTL_MS ?? 15 * 60 * 1000);
const CANDIDATOS_BASE = [
  process.env.SSR_BASE_URL,
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:4173",
].filter(Boolean);

const estado = {
  dist: "dist",
  base: null,
  bloqueado: false,
  motivoBloqueio: null,
  manifesto: null,
  renderizadas: 0,
  reaproveitadas: 0,
  falhas: [],
};

const normalizar = (p) => {
  const limpo = String(p || "/").split("#")[0].split("?")[0];
  const sem = limpo.replace(/\/+$/, "");
  return sem === "" ? "/" : sem.startsWith("/") ? sem : `/${sem}`;
};

const arquivoDaRota = (dist, rota) =>
  rota === "/" ? join(dist, "index.html") : join(dist, `${rota.replace(/^\//, "")}/index.html`);

const caminhoManifesto = (dist) => join(dist, "ssr-snapshot-manifest.json");

function lerManifesto(dist) {
  const f = caminhoManifesto(dist);
  if (!existsSync(f)) return { geradoEm: 0, base: null, rotas: {} };
  try {
    const m = JSON.parse(readFileSync(f, "utf8"));
    return { geradoEm: m.geradoEm ?? 0, base: m.base ?? null, rotas: m.rotas ?? {} };
  } catch {
    return { geradoEm: 0, base: null, rotas: {} };
  }
}

function gravarManifesto(dist, manifesto) {
  mkdirSync(dist, { recursive: true });
  writeFileSync(caminhoManifesto(dist), `${JSON.stringify(manifesto, null, 2)}\n`);
}

const fresco = (entrada) =>
  Boolean(entrada) && entrada.status === 200 && Date.now() - (entrada.renderizadoEm ?? 0) < TTL_MS;

async function descobrirBase() {
  if (estado.base !== null) return estado.base;
  for (const base of CANDIDATOS_BASE) {
    const url = base.replace(/\/$/, "");
    try {
      const res = await fetch(`${url}/`, {
        method: "GET",
        headers: { "user-agent": "ssr-harness/1.0" },
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        estado.base = url;
        return url;
      }
    } catch {
      /* candidato indisponível — tenta o próximo */
    }
  }
  estado.base = "";
  return "";
}

async function renderizar(base, rota) {
  const res = await fetch(`${base}${rota}`, {
    headers: { "user-agent": "ssr-harness/1.0" },
    signal: AbortSignal.timeout(20000),
  });
  const html = await res.text();
  return { status: res.status, html };
}

/**
 * Garante snapshots SSR frescos para as rotas informadas.
 * Retorna o resumo; nunca lança.
 */
export async function prepararSsr(rotas, opcoes = {}) {
  const dist = opcoes.dist || estado.dist;
  estado.dist = dist;
  const alvo = [...new Set((rotas ?? []).map(normalizar))].sort();
  const manifesto = lerManifesto(dist);
  estado.manifesto = manifesto;

  const pendentes = alvo.filter((r) => {
    const entrada = manifesto.rotas[r];
    return !(fresco(entrada) && existsSync(arquivoDaRota(dist, r)));
  });
  estado.reaproveitadas = alvo.length - pendentes.length;

  if (pendentes.length === 0) {
    copiarEstaticos(dist);
    return resumo();
  }

  const base = await descobrirBase();
  if (!base) {
    estado.bloqueado = true;
    estado.motivoBloqueio = REASONS.SSR_UNAVAILABLE;
    return resumo();
  }
  manifesto.base = base;

  const lote = Number(process.env.SSR_HARNESS_CONCURRENCY ?? 12);
  for (let i = 0; i < pendentes.length; i += lote) {
    const parte = pendentes.slice(i, i + lote);
    const resultados = await Promise.all(
      parte.map(async (rota) => {
        try {
          return { rota, ...(await renderizar(base, rota)) };
        } catch (err) {
          return { rota, status: 0, html: "", erro: String(err) };
        }
      }),
    );
    for (const r of resultados) {
      if (r.status === 200 && r.html.includes("</html>")) {
        const destino = arquivoDaRota(dist, r.rota);
        mkdirSync(dirname(destino), { recursive: true });
        writeFileSync(destino, r.html);
        manifesto.rotas[r.rota] = { status: 200, renderizadoEm: Date.now(), bytes: r.html.length };
        estado.renderizadas++;
      } else {
        manifesto.rotas[r.rota] = { status: r.status, renderizadoEm: Date.now(), erro: r.erro ?? null };
        estado.falhas.push(`${r.rota} → HTTP ${r.status}`);
      }
    }
  }

  manifesto.geradoEm = Date.now();
  gravarManifesto(dist, manifesto);
  copiarEstaticos(dist);
  return resumo();
}

/** robots.txt / sitemaps ficam em public/ no stack SSR; gates leem da raiz do dist. */
export function copiarEstaticos(dist = estado.dist) {
  if (!existsSync("public")) return;
  mkdirSync(dist, { recursive: true });
  const arquivos = ["robots.txt", "llms.txt", ...readdirSync("public").filter((n) => /^sitemap.*\.xml$/.test(n))];
  for (const f of arquivos) {
    const src = join("public", f);
    if (existsSync(src)) copyFileSync(src, join(dist, f));
  }
}

/**
 * HTML de uma rota já preparada. Síncrono de propósito: os gates existentes
 * são sequenciais e apenas trocam a leitura de arquivo por esta chamada.
 * `null` significa "não verificável" — o chamador deve falhar, não pular.
 */
export function htmlDaRota(rota, dist = estado.dist) {
  const r = normalizar(rota);
  const manifesto = estado.manifesto ?? lerManifesto(dist);
  const entrada = manifesto.rotas?.[r];
  const arquivo = arquivoDaRota(dist, r);
  if (!existsSync(arquivo)) return null;
  // HTML sem proveniência no manifesto é resquício do stack antigo: não confiável.
  if (!entrada || entrada.status !== 200) return null;
  return readFileSync(arquivo, "utf8");
}

export function ssrBloqueado() {
  return estado.bloqueado;
}

export function resumo() {
  return {
    base: estado.base || null,
    dist: estado.dist,
    bloqueado: estado.bloqueado,
    reason: estado.bloqueado ? estado.motivoBloqueio : REASONS.OK,
    renderizadas: estado.renderizadas,
    reaproveitadas: estado.reaproveitadas,
    falhas: [...estado.falhas],
  };
}

/**
 * Encerra o gate quando o SSR não pôde ser consultado (FASE 20/21):
 * UNKNOWN/BLOCKED com reason code — nunca PASS silencioso.
 */
export function abortarSeBloqueado(gate) {
  if (!estado.bloqueado) return;
  console.error(
    `[${gate}] UNKNOWN ${REASONS.SSR_UNAVAILABLE} — nenhum servidor SSR respondeu ` +
      `(tentados: ${CANDIDATOS_BASE.join(", ")}). Suba o servidor (npm run dev / npm run preview) ` +
      `ou defina SSR_BASE_URL. Gate não pode validar HTML renderizado.`,
  );
  process.exit(1);
}
