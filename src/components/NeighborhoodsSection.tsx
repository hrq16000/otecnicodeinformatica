import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const neighborhoods = [
  { name: "Centro", slug: "centro", hasPage: true },
  { name: "Batel", slug: "batel", hasPage: true },
  { name: "Água Verde", slug: "agua-verde", hasPage: false },
  { name: "Portão", slug: "portao", hasPage: true },
  { name: "Bigorrilho", slug: "bigorrilho", hasPage: false },
  { name: "Mercês", slug: "merces", hasPage: false },
  { name: "Campina do Siqueira", slug: "campina-do-siqueira", hasPage: false },
  { name: "Santa Felicidade", slug: "santa-felicidade", hasPage: true },
  { name: "Boa Vista", slug: "boa-vista", hasPage: false },
  { name: "Juvevê", slug: "juveve", hasPage: false },
  { name: "Alto da XV", slug: "alto-da-xv", hasPage: false },
  { name: "Cabral", slug: "cabral", hasPage: false },
  { name: "Cristo Rei", slug: "cristo-rei", hasPage: false },
  { name: "Jardim das Américas", slug: "jardim-das-americas", hasPage: false },
  { name: "Cajuru", slug: "cajuru", hasPage: false },
  { name: "Uberaba", slug: "uberaba", hasPage: false },
  { name: "Pinheirinho", slug: "pinheirinho", hasPage: false },
  { name: "Xaxim", slug: "xaxim", hasPage: false },
  { name: "Boqueirão", slug: "boqueirao", hasPage: false },
  { name: "Hauer", slug: "hauer", hasPage: false },
  { name: "Bacacheri", slug: "bacacheri", hasPage: false },
  { name: "Tingui", slug: "tingui", hasPage: false },
  { name: "Atuba", slug: "atuba", hasPage: false },
  { name: "Campo Comprido", slug: "campo-comprido", hasPage: true },
  { name: "CIC", slug: "cic", hasPage: true },
];

export const NeighborhoodsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            Atendimento em Toda Curitiba
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Técnico de informática com atendimento presencial nos principais bairros de Curitiba e região metropolitana.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto">
          {neighborhoods.map((neighborhood) => (
            neighborhood.hasPage ? (
              <Link
                key={neighborhood.slug}
                to={`/bairros/${neighborhood.slug}`}
                className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-full text-sm border border-primary/10 hover:border-accent hover:bg-accent/5 transition-colors group"
              >
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <span className="text-foreground/80 group-hover:text-accent transition-colors">{neighborhood.name}</span>
              </Link>
            ) : (
              <div
                key={neighborhood.slug}
                className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-full text-sm border border-primary/10 hover:border-primary/30 transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <span className="text-foreground/80">{neighborhood.name}</span>
              </div>
            )
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/tecnico-informatica-curitiba" 
            className="text-accent hover:underline font-medium"
          >
            Ver todos os bairros atendidos em Curitiba →
          </Link>
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-4">
          E mais bairros em Curitiba e região metropolitana • Consulte disponibilidade
        </p>
      </div>
    </section>
  );
};