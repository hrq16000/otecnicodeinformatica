import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, DollarSign, Wrench, Search, Truck, AlertTriangle, Monitor } from "lucide-react";

const links = [
  {
    icon: HelpCircle,
    title: "Como Funciona",
    desc: "Passo a passo do atendimento técnico",
    to: "/como-funciona",
  },
  {
    icon: DollarSign,
    title: "Preços e Políticas",
    desc: "Tabela completa de valores e condições",
    to: "/precos-e-politicas",
  },
  {
    icon: Search,
    title: "Diagnóstico Técnico",
    desc: "Por que o diagnóstico profissional é essencial",
    to: "/diagnostico-tecnico",
  },
  {
    icon: Wrench,
    title: "Todos os Serviços",
    desc: "Conheça todos os serviços disponíveis",
    to: "/servicos",
  },
  {
    icon: Monitor,
    title: "Equipamentos",
    desc: "Veja os equipamentos que atendemos",
    to: "/equipamentos-atendidos",
  },
  {
    icon: AlertTriangle,
    title: "Casos Reais",
    desc: "Exemplos reais de problemas e soluções",
    to: "/problemas-reais-e-casos",
  },
  {
    icon: Truck,
    title: "Coleta e Entrega",
    desc: "Serviço de logística para equipamentos",
    to: "/coleta-e-entrega",
  },
];

export const InterlinkingBlock = () => {
  return (
    <section className="py-10 md:py-14 bg-secondary">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-6 text-center">
            Entenda Mais Sobre Nosso Atendimento
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {links.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  to={item.to}
                  className="bg-background rounded-xl p-4 text-center hover:shadow-md hover:border-accent/20 border border-transparent transition-all group"
                >
                  <div className="bg-primary rounded-lg p-2 w-fit mx-auto mb-2">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-primary text-sm group-hover:text-accent transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground hidden md:block">{item.desc}</p>
                  <ArrowRight className="h-3 w-3 text-accent mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
