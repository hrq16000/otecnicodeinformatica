import { ServicoLandingLayout } from "@/components/servico/ServicoLandingLayout";
import { MontagemPoliticaBlocos } from "@/components/servico/MontagemPoliticaBlocos";
import { MontagemWizard } from "@/components/servico/MontagemWizard";
import { SERVICOS_CORE } from "@/lib/servicosCore";
import { SERVICOS_LOCAL } from "@/lib/servicosLocal";

/**
 * Página de serviço essencial (data-driven). Recebe o slug canônico e
 * renderiza a partir de SERVICOS_CORE com a identidade nova. A camada
 * SERVICOS_LOCAL adiciona conteúdo local, FAQ de intenção local e
 * links internos contextuais para reforço de SEO local em Curitiba.
 */
const ServicoCore = ({ slug }: { slug: keyof typeof SERVICOS_CORE }) => {
  const base = SERVICOS_CORE[slug];
  if (!base) return null;

  const local = SERVICOS_LOCAL[slug];
  const data = local
    ? {
        ...base,
        faqs: [...base.faqs, ...local.faqsLocais],
        blocoLocal: local.blocoLocal,
        linksLocais: local.linksLocais,
      }
    : base;

  // Blocos de política/checklist + wizard de solicitação (Rodada 3L / wizard).
  const extra =
    slug === "montagem-de-pc" ? (
      <>
        <MontagemPoliticaBlocos />
        <MontagemWizard />
      </>
    ) : undefined;

  return <ServicoLandingLayout data={{ ...data, extra }} />;
};

export default ServicoCore;
