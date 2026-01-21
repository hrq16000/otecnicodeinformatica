import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Building2, Home } from "lucide-react";

interface CityData {
  name: string;
  slug: string;
  neighborhoods: string[];
  hasPage: boolean;
}

const cities: CityData[] = [
  {
    name: "Curitiba",
    slug: "curitiba",
    neighborhoods: ["Centro", "Batel", "Portão", "CIC", "Santa Felicidade", "Campo Comprido"],
    hasPage: true
  },
  {
    name: "São José dos Pinhais",
    slug: "sao-jose-dos-pinhais",
    neighborhoods: ["Centro", "Afonso Pena", "Aviação", "Costeira", "São Cristóvão", "Del Rey"],
    hasPage: true
  },
  {
    name: "Araucária",
    slug: "araucaria",
    neighborhoods: ["Centro", "Chapada", "Costeira", "Iguaçu", "Thomaz Coelho"],
    hasPage: false
  },
  {
    name: "Campo Largo",
    slug: "campo-largo",
    neighborhoods: ["Centro", "Jardim Guilhermina", "Jardim América", "Ferraria"],
    hasPage: false
  },
  {
    name: "Pinhais",
    slug: "pinhais",
    neighborhoods: ["Centro", "Emiliano Perneta", "Maria Antonieta", "Weissópolis"],
    hasPage: false
  }
];

export const CitiesSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-secondary" aria-labelledby="cities-heading">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium text-sm">Área de Atendimento</span>
          </div>
          <h2 id="cities-heading" className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Técnico de Informática em Curitiba e Região
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Oferecemos <strong>assistência técnica de informática a domicílio</strong> em toda a região metropolitana de Curitiba. 
            Atendimento rápido no mesmo dia para residências e empresas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <article 
              key={city.slug} 
              className="bg-background rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground">
                  {city.name}
                </h3>
              </div>

              <p className="text-muted-foreground text-sm mb-4">
                Técnico de informática em <strong>{city.name}</strong> com atendimento a domicílio. 
                Conserto de PC, notebook, formatação e mais.
              </p>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Home className="h-3 w-3" />
                  Bairros atendidos:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {city.neighborhoods.map((neighborhood) => (
                    <span 
                      key={neighborhood}
                      className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded"
                    >
                      {neighborhood}
                    </span>
                  ))}
                  <span className="text-xs text-primary font-medium">+ outros</span>
                </div>
              </div>

              {city.hasPage ? (
                <Link 
                  to={`/tecnico-informatica-${city.slug}`}
                  className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:underline"
                >
                  Ver todos os bairros em {city.name}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <a 
                  href={`https://wa.me/5541997452053?text=Olá! Preciso de técnico em ${city.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:underline"
                >
                  Solicitar atendimento em {city.name}
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </article>
          ))}
        </div>

        {/* SEO content */}
        <div className="mt-12 bg-background rounded-xl p-6 md:p-8 border border-border">
          <h3 className="text-xl font-heading font-bold text-foreground mb-4">
            Por que escolher nosso serviço de assistência técnica?
          </h3>
          <div className="prose prose-sm text-muted-foreground max-w-none">
            <p>
              Somos especialistas em <strong>manutenção de computadores e notebooks</strong> com mais de 10 anos 
              de experiência atendendo a região de Curitiba. Nossa equipe de técnicos qualificados oferece 
              <strong> atendimento a domicílio</strong> em toda a região metropolitana, incluindo 
              <strong> São José dos Pinhais</strong>, <strong>Araucária</strong>, <strong>Campo Largo</strong>, 
              <strong> Pinhais</strong>, <strong>Colombo</strong> e <strong>Almirante Tamandaré</strong>.
            </p>
            <p className="mt-3">
              Diferente de grandes empresas que usam call centers, aqui você fala diretamente com o técnico 
              que vai realizar o serviço. Isso garante <strong>atendimento personalizado</strong>, 
              <strong> orçamento transparente</strong> e <strong>resolução rápida</strong> do seu problema.
              Todos os serviços têm garantia e você só paga se aprovar o orçamento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};