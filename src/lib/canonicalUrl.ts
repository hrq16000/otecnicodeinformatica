/**
 * ─────────────────────────────────────────────────────────────
 * CANONICAL — OWNERSHIP DETERMINÍSTICO (um único <link rel="canonical">)
 * ─────────────────────────────────────────────────────────────
 * Regras:
 *  1. Existe exatamente UM nó canônico no documento, marcado com
 *     `data-canonical-owner="managed"` e mantido no <head>.
 *  2. Qualquer outro `link[rel="canonical"]` (prerender estático,
 *     react-helmet, JSX solto) é adotado/removido no upsert.
 *  3. Nenhum temporizador, polling ou MutationObserver.
 *
 * Todas as páginas devem usar `useCanonical()` (ou `upsertCanonical()`),
 * nunca renderizar `<link rel="canonical">` diretamente.
 */
import { useEffect } from "react";

const OWNER_ATTR = "data-canonical-owner";

export function upsertCanonical(href: string) {
  if (typeof document === "undefined" || !href) return;

  const nodes = Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'),
  );

  // Nó dono: o que já está marcado, senão o primeiro existente (adoção do
  // nó estático do prerender), senão um novo.
  let owner = nodes.find((n) => n.getAttribute(OWNER_ATTR) === "managed") ?? nodes[0];
  if (!owner) {
    owner = document.createElement("link");
    owner.rel = "canonical";
  }
  owner.setAttribute(OWNER_ATTR, "managed");
  owner.href = href;
  if (owner.parentElement !== document.head) document.head.appendChild(owner);

  for (const n of nodes) if (n !== owner) n.remove();
}

/** Mantém o canonical único e self-referente durante o ciclo de vida da rota. */
export function useCanonical(href: string) {
  useEffect(() => {
    upsertCanonical(href);
  }, [href]);
}
