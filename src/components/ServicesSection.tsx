import { 
  Monitor, 
  ShieldCheck, 
  Wrench, 
  HardDrive, 
  Wifi, 
  Database, 
  Building2, 
  Headphones,
  MapPin
} from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Formatação de Computador",
    description: "Windows, drivers e programas configurados",
  },
  {
    icon: ShieldCheck,
    title: "Remoção de Vírus",
    description: "Limpeza completa de malwares e ameaças",
  },
  {
    icon: Wrench,
    title: "Conserto de PC e Notebook",
    description: "Diagnóstico e reparo de hardware",
  },
  {
    icon: HardDrive,
    title: "Upgrade SSD e Memória",
    description: "Deixe seu computador mais rápido",
  },
  {
    icon: Wifi,
    title: "Redes e Wi-Fi",
    description: "Instalação e configuração de rede",
  },
  {
    icon: Database,
    title: "Backup e Recuperação",
    description: "Proteção e resgate dos seus dados",
  },
  {
    icon: Building2,
    title: "Suporte para Empresas",
    description: "Atendimento técnico corporativo",
  },
  {
    icon: Headphones,
    title: "Atendimento Remoto",
    description: "Suporte imediato online",
  },
  {
    icon: MapPin,
    title: "Atendimento Residencial",
    description: "Vamos até você em Curitiba",
  },
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
              <div 
                key={index}
                className="bg-secondary rounded-xl p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-accent/20"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-lg p-3 flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-primary text-lg mb-1">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
