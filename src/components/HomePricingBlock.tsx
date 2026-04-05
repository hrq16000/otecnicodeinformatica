import { Link } from "react-router-dom";
import { DollarSign, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const precos = [
  { servico: "Visita Técnica Presencial", valor: "R$ 99,99 / 30 min" },
  { servico: "Formatação Completa", valor: "A partir de R$ 150" },
  { servico: "Suporte Remoto", valor: "A partir de R$ 79,99" },
  { servico: "Remoção de Vírus", valor: "A partir de R$ 99,99" },
];

export const HomePricingBlock = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="bg-accent/10 rounded-full p-3 w-fit mx-auto mb-3">
              <DollarSign className="h-7 w-7 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
              Preços Transparentes e Sem Surpresas
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Valores claros desde o primeiro contato. Diagnóstico é pago — serviço só é executado com sua aprovação.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {precos.map((p, i) => (
              <div key={i} className="flex items-center justify-between bg-secondary rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{p.servico}</span>
                </div>
                <span className="text-sm font-bold text-accent whitespace-nowrap ml-2">{p.valor}</span>
              </div>
            ))}
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center mb-6">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Importante:</strong> Não existe orçamento sem compromisso presencial. 
              Estimativas gratuitas somente via WhatsApp. Diagnóstico presencial é pago e valores podem variar conforme complexidade.
            </p>
          </div>

          <div className="text-center">
            <Button variant="cta" size="lg" asChild>
              <Link to="/precos-e-politicas">
                Ver Tabela Completa de Preços
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
