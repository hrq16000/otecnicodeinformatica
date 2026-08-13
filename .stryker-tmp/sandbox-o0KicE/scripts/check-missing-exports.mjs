#!/usr/bin/env node
// @ts-nocheck
/**
 * ============================================================================
 * GATE — IMPORTS/EXPORTS AUSENTES (pré-build)
 * ============================================================================
 * Detecta, antes de publicar, duas classes de erro que só apareceriam em
 * runtime como ReferenceError / undefined is not a function:
 *
 *  1. Símbolo do react-router-dom USADO no arquivo mas NÃO importado
 *     (ex.: <Navigate to="/x" /> sem `import { Navigate }`).
 *  2. Import nomeado de módulo LOCAL cujo alvo não exporta aquele nome.
 *
 * Somente leitura — não altera nenhum arquivo.
 * ============================================================================
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");

/** Percorre src/ e devolve todos os .ts/.tsx (ignora testes e d.ts). */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...walk(full));
      continue;
    }
    if (!/\.(ts|tsx)$/.test(entry)) continue;
    if (/\.d\.ts$/.test(entry) || /\.test\.tsx?$/.test(entry)) continue;
    out.push(full);
  }
  return out;
}

/** Remove comentários e strings para reduzir falso positivo de uso. */
function stripNoise(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1 ")
    .replace(/`(?:\\.|[^`\\])*`/g, "``")
    .replace(/"(?:\\.|[^"\\])*"/g, '""')
    .replace(/'(?:\\.|[^'\\])*'/g, "''");
}

/** Símbolos do react-router-dom que quebram em runtime quando esquecidos. */
const ROUTER_SYMBOLS = [
  "Navigate",
  "Link",
  "NavLink",
  "Outlet",
  "Routes",
  "Route",
  "BrowserRouter",
  "useNavigate",
  "useParams",
  "useLocation",
  "useSearchParams",
];

const errors = [];
const files = walk(SRC);

for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const code = stripNoise(raw);
  const rel = file.slice(ROOT.length + 1);

  // Mapa: símbolo importado -> origem
  const imported = new Set();
  const importRe = /import\s+([\s\S]*?)\s+from\s+['"]([^'"]+)['"]/g;
  const localNamed = [];
  let m;
  while ((m = importRe.exec(raw))) {
    const clause = m[1];
    const source = m[2];
    const named = clause.match(/\{([\s\S]*?)\}/);
    const names = named
      ? named[1]
          .split(",")
          .map((n) => n.trim())
          .filter(Boolean)
          .map((n) => n.replace(/^type\s+/, ""))
          .map((n) => {
            const [orig, alias] = n.split(/\s+as\s+/).map((x) => x.trim());
            return { orig, local: alias || orig };
          })
      : [];
    const def = clause.replace(/\{[\s\S]*?\}/, "").replace(/,/g, " ").trim();
    if (def && !def.startsWith("*")) imported.add(def.split(/\s+/)[0]);
    for (const n of names) imported.add(n.local);
    const nsAlias = clause.match(/\*\s+as\s+([A-Za-z0-9_$]+)/);
    if (nsAlias) imported.add(nsAlias[1]);
    if (source.startsWith(".") || source.startsWith("@/")) {
      localNamed.push({ source, names, line: raw.slice(0, m.index).split("\n").length });
    }
  }

  // Declarações locais que podem ter o mesmo nome de um símbolo do router.
  const declared = new Set();
  for (const d of code.matchAll(/(?:const|let|var|function|class)\s+([A-Za-z0-9_$]+)/g)) {
    declared.add(d[1]);
  }

  // (1) símbolo de router usado sem import
  for (const sym of ROUTER_SYMBOLS) {
    if (imported.has(sym) || declared.has(sym)) continue;
    const usedAsJsx = new RegExp(`<${sym}[\\s/>]`).test(code);
    const usedAsCall = new RegExp(`\\b${sym}\\s*\\(`).test(code);
    if (usedAsJsx || usedAsCall) {
      errors.push(`${rel}: usa "${sym}" sem importar de react-router-dom`);
    }
  }

  // (2) import nomeado local apontando para export inexistente
  for (const imp of localNamed) {
    const base = imp.source.startsWith("@/")
      ? join(SRC, imp.source.slice(2))
      : resolve(dirname(file), imp.source);
    const candidates = [
      base,
      `${base}.ts`,
      `${base}.tsx`,
      join(base, "index.ts"),
      join(base, "index.tsx"),
    ];
    const target = candidates.find((c) => existsSync(c) && statSync(c).isFile());
    if (!target) continue; // asset, css, ou alias externo — fora do escopo
    const targetCode = readFileSync(target, "utf8");
    // Reexportação total: não temos como resolver com segurança, pula.
    if (/export\s+\*\s+from/.test(targetCode)) continue;
    for (const { orig } of imp.names) {
      if (orig === "default") continue;
      const patterns = [
        new RegExp(`export\\s+(?:async\\s+)?(?:const|let|var|function|class|type|interface|enum)\\s+${orig}\\b`),
        new RegExp(`export\\s*\\{[^}]*\\b${orig}\\b[^}]*\\}`),
        new RegExp(`export\\s+default\\s+.*\\b${orig}\\b`),
      ];
      if (!patterns.some((p) => p.test(targetCode))) {
        errors.push(
          `${rel}:${imp.line} importa "{ ${orig} }" de "${imp.source}", mas ${target.slice(ROOT.length + 1)} não exporta esse nome`,
        );
      }
    }
  }
}

console.log("── Gate de imports/exports ausentes ──");
console.log(`  arquivos analisados: ${files.length}`);
if (errors.length) {
  console.error(`\n✖ ${errors.length} problema(s) que virariam erro em runtime:`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("✔ nenhum símbolo de rota ausente e nenhum import nomeado quebrado.");
