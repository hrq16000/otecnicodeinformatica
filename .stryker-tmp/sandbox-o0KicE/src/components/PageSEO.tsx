// @ts-nocheck
import { useEffect, useMemo } from "react";
import { withOgVersion } from "@/lib/ogCacheBust";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { upsertCanonical } from "@/lib/canonicalUrl";
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
    // Canonical só é emitido quando existe domínio próprio publicável.
    if (INDEXING_ENABLED) upsertCanonical(url);
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: robotsContent(noindex),
    });

  }, [description, noindex, ogType, title, url, versionedOg]);

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

  return null;
};
