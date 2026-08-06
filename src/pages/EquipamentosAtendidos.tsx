import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { IMAGES } from "@/lib/images";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import {
  Monitor, Laptop, Tv, HardDrive, Wifi, Server, Cpu, Printer,
  MessageCircle, ArrowRight, CheckCircle2, AlertTriangle, Wrench,
  Radio, Smartphone, Cable,
} from "lucide-react";

const WHATSAPP_NUMBER = "5541997086380";

const equipamentos = [
  {
    icon: Monitor,
    nome: "Computadores Desktop",
    desc: "PCs de mesa, workstations, all-in-ones e micro PCs",
    servicos: ["Formatação e instalação de sistema", "Upgrade de SSD, memória RAM e placa de vídeo", "Limpeza interna e troca de pasta térmica", "Diagnóstico de problemas de inicialização", "Montagem completa personalizada"],
    cenarios: "Computadores desktop são os mais versáteis para reparo. Na maioria dos casos, é possível trocar qualquer componente individualmente, o que torna o reparo viável e econômico. Problemas comuns incluem superaquecimento por acúmulo de poeira, fontes de alimentação instáveis e HDs em fim de vida útil.",
  },
  {
    icon: Laptop,
    nome: "Notebooks e Ultrabooks",
    desc: "Todas as marcas: Dell, Lenovo, HP, Acer, Asus, Samsung, Apple",
    servicos: ["Troca de tela, teclado e bateria", "Upgrade de SSD e memória RAM", "Reparo de dobradiças e carcaça", "Limpeza do sistema de refrigeração", "Diagnóstico de placa mãe"],
    cenarios: "Notebooks exigem cuidado especial por conta dos componentes compactos e integrados. Problemas de superaquecimento são muito comuns — a pasta térmica resseca após 2-3 anos de uso. Quedas e impactos podem danificar telas, dobradiças e conectores internos. O diagnóstico profissional é fundamental para identificar se o reparo compensa.",
  },
  {
    icon: Tv,
    nome: "Smart TVs e Monitores",
    desc: "LED, OLED, QLED — todas as marcas e tamanhos",
    servicos: ["Diagnóstico de tela (LEDs, painel, T-CON)", "Reparo de fonte de alimentação", "Troca de LEDs de retroiluminação", "Atualização de firmware", "Configuração de smart features"],
    cenarios: "TVs modernas têm componentes delicados. O problema mais comum é falha nos LEDs de retroiluminação — a TV liga mas a tela fica escura. Muitos confundem com 'tela queimada' e descartam a TV, quando o reparo custa uma fração do preço de uma nova. Problemas na placa fonte também são frequentes e geralmente reparáveis.",
  },
  {
    icon: HardDrive,
    nome: "HDs, SSDs e Dispositivos de Armazenamento",
    desc: "HDs mecânicos, SSDs SATA e NVMe, pendrives, cartões de memória",
    servicos: ["Recuperação de dados de HD com defeito", "Clonagem de disco para migração", "Diagnóstico de setores defeituosos", "Backup profissional de dados", "Upgrade de HD para SSD"],
    cenarios: "HDs mecânicos têm vida útil limitada (3-5 anos em média). Ruídos anormais, lentidão extrema e arquivos corrompidos são sinais de falha iminente. A recuperação de dados é possível na maioria dos casos, mas quanto mais o HD é utilizado após a falha, menor a chance de sucesso. SSDs são mais duráveis mas também falham — e quando falham, a recuperação é mais complexa.",
  },
  {
    icon: Wifi,
    nome: "Roteadores e Equipamentos de Rede",
    desc: "Roteadores, switches, access points, mesh, repetidores",
    servicos: ["Configuração e otimização de Wi-Fi", "Instalação de rede cabeada", "Configuração de firewall e segurança", "Extensão de cobertura com mesh", "Diagnóstico de problemas de conexão"],
    cenarios: "Problemas de Wi-Fi nem sempre são do provedor de internet. Roteadores mal configurados, posicionamento inadequado, interferência de vizinhos e firmware desatualizado são causas comuns. Uma configuração profissional pode dobrar a velocidade percebida sem trocar o plano de internet.",
  },
  {
    icon: Server,
    nome: "Servidores e Equipamentos Empresariais",
    desc: "Servidores rack, torre, NAS, sistemas de backup corporativo",
    servicos: ["Configuração e manutenção preventiva", "Migração de dados entre servidores", "Configuração de RAID e backup", "Instalação de sistemas de monitoramento", "Suporte técnico remoto e presencial"],
    cenarios: "Servidores empresariais exigem atenção especializada. Tempo de inatividade representa prejuízo direto para o negócio. Manutenção preventiva regular (limpeza, verificação de discos, logs de erro) é essencial para evitar falhas catastróficas. Oferecemos contratos de manutenção para empresas.",
  },
  {
    icon: Printer,
    nome: "Impressoras e Periféricos",
    desc: "Impressoras jato de tinta, laser, multifuncionais, scanners",
    servicos: ["Configuração e instalação", "Limpeza de cabeçote", "Diagnóstico de falhas de impressão", "Configuração de rede", "Instalação de drivers"],
    cenarios: "Impressoras requerem manutenção regular para funcionar corretamente. Cabeçotes entupidos por falta de uso, toners falsificados que danificam o mecanismo e drivers incompatíveis são problemas recorrentes.",
  },
  {
    icon: Radio,
    nome: "Equipamentos de Áudio e Som",
    desc: "Caixas de som, receivers, amplificadores, equipamentos de som profissional",
    servicos: ["Diagnóstico de áudio", "Reparo de amplificadores", "Configuração de sistemas de som", "Troca de componentes eletrônicos"],
    cenarios: "Equipamentos de áudio podem apresentar ruídos, chiados ou perda total de som. Capacitores eletrolíticos são os componentes que mais falham com o tempo. Em muitos casos, a troca de poucos componentes restaura o equipamento completamente.",
  },
];

const EquipamentosAtendidos = () => {
  useEffect(() => {
    document.title = "Equipamentos Atendidos | Assistência Técnica Curitiba - Computadores, Notebooks, TVs";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content",
        "Conheça todos os equipamentos que atendemos em Curitiba: computadores, notebooks, Smart TVs, roteadores, servidores e mais. Diagnóstico profissional e reparo com garantia."
      );
    }
    trackPageView("/equipamentos-atendidos", "Equipamentos Atendidos");
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Preciso de assistência técnica para meu equipamento.")}`;
  const handleCTA = (label: string) => trackCTAClick("whatsapp", `equipamentos-${label}`);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Equipamentos Atendidos | Assistência Técnica Curitiba - Computadores, Notebooks, TVs" description="Conheça todos os equipamentos que atendemos em Curitiba: computadores, notebooks, Smart TVs, roteadores, servidores e mais. Diagnóstico profissional e reparo com garantia." path="/equipamentos-atendidos" breadcrumbs={[{ name: "Início", path: "/" }, { name: "Equipamentos Atendidos", path: "/equipamentos-atendidos" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: "https://tecnico.curitiba.br/" },
          { "@type": "ListItem", position: 2, name: "Equipamentos Atendidos", item: "https://tecnico.curitiba.br/equipamentos-atendidos" },
        ],
      })}} />
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Equipamentos Atendidos" }]} />

      <main>
        {/* HERO */}
        <section className="relative hero-gradient pt-10 pb-10 md:pt-12 md:pb-12">
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                Equipamentos Que Atendemos em Curitiba e Região
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Trabalhamos com computadores, notebooks, Smart TVs, roteadores, servidores e muito mais. Cada tipo de equipamento exige conhecimento específico — e nós temos experiência com todos.
              </p>
              <Button variant="heroWhatsapp" size="lg" asChild onClick={() => handleCTA("hero")}>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" /> Falar sobre o meu equipamento
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Imagem de equipamentos */}
        <section className="py-0 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto -mt-8 relative z-20">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img src={IMAGES.ferramentas} alt={IMAGES.ferramentasAlt} className="w-full h-48 md:h-64 object-cover" loading="eager" width="800" height="400" />
              </div>
            </div>
          </div>
        </section>

        {/* LISTA DE EQUIPAMENTOS */}
        {equipamentos.map((eq, i) => {
          const Icon = eq.icon;
          return (
            <section key={i} className={`py-8 md:py-10 ${i % 2 === 0 ? "bg-background" : "bg-secondary"}`}>
              <div className="container mx-auto">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary rounded-xl p-3">
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-primary">{eq.nome}</h2>
                      <p className="text-muted-foreground">{eq.desc}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-foreground mb-3">Serviços disponíveis:</h3>
                      <ul className="space-y-2">
                        {eq.servicos.map((s, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-3">Cenários comuns:</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{eq.cenarios}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* BLOCO DE INTELIGÊNCIA */}
        <section className="py-8 md:py-10 bg-accent/5">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Entenda Antes de Chamar o Técnico
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: AlertTriangle, title: "Diagnóstico ≠ Execução", desc: "O diagnóstico identifica o problema. O reparo só é feito com sua aprovação. São etapas distintas com custos separados." },
                  { icon: Wrench, title: "Por Que Diagnóstico Tem Custo", desc: "Envolve tempo técnico, ferramentas profissionais e conhecimento especializado. Diagnosticar corretamente evita gastos desnecessários." },
                  { icon: AlertTriangle, title: "Problemas Simples Podem Ser Complexos", desc: "Um notebook 'que não liga' pode ter desde um carregador defeituoso até uma placa mãe danificada. Só o diagnóstico revela." },
                  { icon: Cpu, title: "Quando Compensa Reparar vs Trocar", desc: "Se o reparo custa mais de 40-50% do valor de um equipamento novo equivalente, geralmente não compensa. O técnico orienta sobre isso." },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="bg-background rounded-xl p-5 flex gap-4">
                      <div className="bg-primary rounded-lg p-2 h-fit flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-10 md:py-20 bg-primary">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Seu Equipamento Precisa de Atenção?
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Não importa o tipo de equipamento — temos a experiência e as ferramentas certas para diagnosticar e resolver.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="heroWhatsapp" size="lg" asChild onClick={() => handleCTA("cta-final")}>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" /> Chamar no WhatsApp
                </a>
              </Button>
              <Button variant="heroCta" size="lg" asChild>
                <Link to="/servicos">
                  Ver Serviços <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default EquipamentosAtendidos;
