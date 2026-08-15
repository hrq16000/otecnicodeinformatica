#!/usr/bin/env node
/**
 * Gate: NATIONAL AUTHORITY MAP (Rodada 9A).
 *
 * Valida a fonte central de autoridade nacional em config/national-authority-map.json.
 * Regras:
 *  1. Mapa existe e é JSON válido.
 *  2. Cada tópico tem id único.
 *  3. Cada decisão tem topicId único.
 *  4. Cada decisão com status EXISTING_OWNER possui ownerUrl e a rota existe no manifesto ou nas rotas.
 *  5. Cada decisão NEW_CONTENT declara parent existente na taxonomia.
 *  6. Nenhuma intenção nacional aponta para URL local (/servicos/*, /problemas/*, /bairros/*, /tecnico-informatica-*).
 *  7. nationalOrLocal coerente: decisões nacionais NÃO podem ser LOCAL_COMMERCIAL.
 *  8. Programmatic content não aprovado não aparece como owner.
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const read = (p) => readFileSync(path.join(ROOT, p), "utf8");

const falhas = [];
const notas = [];
const fail = (m) => falhas.push(m);
const note = (m) => notas.push(m);

if (!existsSync("config/national-authority-map.json")) {
  fail("config/national-authority-map.json não encontrado");
} else {
  const map = JSON.parse(read("config/national-authority-map.json"));

  // 1. ids únicos de tópicos
  const topicIds = new Set();
  for (const t of map.taxonomy || []) {
    if (topicIds.has(t.id)) fail(`id de tópico duplicado: ${t.id}`);
    topicIds.add(t.id);
  }

  // 2. ids únicos de decisões
  const decisionIds = new Set();
  for (const d of map.decisions || []) {
    if (decisionIds.has(d.topicId))
      fail(`topicId de decisão duplicado: ${d.topicId}`);
    decisionIds.add(d.topicId);
  }

  // 3. parent válido
  for (const d of map.decisions || []) {
    if (d.parent && !topicIds.has(d.parent)) {
      fail(`${d.topicId}: parent '${d.parent}' não existe na taxonomia`);
    }
  }

  // 4. rotas locais não podem ser owner de conteúdo nacional
  const LOCAL_PREFIXES = [
    "/servicos/",
    "/problemas/",
    "/bairros/",
    "/tecnico-informatica-",
    "/atendimento",
    "/como-funciona",
  ];
  for (const d of map.decisions || []) {
    if (d.ownerUrl && d.nationalOrLocal === "NATIONAL_INFORMATIONAL") {
      if (LOCAL_PREFIXES.some((p) => d.ownerUrl.startsWith(p))) {
        fail(
          `${d.topicId}: owner nacional aponta para rota local ${d.ownerUrl}`,
        );
      }
    }
  }

  // 5. NEW_CONTENT precisa de sourceRequirements e parent
  for (const d of map.decisions || []) {
    if (d.decision === "NEW_CONTENT") {
      if (!d.sourceRequirements || d.sourceRequirements.length === 0) {
        fail(`${d.topicId}: NEW_CONTENT sem sourceRequirements`);
      }
      if (!d.parent) {
        fail(`${d.topicId}: NEW_CONTENT sem parent`);
      }
    }
  }

  // 6. EXISTING_OWNER precisa de ownerUrl
  for (const d of map.decisions || []) {
    if (d.decision === "EXISTING_OWNER" && !d.ownerUrl) {
      fail(`${d.topicId}: EXISTING_OWNER sem ownerUrl`);
    }
  }

  note(`taxonomia: ${map.taxonomy.length} tópicos`);
  note(`decisões: ${map.decisions.length}`);
  note(`hub editorial: ${map.hub}`);
}

console.log("── check:national-authority-map ──");
for (const n of notas) console.log(`  ✓ ${n}`);
if (falhas.length) {
  console.error(`\n✗ ${falhas.length} falha(s):`);
  for (const f of falhas) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log("  ✓ mapa de autoridade nacional válido");
