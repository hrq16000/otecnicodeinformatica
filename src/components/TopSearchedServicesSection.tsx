import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, TrendingUp, MapPin, Monitor, Shield, HardDrive, Wifi, Wrench, Server, Cpu, Tv, Smartphone, Database, Zap } from "lucide-react";

interface ServiceLink {
  title: string;
  url: string;
  icon: React.ElementType;
  location: string;
}

const allServices: ServiceLink[] = [
  { title: "Formatação de Computador", url: "/servicos/formatacao-computador", icon: Monitor, location: "Centro de Curitiba" },
  { title: "Conserto de Notebook", url: "/servicos/conserto-pc-notebook", icon: Wrench, location: "Batel" },
  { title: "Remoção de Vírus", url: "/servicos/remocao-virus", icon: Shield, location: "Água Verde" },
  { title: "Upgrade SSD e Memória", url: "/servicos/upgrade-ssd-memoria", icon: HardDrive, location: "São José dos Pinhais" },
  { title: "Configuração de Redes", url: "/servicos/redes-wifi", icon: Wifi, location: "CIC" },
  { title: "Suporte para Empresas", url: "/suporte-empresas", icon: Server, location: "Santa Felicidade" },
  { title: "Montagem de PC", url: "/servicos/montagem-pc", icon: Cpu, location: "Portão" },
  { title: "Conserto de TV", url: "/servicos/conserto-tv", icon: Tv, location: "Pinhais" },
  { title: "Conserto de Celular", url: "/servicos/conserto-celular", icon: Smartphone, location: "Araucária" },
  { title: "Backup e Recuperação", url: "/servicos/backup-recuperacao", icon: Database, location: "Campo Largo" },
  { title: "Computador Lento", url: "/servicos/computador-lento", icon: Zap, location: "Colombo" },
  { title: "Computador Não Liga", url: "/servicos/computador-nao-liga", icon: Monitor, location: "Xaxim" },
];

const cityLinks = [
  {
    name: "Curitiba", url: "/tecnico-informatica-curitiba",
    bairros: [
      { name: "Centro", slug: "centro" }, { name: "Batel", slug: "batel" }, { name: "Portão", slug: "portao" },
      { name: "CIC", slug: "cic" }, { name: "Santa Felicidade", slug: "santa-felicidade" }, { name: "Água Verde", slug: "agua-verde" },
      { name: "Bigorrilho", slug: "bigorrilho" }, { name: "Mercês", slug: "merces" }, { name: "Boa Vista", slug: "boa-vista" },
      { name: "Juvevê", slug: "juveve" }, { name: "Cabral", slug: "cabral" }, { name: "Cristo Rei", slug: "cristo-rei" },
      { name: "Cajuru", slug: "cajuru" }, { name: "Uberaba", slug: "uberaba" }, { name: "Pinheirinho", slug: "pinheirinho" },
      { name: "Xaxim", slug: "xaxim" }, { name: "Boqueirão", slug: "boqueirao" }, { name: "Bacacheri", slug: "bacacheri" },
      { name: "Tingui", slug: "tingui" }, { name: "Campo Comprido", slug: "campo-comprido" }, { name: "Alto da Glória", slug: "alto-da-gloria" },
      { name: "Rebouças", slug: "reboucas" }, { name: "Vila Izabel", slug: "vila-izabel" }, { name: "Seminário", slug: "seminario" },
      { name: "Hugo Lange", slug: "hugo-lange" }, { name: "Jardim Social", slug: "jardim-social" }, { name: "Tarumã", slug: "taruma" },
      { name: "Hauer", slug: "hauer" }, { name: "Fazendinha", slug: "fazendinha" }, { name: "Novo Mundo", slug: "novo-mundo" },
      { name: "Sítio Cercado", slug: "sitio-cercado" }, { name: "Alto Boqueirão", slug: "alto-boqueirao" },
      { name: "Capão da Imbuia", slug: "capao-da-imbuia" }, { name: "Jardim das Américas", slug: "jardim-das-americas" },
    ],
  },
  {
    name: "São José dos Pinhais", url: "/tecnico-informatica-sao-jose-pinhais",
    bairros: [
      { name: "Centro SJP", slug: "sao-jose-dos-pinhais" }, { name: "Afonso Pena", slug: "afonso-pena" },
      { name: "Cruzeiro", slug: "cruzeiro" }, { name: "Aristocrata", slug: "aristocrata" }, { name: "Braga", slug: "braga" },
      { name: "Costeira", slug: "costeira" }, { name: "Aviação", slug: "aviacao" }, { name: "Guatupê", slug: "guatupe" },
      { name: "São Cristóvão", slug: "sao-cristovao" }, { name: "São Domingos", slug: "sao-domingos" },
      { name: "São Marcos", slug: "sao-marcos" }, { name: "Del Rey", slug: "del-rey" }, { name: "Barro Preto", slug: "barro-preto" },
      { name: "Cidade Jardim", slug: "cidade-jardim-sjp" }, { name: "Pedro Moro", slug: "pedro-moro-sjp" },
      { name: "Ipê", slug: "ipe-sjp" }, { name: "Quississana", slug: "quississana-sjp" }, { name: "Ouro Fino", slug: "ouro-fino-sjp" },
      { name: "Independência", slug: "independencia-sjp" }, { name: "Parque da Fonte", slug: "parque-da-fonte" },
    ],
  },
  {
    name: "Araucária", url: "/tecnico-informatica-araucaria",
    bairros: [
      { name: "Centro", slug: "centro-araucaria" }, { name: "Capela Velha", slug: "capela-velha" },
      { name: "Thomaz Coelho", slug: "thomaz-coelho" }, { name: "Chapada", slug: "chapada" },
      { name: "Iguaçu", slug: "iguacu-araucaria" }, { name: "Campina da Barra", slug: "campina-da-barra" },
      { name: "Guajuvira", slug: "guajuvira" }, { name: "Cachoeira", slug: "cachoeira-araucaria" },
      { name: "Thomaz Coelho II", slug: "thomaz-coelho-ii" }, { name: "Jd. Boa Vista", slug: "jardim-boa-vista-araucaria" },
      { name: "São Miguel", slug: "sao-miguel-araucaria" }, { name: "Califórnia", slug: "california-araucaria" },
      { name: "Vila Nova", slug: "vila-nova-araucaria" }, { name: "Industrial", slug: "industrial-araucaria" },
      { name: "Barigui", slug: "barigui-araucaria" }, { name: "Fazenda Velha", slug: "fazenda-velha-araucaria" },
      { name: "Estação", slug: "estacao-araucaria" }, { name: "Sabiá", slug: "sabia" },
      { name: "Passaúna", slug: "passauna" }, { name: "Tindiquera", slug: "tindiquera" },
    ],
  },
  {
    name: "Campo Largo", url: "/tecnico-informatica-campo-largo",
    bairros: [
      { name: "Centro", slug: "centro-campo-largo" }, { name: "Ferraria", slug: "ferraria" },
      { name: "Jd. Guilhermina", slug: "jardim-guilhermina" }, { name: "Jd. América", slug: "jardim-america-campo-largo" },
      { name: "Botiatuva", slug: "botiatuva" }, { name: "Rondinha", slug: "rondinha" },
      { name: "Ouro Fino", slug: "ouro-fino" }, { name: "Itaqui", slug: "itaqui" },
      { name: "Bateias", slug: "bateias" }, { name: "Três Córregos", slug: "tres-corregos" },
      { name: "São Silvestre", slug: "sao-silvestre" }, { name: "Santa Cruz", slug: "santa-cruz-campo-largo" },
      { name: "Jd. Laranjeiras", slug: "jardim-laranjeiras-cl" }, { name: "São Marcos", slug: "sao-marcos-campo-largo" },
      { name: "São José", slug: "sao-jose-campo-largo" }, { name: "Jd. Esperança", slug: "jardim-esperanca-cl" },
      { name: "Lamenha Grande", slug: "lamenha-grande-cl" }, { name: "Vila Cândida", slug: "vila-candida-cl" },
      { name: "Timbotuva", slug: "timbotuva-cl" }, { name: "Vila Solene", slug: "vila-solene" },
    ],
  },
  {
    name: "Pinhais", url: "/tecnico-informatica-pinhais",
    bairros: [
      { name: "Centro", slug: "centro-pinhais" }, { name: "Weissópolis", slug: "weissopolis" },
      { name: "Pineville", slug: "pineville" }, { name: "Emiliano Perneta", slug: "emiliano-perneta" },
      { name: "Estância", slug: "estancia-pinhais" }, { name: "Alto Tarumã", slug: "alto-taruma" },
      { name: "Palmital", slug: "palmital-pinhais" }, { name: "Jardim Cláudia", slug: "jardim-claudia" },
      { name: "Jd. Pedro Demeterco", slug: "jardim-pedro-demeterco" }, { name: "Jd. Karla", slug: "jardim-karla-pinhais" },
      { name: "Jd. Wissinger", slug: "jardim-wissinger-pinhais" }, { name: "Vila Amélia", slug: "vila-amelia-pinhais" },
      { name: "Jd. Esplanada", slug: "jardim-esplanada-pinhais" }, { name: "Jd. Dona Rosa", slug: "jardim-dona-rosa-pinhais" },
      { name: "Jd. Tropical", slug: "jardim-tropical-pinhais" }, { name: "Vargem Grande", slug: "vargem-grande" },
      { name: "Sete Vilas", slug: "sete-vilas" }, { name: "Maria Antonieta", slug: "maria-antonieta" },
      { name: "Graciosa", slug: "graciosa" }, { name: "Jardim Amélia", slug: "jardim-amelia" },
    ],
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const TopSearchedServicesSection = () => {
  const isMobile = useIsMobile();
  // Mobile: 3 items (1 col × 3 rows), Desktop: 6 items (3 cols × 2 rows)
  const serviceCount = isMobile ? 3 : 6;
  const randomizedServices = useMemo(() => shuffleArray(allServices).slice(0, serviceCount), [serviceCount]);
  const randomizedCities = useMemo(() =>
    cityLinks.map(city => ({
      ...city,
      bairros: shuffleArray(city.bairros).slice(0, 4),
    })),
  []);

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
          {randomizedServices.map((service, index) => (
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
            {randomizedCities.map((city, index) => (
              <div key={index} className="text-center group slide-up-stagger" style={{ animationDelay: `${index * 60}ms` }}>
                <Link
                  to={city.url}
                  className="inline-flex items-center justify-center gap-1.5 text-lg font-bold text-accent hover:text-accent/80 transition-all mb-3 group-hover:scale-105 underline-grow whitespace-nowrap"
                >
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>{city.name}</span>
                </Link>
                <div className="space-y-1.5">
                  {city.bairros.map((bairro, idx) => (
                    <Link
                      key={idx}
                      to={`/bairros/${bairro.slug}`}
                      className="block text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                    >
                      {bairro.name}
                    </Link>
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
