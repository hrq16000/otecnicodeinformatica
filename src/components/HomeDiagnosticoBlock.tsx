import { Link } from "react-router-dom";
import { Search, AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const pontos = [
  {
    icon: Search,
    title: "Diagnóstico ≠ Execução",
    desc: "O diagnóstico identifica o problema. A execução do reparo só acontece com sua aprovação prévia.",
  },
  {
    icon: AlertTriangle,
    title: "Por Que o Diagnóstico é Pago",
    desc: "Envolve tempo, conhecimento técnico e ferramentas profissionais. Diagnosticar corretamente evita prejuízos maiores.",
  },
  {
    icon: ShieldCheck,
    title: "Risco de Não Diagnosticar",
    desc: "Problemas simples podem esconder falhas graves. Sem diagnóstico profissional, o risco de danos irreversíveis aumenta.",
  },
];

export const HomeDiagnosticoBlock = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
              Diagnóstico Técnico Profissional
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Entenda por que um diagnóstico correto é a etapa mais importante de qualquer reparo — e por que ele tem custo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {pontos.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="bg-background rounded-xl p-5 border border-transparent hover:border-accent/15 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 group">
                  <div className="bg-primary rounded-lg p-2 w-fit mb-3 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-200">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button variant="outline" className="hover:scale-[1.03] transition-transform duration-200" asChild>
              <Link to="/como-funciona">
                Entender o Processo Completo
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
