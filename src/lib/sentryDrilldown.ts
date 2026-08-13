/**
 * LINKS DE DRILLDOWN PARA O SENTRY.
 *
 * O painel de performance mostra p75 por rota e por componente; para
 * investigar é preciso ver os eventos brutos. Estes helpers montam a URL de
 * busca do Sentry já com os filtros aplicados (rota, componente, tipo de
 * evento e janela de tempo), usando as MESMAS tags que `capturarEvento`
 * escreve (`kind`, `path`, `surface`, `primitive`, `outcome`).
 *
 * Fail-closed: sem `VITE_SENTRY_ORG` (e opcionalmente `VITE_SENTRY_PROJECT`)
 * nenhuma URL é devolvida — o painel esconde o link em vez de mandar o
 * usuário para uma página quebrada.
 */
const env = import.meta.env as unknown as Record<string, string | undefined>;
const limpo = (v?: string) => (typeof v === "string" && v.trim() ? v.trim() : undefined);

const ORG = limpo(env.VITE_SENTRY_ORG);
const PROJETO = limpo(env.VITE_SENTRY_PROJECT);
const HOST = limpo(env.VITE_SENTRY_URL) || "https://sentry.io";

/** Há organização configurada? Sem isso não existe drilldown. */
export const drilldownDisponivel = () => Boolean(ORG);

export type FiltroDrilldown = {
  rota?: string;
  componente?: string;
  /** `ui.loading_end`, `ui.budget_exceeded`, `cta.click`… */
  kind?: string;
  /** Janela relativa aceita pelo Sentry: `15m`, `1h`, `24h`, `7d`. */
  janela?: string;
};

const TODAS = "__todas__";
const valido = (v?: string) => Boolean(v && v !== TODAS);

/** Query no formato de busca do Sentry (`tag:"valor"`). */
export const queryDrilldown = ({ rota, componente, kind }: FiltroDrilldown) =>
  [
    valido(kind) ? `kind:"${kind}"` : "",
    valido(rota) ? `path:"${rota}"` : "",
    valido(componente) ? `primitive:"${componente}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

/** URL da busca de eventos (Discover/Issues) com os filtros já aplicados. */
export const linkDrilldown = (filtro: FiltroDrilldown): string | null => {
  if (!ORG) return null;
  const params = new URLSearchParams();
  const query = queryDrilldown(filtro);
  if (query) params.set("query", query);
  // `janela` só entra se for uma janela relativa suportada — "tudo" cai no
  // padrão do Sentry, evitando URL inválida.
  if (filtro.janela && /^\d+[mhd]$/.test(filtro.janela)) params.set("statsPeriod", filtro.janela);
  if (PROJETO) params.set("project", PROJETO);
  return `${HOST.replace(/\/$/, "")}/organizations/${ORG}/issues/?${params.toString()}`;
};
