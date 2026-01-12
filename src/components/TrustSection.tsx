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
    <section className="py-12 md:py-16 lg:py-20 bg-primary">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-3">
            Por que escolher a gente?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Compromisso com qualidade e transparência
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="text-center bg-white/10 rounded-xl p-4 md:p-5 backdrop-blur-sm hover:bg-white/15 transition-colors"
              >
                <div className="inline-flex items-center justify-center bg-accent rounded-full p-3 mb-3">
                  <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-white text-sm md:text-base mb-1">
                  {item.title}
                </h3>
                <p className="text-white/70 text-xs md:text-sm">
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
