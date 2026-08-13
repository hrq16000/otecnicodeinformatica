// @ts-nocheck
import { whatsappLink } from "@/lib/siteConfig";

const track = (loc: string) =>
  import("@/lib/analytics").then(({ trackCTAClick }) => trackCTAClick("whatsapp", loc));

const etapas = [
  {
    n: "1",
    t: "Você descreve o problema",
    d: "Uma mensagem no WhatsApp com o equipamento e o que está acontecendo. Sem formulário longo e sem cadastro.",
  },
  {
    n: "2",
    t: "Triagem técnica",
    d: "Perguntas objetivas para separar o que se resolve remoto, o que pede visita e o que exige bancada. Aqui já dizemos o que não é viável.",
  },
  {
    n: "3",
    t: "Diagnóstico, escopo e valor",
    d: "Você recebe a causa provável, o que será feito, o prazo estimado e o valor aplicável — incluindo o que fica de fora, como peças e licenças.",
  },
  {
    n: "4",
    t: "Execução após sua aprovação",
    d: "Remoto para software, visita para rede e instalação, bancada para reparo físico — com coleta e entrega quando a modalidade prevê. Nada acontece antes do seu sim.",
  },
];

/**
 * Fluxo de atendimento orientado a conversão (WhatsApp → triagem → diagnóstico
 * → remoto / no local / bancada). Nenhum endereço exibido.
 */
export const AtendimentoFluxoSection = () => (
  <section className="py-14 md:py-18" aria-labelledby="fluxo-atendimento-title">
    <div className="container mx-auto">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">Passo a passo</span>
        <h2 id="fluxo-atendimento-title" className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Como funciona, do primeiro contato à entrega
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Quatro etapas previsíveis. Você sabe o que acontece em cada uma e decide antes da execução.
        </p>
      </div>

      <ol className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
        {etapas.map((e) => (
          <li key={e.n} className="flex gap-4 rounded-xl border border-border bg-card p-5">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {e.n}
            </span>
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">{e.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.d}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-8 max-w-4xl rounded-xl border border-border bg-secondary p-5 text-center">
        <p className="text-sm text-muted-foreground">
          Não sabe qual modalidade serve para o seu caso? A triagem define isso com você — e o valor
          aparece antes da aprovação, nunca depois.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink("Olá! Quero iniciar a triagem do meu equipamento.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("fluxo_atendimento_cta")}
            data-cta-location="fluxo_atendimento_cta"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-bold text-accent-foreground transition-transform hover:scale-[1.02]"
          >
            Solicitar diagnóstico
          </a>
          <a
            href="/como-funciona"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Ver o processo em detalhe
          </a>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Antes de agendar, confira os{" "}
          <a href="/termos-e-condicoes" className="underline underline-offset-2 hover:text-foreground">
            termos, condições, valores e prazos
          </a>
          .
        </p>
      </div>
    </div>
  </section>
);

export default AtendimentoFluxoSection;
