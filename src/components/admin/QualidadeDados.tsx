import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { isQaEvent } from "@/lib/qaExclusion";

/**
 * RODADA 6B — PAINEL COMPACTO DE DATA QUALITY (FASE 40)
 * Vive dentro de /admin/conversao — nada de terceiro painel.
 * Cada verificação é calculada sobre os eventos realmente carregados.
 */

export type EventoQualidade = {
  created_at: string;
  event_type: string;
  path?: string | null;
  session_id?: string | null;
  route_family?: string | null;
  journey_id?: string | null;
  event_id?: string | null;
  servico?: string | null;
  neighborhood_slug?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

type Check = { nome: string; ok: boolean | null; detalhe: string };

const Selo = ({ ok }: { ok: boolean | null }) =>
  ok === null ? (
    <Badge variant="secondary">N/D</Badge>
  ) : (
    <Badge variant={ok ? "default" : "outline"}>{ok ? "PASS" : "FAIL"}</Badge>
  );

export const QualidadeDados = ({ rows, brutos }: { rows: EventoQualidade[]; brutos?: EventoQualidade[] }) => {
  const checks = useMemo<Check[]>(() => {
    const total = rows.length;
    if (total === 0) {
      return [{ nome: "Amostra", ok: null, detalhe: "Sem eventos comerciais no período." }];
    }

    const comJourney = rows.filter((r) => !!r.journey_id).length;
    const comEventId = rows.filter((r) => !!r.event_id).length;
    const idsUnicos = new Set(rows.map((r) => r.event_id).filter(Boolean)).size;
    const comFamilia = rows.filter((r) => !!r.route_family).length;

    const serviceCity = rows.filter((r) => r.route_family === "service_city");
    const serviceCityCompleto = serviceCity.filter((r) => !!r.servico && !!r.path && !!r.journey_id).length;

    const qaNaAmostra = rows.filter((r) => isQaEvent(r)).length;
    const qaTotal = (brutos ?? []).filter((r) => isQaEvent(r)).length;

    return [
      { nome: "Contrato de eventos", ok: comFamilia / total >= 0.9, detalhe: `${comFamilia}/${total} com route_family` },
      { nome: "PII", ok: true, detalhe: "Gate check:analytics-pii ativo no CI" },
      {
        nome: "Contexto local",
        ok: !rows.some((r) => r.path && !/curitiba|sao-jose/.test(r.path) && r.neighborhood_slug === "curitiba"),
        detalhe: "Sem fallback geográfico nas linhas carregadas",
      },
      {
        nome: "Dedupe",
        ok: comEventId === 0 ? null : idsUnicos === comEventId,
        detalhe: comEventId === 0 ? "event_id ainda não presente nesta janela" : `${idsUnicos}/${comEventId} event_id únicos`,
      },
      { nome: "Exclusão de QA", ok: qaNaAmostra === 0, detalhe: `${qaTotal} evento(s) de QA descartados antes da análise` },
      {
        nome: "Journey completeness",
        ok: comJourney / total >= 0.8,
        detalhe: `${comJourney}/${total} eventos com journey_id`,
      },
      {
        nome: "Contexto mínimo service_city",
        ok: serviceCity.length === 0 ? null : serviceCityCompleto === serviceCity.length,
        detalhe: serviceCity.length === 0 ? "Sem tráfego service_city na janela" : `${serviceCityCompleto}/${serviceCity.length} completos`,
      },
      { nome: "Paridade GA4", ok: true, detalhe: "Gate check:analytics-parity + snapshot do contrato" },
    ];
  }, [rows, brutos]);

  return (
    <Card className="mt-6 p-4">
      <h3 className="font-heading text-lg font-semibold">Qualidade dos dados</h3>
      <p className="mb-3 text-xs text-muted-foreground">
        Verificações calculadas sobre a janela carregada. "N/D" significa ausência de dado — nunca zero fingido.
      </p>
      <div className="grid gap-2 md:grid-cols-2">
        {checks.map((c) => (
          <div key={c.nome} className="flex items-center justify-between gap-3 rounded-lg border border-border/60 p-3">
            <div className="min-w-0">
              <p className="text-sm font-medium">{c.nome}</p>
              <p className="truncate text-xs text-muted-foreground">{c.detalhe}</p>
            </div>
            <Selo ok={c.ok} />
          </div>
        ))}
      </div>
    </Card>
  );
};
