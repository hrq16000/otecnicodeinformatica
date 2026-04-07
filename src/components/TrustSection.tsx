import { 
  MapPin, UserCheck, FileText, Receipt, CreditCard, Shield
} from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { FloatingParticles } from "@/components/FloatingParticles";

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
    <section className="py-14 md:py-18 lg:py-24 premium-gradient relative overflow-hidden">
      {/* Floating particles */}
      <FloatingParticles count={20} />
      {/* Elegant ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 mb-12 md:mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center" style={{ animationDelay: `${i * 120}ms` }}>
              <div className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/50 text-sm mt-1.5 tracking-wide uppercase text-[11px] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-3 tracking-tight">
            Por que escolher a gente?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Compromisso com qualidade e transparência
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="text-center bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-xl p-4 md:p-5 hover:bg-white/[0.12] hover:border-white/[0.18] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="inline-flex items-center justify-center bg-accent/90 rounded-xl p-2.5 mb-3 shadow-sm">
                  <Icon className="h-5 w-5 md:h-5 md:w-5 text-white" />
                </div>
                <h3 className="font-heading font-bold text-white text-sm md:text-[15px] mb-1">
                  {item.title}
                </h3>
                <p className="text-white/55 text-xs md:text-[13px] leading-relaxed">
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
