// ─────────────────────────────────────────────────────────────
// EDGE ROUTER — lógica pura de decisão do Worker (Rodada 2A.2, Frente B).
//
// Sem dependência de Cloudflare: recebe um manifesto derivado do build e um
// descritor de requisição, devolve a decisão. Usado pelo cloudflare/worker.js
// e pelos testes unitários (`npm run cf:edge:test`).
//
// Ordem de decisão (B4):
//   1. Host permitido
//   2. Alias conhecido → 301 (um salto)
//   3. Arquivo estático existente no manifesto → passa
//   4. Rota válida → proxy para a origem
//   5. Qualquer outra coisa → 404 real no edge
// ─────────────────────────────────────────────────────────────

import { BASE_URL, SITE_DOMAIN } from "./site-env.mjs";
export const ORIGIN_PLACEHOLDER = "LOVABLE_ORIGIN_NOT_CONFIGURED";

export const ALLOWED_HOSTS = [SITE_DOMAIN, `www.${SITE_DOMAIN}`];

/** Endpoint de saúde do edge — público, sem segredos. */
export const HEALTH_PATH = "/__edge/health";

/**
 * Payload do health-check: estado do manifesto, versão do build e contagens.
 * Não expõe tokens, IDs de zona, origem configurada nem variáveis de ambiente.
 */
export function healthPayload(compiled, manifest, problems = []) {
  return {
    service: "route-guard",
    status: problems.length ? "degraded" : "ok",
    build: {
      generatedAt: manifest?.generatedAt ?? null,
      source: manifest?.source ?? null,
    },
    manifest: {
      ok: problems.length === 0,
      problems,
      minimums: MANIFEST_MINIMUMS,
    },
    counts: {
      validExact: compiled.counts.validExact,
      openPatterns: compiled.openPatterns.length,
      redirects: compiled.counts.redirects,
      assetFiles: compiled.counts.assetFiles,
    },
    checkedAt: new Date().toISOString(),
  };
}


/** Quantidades mínimas esperadas — fail-safe B10. */
export const MANIFEST_MINIMUMS = {
  validExact: 200,
  redirects: 1,
  assetFiles: 5,
};

/** Normaliza o pathname; devolve null quando o caminho é malformado. */
export function normalizePath(rawPath) {
  if (typeof rawPath !== "string" || rawPath === "") return null;
  let p = rawPath;
  // Rejeita caminhos que não começam com "/" ou que contêm bytes de controle.
  if (!p.startsWith("/")) return null;
  if (/[\u0000-\u001f\u007f]/.test(p)) return null;
  // Percent-decoding (uma vez). Duplo encoding permanece literal — não vira rota.
  try {
    p = decodeURIComponent(p);
  } catch {
    return null;
  }
  if (/[\u0000-\u001f\u007f]/.test(p)) return null;
  // Colapsa barras duplicadas e resolve "." / ".." sem escapar da raiz.
  const out = [];
  for (const seg of p.split("/")) {
    if (seg === "" || seg === ".") continue;
    if (seg === "..") {
      if (out.length === 0) return null; // tentativa de escapar da raiz
      out.pop();
      continue;
    }
    out.push(seg);
  }
  const normalized = `/${out.join("/")}`;
  return normalized === "/" ? "/" : normalized.replace(/\/+$/, "");
}

/** Compila o manifesto do build em estruturas de consulta rápidas. */
export function compileManifest(manifest) {
  if (!manifest || typeof manifest !== "object") throw new Error("manifesto ausente");
  const exact = new Set((manifest.validExact ?? []).map((p) => normalizePath(p) ?? p));
  const patternInfo = manifest.patternInfo ?? (manifest.validPatterns ?? []).map((pattern) => ({ pattern, closed: false }));
  const openPatterns = patternInfo
    .filter((p) => !p.closed)
    .map((p) => pathToRegex(p.pattern));
  const redirects = new Map();
  for (const r of manifest.redirects ?? []) {
    const from = normalizePath(r.from ?? r[0]);
    if (from) redirects.set(from, r.to ?? r[1]);
  }
  const assetFiles = new Set((manifest.assetFiles ?? []).map((f) => (f.startsWith("/") ? f : `/${f}`)));
  return {
    exact,
    openPatterns,
    redirects,
    assetFiles,
    counts: {
      validExact: exact.size,
      redirects: redirects.size,
      assetFiles: assetFiles.size,
    },
  };
}

function pathToRegex(routePath) {
  const source = routePath
    .split("/")
    .filter(Boolean)
    .map((seg) => (seg === "*" || seg.startsWith(":") ? "[^/]+" : seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
    .join("/");
  return new RegExp(`^/${source}/?$`);
}

/** Fail-safe: o manifesto precisa ser plausível antes de qualquer publicação. */
export function assertManifestSane(compiled) {
  const problems = [];
  for (const [key, min] of Object.entries(MANIFEST_MINIMUMS)) {
    if (compiled.counts[key] < min) problems.push(`${key}=${compiled.counts[key]} < mínimo ${min}`);
  }
  return problems;
}

const looksLikeFile = (p) => /\.[a-z0-9]{1,8}$/i.test(p);

/**
 * @param {{host:string, method?:string, pathname:string, search?:string}} req
 * @param {ReturnType<typeof compileManifest>} m
 */
export function decide(req, m) {
  const host = String(req.host ?? "").toLowerCase().split(":")[0];
  if (!ALLOWED_HOSTS.includes(host)) return { action: "reject", status: 421, reason: "host-nao-permitido" };

  // 1b. www é secundário: 308 permanente para o apex, preservando path e query.
  if (host === `www.${SITE_DOMAIN}`) {
    const rawPath = typeof req.pathname === "string" && req.pathname.startsWith("/") ? req.pathname : "/";
    return {
      action: "redirect",
      status: 308,
      location: `${BASE_URL}${rawPath}${req.search ?? ""}`,
      reason: "www-para-apex",
    };
  }

  const pathname = normalizePath(req.pathname);
  if (pathname === null) return { action: "notfound", status: 404, reason: "path-malformado" };

  const search = req.search ?? "";

  // 2. Alias conhecido → 301, salto único, query preservada.
  const target = m.redirects.get(pathname);
  if (target) {
    const location = target.includes("?") || !search ? target : `${target}${search}`;
    return { action: "redirect", status: 301, location, reason: "alias" };
  }

  // 3. Arquivo estático: só o que o build realmente emitiu.
  if (looksLikeFile(pathname)) {
    if (m.assetFiles.has(pathname)) return { action: "asset", status: 200, reason: "asset-existente" };
    return { action: "notfound", status: 404, reason: "asset-inexistente" };
  }

  // 4. Rota válida → origem.
  if (m.exact.has(pathname) || m.openPatterns.some((re) => re.test(pathname))) {
    return { action: "proxy", status: 200, reason: "rota-valida" };
  }

  // 5. Rota inexistente → 404 real, sem consultar a origem.
  return { action: "notfound", status: 404, reason: "rota-inexistente" };
}
