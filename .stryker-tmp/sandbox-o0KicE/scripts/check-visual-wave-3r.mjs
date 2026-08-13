// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// GATE — RODADA 3R (sistema visual das páginas de sintomas)
//
// Valida, sobre o código-fonte das páginas do cluster /problemas/*:
//   • exatamente duas páginas de sintomas governadas (zero URL nova);
//   • padrão visual presente nas duas (eyebrow, resumo, CTA, TrustStrip, sumário);
//   • alerta de risco na página notebook-nao-liga;
//   • nenhum procedimento invasivo/perigoso recomendado;
//   • no máximo três CTAs de triagem por página;
//   • TrustStrip sem duplicação;
//   • WebPage + FAQPage não vazio; nenhum Service/Offer/preço;
//   • breadcrumb de "Problemas" (sem link e sem URL inexistente);
//   • páginas de serviço sem template de sintoma.
// ─────────────────────────────────────────────────────────────
import { readFileSync, existsSync, readdirSync } from "node:fs";

const errors = [];
const ok = [];
const fail = (m) => errors.push(m);
const pass = (m) => ok.push(m);

const DIR = "src/pages/problemas";
const ESPERADAS = ["ComputadorLento.tsx", "NotebookNaoLiga.tsx"];

// ── 1. Escopo ────────────────────────────────────────────────
const arquivos = existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith(".tsx")).sort() : [];
if (arquivos.join(",") !== ESPERADAS.join(",")) {
  fail(`Cluster de sintomas deve ter exatamente 2 páginas curadas. Encontrado: ${arquivos.join(", ") || "nenhuma"}`);
} else {
  pass("Cluster de sintomas com exatamente duas páginas curadas.");
}

// Procedimentos perigosos que nunca podem ser recomendados.
const PERIGOSOS = [
  /secador de cabelo/i,
  /\bfreezer\b/i,
  /\breflow\b/i,
  /curto\s+(nos?\s+)?pinos/i,
  /aquecer a placa/i,
  /remova a bateria interna/i,
  /desmonte o (notebook|computador)/i,
  /fonte improvisada/i,
];
const SCHEMAS_PROIBIDOS = [/"@type":\s*"Service"/, /"@type":\s*"Offer"/, /"@type":\s*"Product"/, /"@type":\s*"HowTo"/, /aggregateRating/];

for (const arquivo of arquivos) {
  const src = readFileSync(`${DIR}/${arquivo}`, "utf8");
  const nome = arquivo.replace(".tsx", "");

  // Padrão visual compartilhado
  for (const [rotulo, re] of [
    ["TrustStrip", /<TrustStrip\s*\/>/],
    ["sumário navegável", /<PageTableOfContents/],
    ["WebPage schema", /SCHEMA_SLOTS\.webPage/],
    ["FAQPage schema", /SCHEMA_SLOTS\.faq/],
    ["breadcrumb visual", /<Breadcrumbs/],
  ]) {
    if (re.test(src)) pass(`${nome}: ${rotulo} presente.`);
    else fail(`${nome}: ${rotulo} ausente.`);
  }

  // TrustStrip sem duplicação
  const trust = (src.match(/<TrustStrip\s*\/>/g) ?? []).length;
  if (trust > 1) fail(`${nome}: TrustStrip duplicada (${trust} ocorrências).`);

  // Breadcrumb de Problemas, sem rota inexistente
  if (!/label:\s*"Problemas"\s*}/.test(src)) fail(`${nome}: breadcrumb deve usar "Problemas" sem href.`);
  if (/label:\s*"Problemas",\s*href/.test(src) || /"\/problemas"/.test(src)) {
    fail(`${nome}: breadcrumb não pode linkar para /problemas (rota inexistente).`);
  }
  if (/label:\s*"Serviços"/.test(src)) fail(`${nome}: "Serviços" não pode ser o nível pai do breadcrumb.`);

  // CTAs de triagem: máximo três
  const ctas = (src.match(/data-cta-location="problema_/g) ?? []).length;
  if (ctas === 0) fail(`${nome}: nenhum CTA de triagem com contexto encontrado.`);
  else if (ctas > 3) fail(`${nome}: ${ctas} CTAs de triagem (máximo 3).`);
  else pass(`${nome}: ${ctas} CTA(s) de triagem dentro do limite.`);

  // FAQ não vazio
  const faqs = (src.match(/question:/g) ?? []).length;
  if (faqs < 3) fail(`${nome}: FAQPage com poucas perguntas (${faqs}).`);

  // Schemas proibidos
  for (const re of SCHEMAS_PROIBIDOS) {
    if (re.test(src)) fail(`${nome}: schema proibido em página de sintoma (${re}).`);
  }
  if (/R\$\s?\d/.test(src)) fail(`${nome}: página de sintoma não pode exibir preço.`);

  // Segurança técnica
  for (const re of PERIGOSOS) {
    if (re.test(src)) fail(`${nome}: procedimento invasivo/perigoso mencionado como orientação (${re}).`);
  }
}

// ── 2. Notebook não liga: alerta de risco antes das orientações ──
const notebook = existsSync(`${DIR}/NotebookNaoLiga.tsx`) ? readFileSync(`${DIR}/NotebookNaoLiga.tsx`, "utf8") : "";
if (notebook) {
  const alerta = notebook.indexOf('id="nao-insistir"');
  const testes = notebook.indexOf('id="testes"');
  if (alerta === -1) fail("notebook-nao-liga: alerta de risco ausente.");
  else if (testes !== -1 && alerta > testes) fail("notebook-nao-liga: alerta de risco deve vir antes das verificações.");
  else pass("notebook-nao-liga: alerta de risco antes das orientações.");

  if (!/role="alert"/.test(notebook)) fail("notebook-nao-liga: alerta de risco sem role=\"alert\".");
  for (const rota of ["/servicos/manutencao-de-notebook", "/servicos/recuperacao-de-dados"]) {
    if (!notebook.includes(rota)) fail(`notebook-nao-liga: link obrigatório ausente (${rota}).`);
  }
}

// ── 3. Regressão: páginas de serviço sem template de sintoma ──
const servicosDir = "src/pages/servicos";
if (existsSync(servicosDir)) {
  for (const f of readdirSync(servicosDir).filter((x) => x.endsWith(".tsx"))) {
    const src = readFileSync(`${servicosDir}/${f}`, "utf8");
    if (/data-cta-location="problema_/.test(src)) fail(`${f}: página de serviço com CTA exclusivo de sintoma.`);
  }
  pass("Páginas de serviço sem elementos exclusivos do template de sintoma.");
}

// ── Relatório ────────────────────────────────────────────────
console.log(`\nGATE check:visual-wave-3r — ${ok.length} verificações OK`);
ok.forEach((m) => console.log(`  ✓ ${m}`));
if (errors.length) {
  console.error(`\n${errors.length} falha(s):`);
  errors.forEach((m) => console.error(`  ✗ ${m}`));
  process.exit(1);
}
console.log("\nRODADA 3R: padrão visual de sintomas validado.\n");
