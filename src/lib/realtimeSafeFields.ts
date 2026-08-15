/**
 * RODADA 4C — SUPERFÍCIE MÍNIMA DO BROADCAST DE TELEMETRIA.
 *
 * `postgres_changes` entrega a LINHA INTEIRA de `click_events` ao canal. A
 * leitura já é restrita a administradores por RLS, mas o payload trafega e fica
 * em memória do navegador com campos que os painéis não usam (bairro, cidade,
 * problema, equipamento livre). Governança de telemetria (4E.4) manda tratar
 * dado por necessidade, não por permissão.
 *
 * Regra: todo consumidor de realtime projeta o payload nesta allowlist ANTES de
 * colocá-lo em estado. `scripts/check-realtime-payload.mjs` falha o CI quando um
 * `postgres_changes` usa `payload.new` sem passar por `projetarEventoClique`.
 */

/** Campos que os painéis admin realmente agregam. */
export const CAMPOS_CLIQUE_PERMITIDOS = [
  "created_at",
  "event_type",
  "path",
  "route_type",
  "servico",
  "customer_type",
  "funnel_stage",
  "cta_location",
  "cta_position",
  "attribution_channel",
  "viewport_bucket",
  "variant",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "session_id",
  // Rodada 6 — contexto contratual explicitamente liberado no broadcast.
  "route_family",
  "intent",
  "neighborhood_slug",
  "journey_id",
  "event_id",
  "landing_route",
] as const;

/** Campos que NUNCA podem sair do banco para o navegador via broadcast. */
export const CAMPOS_CLIQUE_PROIBIDOS = [
  "bairro",
  "cidade",
  "problema",
  "equipamento",
  "modalidade",
  "viewport_width",
] as const;

export type CampoCliquePermitido = (typeof CAMPOS_CLIQUE_PERMITIDOS)[number];

/**
 * Projeta um evento bruto do realtime na allowlist.
 * Chaves desconhecidas ou sensíveis são descartadas silenciosamente.
 */
export function projetarEventoClique<T extends Record<string, unknown>>(bruto: unknown): T {
  const origem = (bruto ?? {}) as Record<string, unknown>;
  const saida: Record<string, unknown> = {};
  for (const chave of CAMPOS_CLIQUE_PERMITIDOS) {
    if (origem[chave] !== undefined) saida[chave] = origem[chave];
  }
  return saida as T;
}
