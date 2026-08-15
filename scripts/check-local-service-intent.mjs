#!/usr/bin/env node
/**
 * ============================================================================
 * GATE — SERVIÇO GLOBAL × SERVIÇO LOCAL (Rodadas 5C e 5D)
 * ============================================================================
 * Impede que /servicos/<servico>/<cidade> vire doorway do serviço-pai ou
 * clone da mesma página em outra cidade.
 *
 * Regras (fail-closed):
 *  1. Todo SERVICO_CIDADE indexável precisa de conteúdo local declarado
 *     (servicoCuritibaBlocos.json / servicoSjpBlocos.json).
 *  2. O `parent` declarado precisa ser uma rota REAL de serviço.
 *  3. Página local: canonical self, robots index, presença no sitemap.
 *  4. Página não promovida: canonical no pai, robots noindex, fora do sitemap.
 *  5. Title e H1 do filho não podem repetir o do pai.
 *  6. Mínimo de 550 palavras no <main> (mesmo piso do gate antidoorway).
 *  7. Intenção local declarada ≠ intenção global declarada.
 *  8. (5D) Mesmo serviço em cidades diferentes: comparação de intenção,
 *     metadata e corpo com normalização de topônimos. Trocar o nome da
 *     cidade NÃO conta como originalidade.
 * ============================================================================
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ENTIDADES } from "./lib/local-index-policy.mjs";
import { TODAS_PAGINAS_LOCAIS, servicoCuritibaPorPath } from "./lib/servico-curitiba.mjs";
import { prepararSsr, htmlDaRota, abortarSeBloqueado } from "./lib/ssr-harness.mjs";
import { rotasLocais } from "./lib/local-routes.mjs";

const DIST = join(process.cwd(), "dist");
const MIN_PALAVRAS = 550;
// Teto vigente do checklist da Rodada 5 — NÃO relaxar para fazer página passar.
const LIMITE_JACCARD_CIDADES = 0.45;
// Após remover topônimos, dois textos praticamente iguais = doorway.
const LIMITE_SEM_TOPONIMO = 0.82;
const falhas = [];
const avisos = [];
const linhasRelatorio = [];

const TOPONIMOS = [
  "sao jose dos pinhais",
  "sao jose",
  "curitiba",
  "regiao metropolitana",
  "rmc",
  "afonso pena",
  "rui barbosa",
  "sjp",
];

await prepararSsr(rotasLocais({ incluirSitemap: true }), { dist: DIST });
abortarSeBloqueado("check-local-service-intent");

const html = (path) => htmlDaRota(path, DIST);

const sitemapUrls = () => {
  const f = join(DIST, "sitemap-servicos.xml");
  if (!existsSync(f)) return null;
  return new Set([...readFileSync(f, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
};

const tag = (src, re) => src.match(re)?.[1]?.trim() ?? "";
const titleOf = (src) => tag(src, /<title>([\s\S]*?)<\/title>/i);
const h1Of = (src) => tag(src, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, " ").trim();
const canonicalOf = (src) => tag(src, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
const robotsOf = (src) => tag(src, /<meta[^>]+name="robots"[^>]+content="([^"]+)"/i);
const mainOf = (src) =>
  (src.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? src)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ");
const palavras = (src) => mainOf(src).split(/\s+/).filter(Boolean).length;

const normalizar = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Remove topônimos para que a troca de cidade não conte como originalidade. */
const semToponimos = (texto) => {
  let t = normalizar(texto);
  for (const nome of TOPONIMOS) t = t.split(nome).join(" ");
  return t.replace(/\s+/g, " ").trim();
};

const ngramas = (texto, n = 5) => {
  const tokens = texto.split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= tokens.length; i += 1) set.add(tokens.slice(i, i + n).join(" "));
  return set;
};

const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter += 1;
  return inter / (a.size + b.size - inter);
};

const simTexto = (a, b, { removerToponimos = false } = {}) => {
  const prep = removerToponimos ? semToponimos : normalizar;
  return jaccard(ngramas(prep(a)), ngramas(prep(b)));
};

const locais = ENTIDADES.filter((e) => e.family === "SERVICO_CIDADE");
const urls = sitemapUrls();
if (!urls) avisos.push("sitemap-servicos.xml ausente em dist/ — verificação de sitemap ignorada.");

for (const rota of locais) {
  const conteudo = servicoCuritibaPorPath(rota.path);
  const promovida = rota.indexability === "index";

  // Regra 1 — fail-closed.
  if (promovida && !conteudo) {
    falhas.push(`${rota.path}: marcada como index sem conteúdo local declarado (blocos + FAQ + intenção).`);
    continue;
  }
  if (!promovida && conteudo) {
    avisos.push(`${rota.path}: possui conteúdo local declarado mas segue canonicalizada (decisão editorial).`);
  }

  // Regra 2 — o pai precisa existir de fato.
  const pai = rota.parent ?? rota.canonical;
  if (!pai) falhas.push(`${rota.path}: sem 'parent' declarado na política local.`);
  else if (!html(pai)) falhas.push(`${rota.path}: parent '${pai}' não gerou HTML — rota inexistente.`);

  const src = html(rota.path);
  if (!src) {
    if (promovida) falhas.push(`${rota.path}: promovida a index mas sem HTML estático em dist/.`);
    continue;
  }

  const canonical = canonicalOf(src);
  const robots = robotsOf(src);

  if (promovida) {
    // Regra 3.
    if (!canonical.endsWith(rota.path)) falhas.push(`${rota.path}: canonical deveria ser self, é '${canonical}'.`);
    if (robots && /noindex/i.test(robots)) falhas.push(`${rota.path}: robots '${robots}' conflita com index.`);
    if (urls && ![...urls].some((u) => u.endsWith(rota.path))) falhas.push(`${rota.path}: ausente no sitemap-servicos.xml.`);

    // Regra 5 + similaridade global × local.
    const paiSrc = pai ? html(pai) : null;
    if (paiSrc) {
      if (titleOf(paiSrc) === titleOf(src)) falhas.push(`${rota.path}: title idêntico ao do pai '${pai}'.`);
      if (h1Of(paiSrc) === h1Of(src)) falhas.push(`${rota.path}: H1 idêntico ao do pai '${pai}'.`);
      const simPai = simTexto(mainOf(paiSrc), mainOf(src));
      linhasRelatorio.push({ a: pai, b: rota.path, tipo: "global × local", similaridade: +simPai.toFixed(3), status: simPai >= LIMITE_JACCARD_CIDADES ? "BLOQUEADO" : "OK" });
      if (simPai >= LIMITE_JACCARD_CIDADES)
        falhas.push(`${rota.path}: similaridade ${simPai.toFixed(3)} com o serviço-pai (teto ${LIMITE_JACCARD_CIDADES}).`);
    }

    // Regra 6.
    const n = palavras(src);
    if (n < MIN_PALAVRAS) falhas.push(`${rota.path}: ${n} palavras no <main> (mínimo ${MIN_PALAVRAS}).`);

    // Regra 7.
    if (conteudo && conteudo.intentGlobal.trim() === conteudo.intentLocal.trim())
      falhas.push(`${rota.path}: intenção local igual à global — não justifica página separada.`);
    if (conteudo && conteudo.parent !== pai)
      falhas.push(`${rota.path}: parent divergente entre política ('${pai}') e conteúdo ('${conteudo.parent}').`);
  } else {
    // Regra 4.
    const alvo = rota.canonical ?? pai;
    if (alvo && !canonical.endsWith(alvo)) falhas.push(`${rota.path}: canonical deveria apontar para '${alvo}', é '${canonical}'.`);
    if (urls && [...urls].some((u) => u.endsWith(rota.path))) falhas.push(`${rota.path}: canonicalizada, mas presente no sitemap.`);
  }
}

// ── Regra 8 (5D): mesmo serviço em cidades diferentes ────────────────────────
const porServico = new Map();
for (const p of TODAS_PAGINAS_LOCAIS) {
  const slug = p.path.split("/")[2];
  if (!porServico.has(slug)) porServico.set(slug, []);
  porServico.get(slug).push(p);
}

for (const [slug, paginas] of porServico) {
  if (paginas.length < 2) continue;
  for (let i = 0; i < paginas.length; i += 1) {
    for (let j = i + 1; j < paginas.length; j += 1) {
      const A = paginas[i];
      const B = paginas[j];
      const srcA = html(A.path);
      const srcB = html(B.path);
      if (!srcA || !srcB) continue;

      if (A.intentLocal.trim() === B.intentLocal.trim())
        falhas.push(`${slug}: intenção local idêntica entre ${A.path} e ${B.path}.`);
      if (semToponimos(A.title) === semToponimos(B.title))
        falhas.push(`${slug}: title de ${A.path} e ${B.path} difere apenas pela localidade.`);
      if (semToponimos(A.description) === semToponimos(B.description))
        falhas.push(`${slug}: description de ${A.path} e ${B.path} difere apenas pela localidade.`);
      // H1 local legitimamente segue o padrão "<serviço> em <cidade>": aqui a
      // troca de topônimo é esperada, então vira aviso e não falha.
      if (semToponimos(A.h1) === semToponimos(B.h1))
        avisos.push(`${slug}: H1 de ${A.path} e ${B.path} só difere pela localidade (padrão aceito para H1 local).`);

      const sim = simTexto(mainOf(srcA), mainOf(srcB), { removerToponimos: true });
      const status = sim >= LIMITE_JACCARD_CIDADES ? "BLOQUEADO" : "OK";
      linhasRelatorio.push({ a: A.path, b: B.path, tipo: "cidade × cidade", similaridade: +sim.toFixed(3), status });
      if (sim >= LIMITE_JACCARD_CIDADES)
        falhas.push(`${slug}: ${A.path} × ${B.path} com similaridade ${sim.toFixed(3)} sem topônimos (teto ${LIMITE_JACCARD_CIDADES}).`);
      if (sim >= LIMITE_SEM_TOPONIMO)
        falhas.push(`${slug}: ${A.path} × ${B.path} é a mesma página com a cidade trocada.`);
    }
  }
}

// ── Originalidade entre serviços da mesma cidade ─────────────────────────────
const porCidade = new Map();
for (const p of TODAS_PAGINAS_LOCAIS) {
  const cidade = p.path.split("/")[3];
  if (!porCidade.has(cidade)) porCidade.set(cidade, []);
  porCidade.get(cidade).push(p);
}
for (const [cidade, paginas] of porCidade) {
  for (let i = 0; i < paginas.length; i += 1) {
    for (let j = i + 1; j < paginas.length; j += 1) {
      const srcA = html(paginas[i].path);
      const srcB = html(paginas[j].path);
      if (!srcA || !srcB) continue;
      const sim = simTexto(mainOf(srcA), mainOf(srcB));
      linhasRelatorio.push({ a: paginas[i].path, b: paginas[j].path, tipo: `intracidade (${cidade})`, similaridade: +sim.toFixed(3), status: sim >= LIMITE_JACCARD_CIDADES ? "BLOQUEADO" : "OK" });
      if (sim >= LIMITE_JACCARD_CIDADES)
        falhas.push(`${paginas[i].path} × ${paginas[j].path}: similaridade ${sim.toFixed(3)} entre serviços da mesma cidade.`);
    }
  }
}

// ── Relatório ────────────────────────────────────────────────────────────────
if (linhasRelatorio.length) {
  mkdirSync(join(process.cwd(), "reports"), { recursive: true });
  writeFileSync(
    join(process.cwd(), "reports/local-service-sjp-similarity.json"),
    `${JSON.stringify({ geradoEm: new Date().toISOString().slice(0, 10), limite: LIMITE_JACCARD_CIDADES, pares: linhasRelatorio }, null, 2)}\n`,
  );
  const md = [
    "# Similaridade serviço × cidade (Rodadas 5C e 5D)",
    "",
    `Teto vigente: ${LIMITE_JACCARD_CIDADES} (Jaccard de 5-gramas; comparações cidade × cidade com topônimos removidos).`,
    "",
    "| Página A | Página B | Tipo | Similaridade | Status |",
    "|---|---|---|---|---|",
    ...linhasRelatorio
      .sort((x, y) => y.similaridade - x.similaridade)
      .map((l) => `| ${l.a} | ${l.b} | ${l.tipo} | ${l.similaridade.toFixed(3)} | ${l.status} |`),
    "",
  ].join("\n");
  writeFileSync(join(process.cwd(), "reports/local-service-sjp-similarity.md"), md);
}

for (const a of avisos) console.log(`  aviso  ${a}`);
if (falhas.length) {
  console.error(`\n✖ check:local-service-intent — ${falhas.length} falha(s):`);
  for (const f of falhas) console.error(`  • ${f}`);
  process.exit(1);
}
const maior = linhasRelatorio.reduce((m, l) => Math.max(m, l.similaridade), 0);
console.log(
  `✓ check:local-service-intent — ${locais.length} rota(s) serviço × cidade em conformidade · ${linhasRelatorio.length} par(es) comparado(s) · Jaccard máximo ${maior.toFixed(3)}.`,
);
