import { MapPin, Clock, Navigation, Users } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const regions = [
  {
    name: "Curitiba - Centro",
    time: "20-30 min",
    neighborhoods: ["Centro", "Batel", "Água Verde", "Rebouças", "Alto da XV"],
    highlight: true,
  },
  {
    name: "Curitiba - Norte",
    time: "25-40 min",
    neighborhoods: ["Santa Felicidade", "Boa Vista", "Bacacheri", "Cabral"],
    highlight: false,
  },
  {
    name: "Curitiba - Sul",
    time: "25-40 min",
    neighborhoods: ["Portão", "Novo Mundo", "Xaxim", "Pinheirinho"],
    highlight: false,
  },
  {
    name: "Curitiba - Oeste",
    time: "30-45 min",
    neighborhoods: ["CIC", "Campo Comprido", "Mossunguê", "Fazendinha"],
    highlight: false,
  },
  {
    name: "São José dos Pinhais",
    time: "35-50 min",
    neighborhoods: ["Centro SJP", "Afonso Pena", "Costeira", "Aviação"],
    highlight: false,
  },
  {
    name: "Araucária",
    time: "40-55 min",
    neighborhoods: ["Centro", "Capela Velha", "Thomaz Coelho"],
    highlight: false,
  },
  {
    name: "Campo Largo",
    time: "45-60 min",
    neighborhoods: ["Centro", "Ferraria", "Jardim Guilhermina"],
    highlight: false,
  },
  {
    name: "Pinhais",
    time: "30-45 min",
    neighborhoods: ["Centro", "Weissópolis", "Pineville"],
    highlight: false,
  },
];

export const CoverageMapSection = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Navigation className="h-4 w-4" />
            Atendimento Rápido em Toda Região
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 reveal-text">
            Área de Cobertura e Tempo de Chegada
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6 reveal-text" data-reveal-delay="100">
            Atendemos Curitiba e região metropolitana com agilidade. Confira o tempo estimado de chegada para sua localização.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-accent"><AnimatedCounter end={8} /> </p>
              <p className="text-xs text-muted-foreground">Cidades atendidas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground"><AnimatedCounter end={30} suffix="+" /></p>
              <p className="text-xs text-muted-foreground">Bairros cobertos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground"><AnimatedCounter end={30} suffix=" min" /></p>
              <p className="text-xs text-muted-foreground">Tempo médio de chegada</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Mapa Interativo */}
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-border bg-background">
            <div className="aspect-[4/3] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115063.98825866027!2d-49.35951754843749!3d-25.494912899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce35351c67f2f%3A0xf9e5a1e1d08a0c6a!2sCuritiba%2C%20PR!5e0!3m2!1spt-BR!2sbr!4v1705000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Área de cobertura - Técnico de Informática Curitiba"
                className="w-full h-full"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-md border border-border">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                  <span className="font-medium text-foreground">Atendimento no mesmo dia</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">Curitiba e Região Metropolitana</span>
              </div>
            </div>
          </div>

          {/* Lista de Regiões com Tempos */}
          <div className="space-y-3">
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Tempo médio de chegada após confirmação
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Os tempos podem variar conforme disponibilidade e trânsito
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              {regions.map((region, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] stagger-item ${
                    region.highlight
                      ? "glass-card border-accent/30 shadow-sm"
                      : "glass-card hover:border-accent/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        region.highlight ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{region.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {region.neighborhoods.slice(0, 3).join(", ")}
                        {region.neighborhoods.length > 3 && "..."}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        region.highlight
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-foreground"
                      }`}
                    >
                      <Clock className="h-3 w-3" />
                      {region.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-sm text-center text-foreground">
                <span className="font-semibold">Não encontrou sua região?</span>{" "}
                <a
                  href="https://wa.me/5541997452053?text=Olá! Gostaria de saber se vocês atendem na minha região."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline font-medium"
                >
                  Consulte pelo WhatsApp
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
