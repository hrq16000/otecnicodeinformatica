#!/usr/bin/env node
/**
 * GATE — PII EM ANALYTICS (Rodada 6B, FASES 16/17)
 * Fail-closed: qualquer chave sensível em payload de analytics/telemetria,
 * ou repasse cego de objetos de formulário, bloqueia o build.
 */
import { readFileSync } from "node:fs";

const ARQUIVOS = [
  "src/lib/analyticsContract.ts",
  "src/lib/funnelAnalytics.ts",
  "src/components/PageViewTracker.tsx",
  "src/lib/oportunidadeAnalise.ts",
  "src/components/admin/JornadaSankey.tsx",
  "src/components/admin/RelatorioOportunidade.tsx",
];

const CHAVES = [
  "name", "nome", "email", "phone", "telefone", "whatsapp_number", "address", "endereco",
  "cpf", "cnpj", "document", "documento", "lat", "lng", "latitude", "longitude",
  "message", "mensagem", "description", "descricao", "free_text",
];

const TIPOS = "string|number|boolean|unknown|undefined|null|Record|Array|Set|Map";
const erros = [];

for (const arquivo of ARQUIVOS) {
  let src;
  try {
    src = readFileSync(arquivo, "utf8");
  } catch {
    erros.push(`arquivo obrigatório ausente: ${arquivo}`);
    continue;
  }
  src.split("\n").forEach((linha, i) => {
    const t = linha.trim();
    if (t.startsWith("//") || t.startsWith("*") || t.startsWith("/*")) return;
    for (const chave of CHAVES) {
      const re = new RegExp(`(?:^|[{,\\s])${chave}\\s*:\\s*(?!\\s*(?:${TIPOS})\\b)`, "i");
      if (re.test(linha)) erros.push(`${arquivo}:${i + 1} — chave sensível "${chave}" em payload`);
    }
    // FASE 17 — repasse cego de objetos que podem conter texto livre.
    if (/\b(?:track|persistClickEvent|gtag)\([^)]*\b(?:formData|payload|values|dados|form)\b\s*[,)]/.test(linha)) {
      erros.push(`${arquivo}:${i + 1} — repasse cego de objeto de formulário para analytics`);
    }
  });
}

if (erros.length) {
  console.error(`\n✖ BLOQUEADO — ${erros.length} risco(s) de PII em analytics:`);
  for (const e of erros) console.error(`  · ${e}`);
  process.exit(1);
}
console.log(`✓ Sem PII em analytics — ${ARQUIVOS.length} arquivos auditados, ${CHAVES.length} chaves proibidas.`);
