// Per-city OG and hero image mapping for /arrumar-pc/:cidade pages.
// Uses Vite's eager glob so we get hashed asset URLs without 40 explicit imports.

const ogModules = import.meta.glob("@/assets/og-arrumar-pc-*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const heroModules = import.meta.glob("@/assets/hero-arrumar-pc-*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function bySlug(modules: Record<string, string>, prefix: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const [path, url] of Object.entries(modules)) {
    const file = path.split("/").pop() ?? "";
    const slug = file.replace(prefix, "").replace(/\.jpg$/, "");
    if (slug) map[slug] = url;
  }
  return map;
}

const ogBySlug = bySlug(ogModules, "og-arrumar-pc-");
const heroBySlug = bySlug(heroModules, "hero-arrumar-pc-");

import ogFallback from "@/assets/og-arrumar-pc-brasil.jpg";

export function getCityOgImage(slug: string): string {
  return ogBySlug[slug] ?? ogFallback;
}

export function getCityHeroImage(slug: string): string | undefined {
  return heroBySlug[slug];
}
