import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  analisarOportunidades,
  formatarTaxa,
  type Dimensao,
  type EventoOportunidade,
  type RecorteOportunidade,
} from "@/lib/oportunidadeAnalise";

/**
 * RODADA 6B — VISUALIZAÇÃO DE JORNADA (Sankey simplificado em SVG)
 * ----------------------------------------------------------------
 * Mostra a queda entre triagem → WhatsApp → lead → conversão operacional
 * por rota, cidade e serviço, sem dependência de biblioteca de gráfico
 * (FASE 48 — analytics e painel não podem pesar no bundle).
 *
 * Etapa sem integração real aparece como "integração não disponível" —
 * nunca como zero, que seria lido como "nenhuma venda" (FASE 29).
 */

export type JornadaSankeyProps = {
  rows: EventoOportunidade[];
  /** Leads reais (funnel_submissions) no período, quando carregados. */
  leads?: number | null;
  /** OS vinculada à jornada: `null` = integração inexistente. */
  osIntegrada?: number | null;
  /** Data (YYYY-MM-DD) inicial já carregada — define quais janelas são reais. */
  inicioCarregado?: string;
};

const DIMENSOES: { valor: Dimensao; rotulo: string }[] = [
  { valor: "rota", rotulo: "Rota" },
  { valor: "cidade", rotulo: "Cidade" },
  { valor: "servico", rotulo: "Serviço" },
];

const COR = ["hsl(var(--primary))", "hsl(var(--primary) / 0.78)", "hsl(var(--primary) / 0.55)", "hsl(var(--primary) / 0.35)"];

type Etapa = { rotulo: string; valor: number };

const FluxoSvg = ({ etapas }: { etapas: Etapa[] }) => {
  const base = etapas[0]?.valor ?? 0;
  const largura = 720;
  const altura = 190;
  const colunas = etapas.length;
  const passo = largura / colunas;
  const alturaDe = (v: number) => (base > 0 ? Math.max(3, (v / base) * (altura - 50)) : 3);

  return (
    <svg
      viewBox={`0 0 ${largura} ${altura}`}
      className="h-auto w-full"
      role="img"
      aria-label="Fluxo de jornada por etapa, com queda entre etapas"
    >
      {etapas.map((etapa, i) => {
        const h = alturaDe(etapa.valor);
        const x = i * passo + 12;
        const y = (altura - 40 - h) / 2 + 8;
        const proximo = etapas[i + 1];
        const hProx = proximo ? alturaDe(proximo.valor) : 0;
        const yProx = proximo ? (altura - 40 - hProx) / 2 + 8 : 0;
        const larguraBarra = 26;
        return (
          <g key={etapa.rotulo}>
            {proximo && (
              <path
                d={`M ${x + larguraBarra} ${y} C ${x + passo / 2} ${y}, ${x + passo / 2} ${yProx}, ${x + passo - 12} ${yProx}
                    L ${x + passo - 12} ${yProx + hProx} C ${x + passo / 2} ${yProx + hProx}, ${x + passo / 2} ${y + h}, ${x + larguraBarra} ${y + h} Z`}
                fill={COR[Math.min(i, COR.length - 1)]}
                opacity={0.28}
              />
            )}
            <rect x={x} y={y} width={larguraBarra} height={h} rx={4} fill={COR[Math.min(i, COR.length - 1)]} />
            <text x={x} y={altura - 18} className="fill-muted-foreground" fontSize="11">
              {etapa.rotulo}
            </text>
            <text x={x} y={altura - 4} className="fill-foreground" fontSize="12" fontWeight="600">
              {etapa.valor}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const LinhaQueda = ({ de, para }: { de: Etapa; para: Etapa }) => {
  const perda = Math.max(0, de.valor - para.valor);
  return (
    <tr className="border-b border-border/60">
      <td className="py-1.5 pr-3 text-xs">
        {de.rotulo} → {para.rotulo}
      </td>
      <td className="py-1.5 pr-3 text-right text-xs tabular-nums">{para.valor}</td>
      <td className="py-1.5 pr-3 text-right text-xs tabular-nums">
        {formatarTaxa(de.valor > 0 ? para.valor / de.valor : null)}
      </td>
      <td className="py-1.5 text-right text-xs tabular-nums text-muted-foreground">-{perda}</td>
    </tr>
  );
};

const JANELAS = [7, 30, 90] as const;
type Janela = (typeof JANELAS)[number];

const diasAtras = (dias: number) => {
  const d = new Date();
  d.setDate(d.getDate() - dias);
  return d;
};

/** Recorte da janela dentro do que já foi carregado (sem inventar dados). */
function subconjunto(rows: EventoOportunidade[], dias: number): EventoOportunidade[] {
  const corte = diasAtras(dias).getTime();
  return rows.filter((r) => new Date(r.created_at).getTime() >= corte);
}

type ResumoJanela = {
  dias: Janela;
  coberta: boolean;
  sessoes: number;
  cta: number;
  triagem: number;
  whatsapp: number;
};

/** Maior queda percentual entre etapas de um recorte. */
function gargalo(r: RecorteOportunidade): { etapa: string; perda: number } | null {
  const etapas = [
    { rotulo: "Sessões → CTA", de: r.sessoes, para: r.cta },
    { rotulo: "CTA → Triagem", de: r.cta, para: r.triagem },
    { rotulo: "Triagem → WhatsApp", de: r.triagem, para: r.whatsapp },
  ].filter((e) => e.de > 0);
  if (etapas.length === 0) return null;
  const pior = etapas.reduce((a, b) => (1 - b.para / b.de > 1 - a.para / a.de ? b : a));
  return { etapa: pior.rotulo, perda: 1 - pior.para / pior.de };
}

export const JornadaSankey = ({
  rows,
  leads = null,
  osIntegrada = null,
  inicioCarregado,
}: JornadaSankeyProps) => {
  const [dimensao, setDimensao] = useState<Dimensao>("rota");
  const recortes = useMemo(() => analisarOportunidades(rows), [rows]);

  const doGrupo = useMemo(
    () =>
      recortes
        .filter((r: RecorteOportunidade) => r.dimensao === dimensao)
        .sort((a, b) => b.sessoes - a.sessoes)
        .slice(0, 6),
    [recortes, dimensao],
  );

  /** Comparação automática 7 / 30 / 90 dias sobre o mesmo carregamento. */
  const janelas: ResumoJanela[] = useMemo(() => {
    const inicio = inicioCarregado ? new Date(`${inicioCarregado}T00:00:00Z`).getTime() : null;
    return JANELAS.map((dias) => {
      const coberta = inicio === null ? true : inicio <= diasAtras(dias).getTime();
      if (!coberta) {
        return { dias, coberta: false, sessoes: 0, cta: 0, triagem: 0, whatsapp: 0 };
      }
      const parcial = analisarOportunidades(subconjunto(rows, dias)).filter((r) => r.dimensao === "canal");
      const soma = (campo: keyof RecorteOportunidade) =>
        parcial.reduce((acc, r) => acc + (r[campo] as number), 0);
      return {
        dias,
        coberta: true,
        sessoes: soma("sessoes"),
        cta: soma("cta"),
        triagem: soma("triagem"),
        whatsapp: soma("whatsapp"),
      };
    });
  }, [rows, inicioCarregado]);

  /** Maiores gargalos por rota e por serviço, ordenados pela perda. */
  const gargalos = useMemo(() => {
    return (["rota", "servico"] as Dimensao[]).map((dim) => ({
      dimensao: dim,
      itens: recortes
        .filter((r) => r.dimensao === dim && r.sessoes > 0)
        .map((r) => ({ chave: r.chave, sessoes: r.sessoes, g: gargalo(r) }))
        .filter((x) => x.g !== null)
        .sort((a, b) => b.sessoes * (b.g?.perda ?? 0) - a.sessoes * (a.g?.perda ?? 0))
        .slice(0, 5),
    }));
  }, [recortes]);

  const global = useMemo(() => {
    const soma = (campo: keyof RecorteOportunidade) =>
      recortes.filter((r) => r.dimensao === "canal").reduce((acc, r) => acc + (r[campo] as number), 0);
    return [
      { rotulo: "Sessões", valor: soma("sessoes") },
      { rotulo: "CTA", valor: soma("cta") },
      { rotulo: "Triagem", valor: soma("triagem") },
      { rotulo: "WhatsApp", valor: soma("whatsapp") },
    ];
  }, [recortes]);

  const etapasComLead: Etapa[] = leads === null ? global : [...global, { rotulo: "Lead", valor: leads }];
  const etapasFinais: Etapa[] =
    osIntegrada === null ? etapasComLead : [...etapasComLead, { rotulo: "OS", valor: osIntegrada }];


  return (
    <Card className="mt-6 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-heading text-lg font-semibold">Jornada e queda entre etapas</h3>
          <p className="text-xs text-muted-foreground">
            Sessões distintas comerciais (QA excluído). Etapa sem integração real não vira zero.
          </p>
        </div>
        <div className="flex gap-1">
          {DIMENSOES.map((d) => (
            <Button
              key={d.valor}
              size="sm"
              variant={dimensao === d.valor ? "default" : "outline"}
              onClick={() => setDimensao(d.valor)}
            >
              {d.rotulo}
            </Button>
          ))}
        </div>
      </div>

      {global[0].valor === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Sem eventos comerciais no período.</p>
      ) : (
        <>
          <FluxoSvg etapas={etapasComLead} />

          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {leads === null && <Badge variant="secondary">Lead: leitura não carregada neste filtro</Badge>}
            {osIntegrada === null && <Badge variant="secondary">OS: integração não disponível</Badge>}
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="py-2 pr-3">Transição</th>
                  <th className="py-2 pr-3 text-right">Chegaram</th>
                  <th className="py-2 pr-3 text-right">Taxa</th>
                  <th className="py-2 text-right">Perda</th>
                </tr>
              </thead>
              <tbody>
                {etapasComLead.slice(0, -1).map((e, i) => (
                  <LinhaQueda key={e.rotulo} de={e} para={etapasComLead[i + 1]} />
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="mt-5 text-sm font-semibold">Queda por {DIMENSOES.find((d) => d.valor === dimensao)?.rotulo}</h4>
          <div className="mt-2 space-y-3">
            {doGrupo.length === 0 ? (
              <p className="text-xs text-muted-foreground">Sem recortes com dados nesta dimensão.</p>
            ) : (
              doGrupo.map((r) => (
                <div key={r.chave} className="rounded-lg border border-border/60 p-3">
                  <p className="mb-1 truncate font-mono text-xs">{r.chave}</p>
                  <FluxoSvg
                    etapas={[
                      { rotulo: "Sessões", valor: r.sessoes },
                      { rotulo: "CTA", valor: r.cta },
                      { rotulo: "Triagem", valor: r.triagem },
                      { rotulo: "WhatsApp", valor: r.whatsapp },
                    ]}
                  />
                </div>
              ))
            )}
          </div>
        </>
      )}
    </Card>
  );
};
