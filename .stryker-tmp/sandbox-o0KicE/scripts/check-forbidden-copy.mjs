#!/usr/bin/env node
// @ts-nocheck
/**
 * GATE DE COPY PROIBIDO
 *
 * Bloqueia no CI qualquer reintrodução de:
 *   1. CNPJ, razão social ou o nome da entidade jurídica (Ping Soluções);
 *   2. e-mail de contato publicado (mailto: / contato@dominio);
 *   3. o número de WhatsApp como texto visível (só é permitido em wa.me,
 *      no campo `telephone` do JSON-LD e nas constantes de configuração);
 *   4. rótulos de CTA fora das famílias oficiais definidas em
 *      src/lib/ctaLabels.ts (FASE 18 da Rodada 3).
 *
 * Uso: node scripts/check-forbidden-copy.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["src", "index.html", "scripts/curated-static-body.mjs", "scripts/curated-routes-meta.mjs"];
const EXT = new Set([".ts", ".tsx", ".html", ".mjs"]);
const SKIP = /(^|\/)(node_modules|dist|\.git)(\/|$)|\.test\.[tj]sx?$/;

const RULES = [
  { id: "cnpj", re: /\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/, msg: "CNPJ exposto" },
  { id: "cnpj-palavra", re: /\bCNPJ\b(?!\s*nem)/, msg: "menção a CNPJ" },
  { id: "razao-social", re: /raz[ãa]o social/i, msg: "menção a razão social" },
  { id: "entidade", re: /Ping\s+Solu[çc][õo]es/i, msg: "razão social exposta" },
  { id: "email", re: /mailto:|contato@[a-z0-9.-]+/i, msg: "e-mail de contato exposto" },
  { id: "whatsapp-visivel", re: /\(?41\)?[\s.-]?9{1,2}\s?9?7\d{3}[-\s.]?\d{4}/, msg: "número de WhatsApp visível" },
  // RODADA 3 — FASE 18: rótulos de CTA fora das famílias oficiais.
  // A palavra "orçamento" segue permitida no texto editorial; o que é
  // bloqueado é usá-la (ou variações soltas) como rótulo de botão.
  {
    id: "cta-familia",
    re: /^\s*(Solicitar|Quero|Pedir|Fazer|Peça)\s+(um\s+)?or[çc]amento\s*$|^\s*(Fale conosco|Chamar no zap|Clique aqui)\s*$/i,
    msg: 'rótulo de CTA fora da família oficial (src/lib/ctaLabels.ts): "Solicitar diagnóstico" · "Iniciar atendimento" · "Continuar no WhatsApp"',
  },
];


/** Exceções conscientes (código, não copy visível). */
const ALLOW = [
  { file: "src/lib/funnel/triageConfig.ts", id: "cnpj-palavra" },
  { file: "src/lib/funnel/triageConfig.ts", id: "razao-social" },
  { file: "src/lib/funnelAnalytics.ts", id: "cnpj-palavra" },
  { file: "src/lib/funnelAnalytics.ts", id: "razao-social" },
  { file: "src/lib/siteConfig.ts", id: "cnpj-palavra" },
  { file: "src/lib/siteConfig.ts", id: "razao-social" },
  { file: "src/lib/config/brand.ts", id: "razao-social" },
  // Formulário do programa de parceiros: campo de documento (CPF/CNPJ) é
  // dado do parceiro, não identificação jurídica do portal.
  { file: "src/pages/profissionais/CadastroParceiro.tsx", id: "cnpj-palavra" },
  // rotas legadas/canônicas que não podem ser removidas (SEO evolutivo)
];

const files = [];
const walk = (p) => {
  const st = statSync(p);
  if (st.isDirectory()) return readdirSync(p).forEach((f) => !SKIP.test(join(p, f)) && walk(join(p, f)));
  if (EXT.has(extname(p)) && !SKIP.test(p)) files.push(p);
};
for (const r of ROOTS) { try { walk(r); } catch { /* opcional */ } }

const findings = [];
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const rule of RULES) {
      if (!rule.re.test(line)) continue;
      if (ALLOW.some((a) => a.file === file && a.id === rule.id)) continue;
      // wa.me e telephone do JSON-LD são permitidos
      if (rule.id === "whatsapp-visivel" && /wa\.me|telephone|whatsappNumber|phoneE164/.test(line)) continue;
      findings.push({ file, line: i + 1, rule: rule.id, msg: rule.msg, text: line.trim().slice(0, 120) });
    }
  });
}

if (findings.length) {
  console.error(`\n❌ Copy proibido: ${findings.length} ocorrência(s)\n`);
  for (const f of findings) console.error(`  ${f.file}:${f.line}  [${f.rule}] ${f.msg}\n      ${f.text}`);
  console.error("\nCTAs oficiais: Solicitar diagnóstico · Iniciar atendimento · Continuar no WhatsApp. Sem CNPJ, razão social, e-mail ou telefone visível.");
  process.exit(1);
}
console.log("✅ Copy proibido: nenhuma ocorrência (CNPJ, razão social, e-mail, telefone visível, rótulo de CTA).");
