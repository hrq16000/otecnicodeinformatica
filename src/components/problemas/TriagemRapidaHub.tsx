import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TriagemContexto } from "@/components/problemas/TriagemContexto";
import {
  buildProblemaWaHref,
  rotuloEvento,
  type ContextoTriagem,
} from "@/lib/problemasWaTemplates";
import { useScrollBucket } from "@/hooks/useScrollBucket";
import { useVarianteWa } from "@/lib/problemasWaVariants";
import { trackWaClick } from "@/lib/funnelAnalytics";
import { trackCTAClick } from "@/lib/analytics";

export interface OpcaoSintoma {
  path: string;
  titulo: string;
  /** Mensagem base já contextualizada com o sintoma. */
  waMessage: string;
}

/**
 * Triagem rápida do hub /problemas: o visitante escolhe o sintoma e recebe
 * (a) o caminho para a página certa e (b) um link de WhatsApp com mensagem
 * pré-preenchida e UTM/origem específicos da rota e da pergunta escolhida.
 */
export function TriagemRapidaHub({ opcoes }: { opcoes: OpcaoSintoma[] }) {
  const [selecionado, setSelecionado] = useState(opcoes[0]?.path ?? "");
  const [contexto, setContexto] = useState<ContextoTriagem>({});
  const rolagem = useScrollBucket();
  const variante = useVarianteWa();

  const opcao = useMemo(
    () => opcoes.find((o) => o.path === selecionado) ?? opcoes[0],
    [opcoes, selecionado],
  );

  if (!opcao) return null;

  const sintoma = opcao.path.replace("/problemas/", "");
  const ctx = {
    ...contexto,
    sintoma,
    secao: "hub_triagem",
    rolagem,
    variante,
    complemento: opcao.titulo,
  };

  const registrarWa = () => {
    const rotulo = rotuloEvento(ctx);
    trackCTAClick("whatsapp", rotulo);
    trackWaClick(rotulo, {
      variant: `msg_${variante}`,
      servico: sintoma,
      cta_position: "problema_hub_triagem",
      utm_medium: "cta",
      bairro: contexto.bairro ?? null,
    });
  };

  return (
    <section
      aria-labelledby="triagem-hub"
      className="mt-10 rounded-2xl border border-border bg-card p-6 animate-fade-in"
    >
      <h2 id="triagem-hub" className="font-heading text-2xl font-bold text-foreground">
        Triagem rápida em 30 segundos
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Escolha o sintoma mais próximo do seu caso. Levamos você à página certa e deixamos a
        mensagem do WhatsApp pronta, com equipamento, bairro e urgência já preenchidos.
      </p>

      <div className="mt-4">
        <label
          htmlFor="triagem-sintoma"
          className="text-xs font-bold uppercase tracking-wide text-muted-foreground"
        >
          Qual é o sintoma?
        </label>
        <select
          id="triagem-sintoma"
          value={selecionado}
          onChange={(e) => setSelecionado(e.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {opcoes.map((o) => (
            <option key={o.path} value={o.path}>
              {o.titulo}
            </option>
          ))}
        </select>
      </div>

      <TriagemContexto
        valor={contexto}
        onChange={setContexto}
        titulo="Complete os dados do atendimento"
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="transition-transform duration-200 hover:-translate-y-0.5">
          <a
            href={buildProblemaWaHref(opcao.waMessage, ctx)}
            onClick={registrarWa}
            rel="noopener noreferrer"
            target="_blank"
          >
            <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
            Enviar no WhatsApp com meus dados
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to={opcao.path}>
            Ler a página deste sintoma
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default TriagemRapidaHub;
