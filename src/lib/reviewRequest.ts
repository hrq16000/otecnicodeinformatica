/**
 * Pipeline WhatsApp T+24h / T+72h — custo zero (wa.me manual via admin).
 *
 * Fluxo:
 *  1) Atendimento fechado no admin → operador abre /admin/reviews
 *  2) Em T+24h: clica "Pedir review (24h)" → abre wa.me com mensagem 1
 *  3) Em T+72h (se ainda não chegou review): clica "Lembrete (72h)" → mensagem 2
 *  4) Cliente clica no link mágico do Google e publica a avaliação
 *  5) Admin importa a review verificada em /admin/reviews
 *
 * Sem Twilio/GatewayAPI = sem custo recorrente e sem opt-in regulatório.
 */

const WHATSAPP_NUMBER = "5541997086380";

/**
 * Link mágico do Google que abre direto a tela "Escrever avaliação".
 * Substitua PLACE_ID pelo Place ID real do Google Business Profile.
 *
 * Como obter: https://developers.google.com/maps/documentation/places/web-service/place-id
 * Ou via GMB: Painel → Compartilhar → "Receba mais avaliações" copia link já no formato g.page/r/.../review
 */
export const GOOGLE_REVIEW_URL =
  "https://g.page/r/CQ_TECNICO_CURITIBA_PLACE_ID/review";

export interface ReviewRequestContext {
  clientName: string;
  service?: string; // ex.: "formatação de notebook"
  neighborhood?: string; // ex.: "Batel"
  technicianName?: string; // ex.: "Anderson"
}

const firstName = (name: string) => name.trim().split(/\s+/)[0] ?? name;

/** Mensagem T+24h — pedido inicial, leve e personalizado. */
export const buildT24Message = (ctx: ReviewRequestContext): string => {
  const nome = firstName(ctx.clientName);
  const servico = ctx.service ? ` na ${ctx.service}` : "";
  const bairro = ctx.neighborhood ? ` no ${ctx.neighborhood}` : "";
  const tech = ctx.technicianName ? `, do time do ${ctx.technicianName},` : "";
  return (
    `Olá, ${nome}! Aqui é da Técnico Curitiba${tech} tudo certo${servico}${bairro}? ` +
    `Se ficou satisfeito com o atendimento, sua avaliação no Google ajuda muito ` +
    `outros moradores a encontrarem ajuda confiável. ` +
    `É 1 minutinho aqui ó: ${GOOGLE_REVIEW_URL} 🙏\n\n` +
    `Qualquer ajuste ou dúvida, é só responder esta mensagem.`
  );
};

/** Mensagem T+72h — lembrete educado, valor + reciprocidade. */
export const buildT72Message = (ctx: ReviewRequestContext): string => {
  const nome = firstName(ctx.clientName);
  return (
    `Oi ${nome}! Passando rapidinho 😊 ` +
    `Sei que a rotina aperta, mas se sobrou 1 minuto e o serviço ficou bom, ` +
    `essa avaliação no Google faz uma diferença enorme para um negócio local ` +
    `como o nosso aqui em Curitiba: ${GOOGLE_REVIEW_URL}\n\n` +
    `Se preferir, pode também responder aqui mesmo no WhatsApp com uma nota de 1 a 5 ` +
    `que eu publico com seu primeiro nome (sem expor telefone). Obrigado! 🚀`
  );
};

/** Monta a URL wa.me com a mensagem já encodada. */
export const buildWaMeUrl = (phoneE164: string, message: string): string => {
  const phone = phoneE164.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

/** Helpers para uso direto em botões do admin. */
export const t24WaLink = (phone: string, ctx: ReviewRequestContext) =>
  buildWaMeUrl(phone, buildT24Message(ctx));

export const t72WaLink = (phone: string, ctx: ReviewRequestContext) =>
  buildWaMeUrl(phone, buildT72Message(ctx));

/** Verifica se passaram >= N horas desde uma data ISO. */
export const hoursSince = (isoDate: string): number =>
  (Date.now() - new Date(isoDate).getTime()) / 36e5;

/** Classificação de janela: pronto-para-T24, pronto-para-T72 ou aguardar. */
export const reviewWindow = (
  serviceClosedAt: string,
): "wait" | "t24" | "t72" | "expired" => {
  const h = hoursSince(serviceClosedAt);
  if (h < 24) return "wait";
  if (h < 72) return "t24";
  if (h < 168) return "t72"; // até 7 dias
  return "expired";
};

// ============================================================
// Avaliação no próprio site (link rastreável pós-Ordem de Serviço)
// ============================================================

const SITE_ORIGIN = "https://tecnico.curitiba.br";

/** URL da página de avaliação com UTM + protocolo da OS. */
export const buildOnsiteReviewUrl = (params: {
  protocolo?: string;
  servico?: string;
  bairro?: string;
  origin?: string;
}): string => {
  const q = new URLSearchParams({
    utm_source: "whatsapp",
    utm_medium: "pos_atendimento",
    utm_campaign: "avaliacao_estrelas",
  });
  if (params.protocolo) q.set("os", params.protocolo);
  if (params.servico) q.set("servico", params.servico);
  if (params.bairro) q.set("bairro", params.bairro);
  return `${params.origin ?? SITE_ORIGIN}/avaliar?${q.toString()}`;
};

/**
 * Mensagem enviada logo após o fechamento do atendimento/OS:
 * pede a avaliação com estrelas e explica a autorização de publicação.
 */
export const buildOsFollowUpMessage = (params: {
  clientName?: string;
  protocolo?: string;
  servico?: string;
  bairro?: string;
}): string => {
  const nome = params.clientName ? firstName(params.clientName) : "tudo bem";
  const os = params.protocolo ? ` (OS ${params.protocolo})` : "";
  const link = buildOnsiteReviewUrl({
    protocolo: params.protocolo,
    servico: params.servico,
    bairro: params.bairro,
  });
  return (
    `Olá, ${nome}! Atendimento finalizado${os}. ` +
    `Se puder, deixe sua avaliação com estrelas em 1 minuto: ${link}\n\n` +
    `No formulário você marca se autoriza (ou não) a publicação do comentário no site. ` +
    `Sem autorização, a avaliação fica só como feedback interno.`
  );
};

export const osFollowUpWaLink = (
  phone: string,
  params: Parameters<typeof buildOsFollowUpMessage>[0],
) => buildWaMeUrl(phone, buildOsFollowUpMessage(params));
