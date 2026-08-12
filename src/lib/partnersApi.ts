/**
 * REDE NACIONAL DE PROFISSIONAIS PARCEIROS
 *
 * Camada de acesso aos dados públicos da rede. Regras:
 * - Só existem perfis reais: nada é inventado, nada é "demo".
 * - Páginas locais (estado/cidade) só têm valor quando há parceiro real —
 *   por isso a UI é fail-closed: sem parceiro, não há página indexável.
 * - Parceiro é profissional independente divulgado na plataforma, nunca
 *   apresentado como equipe própria do portal.
 */

import { supabase } from "@/integrations/supabase/client";

export type Partner = {
  id: string;
  slug: string;
  nome_profissional: string;
  foto_url: string | null;
  cidade: string;
  estado: string;
  regioes_atendidas: string[];
  especialidades: string[];
  descricao: string | null;
  servicos: string[];
  experiencia: string | null;
  certificacoes: string[];
  horario: string | null;
  formas_atendimento: string[];
  whatsapp: string | null;
  site_url: string | null;
  redes_sociais: Record<string, string> | null;
};

export type PartnerPhoto = {
  id: string;
  url: string;
  legenda: string | null;
  ordem: number;
};

export type ProgramSettings = {
  preco_anual_centavos: number;
  moeda: string;
  aceitando_cadastros: boolean;
  texto_plano: string | null;
};

const PARTNER_FIELDS =
  "id,slug,nome_profissional,foto_url,cidade,estado,regioes_atendidas,especialidades,descricao,servicos,experiencia,certificacoes,horario,formas_atendimento,whatsapp,site_url,redes_sociais";

export const slugify = (valor: string) =>
  valor
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 100);

export const formatarPreco = (centavos: number, moeda = "BRL") =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: moeda }).format(centavos / 100);

/** Lista parceiros ativos, com filtros opcionais de local e especialidade. */
export async function listPartners(filtros: {
  estado?: string;
  cidade?: string;
  termo?: string;
} = {}): Promise<Partner[]> {
  let query = supabase
    .from("partners")
    .select(PARTNER_FIELDS)
    .eq("status", "ativo")
    .order("nome_profissional", { ascending: true });

  if (filtros.estado) query = query.ilike("estado", filtros.estado.replace(/-/g, " "));
  if (filtros.cidade) query = query.ilike("cidade", filtros.cidade.replace(/-/g, " "));

  const { data, error } = await query;
  if (error || !data) return [];

  const termo = filtros.termo?.trim().toLowerCase();
  const lista = data as unknown as Partner[];
  if (!termo) return lista;

  return lista.filter((p) =>
    [p.nome_profissional, p.cidade, p.estado, ...p.especialidades, ...p.servicos]
      .join(" ")
      .toLowerCase()
      .includes(termo),
  );
}

/** Perfil público — retorna null quando o parceiro não está ativo. */
export async function getPartnerBySlug(slug: string): Promise<Partner | null> {
  const { data, error } = await supabase
    .from("partners")
    .select(PARTNER_FIELDS)
    .eq("slug", slug)
    .eq("status", "ativo")
    .maybeSingle();
  if (error || !data) return null;
  return data as unknown as Partner;
}

export async function getPartnerPhotos(partnerId: string): Promise<PartnerPhoto[]> {
  const { data, error } = await supabase
    .from("partner_photos")
    .select("id,url,legenda,ordem")
    .eq("partner_id", partnerId)
    .order("ordem", { ascending: true });
  if (error || !data) return [];
  return data as PartnerPhoto[];
}

/** Configuração comercial do programa — administrada, nunca hardcoded na UI. */
export async function getProgramSettings(): Promise<ProgramSettings | null> {
  const { data, error } = await supabase
    .from("partner_program_settings")
    .select("preco_anual_centavos,moeda,aceitando_cadastros,texto_plano")
    .maybeSingle();
  if (error || !data) return null;
  return data as ProgramSettings;
}

export type PartnerApplication = {
  nome_profissional: string;
  cidade: string;
  estado: string;
  whatsapp: string;
  documento_tipo: string;
  documento: string;
  especialidades: string[];
  servicos: string[];
  regioes_atendidas: string[];
  formas_atendimento: string[];
  descricao: string;
  experiencia: string;
};

/** Envia cadastro: entra sempre como "aguardando análise" (RLS reforça isso). */
export async function submitPartnerApplication(app: PartnerApplication) {
  const base = slugify(`${app.nome_profissional}-${app.cidade}`);
  const slug = `${base}-${Math.random().toString(36).slice(2, 6)}`;

  return supabase.from("partners").insert({
    ...app,
    slug,
    status: "aguardando_analise" as const,
    aceite_termos_em: new Date().toISOString(),
  });
}
