import { useMemo } from "react";
import { withOgVersion } from "@/lib/ogCacheBust";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { BRAND_NAME, BRAND_OG_PATH, SITE_BASE_URL } from "@/lib/siteConfig";
import { INDEXING_ENABLED, robotsContent } from "@/lib/indexingPolicy";

const SITE_NAME = BRAND_NAME;
// Vazio quando não há domínio configurado → URLs relativas, nunca o domínio herdado.
const BASE_URL = SITE_BASE_URL;
const DEFAULT_OG_IMAGE = `${SITE_BASE_URL}${BRAND_OG_PATH}`;

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile" | "product";
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
}

/**
 * Metadados da rota renderizados em JSX (React 19 içar para o <head>), o que
 * garante presença no HTML do SSR — crawlers não dependem mais de JS.
 * O `__root` não declara title/description/robots/og:title/og:description
 * justamente para não duplicar o que esta camada emite por página.
 */
export const PageSEO = ({
  title,
  description,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  breadcrumbs,
}: PageSEOProps) => {
  const url = `${BASE_URL}${path}`;
  const versionedOg = withOgVersion(ogImage);

  // BreadcrumbList: slot único e determinístico (chave estável `breadcrumb`).
  const breadcrumbSchema = useMemo(() => {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${BASE_URL}${item.path}`,
      })),
    };
  }, [breadcrumbs, url]);
  useJsonLdSlot(SCHEMA_SLOTS.breadcrumb, breadcrumbSchema, SLOT_PRIORITY.page);

  // WebPage base de toda rota: garante a entidade no HTML do SSR mesmo quando
  // a página só declara Service/FAQ. Prioridade `component` para que páginas
  // com WebPage próprio (prioridade `page`) continuem vencendo.
  const webPageSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: "pt-BR",
      // Referência pura ao nó WebSite global (definir @type/name aqui
      // criaria uma segunda definição do mesmo @id).
      isPartOf: { "@id": `${BASE_URL}/#website` },
      ...(breadcrumbs && breadcrumbs.length > 0
        ? { breadcrumb: { "@id": `${url}#breadcrumb` } }
        : {}),
    }),
    [url, title, description, breadcrumbs],
  );
  useJsonLdSlot(SCHEMA_SLOTS.webPage, webPageSchema, SLOT_PRIORITY.component);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent(noindex)} />
      {INDEXING_ENABLED && url ? (
        <link rel="canonical" href={url} data-canonical-owner="managed" />
      ) : null}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={versionedOg} />
      <meta property="og:image:secure_url" content={versionedOg} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={versionedOg} />
    </>
  );
};
