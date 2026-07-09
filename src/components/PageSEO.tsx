import { useEffect } from "react";
import { withOgVersion } from "@/lib/ogCacheBust";

const SITE_NAME = "Técnico Curitiba";
const BASE_URL = "https://tecnico.curitiba.br";
const DEFAULT_OG_IMAGE = "https://tecnico.curitiba.br/og-image.png";

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

  useEffect(() => {
    document.title = title;
    const upsertMeta = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value));
    };
    const upsertLink = (rel: string, href: string) => {
      let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: ogType });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "pt_BR" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: versionedOg });
    upsertMeta('meta[property="og:image:secure_url"]', { property: "og:image:secure_url", content: versionedOg });
    upsertMeta('meta[property="og:image:width"]', { property: "og:image:width", content: "1200" });
    upsertMeta('meta[property="og:image:height"]', { property: "og:image:height", content: "630" });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: versionedOg });
    upsertLink("canonical", url);
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex ? "noindex, nofollow" : "index, follow",
    });
  }, [description, noindex, ogType, title, url, versionedOg]);

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

  return null;
};
