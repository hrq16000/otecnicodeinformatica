import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  SAMPLE_LABEL,
  formatRate,
  rate,
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
  landing_route?: string | null;
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

  /** Agregação por janela móvel (7/30/90 dias) sobre o período carregado. */
  const periodos = useMemo(() => {
    const agora = Date.now();
    return [7, 30, 90].map((dias) => {
      const corte = agora - dias * 24 * 60 * 60 * 1000;
      const b = novoBucket();
      let eventos = 0;
      for (const r of rows) {
        if (new Date(r.created_at).getTime() < corte) continue;
        eventos += 1;
        acumular(b, r.event_type, r.session_id || r.created_at);
      }
      return { dias, bucket: b, eventos };
    });
  }, [rows]);

  /** First touch × last touch × jornadas assistidas — sem PII. */
  const jornadas = useMemo(() => {
    const porSessao = new Map<
      string,
      { landing?: string; conversao?: string; converteu: boolean }
    >();
    for (const r of rows) {
      const sid = r.session_id || r.created_at;
      const s = porSessao.get(sid) ?? { converteu: false };
      if (!s.landing) s.landing = r.landing_route || r.path || undefined;
      if (r.event_type === "wa_click" || r.event_type === "whatsapp_open") {
        s.converteu = true;
        s.conversao = r.path || s.conversao;
      }
      porSessao.set(sid, s);
    }
    const sessoes = [...porSessao.values()];
    const convertidas = sessoes.filter((s) => s.converteu);
    const assistidas = convertidas.filter(
      (s) => s.landing && s.conversao && s.landing !== s.conversao,
    );
    const contar = (chave: (s: (typeof sessoes)[number]) => string | undefined) => {
      const m = new Map<string, { sessoes: number; conv: number }>();
      for (const s of sessoes) {
        const k = chave(s);
        if (!k) continue;
        const v = m.get(k) ?? { sessoes: 0, conv: 0 };
        v.sessoes += 1;
        if (s.converteu) v.conv += 1;
        m.set(k, v);
      }
      return [...m.entries()]
        .sort((a, b) => b[1].conv - a[1].conv || b[1].sessoes - a[1].sessoes)
        .slice(0, 15);
    };
    return {
      totalSessoes: sessoes.length,
      convertidas: convertidas.length,
      assistidas: assistidas.length,
      firstTouch: contar((s) => s.landing),
      lastTouch: contar((s) => s.conversao),
    };
  }, [rows]);

  /** Rotas que mais convertem (destaque por WhatsApp por sessão). */
  const topRotas = useMemo(
    () =>
      dados.porRota
        .filter(([, b]) => b.whatsapp.size > 0)
        .sort(
          (a, b) =>
            b[1].whatsapp.size - a[1].whatsapp.size ||
            (rate(b[1].whatsapp.size, b[1].views.size) ?? 0) -
              (rate(a[1].whatsapp.size, a[1].views.size) ?? 0),
        )
        .slice(0, 5),
    [dados.porRota],
  );

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

      <Card className="p-4">
        <h3 className="font-heading text-lg font-semibold">Períodos (7 / 30 / 90 dias)</h3>
        <p className="mb-3 text-xs text-muted-foreground">
          Janelas móveis sobre o intervalo carregado. Tráfego de QA já excluído.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {periodos.map((p) => (
            <div key={p.dias} className="rounded-lg border border-border/60 p-3">
              <p className="text-xs text-muted-foreground">Últimos {p.dias} dias</p>
              {p.eventos === 0 ? (
                <p className="py-4 text-sm text-muted-foreground">Sem dados no período.</p>
              ) : (
                <>
                  <p className="text-2xl font-semibold tabular-nums">{p.bucket.views.size}</p>
                  <p className="text-xs text-muted-foreground">sessões com page view</p>
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>CTA: {p.bucket.cta.size} ({formatRate(p.bucket.cta.size, p.bucket.views.size)})</li>
                    <li>Triagem: {p.bucket.triagem.size} ({formatRate(p.bucket.triagem.size, p.bucket.views.size)})</li>
                    <li>WhatsApp: {p.bucket.whatsapp.size} ({formatRate(p.bucket.whatsapp.size, p.bucket.views.size)})</li>
                  </ul>
                  <Badge className="mt-2" variant={sampleStatus(p.bucket.views.size) === "actionable" ? "default" : "secondary"}>
                    {SAMPLE_LABEL[sampleStatus(p.bucket.views.size)]}
                  </Badge>
                </>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-heading text-lg font-semibold">Rotas que mais convertem</h3>
        <p className="mb-3 text-xs text-muted-foreground">
          Destaque por aberturas de WhatsApp e taxa por sessão.
        </p>
        {topRotas.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Sem conversões no período.</p>
        ) : (
          <ol className="space-y-2">
            {topRotas.map(([r, b], i) => (
              <li key={r} className="flex items-center justify-between gap-3 rounded-lg border border-border/60 p-2">
                <span className="truncate font-mono text-xs">
                  {i + 1}. {r}
                </span>
                <span className="whitespace-nowrap text-xs tabular-nums text-muted-foreground">
                  {b.whatsapp.size} WA · {formatRate(b.whatsapp.size, b.views.size)} de {b.views.size} sessões
                </span>
              </li>
            ))}
          </ol>
        )}
      </Card>

      <Card className="p-4">
        <h3 className="font-heading text-lg font-semibold">Jornadas: first touch, last touch e assistidas</h3>
        <p className="mb-3 text-xs text-muted-foreground">
          Pseudônimo efêmero de jornada (TTL 30 min). Nenhum dado pessoal envolvido.
        </p>
        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Sessões</p>
            <p className="text-2xl font-semibold tabular-nums">{jornadas.totalSessoes}</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Com WhatsApp</p>
            <p className="text-2xl font-semibold tabular-nums">{jornadas.convertidas}</p>
            <p className="text-xs text-muted-foreground">{formatRate(jornadas.convertidas, jornadas.totalSessoes)} das sessões</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Jornadas assistidas</p>
            <p className="text-2xl font-semibold tabular-nums">{jornadas.assistidas}</p>
            <p className="text-xs text-muted-foreground">
              {formatRate(jornadas.assistidas, jornadas.convertidas)} das conversões (entrada ≠ rota de conversão)
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { titulo: "First touch (rota de entrada)", linhas: jornadas.firstTouch },
            { titulo: "Last touch (rota da conversão)", linhas: jornadas.lastTouch },
          ].map((bloco) => (
            <div key={bloco.titulo}>
              <h4 className="mb-2 text-sm font-semibold">{bloco.titulo}</h4>
              {bloco.linhas.length === 0 ? (
                <p className="text-sm text-muted-foreground">Sem dados no período.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead className="text-left text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="py-1 pr-2">Rota</th>
                      <th className="py-1 pr-2 text-right">Sessões</th>
                      <th className="py-1 pr-2 text-right">WA</th>
                      <th className="py-1 text-right">Taxa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bloco.linhas.map(([r, v]) => (
                      <tr key={r} className="border-b border-border/60">
                        <td className="max-w-[16rem] truncate py-1 pr-2 font-mono text-xs">{r}</td>
                        <td className="py-1 pr-2 text-right tabular-nums">{v.sessoes}</td>
                        <td className="py-1 pr-2 text-right tabular-nums">{v.conv}</td>
                        <td className="py-1 text-right tabular-nums">{formatRate(v.conv, v.sessoes)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
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
