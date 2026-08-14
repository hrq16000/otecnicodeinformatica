// GATE — CONTATO CANÔNICO (Rodada 8B)
//
// Regra: as superfícies de produção só podem conter o número oficial
// configurado em VITE_WHATSAPP_NUMBER. Qualquer wa.me/api.whatsapp,
// tel: ou telefone em JSON-LD com dígitos diferentes reprova o build.
//
// Uso: node scripts/check-canonical-contact.mjs
// Saída: reports/contact-number-inventory.md
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { WHATSAPP_NUMBER, WHATSAPP_CONFIGURED } from "./lib/site-env.mjs";

if (!WHATSAPP_CONFIGURED) {
  console.error("BLOQUEADO: VITE_WHATSAPP_NUMBER não configurado.");
  process.exit(1);
}
const OFICIAL = WHATSAPP_NUMBER;

const RAIZES = ["src", "public", "index.html"];
const IGNORAR = /(node_modules|\.git|dist|coverage|\.lighthouseci|__tests__|\.test\.|\.spec\.)/;
const EXT = /\.(ts|tsx|js|jsx|mjs|json|html|txt|xml|md)$/;

function arquivos(alvo, acc = []) {
  if (IGNORAR.test(alvo)) return acc;
  const st = statSync(alvo, { throwIfNoEntry: false });
  if (!st) return acc;
  if (st.isDirectory()) {
    for (const f of readdirSync(alvo)) arquivos(path.join(alvo, f), acc);
  } else if (EXT.test(alvo)) acc.push(alvo);
  return acc;
}

const encontrados = new Map(); // numero -> Set(arquivo)
const registrar = (num, file) => {
  if (!encontrados.has(num)) encontrados.set(num, new Set());
  encontrados.get(num).add(file);
};

const PADROES = [
  /(?:wa\.me|api\.whatsapp\.com\/send\?phone=)\/?(\d{10,15})/g,
  /tel:\+?([\d\s()-]{8,})/g,
  /"telephone"\s*:\s*"([^"]+)"/g,
];

for (const raiz of RAIZES) {
  for (const file of arquivos(raiz)) {
    const conteudo = readFileSync(file, "utf8");
    for (const re of PADROES) {
      for (const m of conteudo.matchAll(re)) {
        const digitos = m[1].replace(/\D/g, "");
        if (digitos.length >= 10) registrar(digitos, file);
      }
    }
  }
}

const violacoes = [];
for (const [num, files] of encontrados) {
  if (num.slice(-11) !== OFICIAL.slice(-11)) {
    violacoes.push({ num, files: [...files] });
  }
}

mkdirSync("reports", { recursive: true });
const linhas = [
  "# Inventário de telefones — superfícies de produção",
  "",
  `Número canônico: **${OFICIAL}** (formato humano: (41) 99708-6380)`,
  "",
  "| Número | Arquivos | Ação |",
  "| --- | --- | --- |",
];
for (const [num, files] of encontrados) {
  const ok = num.slice(-11) === OFICIAL.slice(-11);
  linhas.push(`| ${num} | ${[...files].join("<br>")} | ${ok ? "manter (canônico)" : "REMOVER"} |`);
}
if (encontrados.size === 0) linhas.push("| — | — | nenhum número literal em código-fonte |");
writeFileSync("reports/contact-number-inventory.md", `${linhas.join("\n")}\n`);

console.log(
  `contato canônico: ${OFICIAL} · ${encontrados.size} número(s) distinto(s) nas superfícies · ${violacoes.length} violação(ões)`,
);
for (const v of violacoes) console.log(`  FAIL ${v.num} em ${v.files.join(", ")}`);
console.log("relatório: reports/contact-number-inventory.md");
if (violacoes.length) process.exit(1);
