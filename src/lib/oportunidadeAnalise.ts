/**
 * RODADA 6B — ANÁLISE DE OPORTUNIDADE (Expand / Improve / Low evidence)
 * ---------------------------------------------------------------------
 * Classifica recortes (rota, cidade, bairro, serviço, canal) em três estados
 * verificáveis, a partir de eventos comerciais já filtrados de QA:
 *
 *   • expand_candidate → amostra suficiente E taxa de WhatsApp acima do alvo;
 *   • improve_page     → amostra suficiente E taxa abaixo do alvo;
 *   • low_evidence     → amostra insuficiente (nunca vira "campeão").
 *
 * REGRAS
 *   1. Nada de geografia inventada: cidade/bairro/serviço vêm da rota; ausência
 *      é ausência (o recorte simplesmente não é criado).
 *   2. Métrica é por SESSÃO distinta, não por evento (evita duplo clique).
 *   3. Volume acompanha sempre a taxa — recorte minúsculo nunca é destaque.
 *   4. Função pura: serve ao painel, ao CI e ao relatório em Node.
 */
import { canalDoEvento, type Canal } from "./canalAtribuicao";

export type ClasseOportunidade = "expand_candidate" | "improve_page" | "low_evidence";

export const CLASSE_LABEL: Record<ClasseOportunidade, string> = {
  expand_candidate: "Expandir",
  improve_page: "Melhorar página",
  low_evidence: "Evidência baixa",
};

/** Limiares técnicos e documentados (não são significância estatística). */
export const LIMIARES = {
  /** Sessões mínimas para o recorte deixar de ser "evidência baixa". */
  amostraMinima: 30,
  /** Taxa WhatsApp/sessão a partir da qual o recorte é candidato a expansão. */
  taxaAlvoWhatsapp: 0.1,
  /** Sessões a partir das quais a leitura é considerada acionável. */
  amostraAcionavel: 200,
};

export type EventoOportunidade = {
  created_at: string;
  event_type: string;
  path?: string | null;
  session_id?: string | null;
  servico?: string | null;
  neighborhood_slug?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  attribution_channel?: string | null;
};

export type Dimensao = "rota" | "cidade" | "bairro" | "servico" | "canal";

export type RecorteOportunidade = {
  dimensao: Dimensao;
  chave: string;
  sessoes: number;
  cta: number;
  triagem: number;
  whatsapp: number;
  taxaCta: number | null;
  taxaTriagem: number | null;
  taxaWhatsapp: number | null;
  classe: ClasseOportunidade;
  motivo: string;
};

const EVENTOS_CTA = new Set(["cta_click", "wa_funnel_open", "funnel_open"]);
const EVENTOS_TRIAGEM = new Set(["triage_start", "funnel_open", "wa_funnel_step"]);
const EVENTOS_WHATSAPP = new Set(["whatsapp_open", "wa_click", "wa_funnel_submit"]);

type Agregado = {
  sessoes: Set<string>;
  cta: Set<string>;
  triagem: Set<string>;
  whatsapp: Set<string>;
};

const novo = (): Agregado => ({
  sessoes: new Set(),
  cta: new Set(),
  triagem: new Set(),
  whatsapp: new Set(),
});

/** Cidade derivada da rota. Sem fallback — página global não vira Curitiba. */
export function cidadeDaRota(path?: string | null): string | undefined {
  if (!path) return undefined;
  const svc = path.match(/^\/servicos\/[^/]+\/([a-z0-9-]+)$/);
  if (svc) return svc[1];
  const local = path.match(/^\/(?:tecnico-informatica|assistencia-tecnica|arrumar-pc|cftv)-([a-z0-9-]+)$/);
  if (local) return local[1];
  return undefined;
}

const taxa = (n: number, d: number): number | null => (d > 0 ? n / d : null);

function classificar(a: Agregado): { classe: ClasseOportunidade; motivo: string } {
  const sessoes = a.sessoes.size;
  if (sessoes < LIMIARES.amostraMinima) {
    return {
      classe: "low_evidence",
      motivo: `${sessoes} sessões (< ${LIMIARES.amostraMinima}) — sem base para decidir`,
    };
  }
  const t = taxa(a.whatsapp.size, sessoes) ?? 0;
  if (t >= LIMIARES.taxaAlvoWhatsapp) {
    return {
      classe: "expand_candidate",
      motivo: `WhatsApp/sessão ${(t * 100).toFixed(1)}% ≥ alvo ${(LIMIARES.taxaAlvoWhatsapp * 100).toFixed(0)}%`,
    };
  }
  return {
    classe: "improve_page",
    motivo: `WhatsApp/sessão ${(t * 100).toFixed(1)}% < alvo ${(LIMIARES.taxaAlvoWhatsapp * 100).toFixed(0)}%`,
  };
}

/** Agrupa os eventos por dimensão e devolve os recortes classificados. */
export function analisarOportunidades(eventos: EventoOportunidade[]): RecorteOportunidade[] {
  const mapas: Record<Dimensao, Map<string, Agregado>> = {
    rota: new Map(),
    cidade: new Map(),
    bairro: new Map(),
    servico: new Map(),
    canal: new Map(),
  };

  const pega = (d: Dimensao, k: string) => {
    const m = mapas[d];
    const a = m.get(k) ?? novo();
    m.set(k, a);
    return a;
  };

  for (const ev of eventos) {
    const sid = ev.session_id || ev.created_at;
    const tipo = ev.event_type;
    const alvos: Agregado[] = [];

    if (ev.path) alvos.push(pega("rota", ev.path));
    const cidade = cidadeDaRota(ev.path);
    if (cidade) alvos.push(pega("cidade", cidade));
    if (ev.neighborhood_slug) alvos.push(pega("bairro", ev.neighborhood_slug));
    if (ev.servico) alvos.push(pega("servico", ev.servico));
    const canal: Canal = canalDoEvento(ev);
    alvos.push(pega("canal", canal));

    for (const a of alvos) {
      a.sessoes.add(sid);
      if (EVENTOS_CTA.has(tipo)) a.cta.add(sid);
      if (EVENTOS_TRIAGEM.has(tipo)) a.triagem.add(sid);
      if (EVENTOS_WHATSAPP.has(tipo)) a.whatsapp.add(sid);
    }
  }

  const saida: RecorteOportunidade[] = [];
  for (const dimensao of Object.keys(mapas) as Dimensao[]) {
    for (const [chave, a] of mapas[dimensao]) {
      const { classe, motivo } = classificar(a);
      saida.push({
        dimensao,
        chave,
        sessoes: a.sessoes.size,
        cta: a.cta.size,
        triagem: a.triagem.size,
        whatsapp: a.whatsapp.size,
        taxaCta: taxa(a.cta.size, a.sessoes.size),
        taxaTriagem: taxa(a.triagem.size, a.sessoes.size),
        taxaWhatsapp: taxa(a.whatsapp.size, a.sessoes.size),
        classe,
        motivo,
      });
    }
  }

  const ordem: Record<ClasseOportunidade, number> = {
    expand_candidate: 0,
    improve_page: 1,
    low_evidence: 2,
  };
  return saida.sort(
    (x, y) => ordem[x.classe] - ordem[y.classe] || y.sessoes - x.sessoes || x.chave.localeCompare(y.chave),
  );
}

/** Percentual formatado com zero-state seguro (nunca NaN/Infinity). */
export function formatarTaxa(t: number | null): string {
  return t === null || !Number.isFinite(t) ? "—" : `${(t * 100).toFixed(1)}%`;
}
