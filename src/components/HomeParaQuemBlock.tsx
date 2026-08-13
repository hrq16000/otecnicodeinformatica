import { User, Building2, Home, Briefcase, GraduationCap, Users } from "lucide-react";

const perfis = [
  { icon: Home, titulo: "Usuários Domésticos", desc: "Computador lento, vírus, formatação, configuração de internet e impressoras. Resolvemos no conforto da sua casa." },
  { icon: Briefcase, titulo: "Profissionais e Autônomos", desc: "Equipamento é sua ferramenta de trabalho? Atendimento prioritário para minimizar tempo parado." },
  { icon: Building2, titulo: "Pequenas Empresas", desc: "Suporte técnico sob demanda, redes, servidores e manutenção preventiva sem contrato fixo." },
  { icon: GraduationCap, titulo: "Estudantes", desc: "Notebook para estudos precisa funcionar. Formatação, upgrade de SSD e memória com preço justo." },
  { icon: Users, titulo: "Idosos e Iniciantes", desc: "Atendimento paciente e didático. Explicamos tudo de forma simples, sem jargão técnico." },
  { icon: User, titulo: "Gamers e Entusiastas", desc: "Montagem de PC, upgrade de hardware, configuração de performance e resolução de gargalos." },
];

export const HomeParaQuemBlock = () => {
  return (
    <section className="py-12 md:py-16 bg-background relative overflow-hidden noise-overlay">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none morph-blob" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/4 rounded-full blur-3xl pointer-events-none orb-float" />
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3 reveal-text">
              Para Quem é Nosso <span className="gradient-text">Atendimento</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto reveal-text" data-reveal-delay="100">
              Atendemos desde o usuário doméstico até empresas. Cada perfil recebe um atendimento adaptado às suas necessidades reais.
            </p>
            <div className="glow-separator max-w-xs mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {perfis.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="bg-secondary rounded-xl p-4 md:p-5 hover:shadow-[var(--shadow-lg)] hover:-translate-y-2 hover:scale-[1.04] transition-all duration-300 border border-transparent hover:border-accent/20 group hover-streak animated-border slide-up-stagger" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="bg-accent/10 rounded-lg p-2 w-fit mb-3 group-hover:bg-accent/20 group-hover:rotate-3 transition-all duration-300 relative">
                    <Icon className="h-5 w-5 text-accent icon-bounce" />
                    <div className="absolute inset-0 rounded-lg bg-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </div>
                  <h3 className="font-bold text-primary text-sm mb-1 group-hover:text-accent transition-colors">{p.titulo}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
