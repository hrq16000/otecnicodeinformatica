import { projetarEventoClique } from "@/lib/realtimeSafeFields";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Download, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { filtrarComerciais } from "@/lib/qaExclusion";
import { FunilRodada6, type EventoRodada6 } from "@/components/admin/FunilRodada6";
import { SegmentacaoCanal } from "@/components/admin/SegmentacaoCanal";
import { AquisicaoReal } from "@/components/admin/AquisicaoReal";
import { PainelClusterEditorial } from "@/components/admin/PainelClusterEditorial";


import { RelatoriosConversao } from "@/components/admin/RelatoriosConversao";
import { JornadaSankey } from "@/components/admin/JornadaSankey";
import { RelatorioOportunidade } from "@/components/admin/RelatorioOportunidade";
import { QualidadeDados, type EventoQualidade } from "@/components/admin/QualidadeDados";
import { PainelExperimentosCro, type EventoExperimento } from "@/components/admin/PainelExperimentosCro";
import { PainelReadinessExperimento } from "@/components/admin/PainelReadinessExperimento";
import type { EventoReadiness } from "@/lib/experimentReadiness";

import type { EventoOportunidade } from "@/lib/oportunidadeAnalise";

/**
 * Painel de conversão por CTA (Rodada 4B).
 *
 * Lê `click_events` e cruza os recortes que faltavam: rota (foco em
 * /servicos/conserto-tv e /servicos/conserto-placa), posição do CTA,
 * faixa de viewport, origem/UTM e variação de copy do experimento.
 * Mostra também o funil por etapa (clique no CTA → triagem →
 * autorização → execução) para localizar onde o lead desiste.
 */

type Evento = {
  created_at: string;
  event_type: string;
  path: string | null;
  cta_location: string | null;
  cta_position: string | null;
  viewport_bucket: string | null;
  funnel_stage: string | null;
  variant: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  attribution_channel: string | null;
  session_id: string | null;
  servico: string | null;
  utm_medium: string | null;
  landing_route?: string | null;
  route_family?: string | null;
  intent?: string | null;
  neighborhood_slug?: string | null;
};

const ROTAS_FOCO = [
  { value: "all", label: "Todas as rotas" },
  { value: "/servicos/conserto-tv", label: "Conserto de TV" },
  { value: "/servicos/conserto-placa", label: "Conserto de placa" },
  { value: "/servicos/conserto-monitor", label: "Conserto de monitor" },
];

const ETAPAS: { id: string; label: string }[] = [
  { id: "cta_click", label: "1. Clique no CTA" },
  { id: "triagem", label: "2. Triagem" },
  { id: "autorizacao", label: "3. Autorização" },
  { id: "execucao", label: "4. Execução" },
];

const hojeMenos = (dias: number) => {
  const d = new Date();
  d.setDate(d.getDate() - dias);
  return d.toISOString().slice(0, 10);
};

const pct = (parte: number, total: number) => (total ? Math.round((parte / total) * 100) : 0);

const AdminConversao = () => {
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
  const [rows, setRows] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(false);
  const [inicio, setInicio] = useState(hojeMenos(29));
  const [fim, setFim] = useState(hojeMenos(0));
  const [rota, setRota] = useState("all");
  const [viewport, setViewport] = useState("all");
  const [origem, setOrigem] = useState("all");

  const carregar = useCallback(async () => {
    if (!isAdmin) return;
    setLoading(true);
    let q = supabase
      .from("click_events")
      .select(
        "created_at,event_type,path,cta_location,cta_position,viewport_bucket,funnel_stage,variant,utm_source,utm_medium,utm_campaign,attribution_channel,session_id,servico,route_family,intent,neighborhood_slug,landing_route,journey_id,event_id",
      )
      .gte("created_at", `${inicio}T00:00:00Z`)
      .lte("created_at", `${fim}T23:59:59Z`)
      .order("created_at", { ascending: false })
      .limit(5000);
    if (rota !== "all") q = q.eq("path", rota);
    if (viewport !== "all") q = q.eq("viewport_bucket", viewport);
    if (origem !== "all") q = q.eq("attribution_channel", origem);
    const { data } = await q;
    // Regime pós-4D.1: sessões de QA/cutover ficam fora das taxas comerciais.
    setRows(filtrarComerciais((data as Evento[]) ?? []));
    setLoading(false);
  }, [isAdmin, inicio, fim, rota, viewport, origem]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  /**
   * RODADA 7 — fechamento operacional: leads reais e OS já vinculada à
   * jornada. `null` significa "não carregado", nunca zero.
   */
  const [leads, setLeads] = useState<number | null>(null);
  const [osVinculada, setOsVinculada] = useState<number | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    let vivo = true;
    void (async () => {
      const faixa = { de: `${inicio}T00:00:00Z`, ate: `${fim}T23:59:59Z` };
      const [{ count: leadCount }, { count: osCount }] = await Promise.all([
        supabase
          .from("funnel_submissions")
          .select("id", { count: "exact", head: true })
          .gte("created_at", faixa.de)
          .lte("created_at", faixa.ate),
        supabase
          .from("ordens_servico")
          .select("id", { count: "exact", head: true })
          .not("journey_id", "is", null)
          .gte("created_at", faixa.de)
          .lte("created_at", faixa.ate),
      ]);
      if (!vivo) return;
      setLeads(typeof leadCount === "number" ? leadCount : null);
      setOsVinculada(typeof osCount === "number" ? osCount : null);
    })();
    return () => {
      vivo = false;
    };
  }, [isAdmin, inicio, fim]);



  /**
   * Tempo real: novos cliques entram na lista sem recarregar a consulta.
   * Respeita os mesmos filtros de tela e o corte de QA (filtrarComerciais).
   */
  const [aoVivo, setAoVivo] = useState(true);
  const [ultimoEvento, setUltimoEvento] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin || !aoVivo) return;
    const canal = supabase
      .channel("admin-conversao-clicks")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "click_events" },
        (payload) => {
          const novo = projetarEventoClique<Evento>(payload.new);
          if (rota !== "all" && novo.path !== rota) return;
          if (viewport !== "all" && novo.viewport_bucket !== viewport) return;
          if (origem !== "all" && novo.attribution_channel !== origem) return;
          const [ok] = filtrarComerciais([novo]);
          if (!ok) return;
          setRows((prev) => [ok, ...prev].slice(0, 5000));
          setUltimoEvento(new Date().toLocaleTimeString("pt-BR"));
        },
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(canal);
    };
  }, [isAdmin, aoVivo, rota, viewport, origem]);


  const agregados = useMemo(() => {
    const porCta = new Map<string, { wa: number; call: number; abertura: number }>();
    const porViewport = new Map<string, { wa: number; call: number; total: number }>();
    const porOrigem = new Map<string, { wa: number; call: number; total: number }>();
    const porVariante = new Map<string, { view: number; wa: number }>();
    const etapaSessions = new Map<string, Set<string>>();
    // Rodada 4L — conversão por página/serviço com taxa por sessão móvel.
    /**
     * Rodada 4M — A/B por sessão (não por evento). Taxa = sessões da variação
     * que clicaram ÷ sessões expostas àquela variação. Contar por evento
     * favoreceria quem clica várias vezes.
     */
    const ab = new Map<
      string,
      { sessoes: Set<string>; wa: Set<string>; call: Set<string> }
    >();
    const abEtapa = new Map<string, Map<string, { sessoes: Set<string>; conv: Set<string> }>>();

    const porPagina = new Map<
      string,
      { wa: number; call: number; sessoesMobile: Set<string>; waMobile: Set<string> }
    >();

    for (const r of rows) {
      const cta = r.cta_position || r.cta_location || "sem-posicao";
      const vp = r.viewport_bucket || "desconhecido";
      const org = r.attribution_channel || r.utm_source || "direto";
      const variante = r.variant || "controle";
      const sid = r.session_id || `${r.created_at}`;

      const c = porCta.get(cta) ?? { wa: 0, call: 0, abertura: 0 };
      if (r.event_type === "wa_click") c.wa += 1;
      else if (r.event_type === "call_click") c.call += 1;
      else c.abertura += 1;
      porCta.set(cta, c);

      const v = porViewport.get(vp) ?? { wa: 0, call: 0, total: 0 };
      v.total += 1;
      if (r.event_type === "wa_click") v.wa += 1;
      if (r.event_type === "call_click") v.call += 1;
      porViewport.set(vp, v);

      const o = porOrigem.get(org) ?? { wa: 0, call: 0, total: 0 };
      o.total += 1;
      if (r.event_type === "wa_click") o.wa += 1;
      if (r.event_type === "call_click") o.call += 1;
      porOrigem.set(org, o);

      const x = porVariante.get(variante) ?? { view: 0, wa: 0 };
      x.view += 1;
      if (r.event_type === "wa_click") x.wa += 1;
      porVariante.set(variante, x);

      const rota = r.path || "sem-rota";
      const pg = porPagina.get(rota) ?? { wa: 0, call: 0, sessoesMobile: new Set(), waMobile: new Set() };
      if (r.event_type === "wa_click") pg.wa += 1;
      if (r.event_type === "call_click") pg.call += 1;
      const isMobile = vp !== "desktop" && vp !== "desconhecido";
      if (isMobile) {
        pg.sessoesMobile.add(sid);
        if (r.event_type === "wa_click") pg.waMobile.add(sid);
      }
      porPagina.set(rota, pg);

      const linhaAb = ab.get(variante) ?? { sessoes: new Set(), wa: new Set(), call: new Set() };
      linhaAb.sessoes.add(sid);
      if (r.event_type === "wa_click") linhaAb.wa.add(sid);
      if (r.event_type === "call_click") linhaAb.call.add(sid);
      ab.set(variante, linhaAb);

      const etapaId = r.funnel_stage || "cta_click";
      if (!abEtapa.has(etapaId)) abEtapa.set(etapaId, new Map());
      const mapaEtapa = abEtapa.get(etapaId)!;
      const celula = mapaEtapa.get(variante) ?? { sessoes: new Set(), conv: new Set() };
      celula.sessoes.add(sid);
      if (r.event_type === "wa_click" || r.event_type === "call_click") celula.conv.add(sid);
      mapaEtapa.set(variante, celula);

      const etapa = etapaId;
      if (!etapaSessions.has(etapa)) etapaSessions.set(etapa, new Set());
      etapaSessions.get(etapa)!.add(sid);
    }

    // Recorte por hora local (0–23) e por serviço, para leitura operacional.
    const porHora = Array.from({ length: 24 }, () => ({ wa: 0, call: 0 }));
    const porServico = new Map<string, { wa: number; call: number }>();
    for (const r of rows) {
      const h = new Date(r.created_at).getHours();
      const s = porServico.get(r.servico || "nao-informado") ?? { wa: 0, call: 0 };
      if (r.event_type === "wa_click") { porHora[h].wa += 1; s.wa += 1; }
      if (r.event_type === "call_click") { porHora[h].call += 1; s.call += 1; }
      porServico.set(r.servico || "nao-informado", s);
    }

    const funil = ETAPAS.map((e) => ({ ...e, sessoes: etapaSessions.get(e.id)?.size ?? 0 }));
    const base = funil[0].sessoes;


    return {
      porCta: [...porCta.entries()].sort((a, b) => b[1].wa + b[1].call - (a[1].wa + a[1].call)),
      porViewport: [...porViewport.entries()].sort((a, b) => b[1].total - a[1].total),
      porOrigem: [...porOrigem.entries()].sort((a, b) => b[1].total - a[1].total).slice(0, 10),
      ab: [...ab.entries()]
        .map(([variante, v]) => ({
          variante,
          sessoes: v.sessoes.size,
          wa: v.wa.size,
          call: v.call.size,
          taxaWa: pct(v.wa.size, v.sessoes.size),
          taxaCall: pct(v.call.size, v.sessoes.size),
        }))
        .sort((a, b) => b.taxaWa - a.taxaWa),
      abEtapa: ETAPAS.map((e) => {
        const linhas = [...(abEtapa.get(e.id)?.entries() ?? [])]
          .map(([variante, c]) => ({
            variante,
            sessoes: c.sessoes.size,
            conv: c.conv.size,
            taxa: pct(c.conv.size, c.sessoes.size),
          }))
          .sort((a, b) => b.taxa - a.taxa);
        const lider = linhas[0];
        const vice = linhas[1];
        // Amostra mínima antes de recomendar: 30 sessões na líder e
        // diferença de pelo menos 3 pontos percentuais sobre a segunda.
        const conclusivo =
          !!lider && lider.sessoes >= 30 && (!vice || lider.taxa - vice.taxa >= 3);
        return {
          etapa: e.label,
          linhas,
          recomendacao: !lider
            ? "Sem dados no período."
            : conclusivo
              ? `Manter "${lider.variante}" (${lider.taxa}% em ${lider.sessoes} sessões).`
              : `Inconclusivo — seguir coletando (líder "${lider.variante}", ${lider.sessoes} sessões).`,
        };
      }),
      porPagina: [...porPagina.entries()]
        .map(([rota, v]) => ({
          rota,
          wa: v.wa,
          call: v.call,
          sessoesMobile: v.sessoesMobile.size,
          taxaMobile: pct(v.waMobile.size, v.sessoesMobile.size),
        }))
        .sort((a, b) => b.wa - a.wa)
        .slice(0, 25),
      porVariante: [...porVariante.entries()].sort((a, b) => a[0].localeCompare(b[0])),
      porHora,
      picoHora: Math.max(1, ...porHora.map((h) => h.wa + h.call)),
      porServico: [...porServico.entries()]
        .map(([servico, v]) => ({ servico, ...v }))
        .sort((a, b) => b.wa + b.call - (a.wa + a.call))
        .slice(0, 15),
      funil: funil.map((f) => ({ ...f, taxa: pct(f.sessoes, base) })),

      totalWa: rows.filter((r) => r.event_type === "wa_click").length,
      totalCall: rows.filter((r) => r.event_type === "call_click").length,
      totalEventos: rows.length,
    };
  }, [rows]);

  /**
   * Exportação CSV por página e serviço, com UTMs, etapa do funil e taxa por
   * sessão móvel — o mesmo recorte exibido na tela, sem dado pessoal.
   */
  const exportarCsv = useCallback(() => {
    const porChave = new Map<
      string,
      {
        path: string; servico: string; utm_source: string; utm_medium: string;
        utm_campaign: string; etapa: string; variante: string;
        wa: number; call: number; sessoesMobile: Set<string>; waMobile: Set<string>;
      }
    >();
    for (const r of rows) {
      const chave = [r.path, r.servico, r.utm_source, r.utm_medium, r.utm_campaign, r.funnel_stage, r.variant].join("|");
      const linha = porChave.get(chave) ?? {
        path: r.path || "sem-rota",
        servico: r.servico || "nao-informado",
        utm_source: r.utm_source || "",
        utm_medium: r.utm_medium || "",
        utm_campaign: r.utm_campaign || "",
        etapa: r.funnel_stage || "cta_click",
        variante: r.variant || "controle",
        wa: 0, call: 0, sessoesMobile: new Set<string>(), waMobile: new Set<string>(),
      };
      if (r.event_type === "wa_click") linha.wa += 1;
      if (r.event_type === "call_click") linha.call += 1;
      const vp = r.viewport_bucket || "desconhecido";
      if (vp !== "desktop" && vp !== "desconhecido") {
        const sid = r.session_id || r.created_at;
        linha.sessoesMobile.add(sid);
        if (r.event_type === "wa_click") linha.waMobile.add(sid);
      }
      porChave.set(chave, linha);
    }

    const cabecalho = [
      "path", "servico", "utm_source", "utm_medium", "utm_campaign",
      "funnel_stage", "variante", "wa_clicks", "call_clicks",
      "sessoes_mobile", "taxa_wa_sessao_mobile_pct",
    ];
    const escapar = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const linhas = [...porChave.values()].map((l) =>
      [
        l.path, l.servico, l.utm_source, l.utm_medium, l.utm_campaign, l.etapa, l.variante,
        l.wa, l.call, l.sessoesMobile.size, pct(l.waMobile.size, l.sessoesMobile.size),
      ].map(escapar).join(","),
    );
    const csv = [cabecalho.join(","), ...linhas].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `conversao_${inicio}_a_${fim}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [rows, inicio, fim]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden />
      </div>
    );
  }
  if (!session) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 text-center text-muted-foreground">
        Acesso restrito a administradores.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <Helmet>
        <title>Conversão por CTA | Painel interno</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          Conversão por CTA e etapas do funil
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Recortes por rota, posição do CTA, faixa de viewport, origem/UTM e variação de copy.
        </p>
      </header>

      <Card className="mb-6 grid gap-3 p-4 md:grid-cols-6">
        <div className="flex gap-1" role="group" aria-label="Período rápido">
          {[7, 30, 90].map((d) => (
            <Button
              key={d}
              size="sm"
              variant={inicio === hojeMenos(d - 1) && fim === hojeMenos(0) ? "default" : "outline"}
              onClick={() => {
                setInicio(hojeMenos(d - 1));
                setFim(hojeMenos(0));
              }}
            >
              {d}d
            </Button>
          ))}
        </div>
        <Input type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} aria-label="Data inicial" />
        <Input type="date" value={fim} onChange={(e) => setFim(e.target.value)} aria-label="Data final" />
        <Select value={rota} onValueChange={setRota}>
          <SelectTrigger aria-label="Rota"><SelectValue /></SelectTrigger>
          <SelectContent>
            {ROTAS_FOCO.map((r) => (
              <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={viewport} onValueChange={setViewport}>
          <SelectTrigger aria-label="Viewport"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os viewports</SelectItem>
            <SelectItem value="360">360 px</SelectItem>
            <SelectItem value="390">390 px</SelectItem>
            <SelectItem value="430">430 px</SelectItem>
            <SelectItem value="desktop">Desktop</SelectItem>
          </SelectContent>
        </Select>
        <Select value={origem} onValueChange={setOrigem}>
          <SelectTrigger aria-label="Origem"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as origens</SelectItem>
            <SelectItem value="organic">Orgânico</SelectItem>
            <SelectItem value="paid">Pago</SelectItem>
            <SelectItem value="direct">Direto</SelectItem>
            <SelectItem value="referral">Referência</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => void carregar()} disabled={loading} className="gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <RefreshCw className="h-4 w-4" aria-hidden />}
          Atualizar
        </Button>
        <Button variant="outline" onClick={exportarCsv} disabled={rows.length === 0} className="gap-2">
          <Download className="h-4 w-4" aria-hidden />
          Exportar CSV
        </Button>
        <Button
          variant={aoVivo ? "default" : "outline"}
          onClick={() => setAoVivo((v) => !v)}
          className="gap-2"
          aria-pressed={aoVivo}
        >
          <span
            className={`h-2 w-2 rounded-full ${aoVivo ? "motion-status-live bg-[hsl(var(--accent))]" : "bg-muted-foreground"}`}
            aria-hidden
          />
          {aoVivo ? "Ao vivo" : "Pausado"}
        </Button>
      </Card>

      {loading && agregados.totalEventos === 0 ? (
        <div role="status" aria-live="polite" className="mb-6 space-y-4">
          <span className="sr-only">Carregando dados de conversão…</span>
          <div className="grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="space-y-3 p-4">
                <div className="skel skel-line w-1/2" />
                <div className="skel skel-title w-1/3" />
              </Card>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-4"><div className="skel h-48 w-full" /></Card>
            <Card className="p-4"><div className="skel h-48 w-full" /></Card>
          </div>
        </div>
      ) : null}

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Cliques em WhatsApp</p>
          <p className="font-heading text-2xl font-bold text-foreground">{agregados.totalWa}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Cliques em ligação</p>
          <p className="font-heading text-2xl font-bold text-foreground">{agregados.totalCall}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Eventos no período</p>
          <p className="font-heading text-2xl font-bold text-foreground">{agregados.totalEventos}</p>
          {ultimoEvento && (
            <p className="mt-1 text-xs text-muted-foreground">Último evento ao vivo: {ultimoEvento}</p>
          )}
        </Card>
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-4">
          <h2 className="mb-3 font-heading text-lg font-bold text-foreground">Cliques por horário</h2>
          <ul className="flex h-40 items-end gap-1" aria-label="Cliques por hora do dia">
            {agregados.porHora.map((h, i) => {
              const total = h.wa + h.call;
              return (
                <li key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
                  <div
                    className="w-full rounded-t bg-[hsl(var(--accent))]"
                    style={{ height: `${Math.round((total / agregados.picoHora) * 100)}%` }}
                    title={`${i}h — ${h.wa} WhatsApp / ${h.call} ligação`}
                  />
                  <span className="text-[10px] text-muted-foreground">{i % 3 === 0 ? i : ""}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">Hora local do navegador. Pico: {agregados.picoHora} cliques.</p>
        </Card>

        <Card className="p-4">
          <h2 className="mb-3 font-heading text-lg font-bold text-foreground">Cliques por serviço</h2>
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-muted-foreground">
              <tr><th className="py-1">Serviço</th><th>WhatsApp</th><th>Ligação</th></tr>
            </thead>
            <tbody>
              {agregados.porServico.map((s) => (
                <tr key={s.servico} className="border-t border-border">
                  <td className="py-1.5 pr-2 text-foreground">{s.servico}</td>
                  <td>{s.wa}</td>
                  <td>{s.call}</td>
                </tr>
              ))}
              {agregados.porServico.length === 0 && (
                <tr><td colSpan={3} className="py-3 text-muted-foreground">Sem dados no período.</td></tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>


      <Card className="mb-6 p-4">
        <h2 className="mb-3 font-heading text-lg font-bold text-foreground">Funil por etapa</h2>
        <ul className="space-y-2">
          {agregados.funil.map((f) => (
            <li key={f.id} className="flex items-center gap-3">
              <span className="w-40 shrink-0 text-sm text-muted-foreground">{f.label}</span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-[hsl(var(--accent))]" style={{ width: `${f.taxa}%` }} />
              </div>
              <span className="w-24 text-right text-sm font-semibold text-foreground">
                {f.sessoes} · {f.taxa}%
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Autorização e execução são lançadas pela operação; etapas zeradas indicam desistência antes do registro.
        </p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-4">
          <h2 className="mb-3 font-heading text-lg font-bold text-foreground">Conversão por posição de CTA</h2>
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-muted-foreground">
              <tr><th className="py-1">Posição</th><th>WhatsApp</th><th>Ligação</th></tr>
            </thead>
            <tbody>
              {agregados.porCta.map(([cta, v]) => (
                <tr key={cta} className="border-t border-border">
                  <td className="py-1.5 pr-2 text-foreground">{cta}</td>
                  <td>{v.wa}</td>
                  <td>{v.call}</td>
                </tr>
              ))}
              {agregados.porCta.length === 0 && (
                <tr><td colSpan={3} className="py-3 text-muted-foreground">Sem eventos no período.</td></tr>
              )}
            </tbody>
          </table>
        </Card>

        <Card className="p-4">
          <h2 className="mb-3 font-heading text-lg font-bold text-foreground">Por faixa de viewport</h2>
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-muted-foreground">
              <tr><th className="py-1">Viewport</th><th>WhatsApp</th><th>Ligação</th><th>Eventos</th></tr>
            </thead>
            <tbody>
              {agregados.porViewport.map(([vp, v]) => (
                <tr key={vp} className="border-t border-border">
                  <td className="py-1.5 pr-2 text-foreground">{vp}</td>
                  <td>{v.wa}</td>
                  <td>{v.call}</td>
                  <td>{v.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-4">
          <h2 className="mb-3 font-heading text-lg font-bold text-foreground">Por origem / UTM</h2>
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-muted-foreground">
              <tr><th className="py-1">Origem</th><th>WhatsApp</th><th>Ligação</th><th>Eventos</th></tr>
            </thead>
            <tbody>
              {agregados.porOrigem.map(([o, v]) => (
                <tr key={o} className="border-t border-border">
                  <td className="py-1.5 pr-2 text-foreground">{o}</td>
                  <td>{v.wa}</td>
                  <td>{v.call}</td>
                  <td>{v.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-4 lg:col-span-2">
          <h2 className="mb-3 font-heading text-lg font-bold text-foreground">
            Conversão por página / serviço
          </h2>
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-muted-foreground">
              <tr>
                <th className="py-1">Rota</th><th>WhatsApp</th><th>Ligação</th>
                <th>Sessões mobile</th><th>Taxa mobile</th>
              </tr>
            </thead>
            <tbody>
              {agregados.porPagina.map((p) => (
                <tr key={p.rota} className="border-t border-border">
                  <td className="py-1.5 pr-2 text-foreground">{p.rota}</td>
                  <td>{p.wa}</td>
                  <td>{p.call}</td>
                  <td>{p.sessoesMobile}</td>
                  <td className="font-semibold">{p.taxaMobile}%</td>
                </tr>
              ))}
              {agregados.porPagina.length === 0 && (
                <tr><td colSpan={5} className="py-3 text-muted-foreground">Sem eventos no período.</td></tr>
              )}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-muted-foreground">
            Taxa mobile = sessões móveis com clique em WhatsApp ÷ sessões móveis com evento na rota.
          </p>
        </Card>

        <Card className="p-4 lg:col-span-2">
          <h2 className="mb-1 font-heading text-lg font-bold text-foreground">
            A/B do CTA — comparação e recomendação
          </h2>
          <p className="mb-3 text-xs text-muted-foreground">
            Taxas calculadas por sessão exposta (não por evento) e já livres de cliques duplicados.
          </p>
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-muted-foreground">
              <tr>
                <th className="py-1">Variação</th><th>Sessões</th><th>WhatsApp</th>
                <th>Taxa WhatsApp</th><th>Ligações</th><th>Taxa ligações</th>
              </tr>
            </thead>
            <tbody>
              {agregados.ab.map((v) => (
                <tr key={v.variante} className="border-t border-border">
                  <td className="py-1.5 pr-2"><Badge variant="secondary">{v.variante}</Badge></td>
                  <td>{v.sessoes}</td>
                  <td>{v.wa}</td>
                  <td className="font-semibold">{v.taxaWa}%</td>
                  <td>{v.call}</td>
                  <td>{v.taxaCall}%</td>
                </tr>
              ))}
              {agregados.ab.length === 0 && (
                <tr><td colSpan={6} className="py-3 text-muted-foreground">Sem eventos no período.</td></tr>
              )}
            </tbody>
          </table>

          <h3 className="mb-2 mt-5 font-heading text-sm font-bold text-foreground">
            Recomendação por etapa do funil
          </h3>
          <ul className="space-y-2 text-sm">
            {agregados.abEtapa.map((e) => (
              <li key={e.etapa} className="border-t border-border pt-2">
                <p className="font-semibold text-foreground">{e.etapa}</p>
                <p className="text-muted-foreground">{e.recomendacao}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Critério de decisão: mínimo de 30 sessões na variação líder e vantagem de 3 pontos
            percentuais sobre a segunda. Abaixo disso o resultado é tratado como inconclusivo.
          </p>
        </Card>

        <Card className="p-4">
          <h2 className="mb-3 font-heading text-lg font-bold text-foreground">Experimento de clareza</h2>
          <ul className="space-y-2 text-sm">
            {agregados.porVariante.map(([v, dados]) => (
              <li key={v} className="flex items-center justify-between border-t border-border py-1.5 first:border-0">
                <Badge variant="secondary">{v}</Badge>
                <span className="text-muted-foreground">
                  {dados.wa} WhatsApp em {dados.view} eventos · {pct(dados.wa, dados.view)}%
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <FunilRodada6 rows={rows as unknown as EventoRodada6[]} />

      <div className="mt-6 space-y-6">
        <PainelExperimentosCro rows={rows as unknown as EventoExperimento[]} />
        <PainelReadinessExperimento rows={rows as unknown as EventoReadiness[]} />
        <JornadaSankey

          rows={rows as unknown as EventoOportunidade[]}
          leads={leads}
          osIntegrada={osVinculada}
          inicioCarregado={inicio}
        />

        <RelatorioOportunidade rows={rows as unknown as EventoOportunidade[]} periodo={`${inicio} a ${fim}`} />
        <QualidadeDados rows={rows as unknown as EventoQualidade[]} />
        <AquisicaoReal rows={rows} />
        <SegmentacaoCanal rows={rows} />

        <RelatoriosConversao rows={rows as unknown as EventoRodada6[]} />
        <p className="text-xs text-muted-foreground">
          Auditoria de tráfego de teste em{" "}
          <a className="underline" href="/admin/qa-trafego">
            /admin/qa-trafego
          </a>
          .
        </p>
      </div>


    </main>
  );
};

export default AdminConversao;
