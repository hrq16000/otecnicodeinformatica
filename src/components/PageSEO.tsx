import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { withOgVersion } from "@/lib/ogCacheBust";

const SITE_NAME = "Técnico Curitiba";
const BASE_URL = "https://tecnicocuritiba.com.br";
const DEFAULT_OG_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/El3gITL9bldQ7WZaPszZm8jw8DX2/social-images/social-1775439639319-110201.webp";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
}

export const PageSEO = ({
  title,
  description,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  breadcrumbs,
}: PageSEOProps) => {
  const url = `${BASE_URL}${path}`;
  const versionedOg = withOgVersion(ogImage);

  // Inject BreadcrumbList structured data
  useEffect(() => {
    if (!breadcrumbs || breadcrumbs.length === 0) return;
    const existing = document.querySelectorAll('script[data-breadcrumb-schema="true"]');
    existing.forEach(s => s.remove());

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `${BASE_URL}${item.path}`
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb-schema', 'true');
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.querySelectorAll('script[data-breadcrumb-schema="true"]').forEach(s => s.remove());
    };
  }, [breadcrumbs]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.png" type="image/png" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={versionedOg} />
      <meta property="og:image:secure_url" content={versionedOg} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={versionedOg} />
    </Helmet>
  );
};
