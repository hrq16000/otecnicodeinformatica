import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Servicos from "./pages/Servicos";
import AtendimentoDomicilio from "./pages/AtendimentoDomicilio";
import AtendimentoRemoto from "./pages/AtendimentoRemoto";
import SuporteEmpresas from "./pages/SuporteEmpresas";
import PrecosEPoliticas from "./pages/PrecosEPoliticas";
import TecnicoInformaticaCuritiba from "./pages/TecnicoInformaticaCuritiba";
import TecnicoInformaticaSaoJosePinhais from "./pages/TecnicoInformaticaSaoJosePinhais";
import TecnicoInformaticaAraucaria from "./pages/TecnicoInformaticaAraucaria";
import TecnicoInformaticaCampoLargo from "./pages/TecnicoInformaticaCampoLargo";
import TecnicoInformaticaPinhais from "./pages/TecnicoInformaticaPinhais";
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

// Bairros Araucária
import AraucariaCentro from "./pages/bairros/AraucariaCentro";
import CapelaVelhaAraucaria from "./pages/bairros/CapelaVelhaAraucaria";
import ThomazCoelhoAraucaria from "./pages/bairros/ThomazCoelhoAraucaria";

// Bairros Campo Largo
import CampoLargoCentro from "./pages/bairros/CampoLargoCentro";
import FerrariaCampoLargo from "./pages/bairros/FerrariaCampoLargo";
import JardimGuilherminaCampoLargo from "./pages/bairros/JardimGuilherminaCampoLargo";

// Bairros Pinhais
import PinhaisCentro from "./pages/bairros/PinhaisCentro";
import WeissopolisPinhais from "./pages/bairros/WeissopolisPinhais";
import PinevillePinhais from "./pages/bairros/PinevillePinhais";

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

// Páginas combinadas Serviço + Bairro
import FormatacaoCentro from "./pages/servico-bairro/FormatacaoCentro";
import ConsertoNotebookBatel from "./pages/servico-bairro/ConsertoNotebookBatel";
import RemocaoVirusPortao from "./pages/servico-bairro/RemocaoVirusPortao";
import UpgradeSsdSantaFelicidade from "./pages/servico-bairro/UpgradeSsdSantaFelicidade";
import FormatacaoSaoJosePinhais from "./pages/servico-bairro/FormatacaoSaoJosePinhais";
import ConsertoNotebookCIC from "./pages/servico-bairro/ConsertoNotebookCIC";
import RedesWifiAraucaria from "./pages/servico-bairro/RedesWifiAraucaria";
import RemocaoVirusCentro from "./pages/servico-bairro/RemocaoVirusCentro";
import UpgradeSsdBatel from "./pages/servico-bairro/UpgradeSsdBatel";
import FormatacaoPortao from "./pages/servico-bairro/FormatacaoPortao";
import RedesWifiCIC from "./pages/servico-bairro/RedesWifiCIC";
import BackupCentro from "./pages/servico-bairro/BackupCentro";
import ConsertoNotebookPortao from "./pages/servico-bairro/ConsertoNotebookPortao";
import RedesWifiSantaFelicidade from "./pages/servico-bairro/RedesWifiSantaFelicidade";
import FormatacaoCampoComprido from "./pages/servico-bairro/FormatacaoCampoComprido";
import RemocaoVirusBatel from "./pages/servico-bairro/RemocaoVirusBatel";
import MontagemPcCIC from "./pages/servico-bairro/MontagemPcCIC";

// SJP - Serviço + Cidade
import RemocaoVirusSaoJosePinhais from "./pages/servico-bairro/RemocaoVirusSaoJosePinhais";
import ConsertoNotebookSaoJosePinhais from "./pages/servico-bairro/ConsertoNotebookSaoJosePinhais";
import UpgradeSsdSaoJosePinhais from "./pages/servico-bairro/UpgradeSsdSaoJosePinhais";
import RedesWifiSaoJosePinhais from "./pages/servico-bairro/RedesWifiSaoJosePinhais";

// Araucária - Serviço + Cidade
import FormatacaoAraucaria from "./pages/servico-bairro/FormatacaoAraucaria";
import RemocaoVirusAraucaria from "./pages/servico-bairro/RemocaoVirusAraucaria";
import ConsertoNotebookAraucaria from "./pages/servico-bairro/ConsertoNotebookAraucaria";
import UpgradeSsdAraucaria from "./pages/servico-bairro/UpgradeSsdAraucaria";

// Campo Largo - Serviço + Cidade
import FormatacaoCampoLargo from "./pages/servico-bairro/FormatacaoCampoLargo";
import RemocaoVirusCampoLargo from "./pages/servico-bairro/RemocaoVirusCampoLargo";
import ConsertoNotebookCampoLargo from "./pages/servico-bairro/ConsertoNotebookCampoLargo";
import RedesWifiCampoLargo from "./pages/servico-bairro/RedesWifiCampoLargo";

// Pinhais - Serviço + Cidade
import FormatacaoPinhais from "./pages/servico-bairro/FormatacaoPinhais";
import RemocaoVirusPinhais from "./pages/servico-bairro/RemocaoVirusPinhais";
import ConsertoNotebookPinhais from "./pages/servico-bairro/ConsertoNotebookPinhais";
import UpgradeSsdPinhais from "./pages/servico-bairro/UpgradeSsdPinhais";

import CFTVPage from "./pages/CFTV";
import CFTVCuritiba from "./pages/cftv/CFTVCuritiba";
import CFTVSaoJosePinhais from "./pages/cftv/CFTVSaoJosePinhais";
import CFTVLitoral from "./pages/cftv/CFTVLitoral";
import CFTVGuaratuba from "./pages/cftv/CFTVGuaratuba";
import CFTVAraucaria from "./pages/cftv/CFTVAraucaria";
import CFTVCampoLargo from "./pages/cftv/CFTVCampoLargo";
import CFTVPinhais from "./pages/cftv/CFTVPinhais";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/atendimento-domicilio" element={<AtendimentoDomicilio />} />
          <Route path="/atendimento-remoto" element={<AtendimentoRemoto />} />
          <Route path="/suporte-empresas" element={<SuporteEmpresas />} />
          <Route path="/precos-e-politicas" element={<PrecosEPoliticas />} />
          
          {/* Páginas de Cidades */}
          <Route path="/tecnico-informatica-curitiba" element={<TecnicoInformaticaCuritiba />} />
          <Route path="/tecnico-informatica-sao-jose-pinhais" element={<TecnicoInformaticaSaoJosePinhais />} />
          <Route path="/tecnico-informatica-araucaria" element={<TecnicoInformaticaAraucaria />} />
          <Route path="/tecnico-informatica-campo-largo" element={<TecnicoInformaticaCampoLargo />} />
          <Route path="/tecnico-informatica-pinhais" element={<TecnicoInformaticaPinhais />} />
          
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

          {/* Bairros Araucária */}
          <Route path="/bairros/centro-araucaria" element={<AraucariaCentro />} />
          <Route path="/bairros/capela-velha" element={<CapelaVelhaAraucaria />} />
          <Route path="/bairros/thomaz-coelho" element={<ThomazCoelhoAraucaria />} />

          {/* Bairros Campo Largo */}
          <Route path="/bairros/centro-campo-largo" element={<CampoLargoCentro />} />
          <Route path="/bairros/ferraria" element={<FerrariaCampoLargo />} />
          <Route path="/bairros/jardim-guilhermina" element={<JardimGuilherminaCampoLargo />} />

          {/* Bairros Pinhais */}
          <Route path="/bairros/centro-pinhais" element={<PinhaisCentro />} />
          <Route path="/bairros/weissopolis" element={<WeissopolisPinhais />} />
          <Route path="/bairros/pineville" element={<PinevillePinhais />} />
          
          {/* Landing Pages Ads */}
          <Route path="/ads/tecnico-informatica-curitiba" element={<TecnicoInformaticaCuritibaAds />} />
          
          {/* CFTV */}
          <Route path="/cftv" element={<CFTVPage />} />
          <Route path="/cftv/curitiba" element={<CFTVCuritiba />} />
          <Route path="/cftv/sao-jose-dos-pinhais" element={<CFTVSaoJosePinhais />} />
          <Route path="/cftv/litoral" element={<CFTVLitoral />} />
          <Route path="/cftv/guaratuba" element={<CFTVGuaratuba />} />
          <Route path="/cftv/araucaria" element={<CFTVAraucaria />} />
          <Route path="/cftv/campo-largo" element={<CFTVCampoLargo />} />
          <Route path="/cftv/pinhais" element={<CFTVPinhais />} />
          
          {/* Páginas de Serviços */}
          <Route path="/servicos/formatacao-computador" element={<FormatacaoComputador />} />
          <Route path="/servicos/remocao-virus" element={<RemocaoVirus />} />
          <Route path="/servicos/upgrade-ssd-memoria" element={<UpgradeSsdMemoria />} />
          <Route path="/servicos/conserto-pc-notebook" element={<ConsertoPcNotebook />} />
          <Route path="/servicos/redes-wifi" element={<RedesWifi />} />
          <Route path="/servicos/backup-recuperacao" element={<BackupRecuperacao />} />
          <Route path="/servicos/montagem-pc" element={<MontagemPc />} />
          
          {/* Páginas combinadas Serviço + Bairro (SEO local) */}
          <Route path="/servicos/formatacao-computador/centro" element={<FormatacaoCentro />} />
          <Route path="/servicos/conserto-pc-notebook/batel" element={<ConsertoNotebookBatel />} />
          <Route path="/servicos/remocao-virus/portao" element={<RemocaoVirusPortao />} />
          <Route path="/servicos/upgrade-ssd-memoria/santa-felicidade" element={<UpgradeSsdSantaFelicidade />} />
          <Route path="/servicos/formatacao-computador/sao-jose-dos-pinhais" element={<FormatacaoSaoJosePinhais />} />
          <Route path="/servicos/conserto-pc-notebook/cic" element={<ConsertoNotebookCIC />} />
          <Route path="/servicos/redes-wifi/araucaria" element={<RedesWifiAraucaria />} />
          <Route path="/servicos/remocao-virus/centro" element={<RemocaoVirusCentro />} />
          <Route path="/servicos/upgrade-ssd-memoria/batel" element={<UpgradeSsdBatel />} />
          <Route path="/servicos/formatacao-computador/portao" element={<FormatacaoPortao />} />
          <Route path="/servicos/redes-wifi/cic" element={<RedesWifiCIC />} />
          <Route path="/servicos/backup-recuperacao/centro" element={<BackupCentro />} />
          <Route path="/servicos/conserto-pc-notebook/portao" element={<ConsertoNotebookPortao />} />
          <Route path="/servicos/redes-wifi/santa-felicidade" element={<RedesWifiSantaFelicidade />} />
          <Route path="/servicos/formatacao-computador/campo-comprido" element={<FormatacaoCampoComprido />} />
          <Route path="/servicos/remocao-virus/batel" element={<RemocaoVirusBatel />} />
          <Route path="/servicos/montagem-pc/cic" element={<MontagemPcCIC />} />
          
          {/* SJP - Serviço + Cidade */}
          <Route path="/servicos/remocao-virus/sao-jose-dos-pinhais" element={<RemocaoVirusSaoJosePinhais />} />
          <Route path="/servicos/conserto-pc-notebook/sao-jose-dos-pinhais" element={<ConsertoNotebookSaoJosePinhais />} />
          <Route path="/servicos/upgrade-ssd-memoria/sao-jose-dos-pinhais" element={<UpgradeSsdSaoJosePinhais />} />
          <Route path="/servicos/redes-wifi/sao-jose-dos-pinhais" element={<RedesWifiSaoJosePinhais />} />
          
          {/* Araucária - Serviço + Cidade */}
          <Route path="/servicos/formatacao-computador/araucaria" element={<FormatacaoAraucaria />} />
          <Route path="/servicos/remocao-virus/araucaria" element={<RemocaoVirusAraucaria />} />
          <Route path="/servicos/conserto-pc-notebook/araucaria" element={<ConsertoNotebookAraucaria />} />
          <Route path="/servicos/upgrade-ssd-memoria/araucaria" element={<UpgradeSsdAraucaria />} />
          
          {/* Campo Largo - Serviço + Cidade */}
          <Route path="/servicos/formatacao-computador/campo-largo" element={<FormatacaoCampoLargo />} />
          <Route path="/servicos/remocao-virus/campo-largo" element={<RemocaoVirusCampoLargo />} />
          <Route path="/servicos/conserto-pc-notebook/campo-largo" element={<ConsertoNotebookCampoLargo />} />
          <Route path="/servicos/redes-wifi/campo-largo" element={<RedesWifiCampoLargo />} />
          
          {/* Pinhais - Serviço + Cidade */}
          <Route path="/servicos/formatacao-computador/pinhais" element={<FormatacaoPinhais />} />
          <Route path="/servicos/remocao-virus/pinhais" element={<RemocaoVirusPinhais />} />
          <Route path="/servicos/conserto-pc-notebook/pinhais" element={<ConsertoNotebookPinhais />} />
          <Route path="/servicos/upgrade-ssd-memoria/pinhais" element={<UpgradeSsdPinhais />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
