/**
 * TEMPLATES DE WHATSAPP DO CLUSTER /problemas
 *
 * Objetivo: nenhum clique de WhatsApp sai do cluster de sintomas sem
 *   (a) mensagem pré-preenchida com sintoma, dispositivo, bairro e urgência;
 *   (b) parâmetros de atribuição (rota, sintoma, seção e rolagem) para o
 *       GA4/Google Ads conseguirem separar conversão por contexto.
 *
 * Não entra dado pessoal na URL: só rota, sintoma, seção, rolagem e as
 * escolhas de triagem (dispositivo/urgência), que são categorias, não PII.
 */
import { whatsappLinkComContexto } from "@/lib/waContextLink";
import { sufixoVariante, varianteWa, type VarianteWa } from "@/lib/problemasWaVariants";

export type UrgenciaChave = "hoje" | "72h" | "sem-pressa";

export const DISPOSITIVOS = [
  { chave: "notebook", label: "Notebook" },
  { chave: "desktop", label: "PC de mesa" },
  { chave: "all-in-one", label: "All-in-one" },
  { chave: "rede", label: "Rede / Wi-Fi" },
  { chave: "tv", label: "TV" },
  { chave: "outro", label: "Outro equipamento" },
] as const;

export const URGENCIAS: { chave: UrgenciaChave; label: string; frase: string }[] = [
  { chave: "hoje", label: "Preciso hoje", frase: "Urgência: preciso de atendimento ainda hoje." },
  { chave: "72h", label: "Nas próximas 72h", frase: "Urgência: posso aguardar as próximas 72 horas úteis." },
  { chave: "sem-pressa", label: "Sem pressa", frase: "Urgência: sem pressa, quero primeiro entender o problema." },
];

export interface ContextoTriagem {
  dispositivo?: string;
  bairro?: string;
  urgencia?: UrgenciaChave;
}

export interface ProblemaWaCtx extends ContextoTriagem {
  /** Slug do sintoma (ex.: tela-azul). */
  sintoma: string;
  /** Seção da página onde o CTA foi clicado (ex.: faq). */
  secao: string;
  /** Faixa de rolagem no momento do clique (0, 25, 50, 75, 100). */
  rolagem?: number;
  /** Complemento específico do CTA/pergunta. */
  complemento?: string;
  /** Variante do A/B da mensagem (default: variante persistida do visitante). */
  variante?: VarianteWa;
}

function rotuloDispositivo(chave?: string): string | undefined {
  return DISPOSITIVOS.find((d) => d.chave === chave)?.label;
}

function fraseUrgencia(chave?: UrgenciaChave): string | undefined {
  return URGENCIAS.find((u) => u.chave === chave)?.frase;
}

/** Mensagem pré-preenchida: base do sintoma + campos da triagem rápida. */
export function buildProblemaWaMessage(base: string, ctx: ProblemaWaCtx): string {
  const linhas: string[] = [base.trim()];
  if (ctx.complemento) linhas.push(ctx.complemento.trim());

  const campos: string[] = [];
  const disp = rotuloDispositivo(ctx.dispositivo);
  if (disp) campos.push(`Equipamento: ${disp}`);
  if (ctx.bairro) campos.push(`Bairro/cidade: ${ctx.bairro}`);
  const urg = fraseUrgencia(ctx.urgencia);
  if (urg) campos.push(urg);
  if (campos.length) linhas.push(campos.join("\n"));

  const sufixo = sufixoVariante(ctx.variante ?? varianteWa());
  if (sufixo) linhas.push(sufixo);

  return linhas.filter(Boolean).join("\n\n");
}

/** Link wa.me com mensagem pronta + UTMs e identificadores de atribuição. */
export function buildProblemaWaHref(base: string, ctx: ProblemaWaCtx): string {
  const variante = ctx.variante ?? varianteWa();
  const href = whatsappLinkComContexto(buildProblemaWaMessage(base, { ...ctx, variante }), {
    medium: "cta_problema",
    servico: ctx.sintoma,
    posicao: `problemas_${ctx.secao}`,
    etapa: "triagem",
    variante: `msg_${variante}`,
  });

  if (!/^https?:\/\//.test(href)) return href;
  try {
    const url = new URL(href);
    url.searchParams.set("rota", `/problemas/${ctx.sintoma}`);
    url.searchParams.set("sintoma", ctx.sintoma);
    url.searchParams.set("secao", ctx.secao);
    if (typeof ctx.rolagem === "number") url.searchParams.set("rolagem", String(ctx.rolagem));
    if (ctx.dispositivo) url.searchParams.set("dispositivo", ctx.dispositivo);
    if (ctx.urgencia) url.searchParams.set("urgencia", ctx.urgencia);
    url.searchParams.set("variante", variante);
    return url.toString();
  } catch {
    return href;
  }
}

/**
 * Fallback para quem não tem o app instalado (desktop sem WhatsApp Desktop,
 * navegador sem handler): api.whatsapp.com/send abre o WhatsApp Web com a
 * MESMA mensagem e os MESMOS parâmetros de tracking do link principal.
 */
export function buildProblemaWaFallbackHref(base: string, ctx: ProblemaWaCtx): string {
  const href = buildProblemaWaHref(base, ctx);
  if (!/^https?:\/\/wa\.me\//.test(href)) return href;
  try {
    const url = new URL(href);
    const phone = url.pathname.replace(/^\//, "");
    const web = new URL("https://api.whatsapp.com/send");
    url.searchParams.forEach((v, k) => web.searchParams.set(k, v));
    web.searchParams.set("phone", phone);
    return web.toString();
  } catch {
    return href;
  }
}

/** Rótulo padronizado de evento GA4/Ads: rota + seção + rolagem. */
export function rotuloEvento(ctx: ProblemaWaCtx): string {
  const partes = [`problema_${ctx.sintoma}`, ctx.secao];
  if (typeof ctx.rolagem === "number") partes.push(`scroll${ctx.rolagem}`);
  if (ctx.variante) partes.push(`msg${ctx.variante}`);
  return partes.join("_");
}

