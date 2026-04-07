import { 
  MapPin, UserCheck, FileText, Receipt, CreditCard, Shield
} from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const trustItems = [
  { icon: MapPin, title: "Atendimento Local", description: "Presencial em toda Curitiba" },
  { icon: UserCheck, title: "Técnico Identificado", description: "Profissional de confiança" },
  { icon: FileText, title: "Garantia por Escrito", description: "Serviço com segurança" },
  { icon: Receipt, title: "Nota Fiscal", description: "Quando necessário" },
  { icon: CreditCard, title: "Pagamento Facilitado", description: "Diversas formas de pagamento" },
  { icon: Shield, title: "Sem Surpresas", description: "Orçamento antes de executar" },
];

const stats = [
  { value: 5000, suffix: "+", label: "Clientes atendidos" },
  { value: 20, suffix: "+", label: "Anos de experiência" },
  { value: 98, suffix: "%", label: "Satisfação" },
];

export const TrustSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-primary relative overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(0 0% 100% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.1) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <div className="container mx-auto relative z-10">
        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-10 md:mb-14">
          {stats.map((stat, i) => (
            <div key={i} className="text-center anim-scale" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="text-3xl md:text-4xl font-heading font-bold text-white">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/60 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

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
                className="text-center glass-dark rounded-xl p-4 md:p-5 hover-lift hover:glow-accent anim-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="inline-flex items-center justify-center bg-accent rounded-full p-3 mb-3 hover-scale">
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
