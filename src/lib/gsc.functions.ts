import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * LEITURA (SOMENTE LEITURA) DO GOOGLE SEARCH CONSOLE — site performance.
 *
 * Fonte: connector gateway do Lovable (credenciais só existem no servidor).
 * Nunca grava tokens, nunca expõe segredos ao cliente.
 *
 * Regra de dados: quando a API não devolve linhas, o status é NO_DATA;
 * quando não é possível ler (sem credencial/propriedade), é UNKNOWN.
 * Zeros NUNCA são inventados.
 *
 * Semântica: Search Console = performance real do NOSSO site.
 * (Semrush/AnswerThePublic = demanda de mercado — outra camada, outro painel.)
 */

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

export type GscStatus = "OK" | "NO_DATA" | "UNKNOWN";

export type GscLinha = {
  chave: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type GscSnapshot = {
  status: GscStatus;
  motivo?: string;
  propriedade: string | null;
  periodo: { inicio: string; fim: string } | null;
  totais: { clicks: number; impressions: number; ctr: number; position: number } | null;
  paginas: GscLinha[];
  consultas: GscLinha[];
  paises: GscLinha[];
  dispositivos: GscLinha[];
  geradoEm: string;
};

const dia = (n: number) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);

const vazio = (status: GscStatus, motivo: string): GscSnapshot => ({
  status,
  motivo,
  propriedade: null,
  periodo: null,
  totais: null,
  paginas: [],
  consultas: [],
  paises: [],
  dispositivos: [],
  geradoEm: new Date().toISOString(),
});

export const getGscSnapshot = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    const d = (data ?? {}) as { dias?: number };
    const dias = Number(d.dias);
    return { dias: [7, 28, 90].includes(dias) ? dias : 28 };
  })
  .handler(async ({ data }): Promise<GscSnapshot> => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const connKey = process.env["GOOGLE_SEARCH_CONSOLE_API_KEY"];
    const dominio = process.env["VITE_SITE_DOMAIN"] || "otecnicodeinformatica.com.br";

    if (!lovableKey || !connKey) {
      return vazio("UNKNOWN", "Search Console não conectado neste ambiente");
    }

    const headers = {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": connKey,
      "Content-Type": "application/json",
    };

    try {
      const listRes = await fetch(`${GATEWAY}/webmasters/v3/sites`, { headers });
      if (!listRes.ok) {
        return vazio("UNKNOWN", `falha ao listar propriedades [${listRes.status}]`);
      }
      const { siteEntry = [] } = (await listRes.json()) as {
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
      if (candidatas.length !== 1) {
        return vazio(
          "UNKNOWN",
          candidatas.length === 0
            ? "nenhuma propriedade verificada cobre o domínio"
            : `múltiplas propriedades cobrem o domínio (${candidatas.map((c) => c.siteUrl).join(", ")})`,
        );
      }
      const siteUrl = candidatas[0].siteUrl;

      const fim = dia(2);
      const inicio = dia(data.dias + 2);

      const consultar = async (dimensions: string[], rowLimit: number): Promise<GscLinha[]> => {
        const res = await fetch(
          `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({ startDate: inicio, endDate: fim, dimensions, rowLimit }),
          },
        );
        if (!res.ok) throw new Error(`searchAnalytics [${res.status}]`);
        const { rows = [] } = (await res.json()) as {
          rows?: { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }[];
        };
        return rows.map((r) => ({
          chave: r.keys.join(" · "),
          clicks: r.clicks ?? 0,
          impressions: r.impressions ?? 0,
          ctr: r.ctr ?? 0,
          position: r.position ?? 0,
        }));
      };

      const [paginas, consultas, paises, dispositivos] = await Promise.all([
        consultar(["page"], 200),
        consultar(["query"], 200),
        consultar(["country"], 50),
        consultar(["device"], 10),
      ]);

      const linhas = paginas.length ? paginas : consultas;
      if (!linhas.length) {
        return {
          ...vazio("NO_DATA", "a API respondeu sem linhas para o período"),
          propriedade: siteUrl,
          periodo: { inicio, fim },
        };
      }

      const clicks = linhas.reduce((s, r) => s + r.clicks, 0);
      const impressions = linhas.reduce((s, r) => s + r.impressions, 0);
      const posSoma = linhas.reduce((s, r) => s + r.position * (r.impressions || 1), 0);
      const posPeso = linhas.reduce((s, r) => s + (r.impressions || 1), 0);

      return {
        status: "OK",
        propriedade: siteUrl,
        periodo: { inicio, fim },
        totais: {
          clicks,
          impressions,
          ctr: impressions ? clicks / impressions : 0,
          position: posPeso ? posSoma / posPeso : 0,
        },
        paginas,
        consultas,
        paises,
        dispositivos,
        geradoEm: new Date().toISOString(),
      };
    } catch (e) {
      return vazio("UNKNOWN", `falha ao consultar o Search Console: ${(e as Error).message}`);
    }
  });
