import { ServicoLandingLayout } from "@/components/servico/ServicoLandingLayout";
import { MontagemPoliticaBlocos } from "@/components/servico/MontagemPoliticaBlocos";
import { MontagemComoFunciona } from "@/components/servico/MontagemComoFunciona";
import { MontagemWizard } from "@/components/servico/MontagemWizard";
import { WorkstationSection } from "@/components/servico/WorkstationSection";
import { SuporteModalidadesSection } from "@/components/servico/SuporteModalidadesSection";
import { SERVICOS_CORE } from "@/lib/servicosCore";
import { SERVICOS_LOCAL } from "@/lib/servicosLocal";
import { siteConfig } from "@/lib/siteConfig";


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
    slug === "suporte-tecnico-empresarial" ? (
      <SuporteModalidadesSection />
    ) : slug === "montagem-de-pc" ? (
      <>
        <WorkstationSection />
        <MontagemPoliticaBlocos />
        <MontagemComoFunciona />
        <MontagemWizard />
      </>
    ) : undefined;

  // Rodada 3P — piloto visual de serviço (manutenção de notebook).
  const piloto =
    slug === "manutencao-de-notebook"
      ? {
          resumo: [
            { label: "Atendimento", value: "Domicílio, coleta e entrega ou remoto" },
            { label: "Região", value: "Curitiba e Região Metropolitana" },
            { label: "Diagnóstico", value: `A partir de ${siteConfig.minPriceLabel}` },
            { label: "Aprovação", value: "Valor informado antes de qualquer reparo" },
          ],
          toc: [
            { id: "incluso", label: "O que está incluso" },
            { id: "quando-chamar", label: "Quando chamar o técnico" },
            { id: "como-funciona", label: "Como funciona o atendimento" },
            { id: "fatores-valor", label: "O que influencia o valor" },
            { id: "faq", label: "Perguntas frequentes" },
          ],
        }
      : {};

  // Rodada 3Q — propagação controlada do padrão visual para as seis
  // páginas comerciais do escopo. Cada slug tem resumo, sumário, caixas
  // e CTA intermediário próprios (nenhum conteúdo editorial alterado).
  const visual = visualDoServico(slug as string);
  const visual3q = visual
    ? {
        resumo: visual.resumo,
        toc: visual.toc,
        confianca: true,
        caixas: visual.caixas,
        caixasTitulo: visual.caixasTitulo,
        caixasPosicao: visual.caixasPosicao,
        ctaIntermediario: visual.ctaIntermediario,
      }
    : {};

  return <ServicoLandingLayout data={{ ...data, ...piloto, ...visual3q, extra }} />;
};



export default ServicoCore;
