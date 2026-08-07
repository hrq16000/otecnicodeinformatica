#!/usr/bin/env node
/**
 * RODADA 3T — gate da propagação controlada do sistema empresarial.
 *
 * Escopo fechado (três páginas):
 *   • /servicos/manutencao-preventiva-empresas → empresarial pura
 *   • /servicos/backup-para-empresas           → empresarial pura
 *   • /servicos/redes-e-wifi                   → público misto (NÃO convertida)
 *
 * Valida apenas apresentação e conformidade editorial.
 */
import { readFileSync } from "node:fs";
import { BLOCOS_3T, BLOCOS_3T_SLUGS, CTA_3T } from "./lib/blocos-3t.mjs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const errors = [];
const ok = [];
const check = (cond, msg) => (cond ? ok.push(msg) : errors.push(msg));

const lib = read("src/lib/visualEmpresarial3t.ts");
const core = read("src/pages/servicos/ServicoCore.tsx");
const layout = read("src/components/servico/ServicoLandingLayout.tsx");
const comp = read("src/components/servico/Blocos3T.tsx");
const staticBody = read("scripts/curated-static-body.mjs");

const B2B = ["manutencao-preventiva-empresas", "backup-para-empresas"];
const MISTA = "redes-e-wifi";
const TODAS = [...B2B, MISTA];

// 1. Escopo fechado — exatamente três páginas, zero rota nova.
check(
  BLOCOS_3T_SLUGS.length === 3 && TODAS.every((s) => BLOCOS_3T_SLUGS.includes(s)),
  "escopo 3T limitado às três páginas do contrato",
);
const paths = [...(lib.match(/VISUAL_3T_PATHS = \[([\s\S]*?)\]/)?.[1] ?? "").matchAll(/"(\/[a-z0-9/-]+)"/g)].map(
  (m) => m[1],
);
check(paths.length === 2 && B2B.every((s) => paths.includes(`/servicos/${s}`)), "variante empresarial só nas duas páginas puras");
check(!lib.includes('"redes-e-wifi"'), "redes-e-wifi não é convertida ao template empresarial");

// 2. Aplicação no React.
check(core.includes("visual3T") && core.includes("heroEmpresarial") && core.includes("contextoEmpresarial"), "ServicoCore aplica hero e contexto B2B");
check(core.includes("blocos3T") && core.includes("<Blocos3T"), "ServicoCore renderiza os blocos 3T");
check(
  layout.includes("const heroB2B = data.heroEmpresarial") && layout.includes("const contextoB2B = data.contextoEmpresarial"),
  "layout aceita hero e contexto empresarial por página",
);
check(layout.includes('data.confianca && <TrustStrip variant="compact"'), "TrustStrip principal renderizado uma única vez");

// 3. Hero próprio por página empresarial.
const heros = B2B.map((s) => {
  const bloco = lib.match(new RegExp(`"${s}": \\{[\\s\\S]*?\\n  \\},`))?.[0] ?? "";
  return {
    slug: s,
    bloco,
    contexto: bloco.match(/contexto:\s*\n?\s*"([^"]+)"/)?.[1] ?? "",
    cta: bloco.match(/ctaPrimario:\s*"([^"]+)"/)?.[1] ?? "",
    cards: (bloco.match(/titulo:/g) || []).length,
  };
});
for (const h of heros) {
  check(h.contexto.length > 10 && h.cta.length > 5, `${h.slug}: hero empresarial próprio definido`);
  check(h.cards === 3, `${h.slug}: três cartões de contexto`);
  check(/\/servicos\/|\/empresa-de-ti-curitiba/.test(h.bloco), `${h.slug}: CTA secundário é link interno`);
  check(!/wa\.me/.test(h.bloco), `${h.slug}: sem segundo CTA de WhatsApp`);
}
check(new Set(heros.map((h) => h.contexto)).size === 2 && new Set(heros.map((h) => h.cta)).size === 2, "heros empresariais distintos entre si");

// 4. Diferenciação obrigatória entre as três páginas.
const assinatura = (slug) => BLOCOS_3T[slug].secoes.map((s) => `${s.kind}:${s.id}`).join("|");
check(new Set(TODAS.map(assinatura)).size === 3, "as três páginas têm blocos e ordem diferentes");
check(new Set(TODAS.map((s) => CTA_3T[s].label)).size === 3, "CTA intermediário distinto por página");
const titulos = TODAS.flatMap((s) => BLOCOS_3T[s].secoes.map((x) => x.titulo));
check(new Set(titulos).size === titulos.length, "nenhum título de bloco repetido entre as páginas");
check(TODAS.every((s) => BLOCOS_3T[s].secoes.length >= 4), "cada página tem ao menos quatro blocos próprios");

// 5. Contratos editoriais por página.
const texto = (slug) => JSON.stringify(BLOCOS_3T[slug]).toLowerCase();
const prev = texto("manutencao-preventiva-empresas");
check(/levantamento/.test(prev) && /inspe[çc]/.test(prev), "preventiva: fluxo de levantamento e inspeção");
check(BLOCOS_3T["manutencao-preventiva-empresas"].secoes.some((s) => s.kind === "matriz"), "preventiva: matriz de prioridades");
check(/n[ãa]o elimina falhas inesperadas/.test(prev), "preventiva: aviso de que não elimina falhas");

const bkp = texto("backup-para-empresas");
check(/sincroniza[çc][ãa]o/.test(bkp) && /replica altera/.test(bkp), "backup: sincronização distinta de backup");
check(/recupera[çc][ãa]o de dados/.test(bkp) && /tentativa posterior/.test(bkp), "backup: recuperação distinta de backup");
check(/restaura[çc][ãa]o [ée] testado/.test(bkp), "backup: teste de restauração promovido");
check(BLOCOS_3T["backup-para-empresas"].secoes.some((s) => s.kind === "responsabilidades"), "backup: bloco de responsabilidades");

const redes = texto("redes-e-wifi");
check(/home office/.test(redes) && /escrit[óo]rio/.test(redes), "redes: público residencial e empresarial preservados");
check(/operadora/.test(redes) && /link/.test(redes), "redes: limites da operadora declarados");
check(/configura[çc][ãa]o, comunica[çc][ãa]o e compartilhamento em rede/.test(redes), "redes: impressoras limitadas à rede");
check(!/cabe[çc]ote[^"]*reparo/.test(redes.replace(/n[ãa]o fazemos[\s\S]*/, "")), "redes: sem reparo físico de impressora no escopo");
check(BLOCOS_3T["redes-e-wifi"].secoes.some((s) => s.kind === "contextos"), "redes: seletor de contexto não interativo");
check(!comp.includes("useState"), "redes: blocos sem estado/abas dependentes de JS");

// 6. Claims proibidos e preço novo em toda a camada 3T.
const claims = [
  /em at[ée] \d+\s*(h|horas|dias)/i,
  /\bsla\b/i,
  /tempo de resposta/i,
  /chamados ilimitados/i,
  /plano mensal|mensalidade|franquia de horas/i,
  /monitoramento cont[íi]nuo(?! sem contrata)/i,
  /armazenamento ilimitado(?!\s*nem)/i,
  /garantimos? (o )?(resultado|funcionamento)/i,
  /100% (seguro|garantido)|seguran[çc]a total|nunca perca|sempre protegid/i,
  /conformidade (com a )?(lgpd|iso)(?! autom)/i,
];
const alvo = (lib + JSON.stringify(BLOCOS_3T) + JSON.stringify(CTA_3T))
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/^\s*\/\/.*$/gm, "");
for (const re of claims) {
  const m = alvo.match(re);
  check(!m || /não|nao/i.test(alvo.slice(Math.max(0, m.index - 40), m.index)), `3T: sem promessa não comprovável (${re})`);
}
check(!/R\$/.test(alvo), "3T: sem preço novo na camada visual");
check(/fornecedor/i.test(alvo), "3T: limites de sistemas de terceiros explicitados");

// 7. Paridade HTML estático × React.
check(staticBody.includes("blocos3tHtml(route.path)") && staticBody.includes("BLOCOS_3T"), "HTML estático renderiza os blocos 3T");
check(staticBody.includes("VISUAL_3T_STATIC") && !staticBody.match(/VISUAL_3T_STATIC[\s\S]{0,1200}redes-e-wifi/), "HTML estático não converte redes ao contexto empresarial");
for (const s of B2B) check(staticBody.includes(`"/servicos/${s}"`), `HTML estático cobre /servicos/${s}`);

for (const m of ok) console.log(`  ✓ ${m}`);
if (errors.length) {
  console.error("\n✗ RODADA 3T com pendências:");
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}
console.log("\nRODADA 3T: propagação controlada do sistema empresarial validada.");
