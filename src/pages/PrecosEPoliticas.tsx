import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppChat } from "@/components/WhatsAppChat";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { trackPageView } from "@/lib/analytics";
import { 
  Check, 
  AlertTriangle, 
  Clock, 
  Truck, 
  CreditCard, 
  FileText, 
  Monitor,
  Shield,
  HardDrive,
  Wrench,
  Wifi,
  Database,
  Building2,
  Headphones,
  MapPin,
  Star,
  BadgeCheck,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "5541997452053";

const servicosPrecos = [
  {
    categoria: "Atendimento Presencial",
    icon: MapPin,
    servicos: [
      { nome: "Visita Técnica Presencial", valor: "R$ 99,99 / 30 min", obs: "Cobrança proporcional ao tempo" },
      { nome: "Visita Técnica - Sem Compromisso", valor: "R$ 100,00", obs: "Até 30 min, não obriga reparo" },
      { nome: "Visita Técnica - Com Compromisso", valor: "Incluso no reparo", obs: "Se problema identificado e aprovado" },
    ]
  },
  {
    categoria: "Formatação e Sistema",
    icon: Monitor,
    servicos: [
      { nome: "Formatação Completa", valor: "A partir de R$ 150", obs: "Windows + drivers + programas" },
      { nome: "Instalação Windows 11", valor: "A partir de R$ 150", obs: "Licença não inclusa" },
      { nome: "Reinstalação de Sistema", valor: "A partir de R$ 120", obs: "Mantendo dados do usuário" },
      { nome: "Configuração Inicial PC Novo", valor: "A partir de R$ 80", obs: "Programas + conta + backup" },
    ]
  },
  {
    categoria: "Segurança e Vírus",
    icon: Shield,
    servicos: [
      { nome: "Remoção de Vírus Simples", valor: "A partir de R$ 99,99", obs: "Malwares comuns" },
      { nome: "Remoção Vírus Complexo", valor: "A partir de R$ 150", obs: "Ransomware, rootkits" },
      { nome: "Instalação Antivírus", valor: "A partir de R$ 50", obs: "Gratuito ou licenciado" },
      { nome: "Limpeza Completa + Proteção", valor: "A partir de R$ 180", obs: "Formatação + antivírus" },
    ]
  },
  {
    categoria: "Hardware e Upgrades",
    icon: HardDrive,
    servicos: [
      { nome: "Upgrade SSD (só mão de obra)", valor: "A partir de R$ 80", obs: "Peça não inclusa" },
      { nome: "Upgrade Memória RAM", valor: "A partir de R$ 60", obs: "Peça não inclusa" },
      { nome: "Troca de HD por SSD", valor: "A partir de R$ 120", obs: "Clonagem incluída" },
      { nome: "Limpeza Interna + Pasta Térmica", valor: "A partir de R$ 100", obs: "Notebook ou desktop" },
    ]
  },
  {
    categoria: "Conserto e Reparo",
    icon: Wrench,
    servicos: [
      { nome: "Diagnóstico Presencial", valor: "R$ 99,99", obs: "Abatido do reparo" },
      { nome: "Diagnóstico com Coleta", valor: "R$ 90-100", obs: "Coleta + entrega inclusas" },
      { nome: "Reparo de Notebook", valor: "A partir de R$ 150", obs: "Depende do defeito" },
      { nome: "Troca de Tela Notebook", valor: "Sob orçamento", obs: "Peça + mão de obra" },
      { nome: "Troca de Teclado Notebook", valor: "A partir de R$ 120", obs: "Peça não inclusa" },
    ]
  },
  {
    categoria: "Redes e Internet",
    icon: Wifi,
    servicos: [
      { nome: "Configuração de Roteador", valor: "A partir de R$ 80", obs: "Wi-Fi + segurança" },
      { nome: "Instalação Rede Cabeada", valor: "Sob orçamento", obs: "Por ponto de rede" },
      { nome: "Extensão de Sinal Wi-Fi", valor: "A partir de R$ 100", obs: "Repetidor/mesh" },
      { nome: "Configuração VPN", valor: "A partir de R$ 100", obs: "Empresarial ou residencial" },
    ]
  },
  {
    categoria: "Backup e Dados",
    icon: Database,
    servicos: [
      { nome: "Backup de Dados", valor: "A partir de R$ 80", obs: "Até 100GB" },
      { nome: "Recuperação de Dados", valor: "A partir de R$ 150", obs: "HD funcionando" },
      { nome: "Recuperação Dados HD Danificado", valor: "Sob orçamento", obs: "Análise prévia" },
      { nome: "Configuração Backup Nuvem", valor: "A partir de R$ 80", obs: "OneDrive, Google Drive" },
    ]
  },
  {
    categoria: "Suporte Remoto",
    icon: Headphones,
    servicos: [
      { nome: "Suporte Remoto Básico", valor: "A partir de R$ 79,99", obs: "Problemas simples" },
      { nome: "Suporte Remoto Avançado", valor: "A partir de R$ 120", obs: "Configurações complexas" },
      { nome: "Hora Técnica Remota", valor: "R$ 99,99 / hora", obs: "Para empresas" },
    ]
  },
  {
    categoria: "Empresas",
    icon: Building2,
    servicos: [
      { nome: "Contrato Mensal - Básico", valor: "A partir de R$ 300/mês", obs: "Até 5 equipamentos" },
      { nome: "Contrato Mensal - Profissional", valor: "A partir de R$ 600/mês", obs: "Até 15 equipamentos" },
      { nome: "Hora Técnica Empresarial", valor: "R$ 120/hora", obs: "Sem contrato" },
      { nome: "Consultoria TI", valor: "Sob orçamento", obs: "Projetos específicos" },
    ]
  },
];

const modalidades = [
  {
    titulo: "Visita Técnica - Sem Compromisso",
    valor: "R$ 100,00",
    descricao: "Ideal quando você só quer saber o que está acontecendo",
    itens: [
      "Duração: até 30 minutos",
      "Diagnóstico no local",
      "Não obriga reparo",
      "Se não aprovar, paga apenas a visita"
    ],
    destaque: false
  },
  {
    titulo: "Visita Técnica - Com Compromisso",
    valor: "Incluído no reparo",
    descricao: "Para quando você já quer resolver o problema",
    itens: [
      "Problema identificado = reparo realizado",
      "Você define limite de valor",
      "Orçamento acima do limite = consulta prévia",
      "Paga apenas o reparo aprovado"
    ],
    destaque: true
  },
  {
    titulo: "Diagnóstico com Coleta",
    valor: "Até R$ 300 pré-aprovado",
    descricao: "Para problemas que precisam de bancada",
    itens: [
      "Coleta e entrega inclusas",
      "Diagnóstico completo em laboratório",
      "Reparos até R$ 300 executados automaticamente",
      "Acima de R$ 300 = consulta prévia"
    ],
    destaque: false
  }
];

const PrecosEPoliticas = () => {
  useEffect(() => {
    document.title = "Tabela de Preços | Técnico de Informática Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Tabela completa de preços de serviços de informática em Curitiba. Visita técnica R$99,99/30min, formatação a partir de R$150. Transparência total nos valores."
      );
    }
    trackPageView("/precos-e-politicas", "Preços e Políticas");
  }, []);

  const whatsappMessage = "Olá! Vi a tabela de preços no site e gostaria de solicitar um orçamento para [DESCREVA O SERVIÇO].";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <Header />
      <main>
        {/* Hero */}
        <section className="hero-gradient pt-24 pb-12 md:pt-28 md:pb-16">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
                Tabela de Preços
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6">
                Transparência total nos valores • Sem surpresas na hora de pagar
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-accent" />
                  <span className="text-white text-sm">Preços fixos</span>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2 flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  <span className="text-white text-sm">Garantia por escrito</span>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  <span className="text-white text-sm">Nota fiscal</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Link para Como Funciona */}
        <section className="py-6 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center bg-background rounded-xl p-6 border border-accent/20">
              <p className="text-muted-foreground mb-3">
                Não entendeu como funciona o atendimento? Veja o passo a passo completo.
              </p>
              <Link to="/como-funciona" className="inline-flex items-center gap-2 text-accent font-semibold hover:underline">
                Ver Como Funciona →
              </Link>
            </div>
          </div>
        </section>

        {/* Modalidades de Atendimento */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
                Modalidades de Atendimento
              </h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Escolha a modalidade que melhor se encaixa na sua necessidade
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {modalidades.map((mod, index) => (
                  <div
                    key={index}
                    className={`bg-background rounded-xl p-6 ${
                      mod.destaque ? "ring-2 ring-accent shadow-lg" : ""
                    }`}
                  >
                    {mod.destaque && (
                      <div className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                        MAIS POPULAR
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-primary mb-2">{mod.titulo}</h3>
                    <div className="text-2xl font-bold text-accent mb-2">{mod.valor}</div>
                    <p className="text-sm text-muted-foreground mb-4">{mod.descricao}</p>
                    <ul className="space-y-2">
                      {mod.itens.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tabela Completa de Preços */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Tabela Completa de Serviços
              </h2>

              <div className="space-y-8">
                {servicosPrecos.map((categoria, catIndex) => {
                  const Icon = categoria.icon;
                  return (
                    <div key={catIndex} className="bg-secondary rounded-xl overflow-hidden">
                      <div className="bg-primary px-6 py-4 flex items-center gap-3">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                        <h3 className="text-lg font-bold text-primary-foreground">
                          {categoria.categoria}
                        </h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-secondary/50">
                            <tr>
                              <th className="text-left p-4 font-semibold text-foreground">Serviço</th>
                              <th className="text-left p-4 font-semibold text-foreground">Valor</th>
                              <th className="text-left p-4 font-semibold text-foreground hidden sm:table-cell">Observação</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {categoria.servicos.map((servico, servIndex) => (
                              <tr key={servIndex} className="hover:bg-background/50 transition-colors">
                                <td className="p-4">
                                  <span className="font-medium text-foreground">{servico.nome}</span>
                                  <span className="block sm:hidden text-xs text-muted-foreground mt-1">{servico.obs}</span>
                                </td>
                                <td className="p-4 text-accent font-bold whitespace-nowrap">{servico.valor}</td>
                                <td className="p-4 text-muted-foreground text-sm hidden sm:table-cell">{servico.obs}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-sm text-muted-foreground mt-6 text-center">
                * Valores sujeitos a variação conforme complexidade. Orçamento sempre informado antes do serviço.
              </p>
            </div>
          </div>
        </section>

        {/* Políticas */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Políticas de Atendimento
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Visita Técnica */}
                <div className="bg-background rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary rounded-lg p-2">
                      <Clock className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Visita Técnica Presencial</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Cobrança de R$ 99,99 a cada 30 minutos de atendimento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Serviços rápidos (formatação, vírus) geralmente 30-60 min</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Tempo cronometrado a partir da chegada do técnico</span>
                    </li>
                  </ul>
                </div>

                {/* Coleta e Entrega */}
                <div className="bg-background rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary rounded-lg p-2">
                      <Truck className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Diagnóstico com Coleta</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Para reparos que exigem bancada ou peças específicas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Orçamento pré-aprovado de até R$ 300 em reparos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Coleta e entrega inclusas no valor do reparo</span>
                    </li>
                  </ul>
                </div>

                {/* Cancelamento */}
                <div className="bg-background rounded-xl p-6 border-2 border-accent/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-accent rounded-lg p-2">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Política de Cancelamento</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-accent/10 rounded-lg p-4">
                      <p className="font-semibold text-foreground mb-2">Desistência após agendamento de coleta:</p>
                      <p className="text-muted-foreground">
                        Será cobrada taxa de diagnóstico de <strong className="text-accent">R$ 90 a R$ 100</strong>, 
                        que inclui logística de coleta e entrega do equipamento.
                      </p>
                    </div>
                    <div className="bg-accent/10 rounded-lg p-4">
                      <p className="font-semibold text-foreground mb-2">Visita técnica presencial:</p>
                      <p className="text-muted-foreground">
                        Cobrança proporcional ao tempo decorrido 
                        (<strong className="text-accent">R$ 99,99 por cada 30 minutos</strong>).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pagamento */}
                <div className="bg-background rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary rounded-lg p-2">
                      <CreditCard className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Formas de Pagamento</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">PIX (pagamento imediato - preferencial)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Dinheiro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Cartão de crédito e débito</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Pagamento faturado (empresas com contrato)</span>
                    </li>
                  </ul>
                </div>

                {/* Nota Fiscal */}
                <div className="bg-background rounded-xl p-6 md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary rounded-lg p-2">
                      <FileText className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Nota Fiscal e Garantia</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Emitimos nota fiscal de serviços para todos os atendimentos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Nota fiscal de produto para peças quando aplicável</span>
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Garantia por escrito em todos os serviços (30 a 90 dias)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Peças seguem garantia do fabricante</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MODALIDADE: VISITA POR TEMPO */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
                Modalidade 1 — Visita Técnica por Tempo
              </h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Ideal para serviços rápidos como formatação, upgrade, configuração de rede e remoção de vírus.
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { tempo: "15 min", valor: "R$ 69" },
                  { tempo: "30 min", valor: "R$ 99" },
                  { tempo: "1 hora", valor: "R$ 169" },
                  { tempo: "2 horas", valor: "R$ 199" },
                  { tempo: "3 horas", valor: "R$ 369" },
                ].map((t, i) => (
                  <div key={i} className="bg-secondary rounded-xl p-4 text-center">
                    <span className="text-sm text-muted-foreground">{t.tempo}</span>
                    <div className="text-xl font-bold text-accent mt-1">{t.valor}</div>
                  </div>
                ))}
              </div>
              <div className="bg-accent/5 rounded-xl p-4 mt-6 border border-accent/20">
                <p className="text-sm text-muted-foreground text-center">
                  <strong className="text-foreground">Como funciona:</strong> O técnico permanece o tempo necessário para resolver. A cobrança é pelo tempo contratado. O foco é na resolução rápida e eficiente do problema.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MODALIDADE: DIAGNÓSTICO COM COMPROMISSO */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
                Modalidade 2 — Diagnóstico com Compromisso
              </h2>
              <div className="bg-background rounded-2xl p-6 md:p-8 border-2 border-accent/20">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-primary mb-3">Como funciona:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        Diagnóstico custa <strong>R$ 90</strong> em caso de desistência
                      </li>
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        <strong>NÃO</strong> existe orçamento gratuito presencial
                      </li>
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        Valor mínimo pré-aprovado: <strong>R$ 300 a R$ 400</strong>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        Se o reparo estiver dentro do pré-aprovado, é realizado automaticamente
                      </li>
                    </ul>
                  </div>
                  <div className="bg-accent/10 rounded-xl p-5">
                    <h3 className="font-bold text-accent mb-2">Importante entender:</h3>
                    <p className="text-sm text-muted-foreground">
                      Estimativas gratuitas são feitas somente via WhatsApp. O diagnóstico presencial envolve deslocamento, tempo técnico e ferramentas profissionais — por isso tem custo. Se o reparo for aprovado, o valor do diagnóstico é abatido do total.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-center mt-4">
                <Link to="/diagnostico-tecnico" className="text-accent text-sm hover:underline font-medium">
                  Entenda tudo sobre o diagnóstico técnico →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* MODALIDADE: LABORATÓRIO */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
                Modalidade 3 — Laboratório (Coleta e Entrega)
              </h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Para reparos que exigem bancada, peças específicas ou tempo estendido de análise.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-secondary rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-3">Aplicável para:</h3>
                  <ul className="space-y-2">
                    {["TVs (LED, OLED, Smart)", "Placas mãe de notebooks", "Notebooks com defeito grave", "Equipamentos complexos", "Recuperação de dados em HD danificado"].map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-secondary rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-3">Detalhes:</h3>
                  <ul className="space-y-2">
                    {[
                      "Prazo médio: 15 a 60 dias",
                      "Pode variar conforme complexidade e peças",
                      "Inclui coleta e entrega no seu endereço",
                      "Recibo detalhado na coleta",
                      "Atualizações via WhatsApp",
                    ].map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-center mt-4">
                <Link to="/coleta-e-entrega" className="text-accent text-sm hover:underline font-medium">
                  Saiba mais sobre o serviço de coleta e entrega →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* MODALIDADE: CASOS COMPLEXOS */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
                Modalidade 4 — Casos Complexos
              </h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Alguns problemas exigem análise profunda e conhecimento avançado. Entenda o que são casos complexos e por que o prazo pode ser maior.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Curto em Placa Mãe", desc: "Curto-circuito causado por líquido, surto elétrico ou peça incompatível. Exige micro-solda e testes componente a componente." },
                  { title: "GPU Desgastada", desc: "Placa de vídeo com desgaste por uso intenso (jogos, mineração). Pode exigir reballing ou substituição de chips." },
                  { title: "Erro em Upgrade", desc: "Dano causado por instalação incorreta de peças (RAM, SSD, processador). Trilhas rompidas, slots danificados." },
                  { title: "Placa Danificada por Ferramenta", desc: "Uso de chaves inadequadas, facas ou objetos pontiagudos que riscaram trilhas ou cortaram cabos flat." },
                  { title: "Reballing de BGA", desc: "Processo de refusão das esferas de solda em chips BGA. Aplicável em GPUs e chipsets com problema de contato." },
                  { title: "Fila de Atendimento", desc: "Casos complexos entram em fila conforme ordem de chegada. O prazo depende da quantidade de equipamentos em análise." },
                ].map((c, i) => (
                  <div key={i} className="bg-background rounded-xl p-5">
                    <AlertTriangle className="h-5 w-5 text-accent mb-2" />
                    <h3 className="font-bold text-primary text-sm mb-1">{c.title}</h3>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-center mt-4">
                <Link to="/problemas-reais-e-casos" className="text-accent text-sm hover:underline font-medium">
                  Ver exemplos reais de casos complexos →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Solicite Seu Orçamento Agora
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                Envie os detalhes do seu problema e receba um orçamento personalizado
              </p>
              <Button variant="heroWhatsapp" size="lg" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Solicitar Orçamento via WhatsApp
                </a>
              </Button>
              <p className="text-primary-foreground/60 text-sm mt-4">
                Fale conosco pelo WhatsApp
              </p>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <RealImageSection imageKey="bancadaTecnica" secondaryImageKey="ferramentas" layout="duo" caption="Bancada técnica profissional equipada" secondaryCaption="Ferramentas especializadas para cada serviço" />
      <InterlinkingBlock />
      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default PrecosEPoliticas;
