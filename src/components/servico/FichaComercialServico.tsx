import { CalendarClock, CheckCircle2, CircleAlert, Info, MessageCircle, Wallet, XCircle } from "lucide-react";
import {
  AGENDAMENTO_ANCORA,
  FICHA_ANCORA,
  fichaComercialDoServico,
} from "@/lib/fichaComercial";
import { TERMOS_URL } from "@/lib/precosConfig";
import { whatsappLink } from "@/lib/siteConfig";

/**
 * Rodada 4C — ficha comercial padronizada das páginas de serviço.
 * Camada de apresentação puramente aditiva: mostra sempre os mesmos campos
 * obrigatórios (valor inicial, tempo estimado, incluso, não incluso,
 * acréscimos, observações, limitações) e o caminho de agendamento.
 * Todos os valores vêm de `precosConfig` via `fichaComercial`.
 */

const Lista = ({
  titulo,
  itens,
  Icone,
  tom,
}: {
  titulo: string;
  itens: string[];
  Icone: typeof CheckCircle2;
  tom: string;
}) => (
  <div className="rounded-xl border border-border bg-card p-5">
    <p className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-foreground">
      <Icone className={`h-4 w-4 ${tom}`} aria-hidden="true" />
      {titulo}
    </p>
    <ul className="mt-3 space-y-2">
      {itens.map((item) => (
        <li key={item} className="text-sm leading-relaxed text-muted-foreground">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export const FichaComercialServico = ({
  slug,
  nome,
}: {
  slug: string;
  nome: string;
}) => {
  const ficha = fichaComercialDoServico(slug);
  if (!ficha) return null;

  const mensagem = `Olá! Quero agendar atendimento de ${nome} (origem: /servicos/${slug}). Pode confirmar as condições e o próximo passo?`;

  return (
    <section
      id={FICHA_ANCORA}
      className="scroll-mt-24 border-t border-border bg-secondary py-14 md:py-16"
      aria-labelledby="ficha-comercial-titulo"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h2
            id="ficha-comercial-titulo"
            className="font-heading text-2xl font-bold text-foreground md:text-3xl"
          >
            Condições do atendimento de {nome.toLowerCase()}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Os mesmos campos aparecem em todas as páginas de serviço, com os mesmos
            valores. Nada de preço diferente por página.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <Wallet className="h-4 w-4 text-primary" aria-hidden="true" />
                Valor inicial
              </p>
              <p className="mt-2 font-heading text-xl font-bold text-foreground">
                {ficha.valorInicialLabel}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {ficha.valorInicialNota}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <CalendarClock className="h-4 w-4 text-primary" aria-hidden="true" />
                Tempo estimado
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {ficha.tempoEstimado}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Lista titulo="O que está incluso" itens={ficha.incluso} Icone={CheckCircle2} tom="text-primary" />
            <Lista titulo="O que não está incluso" itens={ficha.naoIncluso} Icone={XCircle} tom="text-muted-foreground" />
            <Lista titulo="Acréscimos" itens={ficha.acrescimos} Icone={Info} tom="text-primary" />
            <Lista titulo="Limitações" itens={ficha.limitacoes} Icone={CircleAlert} tom="text-muted-foreground" />
          </div>

          <div className="mt-4 rounded-xl border border-border bg-card p-5">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-foreground">
              Observações
            </p>
            <ul className="mt-3 space-y-2">
              {ficha.observacoes.map((o) => (
                <li key={o} className="text-sm leading-relaxed text-muted-foreground">
                  {o}
                </li>
              ))}
            </ul>
            <a href={TERMOS_URL} className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-2">
              Ver condições completas
            </a>
          </div>

          <div
            id={AGENDAMENTO_ANCORA}
            className="mt-6 scroll-mt-24 rounded-2xl border border-border bg-card p-6"
          >
            <p className="font-heading text-lg font-bold text-foreground">Agendamento</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Envie o modelo do equipamento, o sintoma e o bairro. A triagem confirma a
              rota ({ficha.rota === "coleta" ? "coleta e entrega" : "visita técnica"}), as
              condições e o horário antes de qualquer deslocamento.
            </p>
            <a
              href={whatsappLink(mensagem)}
              target="_blank"
              rel="noopener noreferrer"
              data-wa-medium="ficha"
              data-wa-source="ficha_comercial"
              data-cta-location="ficha-comercial-agendamento"
              className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[hsl(var(--accent))] px-6 text-base font-bold text-accent-foreground motion-surface hover:shadow-[0_18px_40px_-12px_hsl(var(--accent)/0.55)]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Agendar pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FichaComercialServico;
