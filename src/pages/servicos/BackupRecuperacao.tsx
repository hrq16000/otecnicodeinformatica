import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Database, CheckCircle, HardDrive, Cloud, MessageCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541992671754";

const BackupRecuperacao = () => {
  useEffect(() => {
    document.title = "Backup e Recuperação de Dados em Curitiba | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Backup e recuperação de dados em Curitiba. Resgate de arquivos de HD, SSD, pendrive. Recuperação de dados deletados. Atendimento especializado.");
    }
    trackPageView("/servicos/backup-recuperacao", "Backup e Recuperação");
  }, []);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "backup-recuperacao");
    const message = encodeURIComponent("Olá! Preciso recuperar dados do meu HD/SSD. Podem me ajudar?");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs
        items={[
          { label: "Serviços", href: "/servicos" },
          { label: "Backup e Recuperação" },
        ]}
      />
      
      {/* Hero Section */}
      <section className="pt-12 pb-12 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <Database className="h-5 w-5" />
              <span className="font-medium">Proteção de Dados</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Backup e Recuperação de Dados em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Perdeu arquivos importantes? Recuperamos dados de HD, SSD, pendrive e cartão de memória. Também configuramos backup automático.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Recuperar Meus Dados
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Alerta Importante */}
      <section className="py-8 bg-red-500/10 border-y border-red-500/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 text-red-500 mb-2">
            <AlertTriangle className="h-6 w-6" />
            <p className="text-xl font-bold">Importante!</p>
          </div>
          <p className="text-foreground max-w-2xl mx-auto">
            Se você perdeu dados, <strong>pare de usar o dispositivo imediatamente</strong>. Quanto mais você usa, menor a chance de recuperação.
          </p>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            Nossos Serviços
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-secondary p-8 rounded-xl">
              <HardDrive className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Recuperação de Dados</h3>
              <ul className="space-y-3">
                {[
                  "HD com defeito ou não reconhecido",
                  "SSD corrompido",
                  "Pendrive danificado",
                  "Cartão de memória corrompido",
                  "Arquivos deletados acidentalmente",
                  "Formatação acidental",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-secondary p-8 rounded-xl">
              <Cloud className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Configuração de Backup</h3>
              <ul className="space-y-3">
                {[
                  "Backup automático em nuvem",
                  "Backup em HD externo",
                  "Sincronização de arquivos",
                  "Backup de fotos e documentos",
                  "Backup de emails",
                  "Plano de backup empresarial",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Recuperação */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            Níveis de Recuperação
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-xl">
              <h3 className="text-xl font-bold text-foreground mb-2">Recuperação Lógica</h3>
              <p className="text-muted-foreground mb-4">Arquivos deletados, formatação, corrupção de software</p>
              <p className="text-2xl font-bold text-accent">A partir de R$199</p>
              <p className="text-sm text-muted-foreground">Alta taxa de sucesso</p>
            </div>
            <div className="bg-background p-6 rounded-xl border-2 border-accent">
              <h3 className="text-xl font-bold text-foreground mb-2">Recuperação Avançada</h3>
              <p className="text-muted-foreground mb-4">HD com setores defeituosos, SSD com falha</p>
              <p className="text-2xl font-bold text-accent">A partir de R$399</p>
              <p className="text-sm text-muted-foreground">Requer equipamento especializado</p>
            </div>
            <div className="bg-background p-6 rounded-xl">
              <h3 className="text-xl font-bold text-foreground mb-2">Recuperação Física</h3>
              <p className="text-muted-foreground mb-4">HD com ruído, cabeça travada, motor queimado</p>
              <p className="text-2xl font-bold text-accent">Sob consulta</p>
              <p className="text-sm text-muted-foreground">Encaminhamento para laboratório</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "É possível recuperar dados de HD formatado?", a: "Na maioria dos casos, sim! A formatação não apaga os dados imediatamente. Quanto antes você nos procurar, maior a chance de sucesso." },
              { q: "E se o HD estiver fazendo barulho?", a: "HD com ruídos indica problema físico grave. Não ligue mais o computador e entre em contato imediatamente para avaliação." },
              { q: "Quanto tempo demora a recuperação?", a: "Recuperação lógica leva de 2 a 24 horas. Casos mais complexos podem levar alguns dias. Avaliamos cada caso." },
              { q: "Vocês garantem a recuperação?", a: "Não cobramos se não conseguirmos recuperar os dados. Você só paga pelo sucesso." },
              { q: "Como funciona o backup automático?", a: "Configuramos sincronização automática com serviços de nuvem ou HD externo. Seus arquivos são salvos sem você precisar fazer nada." },
            ].map((item, index) => (
              <div key={index} className="bg-secondary p-6 rounded-xl">
                <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Perdeu Dados Importantes?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Não espere! Quanto mais rápido você agir, maior a chance de recuperar seus arquivos.
          </p>
          <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Recuperar Meus Dados
          </Button>
        </div>
      </section>

      {/* Serviços Relacionados */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-foreground text-center mb-8">
            Serviços Relacionados
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/servicos/upgrade-ssd-memoria" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-colors">
              Upgrade SSD
            </Link>
            <Link to="/servicos/formatacao-computador" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-colors">
              Formatação
            </Link>
            <Link to="/servicos/conserto-pc-notebook" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-colors">
              Conserto de Hardware
            </Link>
          </div>
        </div>
      </section>

      <RealImageSection imageKey="componentesSsd" secondaryImageKey="diagnostico" layout="duo" caption="HD e SSD para recuperação de dados" secondaryCaption="Diagnóstico técnico para backup seguro" />
      <InterlinkingBlock />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default BackupRecuperacao;
