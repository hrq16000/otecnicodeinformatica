import { Link } from "react-router-dom";
import { MapPin, MessageCircle } from "lucide-react";

const footerLink = "text-white/70 hover:text-white text-sm transition-colors";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary py-10 md:py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
          {/* Logo e Contato */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-4">
            <img
              alt="Técnico Curitiba"
              className="h-10 brightness-0 invert object-fill"
              src="/lovable-uploads/c858cf99-e05f-4d8f-a05a-c741ebfabfea.webp"
              width="200"
              height="40"
              loading="lazy"
            />
            <p className="text-white/60 text-sm max-w-xs">
              Assistência técnica em informática Nº1 de Curitiba e região. Atendimento a domicílio no mesmo dia.
            </p>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>Curitiba e Região Metropolitana, PR</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MessageCircle className="h-4 w-4 flex-shrink-0" />
              <a href="https://wa.me/5541997452053" className="hover:text-white transition-colors">
                (41) 9.9745-2053
              </a>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Serviços</h3>
            <ul className="space-y-2">
              {[
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
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={footerLink}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Atendimento</h3>
            <ul className="space-y-2">
              {[
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
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={footerLink}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regiões */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Regiões</h3>
            <ul className="space-y-2">
              {[
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
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={footerLink}>{item.label}</Link>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold mb-3 mt-6 text-sm uppercase tracking-wider">Bairros</h3>
            <ul className="space-y-2">
              {[
                { label: "Centro", to: "/bairros/centro" },
                { label: "Batel", to: "/bairros/batel" },
                { label: "Portão", to: "/bairros/portao" },
                { label: "Santa Felicidade", to: "/bairros/santa-felicidade" },
                { label: "CIC", to: "/bairros/cic" },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={footerLink}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Saiba Mais</h3>
            <ul className="space-y-2">
              {[
                { label: "Blog", to: "/blog" },
                { label: "FAQ", to: "/faq" },
                { label: "Sobre Nós", to: "/sobre" },
                { label: "Contato", to: "/contato" },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={footerLink}>{item.label}</Link>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold mb-3 mt-6 text-sm uppercase tracking-wider">Blog</h3>
            <ul className="space-y-2">
              {[
                { label: "Computador Lento", to: "/blog/computador-lento-causas-solucoes" },
                { label: "PC com Vírus?", to: "/blog/como-saber-se-pc-tem-virus-malware" },
                { label: "Notebook Não Liga", to: "/blog/notebook-nao-liga-o-que-fazer" },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={footerLink}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center space-y-2">
          <p className="text-white/60 text-sm">
            © {currentYear} Técnico Curitiba - Assistência Técnica em Informática. Todos os direitos reservados.
          </p>
          <p className="text-white/40 text-xs">
            Uma empresa do ecossistema{" "}
            <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white underline transition-colors">
              Preciso de Um
            </a>
            {" · "}
            <a href="https://mestredosservicos.com.br" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white underline transition-colors">
              Mestre dos Serviços
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
