// Versioning for og:image URLs. Bump OG_VERSION whenever any social cover
// is replaced so Facebook/X/LinkedIn refetch a fresh preview.
// Files with content hashes in their filename invalidate automatically;
// this helper handles the remaining static URLs.
export const OG_VERSION = "20260709-1";

export function withOgVersion(url: string | undefined | null): string {
  if (!url) return "";
  // If filename already contains a hash (8+ hex/alnum before extension), skip.
  if (/\.[a-f0-9]{6,}-?\d*\.(webp|jpg|jpeg|png)(\?|$)/i.test(url)) return url;
  try {
    const u = new URL(url, "https://tecnico.curitiba.br");
    if (!u.searchParams.has("v")) u.searchParams.set("v", OG_VERSION);
    return u.toString();
  } catch {
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}v=${OG_VERSION}`;
  }
}
