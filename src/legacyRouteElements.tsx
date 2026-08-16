import { lazy, Suspense, useEffect, useState } from "react";
import Index from "./pages/Index";

// Lazy-loaded pages for code splitting & faster initial load
const Servicos = lazy(() => import("./pages/Servicos"));
const AtendimentoDomicilio = lazy(() => import("./pages/AtendimentoDomicilio"));
const AtendimentoRemoto = lazy(() => import("./pages/AtendimentoRemoto"));

const PrecosEPoliticas = lazy(() => import("./pages/PrecosEPoliticas"));
const TecnicoInformaticaCuritiba = lazy(() => import("./pages/TecnicoInformaticaCuritiba"));
const TecnicoInformaticaSaoJosePinhais = lazy(() => import("./pages/TecnicoInformaticaSaoJosePinhais"));
const TecnicoInformaticaAraucaria = lazy(() => import("./pages/TecnicoInformaticaAraucaria"));
const TecnicoInformaticaCampoLargo = lazy(() => import("./pages/TecnicoInformaticaCampoLargo"));
const TecnicoInformaticaPinhais = lazy(() => import("./pages/TecnicoInformaticaPinhais"));
const Sobre = lazy(() => import("./pages/Sobre"));
const GestorResponsavel = lazy(() => import("./pages/GestorResponsavel"));
const Contato = lazy(() => import("./pages/Contato"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FAQ = lazy(() => import("./pages/FAQ"));
const ComoFunciona = lazy(() => import("./pages/ComoFunciona"));
const DiagnosticoTecnico = lazy(() => import("./pages/DiagnosticoTecnico"));
const Diagnostico60s = lazy(() => import("./pages/Diagnostico60s"));
const EquipamentosAtendidos = lazy(() => import("./pages/EquipamentosAtendidos"));
const AreasAtendidas = lazy(() => import("./pages/AreasAtendidas"));
const ProblemasReaisCasos = lazy(() => import("./pages/ProblemasReaisCasos"));
const ColetaEntrega = lazy(() => import("./pages/ColetaEntrega"));
const SegurancaDosDados = lazy(() => import("./pages/SegurancaDosDados"));
const PoliticaPecasCliente = lazy(() => import("./pages/PoliticaPecasCliente"));
const ColetaFormulario = lazy(() => import("./pages/ColetaFormulario"));
const QuandoNaoCompensa = lazy(() => import("./pages/QuandoNaoCompensa"));
const SejaParceiro = lazy(() => import("./pages/SejaParceiro"));
const DiretorioProfissionais = lazy(() => import("./pages/profissionais/DiretorioProfissionais"));
const PerfilProfissional = lazy(() => import("./pages/profissionais/PerfilProfissional"));
const CadastroParceiro = lazy(() => import("./pages/profissionais/CadastroParceiro"));
const ProfissionaisLocal = lazy(() => import("./pages/profissionais/ProfissionaisLocal"));
const Empresas = lazy(() => import("./pages/Empresas"));
const Atendimento = lazy(() => import("./pages/Atendimento"));
const ValorizacaoTrabalhoTecnico = lazy(() => import("./pages/ValorizacaoTrabalhoTecnico"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AssistenciaTecnicaCuritiba = lazy(() => import("./pages/AssistenciaTecnicaCuritiba"));
const ArrumarPC = lazy(() => import("./pages/ArrumarPC"));
const ArrumarPCCity = lazy(() => import("./pages/arrumar-pc/ArrumarPCCity"));
const ArrumarPCServicoCidade = lazy(() => import("./pages/arrumar-pc/ArrumarPCServicoCidade"));
const TermosCondicoes = lazy(() => import("./pages/TermosCondicoes"));
const PoliticaPrivacidade = lazy(() => import("./pages/PoliticaPrivacidade"));
const PoliticaCookiesAnuncios = lazy(() => import("./pages/PoliticaCookiesAnuncios"));
const StatusAnuncios = lazy(() => import("./pages/StatusAnuncios"));
const Anuncie = lazy(() => import("./pages/Anuncie"));
const FunilIndisponivel = lazy(() => import("./pages/FunilIndisponivel"));
const DebugTelemetria = lazy(() => import("./pages/DebugTelemetria"));
const OrdemDeServico = lazy(() => import("./pages/OrdemDeServico"));
const StatusOs = lazy(() => import("./pages/StatusOs"));
const Depoimentos = lazy(() => import("./pages/Depoimentos"));
const ComoAvaliar = lazy(() => import("./pages/ComoAvaliar"));
const Avaliar = lazy(() => import("./pages/Avaliar"));
const ExcluirMeusDados = lazy(() => import("./pages/ExcluirMeusDados"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminFunnel = lazy(() => import("./pages/admin/AdminFunnel"));
const AdminReviews = lazy(() => import("./pages/admin/AdminReviews"));
const AdminVitals = lazy(() => import("./pages/admin/AdminVitals"));
const AdminAuditoriaLocal = lazy(() => import("./pages/admin/AdminAuditoriaLocal"));
const AdminGatesLocais = lazy(() => import("./pages/admin/AdminGatesLocais"));
const AdminInventarioBairros = lazy(() => import("./pages/admin/AdminInventarioBairros"));
const AdminUiPerformance = lazy(() => import("./pages/admin/AdminUiPerformance"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminCasos = lazy(() => import("./pages/admin/AdminCasos"));
const AdminOsAudit = lazy(() => import("./pages/admin/AdminOsAudit"));
const AdminOperacao = lazy(() => import("./pages/admin/AdminOperacao"));
const AdminProvasMonitor = lazy(() => import("./pages/admin/AdminProvasMonitor"));
const AdminProvasVerticais = lazy(() => import("./pages/admin/AdminProvasVerticais"));
const AdminConversao = lazy(() => import("./pages/admin/AdminConversao"));
const AdminExperimentoWa = lazy(() => import("./pages/admin/AdminExperimentoWa"));
const AdminPublicacao = lazy(() => import("./pages/admin/AdminPublicacao"));
const AdminFotos = lazy(() => import("./pages/admin/AdminFotos"));
const AdminEditorLocal = lazy(() => import("./pages/admin/AdminEditorLocal"));
const AdminPerformanceLocal = lazy(() => import("./pages/admin/AdminPerformanceLocal"));
const AdminAuditoriaAcessos = lazy(() => import("./pages/admin/AdminAuditoriaAcessos"));
const AdminQaTrafego = lazy(() => import("./pages/admin/AdminQaTrafego"));
const AdminLinkBuilder = lazy(() => import("./pages/admin/AdminLinkBuilder"));

const ConsertoImpressoraCuritiba = lazy(() => import("./pages/ConsertoImpressoraCuritiba"));
const AssistenciaEletrodomesticosInteligentesCuritiba = lazy(() => import("./pages/AssistenciaEletrodomesticosInteligentesCuritiba"));
const Status = lazy(() => import("./pages/Status"));
const CreditosDeImagens = lazy(() => import("./pages/CreditosDeImagens"));

const Obrigado = lazy(() => import("./pages/Obrigado"));

// Hubs SEO de categorias (TV, Som, Videogame, Celular) × cidades/bairros
const ConsertoTVCity = lazy(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoTVCity })));
const ConsertoSomCity = lazy(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoSomCity })));
const ConsertoVideogameCity = lazy(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoVideogameCity })));
const ConsertoCelularLocalCity = lazy(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoCelularLocalCity })));
const ConsertoTVHub = lazy(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoTVHub })));
const ConsertoSomHub = lazy(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoSomHub })));
const ConsertoVideogameHub = lazy(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoVideogameHub })));
const ConsertoCelularLocalHub = lazy(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoCelularLocalHub })));
// Hub SEO — Empresa de TI em Curitiba
const EmpresaDeTiCuritiba = lazy(() => import("./pages/EmpresaDeTiCuritiba"));

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
const ServicoCore = lazy(() => import("./pages/servicos/ServicoCore"));

const MontagemPc = lazy(() => import("./pages/servicos/MontagemPc"));
const ComputadorLento = lazy(() => import("./pages/servicos/ComputadorLento"));
const ComputadorNaoLiga = lazy(() => import("./pages/servicos/ComputadorNaoLiga"));
const ManutencaoTV = lazy(() => import("./pages/servicos/ManutencaoTV"));
const ConsertoCelular = lazy(() => import("./pages/servicos/ConsertoCelular"));

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
// RedesWifiSantaFelicidade legado desativado; rota agora usa RedesWifiSantaFelicidadeAncora (indexável).
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
const RedesWifiPinhais = lazy(() => import("./pages/servico-bairro/RedesWifiPinhais"));

// Wi-Fi + TV Smart por bairro (indexáveis — 5 bairros âncora)
const RedesWifiBatel = lazy(() => import("./pages/servico-bairro/RedesWifiBatel"));
const RedesWifiCentro = lazy(() => import("./pages/servico-bairro/RedesWifiCentro"));
const RedesWifiAguaVerde = lazy(() => import("./pages/servico-bairro/RedesWifiAguaVerde"));
const RedesWifiPortao = lazy(() => import("./pages/servico-bairro/RedesWifiPortao"));
const ManutencaoTvBatel = lazy(() => import("./pages/servico-bairro/ManutencaoTvBatel"));
const ManutencaoTvCentro = lazy(() => import("./pages/servico-bairro/ManutencaoTvCentro"));
const ManutencaoTvAguaVerde = lazy(() => import("./pages/servico-bairro/ManutencaoTvAguaVerde"));
const ManutencaoTvCic = lazy(() => import("./pages/servico-bairro/ManutencaoTvCic"));
const ManutencaoTvPortao = lazy(() => import("./pages/servico-bairro/ManutencaoTvPortao"));
// Onda 2 — completa 12 bairros-âncora indexáveis (Wi-Fi + TV Smart)
const RedesWifiBigorrilho = lazy(() => import("./pages/servico-bairro/RedesWifiBigorrilho"));
const RedesWifiCabral = lazy(() => import("./pages/servico-bairro/RedesWifiCabral"));
const RedesWifiSantaFelicidadeAncora = lazy(() => import("./pages/servico-bairro/RedesWifiSantaFelicidadeAncora"));
const RedesWifiBoaVista = lazy(() => import("./pages/servico-bairro/RedesWifiBoaVista"));
const RedesWifiCristoRei = lazy(() => import("./pages/servico-bairro/RedesWifiCristoRei"));
const RedesWifiCajuru = lazy(() => import("./pages/servico-bairro/RedesWifiCajuru"));
const RedesWifiBoqueirao = lazy(() => import("./pages/servico-bairro/RedesWifiBoqueirao"));
const ManutencaoTvBigorrilho = lazy(() => import("./pages/servico-bairro/ManutencaoTvBigorrilho"));
const ManutencaoTvCabral = lazy(() => import("./pages/servico-bairro/ManutencaoTvCabral"));
const ManutencaoTvSantaFelicidade = lazy(() => import("./pages/servico-bairro/ManutencaoTvSantaFelicidade"));
const ManutencaoTvBoaVista = lazy(() => import("./pages/servico-bairro/ManutencaoTvBoaVista"));
const ManutencaoTvCristoRei = lazy(() => import("./pages/servico-bairro/ManutencaoTvCristoRei"));
const ManutencaoTvCajuru = lazy(() => import("./pages/servico-bairro/ManutencaoTvCajuru"));
const ManutencaoTvBoqueirao = lazy(() => import("./pages/servico-bairro/ManutencaoTvBoqueirao"));
// Onda 3 — 4 novos bairros âncora (Wi-Fi + TV Smart)
const RedesWifiJardimAmericas = lazy(() => import("./pages/servico-bairro/RedesWifiJardimAmericas"));
const ManutencaoTvJardimAmericas = lazy(() => import("./pages/servico-bairro/ManutencaoTvJardimAmericas"));
const RedesWifiEcoville = lazy(() => import("./pages/servico-bairro/RedesWifiEcoville"));
const ManutencaoTvEcoville = lazy(() => import("./pages/servico-bairro/ManutencaoTvEcoville"));
const RedesWifiAltoXV = lazy(() => import("./pages/servico-bairro/RedesWifiAltoXV"));
const ManutencaoTvAltoXV = lazy(() => import("./pages/servico-bairro/ManutencaoTvAltoXV"));
const RedesWifiReboucas = lazy(() => import("./pages/servico-bairro/RedesWifiReboucas"));
const ManutencaoTvReboucas = lazy(() => import("./pages/servico-bairro/ManutencaoTvReboucas"));

// Dynamic service+city page
const ServicoCidadePage = lazy(() => import("./pages/servico-bairro/ServicoBairroGerado"));

// Dynamic problem/intent pages (50 páginas de intenção de busca)
const ProblemaPage = lazy(() => import("./pages/ProblemaPage"));
const NotebookNaoLiga = lazy(() => import("./pages/problemas/NotebookNaoLiga"));
const ProblemaComputadorLento = lazy(() => import("./pages/problemas/ComputadorLento"));
const ProblemasHub = lazy(() => import("./pages/problemas/ProblemasHub"));
const ClusterProblemaPage = lazy(() => import("./pages/problemas/ClusterProblemaPage"));
const EquipamentosHub = lazy(() => import("./pages/equipamentos/EquipamentosHub"));
const ClusterEquipamentoPage = lazy(() => import("./pages/equipamentos/ClusterEquipamentoPage"));
const SolucoesHub = lazy(() => import("./pages/solucoes/SolucoesHub"));
const ClusterSolucaoPage = lazy(() => import("./pages/solucoes/ClusterSolucaoPage"));


// Pillar do cluster de informática
const GuiaTecnicoInformatica = lazy(() => import("./pages/GuiaTecnicoInformatica"));

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

const WhatsAppChatbot = lazy(() => import("@/components/WhatsAppChatbot").then((m) => ({ default: m.WhatsAppChatbot })));
const SocialProofProvider = lazy(() => import("@/components/social-proof").then((m) => ({ default: m.SocialProofProvider })));
const GA4ChecklistPanel = lazy(() => import("@/components/GA4ChecklistPanel").then((m) => ({ default: m.GA4ChecklistPanel })));
const Toaster = lazy(() => import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })));


export const IdleEnhancements = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const activate = () => setEnabled(true);
    const idleId: number = typeof window.requestIdleCallback === "function"
      ? window.requestIdleCallback(activate, { timeout: 4500 })
      : (globalThis.setTimeout(activate, 2500) as unknown as number);

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      } else {
        globalThis.clearTimeout(idleId);
      }

    };
  }, []);

  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <Toaster />
      <Sonner />
      <WhatsAppChatbot />
      <SocialProofProvider />
      <GA4ChecklistPanel />
    </Suspense>
  );
};


// ─────────────────────────────────────────────────────────────
// Gerado pela migração TanStack Start a partir de src/LegacyApp.tsx.
// Cada rota em src/routes/ referencia um elemento deste registro,
// preservando lazy-loading e code-splitting por página.
// ─────────────────────────────────────────────────────────────

export const legacyRouteElements: Record<string, () => React.ReactElement> = {
  "/": () => <Index />,
  "/servicos": () => <Servicos />,
  "/atendimento-domicilio": () => <AtendimentoDomicilio />,
  "/atendimento-remoto": () => <AtendimentoRemoto />,
  "/arrumar-pc": () => <ArrumarPC />,
  "/arrumar-pc/online": () => <ArrumarPC />,
  "/arrumar-pc/servico/:servico/:cidade": () => <ArrumarPCServicoCidade />,
  "/arrumar-pc/:cidade": () => <ArrumarPCCity />,
  "/empresa-de-ti-curitiba": () => <EmpresaDeTiCuritiba />,
  "/precos-e-politicas": () => <PrecosEPoliticas />,
  "/valores": () => <PrecosEPoliticas />,
  "/tecnico-informatica-curitiba": () => <TecnicoInformaticaCuritiba />,
  "/tecnico-informatica-sao-jose-pinhais": () => <TecnicoInformaticaSaoJosePinhais />,
  "/tecnico-informatica-araucaria": () => <TecnicoInformaticaAraucaria />,
  "/tecnico-informatica-campo-largo": () => <TecnicoInformaticaCampoLargo />,
  "/tecnico-informatica-pinhais": () => <TecnicoInformaticaPinhais />,
  "/tecnico-informatica-colombo": () => <TecnicoInformaticaColombo />,
  "/tecnico-informatica-fazenda-rio-grande": () => <TecnicoInformaticaFazendaRioGrande />,
  "/tecnico-informatica-almirante-tamandare": () => <TecnicoInformaticaAlmiranteTamandare />,
  "/tecnico-informatica-piraquara": () => <TecnicoInformaticaPiraquara />,
  "/tecnico-informatica-campo-magro": () => <TecnicoInformaticaCampoMagro />,
  "/tecnico-informatica-quatro-barras": () => <TecnicoInformaticaQuatroBarras />,
  "/sobre": () => <Sobre />,
  "/gestor-responsavel": () => <GestorResponsavel />,
  "/contato": () => <Contato />,
  "/obrigado": () => <Obrigado />,
  "/blog": () => <Blog />,
  "/blog/:slug": () => <BlogPost />,
  "/faq": () => <FAQ />,
  "/como-funciona": () => <ComoFunciona />,
  "/diagnostico-tecnico": () => <DiagnosticoTecnico />,
  "/diagnostico-60s": () => <Diagnostico60s />,
  "/equipamentos-atendidos": () => <EquipamentosAtendidos />,
  "/areas-atendidas": () => <AreasAtendidas />,
  "/seguranca-dos-dados": () => <SegurancaDosDados />,
  "/politica-de-pecas-do-cliente": () => <PoliticaPecasCliente />,
  "/avaliar": () => <Avaliar />,
  "/excluir-meus-dados": () => <ExcluirMeusDados />,
  "/problemas-reais-e-casos": () => <ProblemasReaisCasos />,
  "/coleta-e-entrega": () => <ColetaEntrega />,
  "/coleta-formulario": () => <ColetaFormulario />,
  "/quando-nao-compensa": () => <QuandoNaoCompensa />,
  "/seja-parceiro": () => <SejaParceiro />,
  "/profissionais": () => <DiretorioProfissionais />,
  "/profissionais/cadastro": () => <CadastroParceiro />,
  "/profissional/:slug": () => <PerfilProfissional />,
  "/profissionais/:estado": () => <ProfissionaisLocal />,
  "/profissionais/:estado/:cidade": () => <ProfissionaisLocal />,
  "/atendimento": () => <Atendimento />,
  "/empresas": () => <Empresas />,
  "/valorizacao-do-trabalho-tecnico": () => <ValorizacaoTrabalhoTecnico />,
  "/bairros/centro": () => <Centro />,
  "/bairros/batel": () => <Batel />,
  "/bairros/portao": () => <Portao />,
  "/bairros/campo-comprido": () => <CampoComprido />,
  "/bairros/cic": () => <CIC />,
  "/bairros/santa-felicidade": () => <SantaFelicidade />,
  "/bairros/sao-jose-dos-pinhais": () => <SaoJoseDosPinhais />,
  "/bairros/afonso-pena": () => <AfonsoPena />,
  "/bairros/cruzeiro": () => <Cruzeiro />,
  "/bairros/aristocrata": () => <Aristocrata />,
  "/bairros/braga": () => <Braga />,
  "/bairros/costeira": () => <Costeira />,
  "/bairros/aviacao": () => <Aviacao />,
  "/bairros/parque-da-fonte": () => <ParqueDaFonte />,
  "/bairros/guatupe": () => <Guatupe />,
  "/bairros/sao-cristovao": () => <SaoCristovao />,
  "/bairros/sao-domingos": () => <SaoDomingos />,
  "/bairros/sao-marcos": () => <SaoMarcos />,
  "/bairros/sao-francisco": () => <SaoFrancisco />,
  "/bairros/del-rey": () => <DelRey />,
  "/bairros/barro-preto": () => <BarroPreto />,
  "/bairros/centro-araucaria": () => <AraucariaCentro />,
  "/bairros/capela-velha": () => <CapelaVelhaAraucaria />,
  "/bairros/thomaz-coelho": () => <ThomazCoelhoAraucaria />,
  "/bairros/cachoeira-araucaria": () => <CacheiraAraucaria />,
  "/bairros/thomaz-coelho-ii": () => <ThomazCoelhoIIAraucaria />,
  "/bairros/jardim-boa-vista-araucaria": () => <JardimBoaVistaAraucaria />,
  "/bairros/sao-miguel-araucaria": () => <SaoMiguelAraucaria />,
  "/bairros/california-araucaria": () => <CaliforniaAraucaria />,
  "/bairros/vila-nova-araucaria": () => <VilaNovaAraucaria />,
  "/bairros/industrial-araucaria": () => <IndustrialAraucaria />,
  "/bairros/jardim-iguacu-araucaria": () => <JardimIguacuAraucaria />,
  "/bairros/planta-sao-tiago-araucaria": () => <PlantaSaoTiagoAraucaria />,
  "/bairros/jardim-shangrila-araucaria": () => <JardimShangrilaAraucaria />,
  "/bairros/jardim-laranjeiras-cl": () => <JardimLaranjeirasCL />,
  "/bairros/sao-marcos-campo-largo": () => <SaoMarcosCampoLargo />,
  "/bairros/sao-jose-campo-largo": () => <SaoJoseCampoLargo />,
  "/bairros/jardim-esperanca-cl": () => <JardimEsperancaCL />,
  "/bairros/colonia-malhada-cl": () => <ColoniaMalhadaCL />,
  "/bairros/lamenha-grande-cl": () => <LamenhaGrandeCL />,
  "/bairros/vila-candida-cl": () => <VilaCandidaCL />,
  "/bairros/jardim-novo-horizonte-cl": () => <JardimNovoHorizonteCL />,
  "/bairros/timbotuva-cl": () => <TimbotuvaCL />,
  "/bairros/jardim-planalto-ii-cl": () => <JardimPlanaltoIICL />,
  "/bairros/jardim-pedro-demeterco": () => <JardimPedroDemeterco />,
  "/bairros/jardim-karla-pinhais": () => <JardimKarlaPinhais />,
  "/bairros/jardim-claudia-ii-pinhais": () => <JardimClaudiaIIPinhais />,
  "/bairros/jardim-wissinger-pinhais": () => <JardimWissingerPinhais />,
  "/bairros/vila-amelia-pinhais": () => <VilaAmeliaPinhais />,
  "/bairros/jardim-esplanada-pinhais": () => <JardimEsplanadaPinhais />,
  "/bairros/vila-maria-antonieta-pinhais": () => <VilaMariaAntonietaPinhais />,
  "/bairros/jardim-dona-rosa-pinhais": () => <JardimDonaRosaPinhais />,
  "/bairros/parque-nascentes-pinhais": () => <ParqueNascentesPinhais />,
  "/bairros/jardim-tropical-pinhais": () => <JardimTropicalPinhais />,
  "/bairros/centro-campo-largo": () => <CampoLargoCentro />,
  "/bairros/ferraria": () => <FerrariaCampoLargo />,
  "/bairros/jardim-guilhermina": () => <JardimGuilherminaCampoLargo />,
  "/bairros/centro-pinhais": () => <PinhaisCentro />,
  "/bairros/weissopolis": () => <WeissopolisPinhais />,
  "/bairros/pineville": () => <PinevillePinhais />,
  "/bairros/centro-colombo": () => <CentroColombo />,
  "/bairros/maracana-colombo": () => <MaracanaColombo />,
  "/bairros/guaraituba-colombo": () => <GuaraitubaColombo />,
  "/bairros/centro-fazenda-rio-grande": () => <CentroFRG />,
  "/bairros/eucaliptos-frg": () => <EucaliptosFRG />,
  "/bairros/nacoes-frg": () => <NacoesFRG />,
  "/bairros/centro-almirante-tamandare": () => <CentroAlmiranteTamandare />,
  "/bairros/jardim-monte-santo": () => <JardimMontoSantoAT />,
  "/bairros/cachoeira-at": () => <CachoeiraAT />,
  "/bairros/agua-verde": () => <AguaVerde />,
  "/bairros/bigorrilho": () => <Bigorrilho />,
  "/bairros/merces": () => <Merces />,
  "/bairros/boa-vista": () => <BoaVista />,
  "/bairros/juveve": () => <Juveve />,
  "/bairros/cabral": () => <Cabral />,
  "/bairros/cristo-rei": () => <CristoRei />,
  "/bairros/cajuru": () => <Cajuru />,
  "/bairros/uberaba": () => <Uberaba />,
  "/bairros/pinheirinho": () => <Pinheirinho />,
  "/bairros/xaxim": () => <Xaxim />,
  "/bairros/alto-da-gloria": () => <AltoGloria />,
  "/bairros/reboucas": () => <Reboucas />,
  "/bairros/vila-izabel": () => <VilaIzabel />,
  "/bairros/seminario": () => <Seminario />,
  "/bairros/hugo-lange": () => <HugoLange />,
  "/bairros/jardim-social": () => <JardimSocial />,
  "/bairros/jardim-das-americas": () => <JardimAmericas />,
  "/bairros/taruma": () => <Taruma />,
  "/bairros/capao-da-imbuia": () => <CapaoImbuia />,
  "/bairros/hauer": () => <Hauer />,
  "/bairros/alto-boqueirao": () => <AltoBoqueiraoCtba />,
  "/bairros/sitio-cercado": () => <SitioCercado />,
  "/bairros/novo-mundo": () => <NovoMundo />,
  "/bairros/fazendinha": () => <Fazendinha />,
  "/bairros/jardim-botanico": () => <AguaVerdeBairro />,
  "/bairros/quississana-sjp": () => <QuissisanaSJP />,
  "/bairros/academia-sjp": () => <AcademiaSJP />,
  "/bairros/colonia-murici-sjp": () => <ColoniaMurcySJP />,
  "/bairros/boneca-do-iguacu-sjp": () => <BonecaSJP />,
  "/bairros/ouro-fino-sjp": () => <OuroFinoSJP />,
  "/bairros/agricola-sjp": () => <AgricolareSJP />,
  "/bairros/campo-largo-roseira-sjp": () => <CampoLargoSJP />,
  "/bairros/italia-sjp": () => <ItaliaSJP />,
  "/bairros/borda-campo-sjp": () => <BordoDoCampoSJP2 />,
  "/bairros/independencia-sjp": () => <IndependenciaSJP />,
  "/bairros/osvaldo-cruz-colombo": () => <OswaldoCruzColombo />,
  "/bairros/sao-dimas-colombo": () => <ColareColombo />,
  "/bairros/campina-grande-colombo": () => <CampinaGrandeColombo />,
  "/bairros/taxiqueira-colombo": () => <TaxiqueiraColomboo />,
  "/bairros/embu-colombo": () => <EmbuColombo />,
  "/bairros/jardim-uniao-piraquara": () => <JardimUniaoPiraquara />,
  "/bairros/jardim-santo-antonio-piraquara": () => <JardimSantoAntonioPiraquara />,
  "/bairros/jardim-sao-paulo-piraquara": () => <JardimSaoPauloPiraquara />,
  "/bairros/irai-piraquara": () => <IraiPiraquara />,
  "/bairros/boa-vista-at": () => <BoaVistaTamandare />,
  "/bairros/campo-tenente-at": () => <CampoDoTenenteTamandare />,
  "/bairros/jardim-paranagua-at": () => <JardimParanaguaTamandare />,
  "/bairros/jardim-sao-jorge-at": () => <JardimSaoJorgeTamandare />,
  "/bairros/parque-industrial-frg": () => <EucaliptosFRG2 />,
  "/bairros/jardim-condor-frg": () => <JardimCondorFRG />,
  "/bairros/jardim-ipe-frg": () => <JardimIperigoFRG />,
  "/bairros/jardim-das-pedras-frg": () => <JardimDasPedrasFRG />,
  "/bairros/joquei-clube-cm": () => <JoqueiFRCM />,
  "/bairros/antonio-olivero-cm": () => <AntonioOliveraCM />,
  "/bairros/espigao-alegre-cm": () => <EspigoAlegreCM />,
  "/bairros/jardim-florestal-qb": () => <JardimFlorestalQB />,
  "/bairros/jardim-japao-qb": () => <JardimJaponeQB />,
  "/bairros/graciosa-qb": () => <GraciosaMirQB />,
  "/bairros/boqueirao": () => <Boqueirao />,
  "/bairros/bacacheri": () => <Bacacheri />,
  "/bairros/tingui": () => <Tingui />,
  "/bairros/chapada": () => <ChapadaAraucaria />,
  "/bairros/costeira-araucaria": () => <CosteiraAraucaria />,
  "/bairros/iguacu-araucaria": () => <IguacuAraucaria />,
  "/bairros/campina-da-barra": () => <CampinaDaBarra />,
  "/bairros/porto-das-laranjeiras": () => <PortoDasLaranjeiras />,
  "/bairros/tindiquera": () => <Tindiquera />,
  "/bairros/barigui-araucaria": () => <BariguiAraucaria />,
  "/bairros/fazenda-velha-araucaria": () => <FazendaVelhaAraucaria />,
  "/bairros/estacao-araucaria": () => <EstacaoAraucaria />,
  "/bairros/boqueirao-araucaria": () => <BoqueiraoAraucaria />,
  "/bairros/sabia": () => <SabiaAraucaria />,
  "/bairros/passauna": () => <PassaunaAraucaria />,
  "/bairros/guajuvira": () => <GuajuviraAraucaria />,
  "/bairros/alto-maracana": () => <AltoMaracanaColombo />,
  "/bairros/atuba-colombo": () => <AtubaColombo />,
  "/bairros/campo-pequeno": () => <CampoPequenoColombo />,
  "/bairros/fatima-colombo": () => <FatimaColombo />,
  "/bairros/gabirobal": () => <GabirobalColombo />,
  "/bairros/jardim-osasco": () => <JardimOsascoColombo />,
  "/bairros/monza-colombo": () => <MonzaColombo />,
  "/bairros/palmital-colombo": () => <PalmitalColombo />,
  "/bairros/roca-grande": () => <RocaGrandeColombo />,
  "/bairros/sao-gabriel-colombo": () => <SaoGabrielColombo />,
  "/bairros/santa-terezinha-colombo": () => <SantaTerezinhaColombo />,
  "/bairros/emiliano-perneta": () => <EmilianoPerneta />,
  "/bairros/maria-antonieta": () => <MariaAntonieta />,
  "/bairros/vargem-grande": () => <VargemGrande />,
  "/bairros/estancia-pinhais": () => <EstanciaPinhais />,
  "/bairros/alto-taruma": () => <AltoTaruma />,
  "/bairros/graciosa": () => <GraciosaPinhais />,
  "/bairros/jardim-amelia": () => <JardimAmelia />,
  "/bairros/palmital-pinhais": () => <PalmitalPinhais />,
  "/bairros/atuba-pinhais": () => <AtubaPinhais />,
  "/bairros/sete-vilas": () => <SeteVilas />,
  "/bairros/vila-taruma": () => <VilaTaruma />,
  "/bairros/vale-das-aguas": () => <ValeDasAguas />,
  "/bairros/jardim-claudia": () => <JardimClaudia />,
  "/bairros/jardim-america-campo-largo": () => <JardimAmericaCL />,
  "/bairros/botiatuva": () => <BotiatuvaCL />,
  "/bairros/rondinha": () => <RondinhaCL />,
  "/bairros/sao-silvestre": () => <SaoSilvestreCL />,
  "/bairros/tres-corregos": () => <TresCorregosCL />,
  "/bairros/itaqui": () => <ItaquiCL />,
  "/bairros/ouro-fino": () => <OuroFinoCL />,
  "/bairros/bateias": () => <BateiasCL />,
  "/bairros/palmital-campo-largo": () => <PalmitalCL />,
  "/bairros/santa-cruz-campo-largo": () => <SantaCruzCL />,
  "/bairros/correia-de-freitas": () => <CorreiaDeFreitasCL />,
  "/bairros/jardim-planalto-campo-largo": () => <JardimPlanaltoCL />,
  "/bairros/vila-solene": () => <VilaSoleneCL />,
  "/bairros/iguacu-frg": () => <IguacuFRG />,
  "/bairros/gralha-azul": () => <GralhaAzulFRG />,
  "/bairros/santa-terezinha-frg": () => <SantaTerezinhaFRG />,
  "/bairros/jardim-estados": () => <JardimEstadosFRG />,
  "/bairros/pioneiros-frg": () => <PioneirosFRG />,
  "/bairros/sao-lourenco-frg": () => <SaoLourencoFRG />,
  "/bairros/hortencia-frg": () => <HortenciaFRG />,
  "/bairros/tangua-at": () => <TanguaAT />,
  "/bairros/sao-venancio": () => <SaoVenancioAT />,
  "/bairros/jardim-graziela": () => <JardimGrazielaAT />,
  "/bairros/jardim-roma": () => <JardimRomaAT />,
  "/bairros/colonia-antonio-prado": () => <ColoniaAntonioPradoAT />,
  "/bairros/tranqueira-at": () => <TranqueiraAT />,
  "/bairros/jardim-paraiso-at": () => <JardimParaisoAT />,
  "/bairros/centro-piraquara": () => <CentroPiraquara />,
  "/bairros/jardim-primavera-piraquara": () => <JardimPrimaveraPiraquara />,
  "/bairros/planta-deodoro-piraquara": () => <PlantaDeodoroPiraquara />,
  "/bairros/vila-macedo-piraquara": () => <VilaMacedoPiraquara />,
  "/bairros/guarituba-piraquara": () => <GuaritubaPiraquara />,
  "/bairros/prado-velho-piraquara": () => <PradoVelhoPiraquara />,
  "/bairros/sao-cristao-piraquara": () => <SaoCristaoPiraquara />,
  "/bairros/jardim-bela-vista-piraquara": () => <JardimBelaVistaPiraquara />,
  "/bairros/caiua-piraquara": () => <CaiuaPiraquara />,
  "/bairros/centro-campo-magro": () => <CentroCampoMagro />,
  "/bairros/sede-campo-magro": () => <SedeCampoMagro />,
  "/bairros/jardim-boa-vista-cm": () => <JardimBoaVistaCM />,
  "/bairros/sao-sebastiao-cm": () => <SaoSebastiaoCM />,
  "/bairros/rio-verde-cm": () => <RioVerdeCM />,
  "/bairros/botiatuva-cm": () => <BotiatuvaCM />,
  "/bairros/centro-quatro-barras": () => <CentroQuatroBarras />,
  "/bairros/jardim-menino-deus-qb": () => <JardimMeninoDeusQB />,
  "/bairros/vila-sao-jose-qb": () => <VilaSaoJoseQB />,
  "/bairros/borda-do-campo-qb": () => <BordaDoCampoQB />,
  "/bairros/sao-lourenco-qb": () => <SaoLourencoQB />,
  "/bairros/vila-maria-qb": () => <VilaMariaQB />,
  "/bairros/cidade-jardim-sjp": () => <CidadeJardimSJP />,
  "/bairros/pedro-moro-sjp": () => <PedroMoroSJP />,
  "/bairros/ipe-sjp": () => <IpeSJP />,
  "/bairros/rio-pequeno-sjp": () => <RioPequenoSJP />,
  "/bairros/borda-do-campo-sjp": () => <BordaDoCampoSJP />,
  "/ads/tecnico-informatica-curitiba": () => <TecnicoInformaticaCuritibaAds />,
  "/cftv": () => <CFTVPage />,
  "/cftv/curitiba": () => <CFTVCuritiba />,
  "/cftv/sao-jose-dos-pinhais": () => <CFTVSaoJosePinhais />,
  "/cftv/litoral": () => <CFTVLitoral />,
  "/cftv/guaratuba": () => <CFTVGuaratuba />,
  "/cftv/araucaria": () => <CFTVAraucaria />,
  "/cftv/campo-largo": () => <CFTVCampoLargo />,
  "/cftv/pinhais": () => <CFTVPinhais />,
  "/servicos/formatacao": () => <ServicoCore slug="formatacao" />,
  "/servicos/manutencao-de-notebook": () => <ServicoCore slug="manutencao-de-notebook" />,
  "/servicos/manutencao-de-computador": () => <ServicoCore slug="manutencao-de-computador" />,
  "/servicos/upgrade-ssd-ram": () => <ServicoCore slug="upgrade-ssd-ram" />,
  "/servicos/remocao-de-virus": () => <ServicoCore slug="remocao-de-virus" />,
  "/servicos/recuperacao-de-dados": () => <ServicoCore slug="recuperacao-de-dados" />,
  "/servicos/redes-e-wifi": () => <ServicoCore slug="redes-e-wifi" />,
  "/servicos/suporte-tecnico-empresarial": () => <ServicoCore slug="suporte-tecnico-empresarial" />,
  "/servicos/manutencao-preventiva-empresas": () => <ServicoCore slug="manutencao-preventiva-empresas" />,
  "/servicos/backup-para-empresas": () => <ServicoCore slug="backup-para-empresas" />,
  "/servicos/suporte-home-office": () => <ServicoCore slug="suporte-home-office" />,
  "/servicos/montagem-de-pc": () => <ServicoCore slug="montagem-de-pc" />,
  "/servicos/pc-gamer": () => <ServicoCore slug="pc-gamer" />,
  "/servicos/conserto-tv": () => <ServicoCore slug="conserto-tv" />,
  "/servicos/conserto-placa": () => <ServicoCore slug="conserto-placa" />,
  "/servicos/conserto-monitor": () => <ServicoCore slug="conserto-monitor" />,
  "/servicos/montagem-pc": () => <MontagemPc />,
  "/servicos/computador-lento": () => <ComputadorLento />,
  "/servicos/computador-nao-liga": () => <ComputadorNaoLiga />,
  "/servicos/manutencao-tv": () => <ManutencaoTV />,
  "/servicos/conserto-celular": () => <ConsertoCelular />,
  "/servicos/formatacao-computador/centro": () => <FormatacaoCentro />,
  "/servicos/conserto-pc-notebook/batel": () => <ConsertoNotebookBatel />,
  "/servicos/remocao-virus/portao": () => <RemocaoVirusPortao />,
  "/servicos/upgrade-ssd-memoria/santa-felicidade": () => <UpgradeSsdSantaFelicidade />,
  "/servicos/formatacao-computador/sao-jose-dos-pinhais": () => <FormatacaoSaoJosePinhais />,
  "/servicos/conserto-pc-notebook/cic": () => <ConsertoNotebookCIC />,
  "/servicos/redes-wifi/araucaria": () => <RedesWifiAraucaria />,
  "/servicos/remocao-virus/centro": () => <RemocaoVirusCentro />,
  "/servicos/upgrade-ssd-memoria/batel": () => <UpgradeSsdBatel />,
  "/servicos/formatacao-computador/portao": () => <FormatacaoPortao />,
  "/servicos/redes-wifi/cic": () => <RedesWifiCIC />,
  "/servicos/redes-wifi/batel": () => <RedesWifiBatel />,
  "/servicos/redes-wifi/centro": () => <RedesWifiCentro />,
  "/servicos/redes-wifi/agua-verde": () => <RedesWifiAguaVerde />,
  "/servicos/redes-wifi/portao": () => <RedesWifiPortao />,
  "/servicos/manutencao-tv/batel": () => <ManutencaoTvBatel />,
  "/servicos/manutencao-tv/centro": () => <ManutencaoTvCentro />,
  "/servicos/manutencao-tv/agua-verde": () => <ManutencaoTvAguaVerde />,
  "/servicos/manutencao-tv/cic": () => <ManutencaoTvCic />,
  "/servicos/manutencao-tv/portao": () => <ManutencaoTvPortao />,
  "/servicos/redes-wifi/bigorrilho": () => <RedesWifiBigorrilho />,
  "/servicos/redes-wifi/cabral": () => <RedesWifiCabral />,
  "/servicos/redes-wifi/boa-vista": () => <RedesWifiBoaVista />,
  "/servicos/redes-wifi/cristo-rei": () => <RedesWifiCristoRei />,
  "/servicos/redes-wifi/cajuru": () => <RedesWifiCajuru />,
  "/servicos/redes-wifi/boqueirao": () => <RedesWifiBoqueirao />,
  "/servicos/manutencao-tv/bigorrilho": () => <ManutencaoTvBigorrilho />,
  "/servicos/manutencao-tv/cabral": () => <ManutencaoTvCabral />,
  "/servicos/manutencao-tv/santa-felicidade": () => <ManutencaoTvSantaFelicidade />,
  "/servicos/manutencao-tv/boa-vista": () => <ManutencaoTvBoaVista />,
  "/servicos/manutencao-tv/cristo-rei": () => <ManutencaoTvCristoRei />,
  "/servicos/manutencao-tv/cajuru": () => <ManutencaoTvCajuru />,
  "/servicos/manutencao-tv/boqueirao": () => <ManutencaoTvBoqueirao />,
  "/servicos/redes-wifi/jardim-das-americas": () => <RedesWifiJardimAmericas />,
  "/servicos/manutencao-tv/jardim-das-americas": () => <ManutencaoTvJardimAmericas />,
  "/servicos/redes-wifi/ecoville": () => <RedesWifiEcoville />,
  "/servicos/manutencao-tv/ecoville": () => <ManutencaoTvEcoville />,
  "/servicos/redes-wifi/alto-da-xv": () => <RedesWifiAltoXV />,
  "/servicos/manutencao-tv/alto-da-xv": () => <ManutencaoTvAltoXV />,
  "/servicos/redes-wifi/reboucas": () => <RedesWifiReboucas />,
  "/servicos/manutencao-tv/reboucas": () => <ManutencaoTvReboucas />,
  "/servicos/backup-recuperacao/centro": () => <BackupCentro />,
  "/servicos/conserto-pc-notebook/portao": () => <ConsertoNotebookPortao />,
  "/servicos/redes-wifi/santa-felicidade": () => <RedesWifiSantaFelicidadeAncora />,
  "/servicos/formatacao-computador/campo-comprido": () => <FormatacaoCampoComprido />,
  "/servicos/remocao-virus/batel": () => <RemocaoVirusBatel />,
  "/servicos/montagem-pc/cic": () => <MontagemPcCIC />,
  "/servicos/remocao-virus/sao-jose-dos-pinhais": () => <RemocaoVirusSaoJosePinhais />,
  "/servicos/conserto-pc-notebook/sao-jose-dos-pinhais": () => <ConsertoNotebookSaoJosePinhais />,
  "/servicos/upgrade-ssd-memoria/sao-jose-dos-pinhais": () => <UpgradeSsdSaoJosePinhais />,
  "/servicos/redes-wifi/sao-jose-dos-pinhais": () => <RedesWifiSaoJosePinhais />,
  "/servicos/formatacao-computador/araucaria": () => <FormatacaoAraucaria />,
  "/servicos/remocao-virus/araucaria": () => <RemocaoVirusAraucaria />,
  "/servicos/conserto-pc-notebook/araucaria": () => <ConsertoNotebookAraucaria />,
  "/servicos/upgrade-ssd-memoria/araucaria": () => <UpgradeSsdAraucaria />,
  "/servicos/formatacao-computador/campo-largo": () => <FormatacaoCampoLargo />,
  "/servicos/remocao-virus/campo-largo": () => <RemocaoVirusCampoLargo />,
  "/servicos/conserto-pc-notebook/campo-largo": () => <ConsertoNotebookCampoLargo />,
  "/servicos/redes-wifi/campo-largo": () => <RedesWifiCampoLargo />,
  "/servicos/formatacao-computador/pinhais": () => <FormatacaoPinhais />,
  "/servicos/remocao-virus/pinhais": () => <RemocaoVirusPinhais />,
  "/servicos/conserto-pc-notebook/pinhais": () => <ConsertoNotebookPinhais />,
  "/servicos/upgrade-ssd-memoria/pinhais": () => <UpgradeSsdPinhais />,
  "/servicos/redes-wifi/pinhais": () => <RedesWifiPinhais />,
  "/servicos/:servico/:cidade": () => <ServicoCidadePage />,
  "/procedimentos-placa": () => <ProcedimentosPlaca />,
  "/procedimentos/:slug": () => <ProblemaPage />,
  "/marcas": () => <Marcas />,
  "/marcas/:slug": () => <MarcaPage />,
  "/problemas": () => <ProblemasHub />,
  "/problemas/notebook-nao-liga": () => <NotebookNaoLiga />,
  "/problemas/computador-lento": () => <ProblemaComputadorLento />,
  "/problemas/wifi-instavel": () => <ClusterProblemaPage />,
  "/problemas/tela-azul": () => <ClusterProblemaPage />,
  "/problemas/arquivos-apagados": () => <ClusterProblemaPage />,
  "/problemas/computador-desliga-sozinho": () => <ClusterProblemaPage />,
  "/problemas/notebook-nao-carrega": () => <ClusterProblemaPage />,
  "/problemas/hd-fazendo-barulho": () => <ClusterProblemaPage />,
  "/problemas/computador-nao-da-imagem": () => <ClusterProblemaPage />,
  "/problemas/cheiro-de-queimado": () => <ClusterProblemaPage />,
  "/problemas/notebook-molhado": () => <ClusterProblemaPage />,
  "/problemas/windows-nao-inicia": () => <ClusterProblemaPage />,
  "/problemas/computador-esquentando": () => <ClusterProblemaPage />,
  "/problemas/impressora-nao-imprime": () => <ClusterProblemaPage />,
  "/problemas/teclado-notebook-nao-funciona": () => <ClusterProblemaPage />,
  "/equipamentos": () => <EquipamentosHub />,
  "/equipamentos/:slug": () => <ClusterEquipamentoPage />,
  "/solucoes": () => <SolucoesHub />,
  "/solucoes/:slug": () => <ClusterSolucaoPage />,
  "/guia-tecnico-informatica": () => <GuiaTecnicoInformatica />,
  "/problemas/:slug": () => <ProblemaPage />,
  "/assistencia-tecnica-curitiba": () => <AssistenciaTecnicaCuritiba />,
  "/termos-e-condicoes": () => <TermosCondicoes />,
  "/politica-de-privacidade": () => <PoliticaPrivacidade />,
  "/politica-de-cookies-e-anuncios": () => <PoliticaCookiesAnuncios />,
  "/status-de-anuncios": () => <StatusAnuncios />,
  "/anuncie": () => <Anuncie />,
  "/funil-indisponivel": () => <FunilIndisponivel />,
  "/debug/telemetria": () => <DebugTelemetria />,
  "/ordem-de-servico": () => <OrdemDeServico />,
  "/status-da-ordem-de-servico": () => <StatusOs />,
  "/status-os": () => <StatusOs />,
  "/depoimentos": () => <Depoimentos />,
  "/como-avaliar": () => <ComoAvaliar />,
  "/admin/login": () => <AdminLogin />,
  "/admin/funnel": () => <AdminFunnel />,
  "/admin/reviews": () => <AdminReviews />,
  "/admin/vitals": () => <AdminVitals />,
  "/admin/auditoria-local": () => <AdminAuditoriaLocal />,
  "/admin/gates-locais": () => <AdminGatesLocais />,
  "/admin/inventario-bairros": () => <AdminInventarioBairros />,
  "/admin/ui-performance": () => <AdminUiPerformance />,
  "/admin/dashboard": () => <AdminDashboard />,
  "/admin/casos": () => <AdminCasos />,
  "/admin/auditoria-os": () => <AdminOsAudit />,
  "/admin/operacao": () => <AdminOperacao />,
  "/admin/provas-monitor": () => <AdminProvasMonitor />,
  "/admin/provas-verticais": () => <AdminProvasVerticais />,
  "/admin/conversao": () => <AdminConversao />,
  "/admin/link-builder": () => <AdminLinkBuilder />,
  "/admin/experimento-wa": () => <AdminExperimentoWa />,
  "/admin/publicacao": () => <AdminPublicacao />,
  "/admin/fotos": () => <AdminFotos />,
  "/admin/editor-local": () => <AdminEditorLocal />,
  "/admin/performance-local": () => <AdminPerformanceLocal />,
  "/admin/auditoria-acessos": () => <AdminAuditoriaAcessos />,
  "/admin/qa-trafego": () => <AdminQaTrafego />,
  "/conserto-impressora-curitiba": () => <ConsertoImpressoraCuritiba />,
  "/assistencia-eletrodomesticos-inteligentes-curitiba": () => <AssistenciaEletrodomesticosInteligentesCuritiba />,
  "/conserto-tv-curitiba": () => <ConsertoTVHub />,
  "/conserto-tv/:local": () => <ConsertoTVCity />,
  "/conserto-som-curitiba": () => <ConsertoSomHub />,
  "/conserto-som/:local": () => <ConsertoSomCity />,
  "/conserto-videogame-curitiba": () => <ConsertoVideogameHub />,
  "/conserto-videogame/:local": () => <ConsertoVideogameCity />,
  "/conserto-celular-curitiba": () => <ConsertoCelularLocalHub />,
  "/conserto-celular/:local": () => <ConsertoCelularLocalCity />,
  "/status": () => <Status />,
  "/creditos-de-imagens": () => <CreditosDeImagens />,
};

/** Redirects que antes eram <Navigate replace> no React Router. */
export const legacyNavigateRedirects: Record<string, string> = {
  "/patrocinadores": "/anuncie",
  "/admin": "/admin/funnel",
  "/index": "/",
};

export const LegacyNotFound = NotFound;
