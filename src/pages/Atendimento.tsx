import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FunilQuatroEtapas } from "@/components/funil/FunilQuatroEtapas";
import { trackPageView } from "@/lib/analytics";

/**
 * ETAPA 4 — página de atendimento com o funil inteligente em 4 etapas.
 * Página de conversão (noindex): o conteúdo indexável continua nas páginas
 * de problema e de serviço, sem canibalizar.
 */
const Atendimento = () => {
  useEffect(() => {
    trackPageView("/atendimento", "Atendimento");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Solicitar atendimento técnico | Em 4 etapas"
        description="Descreva o problema, informe o equipamento, escolha a modalidade e confirme o atendimento com o custo de deslocamento calculado antes do envio."
        path="/atendimento"
        noindex
      />
      <Header />

      <main className="container mx-auto py-10 md:py-14">
        <h1 className="max-w-3xl font-heading text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
          Vamos organizar seu atendimento em quatro passos
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Cada pergunta existe para evitar retrabalho: o que aconteceu, em qual equipamento, qual
          modalidade resolve e o custo estimado antes de você confirmar.
        </p>

        <div className="mt-8 max-w-3xl">
          <FunilQuatroEtapas origem="pagina_atendimento" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Atendimento;
