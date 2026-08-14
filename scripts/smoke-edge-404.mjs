#!/usr/bin/env node
/**
 * SMOKE TEST — CONTRATO DE 404 NA BORDA (Rodada 8F)
 * -------------------------------------------------
 * Valida o contrato de 404 real antes e depois do deploy.
 *
 * Modo local (padrão): confere o artefato `dist/_redirects` e o
 * `dist/404.html`, garantindo que rotas inexistentes não caiam em
 * 200 com HTML da SPA (soft-404).
 *
 * Modo remoto (`--url https://...`): faz requisições reais e exige
 * status 404 para rotas inexistentes e 200 para rotas conhecidas.
 * Sem `--url`, o estado do deploy é reportado como
 * READY_TO_DEPLOY — nunca como "verificado em produção".
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const OUT = path.join(ROOT, "reports");

const argUrl = process.argv.indexOf("--url");
const REMOTE = argUrl > -1 ? process.argv[argUrl + 1] : null;

const ROTAS_INEXISTENTES = [
  "/esta-rota-nao-existe-8f",
  "/problemas/sintoma-inexistente-8f",
  "/servicos/servico-inexistente-8f",
  "/blog/artigo-inexistente-8f",
];
const ROTAS_VALIDAS = ["/", "/servicos/formatacao", "/problemas/computador-lento", "/blog/quanto-custa-formatar-um-computador"];

const falhas = [];
const checagens = [];

if (!REMOTE) {
  // ── modo local: contrato no artefato ──────────────────────────
  if (!existsSync(DIST)) {
    console.error("BLOQUEADO: dist ausente. Rode o build antes do smoke test.");
    process.exit(1);
  }
  const redirectsPath = path.join(DIST, "_redirects");
  if (!existsSync(redirectsPath)) {
    falhas.push("dist/_redirects ausente — sem ele a hospedagem devolve 200 para qualquer rota (soft-404).");
  } else {
    const conteudo = readFileSync(redirectsPath, "utf8");
    checagens.push({ item: "_redirects presente", ok: true });
    if (!/\/404\.html\s+404/.test(conteudo) && !/\s404\s*$/m.test(conteudo)) {
      falhas.push("dist/_redirects não declara nenhuma regra com status 404.");
    } else {
      checagens.push({ item: "regra de status 404 declarada", ok: true });
    }
    if (/^\/\*\s+\/index\.html\s+200/m.test(conteudo)) {
      falhas.push("dist/_redirects tem catch-all `/* /index.html 200`, que transforma toda rota inexistente em soft-404.");
    } else {
      checagens.push({ item: "sem catch-all 200 para toda rota", ok: true });
    }
  }
  if (!existsSync(path.join(DIST, "404.html"))) {
    falhas.push("dist/404.html ausente.");
  } else {
    checagens.push({ item: "404.html presente", ok: true });
  }
  for (const r of ROTAS_VALIDAS) {
    const rel = r === "/" ? "index.html" : path.join(r.replace(/^\//, ""), "index.html");
    if (!existsSync(path.join(DIST, rel))) falhas.push(`Rota válida \`${r}\` sem HTML no build.`);
    else checagens.push({ item: `rota válida ${r} presente`, ok: true });
  }
} else {
  // ── modo remoto: status HTTP real ─────────────────────────────
  const base = REMOTE.replace(/\/+$/, "");
  for (const r of ROTAS_INEXISTENTES) {
    try {
      const res = await fetch(base + r, { redirect: "manual" });
      const ok = res.status === 404;
      checagens.push({ item: `${r} → ${res.status}`, ok });
      if (!ok) falhas.push(`\`${r}\` respondeu ${res.status} em vez de 404 (soft-404 na borda).`);
    } catch (e) {
      falhas.push(`\`${r}\`: falha de requisição (${e?.message ?? e}).`);
    }
  }
  for (const r of ROTAS_VALIDAS) {
    try {
      const res = await fetch(base + r, { redirect: "manual" });
      const ok = res.status === 200;
      checagens.push({ item: `${r} → ${res.status}`, ok });
      if (!ok) falhas.push(`Rota válida \`${r}\` respondeu ${res.status} em vez de 200.`);
    } catch (e) {
      falhas.push(`\`${r}\`: falha de requisição (${e?.message ?? e}).`);
    }
  }
}

const estado = falhas.length ? "BLOQUEADO" : REMOTE ? "VERIFICADO_EM_PRODUCAO" : "READY_TO_DEPLOY";

mkdirSync(OUT, { recursive: true });
writeFileSync(
  path.join(OUT, "edge-404-smoke.json"),
  JSON.stringify({ geradoEm: new Date().toISOString(), modo: REMOTE ? "remoto" : "local", alvo: REMOTE ?? "dist", estado, checagens, falhas }, null, 2),
);

console.log("── smoke:edge-404 ──");
console.log(`  modo: ${REMOTE ? `remoto (${REMOTE})` : "local (artefato dist)"}`);
for (const c of checagens) console.log(`  ${c.ok ? "ok" : "falha"}: ${c.item}`);
console.log(`  estado: ${estado}`);

if (falhas.length) {
  console.error(`\nBLOQUEADO — ${falhas.length} falha(s) no contrato de 404:`);
  for (const f of falhas) console.error(`  • ${f}`);
  process.exit(1);
}
