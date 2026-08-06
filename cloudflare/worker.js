/**
 * WORKER DE BORDA — tecnico-curitiba-route-guard
 *
 * Zona: tecnico.curitiba.br (subzona própria). Não publica enquanto a origem
 * for o placeholder LOVABLE_ORIGIN_NOT_CONFIGURED.
 *
 * Responsabilidades (ordem em scripts/lib/edge-router.mjs):
 *   1. host permitido        → demais hosts recusados
 *   2. alias conhecido       → 301 de salto único, query preservada
 *   3. asset emitido no build→ passa; asset inexistente → 404 (nunca HTML da home)
 *   4. rota válida           → proxy para a origem Lovable (método/headers/body)
 *   5. rota inexistente      → 404 real no edge, sem consultar a origem
 */
import manifest from "../dist/route-manifest.json";
import notFoundHtml from "../dist/404.html";
import { compileManifest, decide, assertManifestSane, ORIGIN_PLACEHOLDER } from "../scripts/lib/edge-router.mjs";

const compiled = compileManifest(manifest);
const manifestProblems = assertManifestSane(compiled);

const NOT_FOUND_HEADERS = {
  "content-type": "text/html; charset=UTF-8",
  "cache-control": "no-store",
  "x-robots-tag": "noindex, nofollow",
};

function notFound(method) {
  const body = method === "HEAD" ? null : notFoundHtml;
  return new Response(body, { status: 404, headers: NOT_FOUND_HEADERS });
}

export default {
  async fetch(request, env) {
    if (manifestProblems.length) {
      // Fail-safe: manifesto implausível não pode transformar o site em 404.
      return new Response("edge desabilitado: manifesto inválido", { status: 503 });
    }
    const origin = env?.LOVABLE_ORIGIN ?? ORIGIN_PLACEHOLDER;
    const url = new URL(request.url);
    const d = decide({ host: url.hostname, method: request.method, pathname: url.pathname, search: url.search }, compiled);

    if (d.action === "reject") return new Response("host não atendido", { status: 421 });
    if (d.action === "redirect") {
      const location = new URL(d.location, url.origin).toString();
      return new Response(null, {
        status: 301,
        headers: { location, "cache-control": "public, max-age=86400" },
      });
    }
    if (d.action === "notfound") return notFound(request.method);

    if (origin === ORIGIN_PLACEHOLDER) {
      return new Response("origem não configurada", { status: 503 });
    }

    // Proxy transparente para a origem: preserva método, query, headers, cookies e body.
    const target = new URL(url.pathname + url.search, `https://${origin}`);
    const proxied = new Request(target.toString(), request);
    proxied.headers.set("host", origin);
    proxied.headers.set("x-forwarded-host", url.hostname);
    return fetch(proxied);
  },
};
