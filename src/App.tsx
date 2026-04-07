import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { CursorTrail } from "@/components/CursorTrail";
import { PageTransition } from "@/components/PageTransition";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useParallax } from "@/hooks/useParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import Index from "./pages/Index";

// Lazy-loaded pages for code splitting & faster initial load
const Servicos = lazy(() => import("./pages/Servicos"));
const AtendimentoDomicilio = lazy(() => import("./pages/AtendimentoDomicilio"));
const AtendimentoRemoto = lazy(() => import("./pages/AtendimentoRemoto"));
const SuporteEmpresas = lazy(() => import("./pages/SuporteEmpresas"));
const PrecosEPoliticas = lazy(() => import("./pages/PrecosEPoliticas"));
const TecnicoInformaticaCuritiba = lazy(() => import("./pages/TecnicoInformaticaCuritiba"));
const TecnicoInformaticaSaoJosePinhais = lazy(() => import("./pages/TecnicoInformaticaSaoJosePinhais"));
const TecnicoInformaticaAraucaria = lazy(() => import("./pages/TecnicoInformaticaAraucaria"));
const TecnicoInformaticaCampoLargo = lazy(() => import("./pages/TecnicoInformaticaCampoLargo"));
const TecnicoInformaticaPinhais = lazy(() => import("./pages/TecnicoInformaticaPinhais"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Contato = lazy(() => import("./pages/Contato"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FAQ = lazy(() => import("./pages/FAQ"));
const ComoFunciona = lazy(() => import("./pages/ComoFunciona"));
const DiagnosticoTecnico = lazy(() => import("./pages/DiagnosticoTecnico"));
const EquipamentosAtendidos = lazy(() => import("./pages/EquipamentosAtendidos"));
const ProblemasReaisCasos = lazy(() => import("./pages/ProblemasReaisCasos"));
const ColetaEntrega = lazy(() => import("./pages/ColetaEntrega"));
const QuandoNaoCompensa = lazy(() => import("./pages/QuandoNaoCompensa"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Bairros Curitiba
const Centro = lazy(() => import("./pages/bairros/Centro"));
const Batel = lazy(() => import("./pages/bairros/Batel"));
const Portao = lazy(() => import("./pages/bairros/Portao"));
const CampoComprido = lazy(() => import("./pages/bairros/CampoComprido"));
const CIC = lazy(() => import("./pages/bairros/CIC"));
const SantaFelicidade = lazy(() => import("./pages/bairros/SantaFelicidade"));

// Bairros São José dos Pinhais
const SaoJoseDosPinhais = lazy(() => import("./pages/bairros/SaoJoseDosPinhais"));
const AfonsoPena = lazy(() => import("./pages/bairros/AfonsoPena"));
const Cruzeiro = lazy(() => import("./pages/bairros/Cruzeiro"));
const Aristocrata = lazy(() => import("./pages/bairros/Aristocrata"));
const Braga = lazy(() => import("./pages/bairros/Braga"));
const Costeira = lazy(() => import("./pages/bairros/Costeira"));
const Aviacao = lazy(() => import("./pages/bairros/Aviacao"));
const ParqueDaFonte = lazy(() => import("./pages/bairros/ParqueDaFonte"));
const Guatupe = lazy(() => import("./pages/bairros/Guatupe"));
const SaoCristovao = lazy(() => import("./pages/bairros/SaoCristovao"));
const SaoDomingos = lazy(() => import("./pages/bairros/SaoDomingos"));
const SaoMarcos = lazy(() => import("./pages/bairros/SaoMarcos"));
const SaoFrancisco = lazy(() => import("./pages/bairros/SaoFrancisco"));
const DelRey = lazy(() => import("./pages/bairros/DelRey"));
const BarroPreto = lazy(() => import("./pages/bairros/BarroPreto"));

// Bairros Araucária
const AraucariaCentro = lazy(() => import("./pages/bairros/AraucariaCentro"));
const CapelaVelhaAraucaria = lazy(() => import("./pages/bairros/CapelaVelhaAraucaria"));
const ThomazCoelhoAraucaria = lazy(() => import("./pages/bairros/ThomazCoelhoAraucaria"));

// Bairros Campo Largo
const CampoLargoCentro = lazy(() => import("./pages/bairros/CampoLargoCentro"));
const FerrariaCampoLargo = lazy(() => import("./pages/bairros/FerrariaCampoLargo"));
const JardimGuilherminaCampoLargo = lazy(() => import("./pages/bairros/JardimGuilherminaCampoLargo"));

// Bairros Pinhais
const PinhaisCentro = lazy(() => import("./pages/bairros/PinhaisCentro"));
const WeissopolisPinhais = lazy(() => import("./pages/bairros/WeissopolisPinhais"));
const PinevillePinhais = lazy(() => import("./pages/bairros/PinevillePinhais"));

// Novas cidades
const TecnicoInformaticaColombo = lazy(() => import("./pages/TecnicoInformaticaColombo"));
const TecnicoInformaticaFazendaRioGrande = lazy(() => import("./pages/TecnicoInformaticaFazendaRioGrande"));
const TecnicoInformaticaAlmiranteTamandare = lazy(() => import("./pages/TecnicoInformaticaAlmiranteTamandare"));

// Bairros Colombo
const CentroColombo = lazy(() => import("./pages/bairros/CentroColombo"));
const MaracanaColombo = lazy(() => import("./pages/bairros/MaracanaColombo"));
const GuaraitubaColombo = lazy(() => import("./pages/bairros/GuaraitubaColombo"));

// Bairros Fazenda Rio Grande
const CentroFRG = lazy(() => import("./pages/bairros/CentroFRG"));
const EucaliptosFRG = lazy(() => import("./pages/bairros/EucaliptosFRG"));
const NacoesFRG = lazy(() => import("./pages/bairros/NacoesFRG"));

// Bairros Almirante Tamandaré
const CentroAlmiranteTamandare = lazy(() => import("./pages/bairros/CentroAlmiranteTamandare"));
const JardimMontoSantoAT = lazy(() => import("./pages/bairros/JardimMontoSantoAT"));
const CachoeiraAT = lazy(() => import("./pages/bairros/CachoeiraAT"));

const TecnicoInformaticaCuritibaAds = lazy(() => import("./pages/ads/TecnicoInformaticaCuritibaAds"));

// Páginas de Serviços Individuais
const FormatacaoComputador = lazy(() => import("./pages/servicos/FormatacaoComputador"));
const RemocaoVirus = lazy(() => import("./pages/servicos/RemocaoVirus"));
const UpgradeSsdMemoria = lazy(() => import("./pages/servicos/UpgradeSsdMemoria"));
const ConsertoPcNotebook = lazy(() => import("./pages/servicos/ConsertoPcNotebook"));
const RedesWifi = lazy(() => import("./pages/servicos/RedesWifi"));
const BackupRecuperacao = lazy(() => import("./pages/servicos/BackupRecuperacao"));
const MontagemPc = lazy(() => import("./pages/servicos/MontagemPc"));
const ComputadorLento = lazy(() => import("./pages/servicos/ComputadorLento"));
const ComputadorNaoLiga = lazy(() => import("./pages/servicos/ComputadorNaoLiga"));
const ManutencaoTV = lazy(() => import("./pages/servicos/ManutencaoTV"));
const ConsertoPlaca = lazy(() => import("./pages/servicos/ConsertoPlaca"));

// Novas cidades
const TecnicoInformaticaPiraquara = lazy(() => import("./pages/TecnicoInformaticaPiraquara"));
const TecnicoInformaticaCampoMagro = lazy(() => import("./pages/TecnicoInformaticaCampoMagro"));
const TecnicoInformaticaQuatroBarras = lazy(() => import("./pages/TecnicoInformaticaQuatroBarras"));

// Páginas combinadas Serviço + Bairro
const FormatacaoCentro = lazy(() => import("./pages/servico-bairro/FormatacaoCentro"));
const ConsertoNotebookBatel = lazy(() => import("./pages/servico-bairro/ConsertoNotebookBatel"));
const RemocaoVirusPortao = lazy(() => import("./pages/servico-bairro/RemocaoVirusPortao"));
const UpgradeSsdSantaFelicidade = lazy(() => import("./pages/servico-bairro/UpgradeSsdSantaFelicidade"));
const FormatacaoSaoJosePinhais = lazy(() => import("./pages/servico-bairro/FormatacaoSaoJosePinhais"));
const ConsertoNotebookCIC = lazy(() => import("./pages/servico-bairro/ConsertoNotebookCIC"));
const RedesWifiAraucaria = lazy(() => import("./pages/servico-bairro/RedesWifiAraucaria"));
const RemocaoVirusCentro = lazy(() => import("./pages/servico-bairro/RemocaoVirusCentro"));
const UpgradeSsdBatel = lazy(() => import("./pages/servico-bairro/UpgradeSsdBatel"));
const FormatacaoPortao = lazy(() => import("./pages/servico-bairro/FormatacaoPortao"));
const RedesWifiCIC = lazy(() => import("./pages/servico-bairro/RedesWifiCIC"));
const BackupCentro = lazy(() => import("./pages/servico-bairro/BackupCentro"));
const ConsertoNotebookPortao = lazy(() => import("./pages/servico-bairro/ConsertoNotebookPortao"));
const RedesWifiSantaFelicidade = lazy(() => import("./pages/servico-bairro/RedesWifiSantaFelicidade"));
const FormatacaoCampoComprido = lazy(() => import("./pages/servico-bairro/FormatacaoCampoComprido"));
const RemocaoVirusBatel = lazy(() => import("./pages/servico-bairro/RemocaoVirusBatel"));
const MontagemPcCIC = lazy(() => import("./pages/servico-bairro/MontagemPcCIC"));

// SJP
const RemocaoVirusSaoJosePinhais = lazy(() => import("./pages/servico-bairro/RemocaoVirusSaoJosePinhais"));
const ConsertoNotebookSaoJosePinhais = lazy(() => import("./pages/servico-bairro/ConsertoNotebookSaoJosePinhais"));
const UpgradeSsdSaoJosePinhais = lazy(() => import("./pages/servico-bairro/UpgradeSsdSaoJosePinhais"));
const RedesWifiSaoJosePinhais = lazy(() => import("./pages/servico-bairro/RedesWifiSaoJosePinhais"));

// Araucária
const FormatacaoAraucaria = lazy(() => import("./pages/servico-bairro/FormatacaoAraucaria"));
const RemocaoVirusAraucaria = lazy(() => import("./pages/servico-bairro/RemocaoVirusAraucaria"));
const ConsertoNotebookAraucaria = lazy(() => import("./pages/servico-bairro/ConsertoNotebookAraucaria"));
const UpgradeSsdAraucaria = lazy(() => import("./pages/servico-bairro/UpgradeSsdAraucaria"));

// Campo Largo
const FormatacaoCampoLargo = lazy(() => import("./pages/servico-bairro/FormatacaoCampoLargo"));
const RemocaoVirusCampoLargo = lazy(() => import("./pages/servico-bairro/RemocaoVirusCampoLargo"));
const ConsertoNotebookCampoLargo = lazy(() => import("./pages/servico-bairro/ConsertoNotebookCampoLargo"));
const RedesWifiCampoLargo = lazy(() => import("./pages/servico-bairro/RedesWifiCampoLargo"));

// Pinhais
const FormatacaoPinhais = lazy(() => import("./pages/servico-bairro/FormatacaoPinhais"));
const RemocaoVirusPinhais = lazy(() => import("./pages/servico-bairro/RemocaoVirusPinhais"));
const ConsertoNotebookPinhais = lazy(() => import("./pages/servico-bairro/ConsertoNotebookPinhais"));
const UpgradeSsdPinhais = lazy(() => import("./pages/servico-bairro/UpgradeSsdPinhais"));

// Dynamic service+city page
const ServicoCidadePage = lazy(() => import("./pages/servico-bairro/ServicoCidadePage"));

// Dynamic problem/intent pages (50 páginas de intenção de busca)
const ProblemaPage = lazy(() => import("./pages/ProblemaPage"));

// CFTV
const CFTVPage = lazy(() => import("./pages/CFTV"));
const CFTVCuritiba = lazy(() => import("./pages/cftv/CFTVCuritiba"));
const CFTVSaoJosePinhais = lazy(() => import("./pages/cftv/CFTVSaoJosePinhais"));
const CFTVLitoral = lazy(() => import("./pages/cftv/CFTVLitoral"));
const CFTVGuaratuba = lazy(() => import("./pages/cftv/CFTVGuaratuba"));
const CFTVAraucaria = lazy(() => import("./pages/cftv/CFTVAraucaria"));
const CFTVCampoLargo = lazy(() => import("./pages/cftv/CFTVCampoLargo"));
const CFTVPinhais = lazy(() => import("./pages/cftv/CFTVPinhais"));

const queryClient = new QueryClient();

// Minimal loading fallback — invisible to avoid layout shift
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

/** Initializes global scroll animations + parallax on each route */
const ScrollAnimationsInit = () => { useScrollAnimations(); useParallax(); useRevealOnScroll(); return null; };

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ScrollProgressBar />
        <CursorTrail />
        <ScrollAnimationsInit />
        <Suspense fallback={<PageLoader />}>
        <PageTransition>
            <Route path="/" element={<Index />} />
            <Route path="/index" element={<Index />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/atendimento-domicilio" element={<AtendimentoDomicilio />} />
            <Route path="/atendimento-remoto" element={<AtendimentoRemoto />} />
            <Route path="/suporte-empresas" element={<SuporteEmpresas />} />
            <Route path="/precos-e-politicas" element={<PrecosEPoliticas />} />
            <Route path="/valores" element={<PrecosEPoliticas />} />
            
            {/* Páginas de Cidades */}
            <Route path="/tecnico-informatica-curitiba" element={<TecnicoInformaticaCuritiba />} />
            <Route path="/tecnico-informatica-sao-jose-pinhais" element={<TecnicoInformaticaSaoJosePinhais />} />
            <Route path="/tecnico-informatica-araucaria" element={<TecnicoInformaticaAraucaria />} />
            <Route path="/tecnico-informatica-campo-largo" element={<TecnicoInformaticaCampoLargo />} />
            <Route path="/tecnico-informatica-pinhais" element={<TecnicoInformaticaPinhais />} />
            <Route path="/tecnico-informatica-colombo" element={<TecnicoInformaticaColombo />} />
            <Route path="/tecnico-informatica-fazenda-rio-grande" element={<TecnicoInformaticaFazendaRioGrande />} />
            <Route path="/tecnico-informatica-almirante-tamandare" element={<TecnicoInformaticaAlmiranteTamandare />} />
            <Route path="/tecnico-informatica-piraquara" element={<TecnicoInformaticaPiraquara />} />
            <Route path="/tecnico-informatica-campo-magro" element={<TecnicoInformaticaCampoMagro />} />
            <Route path="/tecnico-informatica-quatro-barras" element={<TecnicoInformaticaQuatroBarras />} />
            
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/diagnostico-tecnico" element={<DiagnosticoTecnico />} />
            <Route path="/equipamentos-atendidos" element={<EquipamentosAtendidos />} />
            <Route path="/problemas-reais-e-casos" element={<ProblemasReaisCasos />} />
            <Route path="/coleta-e-entrega" element={<ColetaEntrega />} />
            <Route path="/quando-nao-compensa" element={<QuandoNaoCompensa />} />
            
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

            {/* Bairros Colombo */}
            <Route path="/bairros/centro-colombo" element={<CentroColombo />} />
            <Route path="/bairros/maracana-colombo" element={<MaracanaColombo />} />
            <Route path="/bairros/guaraituba-colombo" element={<GuaraitubaColombo />} />

            {/* Bairros Fazenda Rio Grande */}
            <Route path="/bairros/centro-fazenda-rio-grande" element={<CentroFRG />} />
            <Route path="/bairros/eucaliptos-frg" element={<EucaliptosFRG />} />
            <Route path="/bairros/nacoes-frg" element={<NacoesFRG />} />

            {/* Bairros Almirante Tamandaré */}
            <Route path="/bairros/centro-almirante-tamandare" element={<CentroAlmiranteTamandare />} />
            <Route path="/bairros/jardim-monte-santo" element={<JardimMontoSantoAT />} />
            <Route path="/bairros/cachoeira-at" element={<CachoeiraAT />} />
            
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
            <Route path="/servicos/computador-lento" element={<ComputadorLento />} />
            <Route path="/servicos/computador-nao-liga" element={<ComputadorNaoLiga />} />
            <Route path="/servicos/manutencao-tv" element={<ManutencaoTV />} />
            <Route path="/servicos/conserto-placa" element={<ConsertoPlaca />} />
            
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
            
            {/* Dynamic service+city route (catches all new combinations) */}
            <Route path="/servicos/:servico/:cidade" element={<ServicoCidadePage />} />
            
            {/* Páginas de Problema / Intenção de Busca (50 páginas dinâmicas) */}
            <Route path="/:slug" element={<ProblemaPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
