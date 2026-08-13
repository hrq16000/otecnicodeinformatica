// @ts-nocheck
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import {
  ESTADO_FUNIL4_INICIAL,
  EQUIPAMENTOS_FUNIL,
  MODALIDADES_FUNIL,
  PASSOS_FUNIL4,
  filtrarSintomasFunil,
  getModalidade,
  montarMensagemFunil4,
  ordenarEquipamentos,
  passoValido,
  type EstadoFunil4,
} from "@/lib/funil4";
import {
  calcularDeslocamento,
  deslocamentoConfig,
  formatarBRL,
} from "@/lib/deslocamentoConfig";
import { whatsappLinkComContexto } from "@/lib/waContextLink";
import { trackCTAClick } from "@/lib/analytics";

/**
 * ETAPA 4 — funil inteligente em 4 etapas.
 *
 * Uma pergunta por vez, na linguagem do cliente, com o custo de deslocamento
 * mostrado ANTES da confirmação. O envio final usa `data-funnel-skip` porque
 * a triagem já foi feita aqui — não faz sentido reabrir o funil global.
 */

const track = (evento: string, extra: Record<string, string> = {}) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "funil4_etapa", {
    event_category: "engagement",
    click_location: evento,
    page_path: window.location.pathname,
    ...extra,
  });
};

type Props = {
  /** Superfície de origem, para leitura de conversão. */
  origem?: string;
  className?: string;
};

export const FunilQuatroEtapas = ({ origem = "funil4", className = "" }: Props) => {
  const [passo, setPasso] = useState(0);
  const [estado, setEstado] = useState<EstadoFunil4>(ESTADO_FUNIL4_INICIAL);

  const set = (patch: Partial<EstadoFunil4>) => setEstado((e) => ({ ...e, ...patch }));

  const sugestoes = useMemo(
    () => filtrarSintomasFunil(estado.descricaoLivre),
    [estado.descricaoLivre],
  );
  const equipamentos = useMemo(
    () => (estado.sintomaId ? ordenarEquipamentos(estado.sintomaId) : EQUIPAMENTOS_FUNIL),
    [estado.sintomaId],
  );

  const modalidade = estado.modalidadeId ? getModalidade(estado.modalidadeId) : undefined;
  const distancia = Number(estado.distanciaKm.replace(",", "."));
  const custo = useMemo(
    () => (modalidade?.temDeslocamento ? calcularDeslocamento(distancia) : null),
    [modalidade, distancia],
  );
  const custoTexto = custo
    ? custo.dentroDoRaio
      ? "sem custo adicional (dentro do raio livre)"
      : `${formatarBRL(custo.valor)} (${custo.kmExcedentes} km além do raio livre)`
    : undefined;

  const podeAvancar = passoValido(passo, estado);
  const ultimo = passo === PASSOS_FUNIL4.length - 1;

  const avancar = () => {
    if (!podeAvancar) return;
    track(`avancar_${PASSOS_FUNIL4[passo].id}`);
    setPasso((p) => Math.min(p + 1, PASSOS_FUNIL4.length - 1));
  };

  const href = whatsappLinkComContexto(montarMensagemFunil4(estado, custoTexto), {
    medium: "funil4",
    servico: estado.sintomaId || "triagem",
    posicao: origem,
    etapa: "triagem",
  });

  const campo =
    "min-h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <section
      className={`rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-lg)] md:p-8 ${className}`}
      aria-label="Funil de atendimento em quatro etapas"
    >
      {/* Progresso */}
      <ol className="flex flex-wrap items-center gap-2" aria-label="Etapas do atendimento">
        {PASSOS_FUNIL4.map((p, i) => (
          <li key={p.id} className="flex items-center gap-2">
            <span
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full font-heading text-xs font-bold ${
                i < passo
                  ? "bg-accent text-accent-foreground"
                  : i === passo
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground"
              }`}
              aria-current={i === passo ? "step" : undefined}
            >
              {i < passo ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
            </span>
            <span
              className={`text-xs font-medium ${i === passo ? "text-foreground" : "text-muted-foreground"}`}
            >
              {p.titulo}
            </span>
            {i < PASSOS_FUNIL4.length - 1 && (
              <span className="hidden h-px w-6 bg-border sm:block" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>

      <h2 className="mt-6 font-heading text-2xl font-bold text-foreground md:text-3xl">
        {PASSOS_FUNIL4[passo].titulo}
      </h2>

      {/* 1 — Sintoma */}
      {passo === 0 && (
        <div className="mt-5 space-y-4">
          <label htmlFor="funil4-descricao" className="block text-sm font-medium text-foreground">
            Conte com suas palavras o que está acontecendo
          </label>
          <textarea
            id="funil4-descricao"
            rows={3}
            value={estado.descricaoLivre}
            onChange={(e) => set({ descricaoLivre: e.target.value })}
            placeholder="Ex.: liga, mas trava depois de alguns minutos e esquenta muito"
            className="w-full rounded-xl border border-border bg-background p-4 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <ul className="flex flex-wrap gap-2">
            {sugestoes.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => set({ sintomaId: s.id, modalidadeId: s.modalidadeSugerida })}
                  aria-pressed={estado.sintomaId === s.id}
                  className={`inline-flex min-h-11 items-center rounded-full border px-4 text-[13px] font-medium transition-colors ${
                    estado.sintomaId === s.id
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-background text-foreground hover:border-accent"
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 2 — Equipamento */}
      {passo === 1 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {equipamentos.map((eq) => (
            <button
              key={eq.id}
              type="button"
              onClick={() => set({ equipamentoId: eq.id })}
              aria-pressed={estado.equipamentoId === eq.id}
              className={`min-h-12 rounded-xl border px-4 text-left font-heading text-base font-semibold transition-colors ${
                estado.equipamentoId === eq.id
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-foreground hover:border-accent"
              }`}
            >
              {eq.label}
            </button>
          ))}
        </div>
      )}

      {/* 3 — Modalidade */}
      {passo === 2 && (
        <div className="mt-5 space-y-3">
          {MODALIDADES_FUNIL.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => set({ modalidadeId: m.id })}
              aria-pressed={estado.modalidadeId === m.id}
              className={`block w-full rounded-2xl border p-4 text-left transition-colors ${
                estado.modalidadeId === m.id
                  ? "border-accent bg-accent/5"
                  : "border-border bg-background hover:border-accent"
              }`}
            >
              <span className="font-heading text-base font-bold text-foreground">{m.titulo}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                {m.descricao}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* 4 — Conversão */}
      {passo === 3 && (
        <div className="mt-5 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="funil4-nome" className="block text-sm font-medium text-foreground">
                Como podemos te chamar?
              </label>
              <input
                id="funil4-nome"
                value={estado.nome}
                onChange={(e) => set({ nome: e.target.value })}
                autoComplete="given-name"
                className={`mt-1 ${campo}`}
              />
            </div>
            <div>
              <label htmlFor="funil4-cidade" className="block text-sm font-medium text-foreground">
                Cidade
              </label>
              <input
                id="funil4-cidade"
                value={estado.cidade}
                onChange={(e) => set({ cidade: e.target.value })}
                autoComplete="address-level2"
                className={`mt-1 ${campo}`}
              />
            </div>
            <div>
              <label htmlFor="funil4-bairro" className="block text-sm font-medium text-foreground">
                Bairro <span className="text-muted-foreground">(opcional)</span>
              </label>
              <input
                id="funil4-bairro"
                value={estado.bairro}
                onChange={(e) => set({ bairro: e.target.value })}
                autoComplete="address-level3"
                className={`mt-1 ${campo}`}
              />
            </div>
            {modalidade?.temDeslocamento && (
              <div>
                <label htmlFor="funil4-km" className="block text-sm font-medium text-foreground">
                  Distância aproximada (km)
                </label>
                <input
                  id="funil4-km"
                  inputMode="decimal"
                  value={estado.distanciaKm}
                  onChange={(e) => set({ distanciaKm: e.target.value })}
                  placeholder="Ex.: 18"
                  className={`mt-1 ${campo}`}
                />
              </div>
            )}
          </div>

          {custo && (
            <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
              <p className="font-heading text-sm font-bold text-foreground">
                Deslocamento estimado: {custoTexto}
              </p>
              <p className="mt-2">
                Até {deslocamentoConfig.raioLivreKm} km não há adicional. Acima disso,{" "}
                {formatarBRL(deslocamentoConfig.valorPorKm)} por km excedente.{" "}
                {deslocamentoConfig.baseCalculo}
              </p>
            </div>
          )}

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-funnel-skip="1"
            data-cta-location="funil4_conversao"
            aria-disabled={!podeAvancar}
            onClick={(e) => {
              if (!podeAvancar) {
                e.preventDefault();
                return;
              }
              trackCTAClick("whatsapp", "funil4_conversao");
              track("conversao", { modalidade: estado.modalidadeId || "indefinida" });
            }}
            className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 font-heading text-base font-bold text-accent-foreground transition-transform ${
              podeAvancar ? "hover:scale-[1.01]" : "pointer-events-none opacity-50"
            }`}
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Enviar meu atendimento
          </a>
        </div>
      )}

      {/* Navegação */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setPasso((p) => Math.max(0, p - 1))}
          disabled={passo === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 font-heading text-sm font-semibold text-foreground disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar
        </button>
        {!ultimo && (
          <button
            type="button"
            onClick={avancar}
            disabled={!podeAvancar}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-foreground px-5 font-heading text-sm font-bold text-background disabled:opacity-40"
          >
            Continuar
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
};

export default FunilQuatroEtapas;
