import { useCallback, useEffect, useRef, useState } from "react";
import {
  Smartphone,
  Loader2,
  AlertTriangle,
  MessageCircle,
  RefreshCw,
  Clock,
  ShieldCheck,
  FileDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { track, trackWaClick } from "@/lib/funnelAnalytics";
import { baixarPdfOs } from "@/lib/osPdf";
import { whatsappLink } from "@/lib/siteConfig";

export interface OsEtapaRemota {
  titulo: string;
  status?: "concluida" | "andamento" | "pendente";
  em?: string;
  prazo?: string;
  nota?: string;
}

export interface OrdemRemota {
  protocolo: string;
  cliente_nome?: string | null;
  equipamento?: string | null;
  marca_modelo?: string | null;
  sintomas?: string | null;
  fotos: string[];
  modalidade?: string | null;
  status: string;
  etapas: OsEtapaRemota[];
  previsao_conclusao?: string | null;
  observacoes_publicas?: string | null;
  created_at: string;
  updated_at: string;
}

const POLL_MS = 45_000;

const maskPhone = (raw: string) => {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const isValidPhone = (raw: string) => {
  const d = raw.replace(/\D/g, "");
  return d.length === 11 && d[2] === "9";
};

const fmtDate = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) : "—";

/** Progresso 0–100 a partir das etapas concluídas. */
const progresso = (etapas: OsEtapaRemota[]) => {
  if (!etapas.length) return 0;
  const done = etapas.filter((e) => e.status === "concluida").length;
  const running = etapas.some((e) => e.status === "andamento") ? 0.5 : 0;
  return Math.round(((done + running) / etapas.length) * 100);
};

/** SLA: dias corridos até a previsão (negativo = atrasado). */
const slaInfo = (previsao?: string | null) => {
  if (!previsao) return null;
  const diff = new Date(previsao).getTime() - Date.now();
  const dias = Math.ceil(diff / 86_400_000);
  if (diff < 0) return { tone: "atrasado" as const, label: "Prazo estimado excedido — atendimento já notificado" };
  if (dias <= 1) return { tone: "atencao" as const, label: "Perto do prazo — conclusão prevista em até 1 dia" };
  return { tone: "ok" as const, label: `Dentro do prazo — previsão em ${dias} dias` };
};

export const ConsultaOsPorCelular = () => {
  const [telefone, setTelefone] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [ordens, setOrdens] = useState<OrdemRemota[] | null>(null);
  const [atualizadoEm, setAtualizadoEm] = useState<string | null>(null);
  const ultimoTelefone = useRef<string | null>(null);

  const consultar = useCallback(async (valor: string, silencioso = false) => {
    if (!isValidPhone(valor)) {
      setErro("Informe o celular com DDD no formato (41) 99999-9999.");
      setOrdens(null);
      return;
    }
    if (!silencioso) setCarregando(true);
    setErro(null);
    const timeout = setTimeout(() => setErro("A consulta está demorando mais que o normal."), 8000);
    try {
      const { data, error } = await supabase.functions.invoke("os-consulta", {
        body: { telefone: valor.replace(/\D/g, "") },
      });
      clearTimeout(timeout);
      if (error) {
        const detalhe = "context" in error ? await (error as any).context?.text?.() : "";
        let msg = "Não conseguimos consultar agora. Fale com o atendimento pelo WhatsApp.";
        try {
          const parsed = JSON.parse(detalhe || "{}");
          if (parsed?.message) msg = parsed.message;
        } catch { /* mantém mensagem padrão */ }
        setErro(msg);
        setOrdens(null);
        return;
      }
      const lista = (data?.ordens ?? []) as OrdemRemota[];
      setOrdens(lista);
      setAtualizadoEm(new Date().toISOString());
      ultimoTelefone.current = valor;
      if (!silencioso) {
        track("os_lookup_phone", { encontrou: lista.length > 0, quantidade: lista.length });
      }
    } catch {
      clearTimeout(timeout);
      setErro("Serviço temporariamente indisponível. Continue pelo WhatsApp que confirmamos sua etapa.");
      setOrdens(null);
    } finally {
      setCarregando(false);
    }
  }, []);

  // Atualização automática enquanto a consulta estiver aberta.
  useEffect(() => {
    if (!ordens?.length) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible" && ultimoTelefone.current) {
        consultar(ultimoTelefone.current, true);
      }
    }, POLL_MS);
    return () => window.clearInterval(id);
  }, [ordens, consultar]);

  const waFallback = whatsappLink(
    "Olá! Tentei consultar minha ordem de serviço pelo site com o meu celular e preciso saber a etapa atual.",
  );

  return (
    <section
      id="consulta-por-celular"
      className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm"
      aria-labelledby="consulta-celular-titulo"
    >
      <div className="flex items-start gap-3">
        <Smartphone className="h-5 w-5 shrink-0 text-primary mt-1" aria-hidden />
        <div>
          <h2 id="consulta-celular-titulo" className="text-xl font-bold text-foreground">
            Consultar pelo meu celular
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Digite o celular cadastrado no atendimento. Mostramos as ordens vinculadas com sintomas
            informados, fotos enviadas pelo portal, etapas concluídas e previsão de conclusão.
          </p>
        </div>
      </div>

      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          consultar(telefone);
        }}
      >
        <div className="flex-1">
          <Label htmlFor="os-telefone">Celular com DDD</Label>
          <Input
            id="os-telefone"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="(41) 99999-9999"
            value={telefone}
            onChange={(e) => setTelefone(maskPhone(e.target.value))}
            className="mt-1"
          />
        </div>
        <Button type="submit" disabled={carregando} className="sm:w-auto">
          {carregando ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {carregando ? "Consultando..." : "Consultar minhas OS"}
        </Button>
      </form>

      <p className="mt-2 text-xs text-muted-foreground">
        Consulta limitada por segurança: poucas tentativas por minuto e sem exibição de dados completos.
      </p>

      {erro ? (
        <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <p className="flex items-start gap-2 text-sm text-foreground">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden />
            {erro}
          </p>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => trackWaClick("status_os_fallback_erro")}
          >
            <a href={waFallback} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" aria-hidden /> Confirmar pelo WhatsApp
            </a>
          </Button>
        </div>
      ) : null}

      {ordens && ordens.length === 0 && !erro ? (
        <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          Nenhuma ordem localizada para esse celular. Confira se digitou o mesmo número usado no
          atendimento — se estiver correto, envie o número da OS pelo WhatsApp que confirmamos a etapa.
        </div>
      ) : null}

      {ordens?.length ? (
        <div className="mt-5 space-y-5">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
            Atualização automática ativa · última leitura {fmtDate(atualizadoEm)}
          </p>
          {ordens.map((os) => {
            const pct = progresso(os.etapas);
            const sla = slaInfo(os.previsao_conclusao);
            return (
              <article key={os.protocolo} className="rounded-xl border border-border bg-background p-4 sm:p-5">
                <header className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-mono text-base font-bold text-foreground">{os.protocolo}</h3>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {os.status}
                  </span>
                </header>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progresso do atendimento</span>
                    <span>{pct}%</span>
                  </div>
                  <div
                    className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Progresso da ordem ${os.protocolo}`}
                  >
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                {sla ? (
                  <p
                    className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
                      sla.tone === "atrasado"
                        ? "bg-destructive/10 text-destructive"
                        : sla.tone === "atencao"
                          ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                          : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Clock className="h-3.5 w-3.5" aria-hidden /> {sla.label}
                  </p>
                ) : null}

                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">Equipamento</dt>
                    <dd className="text-foreground">
                      {[os.equipamento, os.marca_modelo].filter(Boolean).join(" · ") || "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">Modalidade</dt>
                    <dd className="text-foreground">{os.modalidade || "—"}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">Sintomas informados</dt>
                    <dd className="text-foreground whitespace-pre-line">{os.sintomas || "—"}</dd>
                  </div>
                </dl>

                {os.fotos.length ? (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Fotos enviadas no portal</p>
                    <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {os.fotos.map((url, i) => (
                        <a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block overflow-hidden rounded-lg border border-border"
                        >
                          <img
                            src={url}
                            alt={`Foto ${i + 1} enviada na abertura da ordem ${os.protocolo}`}
                            loading="lazy"
                            decoding="async"
                            width={320}
                            height={240}
                            className="aspect-[4/3] w-full object-cover"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}

                {os.etapas.length ? (
                  <ol className="mt-4 space-y-2 border-l border-border pl-4">
                    {os.etapas.map((etapa, i) => (
                      <li key={`${os.protocolo}-${i}`} className="relative text-sm">
                        <span
                          className={`absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full ${
                            etapa.status === "concluida"
                              ? "bg-primary"
                              : etapa.status === "andamento"
                                ? "bg-amber-500"
                                : "bg-muted-foreground/40"
                          }`}
                          aria-hidden
                        />
                        <p className="font-medium text-foreground">{etapa.titulo}</p>
                        <p className="text-xs text-muted-foreground">
                          {etapa.em ? fmtDate(etapa.em) : etapa.prazo ? `Prazo: ${etapa.prazo}` : "Aguardando"}
                          {etapa.nota ? ` · ${etapa.nota}` : ""}
                        </p>
                      </li>
                    ))}
                  </ol>
                ) : null}

                {os.observacoes_publicas ? (
                  <p className="mt-4 rounded-lg bg-muted/50 p-3 text-sm text-foreground">{os.observacoes_publicas}</p>
                ) : null}

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => trackWaClick("status_os_falar_atendimento", { protocolo: os.protocolo })}
                >
                  <a
                    href={whatsappLink(`Olá! Quero falar sobre a ordem de serviço ${os.protocolo}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden /> Falar sobre esta OS
                  </a>
                </Button>
              </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
};

export default ConsultaOsPorCelular;
