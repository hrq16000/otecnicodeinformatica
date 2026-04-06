import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import { RealImageSection } from "@/components/RealImageSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Monitor,
  ShieldCheck,
  Wrench,
  HardDrive,
  Wifi,
  Database,
  Building2,
  Headphones,
  MapPin,
  Cpu,
  Settings,
  Home,
} from "lucide-react";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Gostaria de saber mais sobre os serviços.";

const services = [
  {
    icon: Wrench,
    title: "Assistência Técnica em Informática",
    description:
      "Oferecemos serviços completos de assistência técnica para computadores e notebooks. Nossa equipe realiza diagnósticos precisos, identificando falhas de hardware e software para devolver seu equipamento funcionando perfeitamente. Trabalhamos com todas as marcas e modelos, garantindo qualidade e agilidade no atendimento.",
    keywords: ["assistência técnica informática", "conserto computador", "reparo notebook"],
  },
  {
    icon: MapPin,
    title: "Técnico de Informática em Domicílio",
    description:
      "Levamos a solução até você. Nosso técnico em informática vai até sua casa ou escritório em Curitiba e região metropolitana para resolver problemas no seu computador sem que você precise sair de casa. Atendimento prático, rápido e com horário agendado conforme sua disponibilidade.",
    keywords: ["técnico informática domicílio", "técnico em casa", "atendimento residencial"],
  },
  {
    icon: Settings,
    title: "Manutenção Preventiva e Corretiva",
    description:
      "A manutenção preventiva evita problemas futuros, mantendo seu PC ou notebook sempre otimizado. Já a manutenção corretiva resolve defeitos existentes, desde travamentos até falhas de inicialização. Nossos técnicos especializados cuidam do seu equipamento com profissionalismo.",
    keywords: ["manutenção computador", "manutenção preventiva", "manutenção corretiva"],
  },
  {
    icon: Monitor,
    title: "Formatação de Computador e Notebook",
    description:
      "Formatação completa com instalação limpa do Windows, configuração de drivers, programas essenciais e ativação do sistema. Removemos arquivos desnecessários e deixamos seu computador como novo, rápido e pronto para uso. Backup dos seus dados incluído quando solicitado.",
    keywords: ["formatação computador", "formatação notebook", "instalar windows"],
  },
  {
    icon: Cpu,
    title: "Limpeza Interna e Troca de Pasta Térmica",
    description:
      "A limpeza interna remove poeira acumulada que causa superaquecimento e travamentos. A troca de pasta térmica renova a condução de calor do processador, evitando desligamentos inesperados. Serviço essencial para manter a vida útil e performance do seu equipamento.",
    keywords: ["limpeza computador", "pasta térmica", "superaquecimento"],
  },
  {
    icon: ShieldCheck,
    title: "Remoção de Vírus e Malware",
    description:
      "Seu computador está lento, abrindo propagandas ou com comportamento estranho? Realizamos varredura completa para eliminar vírus, trojans, spyware e outros malwares. Instalamos proteção atualizada e configuramos seu sistema para maior segurança contra ameaças virtuais.",
    keywords: ["remover vírus", "limpar malware", "computador infectado"],
  },
  {
    icon: Database,
    title: "Backup e Recuperação de Dados",
    description:
      "Proteja seus arquivos importantes com nosso serviço de backup profissional. Se você perdeu dados por formatação acidental, HD danificado ou ataque de ransomware, nossa equipe utiliza ferramentas especializadas para tentar recuperar fotos, documentos e arquivos preciosos.",
    keywords: ["backup dados", "recuperar arquivos", "HD danificado"],
  },
  {
    icon: HardDrive,
    title: "Instalação de Programas e Sistemas",
    description:
      "Instalamos e configuramos qualquer software que você precisa: pacote Office, antivírus, programas de design, contabilidade, editores e muito mais. Também fazemos atualização de sistemas operacionais e drivers para melhor compatibilidade e desempenho.",
    keywords: ["instalar programas", "configurar software", "atualização sistema"],
  },
  {
    icon: Cpu,
    title: "Montagem e Upgrade de PC",
    description:
      "Quer um computador mais rápido? Realizamos upgrade de memória RAM, troca de HD por SSD, instalação de placa de vídeo e outros componentes. Também montamos PCs personalizados conforme sua necessidade, seja para trabalho, estudos ou jogos.",
    keywords: ["upgrade computador", "montar PC", "trocar SSD"],
  },
  {
    icon: Building2,
    title: "Suporte Técnico para Empresas",
    description:
      "Soluções de TI para pequenas e médias empresas em Curitiba. Oferecemos planos de suporte contínuo, manutenção de infraestrutura, gestão de rede, backup corporativo e atendimento prioritário. Emitimos nota fiscal e aceitamos pagamento faturado para facilitar sua gestão.",
    keywords: ["suporte empresarial", "TI empresas", "manutenção corporativa"],
  },
  {
    icon: Home,
    title: "Suporte para Home Office",
    description:
      "Trabalha de casa? Configuramos seu ambiente de trabalho remoto com internet estável, VPN segura, impressora em rede e todos os softwares que sua empresa utiliza. Garantimos que você tenha produtividade máxima sem sair de casa.",
    keywords: ["home office", "trabalho remoto", "configurar VPN"],
  },
  {
    icon: Wifi,
    title: "Configuração de Redes e Wi-Fi",
    description:
      "Instalação e configuração de roteadores, extensores de sinal, redes cabeadas e Wi-Fi corporativo. Resolvemos problemas de conexão lenta, quedas frequentes e áreas sem cobertura. Sua internet funcionando em todos os cômodos da casa ou setores da empresa.",
    keywords: ["configurar wifi", "rede lenta", "instalar roteador"],
  },
  {
    icon: Headphones,
    title: "Atendimento Remoto Imediato",
    description:
      "Problemas simples podem ser resolvidos sem visita técnica. Através de acesso remoto seguro, nosso técnico assume o controle do seu computador e resolve a questão em tempo real, enquanto você acompanha. Rápido, prático e econômico.",
    keywords: ["suporte remoto", "atendimento online", "acesso remoto"],
  },
];

const Servicos = () => {
  useEffect(() => {
    document.title = "Serviços de Informática em Curitiba | Assistência Técnica Completa | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Conheça todos os serviços de informática: formatação, remoção de vírus, backup, upgrade, suporte empresarial e muito mais. Técnico especializado em Curitiba."
      );
    }
    trackPageView("/servicos", "Serviços");
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleCTAClick = () => {
    trackCTAClick("whatsapp", "servicos-cta");
  };

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Serviços" }]} />
      <main>
        <PageHero
          title="Serviços de Informática em Curitiba"
          subtitle="Assistência técnica completa para computadores, notebooks e redes. Atendimento profissional com garantia e preço justo."
          ctaText="Solicitar Orçamento"
        />

        <section className="py-12 md:py-16 lg:py-20 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                Todos os Nossos Serviços de Informática
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                De formatação a suporte empresarial, oferecemos soluções completas para manter seu computador e sua empresa funcionando. Serviços a partir de <strong className="text-accent">R$ 99,99</strong> ou por hora técnica.
              </p>
            </div>

            <div className="space-y-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    key={index}
                    className="bg-secondary rounded-xl p-6 md:p-8 border border-transparent hover:border-accent/20 transition-all"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="bg-primary rounded-lg p-4 w-fit">
                          <Icon className="h-8 w-8 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-primary mb-3">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.keywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                        <Button variant="whatsapp" size="sm" asChild>
                          <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre ${service.title}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleCTAClick}
                          >
                            <MessageCircle className="h-4 w-4" />
                            Solicitar Este Serviço
                          </a>
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <TrustSection />
        <CTASection />
      </main>
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Servicos;
