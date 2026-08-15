// ── GEOGRAFIA ────────────────────────────────────────────────
// Posicionamento inicial: Curitiba, São José dos Pinhais e Região
// Metropolitana. A estrutura é preparada para novas cidades — nenhum
// componente deve assumir Curitiba de forma permanente.
import { envList, envNum, envStr } from "./env";

export interface CityConfig {
  name: string;
  slug: string;
  uf: string;
  /** Cidade-âncora do posicionamento atual. */
  primary?: boolean;
}

export const PRIMARY_CITY = envStr("VITE_PRIMARY_CITY") ?? "Curitiba";
export const PRIMARY_STATE = envStr("VITE_PRIMARY_STATE") ?? "Paraná";
export const PRIMARY_UF = envStr("VITE_REGION_UF") ?? envStr("VITE_REGION") ?? "PR";
export const COUNTRY = "BR";

export const CITIES: CityConfig[] = [
  { name: "Curitiba", slug: "curitiba", uf: "PR", primary: true },
  { name: "São José dos Pinhais", slug: "sao-jose-pinhais", uf: "PR", primary: true },
];

/** Área atendida declarada (usada em schemas e copy institucional). */
export const SERVICE_AREA: string[] = (() => {
  const fromEnv = envList("VITE_SERVICE_AREA");
  if (fromEnv.length) return fromEnv;
  return ["Curitiba", "São José dos Pinhais", "Região Metropolitana de Curitiba"];
})();

const lat = envNum("VITE_GEO_LAT");
const lng = envNum("VITE_GEO_LNG");
/** Coordenadas só existem se forem da operação real (env). */
export const GEO_COORDS =
  lat !== undefined && lng !== undefined ? { lat, lng } : undefined;

export const geographyConfig = {
  primaryCity: PRIMARY_CITY,
  primaryState: PRIMARY_STATE,
  primaryUF: PRIMARY_UF,
  country: COUNTRY,
  cities: CITIES,
  serviceArea: SERVICE_AREA,
  geo: GEO_COORDS,
} as const;

export default geographyConfig;
