// @ts-nocheck
import { Truck, Clock, ShieldCheck, Store } from "lucide-react";
import {
  NOTA_VISITA_AVULSA,
  QUANDO_VISITA_COMPATIVEL,
  REGRA_CANCELAMENTO,
  VALOR_COLETA_MINIMO_LABEL,
} from "@/lib/precosConfig";

interface Pilar {
  icon: typeof Truck;
  titulo: string;
  texto: string;
}

const PILARES: Pilar[] = [
  {
    icon: Store,
    titulo: "Sem balcão de atendimento",
    texto:
      "Não temos loja aberta ao público. Todo o atendimento acontece por coleta e entrega no seu endereço ou por visita técnica agendada.",
  },
  {
    icon: Clock,
    titulo: "Visita técnica sem compromisso",
    texto: `${NOTA_VISITA_AVULSA} A visita cobre inspeção, diagnóstico, avaliação e tentativa de reparo rápido que seja compatível no local.`,
  },
  {
    icon: Truck,
    titulo: "Passou de 1 hora? A gente busca",
    texto:
      "Quando o serviço exige mais de 1 a 2 horas de bancada, a visita é convertida em coleta e entrega sem custo de deslocamento.",
  },
  {
    icon: ShieldCheck,
    titulo: `Mínimo pré-aprovado ${VALOR_COLETA_MINIMO_LABEL}`,
    texto: `Reparos compatíveis dentro de ${VALOR_COLETA_MINIMO_LABEL} já são executados sem custo adicional. Se o diagnóstico apontar valor acima disso, você é informado antes de qualquer execução.`,
  },
];

interface Props {
  /** Título opcional para adequar ao contexto da página. */
  titulo?: string;
  /** "section" = faixa full-width; "inline" = dentro de um container existente. */
  variant?: "section" | "inline";
  className?: string;
}

/**
 * Bloco padronizado de política de atendimento.
 * Fonte única de verdade: src/lib/precosConfig.ts.
 * Usado em páginas de serviço e nos clusters (problemas, equipamentos, soluções).
 */
export function PoliticaAtendimentoBloco({
  titulo = "Como funciona o atendimento",
  variant = "section",
  className = "",
}: Props) {
  const inline = variant === "inline";
  return (
    <section
      id="politica-atendimento"
      aria-label="Política de atendimento, coleta e valores"
      className={
        inline
          ? `scroll-mt-24 mt-12 rounded-2xl border border-border bg-secondary p-6 md:p-8 ${className}`
          : `scroll-mt-24 border-y border-border bg-secondary py-14 md:py-16 ${className}`
      }
    >
      <div className={inline ? "" : "container mx-auto px-4"}>
        <div className={inline ? "" : "mx-auto max-w-4xl"}>
          <h2 className="mb-3 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {titulo}
          </h2>
          <p className="mb-8 text-muted-foreground">
            Não pode trazer o equipamento? A gente busca. {QUANDO_VISITA_COMPATIVEL}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {PILARES.map((p) => (
              <div
                key={p.titulo}
                className="rounded-xl border border-border bg-background p-5"
              >
                <p.icon className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="font-bold text-foreground">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.texto}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            {REGRA_CANCELAMENTO} Peças não estão inclusas nos valores de visita ou
            diagnóstico. Condições completas em{" "}
            <a href="/precos-e-politicas" className="underline underline-offset-2">
              preços e políticas
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export default PoliticaAtendimentoBloco;
