#!/usr/bin/env node
/**
 * GATE — Ficha comercial padronizada (Rodada 4C)
 *
 * Falha o build quando:
 *  1) Algum serviço core não tem ficha comercial.
 *  2) Alguma ficha não tem TODOS os campos obrigatórios preenchidos.
 *  3) Algum rótulo de preço da ficha diverge da fonte única (precosConfig).
 *  4) A ficha promete prazo de conclusão, resultado ou peça inclusa.
 *  5) Uma garantia de 90 dias aparece sem o escopo (mão de obra / ponto reparado).
 */
import fs from "node:fs";

const read = (p) => fs.readFileSync(p, "utf8");
const errors = [];

const precos = read("src/lib/precosConfig.ts");
const ficha = read("src/lib/fichaComercial.ts");
const core = read("src/lib/servicosCore.ts");
const componente = read("src/components/servico/FichaComercialServico.tsx");
const servicoCore = read("src/pages/servicos/ServicoCore.tsx");

// 1 — todo slug core precisa de ficha
const slugs = [...core.matchAll(/^ {2}"?([a-z0-9-]+)"?:\s*\{/gm)].map((m) => m[1]);
const fichaSlugs = [...ficha.matchAll(/^ {2}"?([a-z0-9-]+)"?:\s*ficha\(/gm)].map((m) => m[1]);
for (const s of slugs) {
  if (!fichaSlugs.includes(s)) errors.push(`Serviço sem ficha comercial: ${s}`);
}
if (!slugs.length) errors.push("Nenhum slug de serviço encontrado em servicosCore.ts");

// 2 — campos obrigatórios presentes no modelo e renderizados
const CAMPOS = [
  "valorInicialLabel",
  "valorInicialNota",
  "tempoEstimado",
  "incluso",
  "naoIncluso",
  "acrescimos",
  "observacoes",
  "limitacoes",
];
for (const campo of CAMPOS) {
  if (!ficha.includes(campo)) errors.push(`Campo obrigatório ausente no modelo: ${campo}`);
  if (!componente.includes(campo)) errors.push(`Campo obrigatório não renderizado: ${campo}`);
}
for (const s of fichaSlugs) {
  const bloco = ficha.split(`${s.includes("-") ? `"${s}"` : s}: ficha(`)[1] ?? "";
  const corpo = bloco.slice(0, bloco.indexOf("}),"));
  if (!/incluso:\s*\[/.test(corpo)) errors.push(`${s}: sem "incluso"`);
  if (!/limitacoes:\s*\[/.test(corpo)) errors.push(`${s}: sem "limitacoes"`);
}

// 3 — preços só podem vir da fonte única
const precoLiterais = [...ficha.matchAll(/R\$\s?[\d.]+,\d{2}/g)].map((m) => m[0]);
if (precoLiterais.length) {
  errors.push(
    `Preço escrito à mão em fichaComercial.ts (use precosConfig): ${[...new Set(precoLiterais)].join(", ")}`,
  );
}
for (const token of [
  "VALOR_VISITA_LABEL",
  "VALOR_PACOTE_2H_LABEL",
  "VALOR_COLETA_MINIMO_LABEL",
  "REGRA_CANCELAMENTO",
  "NOTA_VISITA_AVULSA",
]) {
  if (!precos.includes(`export const ${token}`)) errors.push(`Fonte única sem ${token}`);
  if (!ficha.includes(token)) errors.push(`Ficha não consome ${token} da fonte única`);
}
if (!componente.includes("fichaComercialDoServico")) {
  errors.push("Componente não lê a ficha da fonte única");
}
if (!servicoCore.includes("FichaComercialServico")) {
  errors.push("ServicoCore não renderiza a ficha comercial");
}

// 4 — nenhuma promessa (comentários do arquivo não contam)
const fichaCode = ficha
  .split("\n")
  .filter((l) => !/^\s*(\*|\/\/|\/\*)/.test(l))
  .join("\n");
const PROIBIDO = [
  /entrega (?:em|no mesmo) dia/i,
  /prazo garantido/i,
  /resolvemos qualquer/i,
  /100% de sucesso/i,
  /pe[çc]a inclusa/i,
];
for (const re of PROIBIDO) {
  if (re.test(fichaCode)) errors.push(`Promessa proibida na ficha: ${re}`);
}

// 5 — garantia sempre escopada
for (const linha of fichaCode.split("\n")) {
  if (/90 dias/.test(linha) && !/(mão de obra|ponto reparado)/i.test(linha)) {
    errors.push(`Garantia de 90 dias sem escopo: ${linha.trim()}`);
  }
}

if (errors.length) {
  console.error("❌ check:ficha-comercial falhou:\n" + errors.map((e) => ` - ${e}`).join("\n"));
  process.exit(1);
}
console.log(
  `✅ check:ficha-comercial — ${fichaSlugs.length} serviços com ficha padronizada, preços vindos da fonte única.`,
);
