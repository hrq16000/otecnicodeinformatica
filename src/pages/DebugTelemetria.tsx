import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import {
  ADS_ENABLED,
  ADS_SEND_TO,
  ANALYTICS_ENABLED,
  trackCTAClick,
} from "@/lib/analytics";
import { GA4_EVENTS } from "@/lib/trackingTaxonomy";
import { Button } from "@/components/ui/button";

/**
 * ─────────────────────────────────────────────────────────────
 * /debug/telemetria — painel de verificação de GA4 e Google Ads
 * ─────────────────────────────────────────────────────────────
 * Uso em desenvolvimento (ou com ?debug=1 em produção, para conferir a
 * publicação real). Sempre `noindex, nofollow` e fora do sitemap.
 *
 * Mostra: IDs configurados, se o gtag.js carregou de fato, o estado do
 * Consent Mode e um log ao vivo de todas as chamadas gtag — incluindo
 * `generate_lead` e `conversion`, para conferir que o clique do funil
 * dispara conversão UMA única vez por sessão.
 */

const envCfg = import.meta.env as unknown as Record<string, string | undefined>;
const GA4_ID = envCfg.VITE_GA4_ID?.trim() || "";
const ADS_ID = envCfg.VITE_GOOGLE_ADS_ID?.trim() || "";

interface GtagCall {
  t: number;
  args: unknown[];
}

const LEAD_KEY = "lead_dedup_v1";

export default function DebugTelemetria() {
  const [calls, setCalls] = useState<GtagCall[]>([]);
  const [tick, setTick] = useState(0);
  const allowed = import.meta.env.DEV ||
    (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("debug") === "1");

  // Espelha as chamadas gtag sem substituir a implementação real.
  useEffect(() => {
    if (!allowed || typeof window === "undefined") return;
    const w = window as unknown as {
      gtag?: (...a: unknown[]) => void;
      __debugTelemetryCalls?: GtagCall[];
      __debugTelemetryPatched?: boolean;
      dataLayer?: unknown[];
    };
    w.__debugTelemetryCalls = w.__debugTelemetryCalls || [];
    if (!w.__debugTelemetryPatched) {
      const original = w.gtag;
      w.gtag = function patched(...args: unknown[]) {
        w.__debugTelemetryCalls!.push({ t: Date.now(), args });
        window.dispatchEvent(new CustomEvent("debug-telemetry:call"));
        if (original) original.apply(w, args);
        else (w.dataLayer = w.dataLayer || []).push(args);
      };
      w.__debugTelemetryPatched = true;
    }
    const sync = () => setCalls([...(w.__debugTelemetryCalls || [])]);
    sync();
    window.addEventListener("debug-telemetry:call", sync);
    const id = window.setInterval(() => setTick((n) => n + 1), 1000);
    return () => {
      window.removeEventListener("debug-telemetry:call", sync);
      window.clearInterval(id);
    };
  }, [allowed]);

  const scriptLoaded = useMemo(() => {
    if (typeof document === "undefined") return false;
    void tick;
    return Boolean(document.querySelector('script[src*="googletagmanager.com/gtag/js"]'));
  }, [tick]);

  const consent = useMemo(() => {
    if (typeof window === "undefined") return "—";
    void tick;
    const dl = ((window as unknown as { dataLayer?: unknown[] }).dataLayer || []) as unknown[][];
    const last = [...dl].reverse().find((a) => Array.isArray(a) && a[0] === "consent");
    return last ? JSON.stringify(last[2] ?? last[1]) : "não definido";
  }, [tick]);

  const leadState = useMemo(() => {
    void tick;
    try {
      return sessionStorage.getItem(LEAD_KEY) || "{} (nenhum lead nesta sessão)";
    } catch {
      return "indisponível";
    }
  }, [tick]);

  const eventNames = calls
    .filter((c) => c.args[0] === "event")
    .map((c) => String(c.args[1]));
  const count = (name: string) => eventNames.filter((n) => n === name).length;

  const resetSession = useCallback(() => {
    try { sessionStorage.removeItem(LEAD_KEY); } catch { /* noop */ }
    const w = window as unknown as { __debugTelemetryCalls?: GtagCall[] };
    w.__debugTelemetryCalls = [];
    setCalls([]);
  }, []);

  if (!allowed) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 text-center">
        <Helmet>
          <title>Debug de telemetria</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <p className="text-muted-foreground">
          Painel disponível apenas em desenvolvimento. Em produção, abra com <code>?debug=1</code>.
        </p>
      </main>
    );
  }

  const Row = ({ label, value, ok }: { label: string; value: string; ok?: boolean }) => (
    <div className="flex items-start justify-between gap-4 border-b border-border py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-mono text-right break-all ${ok === undefined ? "" : ok ? "text-primary" : "text-destructive"}`}>
        {value}
      </span>
    </div>
  );

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <Helmet>
        <title>Debug de telemetria — GA4 e Google Ads</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="mx-auto max-w-3xl space-y-8">
        <header>
          <h1 className="text-2xl font-bold">Debug de telemetria</h1>
          <p className="text-sm text-muted-foreground">
            Verifica GA4 e Google Ads sem enviar nada além do que o site já envia.
          </p>
        </header>

        <section className="rounded-xl border border-border p-4" data-testid="debug-config">
          <h2 className="mb-2 font-semibold">Configuração</h2>
          <Row label="VITE_GA4_ID" value={GA4_ID || "(vazio)"} ok={Boolean(GA4_ID)} />
          <Row label="GA4 ativo" value={String(ANALYTICS_ENABLED)} ok={ANALYTICS_ENABLED} />
          <Row label="VITE_GOOGLE_ADS_ID" value={ADS_ID || "(vazio)"} ok={Boolean(ADS_ID)} />
          <Row label="Ads ativo" value={String(ADS_ENABLED)} ok={ADS_ENABLED} />
          <Row label="send_to da conversão" value={ADS_SEND_TO || "(sem rótulo)"} ok={Boolean(ADS_SEND_TO)} />
          <Row label="gtag.js carregado" value={String(scriptLoaded)} ok={scriptLoaded} />
          <Row label="Consent Mode" value={consent} />
          <Row label="Lead da sessão" value={leadState} />
        </section>

        <section className="rounded-xl border border-border p-4">
          <h2 className="mb-3 font-semibold">Disparo de teste</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              data-testid="debug-fire-whatsapp"
              onClick={() => trackCTAClick("whatsapp", "debug_telemetria")}
            >
              Simular clique de WhatsApp
            </Button>
            <Button
              type="button"
              variant="secondary"
              data-testid="debug-fire-phone"
              onClick={() => trackCTAClick("phone", "debug_telemetria")}
            >
              Simular clique de ligação
            </Button>
            <Button type="button" variant="outline" data-testid="debug-reset" onClick={resetSession}>
              Reiniciar sessão de lead
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            O segundo clique do mesmo tipo deve gerar apenas <code>cta_click</code> — sem novo
            <code> generate_lead</code> nem nova <code>conversion</code>.
          </p>
        </section>

        <section className="rounded-xl border border-border p-4" data-testid="debug-counters">
          <h2 className="mb-2 font-semibold">Contadores</h2>
          {[GA4_EVENTS.ctaClick, GA4_EVENTS.whatsapp, GA4_EVENTS.call, GA4_EVENTS.lead, GA4_EVENTS.adsConversion].map(
            (name) => (
              <Row key={name} label={name} value={String(count(name))} />
            ),
          )}
        </section>

        <section className="rounded-xl border border-border p-4">
          <h2 className="mb-2 font-semibold">Chamadas gtag ({calls.length})</h2>
          <ol className="space-y-2 text-xs" data-testid="debug-log">
            {calls.length === 0 && <li className="text-muted-foreground">Nenhuma chamada ainda.</li>}
            {calls.map((c, i) => (
              <li key={i} className="rounded bg-muted p-2 font-mono break-all">
                {new Date(c.t).toLocaleTimeString()} — {JSON.stringify(c.args)}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
