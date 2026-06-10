import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Wrench,
  Home,
  Camera,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";
const WA_HOSTS = ["wa.me", "api.whatsapp.com"];
const STORAGE_KEY = "wa_funnel_answers_v1";

type Intent = "consertar" | "visita" | "orcamento";

interface Answers {
  intent: Intent | null;
  equipamento: string;
  marca: string;
  problemaPlaca: boolean | null; // for "consertar"
  tipoVisita: string; // for "visita"
  preferencia: "parceiro" | "coleta" | "";
  endereco: string;
  descricao: string;
}

const EMPTY: Answers = {
  intent: null,
  equipamento: "",
  marca: "",
  problemaPlaca: null,
  tipoVisita: "",
  preferencia: "",
  endereco: "",
  descricao: "",
};

function isWhatsAppHref(href: string | null): boolean {
  if (!href) return false;
  try {
    const u = new URL(href, window.location.origin);
    return WA_HOSTS.some((h) => u.hostname.endsWith(h));
  } catch {
    return false;
  }
}

function buildMessage(a: Answers): string {
  const lines: string[] = [];
  lines.push("Olá! Vim pelo site Preciso de um Técnico. 👋");
  lines.push("");
  if (a.intent === "consertar") {
    lines.push("🔧 *Tipo de atendimento:* Conserto de equipamento");
    if (a.equipamento) lines.push(`• Equipamento: ${a.equipamento}`);
    if (a.marca) lines.push(`• Marca/modelo: ${a.marca}`);
    if (a.problemaPlaca === true)
      lines.push("• Suspeita de defeito em PLACA (não liga, tela preta, artefatos ou superaquecimento)");
    if (a.preferencia === "parceiro") lines.push("• Posso levar até um parceiro em Curitiba (grátis)");
    if (a.preferencia === "coleta") lines.push("• Preciso de COLETA / entrega");
  } else if (a.intent === "visita") {
    lines.push("🏠 *Tipo de atendimento:* Visita técnica local");
    if (a.tipoVisita) lines.push(`• Serviço: ${a.tipoVisita}`);
    if (a.endereco) lines.push(`• Endereço: ${a.endereco}`);
  } else if (a.intent === "orcamento") {
    lines.push("💬 *Tipo de atendimento:* Orçamento rápido por WhatsApp");
  }
  if (a.descricao) {
    lines.push("");
    lines.push(`📝 Descrição: ${a.descricao}`);
  }
  lines.push("");
  lines.push("— Estou ciente das políticas:");
  lines.push("• Orçamento por WhatsApp é GRÁTIS (envio fotos/vídeos aqui)");
  lines.push("• Visita técnica a partir de R$ 99,99 (até 30 min)");
  lines.push("• Diagnóstico em bancada R$ 90 (apenas se eu não aprovar o reparo)");
  lines.push("• Reparos de placa/TV/PC têm valor mínimo de R$ 300 e máximo de R$ 500 sem nova autorização");
  lines.push("");
  lines.push("Envio fotos/vídeos aqui no chat. Aguardo o retorno em até 30 min. 🙏");
  return lines.join("\n");
}

function appendUtms(url: URL) {
  const sp = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
  for (const k of keys) {
    const v = sp.get(k);
    if (v && !url.searchParams.has(k)) url.searchParams.set(k, v);
  }
  if (!url.searchParams.has("utm_source")) url.searchParams.set("utm_source", "site");
  if (!url.searchParams.has("utm_medium")) url.searchParams.set("utm_medium", "funnel");
  if (!url.searchParams.has("utm_campaign")) {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, "") || "home";
    url.searchParams.set("utm_campaign", path.replace(/\//g, "_").slice(0, 80));
  }
}

const TransparencyCards = () => (
  <div className="grid sm:grid-cols-2 gap-2.5">
    {[
      { icon: MessageCircle, title: "Orçamento Grátis", desc: "Por WhatsApp com fotos e vídeos. Sem custo.", tone: "text-emerald-600" },
      { icon: Home, title: "Visita técnica", desc: "A partir de R$ 99,99 (até 30 min). Combo 2h: R$ 299,99.", tone: "text-blue-600" },
      { icon: Wrench, title: "Diagnóstico em bancada", desc: "R$ 90 (apenas se você desistir após análise).", tone: "text-amber-600" },
      { icon: ShieldCheck, title: "Reparo de placa", desc: "Valor pré-aprovado: R$ 300 a R$ 500. Acima disso, autorizamos antes.", tone: "text-violet-600" },
    ].map((c) => (
      <div key={c.title} className="flex gap-2.5 rounded-lg border border-border bg-card/50 p-2.5">
        <c.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${c.tone}`} />
        <div>
          <p className="text-sm font-semibold leading-tight">{c.title}</p>
          <p className="text-xs text-muted-foreground leading-snug mt-0.5">{c.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

function gaEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const sp = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].forEach((k) => {
    const v = sp.get(k);
    if (v) utm[k] = v;
  });
  const payload = { event_category: "wa_funnel", page_path: window.location.pathname, ...utm, ...params };
  // eslint-disable-next-line no-console
  console.log(`[GA4 ${name}]`, payload);
  (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", name, payload);
}

export const WhatsAppFunnel = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [originLocation, setOriginLocation] = useState("cta");
  const [presetMessage, setPresetMessage] = useState<string | null>(null);
  const submittingRef = useRef(false);

  // Restore cached answers (sessionStorage) so users don't redo the funnel.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers({ ...EMPTY, ...JSON.parse(raw) });
    } catch { /* noop */ }
  }, []);

  const persist = useCallback((a: Answers) => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(a)); } catch { /* noop */ }
  }, []);

  const update = useCallback((patch: Partial<Answers>) => {
    setAnswers((prev) => {
      const next = { ...prev, ...patch };
      persist(next);
      return next;
    });
  }, [persist]);

  const openFunnel = useCallback((loc: string, preset?: string) => {
    setOriginLocation(loc);
    setPresetMessage(preset ?? null);
    setStep(0);
    setOpen(true);
    gaEvent("wa_funnel_open", { cta_location: loc, has_preset: !!preset });
  }, []);

  // Global click interception for any WhatsApp anchor on the page.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (submittingRef.current) return;
      const target = e.target as HTMLElement | null;
      const a = target?.closest("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!isWhatsAppHref(href)) return;
      if (a.dataset.funnelSkip === "1") return;

      e.preventDefault();
      e.stopPropagation();

      let loc = "cta";
      if (a.closest("header")) loc = "header";
      else if (a.closest("footer")) loc = "footer";
      else if (a.closest("[data-wa-medium]")) loc = (a.closest("[data-wa-medium]") as HTMLElement).dataset.waMedium || "cta";
      else if (a.getAttribute("aria-label")?.toLowerCase().includes("whatsapp")) loc = "float";

      // Carry over any preset `text` param from the anchor
      let preset: string | undefined;
      try {
        const u = new URL(href!, window.location.origin);
        preset = u.searchParams.get("text") || undefined;
      } catch { /* noop */ }

      openFunnel(loc, preset);
    };
    document.addEventListener("click", handler, true);

    // Programmatic open: dispatch `wa-funnel:open` with optional { location, message }
    const evHandler = (e: Event) => {
      const detail = (e as CustomEvent<{ location?: string; message?: string }>).detail || {};
      openFunnel(detail.location || "programmatic", detail.message);
    };
    window.addEventListener("wa-funnel:open", evHandler as EventListener);

    // Monkey-patch window.open so legacy callers like
    // `window.open("https://wa.me/...?text=...")` also route through the funnel.
    const originalOpen = window.open.bind(window);
    (window as unknown as { __waOriginalOpen?: typeof window.open }).__waOriginalOpen = originalOpen;
    window.open = ((url?: string | URL, target?: string, features?: string) => {
      try {
        if (submittingRef.current) return originalOpen(url, target, features);
        const href = typeof url === "string" ? url : url?.toString();
        if (href && isWhatsAppHref(href)) {
          let preset: string | undefined;
          try {
            const u = new URL(href, window.location.origin);
            preset = u.searchParams.get("text") || undefined;
          } catch { /* noop */ }
          openFunnel("programmatic", preset);
          return null;
        }
      } catch { /* fall through */ }
      return originalOpen(url, target, features);
    }) as typeof window.open;

    return () => {
      document.removeEventListener("click", handler, true);
      window.removeEventListener("wa-funnel:open", evHandler as EventListener);
      window.open = originalOpen;
    };
  }, [openFunnel]);

  // Track step transitions
  useEffect(() => {
    if (!open) return;
    gaEvent("wa_funnel_step", { step, intent: answers.intent || "none" });
  }, [open, step, answers.intent]);

  const canSubmit = useMemo(() => {
    if (!answers.intent) return false;
    if (answers.intent === "consertar" && !answers.equipamento.trim()) return false;
    if (answers.intent === "visita" && !answers.tipoVisita.trim()) return false;
    return true;
  }, [answers]);

  const submit = useCallback(() => {
    submittingRef.current = true;
    try {
      const baseMessage = buildMessage(answers);
      const finalMessage = presetMessage ? `${presetMessage}\n\n---\n${baseMessage}` : baseMessage;
      const url = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);
      url.searchParams.set("text", finalMessage);
      appendUtms(url);
      gaEvent("wa_funnel_submit", {
        cta_location: originLocation,
        intent: answers.intent,
        has_equipamento: !!answers.equipamento,
        has_endereco: !!answers.endereco,
        preferencia: answers.preferencia || "n/a",
      });
      trackCTAClick("whatsapp", `funnel_${originLocation}`);
      const win = window.open(url.toString(), "_blank", "noopener,noreferrer");
      gaEvent("wa_funnel_opened", { cta_location: originLocation, opened: !!win });
      setOpen(false);
    } finally {
      setTimeout(() => { submittingRef.current = false; }, 250);
    }
  }, [answers, originLocation, presetMessage]);

  const reset = useCallback(() => {
    setAnswers(EMPTY);
    persist(EMPTY);
    setStep(0);
  }, [persist]);

  // intent-aware navigation: "orcamento" pula direto para a descrição
  const next = () => setStep((s) => {
    if (s === 0 && answers.intent === "orcamento") return 3;
    if (s === 1 && answers.intent === "visita") return 3;
    return Math.min(s + 1, 3);
  });
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleOpenChange = (v: boolean) => {
    if (v && answers.intent && step === 0) setStep(3);
    if (!v) gaEvent("wa_funnel_close", { step, intent: answers.intent || "none" });
    setOpen(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto p-5 sm:p-6">
        <DialogHeader className="space-y-1">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <MessageCircle className="h-5 w-5 text-[hsl(var(--whatsapp))]" />
            Antes de abrir o WhatsApp
          </DialogTitle>
          <DialogDescription className="text-xs">
            Em 3 perguntas rápidas, já chegamos com tudo pronto para te atender.
          </DialogDescription>
        </DialogHeader>

        {step === 0 && (
          <div className="space-y-4">
            <TransparencyCards />
            <div className="space-y-2">
              <p className="text-sm font-medium">1. O que você precisa?</p>
              {[
                { id: "consertar" as const, icon: Wrench, title: "Consertar equipamento", sub: "TV, console, PC, notebook, celular, placa, som" },
                { id: "visita" as const, icon: Home, title: "Visita técnica local", sub: "Instalação, formatação, impressora, roteador, tomada" },
                { id: "orcamento" as const, icon: Camera, title: "Só um orçamento rápido", sub: "Envio fotos e descrição pelo WhatsApp" },
              ].map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => { update({ intent: o.id }); next(); }}
                  className="w-full text-left p-3 rounded-lg border border-border bg-card hover:border-primary hover:bg-accent/5 transition-colors flex items-start gap-3"
                >
                  <o.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{o.title}</p>
                    <p className="text-xs text-muted-foreground">{o.sub}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground mt-1" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && answers.intent === "consertar" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 flex gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-foreground/80">
                Reparos de placa têm valor mínimo de <strong>R$ 300</strong> (já com diagnóstico). Se desistir após análise, paga só os <strong>R$ 90</strong> do diagnóstico.
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">2. Qual é o equipamento?</label>
              <Input
                placeholder="Ex: PS5, Notebook Dell, TV Samsung 55…"
                value={answers.equipamento}
                onChange={(e) => update({ equipamento: e.target.value })}
              />
              <Input
                placeholder="Marca e modelo (opcional)"
                value={answers.marca}
                onChange={(e) => update({ marca: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">É problema em placa? (não liga, tela preta, artefatos, superaquecimento)</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={answers.problemaPlaca === true ? "default" : "outline"}
                  size="sm"
                  onClick={() => update({ problemaPlaca: true })}
                >Sim</Button>
                <Button
                  type="button"
                  variant={answers.problemaPlaca === false ? "default" : "outline"}
                  size="sm"
                  onClick={() => update({ problemaPlaca: false })}
                >Não / não sei</Button>
              </div>
            </div>
            <FunnelNav onBack={back} onNext={next} canNext={!!answers.equipamento.trim()} />
          </div>
        )}

        {step === 1 && answers.intent === "visita" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
              <p className="text-xs text-foreground/80">
                <strong>Visita: R$ 99,99</strong> por até 30 min · <strong>Combo 2h: R$ 299,99</strong>. Orçamento exato só após avaliação no local. Não inclui peças/estacionamento.
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">2. Qual o serviço?</label>
              <Input
                placeholder="Ex: configurar impressora, formatar PC, instalar roteador…"
                value={answers.tipoVisita}
                onChange={(e) => update({ tipoVisita: e.target.value })}
              />
              <label className="text-sm font-medium mt-2 block">Endereço completo + bairro</label>
              <Input
                placeholder="Rua, nº, bairro, complemento"
                value={answers.endereco}
                onChange={(e) => update({ endereco: e.target.value })}
              />
            </div>
            <FunnelNav onBack={back} onNext={() => setStep(3)} canNext={!!answers.tipoVisita.trim()} />
          </div>
        )}

        {step === 2 && answers.intent === "consertar" && (
          <div className="space-y-4">
            <p className="text-sm font-medium">3. Como prefere o atendimento?</p>
            <div className="grid gap-2">
              <button
                type="button"
                onClick={() => { update({ preferencia: "parceiro" }); next(); }}
                className={`text-left p-3 rounded-lg border ${answers.preferencia === "parceiro" ? "border-primary bg-accent/10" : "border-border bg-card"} hover:border-primary transition-colors`}
              >
                <p className="text-sm font-semibold">Levo até um parceiro em Curitiba</p>
                <p className="text-xs text-muted-foreground">Grátis · indicamos o ponto mais próximo</p>
              </button>
              <button
                type="button"
                onClick={() => { update({ preferencia: "coleta" }); next(); }}
                className={`text-left p-3 rounded-lg border ${answers.preferencia === "coleta" ? "border-primary bg-accent/10" : "border-border bg-card"} hover:border-primary transition-colors`}
              >
                <p className="text-sm font-semibold">Preciso de coleta e entrega</p>
                <p className="text-xs text-muted-foreground">Custo da coleta é informado no WhatsApp</p>
              </button>
            </div>
            <FunnelNav onBack={back} onNext={next} canNext={!!answers.preferencia} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm font-medium">{answers.intent === "orcamento" ? "2" : "4"}. Descreva o problema</p>
            <Textarea
              placeholder="Conte rapidamente o que está acontecendo. Você poderá anexar fotos e vídeos direto no WhatsApp depois."
              rows={4}
              value={answers.descricao}
              onChange={(e) => update({ descricao: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Ao continuar você concorda com nossas{" "}
              <Link to="/termos-e-condicoes" className="underline hover:text-foreground" onClick={() => setOpen(false)}>
                políticas de serviço
              </Link>.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={back} className="gap-1">
                <ArrowLeft className="h-4 w-4" /> Voltar
              </Button>
              <Button variant="outline" size="sm" onClick={reset}>Recomeçar</Button>
              <Button
                onClick={submit}
                disabled={!canSubmit}
                className="ml-auto bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp-hover))] text-white gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Abrir WhatsApp
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const FunnelNav = ({ onBack, onNext, canNext }: { onBack: () => void; onNext: () => void; canNext: boolean }) => (
  <div className="flex gap-2 pt-1">
    <Button variant="outline" size="sm" onClick={onBack} className="gap-1">
      <ArrowLeft className="h-4 w-4" /> Voltar
    </Button>
    <Button onClick={onNext} disabled={!canNext} className="ml-auto gap-1">
      Continuar <ArrowRight className="h-4 w-4" />
    </Button>
  </div>
);

export const TransparencyNote = ({ className = "" }: { className?: string }) => (
  <p className={`text-xs text-muted-foreground leading-relaxed ${className}`}>
    📌 <strong>Transparência:</strong> orçamento grátis por WhatsApp (com fotos). Visita técnica a partir de
    {" "}R$ 99,99 · diagnóstico R$ 90 só se cancelar · reparos de placa entre R$ 300 e R$ 500.{" "}
    <Link to="/termos-e-condicoes" className="underline hover:text-foreground">Ver termos</Link>
  </p>
);
