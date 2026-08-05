// ─────────────────────────────────────────────────────────────
// GEO CONTEXTO (uso interno)
// 1) Aproximação por IP (cidade/UF) logo no carregamento.
// 2) Após 3s, pede localização precisa e refina cidade + bairro.
// Regra: se não houver confiança, NÃO exibir nada. Melhor ocultar
// do que errar. O valor é usado apenas para pré-sugerir campos.
// ─────────────────────────────────────────────────────────────

export interface GeoContext {
  city?: string;
  region?: string;
  neighborhood?: string;
  /** "ip" = aproximado pela operadora; "precise" = GPS/navegador */
  source: "ip" | "precise";
  at: number;
}

const KEY = "__geo_ctx__";
const TTL = 1000 * 60 * 60 * 6; // 6h

let current: GeoContext | null = null;
const listeners = new Set<(g: GeoContext | null) => void>();

function read(): GeoContext | null {
  if (current) return current;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GeoContext;
    if (!parsed?.at || Date.now() - parsed.at > TTL) return null;
    current = parsed;
    return parsed;
  } catch {
    return null;
  }
}

function write(next: GeoContext) {
  const prev = read();
  // Nunca rebaixa precisão: "precise" prevalece sobre "ip".
  if (prev?.source === "precise" && next.source === "ip") return;
  current = next;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* noop */
  }
  listeners.forEach((fn) => fn(next));
}

export function getGeoContext(): GeoContext | null {
  return read();
}

export function subscribeGeo(fn: (g: GeoContext | null) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Sugestão pronta para pré-preencher "Bairro e cidade". Vazio se incerto. */
export function geoSuggestion(): string {
  const g = read();
  if (!g?.city) return "";
  return g.neighborhood ? `${g.neighborhood}, ${g.city}` : g.city;
}

const withTimeout = (ms: number) => {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  return { signal: ctrl.signal, done: () => clearTimeout(id) };
};

/** Aproximação por IP/operadora — silenciosa, sem bloquear render. */
export async function detectByIp(): Promise<GeoContext | null> {
  if (read()) return read();
  const t = withTimeout(3500);
  try {
    const res = await fetch("https://ipwho.is/?fields=city,region,success", { signal: t.signal });
    if (!res.ok) return null;
    const data = (await res.json()) as { success?: boolean; city?: string; region?: string };
    if (!data?.success || !data.city) return null;
    const next: GeoContext = { city: data.city, region: data.region, source: "ip", at: Date.now() };
    write(next);
    return next;
  } catch {
    return null;
  } finally {
    t.done();
  }
}

/** Reverse geocode sem chave (BigDataCloud) — cidade + bairro/localidade. */
async function reverseGeocode(lat: number, lng: number): Promise<GeoContext | null> {
  const t = withTimeout(4000);
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=pt`;
    const res = await fetch(url, { signal: t.signal });
    if (!res.ok) return null;
    const d = (await res.json()) as {
      city?: string;
      locality?: string;
      principalSubdivisionCode?: string;
      localityInfo?: { administrative?: { name?: string; adminLevel?: number }[] };
    };
    const city = d.city || d.localityInfo?.administrative?.find((a) => a.adminLevel === 8)?.name;
    if (!city) return null;
    const neighborhood = d.locality && d.locality !== city ? d.locality : undefined;
    return {
      city,
      region: d.principalSubdivisionCode?.replace("BR-", ""),
      neighborhood,
      source: "precise",
      at: Date.now(),
    };
  } catch {
    return null;
  } finally {
    t.done();
  }
}

/** Pede localização precisa (só se ainda não houver permissão negada). */
export async function requestPreciseLocation(): Promise<GeoContext | null> {
  if (typeof navigator === "undefined" || !navigator.geolocation) return null;
  if (read()?.source === "precise") return read();
  try {
    const perm = await navigator.permissions?.query({ name: "geolocation" as PermissionName });
    if (perm?.state === "denied") return null;
  } catch {
    /* Permissions API indisponível: segue e deixa o browser decidir */
  }

  const pos = await new Promise<GeolocationPosition | null>((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (p) => resolve(p),
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 1000 * 60 * 30 },
    );
  });
  if (!pos) return null;

  const geo = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
  if (geo) write(geo);
  return geo;
}
