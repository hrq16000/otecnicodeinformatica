/**
 * EDGE DE ROTEAMENTO — tecnico.curitiba.br
 *
 * Corrige o fallback SPA da hospedagem: quando a origem devolve o index.html
 * para uma URL inexistente, o worker responde 404 REAL com dist/404.html.
 * Também aplica os aliases 301 do manifesto antes de chegar à origem.
 *
 * Contrato (dist/route-manifest.json, importado em build time pelo wrangler):
 *   validExact      lista de rotas 200
 *   validPatterns   regex (string) de rotas dinâmicas válidas
 *   redirects       { from → to } com 301
 *   assetPrefixes   prefixos servidos diretamente (nunca 404 sintético)
 */
import manifest from "../dist/route-manifest.json";

const exact = new Set(manifest.validExact ?? []);
const patterns = (manifest.validPatterns ?? []).map((p) => new RegExp(p));
const redirects = new Map(
  Array.isArray(manifest.redirects)
    ? manifest.redirects.map((r) => [r.from ?? r[0], r.to ?? r[1]])
    : Object.entries(manifest.redirects ?? {}),
);
const assetPrefixes = manifest.assetPrefixes ?? ["/assets/", "/images/"];

const stripSlash = (p) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p);

function isValid(pathname) {
  const p = stripSlash(pathname);
  if (exact.has(p) || exact.has(`${p}/`) || p === "") return true;
  return patterns.some((re) => re.test(p));
}

const isAsset = (p) => assetPrefixes.some((prefix) => p.startsWith(prefix)) || /\.[a-z0-9]{2,5}$/i.test(p);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = stripSlash(url.pathname);

    // 1. Aliases conhecidos → 301 preservando query string.
    const target = redirects.get(pathname) ?? redirects.get(`${pathname}/`);
    if (target) {
      const to = new URL(target, url.origin);
      to.search = url.search;
      return Response.redirect(to.toString(), 301);
    }

    const response = await fetch(request);

    // 2. Assets e respostas não-HTML seguem intactos.
    if (isAsset(pathname)) return response;
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) return response;

    // 3. Rota desconhecida servida como 200 pela origem → 404 real.
    if (response.status === 200 && !isValid(pathname)) {
      const notFound = await fetch(new URL("/404.html", url.origin).toString());
      const body = notFound.ok ? await notFound.text() : "<h1>Página não encontrada</h1>";
      return new Response(body, {
        status: 404,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
          "x-robots-tag": "noindex, nofollow",
        },
      });
    }

    return response;
  },
};
