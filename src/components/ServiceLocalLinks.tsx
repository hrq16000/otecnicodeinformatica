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
  // Curitiba - Serviço + Bairro
  { service: "Formatação de Computador", location: "Centro de Curitiba", url: "/servicos/formatacao-computador/centro" },
  { service: "Conserto de Notebook", location: "Batel", url: "/servicos/conserto-pc-notebook/batel" },
  { service: "Remoção de Vírus", location: "Portão", url: "/servicos/remocao-virus/portao" },
  { service: "Upgrade SSD", location: "Santa Felicidade", url: "/servicos/upgrade-ssd-memoria/santa-felicidade" },
  { service: "Remoção de Vírus", location: "Centro de Curitiba", url: "/servicos/remocao-virus/centro" },
  { service: "Upgrade SSD e Memória", location: "Batel", url: "/servicos/upgrade-ssd-memoria/batel" },
  { service: "Formatação de Computador", location: "Portão", url: "/servicos/formatacao-computador/portao" },
  { service: "Redes Wi-Fi", location: "CIC", url: "/servicos/redes-wifi/cic" },
  { service: "Backup e Recuperação", location: "Centro de Curitiba", url: "/servicos/backup-recuperacao/centro" },
  { service: "Conserto de Notebook", location: "Portão", url: "/servicos/conserto-pc-notebook/portao" },
  { service: "Conserto de Notebook", location: "CIC", url: "/servicos/conserto-pc-notebook/cic" },
  { service: "Redes Wi-Fi", location: "Santa Felicidade", url: "/servicos/redes-wifi/santa-felicidade" },
  { service: "Formatação de Computador", location: "Campo Comprido", url: "/servicos/formatacao-computador/campo-comprido" },
  { service: "Remoção de Vírus", location: "Batel", url: "/servicos/remocao-virus/batel" },
  { service: "Montagem de PC", location: "CIC", url: "/servicos/montagem-pc/cic" },
  { service: "Redes Wi-Fi", location: "Araucária", url: "/servicos/redes-wifi/araucaria" },
  { service: "Formatação de PC", location: "São José dos Pinhais", url: "/servicos/formatacao-computador/sao-jose-dos-pinhais" },
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
