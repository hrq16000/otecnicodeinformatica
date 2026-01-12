import { MapPin } from "lucide-react";

const neighborhoods = [
  "Centro", "Batel", "Água Verde", "Portão", "Bigorrilho",
  "Mercês", "Campina do Siqueira", "Santa Felicidade", "Boa Vista", "Juvevê",
  "Alto da XV", "Cabral", "Cristo Rei", "Jardim das Américas", "Cajuru",
  "Uberaba", "Pinheirinho", "Xaxim", "Boqueirão", "Hauer",
  "Bacacheri", "Tingui", "Atuba", "São Lourenço", "Pilarzinho"
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
            <div
              key={neighborhood}
              className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-full text-sm border border-primary/10 hover:border-primary/30 transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 text-accent" />
              <span className="text-foreground/80">{neighborhood}</span>
            </div>
          ))}
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          E mais bairros em Curitiba e região metropolitana • Consulte disponibilidade
        </p>
      </div>
    </section>
  );
};
