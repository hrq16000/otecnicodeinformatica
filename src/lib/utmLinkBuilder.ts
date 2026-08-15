/**
 * RODADA 8C — LINK BUILDER DE AQUISIÇÃO (fonte única dos links rastreáveis)
 * -------------------------------------------------------------------------
 * Gera URLs de campanha obedecendo `docs/governanca-utm.md` e a taxonomia de
 * `src/lib/canalAtribuicao.ts`. Não cria segunda convenção.
 *
 * Regras (validadas pelo gate `check:utm-governance`):
 *   • destino precisa ser caminho interno absoluto (`/algo`), sem esquema,
 *     sem `javascript:`, sem host externo e sem query própria;
 *   • valores de UTM são sanitizados: minúsculas, [a-z0-9_-], até 64 chars;
 *   • UTM nunca pode carregar PII (e-mail, telefone, documento);
 *   • `internal`/QA não são presets de aquisição — continuam fora daqui;
 *   • nenhuma UTM entra em canonical, sitemap ou href interno permanente.
 */
import { BASE_URL } from "@/lib/config/domain";

export type PresetAquisicao = {
  id: string;
  label: string;
  descricao: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  /** Destino sugerido — o operador pode trocar por outra rota interna real. */
  destinoSugerido: string;
  /** Exige `utm_content` (ex.: tema do post). */
  exigeContent?: boolean;
};

/** Campanhas canônicas desta rodada. Sem datas nem strings aleatórias. */
export const PRESETS_AQUISICAO: PresetAquisicao[] = [
  {
    id: "gbp_profile",
    label: "Google Business Profile — link do perfil",
    descricao:
      "Link principal do perfil. Deve apontar para landing local ampla, nunca para uma página de serviço muito específica.",
    utm_source: "google",
    utm_medium: "organic_gbp",
    utm_campaign: "gbp_profile",
    destinoSugerido: "/tecnico-informatica-curitiba",
  },
  {
    id: "gbp_post",
    label: "Google Business Profile — post",
    descricao: "Post individual do perfil. O tema vai em utm_content (slug curto).",
    utm_source: "google",
    utm_medium: "organic_gbp",
    utm_campaign: "gbp_post",
    destinoSugerido: "/problemas/computador-lento",
    exigeContent: true,
  },

  {
    id: "facebook_organic",
    label: "Facebook orgânico",
    descricao: "Publicações orgânicas da página. Classifica como social, não como search.",
    utm_source: "facebook",
    utm_medium: "organic",
    utm_campaign: "facebook_organic",
    destinoSugerido: "/",
  },
  {
    id: "instagram_organic",
    label: "Instagram orgânico",
    descricao: "Bio e stories. Para intenção vaga, o destino natural é /diagnostico-tecnico.",
    utm_source: "instagram",
    utm_medium: "organic",
    utm_campaign: "instagram_organic",
    destinoSugerido: "/diagnostico-tecnico",
  },
  {
    id: "whatsapp_profile",
    label: "WhatsApp Business — perfil → site",
    descricao:
      "Jornada WhatsApp → site (não confundir com site → WhatsApp, que é CTA interno).",
    utm_source: "whatsapp",
    utm_medium: "organic",
    utm_campaign: "whatsapp_profile",
    destinoSugerido: "/",
  },
  {
    id: "offline_qr",
    label: "Offline / QR rastreável",
    descricao: "Adesivo, cartão ou etiqueta de OS. utm_content identifica a peça.",
    utm_source: "offline",
    utm_medium: "qr",
    utm_campaign: "offline_qr",
    destinoSugerido: "/",
    exigeContent: true,
  },
];

/** Presets proibidos como aquisição — checagem explícita para o gate. */
export const VALORES_PROIBIDOS_SOURCE = ["site", "interno", "internal", "ci", "ga4ci", "qa", "test", "e2e"];

const PII = [
  /[\w.+-]+@[\w-]+\.[\w.]+/, // e-mail
  /\b\d{8,}\b/, // telefone/documento
  /\bcpf\b|\bcnpj\b/i,
];

export type ResultadoValidacao = { ok: boolean; erro?: string };

export function validarDestino(destino: string): ResultadoValidacao {
  const valor = (destino || "").trim();
  if (!valor.startsWith("/")) return { ok: false, erro: "O destino precisa ser um caminho interno começando com /." };
  if (valor.startsWith("//")) return { ok: false, erro: "Caminho protocol-relative não é permitido." };
  if (/^\s*(javascript|data|vbscript|mailto|tel):/i.test(valor))
    return { ok: false, erro: "Esquemas customizados não são aceitos." };
  if (/[?#]/.test(valor)) return { ok: false, erro: "Informe apenas o caminho canônico, sem query nem âncora." };
  if (/[<>"'`\s]/.test(valor)) return { ok: false, erro: "O caminho contém caracteres inválidos." };
  return { ok: true };
}

export function sanitizarValorUtm(valor: string): string {
  return (valor || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

export function validarValorUtm(campo: string, valor: string): ResultadoValidacao {
  const bruto = (valor || "").trim();
  if (!bruto) return { ok: false, erro: `${campo} é obrigatório.` };
  if (bruto.length > 64) return { ok: false, erro: `${campo} excede 64 caracteres.` };
  if (PII.some((r) => r.test(bruto))) return { ok: false, erro: `${campo} não pode conter dado pessoal.` };
  if (sanitizarValorUtm(bruto) !== bruto.toLowerCase())
    return { ok: false, erro: `${campo} deve usar apenas letras minúsculas, números, hífen e underscore.` };
  return { ok: true };
}

export type EntradaLink = {
  destino: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content?: string;
};

export type SaidaLink = { ok: boolean; url?: string; erro?: string };

/** Monta a URL final de campanha. Fail-closed: erro claro em vez de link torto. */
export function construirLinkAquisicao(entrada: EntradaLink, base = BASE_URL): SaidaLink {
  const destino = validarDestino(entrada.destino);
  if (!destino.ok) return { ok: false, erro: destino.erro ?? "Destino inválido." };

  const campos: [string, string | undefined][] = [
    ["utm_source", entrada.utm_source],
    ["utm_medium", entrada.utm_medium],
    ["utm_campaign", entrada.utm_campaign],
  ];
  if (entrada.utm_content) campos.push(["utm_content", entrada.utm_content]);

  for (const [campo, valor] of campos) {
    const v = validarValorUtm(campo, valor ?? "");
    if (!v.ok) return { ok: false, erro: v.erro ?? `${campo} inválido.` };
  }

  if (VALORES_PROIBIDOS_SOURCE.includes(entrada.utm_source.trim().toLowerCase()))
    return {
      ok: false,
      erro: "utm_source interno/QA não pode ser usado em campanha de aquisição.",
    };

  let url: URL;
  try {
    url = new URL(entrada.destino, base || "https://otecnicodeinformatica.com.br");
  } catch {
    return { ok: false, erro: "Não foi possível montar a URL final." };
  }
  for (const [campo, valor] of campos) if (valor) url.searchParams.set(campo, valor.trim().toLowerCase());
  return { ok: true, url: url.toString() };
}
