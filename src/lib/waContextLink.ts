/**
 * Deep links de WhatsApp com contexto de origem e de funil (Rodada 4L).
 *
 * Todo CTA de WhatsApp continua sendo interceptado pelo funil global — o
 * href existe para acessibilidade (link real, abrível por teclado) e para
 * o fallback quando o JS falha. Aqui apenas anexamos parâmetros de leitura:
 *
 *   utm_source   → sempre "site" (ou o utm capturado na entrada)
 *   utm_medium   → superfície do clique (ex.: cta_mobile, cta_inline)
 *   utm_campaign → serviço/rota (ex.: conserto-tv)
 *   utm_content  → posição exata do CTA (ex.: mobile_sticky)
 *   utm_term     → variação de copy do experimento
 *   etapa        → etapa do funil no momento do clique (triagem)
 *   servico      → chave de serviço, para cruzar com click_events
 *
 * Nenhum dado pessoal entra na URL: só rota, posição e variação.
 */
import { whatsappLink } from "./siteConfig";
import { appendUtmsToUrl } from "./utmCapture";

export interface WaContexto {
  /** Superfície: cta_mobile, cta_inline, cta_hero... */
  medium: string;
  /** Serviço/rota — vira utm_campaign. */
  servico: string;
  /** Posição do CTA — vira utm_content. */
  posicao: string;
  /** Variação de copy ativa — vira utm_term. */
  variante?: string;
  /** Etapa do funil no clique. */
  etapa?: "triagem" | "diagnostico" | "aprovacao" | "execucao";
}

export function whatsappLinkComContexto(message: string | undefined, ctx: WaContexto): string {
  const href = whatsappLink(message);
  // Fallback configurado (canal desligado) permanece intocado.
  if (!/^https?:\/\/(wa\.me|api\.whatsapp\.com)/.test(href)) return href;

  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }

  url.searchParams.set("utm_medium", ctx.medium);
  url.searchParams.set("utm_campaign", ctx.servico);
  url.searchParams.set("utm_content", ctx.posicao);
  if (ctx.variante) url.searchParams.set("utm_term", ctx.variante);
  url.searchParams.set("etapa", ctx.etapa ?? "triagem");
  url.searchParams.set("servico", ctx.servico);

  // UTMs reais de campanha (quando o visitante chegou por anúncio) têm
  // precedência: appendUtmsToUrl só preenche o que ainda não existe, então
  // removemos os valores default antes de reaplicar a captura.
  try {
    const capturados = appendUtmsToUrl(new URL(href));
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const v = capturados.searchParams.get(key);
      if (v && v !== "site" && v !== "organic" && !url.searchParams.has(`${key}__site`)) {
        if (key !== "utm_medium" && key !== "utm_content") url.searchParams.set(key, v);
      }
    }
    if (!url.searchParams.get("utm_source")) url.searchParams.set("utm_source", "site");
  } catch {
    url.searchParams.set("utm_source", "site");
  }
  if (!url.searchParams.get("utm_source")) url.searchParams.set("utm_source", "site");

  return url.toString();
}

export default whatsappLinkComContexto;
