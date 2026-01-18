import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Servicos from "./pages/Servicos";
import AtendimentoDomicilio from "./pages/AtendimentoDomicilio";
import AtendimentoRemoto from "./pages/AtendimentoRemoto";
import SuporteEmpresas from "./pages/SuporteEmpresas";
import PrecosEPoliticas from "./pages/PrecosEPoliticas";
import TecnicoInformaticaCuritiba from "./pages/TecnicoInformaticaCuritiba";
import TecnicoInformaticaSaoJosePinhais from "./pages/TecnicoInformaticaSaoJosePinhais";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

// Bairros Curitiba
import Centro from "./pages/bairros/Centro";
import Batel from "./pages/bairros/Batel";
import Portao from "./pages/bairros/Portao";
import CampoComprido from "./pages/bairros/CampoComprido";
import CIC from "./pages/bairros/CIC";
import SantaFelicidade from "./pages/bairros/SantaFelicidade";

// Bairros São José dos Pinhais
import SaoJoseDosPinhais from "./pages/bairros/SaoJoseDosPinhais";
import AfonsoPena from "./pages/bairros/AfonsoPena";
import Cruzeiro from "./pages/bairros/Cruzeiro";
import Aristocrata from "./pages/bairros/Aristocrata";
import Braga from "./pages/bairros/Braga";
import Costeira from "./pages/bairros/Costeira";
import Aviacao from "./pages/bairros/Aviacao";
import ParqueDaFonte from "./pages/bairros/ParqueDaFonte";
import Guatupe from "./pages/bairros/Guatupe";
import SaoCristovao from "./pages/bairros/SaoCristovao";
import SaoDomingos from "./pages/bairros/SaoDomingos";
import SaoMarcos from "./pages/bairros/SaoMarcos";
import SaoFrancisco from "./pages/bairros/SaoFrancisco";
import DelRey from "./pages/bairros/DelRey";
import BarroPreto from "./pages/bairros/BarroPreto";

// Landing Pages Ads
import TecnicoInformaticaCuritibaAds from "./pages/ads/TecnicoInformaticaCuritibaAds";

// Páginas de Serviços Individuais
import FormatacaoComputador from "./pages/servicos/FormatacaoComputador";
import RemocaoVirus from "./pages/servicos/RemocaoVirus";
import UpgradeSsdMemoria from "./pages/servicos/UpgradeSsdMemoria";
import ConsertoPcNotebook from "./pages/servicos/ConsertoPcNotebook";
import RedesWifi from "./pages/servicos/RedesWifi";
import BackupRecuperacao from "./pages/servicos/BackupRecuperacao";
import MontagemPc from "./pages/servicos/MontagemPc";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/atendimento-domicilio" element={<AtendimentoDomicilio />} />
          <Route path="/atendimento-remoto" element={<AtendimentoRemoto />} />
          <Route path="/suporte-empresas" element={<SuporteEmpresas />} />
          <Route path="/precos-e-politicas" element={<PrecosEPoliticas />} />
          <Route path="/tecnico-informatica-curitiba" element={<TecnicoInformaticaCuritiba />} />
          <Route path="/tecnico-informatica-sao-jose-pinhais" element={<TecnicoInformaticaSaoJosePinhais />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* Bairros Curitiba */}
          <Route path="/bairros/centro" element={<Centro />} />
          <Route path="/bairros/batel" element={<Batel />} />
          <Route path="/bairros/portao" element={<Portao />} />
          <Route path="/bairros/campo-comprido" element={<CampoComprido />} />
          <Route path="/bairros/cic" element={<CIC />} />
          <Route path="/bairros/santa-felicidade" element={<SantaFelicidade />} />
          
          {/* Bairros São José dos Pinhais */}
          <Route path="/bairros/sao-jose-dos-pinhais" element={<SaoJoseDosPinhais />} />
          <Route path="/bairros/afonso-pena" element={<AfonsoPena />} />
          <Route path="/bairros/cruzeiro" element={<Cruzeiro />} />
          <Route path="/bairros/aristocrata" element={<Aristocrata />} />
          <Route path="/bairros/braga" element={<Braga />} />
          <Route path="/bairros/costeira" element={<Costeira />} />
          <Route path="/bairros/aviacao" element={<Aviacao />} />
          <Route path="/bairros/parque-da-fonte" element={<ParqueDaFonte />} />
          <Route path="/bairros/guatupe" element={<Guatupe />} />
          <Route path="/bairros/sao-cristovao" element={<SaoCristovao />} />
          <Route path="/bairros/sao-domingos" element={<SaoDomingos />} />
          <Route path="/bairros/sao-marcos" element={<SaoMarcos />} />
          <Route path="/bairros/sao-francisco" element={<SaoFrancisco />} />
          <Route path="/bairros/del-rey" element={<DelRey />} />
          <Route path="/bairros/barro-preto" element={<BarroPreto />} />
          
          {/* Landing Pages Ads */}
          <Route path="/ads/tecnico-informatica-curitiba" element={<TecnicoInformaticaCuritibaAds />} />
          
          {/* Páginas de Serviços */}
          <Route path="/servicos/formatacao-computador" element={<FormatacaoComputador />} />
          <Route path="/servicos/remocao-virus" element={<RemocaoVirus />} />
          <Route path="/servicos/upgrade-ssd-memoria" element={<UpgradeSsdMemoria />} />
          <Route path="/servicos/conserto-pc-notebook" element={<ConsertoPcNotebook />} />
          <Route path="/servicos/redes-wifi" element={<RedesWifi />} />
          <Route path="/servicos/backup-recuperacao" element={<BackupRecuperacao />} />
          <Route path="/servicos/montagem-pc" element={<MontagemPc />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
