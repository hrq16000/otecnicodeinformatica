import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  SAMPLE_LABEL,
  formatRate,
  sampleStatus,
  type RouteFamily,
} from "@/lib/analyticsContract";

/**
 * RODADA 6 — funil visual + tabelas por rota, cidade, bairro e serviço.
 *
 * Vive dentro de /admin/conversao (FASE 68: nada de painel duplicado).
 * Todo percentual tem denominador explícito e zero-state seguro (sem NaN).
 */

export type EventoRodada6 = {
  created_at: string;
  event_type: string;
  path: string | null;
  session_id: string | null;
  servico: string | null;
  route_family?: string | null;
  intent?: string | null;
  neighborhood_slug?: string | null;
  cidade?: string | null;
  city?: string | null;
};

type Bucket = {
  views: Set<string>;
  cta: Set<string>;
  triagem: Set<string>;
  conclusao: Set<string>;
  whatsapp: Set<string>;
};

const novoBucket = (): Bucket => ({
  views: new Set(),
  cta: new Set(),
  triagem: new Set(),
  conclusao: new Set(),
  whatsapp: new Set(),
});

const EVENTO_ETAPA: Record<string, keyof Bucket> = {
  page_view: "views",
  cta_click: "cta",
  funnel_open: "triagem",
  triage_start: "triagem",
  funnel_stage: "conclusao",
  wa_click: "whatsapp",
};

function acumular(bucket: Bucket, evento: string, sessao: string) {
  const etapa = EVENTO_ETAPA[evento];
  if (etapa) bucket[etapa].add(sessao);
}

/** Cidade da linha: derivada da rota. Sem fallback para Curitiba. */
function cidadeDe(path: string | null): string | undefined {
  if (!path) return undefined;
  const svc = path.match(/^\/servicos\/[^/]+\/([a-z0-9-]+)$/);
  if (svc) return svc[1];
  const local = path.match(/^\/(?:tecnico-informatica|assistencia-tecnica|arrumar-pc|cftv)-([a-z0-9-]+)$/);
  if (local) return local[1];
  return undefined;
}

const Linha = ({ b, rotulo }: { b: Bucket; rotulo: string }) => {
  const status = sampleStatus(b.views.size);
  return (
    <tr className="border-b border-border/60">
      <td className="max-w-[22rem] truncate py-2 pr-3 font-mono text-xs">{rotulo}</td>
      <td className="py-2 pr-3 text-right tabular-nums">{b.views.size}</td>
      <td className="py-2 pr-3 text-right tabular-nums">{b.cta.size}</td>
      <td className="py-2 pr-3 text-right tabular-nums">{b.triagem.size}</td>
      <td className="py-2 pr-3 text-right tabular-nums">{b.whatsapp.size}</td>
      <td className="py-2 pr-3 text-right tabular-nums">{formatRate(b.whatsapp.size, b.views.size)}</td>
      <td className="py-2 text-right">
        <Badge variant={status === "actionable" ? "default" : "secondary"}>{SAMPLE_LABEL[status]}</Badge>
      </td>
    </tr>
  );
};

const Tabela = ({
  titulo,
  descricao,
  dados,
}: {
  titulo: string;
  descricao: string;
  dados: [string, Bucket][];
}) => (
  <Card className="p-4">
    <h3 className="font-heading text-lg font-semibold">{titulo}</h3>
    <p className="mb-3 text-xs text-muted-foreground">{descricao}</p>
    {dados.length === 0 ? (
      <p className="py-6 text-center text-sm text-muted-foreground">Sem dados no período.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="py-2 pr-3">Chave</th>
              <th className="py-2 pr-3 text-right">Sessões</th>
              <th className="py-2 pr-3 text-right">CTA</th>
              <th className="py-2 pr-3 text-right">Triagem</th>
              <th className="py-2 pr-3 text-right">WhatsApp</th>
              <th className="py-2 pr-3 text-right">WA / sessão</th>
              <th className="py-2 text-right">Amostra</th>
            </tr>
          </thead>
          <tbody>
            {dados.map(([k, b]) => (
              <Linha key={k} b={b} rotulo={k} />
            ))}
          </tbody>
        </table>
      </div>
    )}
  </Card>
);

export const FunilRodada6 = ({ rows }: { rows: EventoRodada6[] }) => {
  const dados = useMemo(() => {
    const total = novoBucket();
    const porRota = new Map<string, Bucket>();
    const porCidade = new Map<string, Bucket>();
    const porBairro = new Map<string, Bucket>();
    const porServico = new Map<string, Bucket>();
    const porFamilia = new Map<string, Bucket>();

    const pega = (m: Map<string, Bucket>, k: string) => {
      const b = m.get(k) ?? novoBucket();
      m.set(k, b);
      return b;
    };

    for (const r of rows) {
      const sid = r.session_id || r.created_at;
      acumular(total, r.event_type, sid);
      acumular(pega(porRota, r.path || "(sem rota)"), r.event_type, sid);

      const cidade = cidadeDe(r.path);
      if (cidade) acumular(pega(porCidade, cidade), r.event_type, sid);

      if (r.neighborhood_slug) acumular(pega(porBairro, r.neighborhood_slug), r.event_type, sid);
      if (r.servico) acumular(pega(porServico, r.servico), r.event_type, sid);

      const familia = (r.route_family as RouteFamily | null) || undefined;
      if (familia) acumular(pega(porFamilia, familia), r.event_type, sid);
    }

    const ordenar = (m: Map<string, Bucket>) =>
      [...m.entries()].sort((a, b) => b[1].views.size - a[1].views.size || b[1].whatsapp.size - a[1].whatsapp.size).slice(0, 40);

    return {
      total,
      porRota: ordenar(porRota),
      porCidade: ordenar(porCidade),
      porBairro: ordenar(porBairro),
      porServico: ordenar(porServico),
      porFamilia: ordenar(porFamilia),
    };
  }, [rows]);

  const t = dados.total;
  const etapas = [
    { rotulo: "Sessões (page view)", valor: t.views.size, base: t.views.size },
    { rotulo: "CTA", valor: t.cta.size, base: t.views.size },
    { rotulo: "Triagem iniciada", valor: t.triagem.size, base: t.cta.size || t.views.size },
    { rotulo: "Triagem concluída", valor: t.conclusao.size, base: t.triagem.size },
    { rotulo: "WhatsApp aberto", valor: t.whatsapp.size, base: t.triagem.size || t.views.size },
  ];

  return (
    <section className="mt-8 space-y-6" aria-label="Funil por rota e localidade (Rodada 6)">
      <Card className="p-4">
        <h2 className="font-heading text-xl font-semibold">Funil de conversão por sessão</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          Contagem por sessões distintas comerciais (QA excluído). Taxa sempre com denominador explícito.
        </p>
        <div className="grid gap-3 md:grid-cols-5">
          {etapas.map((e) => (
            <div key={e.rotulo} className="rounded-lg border border-border/60 p-3">
              <p className="text-xs text-muted-foreground">{e.rotulo}</p>
              <p className="text-2xl font-semibold tabular-nums">{e.valor}</p>
              <p className="text-xs text-muted-foreground">{formatRate(e.valor, e.base)} da etapa anterior</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Amostra global: <strong>{SAMPLE_LABEL[sampleStatus(t.views.size)]}</strong>. Volume baixo não
          gera recomendação automática.
        </p>
      </Card>

      <Tabela titulo="Por rota" descricao="URLs com mais sessões no período." dados={dados.porRota} />
      <Tabela titulo="Por família de rota" descricao="home, service, problem, city, neighborhood, service_city…" dados={dados.porFamilia} />
      <Tabela titulo="Por cidade" descricao="Derivada da rota — sem fallback geográfico." dados={dados.porCidade} />
      <Tabela titulo="Por bairro" descricao="Somente bairros âncora declarados na policy." dados={dados.porBairro} />
      <Tabela titulo="Por serviço" descricao="service_slug informado pelo evento." dados={dados.porServico} />
    </section>
  );
};

export default FunilRodada6;
