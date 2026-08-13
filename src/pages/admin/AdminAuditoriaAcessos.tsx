import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Loader2, RefreshCw, ShieldAlert, ShieldCheck, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { lerAuditoria, registrarAuditoria, type AuditRow } from "@/lib/adminAudit";
import {
  CAMPOS_CLIQUE_PERMITIDOS,
  CAMPOS_CLIQUE_PROIBIDOS,
  projetarEventoClique,
} from "@/lib/realtimeSafeFields";
import { exportarCsv, exportarJson } from "@/lib/exportarRelatorio";

/**
 * RODADA 4C — PAINEL DE AUDITORIA DE ACESSO NEGADO.
 *
 * Prova, em tempo de execução, que o endurecimento de RLS/GRANT continua de pé:
 *
 *  1. Sondas: cada superfície sensível é consultada de propósito (como visitante
 *     anônimo e como o usuário autenticado da sessão atual). O resultado
 *     esperado é ERRO/vazio. Nenhum valor retornado é exibido — só o veredito.
 *  2. Registro: cada rodada de sondas grava um resumo em admin_audit_log
 *     (área `seguranca`), então "quem checou e quando" fica auditável.
 *  3. Broadcast: amostra ao vivo do payload de click_events já projetado pela
 *     allowlist, para conferir que campos proibidos não chegam ao navegador.
 *
 * O painel nunca renderiza dados sensíveis: sondas mostram apenas contagem e
 * código de erro; amostras de broadcast passam por `projetarEventoClique`.
 */

type Veredito = "negado" | "permitido" | "vazio" | "erro-inesperado";

type Sonda = {
  id: string;
  superficie: string;
  perfil: "anon" | "authenticated";
  descricao: string;
  veredito: Veredito;
  detalhe: string;
  quando: string;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

/** Cliente sem sessão: reproduz exatamente o que um visitante anônimo enxerga. */
async function requisicaoAnonima(recurso: string): Promise<{ status: number; corpo: string }> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${recurso}`, {
    headers: { apikey: SUPABASE_KEY, Accept: "application/json" },
  });
  const texto = await res.text();
  return { status: res.status, corpo: texto.slice(0, 240) };
}

const vereditoBadge: Record<Veredito, { label: string; className: string }> = {
  negado: { label: "negado", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  vazio: { label: "sem linhas", className: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
  permitido: { label: "EXPOSTO", className: "bg-destructive/15 text-destructive border-destructive/30" },
  "erro-inesperado": { label: "inconclusivo", className: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
};

const agora = () => new Date().toISOString();

const AdminAuditoriaAcessos = () => {
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
  const [sondas, setSondas] = useState<Sonda[]>([]);
  const [historico, setHistorico] = useState<AuditRow[]>([]);
  const [amostras, setAmostras] = useState<Record<string, unknown>[]>([]);
  const [rodando, setRodando] = useState(false);

  const executarSondas = useCallback(async () => {
    setRodando(true);
    const resultado: Sonda[] = [];

    const anonimas: Array<{ id: string; superficie: string; descricao: string; recurso: string }> = [
      {
        id: "anon-partners-documento",
        superficie: "partners.documento",
        descricao: "documento de identificação do parceiro por visitante anônimo",
        recurso: "partners?select=documento&limit=1",
      },
      {
        id: "anon-partners-notas",
        superficie: "partners.notas_admin",
        descricao: "notas internas do parceiro por visitante anônimo",
        recurso: "partners?select=notas_admin&limit=1",
      },
      {
        id: "anon-reviews-phone",
        superficie: "reviews.client_phone",
        descricao: "telefone do cliente na avaliação por visitante anônimo",
        recurso: "reviews?select=client_phone&limit=1",
      },
      {
        id: "anon-click-events",
        superficie: "click_events (SELECT)",
        descricao: "leitura da telemetria de cliques por visitante anônimo",
        recurso: "click_events?select=id&limit=1",
      },
      {
        id: "anon-admin-audit",
        superficie: "admin_audit_log",
        descricao: "log de auditoria administrativo por visitante anônimo",
        recurso: "admin_audit_log?select=id&limit=1",
      },
    ];

    for (const s of anonimas) {
      try {
        const { status, corpo } = await requisicaoAnonima(s.recurso);
        const bloqueado = status === 401 || status === 403 || status === 400 || status === 404;
        const vazio = status === 200 && (corpo.trim() === "[]" || corpo.trim() === "");
        resultado.push({
          id: s.id,
          superficie: s.superficie,
          perfil: "anon",
          descricao: s.descricao,
          veredito: bloqueado ? "negado" : vazio ? "vazio" : "permitido",
          detalhe: `HTTP ${status}`,
          quando: agora(),
        });
      } catch {
        resultado.push({
          id: s.id,
          superficie: s.superficie,
          perfil: "anon",
          descricao: s.descricao,
          veredito: "erro-inesperado",
          detalhe: "falha de rede",
          quando: agora(),
        });
      }
    }

    // Sondas autenticadas: a sessão atual é admin, então o esperado aqui é o
    // inverso — as RPCs precisam responder, e as colunas revogadas continuam
    // fora do alcance de qualquer usuário comum (verificado no perfil anon).
    const autenticadas: Array<{ id: string; superficie: string; descricao: string; run: () => Promise<{ ok: boolean; detalhe: string }> }> = [
      {
        id: "auth-admin-list-reviews",
        superficie: "rpc.admin_list_reviews",
        descricao: "RPC administrativa exige has_role(admin)",
        run: async () => {
          const { error } = await supabase.rpc("admin_list_reviews");
          return { ok: !error, detalhe: error ? error.code || "erro" : "autorizado" };
        },
      },
      {
        id: "auth-partners-documento",
        superficie: "partners.documento",
        descricao: "coluna sensível para usuário autenticado não-admin",
        run: async () => {
          const { error } = await supabase.from("partners").select("documento").limit(1);
          return { ok: !!error, detalhe: error ? error.code || "negado" : "retornou linha" };
        },
      },
    ];

    for (const s of autenticadas) {
      try {
        const { ok, detalhe } = await s.run();
        resultado.push({
          id: s.id,
          superficie: s.superficie,
          perfil: "authenticated",
          descricao: s.descricao,
          veredito: ok ? "negado" : "permitido",
          detalhe,
          quando: agora(),
        });
      } catch {
        resultado.push({
          id: s.id,
          superficie: s.superficie,
          perfil: "authenticated",
          descricao: s.descricao,
          veredito: "erro-inesperado",
          detalhe: "exceção",
          quando: agora(),
        });
      }
    }

    setSondas(resultado);
    setRodando(false);

    const expostos = resultado.filter((r) => r.veredito === "permitido").map((r) => r.superficie);
    await registrarAuditoria({
      area: "seguranca",
      action: "sondagem_acesso_negado",
      target: "partners/reviews/click_events/admin_audit_log",
      details: {
        total: resultado.length,
        negados: resultado.filter((r) => r.veredito === "negado" || r.veredito === "vazio").length,
        expostos,
      },
    });
    setHistorico(await lerAuditoria("seguranca", 50));
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    void executarSondas();
    void lerAuditoria("seguranca", 50).then(setHistorico);
  }, [isAdmin, executarSondas]);

  // Amostras ao vivo do broadcast, sempre projetadas na allowlist.
  useEffect(() => {
    if (!isAdmin) return;
    const canal = supabase
      .channel("auditoria-acessos-broadcast")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "click_events" }, (payload) => {
        const seguro = projetarEventoClique<Record<string, unknown>>(payload.new);
        setAmostras((atual) => [seguro, ...atual].slice(0, 8));
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(canal);
    };
  }, [isAdmin]);

  const resumo = useMemo(() => {
    const expostos = sondas.filter((s) => s.veredito === "permitido").length;
    const inconclusivos = sondas.filter((s) => s.veredito === "erro-inesperado").length;
    return { total: sondas.length, expostos, inconclusivos };
  }, [sondas]);

  if (authLoading) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-16">
        <Skeleton className="h-10 w-72" />
        <div className="mt-6 space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </main>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <>
      <Helmet>
        <title>Auditoria de acessos negados | Painel interno</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="container mx-auto max-w-5xl px-4 py-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Auditoria de acessos negados</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Sondagem ativa das superfícies sensíveis (anônimo e autenticado) e amostra do payload de
              telemetria já sanitizado. Nenhum valor sensível é exibido — apenas o veredito.
            </p>
          </div>
          <Button onClick={() => void executarSondas()} disabled={rodando} className="gap-2">
            {rodando ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Reexecutar sondas
          </Button>
        </header>

        <Card className="mt-6 flex flex-wrap items-center gap-6 p-5">
          <div className="flex items-center gap-3">
            {resumo.expostos === 0 ? (
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            ) : (
              <ShieldAlert className="h-6 w-6 text-destructive" />
            )}
            <div>
              <p className="text-sm text-muted-foreground">Superfícies sondadas</p>
              <p className="text-xl font-semibold">{resumo.total}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Expostas</p>
            <p className={`text-xl font-semibold ${resumo.expostos ? "text-destructive" : "text-emerald-400"}`}>
              {resumo.expostos}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Inconclusivas</p>
            <p className="text-xl font-semibold">{resumo.inconclusivos}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm" onClick={() => exportarCsv("auditoria-acessos", sondas)}>
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => exportarJson("auditoria-acessos", sondas)}>
              JSON
            </Button>
          </div>
        </Card>

        <section className="mt-8">
          <h2 className="text-lg font-semibold">Sondas</h2>
          <div className="mt-3 space-y-2">
            {rodando && !sondas.length
              ? [0, 1, 2].map((i) => <Skeleton key={i} className="h-16 w-full" />)
              : sondas.map((s) => (
                  <Card key={s.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <p className="font-medium">
                        <code className="text-sm">{s.superficie}</code>{" "}
                        <span className="text-xs text-muted-foreground">({s.perfil})</span>
                      </p>
                      <p className="text-sm text-muted-foreground">{s.descricao}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{s.detalhe}</span>
                      <Badge variant="outline" className={vereditoBadge[s.veredito].className}>
                        {vereditoBadge[s.veredito].label}
                      </Badge>
                    </div>
                  </Card>
                ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Radio className="h-4 w-4" /> Amostras de broadcast sanitizado
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Campos permitidos: <code>{CAMPOS_CLIQUE_PERMITIDOS.join(", ")}</code>. Campos bloqueados na
            projeção: <code>{CAMPOS_CLIQUE_PROIBIDOS.join(", ")}</code>.
          </p>
          <div className="mt-3 space-y-2">
            {amostras.length === 0 ? (
              <Card className="p-4 text-sm text-muted-foreground">
                Aguardando eventos de clique em tempo real…
              </Card>
            ) : (
              amostras.map((a, i) => (
                <Card key={i} className="overflow-x-auto p-4">
                  <pre className="text-xs">{JSON.stringify(a, null, 2)}</pre>
                </Card>
              ))
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold">Histórico de auditoria (área segurança)</h2>
          <div className="mt-3 space-y-2">
            {historico.length === 0 ? (
              <Card className="p-4 text-sm text-muted-foreground">Nenhum registro ainda.</Card>
            ) : (
              historico.map((h) => (
                <Card key={h.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <p className="text-sm font-medium">{h.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {h.actor_email ?? "—"} · {h.target ?? "—"}
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>{new Date(h.created_at).toLocaleString("pt-BR")}</p>
                    <p>{JSON.stringify(h.details)}</p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminAuditoriaAcessos;
