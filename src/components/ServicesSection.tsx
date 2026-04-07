import { Link } from "react-router-dom";
import { 
  Monitor, ShieldCheck, Wrench, HardDrive, Wifi, Database, 
  Building2, Headphones, MapPin, ArrowRight, Camera,
} from "lucide-react";

const services = [
  { icon: Monitor, title: "Formatação de Computador", description: "Windows, drivers e programas configurados", link: "/servicos/formatacao-computador", preco: "A partir de R$ 150" },
  { icon: ShieldCheck, title: "Remoção de Vírus", description: "Limpeza completa de malwares e ameaças", link: "/servicos/remocao-virus", preco: "A partir de R$ 99,99" },
  { icon: Wrench, title: "Conserto de PC e Notebook", description: "Diagnóstico e reparo de hardware", link: "/servicos/conserto-pc-notebook", preco: "Sob orçamento" },
  { icon: HardDrive, title: "Upgrade SSD e Memória", description: "Deixe seu computador mais rápido", link: "/servicos/upgrade-ssd-memoria", preco: "A partir de R$ 80" },
  { icon: Wifi, title: "Redes e Wi-Fi", description: "Instalação e configuração de rede", link: "/servicos/redes-wifi", preco: "A partir de R$ 80" },
  { icon: Database, title: "Backup e Recuperação", description: "Proteção e resgate dos seus dados", link: "/servicos/backup-recuperacao", preco: "A partir de R$ 80" },
  { icon: Building2, title: "Suporte para Empresas", description: "Atendimento técnico corporativo com SLA", link: "/suporte-empresas", preco: "A partir de R$ 300/mês" },
  { icon: Headphones, title: "Atendimento Remoto", description: "Suporte imediato online", link: "/atendimento-remoto", preco: "A partir de R$ 79,99" },
  { icon: MapPin, title: "Atendimento Domiciliar", description: "Vamos até você em Curitiba e região", link: "/atendimento-domicilio", preco: "A partir de R$ 69,99" },
  { icon: Camera, title: "CFTV - Câmeras de Segurança", description: "Kit 4 câmeras Intelbras com instalação", link: "/cftv", preco: "R$ 1.350 completo" },
];

export const ServicesSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-3">
            Nossos Serviços
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluções completas em informática para você e sua empresa
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link 
                key={index}
                to={service.link}
                className="group bg-secondary rounded-xl p-5 md:p-6 hover-lift ripple-container border border-transparent hover:border-accent/20 hover:glow-accent anim-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-lg p-3 flex-shrink-0 group-hover:bg-accent transition-colors duration-300 hover-scale group-hover:glow-accent">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-primary text-lg mb-1 group-hover:text-accent transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-accent font-semibold text-sm">
                        {service.preco}
                      </span>
                      <ArrowRight className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/valores"
            className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all link-underline"
          >
            Ver tabela completa de preços
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
