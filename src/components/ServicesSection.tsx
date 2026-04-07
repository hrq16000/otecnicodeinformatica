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
    <section className="py-14 md:py-18 lg:py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-3 tracking-tight">
            Nossos Serviços
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluções completas em informática para você e sua empresa
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link 
                key={index}
                to={service.link}
                className="group bg-card rounded-xl p-5 md:p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] border border-border hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] ripple-container"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-xl p-3 flex-shrink-0 group-hover:bg-accent group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                    <Icon className="h-5 w-5 text-primary-foreground transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-foreground text-base md:text-lg mb-1 group-hover:text-accent transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2.5 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-accent font-bold text-sm">
                        {service.preco}
                      </span>
                      <ArrowRight className="h-4 w-4 text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/valores"
            className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all link-underline text-[15px]"
          >
            Ver tabela completa de preços
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
