import { useEffect, useState, useMemo } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { AnimatedSection } from "@/components/AnimatedSection";
import { FloatingParticles } from "@/components/FloatingParticles";
import { trackPageView } from "@/lib/analytics";
import { IMAGES } from "@/lib/images";
import { problemaPagesData } from "@/lib/problemaPagesData";
import {
  Calendar, Clock, ArrowRight, Search, Sparkles, Cpu, Monitor,
  Smartphone, Tv, Wrench, Shield, Wifi, HardDrive, Printer,
  Radio, Zap, TrendingUp, BookOpen, ChevronDown, Layers, Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ─── Blog Posts Data ───
const blogPosts = [
  { slug: "quando-trocar-computador-ou-reparar", title: "Quando Trocar o Computador e Quando Vale a Pena Reparar (Guia Técnico)", excerpt: "PC antigo, lento ou com defeito? Descubra os critérios técnicos que definem se vale investir no reparo ou se é hora de partir para um equipamento novo.", date: "2026-04-06", readTime: "11 min", category: "Manutenção" },
  { slug: "erros-comuns-upgrade-computador", title: "5 Erros Comuns ao Fazer Upgrade no Computador (e Como Evitar Prejuízo)", excerpt: "Comprar RAM incompatível, instalar SSD errado, forçar peças no slot — veja os erros que causam prejuízo.", date: "2026-04-06", readTime: "8 min", category: "Manutenção" },
  { slug: "manutencao-preventiva-computador-guia", title: "Manutenção Preventiva do Computador: O Guia Que Evita 80% dos Problemas", excerpt: "Rotinas simples que prolongam a vida útil do seu PC e evitam chamados técnicos.", date: "2026-04-06", readTime: "9 min", category: "Manutenção" },
  { slug: "diagnostico-tecnico-por-que-e-pago", title: "Por Que o Diagnóstico Técnico é Pago? Entenda de Uma Vez", excerpt: "Explicamos por que o diagnóstico tem custo, o que ele envolve e como evita prejuízos maiores.", date: "2026-04-05", readTime: "7 min", category: "Atendimento" },
  { slug: "como-proteger-computador-golpes-internet", title: "Como Proteger Seu Computador Contra Golpes e Fraudes na Internet", excerpt: "Links falsos, phishing, extensões maliciosas — aprenda a se proteger.", date: "2026-04-05", readTime: "10 min", category: "Segurança" },
  { slug: "computador-lento-causas-solucoes", title: "Computador Lento: 12 Causas Reais e Como Resolver (Guia 2026)", excerpt: "As 12 causas mais comuns e o que realmente funciona para resolver.", date: "2026-04-06", readTime: "12 min", category: "Manutenção" },
  { slug: "como-saber-se-pc-tem-virus-malware", title: "Como Saber se Seu PC Tem Vírus ou Malware: Sinais, Testes e Soluções", excerpt: "Aprenda a identificar se seu computador foi infectado e o que fazer.", date: "2026-04-05", readTime: "10 min", category: "Segurança" },
  { slug: "notebook-nao-liga-o-que-fazer", title: "Notebook Não Liga: O Que Pode Ser e O Que Fazer", excerpt: "Tela preta, LED piscando ou sem imagem? Veja as causas mais comuns.", date: "2026-04-04", readTime: "9 min", category: "Manutenção" },
  { slug: "diferenca-camera-wifi-dvr-qual-escolher", title: "Câmera Wi-Fi ou DVR: Qual Escolher?", excerpt: "Diferenças técnicas entre câmeras Wi-Fi e DVR com cabo.", date: "2026-02-14", readTime: "8 min", category: "CFTV" },
  { slug: "seguranca-casas-praia-itapoa-guaratuba", title: "Segurança em Casas de Praia: Itapoá e Guaratuba", excerpt: "Como câmeras com acesso remoto protegem sua casa de praia.", date: "2026-02-12", readTime: "7 min", category: "CFTV" },
  { slug: "como-escolher-melhor-kit-cameras-seguranca", title: "Como Escolher o Melhor Kit de Câmeras de Segurança", excerpt: "Guia completo: quantidade, resolução, visão noturna e instalação.", date: "2026-02-10", readTime: "9 min", category: "CFTV" },
  { slug: "monitoramento-24-horas-como-funciona", title: "Monitoramento 24 Horas: Como Funciona", excerpt: "Gravação contínua, acesso remoto e por que é essencial.", date: "2026-02-08", readTime: "6 min", category: "CFTV" },
  { slug: "equipe-especializada-cftv-litoral-parana", title: "Equipe Especializada em CFTV no Litoral do Paraná", excerpt: "Por que uma equipe profissional faz diferença na instalação.", date: "2026-02-06", readTime: "7 min", category: "CFTV" },
  { slug: "windows-11-atualizacao-kb5074105-novidades", title: "Windows 11 KB5074105: Todas as Novidades", excerpt: "Smart App Control, sincronização celular-PC, melhorias no Windows Hello.", date: "2026-01-30", readTime: "10 min", category: "Windows 11" },
  { slug: "windows-11-vale-a-pena-atualizar", title: "Windows 11: Vale a Pena Atualizar?", excerpt: "Requisitos, novidades, vantagens e desvantagens.", date: "2026-01-15", readTime: "8 min", category: "Windows 11" },
  { slug: "como-instalar-windows-11-pc-antigo", title: "Como Instalar Windows 11 em PC Antigo Sem TPM 2.0", excerpt: "Método seguro e testado por técnicos.", date: "2024-01-14", readTime: "10 min", category: "Windows 11" },
  { slug: "windows-11-lento-como-resolver", title: "Windows 11 Lento? 10 Soluções Para Acelerar", excerpt: "10 dicas práticas para otimizar o desempenho.", date: "2024-01-12", readTime: "7 min", category: "Windows 11" },
  { slug: "office-365-guia-completo-empresas", title: "Office 365 Para Empresas: Guia Completo", excerpt: "Teams, SharePoint, OneDrive e todas as ferramentas.", date: "2024-01-11", readTime: "12 min", category: "Office 365" },
  { slug: "office-365-vs-office-tradicional", title: "Office 365 vs Office Tradicional: Qual Escolher?", excerpt: "Comparativo completo entre assinatura e licença perpétua.", date: "2024-01-10", readTime: "6 min", category: "Office 365" },
  { slug: "configurar-email-outlook-office-365", title: "Como Configurar Email Empresarial no Outlook 365", excerpt: "Tutorial com sincronização celular e backup automático.", date: "2024-01-09", readTime: "5 min", category: "Office 365" },
  { slug: "seguranca-digital-empresas-guia-2024", title: "Segurança Digital Para Empresas: Guia Essencial", excerpt: "Firewall, antivírus corporativo, backup e políticas.", date: "2024-01-08", readTime: "15 min", category: "Segurança" },
  { slug: "ransomware-como-proteger-empresa", title: "Ransomware: Como Proteger Sua Empresa", excerpt: "Como funcionam os ataques e medidas preventivas.", date: "2024-01-07", readTime: "10 min", category: "Segurança" },
  { slug: "phishing-como-identificar-golpes", title: "Phishing: Como Identificar e Evitar Golpes por Email", excerpt: "Reconheça tentativas de phishing e proteja seus dados.", date: "2024-01-06", readTime: "7 min", category: "Segurança" },
  { slug: "backup-nuvem-empresas-qual-escolher", title: "Backup na Nuvem Para Empresas: Qual Escolher?", excerpt: "Comparativo entre OneDrive, Google Drive e soluções profissionais.", date: "2024-01-05", readTime: "8 min", category: "Segurança" },
  { slug: "como-escolher-um-bom-antivirus", title: "Como Escolher um Bom Antivírus em 2024", excerpt: "O que realmente importa, opções gratuitas x pagas.", date: "2024-02-02", readTime: "7 min", category: "Segurança" },
  { slug: "como-deixar-computador-mais-rapido", title: "Como Deixar o Computador Mais Rápido: 7 Dicas", excerpt: "7 técnicas simples para melhorar a velocidade.", date: "2024-01-04", readTime: "5 min", category: "Dicas" },
  { slug: "dicas-manter-notebook-funcionando-bem", title: "Dicas Para Manter o Notebook Funcionando Bem", excerpt: "Cuidados que aumentam a vida útil do notebook.", date: "2024-02-01", readTime: "6 min", category: "Manutenção" },
  { slug: "sinais-computador-com-virus", title: "5 Sinais de Que Seu Computador Está com Vírus", excerpt: "Principais sintomas de infecção por vírus ou malware.", date: "2024-01-03", readTime: "4 min", category: "Segurança" },
  { slug: "quando-trocar-hd-por-ssd", title: "Quando Vale a Pena Trocar o HD por SSD?", excerpt: "Vantagens do SSD, quanto custa e para quem vale.", date: "2024-01-02", readTime: "6 min", category: "Hardware" },
  { slug: "backup-como-proteger-seus-arquivos", title: "Backup: Como Proteger Seus Arquivos Importantes", excerpt: "Melhores práticas para manter seus arquivos seguros.", date: "2024-01-01", readTime: "5 min", category: "Segurança" },
  { slug: "notebook-superaquecendo-o-que-fazer", title: "Notebook Superaquecendo: O Que Fazer?", excerpt: "Causas do superaquecimento e como resolver.", date: "2023-12-28", readTime: "4 min", category: "Manutenção" },
  { slug: "wifi-lento-como-melhorar", title: "Wi-Fi Lento em Casa? Veja Como Melhorar o Sinal", excerpt: "Dicas práticas para melhorar cobertura e velocidade.", date: "2023-12-25", readTime: "5 min", category: "Redes" },
];

// ─── Category config for problem pages ───
const CATEGORY_MAP: Record<string, { label: string; icon: typeof Cpu; image: string; color: string }> = {
  "Hardware": { label: "Hardware", icon: Cpu, image: IMAGES.placaMae, color: "from-blue-600 to-cyan-500" },
  "Problemas de Celular": { label: "Celular", icon: Smartphone, image: IMAGES.microsoldagem, color: "from-purple-600 to-pink-500" },
  "Problemas de TV": { label: "TV", icon: Tv, image: IMAGES.smartTv, color: "from-red-600 to-orange-500" },
  "Problemas de Computador": { label: "Computador", icon: Monitor, image: IMAGES.desktopMontado, color: "from-indigo-600 to-blue-500" },
  "Notebook": { label: "Notebook", icon: Monitor, image: IMAGES.notebookReparo, color: "from-teal-600 to-emerald-500" },
  "Problemas de Rádio / Som": { label: "Rádio & Som", icon: Radio, image: IMAGES.amplificadorSom, color: "from-amber-600 to-yellow-500" },
  "Software / Sistema": { label: "Software", icon: Layers, image: IMAGES.suporteRemoto, color: "from-violet-600 to-purple-500" },
  "Procedimentos Técnicos": { label: "Procedimentos", icon: Zap, image: IMAGES.estacaoSolda, color: "from-orange-600 to-red-500" },
  "Problemas de Impressora": { label: "Impressora", icon: Printer, image: IMAGES.ferramentas, color: "from-slate-600 to-gray-500" },
  "Erros e Casos Reais": { label: "Casos Reais", icon: Star, image: IMAGES.bancadaTecnica, color: "from-rose-600 to-pink-500" },
  "Reparo de Placa-Mãe": { label: "Placa-Mãe", icon: Cpu, image: IMAGES.microsoldagem, color: "from-emerald-600 to-teal-500" },
  "Redes": { label: "Redes", icon: Wifi, image: IMAGES.redesWifi, color: "from-sky-600 to-blue-500" },
  "Segurança": { label: "Segurança", icon: Shield, image: IMAGES.segurancaDigital, color: "from-green-600 to-emerald-500" },
  "Periféricos": { label: "Periféricos", icon: HardDrive, image: IMAGES.componentesSsd, color: "from-zinc-600 to-slate-500" },
};

const DEFAULT_CAT = { label: "Outros", icon: Wrench, image: IMAGES.tecnicoTrabalhando, color: "from-gray-600 to-slate-500" };

function getCat(cat: string) {
  for (const [key, val] of Object.entries(CATEGORY_MAP)) {
    if (cat.includes(key) || key.includes(cat)) return val;
  }
  return DEFAULT_CAT;
}

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// Consolidated content items
type ContentItem = {
  type: "blog" | "problema" | "servico";
  slug: string;
  path: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  readTime?: string;
  date?: string;
  gravidade?: string;
};

const SERVICO_PAGES: ContentItem[] = [
  { type: "servico", slug: "formatacao", path: "/servicos/formatacao-computador", title: "Formatação de Computador", excerpt: "Formatação profissional com backup, instalação de drivers e programas essenciais.", category: "Serviços", image: IMAGES.suporteRemoto },
  { type: "servico", slug: "remocao-virus", path: "/servicos/remocao-virus", title: "Remoção de Vírus e Malware", excerpt: "Limpeza completa de vírus, trojans, ransomware e adware com ferramentas profissionais.", category: "Serviços", image: IMAGES.segurancaDigital },
  { type: "servico", slug: "upgrade-ssd", path: "/servicos/upgrade-ssd-memoria", title: "Upgrade de SSD e Memória RAM", excerpt: "Deixe seu PC até 10x mais rápido com SSD NVMe e mais memória RAM.", category: "Serviços", image: IMAGES.componentesSsd },
  { type: "servico", slug: "conserto-pc", path: "/servicos/conserto-pc-notebook", title: "Conserto de PC e Notebook", excerpt: "Reparo profissional de hardware e software para computadores e notebooks.", category: "Serviços", image: IMAGES.notebookReparo },
  { type: "servico", slug: "redes-wifi", path: "/servicos/redes-wifi", title: "Redes e Wi-Fi", excerpt: "Instalação, configuração e otimização de redes domésticas e empresariais.", category: "Serviços", image: IMAGES.redesWifi },
  { type: "servico", slug: "conserto-placa", path: "/servicos/conserto-placa", title: "Conserto de Placa Eletrônica", excerpt: "Reparo de placa-mãe, GPU e componentes com microsoldagem profissional.", category: "Serviços", image: IMAGES.microsoldagem },
  { type: "servico", slug: "manutencao-tv", path: "/servicos/manutencao-tv", title: "Manutenção de TV", excerpt: "Reparo de TV LED, LCD, Smart TV e OLED com diagnóstico profissional.", category: "Serviços", image: IMAGES.smartTv },
  { type: "servico", slug: "cftv", path: "/cftv", title: "CFTV — Câmeras de Segurança", excerpt: "Instalação e manutenção de sistemas de câmeras de segurança.", category: "Serviços", image: IMAGES.cameraSeguranca },
  { type: "servico", slug: "montagem-pc", path: "/servicos/montagem-pc", title: "Montagem de PC", excerpt: "Montagem personalizada de computadores para jogos, trabalho e estudo.", category: "Serviços", image: IMAGES.desktopMontado },
  { type: "servico", slug: "backup", path: "/servicos/backup-recuperacao", title: "Backup e Recuperação de Dados", excerpt: "Recuperação de arquivos perdidos e backup profissional em nuvem ou HD externo.", category: "Serviços", image: IMAGES.componentesSsd },
  { type: "servico", slug: "procedimentos", path: "/procedimentos-placa", title: "Procedimentos Técnicos em Placa", excerpt: "Reflow, Reballing, Troca de Chip BGA, Microsoldagem e Recapacitação.", category: "Serviços", image: IMAGES.estacaoSolda },
  { type: "servico", slug: "coleta", path: "/coleta-e-entrega", title: "Coleta e Entrega", excerpt: "Coleta do equipamento na sua casa e entrega após o reparo.", category: "Serviços", image: IMAGES.coletaEntrega },
];

// ─── The component ───
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"todos" | "artigos" | "problemas" | "servicos">("todos");
  const [activeCat, setActiveCat] = useState("Todos");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    document.title = "Explorar Conteúdo — Blog, Serviços, Problemas e Soluções | Técnico Curitiba";
    trackPageView("/blog", "Blog — Explorar Conteúdo");
  }, []);

  // Build consolidated list
  const allContent = useMemo<ContentItem[]>(() => {
    const blogItems: ContentItem[] = blogPosts.map((p) => ({
      type: "blog" as const,
      slug: p.slug,
      path: `/blog/${p.slug}`,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      image: getCat(p.category).image,
      readTime: p.readTime,
      date: p.date,
    }));

    const problemaItems: ContentItem[] = problemaPagesData.map((p) => ({
      type: "problema" as const,
      slug: p.slug,
      path: p.slug.startsWith("reflow-") || p.slug.startsWith("reballing-") || p.slug.startsWith("troca-chip-") || p.slug.startsWith("microsoldagem-") || p.slug.startsWith("recapacitacao-")
        ? `/procedimentos/${p.slug}` : `/${p.slug}`,
      title: p.h1,
      excerpt: p.intro.slice(0, 180).replace(/\*\*/g, "").replace(/\n/g, " ") + "…",
      category: p.categoria,
      image: getCat(p.categoria).image,
      gravidade: p.sintomas[0]?.gravidade,
    }));

    return [...blogItems, ...problemaItems, ...SERVICO_PAGES];
  }, []);

  // Categories for filter
  const categories = useMemo(() => {
    const cats = new Set<string>();
    allContent.forEach((c) => cats.add(c.category));
    return ["Todos", ...Array.from(cats).sort()];
  }, [allContent]);

  // Filter
  const filtered = useMemo(() => {
    let items = allContent;

    if (activeTab === "artigos") items = items.filter((c) => c.type === "blog");
    else if (activeTab === "problemas") items = items.filter((c) => c.type === "problema");
    else if (activeTab === "servicos") items = items.filter((c) => c.type === "servico");

    if (activeCat !== "Todos") items = items.filter((c) => c.category === activeCat);

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      items = items.filter((c) =>
        c.title.toLowerCase().includes(q) ||
        c.excerpt.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }

    return items;
  }, [allContent, activeTab, activeCat, searchTerm]);

  const displayed = showAll ? filtered : filtered.slice(0, 24);

  // Featured hero — random problem page with rich content
  const featured = useMemo(() => pickRandom(
    allContent.filter((c) => c.type === "problema" && c.excerpt.length > 100),
    3
  ), [allContent]);

  // Stats
  const stats = useMemo(() => ({
    artigos: allContent.filter((c) => c.type === "blog").length,
    problemas: allContent.filter((c) => c.type === "problema").length,
    servicos: allContent.filter((c) => c.type === "servico").length,
    total: allContent.length,
  }), [allContent]);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Explorar Conteúdo — Blog, Serviços e Soluções | Técnico Curitiba"
        description="Explore todos os artigos, guias de problemas, serviços e soluções técnicas. Mais de 200 páginas de conteúdo especializado em informática."
        path="/blog"
      />
      <JsonLdSchema />
      <Header />

      <main>
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 premium-gradient" />
          <FloatingParticles count={25} />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] animate-pulse" />
            <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto relative z-10 pt-12 pb-16 md:pt-16 md:pb-20 px-4">
            <AnimatedSection>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-white/90 mb-4 border border-white/10">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span>{stats.total}+ conteúdos técnicos</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-4">
                  Explore Todo o{" "}
                  <span className="bg-gradient-to-r from-accent via-orange-400 to-accent bg-clip-text text-transparent">
                    Conhecimento
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto">
                  Artigos, guias de problemas, procedimentos técnicos e serviços especializados — tudo num só lugar.
                </p>
              </div>
            </AnimatedSection>

            {/* Search */}
            <AnimatedSection delay={0.15}>
              <div className="max-w-xl mx-auto relative mb-10">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50 pointer-events-none" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar conteúdo — ex: notebook não liga, formatação, vírus..."
                  className="pl-12 py-6 text-base bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-accent/50 rounded-xl"
                />
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection delay={0.25}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                {[
                  { icon: BookOpen, label: "Artigos", value: stats.artigos, color: "text-blue-400" },
                  { icon: Wrench, label: "Problemas", value: stats.problemas, color: "text-orange-400" },
                  { icon: TrendingUp, label: "Serviços", value: stats.servicos, color: "text-green-400" },
                  { icon: Layers, label: "Total", value: stats.total, color: "text-accent" },
                ].map((s) => (
                  <div key={s.label} className="glass-card rounded-xl p-3 text-center border border-white/10 backdrop-blur-sm bg-white/5">
                    <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-white/50">{s.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════ FEATURED HIGHLIGHTS ═══════════ */}
        <section className="py-10 bg-secondary/50">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" /> Destaques do Dia
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-5">
              {featured.map((item, i) => {
                const cat = getCat(item.category);
                return (
                  <AnimatedSection key={item.slug} delay={0.1 * i}>
                    <Link to={item.path} className="group block h-full">
                      <div className="relative rounded-2xl overflow-hidden h-full border border-border hover:border-accent/30 transition-all hover:shadow-xl bg-card">
                        {/* Cover image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={item.image + "&w=800&h=400"}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 mix-blend-multiply`} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20">
                              {cat.label}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-accent transition-colors">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        {/* Content */}
                        <div className="p-4">
                          <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                            {item.excerpt}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-accent text-sm font-medium group-hover:gap-2.5 transition-all">
                            Explorar <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ TABS + FILTERS ═══════════ */}
        <section className="py-8 bg-background border-b border-border sticky top-0 z-30 backdrop-blur-xl bg-background/95">
          <div className="container mx-auto px-4">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {([
                { key: "todos", label: "Tudo", count: allContent.length },
                { key: "artigos", label: "Artigos", count: stats.artigos },
                { key: "problemas", label: "Problemas & Soluções", count: stats.problemas },
                { key: "servicos", label: "Serviços", count: stats.servicos },
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => { setActiveTab(tab.key); setActiveCat("Todos"); setShowAll(false); }}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === tab.key
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tab.label}
                  <span className="ml-1.5 text-xs opacity-70">({tab.count})</span>
                </button>
              ))}
            </div>

            {/* Category pills — only show when not "servicos" */}
            {activeTab !== "servicos" && (
              <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
                {categories
                  .filter((c) => {
                    if (activeTab === "artigos") return ["Todos", "Manutenção", "Segurança", "CFTV", "Windows 11", "Office 365", "Hardware", "Dicas", "Redes", "Atendimento"].includes(c);
                    return true;
                  })
                  .slice(0, 20)
                  .map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCat(cat); setShowAll(false); }}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                        activeCat === cat
                          ? "bg-accent/15 text-accent border border-accent/30"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══════════ CONTENT GRID ═══════════ */}
        <section className="py-10 bg-background">
          <div className="container mx-auto px-4">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Nenhum conteúdo encontrado para "{searchTerm}"</p>
                <Button variant="outline" className="mt-4" onClick={() => { setSearchTerm(""); setActiveCat("Todos"); }}>
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {displayed.map((item, i) => {
                    const cat = getCat(item.category);
                    const Icon = cat.icon;
                    const typeBadge = item.type === "blog" ? "Artigo" : item.type === "servico" ? "Serviço" : "Solução";
                    const typeBadgeColor = item.type === "blog" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400" : item.type === "servico" ? "bg-green-500/15 text-green-600 dark:text-green-400" : "bg-orange-500/15 text-orange-600 dark:text-orange-400";

                    return (
                      <AnimatedSection key={`${item.type}-${item.slug}-${i}`} delay={Math.min(0.05 * (i % 8), 0.4)}>
                        <Link to={item.path} className="group block h-full">
                          <article className="relative rounded-xl overflow-hidden h-full border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card">
                            {/* Image */}
                            <div className="relative h-36 overflow-hidden">
                              <img
                                src={item.image + "&w=500&h=280"}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-40 mix-blend-multiply`} />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                              {/* Badges */}
                              <div className="absolute top-2 left-2 flex gap-1.5">
                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${typeBadgeColor}`}>
                                  {typeBadge}
                                </span>
                              </div>
                              <div className="absolute top-2 right-2">
                                <Icon className="h-4 w-4 text-white/70" />
                              </div>
                              <div className="absolute bottom-2 left-2 right-2">
                                <span className="text-[10px] text-white/70 font-medium">{item.category}</span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-3.5">
                              <h3 className="font-bold text-sm text-foreground leading-snug mb-1.5 line-clamp-2 group-hover:text-accent transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                                {item.excerpt}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                  {item.readTime && (
                                    <span className="flex items-center gap-0.5">
                                      <Clock className="h-3 w-3" /> {item.readTime}
                                    </span>
                                  )}
                                  {item.date && (
                                    <span className="flex items-center gap-0.5">
                                      <Calendar className="h-3 w-3" /> {new Date(item.date).toLocaleDateString("pt-BR", { month: "short", year: "2-digit" })}
                                    </span>
                                  )}
                                  {item.gravidade && (
                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                                      item.gravidade === "Complexo" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                      item.gravidade === "Médio" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    }`}>{item.gravidade}</span>
                                  )}
                                </div>
                                <ArrowRight className="h-3.5 w-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          </article>
                        </Link>
                      </AnimatedSection>
                    );
                  })}
                </div>

                {/* Load more */}
                {!showAll && filtered.length > 24 && (
                  <div className="text-center mt-8">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setShowAll(true)}
                      className="gap-2 rounded-full px-8"
                    >
                      <ChevronDown className="h-4 w-4" />
                      Ver todos os {filtered.length} conteúdos
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <AnimatedSection>
          <section className="py-12 bg-secondary/50">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Não encontrou o que procura?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Fale com um técnico especializado — atendimento em Curitiba e região metropolitana.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href="https://wa.me/5541997452053?text=Olá! Preciso de ajuda técnica."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="gap-2 bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp-hover))] text-white rounded-full px-6">
                      WhatsApp
                    </Button>
                  </a>
                  <Link to="/contato">
                    <Button variant="outline" className="gap-2 rounded-full px-6">
                      Contato <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
