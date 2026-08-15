/**
 * Helpers server-only do Search Console (somente leitura).
 * Mantidos fora de *.functions.ts para não colidir com o code-splitting
 * de server functions.
 */
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

export type GscCreds = { headers: Record<string, string> } | null;

export function gscHeaders(): GscCreds {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const connKey = process.env["GOOGLE_SEARCH_CONSOLE_API_KEY"];
  if (!lovableKey || !connKey) return null;
  return {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": connKey,
      "Content-Type": "application/json",
    },
  };
}

/** Resolve a única propriedade verificada que cobre o domínio do site. */
export async function resolverPropriedade(
  headers: Record<string, string>,
  dominio: string,
): Promise<{ siteUrl: string } | { erro: string }> {
  const res = await fetch(`${GATEWAY}/webmasters/v3/sites`, { headers });
  if (!res.ok) return { erro: `falha ao listar propriedades [${res.status}]` };
  const { siteEntry = [] } = (await res.json()) as {
    siteEntry?: { siteUrl: string; permissionLevel?: string }[];
  };
  const host = dominio.toLowerCase();
  const candidatas = siteEntry.filter((e) => {
    if (e.permissionLevel === "siteUnverifiedUser") return false;
    if (e.siteUrl.startsWith("sc-domain:")) {
      const d = e.siteUrl.slice(10).toLowerCase();
      return host === d || host.endsWith(`.${d}`);
    }
    try {
      return new URL(e.siteUrl).hostname.toLowerCase().endsWith(host);
    } catch {
      return false;
    }
  });
  if (candidatas.length === 0) return { erro: "nenhuma propriedade verificada cobre o domínio" };
  if (candidatas.length > 1) {
    return { erro: `múltiplas propriedades cobrem o domínio (${candidatas.map((c) => c.siteUrl).join(", ")})` };
  }
  return { siteUrl: candidatas[0].siteUrl };
}

export type GscRow = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };

export async function consultarAnalytics(
  headers: Record<string, string>,
  siteUrl: string,
  body: Record<string, unknown>,
): Promise<GscRow[]> {
  const res = await fetch(
    `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    { method: "POST", headers, body: JSON.stringify(body) },
  );
  if (!res.ok) throw new Error(`searchAnalytics [${res.status}]`);
  const { rows = [] } = (await res.json()) as { rows?: GscRow[] };
  return rows;
}

export const diaOffset = (n: number) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);

export function agregar(rows: GscRow[]) {
  const clicks = rows.reduce((s, r) => s + (r.clicks ?? 0), 0);
  const impressions = rows.reduce((s, r) => s + (r.impressions ?? 0), 0);
  const peso = rows.reduce((s, r) => s + (r.impressions || 1), 0);
  const pos = rows.reduce((s, r) => s + (r.position ?? 0) * (r.impressions || 1), 0);
  return {
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: peso ? pos / peso : 0,
  };
}
