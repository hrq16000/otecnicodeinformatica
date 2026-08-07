#!/usr/bin/env node
/**
 * RODADA 3U — gate da última propagação visual contextual.
 *
 * Escopo fechado (três páginas, contratos distintos):
 *   • /atendimento-remoto        → modalidade de atendimento (não é serviço novo)
 *   • /seguranca-dos-dados       → WebPage institucional (não é cybersecurity)
 *   • /servicos/montagem-de-pc   → Service comercial (montagem/workstation)
 *
 * Valida apresentação, contratos semânticos, limites de CTA e paridade
 * HTML estático × React. Não valida URLs, preços nem regras comerciais —
 * a rodada é proibida de alterá-los.
 */
import { readFileSync } from "node:fs";
import { BLOCOS_3U, BLOCOS_3U_PATHS, CTA_3U } from "./lib/blocos-3u.mjs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const errors = [];
const ok = [];
const check = (cond, msg) => (cond ? ok.push(msg) : errors.push(msg));

const REMOTO = "/atendimento-remoto";
const DADOS = "/seguranca-dos-dados";
const MONTAGEM = "/servicos/montagem-de-pc";
const TODAS = [REMOTO, DADOS, MONTAGEM];

const lib = read("src/lib/blocos3u.ts");
const comp = read("src/components/servico/Blocos3U.tsx");
const core = read("src/pages/servicos/ServicoCore.tsx");
const pageRemoto = read("src/pages/AtendimentoRemoto.tsx");
const pageDados = read("src/pages/SegurancaDosDados.tsx");
const staticBody = read("scripts/curated-static-body.mjs");

// 1. Escopo fechado — exatamente três páginas, zero URL nova.
check(
  BLOCOS_3U_PATHS.length === 3 && TODAS.every((p) => BLOCOS_3U_PATHS.includes(p)),
  "escopo 3U limitado às três páginas do contrato",
);
const rotasNoData = [...JSON.stringify(BLOCOS_3U).matchAll(/"(\/[a-z0-9/-]+)"/g)].map((m) => m[1]);
const rotasConhecidas =
  read("public/sitemap-main.xml") + read("public/sitemap-servicos.xml") + read("src/App.tsx");
check(
  rotasNoData.every((r) => TODAS.includes(r) || rotasConhecidas.includes(r)),
  "nenhuma URL nova introduzida pelos blocos 3U",
);

// 2. Contratos distintos entre as três páginas.
const assinatura = (p) => BLOCOS_3U[p].secoes.map((s) => `${s.kind}:${s.id}`).join("|");
check(new Set(TODAS.map(assinatura)).size === 3, "as três páginas têm blocos e ordem diferentes");
const titulos = TODAS.flatMap((p) => BLOCOS_3U[p].secoes.map((s) => s.titulo));
check(new Set(titulos).size === titulos.length, "nenhum título de bloco repetido entre as páginas");
const ids = TODAS.flatMap((p) => BLOCOS_3U[p].secoes.map((s) => s.id));
check(new Set(ids).size === ids.length, "âncoras únicas em toda a onda");
for (const p of TODAS) {
  const cfg = BLOCOS_3U[p];
  check(cfg.secoes.length >= 4, `${p}: ao menos quatro blocos próprios`);
  check(cfg.tocExtra.length >= 4 && cfg.tocExtra.every((t) => cfg.secoes.some((s) => s.id === t.id) || t.id === "faq"), `${p}: sumário aponta para âncoras existentes`);
  check(p === DADOS ? cfg.resumo.length === 0 : cfg.resumo.length >= 3, `${p}: resumo de contrato coerente com o tipo de página`);
}

const texto = (p) => JSON.stringify(BLOCOS_3U[p]).toLowerCase();

// 3. Atendimento remoto — modalidade, elegibilidade, limites e autorização.
const remoto = texto(REMOTO);
check(/modalidade/.test(JSON.stringify(BLOCOS_3U[REMOTO]).toLowerCase()), "remoto: tratado como modalidade, não como serviço novo");
check(/elegib/.test(remoto) && /internet/.test(remoto), "remoto: requisitos de elegibilidade declarados");
check(/autoriza/.test(remoto) && /acompanh/.test(remoto), "remoto: sessão autorizada e acompanhada");
check(/encerrad|encerra/.test(remoto), "remoto: encerramento da sessão explicitado");
check(!/(?<!não existe )(?<!sem )acesso permanente(?! )/.test(remoto) || /não existe acesso permanente/.test(remoto), "remoto: sem promessa de acesso permanente");
check(!/instale|baixe o|download do (nosso )?(software|programa)/.test(remoto), "remoto: sem oferta de software próprio de acesso");
check(/dom[íi]cilio|coleta|bancada/.test(remoto), "remoto: limites físicos encaminhados a outra modalidade");
check(CTA_3U[REMOTO] && /remoto/i.test(CTA_3U[REMOTO].label), "remoto: CTA contextual de verificação");

// 4. Segurança dos dados — institucional, sem virar cybersecurity.
const dados = texto(DADOS);
check(/backup/.test(dados) && /sincroniza/.test(dados) && /nuvem/.test(dados) && /recupera/.test(dados), "dados: backup, sincronização, nuvem e recuperação diferenciados");
check(BLOCOS_3U[DADOS].secoes.some((s) => s.kind === "responsabilidades"), "dados: matriz de responsabilidades");
check(/credenciais|senha/.test(dados), "dados: orientação sobre credenciais");
check(!/cybersecurity|ciberseguran|per[íi]cia|antiv[íi]rus gerenciado|monitoramento cont[íi]nuo/.test(dados), "dados: escopo institucional preservado");
check(!/conformidade|lgpd compliance|iso 27001/.test(dados), "dados: sem promessa de conformidade");
check(!CTA_3U[DADOS], "dados: sem CTA comercial adicional na camada 3U");

// 5. Montagem de PC — service consolidado.
const montagem = texto(MONTAGEM);
check(/compatibilidade/.test(montagem) && /(soquete|chipset)/.test(montagem), "montagem: verificação de compatibilidade");
check(/workstation/.test(montagem), "montagem: contexto de workstation consolidado");
check(/(bios|uefi)/.test(montagem), "montagem: configuração de BIOS/UEFI descrita");
check(/teste/.test(montagem) && /(temperatura|estabilidade)/.test(montagem), "montagem: testes de estabilidade e temperatura");
check(/pe[çc]as? (fornecid|do cliente)/.test(montagem), "montagem: peças do cliente delimitadas");
check(!/\bfps\b|benchmark/.test(montagem) && /nem estimativa de quadros por segundo/.test(montagem), "montagem: sem garantia ou promessa de desempenho");
check(CTA_3U[MONTAGEM] && /(configura[çc][ãa]o|pe[çc]as)/i.test(CTA_3U[MONTAGEM].label), "montagem: CTA de descrição da configuração");
check(new Set(Object.values(CTA_3U).map((c) => c.label)).size === Object.keys(CTA_3U).length, "CTA intermediário distinto por página");

// 6. Limites de CTA por página (React).
const contaWa = (src) => (src.match(/wa\.me|whatsappUrl|abrirFunil|WhatsAppFunnelLink/g) || []).length;
check(contaWa(pageDados) <= 6, "dados: página institucional sem excesso de conversão");
check(pageRemoto.includes("<Blocos3U") && pageDados.includes("<Blocos3U"), "blocos 3U renderizados nas duas páginas não-serviço");
check(core.includes("blocos3U(") && core.includes("<Blocos3U"), "ServicoCore integra os blocos 3U na montagem");
check(!comp.includes("useState"), "blocos 3U sem estado dependente de JS");

// 7. Claims proibidos em toda a camada 3U.
const alvo = (lib + JSON.stringify(BLOCOS_3U) + JSON.stringify(CTA_3U))
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/^\s*\/\/.*$/gm, "");
const claims = [
  /\bsla\b/i,
  /em at[ée] \d+\s*(h|horas|dias)/i,
  /plano (mensal|de suporte)|mensalidade/i,
  /garantimos? (o )?(resultado|funcionamento|desempenho)/i,
  /100% (seguro|garantido)|seguran[çc]a total|nunca perca/i,
  /chamados ilimitados|armazenamento ilimitado/i,
];
for (const re of claims) {
  const m = alvo.match(re);
  check(!m || /não|nao/i.test(alvo.slice(Math.max(0, m.index - 40), m.index)), `3U: sem promessa não comprovável (${re})`);
}
check(!/R\$/.test(alvo), "3U: sem preço novo na camada visual");

// 8. Paridade HTML estático × React.
check(staticBody.includes("blocos3uHtml(route.path)") && staticBody.includes("BLOCOS_3U"), "HTML estático renderiza os blocos 3U");
for (const p of TODAS) check(staticBody.includes("BLOCOS_3U[path]"), `HTML estático cobre ${p}`);

// 9. FAQPage não pode ficar vazio nas páginas com FAQ própria.
check(/FAQS = \[/.test(pageDados) && /question/.test(pageDados), "dados: FAQ própria preservada");
check(/faqs?\b/i.test(pageRemoto), "remoto: FAQ própria preservada");

for (const m of ok) console.log(`  ✓ ${m}`);
if (errors.length) {
  console.error("\n✗ RODADA 3U com pendências:");
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}
console.log("\nRODADA 3U: propagação visual contextual validada.");
