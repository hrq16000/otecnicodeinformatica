import { useState } from "react";
import { CalendarDays, Clock, MapPin, CheckCircle, Phone, Shield, Star } from "lucide-react";
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
      className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5"
      aria-labelledby="scheduling-title"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CalendarDays className="h-4 w-4" />
              Agendamento Online
            </span>
            <h2 id="scheduling-title" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Agende seu <span className="text-primary">Atendimento Técnico</span> em Curitiba
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Assistência técnica em informática a domicílio. Técnico de computador e notebook 
              com atendimento rápido em Curitiba e região metropolitana.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left - Benefits & Services */}
            <div className="space-y-8">
              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{benefit.text}</span>
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
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-4 p-4 bg-accent/10 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">4.9</div>
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
            <div className="bg-background rounded-2xl border-2 border-primary/20 p-8 shadow-xl">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
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
                    className="w-full text-lg py-6"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <CalendarDays className="mr-2 h-5 w-5" />
                    Agendar Atendimento
                  </Button>
                  
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    💰 <strong>Visita técnica:</strong> R$ 99,99 a cada 30 minutos
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Orçamento transparente • Sem surpresas
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
