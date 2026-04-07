import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Link } from "react-router-dom";
import { ShieldCheck, CheckCircle, AlertTriangle, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541992671754";

const RemocaoVirus = () => {
  useEffect(() => {
    document.title = "Remoção de Vírus em Curitiba | Malware, Ransomware - Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Remoção de vírus, malware, ransomware e spyware em Curitiba. Limpeza completa do computador. Atendimento domiciliar. Suporte remoto disponível.");
    }
    trackPageView("/servicos/remocao-virus", "Remoção de Vírus");
  }, []);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "remocao-virus");
    const message = encodeURIComponent("Olá! Meu computador está com vírus. Podem me ajudar?");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Remoção de Vírus em Curitiba | Malware, Ransomware - Técnico Curitiba" description="Remoção de vírus, malware, ransomware e spyware em Curitiba. Limpeza completa do computador. Atendimento domiciliar. Suporte remoto disponível." path="/servicos/remocao-virus" />
      <Header />
      <Breadcrumbs
        items={[
          { label: "Serviços", href: "/servicos" },
          { label: "Remoção de Vírus" },
        ]}
      />
      
      {/* Hero Section */}
      <section className="relative pt-10 pb-10 bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-breathe" />
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-accent/8 rounded-full blur-3xl animate-breathe" style={{ animationDelay: '2s' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-4 py-2 rounded-full mb-6 shimmer">
              <ShieldCheck className="h-5 w-5" />
              <span className="font-medium">Proteção Especializada</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 reveal-text">
              Remoção de Vírus em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto fade-section">
              Eliminamos vírus, malware, ransomware, spyware e todas as ameaças do seu computador. Proteção completa com antivírus profissional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-section">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Remover Vírus Agora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Preço Destaque */}
      <section className="py-8 bg-accent/10 border-y border-accent/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold text-primary reveal-text">
            Limpeza de vírus a partir de <span className="text-accent">R$ 99,99</span>
          </p>
          <p className="text-muted-foreground mt-2">Suporte remoto disponível para casos simples</p>
        </div>
      </section>

      {/* Tipos de Ameaças */}
      <section className="relative py-16 bg-background overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Tipos de Ameaças que Removemos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Vírus", desc: "Programas maliciosos que se replicam e danificam seu sistema" },
              { title: "Malware", desc: "Software projetado para causar danos ou roubar informações" },
              { title: "Ransomware", desc: "Sequestra seus arquivos e exige pagamento para liberá-los" },
              { title: "Spyware", desc: "Monitora suas atividades e rouba dados pessoais" },
              { title: "Adware", desc: "Exibe propagandas indesejadas e redirecionamentos" },
              { title: "Trojans", desc: "Programas disfarçados que abrem portas para hackers" },
            ].map((item, index) => (
              <div key={index} className="group flex gap-4 p-4 bg-secondary rounded-xl border-l-4 border-red-500 stagger-item transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/10" style={{ animationDelay: `${index * 60}ms` }}>
                <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h3 className="font-bold text-primary">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RealImageSection imageKey="segurancaDigital" caption="Proteção profissional contra vírus e malware" />

      {/* Sinais de Infecção */}
      <section className="py-10 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Sinais de que Seu Computador Está Infectado
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "Computador muito lento sem motivo aparente",
              "Pop-ups e propagandas aparecendo constantemente",
              "Programas abrindo sozinhos",
              "Navegador redirecionando para sites estranhos",
              "Arquivos desaparecendo ou corrompidos",
              "Mensagens de resgate pedindo pagamento",
              "Antivírus desativado sem você fazer isso",
              "Emails sendo enviados sem sua autorização",
            ].map((item, index) => (
              <div key={index} className="group flex items-center gap-3 p-4 bg-background rounded-lg stagger-item transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md" style={{ animationDelay: `${index * 60}ms` }}>
                <ArrowRight className="h-5 w-5 text-red-500 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nosso Processo */}
      <section className="relative py-16 bg-background overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Nosso Processo de Remoção
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Diagnóstico", desc: "Identificamos todas as ameaças presentes no sistema" },
              { step: "2", title: "Remoção", desc: "Eliminamos vírus, malware e programas maliciosos" },
              { step: "3", title: "Limpeza", desc: "Removemos rastros e arquivos residuais" },
              { step: "4", title: "Proteção", desc: "Instalamos antivírus e configuramos segurança" },
            ].map((item, index) => (
              <div key={index} className="group text-center p-6 bg-secondary rounded-xl stagger-item transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 shadow-[0_0_16px_rgba(239,68,68,0.3)]">
                  {item.step}
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que inclui */}
      <section className="py-10 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            O Que Está Incluso no Serviço
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Análise completa do sistema",
              "Remoção de todos os vírus encontrados",
              "Limpeza de malware e spyware",
              "Remoção de programas indesejados",
              "Instalação de antivírus profissional",
              "Atualização do sistema operacional",
              "Otimização de desempenho",
              "Orientações de segurança",
            ].map((item, index) => (
              <div key={index} className="group flex items-center gap-3 p-4 bg-background rounded-lg stagger-item transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md" style={{ animationDelay: `${index * 60}ms` }}>
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Perguntas Frequentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "Vocês conseguem remover ransomware?", a: "Sim, removemos o ransomware. Em alguns casos, conseguimos recuperar os arquivos criptografados. Em outros, recomendamos formatação com backup." },
              { q: "Quanto tempo demora a limpeza?", a: "Depende da gravidade da infecção. Casos simples levam cerca de 1 hora. Casos graves podem levar de 2 a 4 horas." },
              { q: "Posso resolver por atendimento remoto?", a: "Sim! Para infecções leves, oferecemos suporte remoto. Casos graves requerem atendimento presencial ou coleta." },
              { q: "Vou perder meus arquivos?", a: "Na maioria dos casos, não. Fazemos o possível para preservar seus dados. Só recomendamos formatação em casos extremos." },
              { q: "Qual antivírus vocês instalam?", a: "Instalamos antivírus profissional gratuito ou pago, de acordo com sua preferência e necessidade." },
            ].map((item, index) => (
              <div key={index} className="group bg-secondary p-6 rounded-xl stagger-item transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md" style={{ animationDelay: `${index * 60}ms` }}>
                <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-16 bg-primary overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-breathe" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-heading font-bold text-white mb-4 reveal-text">
            Computador com Vírus? Resolva Agora!
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Não espere o problema piorar. Entre em contato e elimine as ameaças do seu computador hoje!
          </p>
          <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Remover Vírus Agora
          </Button>
        </div>
      </section>

      {/* Serviços Relacionados */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-foreground text-center mb-4">
            Serviços Relacionados
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/servicos/formatacao-computador" className="px-5 py-2.5 bg-secondary rounded-lg hover:bg-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-sm">
              Formatação
            </Link>
            <Link to="/servicos/backup-recuperacao" className="px-5 py-2.5 bg-secondary rounded-lg hover:bg-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-sm">
              Backup de Dados
            </Link>
            <Link to="/atendimento-remoto" className="px-5 py-2.5 bg-secondary rounded-lg hover:bg-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-sm">
              Suporte Remoto
            </Link>
          </div>
        </div>
      </section>
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default RemocaoVirus;
