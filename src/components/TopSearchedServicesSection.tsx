import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, MapPin, Monitor, Shield, HardDrive, Wifi, Wrench, Server } from "lucide-react";

interface ServiceLink {
  title: string;
  url: string;
  icon: React.ElementType;
  location: string;
}

const topServices: ServiceLink[] = [
  {
    title: "Formatação de Computador",
    url: "/servicos/formatacao-computador",
    icon: Monitor,
    location: "Centro de Curitiba"
  },
  {
    title: "Conserto de Notebook",
    url: "/servicos/conserto-pc-notebook",
    icon: Wrench,
    location: "Batel"
  },
  {
    title: "Remoção de Vírus",
    url: "/servicos/remocao-virus",
    icon: Shield,
    location: "Água Verde"
  },
  {
    title: "Upgrade SSD",
    url: "/servicos/upgrade-ssd-memoria",
    icon: HardDrive,
    location: "São José dos Pinhais"
  },
  {
    title: "Configuração de Redes",
    url: "/servicos/redes-wifi",
    icon: Wifi,
    location: "CIC"
  },
  {
    title: "Suporte para Empresas",
    url: "/suporte-empresas",
    icon: Server,
    location: "Santa Felicidade"
  }
];

const cityLinks = [
  { name: "Curitiba", url: "/tecnico-informatica-curitiba", bairros: ["Centro", "Batel", "Portão", "CIC"] },
  { name: "São José dos Pinhais", url: "/tecnico-informatica-sao-jose-pinhais", bairros: ["Centro", "Afonso Pena", "Costeira"] },
  { name: "Araucária", url: "/tecnico-informatica-araucaria", bairros: ["Centro", "Capela Velha", "Thomaz Coelho"] },
  { name: "Campo Largo", url: "/tecnico-informatica-campo-largo", bairros: ["Centro", "Ferraria", "Jardim Guilhermina"] },
  { name: "Pinhais", url: "/tecnico-informatica-pinhais", bairros: ["Centro", "Weissópolis", "Pineville"] }
];

export const TopSearchedServicesSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium text-sm">Mais Buscados em Curitiba</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-primary mb-3">
            Serviços de Informática Mais Procurados
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encontre o serviço que você precisa com atendimento local especializado em cada região
          </p>
        </div>

        {/* Grid de Serviços Principais */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {topServices.map((service, index) => (
            <Link
              key={index}
              to={service.url}
              className="group bg-background border border-border/50 rounded-xl p-5 hover:border-accent/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-accent/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground group-hover:text-accent transition-colors mb-1">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>Destaque: {service.location}</span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        {/* Hub de Cidades */}
        <div className="bg-background border border-border/50 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-primary mb-6 text-center">
            Atendimento por Região
          </h3>
          <div className="grid md:grid-cols-5 gap-6">
            {cityLinks.map((city, index) => (
              <div key={index} className="text-center">
                <Link
                  to={city.url}
                  className="inline-flex items-center gap-2 text-lg font-bold text-accent hover:underline mb-3"
                >
                  <MapPin className="h-4 w-4" />
                  {city.name}
                </Link>
                <div className="space-y-1">
                  {city.bairros.map((bairro, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {bairro}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 pt-6 border-t border-border/50">
            <p className="text-muted-foreground mb-4">
              Não encontrou seu bairro? Atendemos <strong className="text-foreground">toda a região metropolitana de Curitiba</strong>.
            </p>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
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
