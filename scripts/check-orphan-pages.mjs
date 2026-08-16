#!/usr/bin/env node
/**
 * ============================================================================
 * GATE DE PÁGINAS ÓRFÃS — stack TanStack Start (roteamento por arquivo)
 * ============================================================================
 * A versão anterior exigia que todo componente de `src/pages/` fosse importado
 * em `src/App.tsx` / `src/LegacyApp.tsx`. Depois da migração isso virou ruído:
 * 71 "órfãos" que na verdade são montados por arquivos em `src/routes/**` ou
 * são componentes reutilizados por templates data-driven.
 *
 * Contrato atual (defeito real, sem exceção por pathname):
 *   FAIL_MISSING_ROUTE       URL curada/indexável sem arquivo de rota.
 *   FAIL_BROKEN_MOUNT        rota importa módulo de página inexistente.
 *   FAIL_DUPLICATE_MOUNT     duas rotas indexáveis montando o mesmo módulo.
 *
 * Classificações informativas (contadas, nunca silenciosas):
 *   SKIPPED_NON_ROUTE_COMPONENT  componente de página usado só por template.
 *   SKIPPED_PRIVATE              rotas /admin, /ads, /api.
 *
 * Fail-closed: sem `src/routes`, falha com UNKNOWN_ROUTES_DIR_MISSING.
 */
import { existsSync, readFileSync } from "node:fs";
import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";
import { readRouteUniverse, isPrivatePath, normalizePath, REASONS } from "./lib/tanstack-routes.mjs";

const ROOT = process.cwd();
const universe = readRouteUniverse(ROOT);
if (!universe.ok) {
  console.error(`✖ [${universe.reason}] src/routes ausente — gate não pode concluir.`);
  process.exit(1);
}

const failures = [];
const info = { naoRota: [], privadas: 0 };

// ── 1. URL curada precisa de rota real ───────────────────────────────────────
for (const p of CURATED_PATHS) {
  const path = normalizePath(p);
  if (isPrivatePath(path)) {
    info.privadas += 1;
    continue;
  }
  if (!universe.isKnownRoute(path)) {
    failures.push({
      reason: "FAIL_MISSING_ROUTE",
      alvo: path,
      motivo: "URL indexável no sitemap curado sem arquivo de rota em src/routes",
      esperado: `src/routes${path.replace(/\//g, ".").replace(/^\./, "/")}.tsx`,
    });
  }
}

// ── 2. Montagens declaradas nas rotas ────────────────────────────────────────
// As rotas montam páginas de duas formas:
//   a) import direto de `@/pages/...` dentro do arquivo de rota;
//   b) indireção pelo mapa `src/legacyRouteElements.tsx` (`legacyRouteElements["/x"]`),
//      que associa cada path a um elemento (às vezes template data-driven com props).
const LEGACY_MAP_FILE = "src/legacyRouteElements.tsx";
const legacySrc = existsSync(join(ROOT, LEGACY_MAP_FILE)) ? readFileSync(join(ROOT, LEGACY_MAP_FILE), "utf8") : "";

/** símbolo → módulo (`const X = lazy(() => import("./pages/X"))` ou import estático). */
const simboloParaModulo = new Map();
for (const m of legacySrc.matchAll(/const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(["']\.\/(pages\/[^"']+)["']\)/g))
  simboloParaModulo.set(m[1], `@/${m[2]}`);
for (const m of legacySrc.matchAll(/import\s+(\w+)\s+from\s+["']\.\/(pages\/[^"']+)["']/g))
  simboloParaModulo.set(m[1], `@/${m[2]}`);

/** path → { elemento (identidade textual), símbolo } */
const legacyPorPath = new Map();
for (const m of legacySrc.matchAll(/"(\/[^"]*)":\s*\(\)\s*=>\s*(<[^\n]+?),?\s*$/gm)) {
  const elemento = m[2].replace(/,$/, "").trim();
  const simbolo = elemento.match(/^<(\w+)/)?.[1];
  legacyPorPath.set(normalizePath(m[1]), { elemento, simbolo });
}

const mounts = new Map(); // módulo → [{rota, identidade}]
const registrar = (mod, rota, identidade) => {
  if (!mounts.has(mod)) mounts.set(mod, []);
  mounts.get(mod).push({ rota, identidade });
};

for (const file of universe.files) {
  const rel = relative(ROOT, file).split(sep).join("/");
  const src = readFileSync(file, "utf8");
  const pattern = filePattern(rel);

  const modulos = new Set();
  for (const m of src.matchAll(/from\s+["'](@\/pages\/[^"']+)["']/g)) modulos.add(m[1]);
  for (const m of src.matchAll(/import\(\s*["'](@\/pages\/[^"']+)["']\s*\)/g)) modulos.add(m[1]);

  for (const mod of modulos) {
    const disco = mod.replace(/^@\//, "src/");
    const existe = [".tsx", ".ts", "/index.tsx"].some((ext) => existsSync(join(ROOT, `${disco}${ext}`)));
    if (!existe) {
      failures.push({
        reason: "FAIL_BROKEN_MOUNT",
        alvo: rel,
        motivo: `rota importa módulo inexistente: ${mod}`,
        esperado: `criar ${disco}.tsx ou remover o import`,
      });
      continue;
    }
    registrar(mod, pattern ?? rel, mod);
  }

  // Indireção pelo mapa legado.
  const chave = src.match(/legacyRouteElements\[\s*["']([^"']+)["']\s*\]/)?.[1];
  if (chave) {
    const alvo = legacyPorPath.get(normalizePath(chave));
    if (!alvo) {
      failures.push({
        reason: "FAIL_BROKEN_MOUNT",
        alvo: rel,
        motivo: `rota referencia legacyRouteElements["${chave}"], chave inexistente no mapa`,
        esperado: `declarar "${chave}" em ${LEGACY_MAP_FILE} ou montar um componente próprio`,
      });
    } else {
      const mod = alvo.simbolo ? simboloParaModulo.get(alvo.simbolo) : null;
      if (mod) registrar(mod, pattern ?? rel, alvo.elemento);
    }
  }
}

// ── 3. Mesma implementação em dois slugs indexáveis (conteúdo duplicado) ─────
const curado = new Set(CURATED_PATHS.map(normalizePath));
for (const [mod, usos] of mounts) {
  const porIdentidade = new Map();
  for (const uso of usos) {
    if (!uso.rota?.startsWith("/") || !curado.has(normalizePath(uso.rota))) continue;
    // Templates data-driven (mesmo módulo, props diferentes) NÃO são duplicata:
    // a identidade inclui as props do elemento.
    const chave = uso.identidade;
    if (!porIdentidade.has(chave)) porIdentidade.set(chave, new Set());
    porIdentidade.get(chave).add(normalizePath(uso.rota));
  }
  for (const [identidade, rotas] of porIdentidade) {
    if (rotas.size > 1) {
      failures.push({
        reason: "FAIL_DUPLICATE_MOUNT",
        alvo: `${mod} → ${identidade}`,
        motivo: `mesma implementação montada em ${[...rotas].join(" e ")}`,
        esperado: "uma implementação por slug canônico (ou canonical/301 entre eles)",
      });
    }
  }
}


// ── 4. Componentes de página não montados por rota (informativo) ─────────────
function listarPaginas(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...listarPaginas(full));
    else if (entry.endsWith(".tsx")) out.push(full);
  }
  return out;
}
const montados = new Set([...mounts.keys()].map((m) => m.replace(/^@\//, "src/")));
for (const file of listarPaginas(join(ROOT, "src/pages"))) {
  const rel = relative(ROOT, file).split(sep).join("/");
  const semExt = rel.replace(/\.tsx$/, "");
  if (montados.has(semExt) || montados.has(semExt.replace(/\/index$/, ""))) continue;
  info.naoRota.push(rel);
}

// ── 5. Saída ─────────────────────────────────────────────────────────────────
console.log("── Páginas órfãs (universo TanStack) ──");
console.log(`Rotas por arquivo: ${universe.patterns.length} | URLs curadas: ${CURATED_PATHS.length}`);
console.log(
  `SKIPPED_NON_ROUTE_COMPONENT: ${info.naoRota.length} componente(s) | SKIPPED_PRIVATE: ${info.privadas}`,
);

if (failures.length) {
  console.error(`\n✖ ${failures.length} defeito(s) real(is):`);
  for (const f of failures) {
    console.error(`  ✗ [${f.reason}] ${f.alvo}\n      motivo: ${f.motivo}\n      esperado: ${f.esperado}`);
  }
  process.exit(1);
}
console.log("✔ Nenhuma URL indexável sem rota, montagem quebrada ou slug duplicado.");
