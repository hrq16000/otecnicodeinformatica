import { BadgeCheck, MessageCircle, ShieldCheck, Wrench } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Rodada 3P — faixa de confiança compacta.
 * Só reafirma compromissos já publicados no site (atuação desde
 * {foundedYear}, aprovação prévia do valor, garantia registrada e contato
 * exclusivo por WhatsApp). Não cria promessa de prazo, avaliação ou preço.
 */
const ITENS = [
  {
    icon: BadgeCheck,
    titulo: `Atuação em informática desde ${siteConfig.foundedYear}`,
    desc: "Atendimento em Curitiba e Região Metropolitana.",
  },
  {
    icon: Wrench,
    titulo: "Valor aprovado antes do serviço",
    desc: "Nada é executado sem sua autorização explícita.",
  },
  {
    icon: ShieldCheck,
    titulo: "Garantia registrada na ordem de serviço",
    desc: "Escopo, peças e condições ficam documentados.",
  },
  {
    icon: MessageCircle,
    titulo: "Contato direto pelo WhatsApp",
    desc: "Triagem feita pelo próprio técnico responsável.",
  },
];

export const TrustStrip = ({ className = "" }: { className?: string }) => (
  <section aria-label="Compromissos do atendimento" className={`bg-secondary py-8 ${className}`}>
    <div className="container mx-auto px-4">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITENS.map((item) => (
          <li
            key={item.titulo}
            className="flex gap-3 rounded-xl border border-border bg-background p-4"
          >
            <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--accent))]" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-foreground">{item.titulo}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default TrustStrip;
