import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";

interface ServiceLocalLink {
  service: string;
  location: string;
  url: string;
}

interface ServiceLocalLinksProps {
  currentCity: string;
  currentNeighborhood?: string;
}

// Links de serviço + localização para interlinking forte
const serviceLocalLinks: ServiceLocalLink[] = [
  // Curitiba
  { service: "Formatação de Computador", location: "Centro de Curitiba", url: "/servicos/formatacao-computador" },
  { service: "Conserto de Notebook", location: "Batel", url: "/servicos/conserto-pc-notebook" },
  { service: "Remoção de Vírus", location: "Água Verde", url: "/servicos/remocao-virus" },
  { service: "Upgrade SSD", location: "Portão", url: "/servicos/upgrade-ssd-memoria" },
  { service: "Configuração de Redes Wi-Fi", location: "CIC", url: "/servicos/redes-wifi" },
  { service: "Backup de Dados", location: "Santa Felicidade", url: "/servicos/backup-recuperacao" },
  
  // São José dos Pinhais
  { service: "Conserto de Notebook", location: "São José dos Pinhais", url: "/servicos/conserto-pc-notebook" },
  { service: "Formatação de PC", location: "Afonso Pena", url: "/servicos/formatacao-computador" },
  
  // Araucária
  { service: "Assistência Técnica", location: "Araucária Centro", url: "/tecnico-informatica-araucaria" },
  { service: "Manutenção de Computadores", location: "Capela Velha", url: "/bairros/capela-velha-araucaria" },
  
  // Campo Largo
  { service: "Técnico de Informática", location: "Campo Largo Centro", url: "/tecnico-informatica-campo-largo" },
  { service: "Upgrade de Hardware", location: "Ferraria", url: "/bairros/ferraria-campo-largo" },
  
  // Pinhais
  { service: "Suporte Técnico", location: "Pinhais Centro", url: "/tecnico-informatica-pinhais" },
  { service: "Formatação Windows", location: "Weissópolis", url: "/bairros/weissopolis-pinhais" },
];

export const ServiceLocalLinks = ({ currentCity, currentNeighborhood }: ServiceLocalLinksProps) => {
  // Filtra para não mostrar o local atual
  const filteredLinks = serviceLocalLinks.filter(link => {
    if (currentNeighborhood) {
      return !link.location.toLowerCase().includes(currentNeighborhood.toLowerCase());
    }
    return true;
  }).slice(0, 8); // Máximo 8 links para não poluir

  return (
    <section className="py-10 md:py-14 bg-muted/30">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-primary mb-6 text-center">
            Serviços em Destaque na Região
          </h3>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {filteredLinks.map((link, index) => (
              <Link
                key={index}
                to={link.url}
                className="group flex items-center gap-2 bg-background rounded-lg px-4 py-3 border border-border/50 hover:border-accent/50 hover:shadow-md transition-all"
              >
                <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">
                    {link.service}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {link.location}
                  </p>
                </div>
                <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Link
              to="/servicos"
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium text-sm"
            >
              Ver todos os serviços
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceLocalLinks;
