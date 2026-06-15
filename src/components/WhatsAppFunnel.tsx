import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import {
  trackFunnelOpen,
  trackFunnelStep,
  trackFunnelSubmit,
  trackFunnelClose,
  trackFunnelBlocked,
} from "@/lib/funnelAnalytics";
import { appendUtmsToUrl, captureUtmsFromUrl } from "@/lib/utmCapture";
import {
  EQUIPMENT_BRANCHES,
  getBranch,
  getSintoma,
  type Equipment,
} from "@/components/funnel/equipmentBranches";
import { MediaUploader } from "@/components/funnel/MediaUploader";
import { ColetaRequiredCard } from "@/components/funnel/ColetaRequiredCard";
import { getSessionId, recordSubmission, type FunnelMedia } from "@/lib/funnelMedia";

const WHATSAPP_NUMBER = "5541997452053";
const WA_HOSTS = ["wa.me", "api.whatsapp.com"];
const STORAGE_KEY = "wa_funnel_answers_v2";

interface Answers {
  equipamento: Equipment | null;
  marca: string;
  sintoma: string;          // id do sintoma
  media: FunnelMedia[];
  mediaConfirmEquipamento: boolean;
  mediaConfirmSemAudio: boolean;
  mediaConfirmSemRuido: boolean;
  coletaAccepted: boolean;
  descricao: string;
}

const EMPTY: Answers = {
  equipamento: null,
  marca: "",
  sintoma: "",
  media: [],
  mediaConfirmEquipamento: false,
  mediaConfirmSemAudio: false,
  mediaConfirmSemRuido: false,
  coletaAccepted: false,
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

function appendUtms(url: URL) {
  appendUtmsToUrl(url);
  if (!url.searchParams.has("utm_medium") || url.searchParams.get("utm_medium") === "organic") {
    url.searchParams.set("utm_medium", "funnel");
  }
  if (!url.searchParams.has("utm_campaign")) {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, "") || "home";
    url.searchParams.set("utm_campaign", path.replace(/\//g, "_").slice(0, 80));
  }
}

function buildMessage(a: Answers): string {
  const branch = a.equipamento ? getBranch(a.equipamento) : undefined;
  const sintoma = a.equipamento && a.sintoma ? getSintoma(a.equipamento, a.sintoma) : undefined;
  const lines: string[] = [];
  lines.push("Olá! Triagem completa pelo site Técnico Curitiba ✅");
  lines.push("");
  lines.push(`🔧 *Equipamento:* ${branch?.emoji ?? ""} ${branch?.label ?? "Não informado"}`);
  if (a.marca) lines.push(`• Marca/tipo: ${a.marca}`);
  if (sintoma) lines.push(`• Sintoma: ${sintoma.label}`);
  if (sintoma?.requiresColeta) {
    lines.push("");
    lines.push("📦 *Modalidade: COLETA E ENTREGA (obrigatória)*");
    lines.push("• Mínimo R$ 300 (diagnóstico incluso) · desistiu paga só R$ 90");
    lines.push("• Autorizado pelo cliente no funil");
  }
  if (a.media.length > 0) {
    lines.push("");
    lines.push(`📸 *Mídias anexadas (${a.media.length}):*`);
    a.media.forEach((m, i) => lines.push(`${i + 1}. ${m.kind === "video" ? "🎥" : "🖼️"} ${m.signedUrl}`));
    lines.push("(links válidos por 24h)");
  }
  if (a.descricao.trim()) {
    lines.push("");
    lines.push(`📝 ${a.descricao.trim()}`);
  }
  lines.push("");
  lines.push("— Estou ciente das políticas e termos: tecnicocuritiba.com.br/termos-e-condicoes");
  return lines.join("\n");
}

const TransparencyMini = () => (
  <div className="rounded-lg border border-border bg-card/50 p-2.5 text-[11px] text-muted-foreground leading-snug">
    <p>
      💡 <strong>Como funciona:</strong> orçamento grátis por WhatsApp · visita técnica a partir de R$ 99,99 (30 min)
      · reparos com coleta a partir de R$ 300 · diagnóstico R$ 90 se desistir.
    </p>
  </div>
);

export const WhatsAppFunnel = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [originLocation, setOriginLocation] = useState("cta");
  const [presetMessage, setPresetMessage] = useState<string | null>(null);
  const submittingRef = useRef(false);
  const sessionId = useMemo(() => getSessionId(), []);

  // Restore cached non-media answers
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setAnswers({ ...EMPTY, ...parsed, media: [] }); // mídias não persistem
      }
    } catch { /* noop */ }
  }, []);

  const persist = useCallback((a: Answers) => {
    try {
      const { media: _m, ...rest } = a;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    } catch { /* noop */ }
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
    captureUtmsFromUrl();
    trackFunnelOpen(loc, !!preset);
  }, []);

  // Global click interception for any WhatsApp anchor
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

      let preset: string | undefined;
      try {
        const u = new URL(href!, window.location.origin);
        preset = u.searchParams.get("text") || undefined;
      } catch { /* noop */ }

      openFunnel(loc, preset);
    };
    document.addEventListener("click", handler, true);

    const evHandler = (e: Event) => {
      const detail = (e as CustomEvent<{ location?: string; message?: string }>).detail || {};
      openFunnel(detail.location || "programmatic", detail.message);
    };
    window.addEventListener("wa-funnel:open", evHandler as EventListener);

    const originalOpen = window.open.bind(window);
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

  useEffect(() => {
    if (!open) return;
    trackFunnelStep(step, answers.equipamento, answers.sintoma);
  }, [open, step, answers.equipamento]);

  // ---------- Derivations ----------
  const branch = answers.equipamento ? getBranch(answers.equipamento) : undefined;
  const sintomaObj = answers.equipamento && answers.sintoma
    ? getSintoma(answers.equipamento, answers.sintoma)
    : undefined;
  const requiresColeta = !!sintomaObj?.requiresColeta;
  const requiresVideo = !!sintomaObj?.requiresVideo;
  const isOutro = answers.equipamento === "outro";

  const photosCount = answers.media.filter((m) => m.kind === "photo").length;
  const videosCount = answers.media.filter((m) => m.kind === "video").length;

  const mediaValid = isOutro
    ? true
    : (
      photosCount >= 1 &&
      (!requiresVideo || videosCount >= 1) &&
      answers.mediaConfirmEquipamento &&
      answers.mediaConfirmSemAudio &&
      answers.mediaConfirmSemRuido
    );

  // ---------- Navigation ----------
  const TOTAL_STEPS = 5; // 0 equip, 1 marca/sintoma, 2 mídia, 3 coleta/regra, 4 confirmação
  const canAdvance = useMemo(() => {
    if (step === 0) return !!answers.equipamento;
    if (step === 1) {
      if (isOutro) return answers.descricao.trim().length > 5;
      return !!answers.marca && !!answers.sintoma;
    }
    if (step === 2) return mediaValid;
    if (step === 3) {
      if (requiresColeta) return answers.coletaAccepted;
      return true;
    }
    return true;
  }, [step, answers, isOutro, mediaValid, requiresColeta]);

  const next = () => {
    setStep((s) => {
      let n = s + 1;
      // "Outro" pula upload obrigatório e regra de coleta
      if (s === 1 && isOutro) n = 4;
      // Sem regra de coleta → pula step 3
      if (s === 2 && !requiresColeta) n = 4;
      return Math.min(n, TOTAL_STEPS - 1);
    });
  };
  const back = () => setStep((s) => {
    let p = s - 1;
    if (s === 4 && !isOutro && !requiresColeta) p = 2;
    if (s === 4 && isOutro) p = 1;
    return Math.max(p, 0);
  });

  const reset = () => {
    setAnswers(EMPTY);
    persist(EMPTY);
    setStep(0);
  };

  const submit = useCallback(async () => {
    if (!mediaValid && !isOutro) {
      trackFunnelBlocked("media_incomplete", answers.equipamento);
      return;
    }
    submittingRef.current = true;
    try {
      const baseMessage = buildMessage(answers);
      const finalMessage = presetMessage ? `${presetMessage}\n\n---\n${baseMessage}` : baseMessage;

      try {
        await recordSubmission({
          sessionId,
          equipamento: branch?.label,
          marca: answers.marca,
          sintoma: sintomaObj?.label,
          requiresColeta,
          mediaPaths: answers.media.map((m) => m.path),
          waMessage: finalMessage,
        });
      } catch (err) {
        // Falha no insert não bloqueia o usuário; manda para WA mesmo assim
        // eslint-disable-next-line no-console
        console.warn("[funnel] submission insert failed", err);
        trackFunnelBlocked("insert_failed", answers.equipamento);
      }

      const url = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);
      url.searchParams.set("text", finalMessage);
      appendUtms(url);

      trackFunnelSubmit({
        ctaLocation: originLocation,
        equipamento: answers.equipamento,
        sintoma: answers.sintoma,
        requiresColeta,
        mediaCount: answers.media.length,
      });
      trackCTAClick("whatsapp", `funnel_${originLocation}`);

      window.open(url.toString(), "_blank", "noopener,noreferrer");
      setOpen(false);
    } finally {
      setTimeout(() => { submittingRef.current = false; }, 250);
    }
  }, [answers, branch, sintomaObj, requiresColeta, mediaValid, isOutro, originLocation, presetMessage, sessionId]);

  const handleOpenChange = (v: boolean) => {
    if (!v) trackFunnelClose(step, answers.equipamento);
    setOpen(v);
  };

  // ---------- UI ----------
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto p-5 sm:p-6">
        <DialogHeader className="space-y-1">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Lock className="h-4 w-4 text-primary" />
            Triagem antes do atendimento
          </DialogTitle>
          <DialogDescription className="text-xs">
            Para garantir um atendimento rápido e preciso, o WhatsApp humano abre <strong>somente após a triagem</strong>.
            Etapa {step + 1} de {TOTAL_STEPS}.
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="flex gap-1 mb-1">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        {/* Step 0 — equipamento */}
        {step === 0 && (
          <div className="space-y-3">
            <TransparencyMini />
            <p className="text-sm font-medium">1. Qual o equipamento?</p>
            <div className="grid grid-cols-2 gap-2">
              {EQUIPMENT_BRANCHES.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => { update({ equipamento: b.id, marca: "", sintoma: "" }); next(); }}
                  className={`text-left p-3 rounded-lg border transition-colors ${
                    answers.equipamento === b.id
                      ? "border-primary bg-accent/10"
                      : "border-border bg-card hover:border-primary/60"
                  }`}
                >
                  <p className="text-2xl">{b.emoji}</p>
                  <p className="text-sm font-semibold mt-0.5">{b.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1 — marca + sintoma (ou descrição livre para "outro") */}
        {step === 1 && branch && (
          <div className="space-y-3">
            {isOutro ? (
              <>
                <p className="text-sm font-medium">Descreva seu caso</p>
                <Textarea
                  rows={5}
                  placeholder="Conte o equipamento, marca, o que aconteceu e quando começou…"
                  value={answers.descricao}
                  onChange={(e) => update({ descricao: e.target.value })}
                />
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm font-medium mb-1.5">{branch.marcaLabel}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {branch.marcaOptions.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => update({ marca: m })}
                        className={`px-2.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          answers.marca === m
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card hover:border-primary/60"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1.5">Qual é o problema?</p>
                  <div className="grid gap-1.5">
                    {branch.sintomas.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => update({ sintoma: s.id })}
                        className={`text-left p-2.5 rounded-lg border text-sm flex items-center justify-between gap-2 transition-colors ${
                          answers.sintoma === s.id
                            ? "border-primary bg-accent/10"
                            : "border-border bg-card hover:border-primary/60"
                        }`}
                      >
                        <span>{s.label}</span>
                        {s.requiresColeta && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 flex-shrink-0">
                            COLETA
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            <FunnelNav onBack={back} onNext={next} canNext={canAdvance} />
          </div>
        )}

        {/* Step 2 — mídia obrigatória */}
        {step === 2 && !isOutro && branch && (
          <div className="space-y-3">
            <p className="text-sm font-medium">Anexe fotos e vídeo do equipamento</p>
            <MediaUploader
              sessionId={sessionId}
              media={answers.media}
              onChange={(media) => update({ media })}
              requireVideo={requiresVideo}
            />
            <div className="space-y-1.5 rounded-lg border border-border bg-card/40 p-2.5">
              <Checkbox
                checked={answers.mediaConfirmEquipamento}
                onChange={(v) => update({ mediaConfirmEquipamento: v })}
                label="O vídeo mostra o equipamento completo (frente, traseira e entradas)."
              />
              <Checkbox
                checked={answers.mediaConfirmSemAudio}
                onChange={(v) => update({ mediaConfirmSemAudio: v })}
                label="O vídeo está sem voz/fala (microfone mutado)."
              />
              <Checkbox
                checked={answers.mediaConfirmSemRuido}
                onChange={(v) => update({ mediaConfirmSemRuido: v })}
                label="Ambiente está sem ruído de fundo (TV, música, conversa)."
              />
            </div>
            {!mediaValid && (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                Sem fotos/vídeo válidos e checagens marcadas, não conseguimos triagem prévia.
              </p>
            )}
            <FunnelNav onBack={back} onNext={next} canNext={canAdvance} />
          </div>
        )}

        {/* Step 3 — regra Coleta e Entrega */}
        {step === 3 && requiresColeta && sintomaObj && branch && (
          <div className="space-y-3">
            <ColetaRequiredCard
              equipamento={branch.label}
              sintoma={sintomaObj.label}
              accepted={answers.coletaAccepted}
              onAcceptChange={(v) => update({ coletaAccepted: v })}
            />
            <FunnelNav onBack={back} onNext={next} canNext={canAdvance} nextLabel="Continuar" />
          </div>
        )}

        {/* Step 4 — confirmação e envio */}
        {step === 4 && (
          <div className="space-y-3">
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 flex gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs leading-snug">
                <p className="font-semibold text-foreground">Triagem completa! 🎉</p>
                <p className="text-foreground/70 mt-0.5">
                  Vamos abrir o WhatsApp já com todas as informações. Resposta em até 30 min em horário comercial.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card/50 p-3 space-y-1 text-xs">
              {branch && <p>📦 <strong>{branch.label}</strong>{answers.marca ? ` — ${answers.marca}` : ""}</p>}
              {sintomaObj && <p>⚠️ {sintomaObj.label}</p>}
              {requiresColeta && <p className="text-amber-700 dark:text-amber-400">📦 Coleta e Entrega · mín. R$ 300 (autorizado)</p>}
              {answers.media.length > 0 && <p>📸 {answers.media.length} mídia(s) anexada(s)</p>}
            </div>

            <Textarea
              placeholder="Quer acrescentar algo? (opcional)"
              rows={3}
              value={answers.descricao}
              onChange={(e) => update({ descricao: e.target.value })}
              maxLength={500}
            />

            <p className="text-[11px] text-muted-foreground">
              Ao continuar você concorda com os{" "}
              <Link to="/termos-e-condicoes" className="underline hover:text-foreground" onClick={() => setOpen(false)}>
                Termos e Condições
              </Link>.
            </p>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={back} className="gap-1">
                <ArrowLeft className="h-4 w-4" /> Voltar
              </Button>
              <Button variant="outline" size="sm" onClick={reset}>Recomeçar</Button>
              <Button
                onClick={submit}
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

// ---------- helpers ----------
const FunnelNav = ({
  onBack, onNext, canNext, nextLabel = "Continuar",
}: { onBack: () => void; onNext: () => void; canNext: boolean; nextLabel?: string }) => (
  <div className="flex gap-2 pt-1">
    <Button variant="outline" size="sm" onClick={onBack} className="gap-1">
      <ArrowLeft className="h-4 w-4" /> Voltar
    </Button>
    <Button onClick={onNext} disabled={!canNext} className="ml-auto gap-1">
      {nextLabel} <ArrowRight className="h-4 w-4" />
    </Button>
  </div>
);

const Checkbox = ({
  checked, onChange, label,
}: { checked: boolean; onChange: (v: boolean) => void; label: string }) => (
  <label className="flex items-start gap-2 text-xs cursor-pointer leading-snug">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-0.5 h-3.5 w-3.5 accent-primary"
    />
    <span>{label}</span>
  </label>
);

// Backward-compat export (alguns componentes legados importam isso)
export const TransparencyNote = ({ className = "" }: { className?: string }) => (
  <p className={`text-xs text-muted-foreground leading-relaxed ${className}`}>
    📌 <strong>Transparência:</strong> orçamento grátis por WhatsApp (com fotos). Visita técnica a partir de
    {" "}R$ 99,99 (30 min) · diagnóstico R$ 90 só se cancelar · reparos com coleta a partir de R$ 300.{" "}
    <Link to="/termos-e-condicoes" className="underline hover:text-foreground">Ver termos</Link>
  </p>
);

export default WhatsAppFunnel;
