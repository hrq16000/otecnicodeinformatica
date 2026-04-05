import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { SERVICOS, CIDADES } from "@/lib/servicoCidadeData";

interface ServiceLocalLinksProps {
  currentCity: string;
  currentNeighborhood?: string;
}

export const ServiceLocalLinks = ({ currentCity, currentNeighborhood }: ServiceLocalLinksProps) => {
  // Build links from all service+city combinations, excluding current location
  const links = SERVICOS.flatMap(s =>
    CIDADES.filter(c => {
      if (currentNeighborhood) {
        return !c.nome.toLowerCase().includes(currentNeighborhood.toLowerCase());
      }
      return !c.nome.toLowerCase().includes(currentCity.toLowerCase());
    }).map(c => ({
      service: s.nome,
      location: c.nome,
      url: `/servicos/${s.slug}/${c.slug}`,
    }))
  );

  // Pick a diverse sample: cycle through services to avoid showing all same service
  const diverse: typeof links = [];
  const used = new Set<string>();
  for (let round = 0; diverse.length < 12 && round < SERVICOS.length; round++) {
    for (const link of links) {
      if (diverse.length >= 12) break;
      const key = `${link.service}-${link.location}`;
      const serviceUsed = diverse.filter(d => d.service === link.service).length;
      const cityUsed = diverse.filter(d => d.location === link.location).length;
      if (!used.has(key) && serviceUsed <= round && cityUsed <= 1) {
        diverse.push(link);
        used.add(key);
      }
    }
  }

  return (
    <section className="py-10 md:py-14 bg-muted/30">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-bold text-primary mb-6 text-center">
            Serviços de Informática na Região Metropolitana
          </h3>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {diverse.map((link, index) => (
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
