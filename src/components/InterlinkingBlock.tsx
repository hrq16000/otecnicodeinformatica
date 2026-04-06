import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, DollarSign, Wrench, Search, Truck, AlertTriangle, Monitor, Cpu, Wifi, Shield, HardDrive, Tv, CircuitBoard, Server, Camera, MapPin, BookOpen, MessageCircle } from "lucide-react";

const atendimentoLinks = [
  { icon: HelpCircle, title: "Como Funciona", desc: "Passo a passo do atendimento", to: "/como-funciona" },
  { icon: DollarSign, title: "Preços e Políticas", desc: "Tabela de valores e condições", to: "/precos-e-politicas" },
  { icon: Search, title: "Diagnóstico Técnico", desc: "Por que o diagnóstico é essencial", to: "/diagnostico-tecnico" },
  { icon: Monitor, title: "Equipamentos", desc: "O que atendemos", to: "/equipamentos-atendidos" },
  { icon: Truck, title: "Coleta e Entrega", desc: "Logística para equipamentos", to: "/coleta-e-entrega" },
  { icon: AlertTriangle, title: "Quando Não Compensa", desc: "Transparência na decisão", to: "/quando-nao-compensa" },
  { icon: BookOpen, title: "Casos Reais", desc: "Problemas e soluções reais", to: "/problemas-reais-e-casos" },
  { icon: MessageCircle, title: "Contato", desc: "Fale conosco", to: "/contato" },
];

const servicoLinks = [
  { icon: HardDrive, title: "Formatação", desc: "Windows 10/11 completo", to: "/servicos/formatacao-computador" },
  { icon: Shield, title: "Remoção de Vírus", desc: "Limpeza total de malware", to: "/servicos/remocao-virus" },
  { icon: Cpu, title: "Upgrade SSD/RAM", desc: "Mais velocidade e desempenho", to: "/servicos/upgrade-ssd-memoria" },
  { icon: Wrench, title: "Conserto PC/Notebook", desc: "Reparo de todas as marcas", to: "/servicos/conserto-pc-notebook" },
  { icon: Cpu, title: "Computador Lento", desc: "Diagnóstico de lentidão", to: "/servicos/computador-lento" },
  { icon: AlertTriangle, title: "Não Liga", desc: "PC ou notebook não liga", to: "/servicos/computador-nao-liga" },
  { icon: Tv, title: "Manutenção de TV", desc: "Reparo de TVs e monitores", to: "/servicos/manutencao-tv" },
  { icon: CircuitBoard, title: "Conserto de Placa", desc: "Reparo em nível de componente", to: "/servicos/conserto-placa" },
  { icon: Server, title: "Montagem de PC", desc: "PC sob medida", to: "/servicos/montagem-pc" },
  { icon: Wifi, title: "Redes e Wi-Fi", desc: "Configuração e instalação", to: "/servicos/redes-wifi" },
  { icon: HardDrive, title: "Backup e Recuperação", desc: "Proteja seus dados", to: "/servicos/backup-recuperacao" },
  { icon: Camera, title: "CFTV / Câmeras", desc: "Segurança eletrônica", to: "/cftv" },
];

const regiaoLinks = [
  { title: "Curitiba", to: "/tecnico-informatica-curitiba" },
  { title: "São José dos Pinhais", to: "/tecnico-informatica-sao-jose-pinhais" },
  { title: "Araucária", to: "/tecnico-informatica-araucaria" },
  { title: "Campo Largo", to: "/tecnico-informatica-campo-largo" },
  { title: "Pinhais", to: "/tecnico-informatica-pinhais" },
  { title: "Colombo", to: "/tecnico-informatica-colombo" },
  { title: "Fazenda Rio Grande", to: "/tecnico-informatica-fazenda-rio-grande" },
  { title: "Almirante Tamandaré", to: "/tecnico-informatica-almirante-tamandare" },
  { title: "Piraquara", to: "/tecnico-informatica-piraquara" },
  { title: "Campo Magro", to: "/tecnico-informatica-campo-magro" },
  { title: "Quatro Barras", to: "/tecnico-informatica-quatro-barras" },
];

export const InterlinkingBlock = () => {
  return (
    <section className="py-10 md:py-14 bg-secondary">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* Atendimento */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-5 text-center">
              Entenda Mais Sobre Nosso Atendimento
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {atendimentoLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    to={item.to}
                    className="bg-background rounded-xl p-4 text-center hover:shadow-md hover:border-accent/20 border border-transparent transition-all group"
                  >
                    <div className="bg-primary rounded-lg p-2 w-fit mx-auto mb-2">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-primary text-sm group-hover:text-accent transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground hidden md:block">{item.desc}</p>
                    <ArrowRight className="h-3 w-3 text-accent mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-5 text-center">
              Nossos Serviços
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {servicoLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    to={item.to}
                    className="bg-background rounded-xl p-4 text-center hover:shadow-md hover:border-accent/20 border border-transparent transition-all group"
                  >
                    <div className="bg-accent rounded-lg p-2 w-fit mx-auto mb-2">
                      <Icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-primary text-sm group-hover:text-accent transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground hidden md:block">{item.desc}</p>
                    <ArrowRight className="h-3 w-3 text-accent mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Regiões */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-5 text-center">
              Regiões Atendidas
            </h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {regiaoLinks.map((item, i) => (
                <Link
                  key={i}
                  to={item.to}
                  className="inline-flex items-center gap-1.5 bg-background rounded-full px-4 py-2 text-sm font-medium text-primary hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-accent/20 transition-all"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
