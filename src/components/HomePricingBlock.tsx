import { Link } from "react-router-dom";
import { DollarSign, Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const precos = [
  { servico: "Visita Técnica", valor: "A partir de R$ 69,99" },
  { servico: "Formatação Completa", valor: "A partir de R$ 150" },
  { servico: "Suporte Remoto", valor: "A partir de R$ 79,99" },
  { servico: "Remoção de Vírus", valor: "A partir de R$ 99,99" },
];

export const HomePricingBlock = () => {
  return (
    <section className="py-12 md:py-16 bg-background relative overflow-hidden spotlight-sweep">
      <div className="absolute -top-20 right-0 w-[350px] h-[350px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="bg-accent/10 rounded-full p-3 w-fit mx-auto mb-3 shimmer">
              <DollarSign className="h-7 w-7 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3 reveal-text neon-accent">
              Preços Transparentes e Sem Surpresas
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto reveal-text" data-reveal-delay="100">
              Valores claros desde o primeiro contato. Diagnóstico é pago — serviço só é executado com sua aprovação.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {precos.map((p, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between glass-card gradient-border rounded-xl p-4 hover:shadow-[var(--shadow-md)] hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 group card-shine stagger-item"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="bg-accent/10 rounded-full p-1 group-hover:bg-accent/20 transition-colors duration-300">
                    <Check className="h-4 w-4 text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{p.servico}</span>
                </div>
                <span className="text-sm font-bold text-accent whitespace-nowrap ml-2">{p.valor}</span>
              </div>
            ))}
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center mb-6 hover:border-accent/30 transition-colors duration-300">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-accent flex-shrink-0" />
              <span>
                <strong className="text-foreground">Importante:</strong> Não existe orçamento sem compromisso presencial. 
                Estimativas gratuitas somente via WhatsApp. Diagnóstico presencial é pago e valores podem variar conforme complexidade.
              </span>
            </p>
          </div>

          <div className="text-center">
            <Button variant="cta" size="lg" className="hover:scale-[1.03] hover:shadow-[var(--shadow-accent)] transition-all duration-300" asChild>
              <Link to="/valores">
                Ver Tabela Completa de Valores
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
