import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppChatbot } from "@/components/WhatsAppChatbot";
import { SocialProofProvider } from "@/components/social-proof";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { GA4ChecklistPanel } from "@/components/GA4ChecklistPanel";
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
const ColetaFormulario = lazy(() => import("./pages/ColetaFormulario"));
const QuandoNaoCompensa = lazy(() => import("./pages/QuandoNaoCompensa"));
const SejaParceiro = lazy(() => import("./pages/SejaParceiro"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AssistenciaTecnicaCuritiba = lazy(() => import("./pages/AssistenciaTecnicaCuritiba"));

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

const CacheiraAraucaria = lazy(() => import("./pages/bairros/CacheiraAraucaria"));
const ThomazCoelhoIIAraucaria = lazy(() => import("./pages/bairros/ThomazCoelhoIIAraucaria"));
const JardimBoaVistaAraucaria = lazy(() => import("./pages/bairros/JardimBoaVistaAraucaria"));
const SaoMiguelAraucaria = lazy(() => import("./pages/bairros/SaoMiguelAraucaria"));
const CaliforniaAraucaria = lazy(() => import("./pages/bairros/CaliforniaAraucaria"));
const VilaNovaAraucaria = lazy(() => import("./pages/bairros/VilaNovaAraucaria"));
const IndustrialAraucaria = lazy(() => import("./pages/bairros/IndustrialAraucaria"));
const JardimIguacuAraucaria = lazy(() => import("./pages/bairros/JardimIguacuAraucaria"));
const PlantaSaoTiagoAraucaria = lazy(() => import("./pages/bairros/PlantaSaoTiagoAraucaria"));
const JardimShangrilaAraucaria = lazy(() => import("./pages/bairros/JardimShangrilaAraucaria"));
const JardimLaranjeirasCL = lazy(() => import("./pages/bairros/JardimLaranjeirasCL"));
const SaoMarcosCampoLargo = lazy(() => import("./pages/bairros/SaoMarcosCampoLargo"));
const SaoJoseCampoLargo = lazy(() => import("./pages/bairros/SaoJoseCampoLargo"));
const JardimEsperancaCL = lazy(() => import("./pages/bairros/JardimEsperancaCL"));
const ColoniaMalhadaCL = lazy(() => import("./pages/bairros/ColoniaMalhadaCL"));
const LamenhaGrandeCL = lazy(() => import("./pages/bairros/LamenhaGrandeCL"));
const VilaCandidaCL = lazy(() => import("./pages/bairros/VilaCandidaCL"));
const JardimNovoHorizonteCL = lazy(() => import("./pages/bairros/JardimNovoHorizonteCL"));
const TimbotuvaCL = lazy(() => import("./pages/bairros/TimbotuvaCL"));
const JardimPlanaltoIICL = lazy(() => import("./pages/bairros/JardimPlanaltoIICL"));
const JardimPedroDemeterco = lazy(() => import("./pages/bairros/JardimPedroDemeterco"));
const JardimKarlaPinhais = lazy(() => import("./pages/bairros/JardimKarlaPinhais"));
const JardimClaudiaIIPinhais = lazy(() => import("./pages/bairros/JardimClaudiaIIPinhais"));
const JardimWissingerPinhais = lazy(() => import("./pages/bairros/JardimWissingerPinhais"));
const VilaAmeliaPinhais = lazy(() => import("./pages/bairros/VilaAmeliaPinhais"));
const JardimEsplanadaPinhais = lazy(() => import("./pages/bairros/JardimEsplanadaPinhais"));
const VilaMariaAntonietaPinhais = lazy(() => import("./pages/bairros/VilaMariaAntonietaPinhais"));
const JardimDonaRosaPinhais = lazy(() => import("./pages/bairros/JardimDonaRosaPinhais"));
const ParqueNascentesPinhais = lazy(() => import("./pages/bairros/ParqueNascentesPinhais"));
const JardimTropicalPinhais = lazy(() => import("./pages/bairros/JardimTropicalPinhais"));
// Bairros Campo Largo
const CampoLargoCentro = lazy(() => import("./pages/bairros/CampoLargoCentro"));
const FerrariaCampoLargo = lazy(() => import("./pages/bairros/FerrariaCampoLargo"));
const JardimGuilherminaCampoLargo = lazy(() => import("./pages/bairros/JardimGuilherminaCampoLargo"));

// Bairros Pinhais
const PinhaisCentro = lazy(() => import("./pages/bairros/PinhaisCentro"));
const WeissopolisPinhais = lazy(() => import("./pages/bairros/WeissopolisPinhais"));
const AltoGloria = lazy(() => import("./pages/bairros/AltoGloria"));
const Reboucas = lazy(() => import("./pages/bairros/Reboucas"));
const VilaIzabel = lazy(() => import("./pages/bairros/VilaIzabel"));
const Seminario = lazy(() => import("./pages/bairros/Seminario"));
const HugoLange = lazy(() => import("./pages/bairros/HugoLange"));
const JardimSocial = lazy(() => import("./pages/bairros/JardimSocial"));
const JardimAmericas = lazy(() => import("./pages/bairros/JardimAmericas"));
const Taruma = lazy(() => import("./pages/bairros/Taruma"));
const CapaoImbuia = lazy(() => import("./pages/bairros/CapaoImbuia"));
const Hauer = lazy(() => import("./pages/bairros/Hauer"));
const AltoBoqueiraoCtba = lazy(() => import("./pages/bairros/AltoBoqueiraoCtba"));
const SitioCercado = lazy(() => import("./pages/bairros/SitioCercado"));
const NovoMundo = lazy(() => import("./pages/bairros/NovoMundo"));
const Fazendinha = lazy(() => import("./pages/bairros/Fazendinha"));
const AguaVerdeBairro = lazy(() => import("./pages/bairros/AguaVerdeBairro"));
const QuissisanaSJP = lazy(() => import("./pages/bairros/QuissisanaSJP"));
const AcademiaSJP = lazy(() => import("./pages/bairros/AcademiaSJP"));
const ColoniaMurcySJP = lazy(() => import("./pages/bairros/ColoniaMurcySJP"));
const BonecaSJP = lazy(() => import("./pages/bairros/BonecaSJP"));
const OuroFinoSJP = lazy(() => import("./pages/bairros/OuroFinoSJP"));
const AgricolareSJP = lazy(() => import("./pages/bairros/AgricolareSJP"));
const CampoLargoSJP = lazy(() => import("./pages/bairros/CampoLargoSJP"));
const ItaliaSJP = lazy(() => import("./pages/bairros/ItaliaSJP"));
const BordoDoCampoSJP2 = lazy(() => import("./pages/bairros/BordoDoCampoSJP2"));
const IndependenciaSJP = lazy(() => import("./pages/bairros/IndependenciaSJP"));
const OswaldoCruzColombo = lazy(() => import("./pages/bairros/OswaldoCruzColombo"));
const ColareColombo = lazy(() => import("./pages/bairros/ColareColombo"));
const CampinaGrandeColombo = lazy(() => import("./pages/bairros/CampinaGrandeColombo"));
const TaxiqueiraColomboo = lazy(() => import("./pages/bairros/TaxiqueiraColomboo"));
const EmbuColombo = lazy(() => import("./pages/bairros/EmbuColombo"));
const JardimUniaoPiraquara = lazy(() => import("./pages/bairros/JardimUniaoPiraquara"));
const JardimSantoAntonioPiraquara = lazy(() => import("./pages/bairros/JardimSantoAntonioPiraquara"));
const JardimSaoPauloPiraquara = lazy(() => import("./pages/bairros/JardimSaoPauloPiraquara"));
const IraiPiraquara = lazy(() => import("./pages/bairros/IraiPiraquara"));
const BoaVistaTamandare = lazy(() => import("./pages/bairros/BoaVistaTamandare"));
const CampoDoTenenteTamandare = lazy(() => import("./pages/bairros/CampoDoTenenteTamandare"));
const JardimParanaguaTamandare = lazy(() => import("./pages/bairros/JardimParanaguaTamandare"));
const JardimSaoJorgeTamandare = lazy(() => import("./pages/bairros/JardimSaoJorgeTamandare"));
const EucaliptosFRG2 = lazy(() => import("./pages/bairros/EucaliptosFRG2"));
const JardimCondorFRG = lazy(() => import("./pages/bairros/JardimCondorFRG"));
const JardimIperigoFRG = lazy(() => import("./pages/bairros/JardimIperigoFRG"));
const JardimDasPedrasFRG = lazy(() => import("./pages/bairros/JardimDasPedrasFRG"));
const JoqueiFRCM = lazy(() => import("./pages/bairros/JoqueiFRCM"));
const AntonioOliveraCM = lazy(() => import("./pages/bairros/AntonioOliveraCM"));
const EspigoAlegreCM = lazy(() => import("./pages/bairros/EspigoAlegreCM"));
const JardimFlorestalQB = lazy(() => import("./pages/bairros/JardimFlorestalQB"));
const JardimJaponeQB = lazy(() => import("./pages/bairros/JardimJaponeQB"));
const GraciosaMirQB = lazy(() => import("./pages/bairros/GraciosaMirQB"));
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

// Novos bairros Curitiba
const AguaVerde = lazy(() => import("./pages/bairros/AguaVerde"));
const Bigorrilho = lazy(() => import("./pages/bairros/Bigorrilho"));
const Merces = lazy(() => import("./pages/bairros/Merces"));
const BoaVista = lazy(() => import("./pages/bairros/BoaVista"));
const Juveve = lazy(() => import("./pages/bairros/Juveve"));
const Cabral = lazy(() => import("./pages/bairros/Cabral"));
const CristoRei = lazy(() => import("./pages/bairros/CristoRei"));
const Cajuru = lazy(() => import("./pages/bairros/Cajuru"));
const Uberaba = lazy(() => import("./pages/bairros/Uberaba"));
const Pinheirinho = lazy(() => import("./pages/bairros/Pinheirinho"));
const Xaxim = lazy(() => import("./pages/bairros/Xaxim"));
const Boqueirao = lazy(() => import("./pages/bairros/Boqueirao"));
const Bacacheri = lazy(() => import("./pages/bairros/Bacacheri"));
const Tingui = lazy(() => import("./pages/bairros/Tingui"));
// Novos bairros Araucária
const ChapadaAraucaria = lazy(() => import("./pages/bairros/ChapadaAraucaria"));
const CosteiraAraucaria = lazy(() => import("./pages/bairros/CosteiraAraucaria"));
const IguacuAraucaria = lazy(() => import("./pages/bairros/IguacuAraucaria"));
const CampinaDaBarra = lazy(() => import("./pages/bairros/CampinaDaBarra"));
const PortoDasLaranjeiras = lazy(() => import("./pages/bairros/PortoDasLaranjeiras"));
const Tindiquera = lazy(() => import("./pages/bairros/Tindiquera"));
const BariguiAraucaria = lazy(() => import("./pages/bairros/BariguiAraucaria"));
const FazendaVelhaAraucaria = lazy(() => import("./pages/bairros/FazendaVelhaAraucaria"));
const EstacaoAraucaria = lazy(() => import("./pages/bairros/EstacaoAraucaria"));
const BoqueiraoAraucaria = lazy(() => import("./pages/bairros/BoqueiraoAraucaria"));
const SabiaAraucaria = lazy(() => import("./pages/bairros/SabiaAraucaria"));
const PassaunaAraucaria = lazy(() => import("./pages/bairros/PassaunaAraucaria"));
const GuajuviraAraucaria = lazy(() => import("./pages/bairros/GuajuviraAraucaria"));
// Novos bairros Colombo
const AltoMaracanaColombo = lazy(() => import("./pages/bairros/AltoMaracanaColombo"));
const AtubaColombo = lazy(() => import("./pages/bairros/AtubaColombo"));
const CampoPequenoColombo = lazy(() => import("./pages/bairros/CampoPequenoColombo"));
const FatimaColombo = lazy(() => import("./pages/bairros/FatimaColombo"));
const GabirobalColombo = lazy(() => import("./pages/bairros/GabirobalColombo"));
const JardimOsascoColombo = lazy(() => import("./pages/bairros/JardimOsascoColombo"));
const MonzaColombo = lazy(() => import("./pages/bairros/MonzaColombo"));
const PalmitalColombo = lazy(() => import("./pages/bairros/PalmitalColombo"));
const RocaGrandeColombo = lazy(() => import("./pages/bairros/RocaGrandeColombo"));
const SaoGabrielColombo = lazy(() => import("./pages/bairros/SaoGabrielColombo"));
const SantaTerezinhaColombo = lazy(() => import("./pages/bairros/SantaTerezinhaColombo"));
// Novos bairros Pinhais
const EmilianoPerneta = lazy(() => import("./pages/bairros/EmilianoPerneta"));
const MariaAntonieta = lazy(() => import("./pages/bairros/MariaAntonieta"));
const VargemGrande = lazy(() => import("./pages/bairros/VargemGrande"));
const EstanciaPinhais = lazy(() => import("./pages/bairros/EstanciaPinhais"));
const AltoTaruma = lazy(() => import("./pages/bairros/AltoTaruma"));
const GraciosaPinhais = lazy(() => import("./pages/bairros/GraciosaPinhais"));
const JardimAmelia = lazy(() => import("./pages/bairros/JardimAmelia"));
const PalmitalPinhais = lazy(() => import("./pages/bairros/PalmitalPinhais"));
const AtubaPinhais = lazy(() => import("./pages/bairros/AtubaPinhais"));
const SeteVilas = lazy(() => import("./pages/bairros/SeteVilas"));
const VilaTaruma = lazy(() => import("./pages/bairros/VilaTaruma"));
const ValeDasAguas = lazy(() => import("./pages/bairros/ValeDasAguas"));
const JardimClaudia = lazy(() => import("./pages/bairros/JardimClaudia"));
// Novos bairros Campo Largo
const JardimAmericaCL = lazy(() => import("./pages/bairros/JardimAmericaCL"));
const BotiatuvaCL = lazy(() => import("./pages/bairros/BotiatuvaCL"));
const RondinhaCL = lazy(() => import("./pages/bairros/RondinhaCL"));
const SaoSilvestreCL = lazy(() => import("./pages/bairros/SaoSilvestreCL"));
const TresCorregosCL = lazy(() => import("./pages/bairros/TresCorregosCL"));
const ItaquiCL = lazy(() => import("./pages/bairros/ItaquiCL"));
const OuroFinoCL = lazy(() => import("./pages/bairros/OuroFinoCL"));
const BateiasCL = lazy(() => import("./pages/bairros/BateiasCL"));
const PalmitalCL = lazy(() => import("./pages/bairros/PalmitalCL"));
const SantaCruzCL = lazy(() => import("./pages/bairros/SantaCruzCL"));
const CorreiaDeFreitasCL = lazy(() => import("./pages/bairros/CorreiaDeFreitasCL"));
const JardimPlanaltoCL = lazy(() => import("./pages/bairros/JardimPlanaltoCL"));
const VilaSoleneCL = lazy(() => import("./pages/bairros/VilaSoleneCL"));
// Novos bairros FRG, AT, Piraquara, Campo Magro, Quatro Barras, SJP
const IguacuFRG = lazy(() => import("./pages/bairros/IguacuFRG"));
const GralhaAzulFRG = lazy(() => import("./pages/bairros/GralhaAzulFRG"));
const SantaTerezinhaFRG = lazy(() => import("./pages/bairros/SantaTerezinhaFRG"));
const JardimEstadosFRG = lazy(() => import("./pages/bairros/JardimEstadosFRG"));
const PioneirosFRG = lazy(() => import("./pages/bairros/PioneirosFRG"));
const SaoLourencoFRG = lazy(() => import("./pages/bairros/SaoLourencoFRG"));
const HortenciaFRG = lazy(() => import("./pages/bairros/HortenciaFRG"));
const TanguaAT = lazy(() => import("./pages/bairros/TanguaAT"));
const SaoVenancioAT = lazy(() => import("./pages/bairros/SaoVenancioAT"));
const JardimGrazielaAT = lazy(() => import("./pages/bairros/JardimGrazielaAT"));
const JardimRomaAT = lazy(() => import("./pages/bairros/JardimRomaAT"));
const ColoniaAntonioPradoAT = lazy(() => import("./pages/bairros/ColoniaAntonioPradoAT"));
const TranqueiraAT = lazy(() => import("./pages/bairros/TranqueiraAT"));
const JardimParaisoAT = lazy(() => import("./pages/bairros/JardimParaisoAT"));
const CentroPiraquara = lazy(() => import("./pages/bairros/CentroPiraquara"));
const JardimPrimaveraPiraquara = lazy(() => import("./pages/bairros/JardimPrimaveraPiraquara"));
const PlantaDeodoroPiraquara = lazy(() => import("./pages/bairros/PlantaDeodoroPiraquara"));
const VilaMacedoPiraquara = lazy(() => import("./pages/bairros/VilaMacedoPiraquara"));
const GuaritubaPiraquara = lazy(() => import("./pages/bairros/GuaritubaPiraquara"));
const PradoVelhoPiraquara = lazy(() => import("./pages/bairros/PradoVelhoPiraquara"));
const SaoCristaoPiraquara = lazy(() => import("./pages/bairros/SaoCristaoPiraquara"));
const JardimBelaVistaPiraquara = lazy(() => import("./pages/bairros/JardimBelaVistaPiraquara"));
const CaiuaPiraquara = lazy(() => import("./pages/bairros/CaiuaPiraquara"));
const CentroCampoMagro = lazy(() => import("./pages/bairros/CentroCampoMagro"));
const SedeCampoMagro = lazy(() => import("./pages/bairros/SedeCampoMagro"));
const JardimBoaVistaCM = lazy(() => import("./pages/bairros/JardimBoaVistaCM"));
const SaoSebastiaoCM = lazy(() => import("./pages/bairros/SaoSebastiaoCM"));
const RioVerdeCM = lazy(() => import("./pages/bairros/RioVerdeCM"));
const BotiatuvaCM = lazy(() => import("./pages/bairros/BotiatuvaCM"));
const CentroQuatroBarras = lazy(() => import("./pages/bairros/CentroQuatroBarras"));
const JardimMeninoDeusQB = lazy(() => import("./pages/bairros/JardimMeninoDeusQB"));
const VilaSaoJoseQB = lazy(() => import("./pages/bairros/VilaSaoJoseQB"));
const BordaDoCampoQB = lazy(() => import("./pages/bairros/BordaDoCampoQB"));
const SaoLourencoQB = lazy(() => import("./pages/bairros/SaoLourencoQB"));
const VilaMariaQB = lazy(() => import("./pages/bairros/VilaMariaQB"));
const CidadeJardimSJP = lazy(() => import("./pages/bairros/CidadeJardimSJP"));
const PedroMoroSJP = lazy(() => import("./pages/bairros/PedroMoroSJP"));
const IpeSJP = lazy(() => import("./pages/bairros/IpeSJP"));
const RioPequenoSJP = lazy(() => import("./pages/bairros/RioPequenoSJP"));
const BordaDoCampoSJP = lazy(() => import("./pages/bairros/BordaDoCampoSJP"));

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
const ConsertoTV = lazy(() => import("./pages/servicos/ConsertoTV"));
const ConsertoCelular = lazy(() => import("./pages/servicos/ConsertoCelular"));
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

// Procedimentos Técnicos hub
const ProcedimentosPlaca = lazy(() => import("./pages/ProcedimentosPlaca"));

// Marcas
const Marcas = lazy(() => import("./pages/Marcas"));
const MarcaPage = lazy(() => import("./pages/MarcaPage"));

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
        <PageTransition>
        <Suspense fallback={<PageLoader />}>
          <Routes>
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
            <Route path="/coleta-formulario" element={<ColetaFormulario />} />
            <Route path="/quando-nao-compensa" element={<QuandoNaoCompensa />} />
            <Route path="/seja-parceiro" element={<SejaParceiro />} />
            
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

            <Route path="/bairros/cachoeira-araucaria" element={<CacheiraAraucaria />} />
            <Route path="/bairros/thomaz-coelho-ii" element={<ThomazCoelhoIIAraucaria />} />
            <Route path="/bairros/jardim-boa-vista-araucaria" element={<JardimBoaVistaAraucaria />} />
            <Route path="/bairros/sao-miguel-araucaria" element={<SaoMiguelAraucaria />} />
            <Route path="/bairros/california-araucaria" element={<CaliforniaAraucaria />} />
            <Route path="/bairros/vila-nova-araucaria" element={<VilaNovaAraucaria />} />
            <Route path="/bairros/industrial-araucaria" element={<IndustrialAraucaria />} />
            <Route path="/bairros/jardim-iguacu-araucaria" element={<JardimIguacuAraucaria />} />
            <Route path="/bairros/planta-sao-tiago-araucaria" element={<PlantaSaoTiagoAraucaria />} />
            <Route path="/bairros/jardim-shangrila-araucaria" element={<JardimShangrilaAraucaria />} />
            <Route path="/bairros/jardim-laranjeiras-cl" element={<JardimLaranjeirasCL />} />
            <Route path="/bairros/sao-marcos-campo-largo" element={<SaoMarcosCampoLargo />} />
            <Route path="/bairros/sao-jose-campo-largo" element={<SaoJoseCampoLargo />} />
            <Route path="/bairros/jardim-esperanca-cl" element={<JardimEsperancaCL />} />
            <Route path="/bairros/colonia-malhada-cl" element={<ColoniaMalhadaCL />} />
            <Route path="/bairros/lamenha-grande-cl" element={<LamenhaGrandeCL />} />
            <Route path="/bairros/vila-candida-cl" element={<VilaCandidaCL />} />
            <Route path="/bairros/jardim-novo-horizonte-cl" element={<JardimNovoHorizonteCL />} />
            <Route path="/bairros/timbotuva-cl" element={<TimbotuvaCL />} />
            <Route path="/bairros/jardim-planalto-ii-cl" element={<JardimPlanaltoIICL />} />
            <Route path="/bairros/jardim-pedro-demeterco" element={<JardimPedroDemeterco />} />
            <Route path="/bairros/jardim-karla-pinhais" element={<JardimKarlaPinhais />} />
            <Route path="/bairros/jardim-claudia-ii-pinhais" element={<JardimClaudiaIIPinhais />} />
            <Route path="/bairros/jardim-wissinger-pinhais" element={<JardimWissingerPinhais />} />
            <Route path="/bairros/vila-amelia-pinhais" element={<VilaAmeliaPinhais />} />
            <Route path="/bairros/jardim-esplanada-pinhais" element={<JardimEsplanadaPinhais />} />
            <Route path="/bairros/vila-maria-antonieta-pinhais" element={<VilaMariaAntonietaPinhais />} />
            <Route path="/bairros/jardim-dona-rosa-pinhais" element={<JardimDonaRosaPinhais />} />
            <Route path="/bairros/parque-nascentes-pinhais" element={<ParqueNascentesPinhais />} />
            <Route path="/bairros/jardim-tropical-pinhais" element={<JardimTropicalPinhais />} />
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

            {/* Novos Bairros Curitiba */}
            <Route path="/bairros/agua-verde" element={<AguaVerde />} />
            <Route path="/bairros/bigorrilho" element={<Bigorrilho />} />
            <Route path="/bairros/merces" element={<Merces />} />
            <Route path="/bairros/boa-vista" element={<BoaVista />} />
            <Route path="/bairros/juveve" element={<Juveve />} />
            <Route path="/bairros/cabral" element={<Cabral />} />
            <Route path="/bairros/cristo-rei" element={<CristoRei />} />
            <Route path="/bairros/cajuru" element={<Cajuru />} />
            <Route path="/bairros/uberaba" element={<Uberaba />} />
            <Route path="/bairros/pinheirinho" element={<Pinheirinho />} />
            <Route path="/bairros/xaxim" element={<Xaxim />} />
            <Route path="/bairros/alto-da-gloria" element={<AltoGloria />} />
            <Route path="/bairros/reboucas" element={<Reboucas />} />
            <Route path="/bairros/vila-izabel" element={<VilaIzabel />} />
            <Route path="/bairros/seminario" element={<Seminario />} />
            <Route path="/bairros/hugo-lange" element={<HugoLange />} />
            <Route path="/bairros/jardim-social" element={<JardimSocial />} />
            <Route path="/bairros/jardim-das-americas" element={<JardimAmericas />} />
            <Route path="/bairros/taruma" element={<Taruma />} />
            <Route path="/bairros/capao-da-imbuia" element={<CapaoImbuia />} />
            <Route path="/bairros/hauer" element={<Hauer />} />
            <Route path="/bairros/alto-boqueirao" element={<AltoBoqueiraoCtba />} />
            <Route path="/bairros/sitio-cercado" element={<SitioCercado />} />
            <Route path="/bairros/novo-mundo" element={<NovoMundo />} />
            <Route path="/bairros/fazendinha" element={<Fazendinha />} />
            <Route path="/bairros/jardim-botanico" element={<AguaVerdeBairro />} />
            <Route path="/bairros/quississana-sjp" element={<QuissisanaSJP />} />
            <Route path="/bairros/academia-sjp" element={<AcademiaSJP />} />
            <Route path="/bairros/colonia-murici-sjp" element={<ColoniaMurcySJP />} />
            <Route path="/bairros/boneca-do-iguacu-sjp" element={<BonecaSJP />} />
            <Route path="/bairros/ouro-fino-sjp" element={<OuroFinoSJP />} />
            <Route path="/bairros/agricola-sjp" element={<AgricolareSJP />} />
            <Route path="/bairros/campo-largo-roseira-sjp" element={<CampoLargoSJP />} />
            <Route path="/bairros/italia-sjp" element={<ItaliaSJP />} />
            <Route path="/bairros/borda-campo-sjp" element={<BordoDoCampoSJP2 />} />
            <Route path="/bairros/independencia-sjp" element={<IndependenciaSJP />} />
            <Route path="/bairros/osvaldo-cruz-colombo" element={<OswaldoCruzColombo />} />
            <Route path="/bairros/sao-dimas-colombo" element={<ColareColombo />} />
            <Route path="/bairros/campina-grande-colombo" element={<CampinaGrandeColombo />} />
            <Route path="/bairros/taxiqueira-colombo" element={<TaxiqueiraColomboo />} />
            <Route path="/bairros/embu-colombo" element={<EmbuColombo />} />
            <Route path="/bairros/jardim-uniao-piraquara" element={<JardimUniaoPiraquara />} />
            <Route path="/bairros/jardim-santo-antonio-piraquara" element={<JardimSantoAntonioPiraquara />} />
            <Route path="/bairros/jardim-sao-paulo-piraquara" element={<JardimSaoPauloPiraquara />} />
            <Route path="/bairros/irai-piraquara" element={<IraiPiraquara />} />
            <Route path="/bairros/boa-vista-at" element={<BoaVistaTamandare />} />
            <Route path="/bairros/campo-tenente-at" element={<CampoDoTenenteTamandare />} />
            <Route path="/bairros/jardim-paranagua-at" element={<JardimParanaguaTamandare />} />
            <Route path="/bairros/jardim-sao-jorge-at" element={<JardimSaoJorgeTamandare />} />
            <Route path="/bairros/parque-industrial-frg" element={<EucaliptosFRG2 />} />
            <Route path="/bairros/jardim-condor-frg" element={<JardimCondorFRG />} />
            <Route path="/bairros/jardim-ipe-frg" element={<JardimIperigoFRG />} />
            <Route path="/bairros/jardim-das-pedras-frg" element={<JardimDasPedrasFRG />} />
            <Route path="/bairros/joquei-clube-cm" element={<JoqueiFRCM />} />
            <Route path="/bairros/antonio-olivero-cm" element={<AntonioOliveraCM />} />
            <Route path="/bairros/espigao-alegre-cm" element={<EspigoAlegreCM />} />
            <Route path="/bairros/jardim-florestal-qb" element={<JardimFlorestalQB />} />
            <Route path="/bairros/jardim-japao-qb" element={<JardimJaponeQB />} />
            <Route path="/bairros/graciosa-qb" element={<GraciosaMirQB />} />
            <Route path="/bairros/boqueirao" element={<Boqueirao />} />
            <Route path="/bairros/bacacheri" element={<Bacacheri />} />
            <Route path="/bairros/tingui" element={<Tingui />} />

            {/* Novos Bairros Araucária */}
            <Route path="/bairros/chapada" element={<ChapadaAraucaria />} />
            <Route path="/bairros/costeira-araucaria" element={<CosteiraAraucaria />} />
            <Route path="/bairros/iguacu-araucaria" element={<IguacuAraucaria />} />
            <Route path="/bairros/campina-da-barra" element={<CampinaDaBarra />} />
            <Route path="/bairros/porto-das-laranjeiras" element={<PortoDasLaranjeiras />} />
            <Route path="/bairros/tindiquera" element={<Tindiquera />} />
            <Route path="/bairros/barigui-araucaria" element={<BariguiAraucaria />} />
            <Route path="/bairros/fazenda-velha-araucaria" element={<FazendaVelhaAraucaria />} />
            <Route path="/bairros/estacao-araucaria" element={<EstacaoAraucaria />} />
            <Route path="/bairros/boqueirao-araucaria" element={<BoqueiraoAraucaria />} />
            <Route path="/bairros/sabia" element={<SabiaAraucaria />} />
            <Route path="/bairros/passauna" element={<PassaunaAraucaria />} />
            <Route path="/bairros/guajuvira" element={<GuajuviraAraucaria />} />

            {/* Novos Bairros Colombo */}
            <Route path="/bairros/alto-maracana" element={<AltoMaracanaColombo />} />
            <Route path="/bairros/atuba-colombo" element={<AtubaColombo />} />
            <Route path="/bairros/campo-pequeno" element={<CampoPequenoColombo />} />
            <Route path="/bairros/fatima-colombo" element={<FatimaColombo />} />
            <Route path="/bairros/gabirobal" element={<GabirobalColombo />} />
            <Route path="/bairros/jardim-osasco" element={<JardimOsascoColombo />} />
            <Route path="/bairros/monza-colombo" element={<MonzaColombo />} />
            <Route path="/bairros/palmital-colombo" element={<PalmitalColombo />} />
            <Route path="/bairros/roca-grande" element={<RocaGrandeColombo />} />
            <Route path="/bairros/sao-gabriel-colombo" element={<SaoGabrielColombo />} />
            <Route path="/bairros/santa-terezinha-colombo" element={<SantaTerezinhaColombo />} />

            {/* Novos Bairros Pinhais */}
            <Route path="/bairros/emiliano-perneta" element={<EmilianoPerneta />} />
            <Route path="/bairros/maria-antonieta" element={<MariaAntonieta />} />
            <Route path="/bairros/vargem-grande" element={<VargemGrande />} />
            <Route path="/bairros/estancia-pinhais" element={<EstanciaPinhais />} />
            <Route path="/bairros/alto-taruma" element={<AltoTaruma />} />
            <Route path="/bairros/graciosa" element={<GraciosaPinhais />} />
            <Route path="/bairros/jardim-amelia" element={<JardimAmelia />} />
            <Route path="/bairros/palmital-pinhais" element={<PalmitalPinhais />} />
            <Route path="/bairros/atuba-pinhais" element={<AtubaPinhais />} />
            <Route path="/bairros/sete-vilas" element={<SeteVilas />} />
            <Route path="/bairros/vila-taruma" element={<VilaTaruma />} />
            <Route path="/bairros/vale-das-aguas" element={<ValeDasAguas />} />
            <Route path="/bairros/jardim-claudia" element={<JardimClaudia />} />

            {/* Novos Bairros Campo Largo */}
            <Route path="/bairros/jardim-america-campo-largo" element={<JardimAmericaCL />} />
            <Route path="/bairros/botiatuva" element={<BotiatuvaCL />} />
            <Route path="/bairros/rondinha" element={<RondinhaCL />} />
            <Route path="/bairros/sao-silvestre" element={<SaoSilvestreCL />} />
            <Route path="/bairros/tres-corregos" element={<TresCorregosCL />} />
            <Route path="/bairros/itaqui" element={<ItaquiCL />} />
            <Route path="/bairros/ouro-fino" element={<OuroFinoCL />} />
            <Route path="/bairros/bateias" element={<BateiasCL />} />
            <Route path="/bairros/palmital-campo-largo" element={<PalmitalCL />} />
            <Route path="/bairros/santa-cruz-campo-largo" element={<SantaCruzCL />} />
            <Route path="/bairros/correia-de-freitas" element={<CorreiaDeFreitasCL />} />
            <Route path="/bairros/jardim-planalto-campo-largo" element={<JardimPlanaltoCL />} />
            <Route path="/bairros/vila-solene" element={<VilaSoleneCL />} />

            {/* Novos Bairros FRG */}
            <Route path="/bairros/iguacu-frg" element={<IguacuFRG />} />
            <Route path="/bairros/gralha-azul" element={<GralhaAzulFRG />} />
            <Route path="/bairros/santa-terezinha-frg" element={<SantaTerezinhaFRG />} />
            <Route path="/bairros/jardim-estados" element={<JardimEstadosFRG />} />
            <Route path="/bairros/pioneiros-frg" element={<PioneirosFRG />} />
            <Route path="/bairros/sao-lourenco-frg" element={<SaoLourencoFRG />} />
            <Route path="/bairros/hortencia-frg" element={<HortenciaFRG />} />

            {/* Novos Bairros AT */}
            <Route path="/bairros/tangua-at" element={<TanguaAT />} />
            <Route path="/bairros/sao-venancio" element={<SaoVenancioAT />} />
            <Route path="/bairros/jardim-graziela" element={<JardimGrazielaAT />} />
            <Route path="/bairros/jardim-roma" element={<JardimRomaAT />} />
            <Route path="/bairros/colonia-antonio-prado" element={<ColoniaAntonioPradoAT />} />
            <Route path="/bairros/tranqueira-at" element={<TranqueiraAT />} />
            <Route path="/bairros/jardim-paraiso-at" element={<JardimParaisoAT />} />

            {/* Novos Bairros Piraquara */}
            <Route path="/bairros/centro-piraquara" element={<CentroPiraquara />} />
            <Route path="/bairros/jardim-primavera-piraquara" element={<JardimPrimaveraPiraquara />} />
            <Route path="/bairros/planta-deodoro-piraquara" element={<PlantaDeodoroPiraquara />} />
            <Route path="/bairros/vila-macedo-piraquara" element={<VilaMacedoPiraquara />} />
            <Route path="/bairros/guarituba-piraquara" element={<GuaritubaPiraquara />} />
            <Route path="/bairros/prado-velho-piraquara" element={<PradoVelhoPiraquara />} />
            <Route path="/bairros/sao-cristao-piraquara" element={<SaoCristaoPiraquara />} />
            <Route path="/bairros/jardim-bela-vista-piraquara" element={<JardimBelaVistaPiraquara />} />
            <Route path="/bairros/caiua-piraquara" element={<CaiuaPiraquara />} />

            {/* Novos Bairros Campo Magro */}
            <Route path="/bairros/centro-campo-magro" element={<CentroCampoMagro />} />
            <Route path="/bairros/sede-campo-magro" element={<SedeCampoMagro />} />
            <Route path="/bairros/jardim-boa-vista-cm" element={<JardimBoaVistaCM />} />
            <Route path="/bairros/sao-sebastiao-cm" element={<SaoSebastiaoCM />} />
            <Route path="/bairros/rio-verde-cm" element={<RioVerdeCM />} />
            <Route path="/bairros/botiatuva-cm" element={<BotiatuvaCM />} />

            {/* Novos Bairros Quatro Barras */}
            <Route path="/bairros/centro-quatro-barras" element={<CentroQuatroBarras />} />
            <Route path="/bairros/jardim-menino-deus-qb" element={<JardimMeninoDeusQB />} />
            <Route path="/bairros/vila-sao-jose-qb" element={<VilaSaoJoseQB />} />
            <Route path="/bairros/borda-do-campo-qb" element={<BordaDoCampoQB />} />
            <Route path="/bairros/sao-lourenco-qb" element={<SaoLourencoQB />} />
            <Route path="/bairros/vila-maria-qb" element={<VilaMariaQB />} />

            {/* Novos Bairros SJP */}
            <Route path="/bairros/cidade-jardim-sjp" element={<CidadeJardimSJP />} />
            <Route path="/bairros/pedro-moro-sjp" element={<PedroMoroSJP />} />
            <Route path="/bairros/ipe-sjp" element={<IpeSJP />} />
            <Route path="/bairros/rio-pequeno-sjp" element={<RioPequenoSJP />} />
            <Route path="/bairros/borda-do-campo-sjp" element={<BordaDoCampoSJP />} />
            
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
            <Route path="/servicos/conserto-tv" element={<ConsertoTV />} />
            <Route path="/servicos/conserto-celular" element={<ConsertoCelular />} />
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
            
            {/* Procedimentos Técnicos em Placa */}
            <Route path="/procedimentos-placa" element={<ProcedimentosPlaca />} />
            <Route path="/procedimentos/:slug" element={<ProblemaPage />} />

            {/* Páginas de Marcas */}
            <Route path="/marcas" element={<Marcas />} />
            <Route path="/marcas/:slug" element={<MarcaPage />} />
            
            {/* Redirects das URLs antigas de procedimentos */}
            <Route path="/reflow-bga-curitiba" element={<Navigate to="/procedimentos/reflow-bga-curitiba" replace />} />
            <Route path="/reballing-bga-curitiba" element={<Navigate to="/procedimentos/reballing-bga-curitiba" replace />} />
            <Route path="/troca-chip-bga-curitiba" element={<Navigate to="/procedimentos/troca-chip-bga-curitiba" replace />} />
            <Route path="/microsoldagem-celular-curitiba" element={<Navigate to="/procedimentos/microsoldagem-celular-curitiba" replace />} />
            <Route path="/recapacitacao-placa-eletronica-curitiba" element={<Navigate to="/procedimentos/recapacitacao-placa-eletronica-curitiba" replace />} />
            
            {/* Páginas de Problema / Intenção de Busca (213 páginas dinâmicas) */}
            <Route path="/problemas/:slug" element={<ProblemaPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </PageTransition>
        <WhatsAppChatbot />
        <SocialProofProvider />
        <GA4ChecklistPanel />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
