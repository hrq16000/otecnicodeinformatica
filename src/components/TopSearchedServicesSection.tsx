import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, MapPin, Monitor, Shield, HardDrive, Wifi, Wrench, Server } from "lucide-react";

interface ServiceLink {
  title: string;
  url: string;
  icon: React.ElementType;
  location: string;
}

const topServices: ServiceLink[] = [
  { title: "Formatação de Computador", url: "/servicos/formatacao-computador", icon: Monitor, location: "Centro de Curitiba" },
  { title: "Conserto de Notebook", url: "/servicos/conserto-pc-notebook", icon: Wrench, location: "Batel" },
  { title: "Remoção de Vírus", url: "/servicos/remocao-virus", icon: Shield, location: "Água Verde" },
  { title: "Upgrade SSD", url: "/servicos/upgrade-ssd-memoria", icon: HardDrive, location: "São José dos Pinhais" },
  { title: "Configuração de Redes", url: "/servicos/redes-wifi", icon: Wifi, location: "CIC" },
  { title: "Suporte para Empresas", url: "/suporte-empresas", icon: Server, location: "Santa Felicidade" },
];

const cityLinks = [
  { name: "Curitiba", url: "/tecnico-informatica-curitiba", bairros: ["Centro", "Batel", "Portão", "CIC"] },
  { name: "São José dos Pinhais", url: "/tecnico-informatica-sao-jose-pinhais", bairros: ["Centro", "Afonso Pena", "Costeira"] },
  { name: "Araucária", url: "/tecnico-informatica-araucaria", bairros: ["Centro", "Capela Velha", "Thomaz Coelho"] },
  { name: "Campo Largo", url: "/tecnico-informatica-campo-largo", bairros: ["Centro", "Ferraria", "Jardim Guilhermina"] },
  { name: "Pinhais", url: "/tecnico-informatica-pinhais", bairros: ["Centro", "Weissópolis", "Pineville"] },
];

export const TopSearchedServicesSection = () => {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-muted to-background relative overflow-hidden noise-overlay">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[100px] pointer-events-none orb-float" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none liquid-blob" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4 shimmer-sweep float-badge">
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium text-sm">Mais Buscados em Curitiba</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-3 tracking-tight reveal-text">
            Serviços de Informática Mais <span className="gradient-text">Procurados</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto reveal-text" data-reveal-delay="100">
            Encontre o serviço que você precisa com atendimento local especializado em cada região
          </p>
          <div className="glow-separator max-w-xs mx-auto mt-5" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 stagger-grid">
          {topServices.map((service, index) => (
            <Link
              key={index}
              to={service.url}
              className="group glass-card gradient-border rounded-xl p-5 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover-streak animated-border slide-up-stagger"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-accent/15 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative">
                  <service.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors duration-300 icon-bounce" />
                  <div className="absolute inset-0 rounded-xl bg-accent/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground group-hover:text-accent transition-colors duration-200 mb-1">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>Destaque: {service.location}</span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>

        <div className="glass-card gradient-border rounded-2xl p-6 md:p-8 hover:shadow-[var(--shadow-lg)] transition-shadow duration-300">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center reveal-text">
            Atendimento por <span className="gradient-text">Região</span>
          </h3>
          <div className="grid md:grid-cols-5 gap-6">
            {cityLinks.map((city, index) => (
              <div key={index} className="text-center group slide-up-stagger" style={{ animationDelay: `${index * 60}ms` }}>
                <Link
                  to={city.url}
                  className="inline-flex items-center gap-2 text-lg font-bold text-accent hover:text-accent/80 transition-all mb-3 group-hover:scale-105 underline-grow"
                >
                  <MapPin className="h-4 w-4 group-hover:animate-bounce" />
                  {city.name}
                </Link>
                <div className="space-y-1.5">
                  {city.bairros.map((bairro, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                      {bairro}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-muted-foreground mb-4">
              Não encontrou seu bairro? Atendemos <strong className="text-foreground">toda a região metropolitana de Curitiba</strong>.
            </p>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 hover:scale-[1.03] hover:shadow-[var(--shadow-accent)] transition-all duration-300 elastic-click hover-streak"
            >
              Consultar Disponibilidade
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
