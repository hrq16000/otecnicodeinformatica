import { useEffect, useState } from "react";
import { APP_BUILD_INFO } from "@/lib/errorReporter";
import { WHATSAPP_NUMBER as WA_NUMBER } from "@/lib/siteConfig";

type AppError = {
  kind?: string;
  message?: string;
  url?: string;
  ts?: number;
  version?: string;
};

const WHATSAPP_URL =
  `https://wa.me/${WA_NUMBER}?text=Ol%C3%A1!%20Vi%20um%20problema%20na%20p%C3%A1gina%20de%20status.`;

export default function Status() {
  const [errors, setErrors] = useState<AppError[]>([]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    document.title = "Status do Portal — Técnico Curitiba";
    const refresh = () => {
      const w = window as unknown as { __APP_ERRORS__?: AppError[] };
      setErrors([...(w.__APP_ERRORS__ ?? [])].reverse());
      setNow(Date.now());
    };
    refresh();
    const onErr = () => refresh();
    window.addEventListener("app:error", onErr);
    const id = window.setInterval(refresh, 5000);
    return () => {
      window.removeEventListener("app:error", onErr);
      window.clearInterval(id);
    };
  }, []);

  const last = errors[0];
  const healthy = !last || now - (last.ts || 0) > 1000 * 60 * 5;

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Status do Portal</h1>
      <p className="text-muted-foreground mb-6">
        Diagnóstico em tempo real do funcionamento do site no seu navegador.
      </p>

      <section
        className={`rounded-xl border p-4 mb-6 ${
          healthy ? "border-emerald-500/40 bg-emerald-500/5" : "border-amber-500/50 bg-amber-500/10"
        }`}
        role="status"
        aria-live="polite"
      >
        <div className="text-lg font-semibold">
          {healthy ? "✅ Portal operacional" : "⚠️ Instabilidade detectada"}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          Build <strong>{APP_BUILD_INFO.version}</strong> publicado em{" "}
          {new Date(APP_BUILD_INFO.buildTime).toLocaleString("pt-BR")}
        </div>
      </section>

      <section className="rounded-xl border border-border p-4 mb-6">
        <h2 className="font-semibold mb-2">Último erro registrado</h2>
        {last ? (
          <div className="text-sm">
            <div>
              <strong>{last.kind}</strong> — {new Date(last.ts || 0).toLocaleString("pt-BR")}
            </div>
            <div className="text-muted-foreground break-words mt-1">{last.message}</div>
            <div className="text-xs text-muted-foreground mt-1">{last.url}</div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">Nenhum erro registrado nesta sessão.</div>
        )}
      </section>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 font-semibold"
      >
        Falar com suporte no WhatsApp
      </a>
    </main>
  );
}
