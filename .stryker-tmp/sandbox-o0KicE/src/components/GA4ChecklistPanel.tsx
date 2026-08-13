// @ts-nocheck
import { useEffect, useState } from "react";
import { CheckCircle2, Circle, ClipboardCheck, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ga4-ads-checklist-v1";

type Item = {
  id: string;
  label: string;
  hint?: string;
  link?: { url: string; label: string };
};

const ITEMS: Item[] = [
  {
    id: "ga4-debug",
    label: "Disparei um clique no WhatsApp e vi cta_click + generate_lead no DebugView do GA4",
    link: { url: "https://analytics.google.com/", label: "Abrir GA4" },
    hint: "Use ?debug_utm=1 na URL para ver o toast com os UTMs.",
  },
  {
    id: "ga4-keyevent",
    label: "Marquei generate_lead como Key Event (Evento-chave) no GA4",
    link: { url: "https://analytics.google.com/", label: "GA4 → Admin → Events" },
  },
  {
    id: "ads-link",
    label: "GA4 está vinculado à conta do Google Ads",
    link: { url: "https://ads.google.com/", label: "Abrir Google Ads" },
  },
  {
    id: "ads-import",
    label: "Importei generate_lead como conversão no Google Ads (Goals → Conversions → New)",
    link: { url: "https://ads.google.com/", label: "Ads → Goals → Conversions" },
  },
  {
    id: "ads-primary",
    label: "Defini a conversão como Primary action (Otimização para essa meta)",
  },
  {
    id: "utm-test",
    label: "Testei ?utm_source=google&utm_medium=cpc&utm_campaign=teste e o payload chegou no GA4",
  },
  {
    id: "og-fb",
    label: "Validei og:image no Facebook Sharing Debugger (cache atualizado)",
    link: {
      url: "https://developers.facebook.com/tools/debug/",
      label: "Facebook Debugger",
    },
  },
  {
    id: "og-tw",
    label: "Validei o Twitter Card Validator",
    link: {
      url: "https://cards-dev.twitter.com/validator",
      label: "Twitter Validator",
    },
  },
  {
    id: "og-li",
    label: "Validei o LinkedIn Post Inspector",
    link: {
      url: "https://www.linkedin.com/post-inspector/",
      label: "LinkedIn Inspector",
    },
  },
];

export const GA4ChecklistPanel = () => {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "G" || e.key === "g")) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const completed = ITEMS.filter((i) => done[i.id]).length;
  const pct = Math.round((completed / ITEMS.length) * 100);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed top-1 right-1 z-[100] p-1 rounded opacity-[0.04] hover:opacity-50 transition-opacity"
        aria-label="Checklist GA4/Ads"
        title="Ctrl+Shift+G"
      >
        <ClipboardCheck className="h-3 w-3 text-muted-foreground" />
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[100]" onClick={() => setOpen(false)} />
      <div
        className={cn(
          "fixed bottom-4 left-4 z-[101] w-96 max-h-[80vh] overflow-y-auto",
          "bg-card border border-border rounded-xl shadow-2xl",
          "animate-in slide-in-from-bottom-4 fade-in duration-200"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card">
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4" />
              Checklist GA4 + Google Ads
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {completed}/{ITEMS.length} concluídos · {pct}%
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Fechar"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="h-1 bg-muted">
          <div
            className="h-full bg-accent transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>

        <ul className="p-3 space-y-2">
          {ITEMS.map((item) => {
            const checked = !!done[item.id];
            return (
              <li
                key={item.id}
                className={cn(
                  "rounded-lg border p-3 transition-colors",
                  checked ? "bg-accent/5 border-accent/30" : "border-border"
                )}
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="flex items-start gap-2 w-full text-left"
                >
                  {checked ? (
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  )}
                  <span
                    className={cn(
                      "text-sm leading-snug",
                      checked && "line-through text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                </button>
                {item.hint && (
                  <p className="text-[11px] text-muted-foreground mt-1 ml-6">{item.hint}</p>
                )}
                {item.link && (
                  <a
                    href={item.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-accent hover:underline mt-1 ml-6"
                  >
                    {item.link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <div className="p-3 border-t border-border flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              setDone({});
              try {
                localStorage.removeItem(STORAGE_KEY);
              } catch {}
            }}
          >
            Limpar
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => {
              localStorage.setItem("debug_utm", "1");
              alert("Modo debug UTM ativado. Faça um clique no WhatsApp para ver o toast.");
            }}
          >
            Ativar debug UTM
          </Button>
        </div>

        <div className="p-2 bg-muted/50 rounded-b-xl">
          <p className="text-[10px] text-muted-foreground text-center">
            Atalho: Ctrl+Shift+G · Salvo localmente
          </p>
        </div>
      </div>
    </>
  );
};
