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
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
