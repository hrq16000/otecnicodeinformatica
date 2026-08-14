import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, Search, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  resolverComAmbiguidade,
  sugerir,
  type OpcaoClarificacao,
} from "@/lib/buscaInteligente";

/**
 * BUSCA DE SINTOMAS COM DESAMBIGUAÇÃO (/diagnostico-tecnico, Rodada 8B)
 *
 * O visitante descreve o problema com as palavras dele. Quando a descrição
 * admite mais de uma causa ("tela preta", "não liga", "barulho"), a interface
 * PERGUNTA antes de rotear — em vez de chutar um cluster e frustrar.
 *
 * Nenhuma rota é inventada: os destinos vêm do índice de intenções.
 */
export const BuscaSintomaInteligente = () => {
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState("");
  const [pergunta, setPergunta] = useState<string | null>(null);
  const [opcoes, setOpcoes] = useState<OpcaoClarificacao[]>([]);
  const sugestoes = useMemo(() => sugerir(consulta, 5), [consulta]);

  const medir = (evento: string, extra: Record<string, unknown>) => {
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", evento, {
      event_category: "engagement",
      click_location: "diagnostico_busca",
      page_path: window.location.pathname,
      ...extra,
    });
  };

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    // FASE 11 — somente dados categóricos. A frase digitada NUNCA é enviada.
    medir("diagnostic_search_start", { query_length: Math.min(consulta.trim().length, 120) });
    const r = resolverComAmbiguidade(consulta);
    if (r.tipo === "ambiguo") {
      setPergunta(r.pergunta);
      setOpcoes(r.opcoes);
      medir("diagnostic_search_result", {
        result_type: "ambiguous",
        options_count: r.opcoes.length,
        matched_category: r.opcoes[0]?.intencaoId ?? "nenhuma",
      });
      return;
    }
    setPergunta(null);
    setOpcoes([]);
    if (!r.intencaoId) {
      medir("diagnostic_no_result", { result_type: "fallback", result_slug: r.href });
    } else {
      medir("diagnostic_search_result", {
        result_type: "direct",
        result_slug: r.href,
        matched_category: r.intencaoId,
        confidence: r.confianca,
      });
    }
    navigate(r.href);
  };

  const escolher = (opcao: OpcaoClarificacao) => {
    medir("diagnostic_result_click", {
      result_type: "disambiguation",
      result_slug: opcao.href,
      matched_category: opcao.intencaoId,
    });
    navigate(opcao.href);
  };

  return (
    <section aria-labelledby="busca-sintoma-titulo" className="border-b border-border bg-muted/30 py-10">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 id="busca-sintoma-titulo" className="font-heading text-xl font-bold text-foreground sm:text-2xl">
          Descreva o que está acontecendo
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Escreva com suas palavras — "tela azul", "esquenta e desliga", "ta muito devagar".
          Levamos você direto para a página do sintoma certo.
        </p>

        <form onSubmit={enviar} role="search" className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="busca-sintoma" className="sr-only">
            Descreva o problema do seu equipamento
          </label>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="busca-sintoma"
              type="search"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder="Ex.: notebook liga mas a tela fica preta"
              className="h-12 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-base text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[hsl(var(--categoria))]"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[hsl(var(--categoria))] px-5 font-heading text-sm font-bold text-white motion-surface hover:brightness-110"
          >
            Diagnosticar meu problema <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>

        {pergunta && opcoes.length > 0 && (
          <div className="mt-5 rounded-xl border border-border bg-background p-4" role="group" aria-label="Confirmação do sintoma">
            <p className="flex items-start gap-2 font-heading text-sm font-semibold text-foreground">
              <HelpCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--categoria))]" aria-hidden="true" />
              {pergunta}
            </p>
            <ul className="mt-3 space-y-2">
              {opcoes.map((o) => (
                <li key={o.href}>
                  <button
                    type="button"
                    onClick={() => escolher(o)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5 text-left text-sm text-foreground motion-surface hover:border-[hsl(var(--categoria))] hover:bg-muted/50"
                  >
                    {o.label}
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!pergunta && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Sintomas mais buscados">
            {sugestoes.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => {
                    medir("diagnostic_result_click", {
                      result_type: "suggestion",
                      result_slug: s.href,
                      matched_category: s.id,
                    });
                    navigate(s.href);
                  }}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground motion-surface hover:border-[hsl(var(--categoria))] hover:text-foreground"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default BuscaSintomaInteligente;
