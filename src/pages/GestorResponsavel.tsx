import { PageSEO } from "@/components/PageSEO";
import { FastHeader } from "@/components/FastHeader";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { GestorResponsavelSection } from "@/components/GestorResponsavelSection";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { useValidatedJsonLd } from "@/lib/schemaValidation";
import { GESTOR, hasPersonAuthority } from "@/lib/gestorResponsavel";
import { siteConfig, absoluteUrl } from "@/lib/siteConfig";
import { ClusterLinks } from "@/components/ClusterLinks";

const PATH = "/gestor-responsavel";

const GestorResponsavelPage = () => {
  const pessoal = hasPersonAuthority();

  const schema = pessoal
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${siteConfig.baseUrl}${PATH}#person`,
        name: GESTOR.nome,
        jobTitle: GESTOR.cargo,
        description: GESTOR.bio[0],
        url: absoluteUrl(PATH),
        worksFor: { "@id": `${siteConfig.baseUrl}/#organization` },
        areaServed: GESTOR.areaAtuacao.map((name) => ({ "@type": "City", name })),
        knowsAbout: GESTOR.escopoTecnico,
        ...(GESTOR.certificacoes.length
          ? {
              hasCredential: GESTOR.certificacoes.map((c) => ({
                "@type": "EducationalOccupationalCredential",
                name: c.nome,
                credentialCategory: "certification",
                recognizedBy: { "@type": "Organization", name: c.emissor },
                ...(c.url ? { url: c.url } : {}),
              })),
            }
          : {}),
        ...(GESTOR.sameAs.length ? { sameAs: GESTOR.sameAs } : {}),
      }
    : null;

  useValidatedJsonLd("ld-gestor-person", schema);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Responsável técnico | O Técnico de Informática"
        description={`Quem responde tecnicamente pelos atendimentos: ${siteConfig.brandName}${siteConfig.foundedYear ? `, atuação em informática desde ${siteConfig.foundedYear}` : ""}. Escopo, área de atuação e critérios de diagnóstico.`}
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Responsável técnico", path: PATH },
        ]}
      />
      <LocalBusinessJsonLd
        scriptId="ld-localbusiness-gestor"
        path={PATH}
        description={`Responsabilidade técnica do ${siteConfig.brandName}${siteConfig.foundedYear ? ` desde ${siteConfig.foundedYear}` : ""}.`}
      />
      <FastHeader />
      <div aria-hidden="true" className="h-[var(--site-header-space)]" />

      <main>
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumbs items={[{ label: "Responsável técnico" }]} />
          <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">
            Responsável técnico pelos atendimentos em Curitiba
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Transparência sobre quem executa e responde pelos serviços: entidade legal,
            tempo de atuação, escopo técnico coberto e a região efetivamente atendida.
            Nada aqui é estimativa de marketing — é o critério real usado na triagem.
          </p>
        </div>

        <GestorResponsavelSection />

        <ClusterLinks
          titulo="Explore o atendimento por modalidade, serviço e região"
          categoria="Suporte técnico"
        />
      </main>

      <Footer />
    </div>
  );
};

export default GestorResponsavelPage;
