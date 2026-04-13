import { Link } from "react-router-dom";
import { MapPin, MessageCircle, Users, ArrowRight } from "lucide-react";
import { FloatingParticles } from "@/components/FloatingParticles";
import { useMemo } from "react";

const footerLink = "text-white/60 hover:text-white/90 text-sm transition-all duration-200 hover:translate-x-1 inline-block";

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

const informaticaLinks = [
  { label: "Formatação", to: "/servicos/formatacao-computador" },
  { label: "Remoção de Vírus", to: "/servicos/remocao-virus" },
  { label: "Upgrade SSD/RAM", to: "/servicos/upgrade-ssd-memoria" },
  { label: "Conserto PC/Notebook", to: "/servicos/conserto-pc-notebook" },
  { label: "Computador Lento", to: "/servicos/computador-lento" },
  { label: "Computador Não Liga", to: "/servicos/computador-nao-liga" },
  { label: "Montagem de PC", to: "/servicos/montagem-pc" },
  { label: "Redes e Wi-Fi", to: "/servicos/redes-wifi" },
  { label: "Backup e Recuperação", to: "/servicos/backup-recuperacao" },
  { label: "Conserto de Celular", to: "/servicos/conserto-celular" },
];

const servicosLinks = [
  { label: "Manutenção de TV", to: "/servicos/manutencao-tv" },
  { label: "Conserto de Placa", to: "/servicos/conserto-placa" },
  { label: "CFTV / Câmeras", to: "/cftv" },
  { label: "Suporte Empresas", to: "/suporte-empresas" },
  { label: "Atendimento Remoto", to: "/atendimento-remoto" },
  { label: "Domicílio", to: "/atendimento-domicilio" },
  { label: "Coleta e Entrega", to: "/coleta-e-entrega" },
  { label: "Conserto de TV", to: "/servicos/conserto-tv" },
];

const procedimentosTvLinks = [
  { label: "Reflow BGA", to: "/procedimentos/reflow-bga-curitiba" },
  { label: "Reballing BGA", to: "/procedimentos/reballing-bga-curitiba" },
  { label: "Troca de Chip BGA", to: "/procedimentos/troca-chip-bga-curitiba" },
  { label: "Microsoldagem Celular", to: "/procedimentos/microsoldagem-celular-curitiba" },
  { label: "Recapacitação", to: "/procedimentos/recapacitacao-placa-eletronica-curitiba" },
  { label: "Reparo Placa TV", to: "/reparo-placa-principal-tv-curitiba" },
  { label: "Reparo Placa Notebook", to: "/reparo-placa-mae-notebook-curitiba" },
  { label: "Reparo Placa Celular", to: "/reparo-placa-mae-celular-curitiba" },
  { label: "TV Listras na Tela", to: "/tv-listras-na-tela-curitiba" },
  { label: "TV Listras H/V", to: "/tv-listras-horizontais-verticais-conserto-curitiba" },
  { label: "Por Que Custa Caro", to: "/por-que-conserto-placa-mae-custa-caro-curitiba" },
];


const atendimentoLinks = [
  { label: "Como Funciona", to: "/como-funciona" },
  { label: "Preços e Políticas", to: "/precos-e-politicas" },
  { label: "Diagnóstico Técnico", to: "/diagnostico-tecnico" },
  { label: "Equipamentos", to: "/equipamentos-atendidos" },
  { label: "Quando Não Compensa", to: "/quando-nao-compensa" },
  { label: "Casos Reais", to: "/problemas-reais-e-casos" },
];

const regionLinks = [
  { label: "Curitiba", to: "/tecnico-informatica-curitiba" },
  { label: "São José dos Pinhais", to: "/tecnico-informatica-sao-jose-pinhais" },
  { label: "Araucária", to: "/tecnico-informatica-araucaria" },
  { label: "Campo Largo", to: "/tecnico-informatica-campo-largo" },
  { label: "Pinhais", to: "/tecnico-informatica-pinhais" },
  { label: "Colombo", to: "/tecnico-informatica-colombo" },
  { label: "Faz. Rio Grande", to: "/tecnico-informatica-fazenda-rio-grande" },
  { label: "Alm. Tamandaré", to: "/tecnico-informatica-almirante-tamandare" },
  { label: "Piraquara", to: "/tecnico-informatica-piraquara" },
  { label: "Campo Magro", to: "/tecnico-informatica-campo-magro" },
  { label: "Quatro Barras", to: "/tecnico-informatica-quatro-barras" },
];

const bairroLinks = [
  { label: "Centro", to: "/bairros/centro" },
  { label: "Batel", to: "/bairros/batel" },
  { label: "Portão", to: "/bairros/portao" },
  { label: "Santa Felicidade", to: "/bairros/santa-felicidade" },
  { label: "CIC", to: "/bairros/cic" },
];

const blogLinks = [
  { label: "Computador Lento", to: "/blog/computador-lento-causas-solucoes" },
  { label: "PC com Vírus?", to: "/blog/como-saber-se-pc-tem-virus-malware" },
  { label: "Notebook Não Liga", to: "/blog/notebook-nao-liga-o-que-fazer" },
];

const infoLinks = [
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
  { label: "Sobre Nós", to: "/sobre" },
  { label: "Contato", to: "/contato" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const servicosFooter = useMemo(() => {
    const info = pickRandom(informaticaLinks, 3);
    const serv = pickRandom(servicosLinks, 3);
    const proc = pickRandom(procedimentosTvLinks, 3);
    return [
      { label: "Todos os Serviços", to: "/servicos" },
      ...info, ...serv, ...proc,
    ];
  }, []);

  return (
    <footer className="premium-gradient py-12 md:py-14 relative overflow-hidden noise-overlay">
      <FloatingParticles count={15} />
      <div data-parallax="0.06" className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none orb-float" />
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">
          {/* Logo e Contato */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-4">
            <div className="inline-flex w-fit rounded-md bg-white/95 px-2 py-1 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-300">
              <img
                alt="Técnico Curitiba"
                className="h-10 w-auto"
                src="/lovable-uploads/87899615-1234-4c6d-a8ca-ee38ec566ef4.webp"
                width="200"
                height="40"
              />
            </div>
            <p className="text-white/50 text-sm max-w-xs leading-relaxed">
              Assistência técnica em informática Nº1 de Curitiba e região. Atendimento a domicílio no mesmo dia.
            </p>
            <div className="flex items-center gap-2 text-white/65 text-sm hover:text-white/80 transition-all duration-300 group cursor-default">
              <MapPin className="h-4 w-4 flex-shrink-0 group-hover:scale-110 group-hover:text-accent transition-all duration-300" />
              <span>Curitiba e Região Metropolitana, PR</span>
            </div>
            <a 
              href="https://wa.me/5541997452053?text=Olá!%20Encontrei%20vocês%20no%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp-hover))] hover:scale-105 hover:shadow-[var(--shadow-whatsapp)] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 group"
            >
              <MessageCircle className="h-4 w-4 flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>

          {/* Serviços (randomizado) */}
          <div className="anim-fade-up">
            <h3 className="text-white/90 font-semibold mb-4 text-xs uppercase tracking-widest">Serviços</h3>
            <ul className="space-y-2">
              {servicosFooter.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={`${footerLink} hover-lift inline-block`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Atendimento */}
          <div className="anim-fade-up">
            <h3 className="text-white/90 font-semibold mb-4 text-xs uppercase tracking-widest">Atendimento</h3>
            <ul className="space-y-2">
              {atendimentoLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={`${footerLink} hover-lift inline-block`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regiões */}
          <div className="anim-fade-up">
            <h3 className="text-white/90 font-semibold mb-4 text-xs uppercase tracking-widest">Regiões</h3>
            <ul className="space-y-2">
              {regionLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={`${footerLink} hover-lift inline-block`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Saiba Mais */}
          <div className="anim-fade-up">
            <h3 className="text-white/90 font-semibold mb-4 text-xs uppercase tracking-widest">Saiba Mais</h3>
            <ul className="space-y-2">
              {infoLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={`${footerLink} hover-lift inline-block`}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white/90 font-semibold mb-3 mt-6 text-xs uppercase tracking-widest">Blog</h3>
            <ul className="space-y-2">
              {blogLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={`${footerLink} hover-lift inline-block`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chamada parceiro */}
        <div className="border-t border-white/[0.08] pt-6 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-white/50 text-sm">É técnico de informática?</span>
            <Link
              to="/seja-parceiro"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/15 text-accent text-sm font-semibold border border-accent/25 hover:bg-accent/25 hover:border-accent/40 transition-all duration-300 hover:scale-105 group"
            >
              <Users className="h-4 w-4 group-hover:scale-110 transition-transform" />
              Quer ser técnico parceiro?
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-7 text-center space-y-2 spotlight-sweep">
          <p className="text-white/45 text-sm">
            © {currentYear} Técnico Curitiba - Assistência Técnica em Informática. CNPJ: 41.723.708/0001-58. Todos os direitos reservados.
          </p>
          <p className="text-white/30 text-xs">
            Uma empresa do ecossistema{" "}
            <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-white/70 underline transition-colors">
              Preciso de Um
            </a>
            {" · "}
            <a href="https://mestredosservicos.com.br" target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-white/70 underline transition-colors">
              Mestre dos Serviços
            </a>
            {" · "}
            <a href="https://tamonaweb.com.br" target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-white/70 underline transition-colors">
              TamoNaWeb
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
