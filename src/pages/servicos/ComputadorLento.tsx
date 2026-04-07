import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Gauge, CheckCircle, AlertCircle, MessageCircle, ArrowRight, Clock, Shield, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";

const causas = [
  { titulo: "HD antigo ou sem SSD", desc: "A causa nº 1 de lentidão. HDs mecânicos são até 10x mais lentos que SSDs. A troca resolve em 90% dos casos.", solucao: "Upgrade para SSD" },
  { titulo: "Pouca memória RAM", desc: "Com menos de 8GB, o Windows 10/11 usa o disco como memória virtual, travando tudo.", solucao: "Expansão de RAM" },
  { titulo: "Vírus e malware", desc: "Programas maliciosos consomem processamento em segundo plano sem você perceber.", solucao: "Limpeza profissional" },
  { titulo: "Windows corrompido", desc: "Atualizações mal-sucedidas, registro cheio de lixo, drivers incompatíveis.", solucao: "Formatação limpa" },
  { titulo: "Superaquecimento", desc: "Pasta térmica ressecada e cooler entupido causam throttling — o processador reduz velocidade para não queimar.", solucao: "Limpeza + pasta térmica" },
  { titulo: "Programas na inicialização", desc: "Dezenas de programas abrindo junto com o Windows. Cada um consome memória e CPU.", solucao: "Otimização de startup" },
  { titulo: "Disco cheio (acima de 90%)", desc: "Quando o disco está quase lotado, o sistema não consegue criar arquivos temporários e fica travando.", solucao: "Limpeza + organização" },
  { titulo: "Hardware defeituoso", desc: "Memória RAM com erro, HD com setores ruins, fonte instável — problemas que só diagnóstico identifica.", solucao: "Diagnóstico técnico" },
];

const ComputadorLento = () => {
  useEffect(() => {
    document.title = "Computador Lento? Causas e Soluções Profissionais | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Seu computador está lento? Conheça as 8 causas mais comuns e as soluções profissionais. Upgrade SSD, limpeza de vírus, formatação. Atendimento em Curitiba e região.");
    }
    trackPageView("/servicos/computador-lento", "Computador Lento");
  }, []);

  const handleWhatsApp = () => {
    trackCTAClick("whatsapp", "computador-lento");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Meu computador está muito lento. Podem me ajudar?")}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs items={[{ label: "Serviços", href: "/servicos" }, { label: "Computador Lento" }]} />

      {/* Hero */}
      <section className="pt-12 pb-12 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <Gauge className="h-5 w-5" />
              <span className="font-medium">Diagnóstico de Performance</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Computador Lento? Descubra a Causa e Resolva Hoje
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Diagnóstico profissional para identificar a causa real da lentidão. Soluções que resolvem de verdade — sem enrolação.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" variant="cta" onClick={handleWhatsApp}>
                <MessageCircle className="mr-2 h-5 w-5" /> Meu PC Está Lento
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10" asChild>
                <Link to="/valores">Ver Preços</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Causas */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
              As 8 Causas Mais Comuns de Computador Lento
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Cada caso é diferente. Um técnico experiente identifica a causa real em minutos — sem chutar soluções genéricas.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {causas.map((causa, i) => (
                <div key={i} className="bg-secondary rounded-xl p-5 border border-border hover:border-accent/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/10 text-accent rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{causa.titulo}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{causa.desc}</p>
                      <span className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                        <CheckCircle className="h-3 w-3" /> {causa.solucao}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quando vale / não vale */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
              Vale a Pena Resolver ou Trocar o Computador?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background rounded-xl p-6 border border-accent/20">
                <h3 className="font-bold text-accent text-lg mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" /> Geralmente Vale Resolver
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> PC com processador i3/i5/i7 ou Ryzen (qualquer geração)</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> Notebook com até 5-6 anos de uso</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> Lentidão que começou aos poucos</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> Máquina que já funcionou bem antes</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> Upgrade de SSD + RAM resolve a maioria</li>
                </ul>
              </div>
              <div className="bg-background rounded-xl p-6 border border-destructive/20">
                <h3 className="font-bold text-destructive text-lg mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" /> Pode Não Compensar
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /> Processador Celeron, Pentium ou Atom antigo</li>
                  <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /> Máquina com mais de 8-20 anos</li>
                  <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /> Placa-mãe sem suporte a SSD SATA/NVMe</li>
                  <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /> Custo do reparo acima de 60% do valor de um novo</li>
                  <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /> Múltiplos componentes falhando</li>
                </ul>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Não sabe em qual caso se encaixa? <button onClick={handleWhatsApp} className="text-accent hover:underline font-medium">Mande uma mensagem</button> descrevendo seu computador que orientamos gratuitamente.
            </p>
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
              Como Resolvemos
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { icon: MessageCircle, titulo: "1. Contato", desc: "Descreva o problema pelo WhatsApp. Já orientamos se é algo simples ou se precisa visita." },
                { icon: Wrench, titulo: "2. Diagnóstico", desc: "Identificamos a causa real no local ou em bancada. Sem achismo." },
                { icon: Clock, titulo: "3. Orçamento", desc: "Valor apresentado antes da execução. Você aprova ou não, sem surpresas." },
                { icon: Shield, titulo: "4. Resolução", desc: "Executamos com garantia. A maioria dos casos resolve na primeira visita." },
              ].map((step, i) => (
                <div key={i} className="text-center bg-secondary rounded-xl p-5">
                  <step.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="font-bold text-foreground mb-2">{step.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Links relacionados */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-primary mb-6 text-center">Serviços Relacionados</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: "Upgrade SSD e Memória", to: "/servicos/upgrade-ssd-memoria" },
                { label: "Formatação de Computador", to: "/servicos/formatacao-computador" },
                { label: "Remoção de Vírus", to: "/servicos/remocao-virus" },
                { label: "Conserto de PC/Notebook", to: "/servicos/conserto-pc-notebook" },
                { label: "Como Funciona", to: "/como-funciona" },
                { label: "Preços e Políticas", to: "/precos-e-politicas" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="flex items-center gap-2 bg-background rounded-lg p-3 text-sm font-medium text-foreground hover:text-accent hover:shadow-md transition-all">
                  <ArrowRight className="h-4 w-4 text-accent" />{link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Cansado de PC Lento?</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">Fale com nosso técnico agora. Diagnóstico profissional e soluções que funcionam de verdade.</p>
          <Button size="lg" variant="cta" onClick={handleWhatsApp}>
            <MessageCircle className="mr-2 h-5 w-5" /> Resolver Agora pelo WhatsApp
          </Button>
        </div>
      </section>

      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default ComputadorLento;
