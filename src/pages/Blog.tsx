import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { trackPageView } from "@/lib/analytics";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  // Artigos de autoridade - Cluster Manutenção
  {
    slug: "quando-trocar-computador-ou-reparar",
    title: "Quando Trocar o Computador e Quando Vale a Pena Reparar (Guia Técnico)",
    excerpt: "PC antigo, lento ou com defeito? Descubra os critérios técnicos que definem se vale investir no reparo ou se é hora de partir para um equipamento novo.",
    date: "2026-04-06",
    readTime: "11 min",
    category: "Manutenção",
  },
  {
    slug: "erros-comuns-upgrade-computador",
    title: "5 Erros Comuns ao Fazer Upgrade no Computador (e Como Evitar Prejuízo)",
    excerpt: "Comprar RAM incompatível, instalar SSD errado, forçar peças no slot — veja os erros mais frequentes que causam curto-circuito e prejuízo financeiro.",
    date: "2026-04-06",
    readTime: "8 min",
    category: "Manutenção",
  },
  {
    slug: "manutencao-preventiva-computador-guia",
    title: "Manutenção Preventiva do Computador: O Guia Que Evita 80% dos Problemas",
    excerpt: "Limpeza de cooler, pasta térmica, verificação de disco, backup automático — rotinas simples que prolongam a vida útil do seu PC e evitam chamados técnicos.",
    date: "2026-04-06",
    readTime: "9 min",
    category: "Manutenção",
  },
  {
    slug: "diagnostico-tecnico-por-que-e-pago",
    title: "Por Que o Diagnóstico Técnico é Pago? Entenda de Uma Vez",
    excerpt: "Muita gente pergunta: 'Por que cobram para olhar?' Explicamos por que o diagnóstico tem custo, o que ele envolve e como evita prejuízos maiores.",
    date: "2026-04-05",
    readTime: "7 min",
    category: "Atendimento",
  },
  {
    slug: "como-proteger-computador-golpes-internet",
    title: "Como Proteger Seu Computador Contra Golpes e Fraudes na Internet",
    excerpt: "Links falsos, e-mails de phishing, extensões maliciosas — aprenda a se proteger dos golpes mais comuns e quando procurar ajuda profissional.",
    date: "2026-04-05",
    readTime: "10 min",
    category: "Segurança",
  },
  // Novos artigos SEO cauda longa
  {
    slug: "computador-lento-causas-solucoes",
    title: "Computador Lento: 12 Causas Reais e Como Resolver (Guia Técnico 2026)",
    excerpt: "Seu PC demora para abrir programas, trava no navegador ou leva minutos para iniciar? Descubra as 12 causas mais comuns e o que realmente funciona para resolver — com ou sem técnico.",
    date: "2026-04-06",
    readTime: "12 min",
    category: "Manutenção",
  },
  {
    slug: "como-saber-se-pc-tem-virus-malware",
    title: "Como Saber se Seu PC Tem Vírus ou Malware: Sinais, Testes e Soluções",
    excerpt: "Pop-ups, lentidão extrema, programas desconhecidos. Aprenda a identificar se seu computador foi infectado e o que fazer antes de perder dados ou piorar o problema.",
    date: "2026-04-05",
    readTime: "10 min",
    category: "Segurança",
  },
  {
    slug: "notebook-nao-liga-o-que-fazer",
    title: "Notebook Não Liga: O Que Pode Ser e O Que Fazer Antes de Desesperar",
    excerpt: "Apertou o botão e nada aconteceu? Tela preta, LED piscando ou som de ventilador sem imagem? Veja as causas mais comuns e quando vale a pena levar ao técnico.",
    date: "2026-04-04",
    readTime: "9 min",
    category: "Manutenção",
  },
  // CFTV
  {
    slug: "diferenca-camera-wifi-dvr-qual-escolher",
    title: "Câmera Wi-Fi ou DVR: Qual a Diferença e Qual Escolher?",
    excerpt: "Entenda as diferenças técnicas entre câmeras Wi-Fi e sistemas DVR com cabo. Veja qual opção oferece mais segurança, estabilidade e custo-benefício para seu imóvel.",
    date: "2026-02-14",
    readTime: "8 min",
    category: "CFTV",
  },
  {
    slug: "seguranca-casas-praia-itapoa-guaratuba",
    title: "Segurança em Casas de Praia: Como Proteger Seu Imóvel em Itapoá e Guaratuba",
    excerpt: "Imóveis de veraneio ficam meses desocupados e são alvos fáceis. Descubra como câmeras com acesso remoto protegem sua casa de praia no litoral do Paraná.",
    date: "2026-02-12",
    readTime: "7 min",
    category: "CFTV",
  },
  {
    slug: "como-escolher-melhor-kit-cameras-seguranca",
    title: "Como Escolher o Melhor Kit de Câmeras de Segurança Para Sua Casa ou Comércio",
    excerpt: "Guia completo: quantidade de câmeras, resolução, visão noturna, armazenamento e instalação. Tudo o que você precisa saber antes de comprar um kit de CFTV.",
    date: "2026-02-10",
    readTime: "9 min",
    category: "CFTV",
  },
  {
    slug: "monitoramento-24-horas-como-funciona",
    title: "Monitoramento 24 Horas: Como Funciona e Por Que Você Precisa",
    excerpt: "Saiba como funciona a gravação contínua, o acesso remoto pelo celular e por que o monitoramento 24h é essencial para a segurança do seu patrimônio.",
    date: "2026-02-08",
    readTime: "6 min",
    category: "CFTV",
  },
  {
    slug: "equipe-especializada-cftv-litoral-parana",
    title: "Equipe Especializada em CFTV no Litoral do Paraná: Por Que Contratar Profissionais",
    excerpt: "Instalação amadora pode comprometer toda a segurança. Conheça os riscos e veja por que uma equipe especializada faz diferença na instalação de câmeras no litoral.",
    date: "2026-02-06",
    readTime: "7 min",
    category: "CFTV",
  },
  // Windows 11
  {
    slug: "windows-11-atualizacao-kb5074105-novidades",
    title: "Windows 11 KB5074105: Todas as Novidades da Atualização de Janeiro 2026",
    excerpt: "A Microsoft liberou a atualização KB5074105 para Windows 11 25H2 e 24H2 com recursos inéditos: Smart App Control configurável, sincronização celular-PC, melhorias no Windows Hello e correções críticas.",
    date: "2026-01-30",
    readTime: "10 min",
    category: "Windows 11",
    image: "/assets/blog/windows-11-kb5074105-update.jpg",
  },
  {
    slug: "windows-11-vale-a-pena-atualizar",
    title: "Windows 11: Vale a Pena Atualizar? Guia Completo 2026",
    excerpt: "Análise detalhada do Windows 11: requisitos, novidades, vantagens e desvantagens. Descubra se seu computador está pronto para a atualização.",
    date: "2026-01-15",
    readTime: "8 min",
    category: "Windows 11",
  },
  {
    slug: "como-instalar-windows-11-pc-antigo",
    title: "Como Instalar Windows 11 em PC Antigo Sem TPM 2.0",
    excerpt: "Passo a passo para instalar o Windows 11 em computadores que não atendem aos requisitos oficiais. Método seguro e testado por técnicos.",
    date: "2024-01-14",
    readTime: "10 min",
    category: "Windows 11",
  },
  {
    slug: "windows-11-lento-como-resolver",
    title: "Windows 11 Lento? 10 Soluções Para Acelerar Seu PC",
    excerpt: "Seu Windows 11 está travando? Confira 10 dicas práticas para otimizar o desempenho e deixar o sistema mais rápido sem gastar nada.",
    date: "2024-01-12",
    readTime: "7 min",
    category: "Windows 11",
  },
  // Office 365
  {
    slug: "office-365-guia-completo-empresas",
    title: "Office 365 Para Empresas: Guia Completo de Produtividade",
    excerpt: "Como o Microsoft 365 pode transformar a produtividade da sua empresa. Teams, SharePoint, OneDrive e todas as ferramentas explicadas.",
    date: "2024-01-11",
    readTime: "12 min",
    category: "Office 365",
  },
  {
    slug: "office-365-vs-office-tradicional",
    title: "Office 365 vs Office Tradicional: Qual Escolher?",
    excerpt: "Comparativo completo entre assinatura Office 365 e licença perpétua. Veja qual opção faz mais sentido para você ou sua empresa.",
    date: "2024-01-10",
    readTime: "6 min",
    category: "Office 365",
  },
  {
    slug: "configurar-email-outlook-office-365",
    title: "Como Configurar Email Empresarial no Outlook 365",
    excerpt: "Tutorial completo para configurar seu email corporativo no Outlook. Inclui sincronização com celular e backup automático na nuvem.",
    date: "2024-01-09",
    readTime: "5 min",
    category: "Office 365",
  },
  // Segurança Digital
  {
    slug: "seguranca-digital-empresas-guia-2024",
    title: "Segurança Digital Para Empresas: Guia Essencial 2024",
    excerpt: "Proteja sua empresa contra ataques cibernéticos. Firewall, antivírus corporativo, backup e políticas de segurança explicados.",
    date: "2024-01-08",
    readTime: "15 min",
    category: "Segurança",
  },
  {
    slug: "ransomware-como-proteger-empresa",
    title: "Ransomware: Como Proteger Sua Empresa de Sequestro Digital",
    excerpt: "Entenda como funcionam os ataques de ransomware e implemente proteções eficazes. Casos reais e medidas preventivas essenciais.",
    date: "2024-01-07",
    readTime: "10 min",
    category: "Segurança",
  },
  {
    slug: "phishing-como-identificar-golpes",
    title: "Phishing: Como Identificar e Evitar Golpes por Email",
    excerpt: "Aprenda a reconhecer tentativas de phishing e proteja seus dados. Exemplos reais de golpes e como treinar sua equipe.",
    date: "2024-01-06",
    readTime: "7 min",
    category: "Segurança",
  },
  {
    slug: "backup-nuvem-empresas-qual-escolher",
    title: "Backup na Nuvem Para Empresas: Qual Serviço Escolher?",
    excerpt: "Comparativo entre OneDrive, Google Drive, Dropbox Business e soluções profissionais. Quanto custa e qual o melhor para seu negócio.",
    date: "2024-01-05",
    readTime: "8 min",
    category: "Segurança",
  },
  {
    slug: "como-escolher-um-bom-antivirus",
    title: "Como Escolher um Bom Antivírus em 2024 (Sem Cair em Pegadinhas)",
    excerpt: "Guia prático para escolher antivírus para Windows e notebook: o que realmente importa, recursos essenciais, opções gratuitas x pagas e sinais de falso antivírus.",
    date: "2024-02-02",
    readTime: "7 min",
    category: "Segurança",
  },
  // Artigos anteriores
  {
    slug: "como-deixar-computador-mais-rapido",
    title: "Como Deixar o Computador Mais Rápido: 7 Dicas Práticas",
    excerpt: "Seu PC está lento? Descubra 7 técnicas simples que você pode aplicar hoje mesmo para melhorar a velocidade do seu computador sem gastar nada.",
    date: "2024-01-04",
    readTime: "5 min",
    category: "Dicas",
  },
  {
    slug: "dicas-manter-notebook-funcionando-bem",
    title: "Dicas Para Manter o Notebook Funcionando Bem (E Evitar Assistência)",
    excerpt: "Cuidados simples que aumentam a vida útil do notebook: limpeza, bateria, armazenamento, temperaturas, atualizações e hábitos que evitam travamentos.",
    date: "2024-02-01",
    readTime: "6 min",
    category: "Manutenção",
  },
  {
    slug: "sinais-computador-com-virus",
    title: "5 Sinais de Que Seu Computador Está com Vírus",
    excerpt: "Aprenda a identificar os principais sintomas de uma infecção por vírus ou malware e saiba quando é hora de procurar um técnico especializado.",
    date: "2024-01-03",
    readTime: "4 min",
    category: "Segurança",
  },
  {
    slug: "quando-trocar-hd-por-ssd",
    title: "Quando Vale a Pena Trocar o HD por SSD?",
    excerpt: "Entenda as vantagens do SSD sobre o HD tradicional, quanto custa o upgrade e se essa mudança faz sentido para o seu uso do computador.",
    date: "2024-01-02",
    readTime: "6 min",
    category: "Hardware",
  },
  {
    slug: "backup-como-proteger-seus-arquivos",
    title: "Backup: Como Proteger Seus Arquivos Importantes",
    excerpt: "Não espere perder seus dados para fazer backup. Conheça as melhores práticas para manter seus arquivos seguros usando métodos simples e eficientes.",
    date: "2024-01-01",
    readTime: "5 min",
    category: "Segurança",
  },
  {
    slug: "notebook-superaquecendo-o-que-fazer",
    title: "Notebook Superaquecendo: O Que Fazer?",
    excerpt: "Seu notebook esquenta demais e desliga sozinho? Descubra as causas do superaquecimento e como resolver esse problema comum.",
    date: "2023-12-28",
    readTime: "4 min",
    category: "Manutenção",
  },
  {
    slug: "wifi-lento-como-melhorar",
    title: "Wi-Fi Lento em Casa? Veja Como Melhorar o Sinal",
    excerpt: "Dicas práticas para melhorar a cobertura e velocidade da sua internet sem fio. Do posicionamento do roteador às configurações ideais.",
    date: "2023-12-25",
    readTime: "5 min",
    category: "Redes",
  },
];

const categories = ["Todos", "Manutenção", "Segurança", "CFTV", "Windows 11", "Office 365", "Hardware", "Dicas", "Redes"];

const Blog = () => {
  useEffect(() => {
    document.title = "Blog | Dicas de Informática, Windows 11, Office 365 | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Dicas de informática, tutoriais Windows 11, Office 365, segurança digital para empresas. Artigos técnicos e práticos do Técnico Curitiba."
      );
    }
    trackPageView("/blog", "Blog");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Blog | Dicas de Informática, Windows 11, Office 365 | Técnico Curitiba" description="Dicas de informática, tutoriais Windows 11, Office 365, segurança digital para empresas. Artigos técnicos e práticos do Técnico Curitiba." path="/blog" />
      <JsonLdSchema />
      <Header />
      <main>
        {/* Hero */}
        <section className="hero-gradient pt-10 pb-10 md:pt-12 md:pb-12">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
                Blog de Informática
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Windows 11, Office 365, segurança digital e muito mais para você e sua empresa
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 bg-secondary border-b">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {blogPosts.map((post, index) => (
                  <article
                    key={index}
                    className="bg-secondary rounded-xl p-6 hover:shadow-lg transition-all border border-transparent hover:border-accent/20"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <h2 className="text-xl md:text-2xl font-bold text-primary mb-2 hover:text-accent transition-colors">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>
                        
                        <p className="text-muted-foreground mb-4">
                          {post.excerpt}
                        </p>
                        
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
                        >
                          Ler artigo completo
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Precisa de Ajuda com Seu Computador?
              </h2>
              <p className="text-muted-foreground mb-6">
                Se as dicas do blog não resolveram seu problema, fale com um técnico especializado
              </p>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Falar com Técnico
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default Blog;