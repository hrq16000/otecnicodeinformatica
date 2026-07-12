#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// TESTES NEGATIVOS DO VALIDADOR JSON-LD ESTÁTICO
//
// Gera fixtures temporárias (fora de dist/) e comprova que:
//   entrada válida   → exit 0
//   entrada inválida → exit != 0
//
// As fixtures são criadas em um diretório temporário e removidas ao final;
// nada é deixado no repositório nem entra no build final.
// ─────────────────────────────────────────────────────────────

import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const VALIDATOR = fileURLToPath(new URL("./validate-jsonld-static.mjs", import.meta.url));

function ld(json) {
  return `<script type="application/ld+json">${json}</script>`;
}
function htmlDoc(body) {
  return `<!doctype html><html lang="pt-BR"><head><title>fixture</title></head><body>${body}</body></html>`;
}

// Cada caso: escreve dist/index.html (ou dist/blog/x/index.html) e roda o validador.
const VALID_WEBPAGE = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Página válida",
  url: "https://tecnico.curitiba.br/exemplo",
  publisher: { "@type": "Organization", name: "Técnico em Curitiba", url: "https://tecnico.curitiba.br" },
});

const CASES = [
  {
    name: "entrada válida",
    expectFail: false,
    files: { "index.html": htmlDoc(ld(VALID_WEBPAGE)) },
  },
  {
    name: "JSON truncado",
    expectFail: true,
    files: { "index.html": htmlDoc(ld('{"@context":"https://schema.org","@type":"WebPage","name":"x"')) },
  },
  {
    name: "vírgula inválida (trailing comma)",
    expectFail: true,
    files: { "index.html": htmlDoc(ld('{"@context":"https://schema.org","@type":"WebPage",}')) },
  },
  {
    name: "bloco vazio",
    expectFail: true,
    files: { "index.html": htmlDoc(ld("   ")) },
  },
  {
    name: "publisher proibido (Técnico Curitiba)",
    expectFail: true,
    files: {
      "index.html": htmlDoc(
        ld(JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: "x", publisher: { "@type": "Organization", name: "Técnico Curitiba" } })),
      ),
    },
  },
  {
    name: "cargo fictício (Técnico de Informática Sênior)",
    expectFail: true,
    files: {
      "index.html": htmlDoc(
        ld(JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: "x", description: "Escrito por Técnico de Informática Sênior" })),
      ),
    },
  },
  {
    name: "aggregateRating inventado",
    expectFail: true,
    files: {
      "index.html": htmlDoc(
        ld(JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: "x", aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "10" } })),
      ),
    },
  },
  {
    name: "editorial com Person fictício (/blog)",
    expectFail: true,
    files: {
      "blog/exemplo/index.html": htmlDoc(
        ld(JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", name: "x", author: { "@type": "Person", name: "Fulano", jobTitle: "Técnico" } })),
      ),
    },
  },
  {
    name: "URL de site com domínio não-oficial",
    expectFail: true,
    files: {
      "index.html": htmlDoc(
        ld(JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: "x", url: "https://tecnicocuritiba.com.br/exemplo" })),
      ),
    },
  },
];

function runValidator(dir) {
  const res = spawnSync("node", [VALIDATOR, dir], { encoding: "utf8" });
  return res.status ?? 1;
}

async function main() {
  const rows = [];
  let failed = 0;

  for (const c of CASES) {
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "jsonld-fixture-"));
    try {
      for (const [rel, content] of Object.entries(c.files)) {
        const fp = path.join(tmp, rel);
        await fs.mkdir(path.dirname(fp), { recursive: true });
        await fs.writeFile(fp, content, "utf8");
      }
      const exit = runValidator(tmp);
      const gotFail = exit !== 0;
      const ok = gotFail === c.expectFail;
      if (!ok) failed++;
      rows.push({ name: c.name, expected: c.expectFail ? "!= 0" : "0", got: exit, ok });
    } finally {
      await fs.rm(tmp, { recursive: true, force: true });
    }
  }

  console.log("── testes negativos do validador JSON-LD ──");
  for (const r of rows) {
    console.log(`  ${r.ok ? "✓" : "✗"} ${r.name} — esperado ${r.expected}, obtido ${r.got}`);
  }

  if (failed) {
    console.error(`\n✗ ${failed} caso(s) de teste do validador falharam`);
    process.exit(1);
  }
  console.log("\n✓ validador reprova todas as entradas inválidas e aprova a válida");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
