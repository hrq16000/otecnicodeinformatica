import { Helmet } from "react-helmet";

const SITE = "https://tecnicocuritiba.com.br";

interface SeoHeadProps {
  title: string;
  description: string;
  /** Caminho da rota (ex: "/servicos"). Vira canonical e og:url. */
  path: string;
  /** og:image opcional (URL absoluta). */
  image?: string;
  type?: "website" | "article";
  /** Use noindex para páginas que não devem ser indexadas. */
  noindex?: boolean;
}

/**
 * Cabeçalho SEO leve para rotas internas.
 * - canonical e og:url sempre apontam para a própria URL.
 * - Reaproveita meta description no og:description / twitter.
 */
export const SeoHead = ({
  title,
  description,
  path,
  image,
  type = "website",
  noindex,
}: SeoHeadProps) => {
  const url = `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}
    </Helmet>
  );
};
