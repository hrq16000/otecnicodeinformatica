import { ServicoLandingLayout } from "@/components/servico/ServicoLandingLayout";
import { SERVICOS_CORE } from "@/lib/servicosCore";

/**
 * Página de serviço essencial (data-driven). Recebe o slug canônico e
 * renderiza a partir de SERVICOS_CORE com a identidade nova.
 */
const ServicoCore = ({ slug }: { slug: keyof typeof SERVICOS_CORE }) => {
  const data = SERVICOS_CORE[slug];
  if (!data) return null;
  return <ServicoLandingLayout data={data} />;
};

export default ServicoCore;
