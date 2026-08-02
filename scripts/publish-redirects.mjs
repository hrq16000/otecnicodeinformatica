// RODADA 4B.1 — Modo de publicação controlada do mapa de redirects.
// Só marca `published: true` em redirects/tecnicocuritiba.map.json depois que a
// lista de URLs for aprovada explicitamente, e sempre gera um pacote de rollback.
//
// Uso:
//   node scripts/publish-redirects.mjs --approval=docs/migracao/aprovacao-urls.txt --approve="APROVO 612 REGRAS"
//   node scripts/publish-redirects.mjs --rollback=redirects/rollback/<pasta>
//
// Regras:
//   · a lista de aprovação precisa conter exatamente as origens da matriz;
//   · sem a frase de aprovação exata o script falha e nada é alterado;
//   · o pacote de rollback (mapa anterior + comando + metadados) é escrito antes
//     de qualquer mutação.
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from "node:fs";
import { execSync } from "node:child_process";

const MAP_PATH = "redirects/tecnicocuritiba.map.json";
const args = process.argv.slice(2);
const argVal = (n) => {
  const hit = args.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.slice(n.length + 3) : null;
};

const fail = (msg) => {
  console.error(`BLOQUEADO: ${msg}`);
  process.exit(1);
};

const rollbackDir = argVal("rollback");
if (rollbackDir) {
  const src = `${rollbackDir}/tecnicocuritiba.map.json`;
  if (!existsSync(src)) fail(`pacote de rollback inválido: ${src} não existe`);
  copyFileSync(src, MAP_PATH);
  console.log(`rollback aplicado a partir de ${src} (published restaurado).`);
  process.exit(0);
}

const map = JSON.parse(readFileSync(MAP_PATH, "utf8"));
const approvalPath = argVal("approval");
const approvePhrase = argVal("approve");
const expectedPhrase = `APROVO ${map.rules.length} REGRAS`;

if (!approvalPath) fail("informe --approval=<arquivo com a lista de URLs aprovadas>");
if (!existsSync(approvalPath)) fail(`arquivo de aprovação não encontrado: ${approvalPath}`);
if (approvePhrase !== expectedPhrase)
  fail(`frase de aprovação ausente ou incorreta. Esperado --approve="${expectedPhrase}"`);

const approved = readFileSync(approvalPath, "utf8")
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("#"));

const expected = map.rules.map((r) => r.from);
const missing = expected.filter((p) => !approved.includes(p));
const extra = approved.filter((p) => !expected.includes(p));

if (missing.length || extra.length) {
  console.error(`Lista de aprovação divergente da matriz (${map.rules.length} regras).`);
  if (missing.length) console.error(`  faltando (${missing.length}): ${missing.slice(0, 10).join(", ")}...`);
  if (extra.length) console.error(`  excedentes (${extra.length}): ${extra.slice(0, 10).join(", ")}...`);
  fail("aprovação incompleta — nada foi publicado");
}

// Pacote de rollback ANTES de qualquer mutação.
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const dir = `redirects/rollback/${stamp}`;

// --dry-run: simula a publicação, mostra o diff do mapa e do rollback e sai
// sem escrever nada em disco.
if (args.includes("--dry-run")) {
  const after = {
    ...map,
    published: true,
    published_at: "<timestamp na publicação real>",
    approved_urls: approved.length,
    rollback_package: dir,
  };
  const keys = ["published", "published_at", "approved_urls", "rollback_package"];
  console.log(`DRY-RUN: nenhuma alteração escrita em disco.`);
  console.log(`Aprovação validada: ${approved.length}/${map.rules.length} origens conferem.`);
  console.log(`Frase de aprovação aceita: "${expectedPhrase}"`);
  console.log("\nDiff simulado de " + MAP_PATH + ":");
  for (const k of keys) {
    const before = k in map ? JSON.stringify(map[k]) : "(ausente)";
    console.log(`  - ${k}: ${before}\n  + ${k}: ${JSON.stringify(after[k])}`);
  }
  console.log("\nPacote de rollback que seria criado:");
  console.log(`  + ${dir}/tecnicocuritiba.map.json (cópia do mapa atual, published=${map.published === true})`);
  console.log(`  + ${dir}/ROLLBACK.md (instruções + commit atual)`);
  console.log(`\nPara publicar de verdade, repita o comando sem --dry-run.`);
  process.exit(0);
}

mkdirSync(dir, { recursive: true });
copyFileSync(MAP_PATH, `${dir}/tecnicocuritiba.map.json`);

let commit = "desconhecido";
try {
  commit = execSync("git log -1 --oneline", { encoding: "utf8" }).trim();
} catch {
  /* repositório indisponível */
}

writeFileSync(
  `${dir}/ROLLBACK.md`,
  [
    `# Pacote de rollback — ${stamp}`,
    "",
    `- Mapa: ${MAP_PATH}`,
    `- published anterior: ${map.published === true}`,
    `- Regras: ${map.rules.length}`,
    `- Origem: ${map.source_domain} → Destino: ${map.target_domain}`,
    `- Commit anterior: ${commit}`,
    `- Lista de aprovação: ${approvalPath}`,
    "",
    "## Como reverter",
    "",
    "```bash",
    `node scripts/publish-redirects.mjs --rollback=${dir}`,
    "```",
    "",
    "Após o rollback, republicar a configuração de redirects na camada de edge/hospedagem",
    "com o mapa restaurado. O domínio antigo deve permanecer ativo.",
    "",
  ].join("\n"),
);

map.published = true;
map.published_at = new Date().toISOString();
map.approved_urls = approved.length;
map.rollback_package = dir;
writeFileSync(MAP_PATH, JSON.stringify(map, null, 2) + "\n");

console.log(`PUBLICADO: ${map.rules.length} regras aprovadas · published=true`);
console.log(`pacote de rollback: ${dir}`);
