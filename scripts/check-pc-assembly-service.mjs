#!/usr/bin/env node
/**
 * GATE — RODADA 3L: serviço de montagem de PC (fail-closed).
 *
 * Regras validadas:
 *  1. Fonte de capacidade documentada (src/lib/politicaMontagem.ts) com todas
 *     as capacidades centrais confirmadas.
 *  2. Se a capacidade NÃO estiver aprovada: a rota /servicos/montagem-de-pc não
 *     pode existir em lugar nenhum (dados, rotas, sitemap, HTML servido).
 *  3. Se aprovada: rota registrada, conteúdo estático completo, FAQ mínima,
 *     links obrigatórios, CTA, sitemap, sem promessa de desempenho e sem preço
 *     fechado inventado.
 *  4. Políticas de peças, BIOS, testes e garantia declaradas.
 */
import { readFileSync, existsSync } from "node:fs";

const ROUTE = "/servicos/montagem-de-pc";
const errors = [];
const notes = [];
const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

// ── 1. Fonte de capacidade ────────────────────────────────────
const politica = read("src/lib/politicaMontagem.ts");
if (!politica) errors.push("Fonte de capacidade ausente: src/lib/politicaMontagem.ts");

const CENTRAIS = [
  "Montagem física completa",
  "Avaliação de compatibilidade",
  "Fonte e consumo estimado",
  "Refrigeração a ar",
  "Configuração de BIOS/UEFI",
  "Drivers oficiais",
  "Testes de memória",
  "Testes de temperatura",
  "Testes de estabilidade",
  "Registro das peças",
  "Garantia da mão de obra",
  "Autorização comercial",
];

const confirmadas = new Set();
for (const m of politica.matchAll(/capacidade:\s*"([^"]+)",\s*confirmada:\s*(true|false),\s*fonte:\s*"([^"]*)"/g)) {
  if (m[2] === "true") {
    if (!m[3].trim()) errors.push(`Capacidade "${m[1]}" confirmada sem fonte documentada`);
    confirmadas.add(m[1]);
  }
}
const faltantes = CENTRAIS.filter((c) => !confirmadas.has(c));
const aprovado = faltantes.length === 0;

for (const bloco of ["PECAS_DO_CLIENTE", "PECAS_ADQUIRIDAS", "REGRA_BIOS", "TESTES_MONTAGEM", "GARANTIA_MONTAGEM"]) {
  if (!politica.includes(`export const ${bloco}`)) errors.push(`Política obrigatória ausente: ${bloco}`);
}

// ── 2/3. Presença da rota ─────────────────────────────────────
const core = read("src/lib/servicosCore.ts");
const app = read("src/App.tsx");
const legacy = read("src/LegacyApp.tsx");
const curated = read("scripts/lib/curated-urls.mjs");
const meta = read("scripts/curated-routes-meta.mjs");
const staticBody = read("scripts/curated-static-body.mjs");

const existe =
  core.includes('"montagem-de-pc"') || app.includes(ROUTE) || curated.includes(ROUTE);

if (!aprovado) {
  notes.push(`CAPACIDADE INCOMPLETA — faltam: ${faltantes.join(", ")}`);
  if (existe) errors.push(`Rota ${ROUTE} publicada sem aprovação operacional (fail-closed)`);
} else {
  notes.push("CAPACIDADE CONFIRMADA — rota liberada");
  if (!app.includes(ROUTE)) errors.push("Rota ausente em src/App.tsx");
  if (!legacy.includes(ROUTE)) errors.push("Rota ausente em src/LegacyApp.tsx");
  if (!curated.includes(ROUTE)) errors.push("Rota ausente no manifesto curado (sitemap)");
  if (!meta.includes(ROUTE)) errors.push("Metadata estática ausente (prerender)");
  if (!staticBody.includes(ROUTE)) errors.push("Links obrigatórios ausentes no corpo estático");

  // Conteúdo da entrada de serviço
  // O bloco vai do início da entrada até o fechamento dela (`\n  },`), e não
  // até o fim do objeto — senão o gate audita também os serviços seguintes.
  const start = core.indexOf('"montagem-de-pc": {');
  const end = start === -1 ? -1 : core.indexOf("\n  },", start);
  const chunk = start === -1 || end === -1 ? "" : core.slice(start, end + 5);

  if (!chunk) errors.push("Entrada montagem-de-pc ausente em servicosCore.ts");

  const faqCount = [...chunk.matchAll(/question:\s*"/g)].length;
  if (faqCount < 10) errors.push(`FAQ insuficiente: ${faqCount} perguntas (mínimo 10)`);

  const palavras = chunk.replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean).length;
  if (palavras < 900) errors.push(`Conteúdo raso: ~${palavras} palavras (mínimo 900)`);
  notes.push(`Conteúdo da fonte: ~${palavras} palavras, ${faqCount} FAQs`);

  for (const link of [
    "/servicos/manutencao-de-computador",
    "/servicos/upgrade-ssd-ram",
    "/equipamentos-atendidos",
    "/precos-e-politicas",
    "/como-funciona",
    "/coleta-e-entrega",
  ]) {
    const viaBase =
      chunk.includes("...LINKS_BASE") &&
      ["/precos-e-politicas", "/como-funciona", "/faq"].includes(link);
    if (!chunk.includes(link) && !viaBase) errors.push(`Link obrigatório ausente na página: ${link}`);
  }
  if (!/whatsappMessage:/.test(chunk)) errors.push("CTA/triagem ausente (whatsappMessage)");

  // Promessas de desempenho e preço inventado
  const proibido = [
    /máximo desempenho/i,
    /desempenho garantido/i,
    /sem gargalo/i,
    /melhor fps/i,
    /\bfps\b/i,
    /\d+\s*(vezes|x)\s*mais rápido/i,
    /pc gamer perfeito/i,
    /setup dos sonhos/i,
    /montagem no mesmo dia/i,
    /especialista em todas as marcas/i,
    /a partir de r\$\s?\d/i,
    /r\$\s?\d[\d.,]*/i,
  ];
  for (const re of proibido) {
    if (re.test(chunk)) errors.push(`Copy proibida na página de montagem: ${re}`);
  }
}

// ── Saída ─────────────────────────────────────────────────────
console.log("── GATE check:pc-assembly-service ──");
notes.forEach((n) => console.log("  •", n));
if (errors.length) {
  console.error("\nFALHAS:");
  errors.forEach((e) => console.error("  ✗", e));
  process.exit(1);
}
console.log("✓ Gate de montagem de PC aprovado");
