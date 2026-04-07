import { 
  MapPin, 
  UserCheck, 
  FileText, 
  Receipt, 
  CreditCard,
  Shield
} from "lucide-react";

const trustItems = [
  {
    icon: MapPin,
    title: "Atendimento Local",
    description: "Presencial em toda Curitiba",
  },
  {
    icon: UserCheck,
    title: "Técnico Identificado",
    description: "Profissional de confiança",
  },
  {
    icon: FileText,
    title: "Garantia por Escrito",
    description: "Serviço com segurança",
  },
  {
    icon: Receipt,
    title: "Nota Fiscal",
    description: "Quando necessário",
  },
  {
    icon: CreditCard,
    title: "Pagamento Facilitado",
    description: "Diversas formas de pagamento",
  },
  {
    icon: Shield,
    title: "Sem Surpresas",
    description: "Orçamento antes de executar",
  },
];

export const TrustSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-card relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-green/3 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-3 neon-text">
            Por que escolher a gente?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-mono">
            Compromisso com qualidade e transparência
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="text-center bg-background/50 rounded-xl p-4 md:p-5 backdrop-blur-sm neon-border hover-lift"
              >
                <div className="inline-flex items-center justify-center bg-neon-green/10 rounded-full p-3 mb-3 group-hover:shadow-[0_0_20px_hsl(160_100%_45%/0.3)]">
                  <Icon className="h-5 w-5 md:h-6 md:w-6 text-neon-green" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-sm md:text-base mb-1">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm font-mono">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
