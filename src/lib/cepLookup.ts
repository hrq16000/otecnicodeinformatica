/**
 * Consulta de CEP (ViaCEP) — usada apenas para pré-preencher bairro e cidade
 * no funil. Regra do projeto: se não houver confiança, não exibe nada.
 * Nunca bloqueia o envio; é conveniência, não obrigação.
 */
import { setGeoFromUser } from "@/lib/geoContext";

export interface CepResult {
  cep: string;
  city: string;
  neighborhood?: string;
  region?: string;
  street?: string;
}

export const onlyDigits = (v: string) => v.replace(/\D+/g, "");

export function isValidCep(v: string): boolean {
  return onlyDigits(v).length === 8;
}

export function formatCep(v: string): string {
  const d = onlyDigits(v).slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}

const cache = new Map<string, CepResult | null>();

export async function lookupCep(input: string): Promise<CepResult | null> {
  const cep = onlyDigits(input);
  if (cep.length !== 8) return null;
  if (cache.has(cep)) return cache.get(cep) ?? null;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 4000);
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: ctrl.signal });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      erro?: boolean | string;
      localidade?: string;
      bairro?: string;
      uf?: string;
      logradouro?: string;
    };
    if (data?.erro || !data?.localidade) {
      cache.set(cep, null);
      return null;
    }
    const out: CepResult = {
      cep: formatCep(cep),
      city: data.localidade,
      neighborhood: data.bairro || undefined,
      region: data.uf || undefined,
      street: data.logradouro || undefined,
    };
    cache.set(cep, out);
    // Persiste no contexto geográfico: a mensagem do WhatsApp passa a sair
    // com o local correto mesmo se o visitante navegar para outra página.
    setGeoFromUser({
      city: out.city,
      neighborhood: out.neighborhood,
      region: out.region,
      source: "cep",
    });
    return out;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Texto pronto para o campo "Bairro e cidade". */
export function cepToLocalidade(r: CepResult): string {
  return r.neighborhood ? `${r.neighborhood}, ${r.city}` : r.city;
}
