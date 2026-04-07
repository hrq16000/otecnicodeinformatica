import { MapPin, Clock, Navigation } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { MouseGlow } from "@/components/MouseGlow";

const regions = [
  { name: "Curitiba - Centro", baseMin: 20, baseMax: 30, neighborhoods: ["Centro", "Batel", "Água Verde", "Rebouças", "Alto da XV"] },
  { name: "Curitiba - Norte", baseMin: 25, baseMax: 40, neighborhoods: ["Santa Felicidade", "Boa Vista", "Bacacheri", "Cabral"] },
  { name: "Curitiba - Sul", baseMin: 25, baseMax: 40, neighborhoods: ["Portão", "Novo Mundo", "Xaxim", "Pinheirinho"] },
  { name: "Curitiba - Oeste", baseMin: 30, baseMax: 45, neighborhoods: ["CIC", "Campo Comprido", "Mossunguê", "Fazendinha"] },
  { name: "São José dos Pinhais", baseMin: 35, baseMax: 50, neighborhoods: ["Centro SJP", "Afonso Pena", "Costeira", "Aviação"] },
  { name: "Araucária", baseMin: 40, baseMax: 55, neighborhoods: ["Centro", "Capela Velha", "Thomaz Coelho"] },
  { name: "Campo Largo", baseMin: 45, baseMax: 60, neighborhoods: ["Centro", "Ferraria", "Jardim Guilhermina"] },
  { name: "Pinhais", baseMin: 30, baseMax: 45, neighborhoods: ["Centro", "Weissópolis", "Pineville"] },
];

function getTimeMultiplier(): { multiplier: number; label: string } {
  const hour = new Date().getHours();
  // Horário de pico manhã (7-9h) e tarde (17-19h)
  if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
    return { multiplier: 1.8, label: "Horário de pico – trânsito intenso" };
  }
  // Horário moderado (10-12h, 14-16h)
  if ((hour >= 10 && hour <= 12) || (hour >= 14 && hour <= 16)) {
    return { multiplier: 1.2, label: "Trânsito moderado" };
  }
  // Almoço (12-14h)
  if (hour >= 12 && hour <= 14) {
    return { multiplier: 1.0, label: "Trânsito leve" };
  }
  // Fora do horário comercial
  if (hour < 7 || hour >= 20) {
    return { multiplier: 1.0, label: "Trânsito livre" };
  }
  return { multiplier: 1.0, label: "Trânsito normal" };
}

function calcTime(baseMin: number, baseMax: number, multiplier: number): string {
  const min = Math.round(baseMin * multiplier);
  const max = Math.round(baseMax * multiplier);
  if (max >= 60) {
    const minH = Math.floor(min / 60);
    const minM = min % 60;
    const maxH = Math.floor(max / 60);
    const maxM = max % 60;
    if (minH >= 1 && maxH >= 1) {
      return `${minH}h${minM > 0 ? minM : ''} - ${maxH}h${maxM > 0 ? maxM : ''}`;
    }
    return `${min} - ${maxH}h${maxM > 0 ? maxM : ''}`;
  }
  return `${min}-${max} min`;
}

export const CoverageMapSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trafficInfo, setTrafficInfo] = useState(getTimeMultiplier);

  // Atualiza o trânsito a cada 60s
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficInfo(getTimeMultiplier());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto-alterna a região selecionada a cada 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % regions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const computedRegions = useMemo(() =>
    regions.map(r => ({
      ...r,
      time: calcTime(r.baseMin, r.baseMax, trafficInfo.multiplier),
    })),
  [trafficInfo.multiplier]);

  const currentHour = new Date().getHours();
  const isBusinessHours = currentHour >= 8 && currentHour < 20;

  return (
    <section className="py-12 md:py-16 bg-secondary relative overflow-hidden mesh-gradient-warm noise-overlay">
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none orb-float" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none orb-float-reverse" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4 shimmer-sweep float-badge">
            <Navigation className="h-4 w-4" />
            Atendimento Rápido em Toda Região
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 reveal-text">
            Área de Cobertura e Tempo de Chegada
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6 reveal-text" data-reveal-delay="100">
            Atendemos Curitiba e região metropolitana com agilidade. Confira o tempo estimado de chegada para sua localização.
          </p>
          <div className="glow-separator max-w-xs mx-auto mb-6" />
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <div className="text-center slide-up-stagger" style={{ animationDelay: '0ms' }}>
              <p className="text-2xl md:text-3xl font-bold text-accent glow-pulse-text"><AnimatedCounter end={8} /> </p>
              <p className="text-xs text-muted-foreground">Cidades atendidas</p>
            </div>
            <div className="text-center slide-up-stagger" style={{ animationDelay: '100ms' }}>
              <p className="text-2xl md:text-3xl font-bold text-foreground"><AnimatedCounter end={30} suffix="+" /></p>
              <p className="text-xs text-muted-foreground">Bairros cobertos</p>
            </div>
            <div className="text-center slide-up-stagger" style={{ animationDelay: '200ms' }}>
              <p className="text-2xl md:text-3xl font-bold text-foreground"><AnimatedCounter end={30} suffix=" min" /></p>
              <p className="text-xs text-muted-foreground">Tempo médio de chegada</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Mapa Interativo */}
          <MouseGlow className="rounded-xl">
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-border bg-background hover:shadow-[var(--shadow-xl)] transition-shadow duration-500">
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
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 pulse-dot" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                    </span>
                    <span className="font-medium text-foreground">
                      {isBusinessHours ? "Atendimento no mesmo dia" : "Próximo atendimento às 8h"}
                    </span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{trafficInfo.label}</span>
                </div>
              </div>
            </div>
          </MouseGlow>

          {/* Lista de Regiões com Tempos */}
          <div className="space-y-3">
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-4 hover-streak">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Tempo médio de chegada após confirmação
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    ⏱ Agora: <span className="font-medium text-foreground">{trafficInfo.label}</span> — tempos ajustados em tempo real
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              {computedRegions.map((region, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] card-shine hover-streak ${
                      isActive
                        ? "glass-card border-accent/40 shadow-md bg-accent/5 scale-[1.01]"
                        : "glass-card hover:border-accent/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isActive ? "bg-accent text-accent-foreground scale-110" : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <p className={`font-medium text-sm transition-colors duration-300 ${isActive ? "text-accent" : "text-foreground"}`}>
                          {region.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {region.neighborhoods.slice(0, 3).join(", ")}
                          {region.neighborhoods.length > 3 && "..."}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-500 ${
                          isActive
                            ? "bg-accent text-accent-foreground shadow-sm"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        <Clock className="h-3 w-3" />
                        {region.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors duration-300">
              <p className="text-sm text-center text-foreground">
                <span className="font-semibold">Não encontrou sua região?</span>{" "}
                <a
                  href="https://wa.me/5541997452053?text=Olá! Gostaria de saber se vocês atendem na minha região."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline font-medium underline-grow"
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
