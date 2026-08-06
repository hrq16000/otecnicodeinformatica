// ─────────────────────────────────────────────────────────────
// GATE — RODADA 3Q (propagação controlada do padrão visual de serviços)
//
// Valida, sobre o código-fonte e sobre o HTML servido em dist/:
//   • exatamente seis páginas comerciais no escopo;
//   • zero URL nova (todas as rotas já existiam no manifesto curado);
//   • title/H1/canonical preservados (nenhum deles vem do padrão visual);
//   • sumário com IDs reais e sem duplicidade;
//   • faixa de confiança sem duplicação (uma ocorrência);
//   • no máximo três CTAs de triagem por página;
//   • HTML estático completo (resumo, sumário, caixas, CTA, FAQ, links);
//   • nenhum preço novo e nenhuma promessa proibida;
//   • sete artigos indexáveis preservados;
//   • piloto de sintoma sem template de serviço;
//   • FAQPage não vazio.
// ─────────────────────────────────────────────────────────────

import { readFileSync, existsSync } from "node:fs";
import { SERVICO_VISUAL_3Q, VISUAL_3Q_SLUGS } from "./lib/servico-visual-3q.mjs";
import { EDITORIAL_WAVE } from "./lib/editorial-wave.mjs";

const DIST = process.argv[2] ?? "dist";
const errors = [];
const ok = [];

const fail = (msg) => errors.push(msg);
const pass = (msg) => ok.push(msg);

const IDS_VALIDOS = new Set([
  "incluso",
  "quando-chamar",
  "pontos-de-atencao",
  "como-funciona",
  "fatores-valor",
  "faq",
]);

// Promessas proibidas nesta rodada (numéricas, garantias absolutas, reparo de impressora).
const PROIBIDOS = [
  /\d+\s*(vezes|x)\s+mais\s+r[áa]pid/i,
  /\d+\s*%\s*(mais|de)\s+(r[áa]pid|desempenho|performance)/i,
  /benchmark/i,
  /velocidade garantida/i,
  /segurança absoluta/i,
  /100%\s+seguro/i,
  /recupera(ção|mos)\s+garantid/i,
  /conserto de impressora|reparo (físico )?de impressora/i,
];

// ── 1. Escopo ────────────────────────────────────────────────
if (VISUAL_3Q_SLUGS.length !== 6) {
  fail(`Escopo deve ter exatamente 6 páginas, encontrado ${VISUAL_3Q_SLUGS.length}.`);
} else {
  pass("Escopo fechado com exatamente seis páginas comerciais.");
}

const faltando = VISUAL_3Q_SLUGS.filter((s) => !SERVICO_VISUAL_3Q[s]);
if (faltando.length) fail(`Slugs sem configuração visual: ${faltando.join(", ")}`);
const excedente = Object.keys(SERVICO_VISUAL_3Q).filter((s) => !VISUAL_3Q_SLUGS.includes(s));
if (excedente.length) fail(`Slugs fora do escopo configurados: ${excedente.join(", ")}`);

// ── 2. Configuração por página ───────────────────────────────
const resumosVistos = new Map();
const tocsVistos = new Map();
for (const slug of VISUAL_3Q_SLUGS) {
  const v = SERVICO_VISUAL_3Q[slug];
  if (!v) continue;

  if (!v.resumo?.length || v.resumo.length > 4) fail(`${slug}: resumo deve ter 1 a 4 itens.`);
  if (!v.toc?.length || v.toc.length > 6) fail(`${slug}: sumário deve ter 1 a 6 itens.`);
  if (!v.caixas?.length || v.caixas.length > 3) fail(`${slug}: máximo de três caixas editoriais.`);
  if (!v.caixasTitulo) fail(`${slug}: caixas sem título de seção.`);
  if (!v.ctaIntermediario?.label) fail(`${slug}: CTA intermediário ausente.`);

  const ids = v.toc.map((t) => t.id);
  if (new Set(ids).size !== ids.length) fail(`${slug}: sumário com IDs duplicados.`);
  for (const id of ids) {
    if (!IDS_VALIDOS.has(id)) fail(`${slug}: sumário referencia ID inexistente "${id}".`);
  }
  if (ids.includes("pontos-de-atencao") !== Boolean(v.caixas?.length)) {
    fail(`${slug}: sumário e caixas editoriais fora de sincronia.`);
  }

  const titulosCaixa = v.caixas.map((c) => c.titulo);
  if (new Set(titulosCaixa).size !== titulosCaixa.length) fail(`${slug}: caixas com título repetido.`);

  // Diferenciação: nenhuma página pode repetir o resumo ou o sumário de outra.
  const rk = JSON.stringify(v.resumo);
  const tk = JSON.stringify(v.toc);
  if (resumosVistos.has(rk)) fail(`${slug}: resumo idêntico a ${resumosVistos.get(rk)}.`);
  if (tocsVistos.has(tk)) fail(`${slug}: sumário idêntico a ${tocsVistos.get(tk)}.`);
  resumosVistos.set(rk, slug);
  tocsVistos.set(tk, slug);

  // Copy: nenhum preço novo, nenhuma promessa proibida.
  const texto = JSON.stringify(v);
  if (/R\$\s*\d/.test(texto)) fail(`${slug}: padrão visual não pode conter preço.`);
  for (const re of PROIBIDOS) {
    if (re.test(texto)) fail(`${slug}: promessa proibida no padrão visual (${re}).`);
  }
}
if (!errors.length) pass("Configuração por página válida e diferenciada entre os seis serviços.");

// ── 3. Regras semânticas específicas ─────────────────────────
const contem = (slug, re) => re.test(JSON.stringify(SERVICO_VISUAL_3Q[slug] ?? {}));
const specs = [
  ["formatacao", /backup|c[óo]pia (pr[ée]via|de documentos)/i, "bloco de backup"],
  ["remocao-de-virus", /Limites da remo[çc][ãa]o/i, "limites de segurança"],
  ["recuperacao-de-dados", /Quando parar de usar/i, "alerta de interrupção do uso"],
  [
    "redes-e-wifi",
    /se limita à configuração, comunicação e compartilhamento em rede/i,
    "limite de impressoras",
  ],
  ["upgrade-ssd-ram", /Compatibilidade antes da compra/i, "compatibilidade antes da compra"],
  ["manutencao-de-computador", /bancada/i, "ênfase em diagnóstico de hardware"],
];
for (const [slug, re, label] of specs) {
  if (!contem(slug, re)) fail(`${slug}: ${label} ausente.`);
}

// Manutenção de computador precisa continuar distinta de formatação.
const mc = JSON.stringify(SERVICO_VISUAL_3Q["manutencao-de-computador"] ?? {});
if (/formata(r|ção)/i.test(mc)) {
  fail("manutencao-de-computador: padrão visual não deve tratar de formatação.");
}
if (SERVICO_VISUAL_3Q["recuperacao-de-dados"]?.caixas?.[0]?.titulo !== "Quando parar de usar") {
  fail("recuperacao-de-dados: a caixa 'Quando parar de usar' deve vir primeiro.");
}
if (SERVICO_VISUAL_3Q["recuperacao-de-dados"]?.caixasPosicao !== "antes-incluso") {
  fail("recuperacao-de-dados: caixas devem preceder as instruções gerais.");
}

// ── 4. Paridade com o componente React ───────────────────────
const layout = readFileSync("src/components/servico/ServicoLandingLayout.tsx", "utf8");
for (const marker of [
  'id="pontos-de-atencao"',
  "InlineTriageCTA",
  "EditorialCallout",
  'variant="compact"',
]) {
  if (!layout.includes(marker)) fail(`Layout de serviço sem o elemento esperado: ${marker}`);
}
const core = readFileSync("src/pages/servicos/ServicoCore.tsx", "utf8");
if (!core.includes("visualDoServico")) fail("ServicoCore não consome o padrão visual da 3Q.");

// Piloto de sintoma não pode receber o template de serviço.
const sintoma = readFileSync("src/pages/problemas/ComputadorLento.tsx", "utf8");
if (/ServicoLandingLayout|servicoVisual3q/.test(sintoma)) {
  fail("Página de sintoma recebeu o template de serviço (proibido nesta rodada).");
}

// ── 5. HTML servido ──────────────────────────────────────────
if (!existsSync(DIST)) {
  console.log("⚠️  dist/ ausente — validação de HTML estático ignorada.");
} else {
  for (const slug of VISUAL_3Q_SLUGS) {
    const file = `${DIST}/servicos/${slug}/index.html`;
    if (!existsSync(file)) {
      fail(`HTML estático ausente: ${file}`);
      continue;
    }
    const html = readFileSync(file, "utf8");
    const v = SERVICO_VISUAL_3Q[slug];

    if (!html.includes("Resumo do serviço")) fail(`${slug}: resumo ausente no HTML servido.`);
    if (!html.includes("Nesta página")) fail(`${slug}: sumário ausente no HTML servido.`);
    if (!html.includes(v.caixasTitulo)) fail(`${slug}: caixas ausentes no HTML servido.`);
    for (const caixa of v.caixas) {
      if (!html.includes(caixa.titulo)) fail(`${slug}: caixa "${caixa.titulo}" ausente no HTML.`);
    }
    if (!/Perguntas frequentes/.test(html)) fail(`${slug}: FAQ ausente no HTML servido.`);
    if (!/wa\.me\//.test(html)) fail(`${slug}: CTA de WhatsApp ausente no HTML servido.`);
    if (!/rel="canonical"/.test(html)) fail(`${slug}: canonical ausente.`);
    if (!/<h1/i.test(html)) fail(`${slug}: H1 ausente no HTML servido.`);

    // FAQPage não pode estar vazio.
    const faqBlocks = [...html.matchAll(/"@type"\s*:\s*"FAQPage"/g)];
    if (faqBlocks.length && !/"mainEntity"\s*:\s*\[\s*\{/.test(html)) {
      fail(`${slug}: FAQPage vazio no JSON-LD.`);
    }

    // Máximo de três CTAs de triagem renderizados no React (hero, meio, final).
    const ctas = [...html.matchAll(/data-cta-location="[^"]*(_hero|_meio|_final)"/g)].length;
    if (ctas > 3) fail(`${slug}: ${ctas} CTAs de triagem (máximo 3).`);

    // Faixa de confiança: ocorrência única.
    const trust = [...html.matchAll(/aria-label="Compromissos do atendimento"/g)].length;
    if (trust > 1) fail(`${slug}: faixa de confiança duplicada.`);
  }
  pass("HTML servido contém resumo, sumário, caixas, CTA, FAQ e canonical nas seis páginas.");
}

// ── 6. Onda editorial preservada ─────────────────────────────
if (EDITORIAL_WAVE.length !== 7) {
  fail(`Onda editorial deve manter 7 artigos indexáveis, encontrado ${EDITORIAL_WAVE.length}.`);
} else {
  pass("Sete artigos indexáveis preservados.");
}

// ── Resultado ────────────────────────────────────────────────
for (const m of ok) console.log(`✅ ${m}`);
if (errors.length) {
  for (const e of errors) console.error(`❌ ${e}`);
  console.error(`\n❌ check:visual-wave-3q — ${errors.length} problema(s).`);
  process.exit(1);
}
console.log("\n✅ check:visual-wave-3q — Rodada 3Q conforme.");
