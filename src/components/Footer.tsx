import { Link } from "react-router-dom";
import { MapPin, MessageCircle } from "lucide-react";
import { FloatingParticles } from "@/components/FloatingParticles";

const footerLink = "text-white/60 hover:text-white/90 text-sm transition-all duration-200 hover:translate-x-1 inline-block";

const footerSections = [
  {
    title: "Serviços",
    links: [
      { label: "Todos os Serviços", to: "/servicos" },
      { label: "Formatação", to: "/servicos/formatacao-computador" },
      { label: "Remoção de Vírus", to: "/servicos/remocao-virus" },
      { label: "Upgrade SSD/RAM", to: "/servicos/upgrade-ssd-memoria" },
      { label: "Conserto PC/Notebook", to: "/servicos/conserto-pc-notebook" },
      { label: "Computador Lento", to: "/servicos/computador-lento" },
      { label: "Computador Não Liga", to: "/servicos/computador-nao-liga" },
      { label: "Manutenção de TV", to: "/servicos/manutencao-tv" },
      { label: "Conserto de Placa", to: "/servicos/conserto-placa" },
      { label: "Montagem de PC", to: "/servicos/montagem-pc" },
      { label: "Redes e Wi-Fi", to: "/servicos/redes-wifi" },
      { label: "Backup e Recuperação", to: "/servicos/backup-recuperacao" },
      { label: "CFTV / Câmeras", to: "/cftv" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { label: "Como Funciona", to: "/como-funciona" },
      { label: "Preços e Políticas", to: "/precos-e-politicas" },
      { label: "Diagnóstico Técnico", to: "/diagnostico-tecnico" },
      { label: "Domicílio", to: "/atendimento-domicilio" },
      { label: "Coleta e Entrega", to: "/coleta-e-entrega" },
      { label: "Remoto", to: "/atendimento-remoto" },
      { label: "Empresas", to: "/suporte-empresas" },
      { label: "Equipamentos", to: "/equipamentos-atendidos" },
      { label: "Quando Não Compensa", to: "/quando-nao-compensa" },
      { label: "Casos Reais", to: "/problemas-reais-e-casos" },
    ],
  },
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

          {/* Dynamic sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="anim-fade-up">
              <h3 className="text-white/90 font-semibold mb-4 text-xs uppercase tracking-widest">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className={`${footerLink} hover-lift inline-block`}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

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

        <div className="border-t border-white/[0.08] pt-7 text-center space-y-2 spotlight-sweep">
          <p className="text-white/45 text-sm">
            © {currentYear} Técnico Curitiba - Assistência Técnica em Informática. Todos os direitos reservados.
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
          </p>
        </div>
      </div>
    </footer>
  );
};
