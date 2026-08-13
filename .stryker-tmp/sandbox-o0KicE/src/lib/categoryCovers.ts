/**
 * Premium category covers (1200x630) generated for the Curitiba brand
 * (deep blue + orange). Each file uses a content hash for cache-busting.
 *
 * Returns the responsive variants when available, or null for slugs that
 * don't match a tutorial category.
 */
// @ts-nocheck


type CategoryKey = "windows" | "celular" | "wifi";

const COVERS: Record<CategoryKey, { src: string; srcSet: string }> = {
  windows: {
    src: "/lovable-uploads/cover-windows-curitiba.8f6a333b.jpg",
    srcSet: [
      "/lovable-uploads/cover-windows-curitiba.8f6a333b-400.webp 400w",
      "/lovable-uploads/cover-windows-curitiba.8f6a333b-800.webp 800w",
      "/lovable-uploads/cover-windows-curitiba.8f6a333b-1200.webp 1200w",
    ].join(", "),
  },
  celular: {
    src: "/lovable-uploads/cover-celular-curitiba.373a7302.jpg",
    srcSet: [
      "/lovable-uploads/cover-celular-curitiba.373a7302-400.webp 400w",
      "/lovable-uploads/cover-celular-curitiba.373a7302-800.webp 800w",
      "/lovable-uploads/cover-celular-curitiba.373a7302-1200.webp 1200w",
    ].join(", "),
  },
  wifi: {
    src: "/lovable-uploads/cover-wifi-curitiba.fdcb2d89.jpg",
    srcSet: [
      "/lovable-uploads/cover-wifi-curitiba.fdcb2d89-400.webp 400w",
      "/lovable-uploads/cover-wifi-curitiba.fdcb2d89-800.webp 800w",
      "/lovable-uploads/cover-wifi-curitiba.fdcb2d89-1200.webp 1200w",
    ].join(", "),
  },
};

/** Map a blog slug to one of the three home-tutorial category keys. */
export function detectCategoryFromSlug(slug: string): CategoryKey | null {
  const s = slug.toLowerCase();
  if (s.includes("wifi") || s.includes("wi-fi") || s.includes("roteador") || s.includes("repetidor") || s.includes("internet")) return "wifi";
  if (s.includes("celular") || s.includes("android") || s.includes("iphone") || s.includes("bateria") || s.includes("google-fotos") || s.includes("aplicativos-celular") || s.includes("conta-google") || s.includes("print-tela-celular") || s.includes("transferir-dados-celular") || s.includes("bloquear-numero")) return "celular";
  if (s.includes("windows")) return "windows";
  return null;
}

export function getCategoryCover(slug: string) {
  const key = detectCategoryFromSlug(slug);
  return key ? COVERS[key] : null;
}
