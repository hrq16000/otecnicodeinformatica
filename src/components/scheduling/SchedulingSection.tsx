import { useState } from "react";
import { CalendarDays, Clock, MapPin, CheckCircle, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SchedulingModal } from "./SchedulingModal";

export const SchedulingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const benefits = [
    { icon: Clock, text: "Atendimento no mesmo dia" },
    { icon: MapPin, text: "Técnico vai até você" },
    { icon: Shield, text: "Garantia em todos os serviços" },
    { icon: CheckCircle, text: "Orçamento sem compromisso" },
  ];

  const services = [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus",
    "Upgrade SSD e memória",
    "Instalação de rede WiFi",
    "Suporte técnico empresarial",
  ];

  return (
    <section 
      id="agendamento" 
      className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden mesh-gradient-warm noise-overlay"
      aria-labelledby="scheduling-title"
    >
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none orb-float" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none liquid-blob" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 shimmer-sweep float-badge">
              <CalendarDays className="h-4 w-4" />
              Agendamento Online
            </span>
            <h2 id="scheduling-title" className="text-3xl md:text-4xl font-bold text-foreground mb-4 reveal-text">
              Agende seu <span className="gradient-text">Atendimento Técnico</span> em Curitiba
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal-text" data-reveal-delay="100">
              Assistência técnica em informática a domicílio. Técnico de computador e notebook 
              com atendimento rápido em Curitiba e região metropolitana.
            </p>
            <div className="glow-separator max-w-xs mx-auto mt-5" />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left - Benefits & Services */}
            <div className="space-y-8">
              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 stagger-grid">
                {benefits.map((benefit, index) => (
                   <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border hover:border-accent/30 hover:-translate-y-1.5 hover:shadow-[var(--shadow-md)] transition-all duration-300 group card-shine hover-streak slide-up-stagger"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-accent/15 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative">
                      <benefit.icon className="h-5 w-5 text-primary group-hover:text-accent icon-bounce transition-colors duration-300" />
                      <div className="absolute inset-0 rounded-lg bg-accent/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </div>
                    <span className="font-medium text-foreground group-hover:text-accent transition-colors duration-200">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Services List */}
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  Serviços mais procurados em Curitiba:
                </h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {services.map((service, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 group-hover:text-accent transition-colors duration-200" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-4 p-4 bg-accent/10 rounded-xl hover:bg-accent/15 transition-colors duration-300 hover-streak">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent glow-pulse-text">4.9</div>
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">+347 avaliações</p>
                  <p className="text-sm text-muted-foreground">Nota máxima no Google</p>
                </div>
              </div>
            </div>

            {/* Right - CTA Card */}
            <div className="bg-background rounded-2xl border-2 border-primary/20 p-8 shadow-xl animated-border hover:shadow-[var(--shadow-xl)] transition-all duration-300 hover:-translate-y-1 glass-card">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full pulse-ring">
                  <CalendarDays className="h-8 w-8 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Agende Agora Online
                  </h3>
                  <p className="text-muted-foreground">
                    Escolha o serviço, data e horário. Confirmação imediata via WhatsApp.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full text-lg py-6 ring-pulse hover:scale-[1.03] transition-all duration-300 elastic-click hover-streak"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <CalendarDays className="mr-2 h-5 w-5" />
                    Agendar Atendimento
                  </Button>
                  
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    💰 <strong>Visita técnica:</strong> A partir de R$ 69,99
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Orçamento transparente • Sem surpresas • <a href="/valores" className="text-accent hover:underline underline-grow">Ver detalhes</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
              <strong>Técnico de informática em Curitiba</strong> com agendamento online fácil e rápido. 
              Atendemos <strong>conserto de notebook</strong>, <strong>formatação de computador</strong>, 
              <strong>manutenção de PC</strong> e muito mais. Cobertura em toda Curitiba, São José dos Pinhais, 
              Araucária, Campo Largo e Pinhais. <strong>Assistência técnica notebook perto de você</strong>.
            </p>
          </div>
        </div>
      </div>

      <SchedulingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
