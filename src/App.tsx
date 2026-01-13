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
import TecnicoInformaticaCuritiba from "./pages/TecnicoInformaticaCuritiba";
import TecnicoInformaticaSaoJosePinhais from "./pages/TecnicoInformaticaSaoJosePinhais";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

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
          <Route path="/tecnico-informatica-curitiba" element={<TecnicoInformaticaCuritiba />} />
          <Route path="/tecnico-informatica-sao-jose-pinhais" element={<TecnicoInformaticaSaoJosePinhais />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<FAQ />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
