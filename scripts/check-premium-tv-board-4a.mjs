#!/usr/bin/env node
/**
 * RODADA 4A — GATE DAS VERTICAIS TV + PLACAS
 *
 * Valida, sobre o build (dist/), que:
 *   • escopo: nenhuma URL nova de eletrônicos (marca, sintoma de TV, BGA,
 *     reballing, áudio, hub /eletronicos/*, catálogo de peças);
 *   • TV: painel delimitado, coleta passo a passo, teste final, reparo em
 *     nível de componente, autorização — sem prazo e sem preço novo;
 *   • Placas: N1/N2/N3, placa avulsa, aceite/recusa, equipamento de origem,
 *     validação limitada — sem promessa universal de reparo;
 *   • garantia: "90 dias" nunca aparece isolado do seu contrato;
 *   • conversão: no máximo três CTAs de WhatsApp por página;
 *   • paridade: cada seção da fonte única aparece no HTML servido.
 *
 * Uso: node scripts/check-premium-tv-board-4a.mjs [dist]
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { BLOCOS_4A, BLOCOS_4A_PATHS, CTA_4A } from "./lib/blocos-4a.mjs";

const dist = resolve(process.argv[2] || "dist");
const erros = [];
const fail = (m) => erros.push(m);

const html = (p) => {
  const f = join(dist, p.replace(/^\//, ""), "index.html");
  if (!existsSync(f)) {
    fail(`HTML ausente: ${p}`);
    return null;
  }
  return readFileSync(f, "utf8");
};

const texto = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");

// ── 1. Escopo: nenhuma rota nova de eletrônicos ────────────────────
const ROTAS_PROIBIDAS = [
  "/eletronicos",
  "/servicos/conserto-som",
  "/servicos/conserto-audio",
  "/servicos/conserto-caixa-de-som",
  "/servicos/conserto-jbl",
  "/servicos/reparo-bga",
  "/servicos/reballing",
  "/servicos/conserto-tv-samsung",
  "/servicos/conserto-tv-lg",
  "/servicos/tv-nao-liga",
  "/servicos/tv-sem-imagem",
  "/pecas",
];
for (const rota of ROTAS_PROIBIDAS) {
  if (existsSync(join(dist, rota.replace(/^\//, ""), "index.html")))
    fail(`rota proibida pela Regra Zero da 4A existe no build: ${rota}`);
}
const sitemapDir = readdirSync(dist).filter((f) => /^sitemap.*\.xml$/.test(f));
for (const s of sitemapDir) {
  const xml = readFileSync(join(dist, s), "utf8");
  for (const rota of ROTAS_PROIBIDAS)
    if (xml.includes(`${rota}<`)) fail(`${s}: rota proibida indexada — ${rota}`);
}

// ── 2. Regras de conteúdo por página ───────────────────────────────
const EXIGIDO = {
  "/servicos/conserto-tv": [
    /painel/i,
    /viabilidade econômica/i,
    /coleta/i,
    /autoriza(ção|do)/i,
    /nível de componente/i,
    /depois do reparo/i,
    /partida a frio/i,
  ],
  "/servicos/conserto-placa": [
    /N1\s*—\s*módulo/i,
    /N2\s*—\s*componente/i,
    /N3\s*—\s*retrabalho avançado/i,
    /somente a placa/i,
    /equipamento de origem/i,
    /avaliação limitada/i,
    /pode ser recusada/i,
  ],
};

const PROIBIDO = [
  { re: /teste completo/i, msg: 'expressão "teste completo" (teste sem escopo)' },
  { re: /100\s*%\s*(revisad|aprovad)/i, msg: 'claim "100% revisada/aprovada"' },
  { re: /taxa de sucesso/i, msg: 'claim "taxa de sucesso"' },
  { re: /reparos realizados|placas recuperadas/i, msg: "contador de reparos" },
  { re: /prazo de \d+\s*(dias|horas)|em at[ée] \d+\s*(dias|horas)/i, msg: "promessa de prazo" },
  { re: /todas as (placas|tvs?) (são|podem ser) (reparad|recuperad)/i, msg: "promessa universal de reparo" },
  { re: /garantimos o reparo/i, msg: "promessa universal de reparo" },
];

// Garantia: "90 dias" só é aceito com escopo próximo.
const ESCOPO_GARANTIA = /(mão de obra|reparo executado|ponto reparado|serviço executado|condições aplicáveis)/i;

for (const path of BLOCOS_4A_PATHS) {
  const h = html(path);
  if (!h) continue;
  const t = texto(h);

  for (const re of EXIGIDO[path] || [])
    if (!re.test(t)) fail(`${path}: conteúdo obrigatório ausente — ${re}`);

  for (const { re, msg } of PROIBIDO)
    if (re.test(t)) fail(`${path}: ${msg}`);

  // paridade: título de cada seção da fonte única presente no HTML servido
  const cfg = BLOCOS_4A[path];
  for (const sec of cfg.secoes) {
    if (!t.includes(sec.titulo)) fail(`${path}: seção 4A ausente no HTML — "${sec.titulo}"`);
    if (!h.includes(`id="${sec.id}"`)) fail(`${path}: âncora ausente — #${sec.id}`);
  }
  const cta = CTA_4A[path];
  if (cta && !t.includes(cta.label)) fail(`${path}: CTA da 4A ausente — "${cta.label}"`);
  if (cfg.resumo.length > 4) fail(`${path}: mais de quatro indicadores no hero`);

  // garantia com escopo
  for (const m of t.matchAll(/90 dias/gi)) {
    const janela = t.slice(Math.max(0, m.index - 160), m.index + 200);
    if (!ESCOPO_GARANTIA.test(janela))
      fail(`${path}: "90 dias" sem escopo de garantia próximo — «${janela.trim().slice(0, 120)}»`);
  }

  // conversão: no máximo três CTAs de WhatsApp renderizados pelo React
  const ctas = (h.match(/data-cta-location="/g) || []).length;
  const waApp = (h.match(/href="https:\/\/wa\.me\//g) || []).length;
  if (waApp > 4) fail(`${path}: ${waApp} links de WhatsApp (máximo de 3 CTAs + botão flutuante)`);
  if (ctas > 6) fail(`${path}: ${ctas} CTAs instrumentados (acima do previsto)`);

  // triagem correta
  if (!/vim da página de (conserto de tv|reparo de placa|conserto de placa)/i.test(decodeURIComponent(h.match(/wa\.me\/\d+\?text=([^"]+)/)?.[1] || "")))
    fail(`${path}: mensagem de triagem não identifica a origem da página`);
}

// ── 3. Prova visual: nada rotulado como prova sem registro aprovado ─
const REGISTRO = resolve("docs/registro-provas-visuais.md");
const registro = existsSync(REGISTRO) ? readFileSync(REGISTRO, "utf8") : "";
for (const path of BLOCOS_4A_PATHS) {
  const h = html(path);
  if (!h) continue;
  const t = texto(h);
  if (/prova(s)? (real|reais)/i.test(t) && !registro.includes(path))
    fail(`${path}: galeria rotulada como prova real sem registro aprovado em docs/registro-provas-visuais.md`);
}

if (erros.length) {
  console.error(`❌ Rodada 4A — ${erros.length} falha(s):`);
  for (const e of erros) console.error("  • " + e);
  process.exit(1);
}
console.log(
  `✓ Rodada 4A — TV e placas validadas (escopo, painel, coleta, N1/N2/N3, placa avulsa, aceite/recusa, garantia escopada, CTAs e prova visual).`,
);
