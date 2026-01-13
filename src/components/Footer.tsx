import { Link } from "react-router-dom";
import { MapPin, Phone, MessageCircle } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-10 md:py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo e Contato */}
          <div className="space-y-4">
            <img
              alt="Técnico Curitiba"
              className="h-10 brightness-0 invert object-scale-down"
              src="/lovable-uploads/c858cf99-e05f-4d8f-a05a-c741ebfabfea.png"
            />
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
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <a href="tel:+5541997452053" className="hover:text-white transition-colors">
                (41) 9.9745-2053
              </a>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-white font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/servicos" className="text-white/70 hover:text-white text-sm transition-colors">
                  Todos os Serviços
                </Link>
              </li>
              <li>
                <Link to="/atendimento-domicilio" className="text-white/70 hover:text-white text-sm transition-colors">
                  Atendimento em Domicílio
                </Link>
              </li>
              <li>
                <Link to="/atendimento-remoto" className="text-white/70 hover:text-white text-sm transition-colors">
                  Atendimento Remoto
                </Link>
              </li>
              <li>
                <Link to="/suporte-empresas" className="text-white/70 hover:text-white text-sm transition-colors">
                  Suporte para Empresas
                </Link>
              </li>
            </ul>
          </div>

          {/* Regiões */}
          <div>
            <h3 className="text-white font-semibold mb-4">Regiões</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tecnico-informatica-curitiba" className="text-white/70 hover:text-white text-sm transition-colors">
                  Técnico em Curitiba
                </Link>
              </li>
              <li>
                <Link to="/tecnico-informatica-sao-jose-pinhais" className="text-white/70 hover:text-white text-sm transition-colors">
                  Técnico em São José dos Pinhais
                </Link>
              </li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-white font-semibold mb-4">Institucional</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sobre" className="text-white/70 hover:text-white text-sm transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-white/70 hover:text-white text-sm transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-white text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/70 hover:text-white text-sm transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Técnico Curitiba - Assistência Técnica em Informática. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
