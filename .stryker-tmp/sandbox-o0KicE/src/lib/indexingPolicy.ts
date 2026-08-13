// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// TRAVA TEMPORÁRIA DE INDEXAÇÃO — RODADA 1 (ISOLAMENTO DO REMIX)
//
// Enquanto o projeto ainda contém conteúdo herdado do portal de
// origem, ele NÃO pode emitir sinais de indexação como se fosse um
// site novo. Esta trava é temporária, configurável e reversível.
//
// Ligar a indexação (quando a nova marca estiver pronta):
//   VITE_SITE_INDEXING_ENABLED=true   +   VITE_SITE_DOMAIN=<domínio>
//
// Nada da infraestrutura de SEO é destruído: PageSEO, JSON-LD,
// canonical, sitemaps e IndexNow continuam existindo — apenas ficam
// suspensos enquanto a trava estiver ativa.
// ─────────────────────────────────────────────────────────────

import { SITE_CONFIGURED } from "@/lib/siteConfig";

const env = import.meta.env as unknown as Record<string, string | undefined>;

const flag = (env.VITE_SITE_INDEXING_ENABLED ?? "").trim().toLowerCase() === "true";

/** Indexação só é liberada com a flag ligada E domínio próprio configurado. */
export const INDEXING_ENABLED = flag && SITE_CONFIGURED;

/** Conteúdo do meta robots forçado enquanto a trava está ativa. */
export const LOCKED_ROBOTS = "noindex, nofollow";

/** Robots a aplicar considerando a trava. `noindexPage` é a intenção da própria rota. */
export function robotsContent(noindexPage = false): string {
  if (!INDEXING_ENABLED) return LOCKED_ROBOTS;
  return noindexPage ? "noindex, follow" : "index, follow";
}

/**
 * Aplica a trava no documento assim que o app inicia, antes de qualquer
 * página escrever o seu próprio meta robots.
 */
export function applyIndexingPolicy(): void {
  if (typeof document === "undefined") return;
  if (INDEXING_ENABLED) return;

  let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "robots");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", LOCKED_ROBOTS);

  // Sem domínio próprio publicado, nenhum canonical/alternate herdado
  // pode permanecer no head.
  document
    .querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]')
    .forEach((el) => el.parentElement?.removeChild(el));
}
