import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Download, Loader2, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAdminRoles } from "@/hooks/useAdminRoles";
import { lerAuditoria, registrarAuditoria, type AuditRow } from "@/lib/adminAudit";
import { exportarCsv, exportarJson } from "@/lib/exportarRelatorio";

/**
 * PAINEL DE REVISÃO DE FOTOS REAIS (Onda 30 + fluxo de status da Onda 31).
 *
 * Lê `public/photo-review.json` (preview, hash, bytes, EXIF, crédito e rotas)
 * e mantém no banco o estado de cada foto no fluxo
 * rascunho → em revisão → aprovado → publicado, com aprovação em lote,
 * permissões por perfil (revisor move até "aprovado"; só admin publica) e log
 * de auditoria de tudo que foi alterado. Nenhuma imagem de IA entra aqui.
 */

type Foto = {
  slug: string;
  src: string;
  alt: string;
  autor: string;
  licenca: string;
  bytes: number;
  hash: string;
  exif: string | null;
  exifSuspeito: boolean;
  rotas: string[];
  reuso: boolean;
};

type Review = {
  generatedAt: string;
  totalFotos: number;
  comReuso: number;
  fotos: Foto[];
  paginasSemFotoReal: string[];
  paginasSemImagem: string[];
  erros: string[];
};

type GateLinha = { gate: string; severidade: string; pagina: string; detalhe: string; score?: number };
type GateReport = { generatedAt: string; resumo: Record<string, unknown>; linhas: GateLinha[] };

type Status = "rascunho" | "em_revisao" | "aprovado" | "publicado";

const FLUXO: Status[] = ["rascunho", "em_revisao", "aprovado", "publicado"];
const ROTULO: Record<Status, string> = {
  rascunho: "Rascunho",
  em_revisao: "Em revisão",
  aprovado: "Aprovado",
  publicado: "Publicado",
};

const kb = (n: number) => `${Math.round(n / 1024)} KB`;

const AdminFotos = () => {
  const { loading: authLoading, session, isAdmin, isRevisor, perfil } = useAdminRoles();
  const [dados, setDados] = useState<Review | null>(null);
  const [gates, setGates] = useState<GateReport | null>(null);
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [auditoria, setAuditoria] = useState<AuditRow[]>([]);
  const [selecao, setSelecao] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Status | "todos">("todos");

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const [rev, gt] = await Promise.all([
        fetch(`/photo-review.json?t=${Date.now()}`, { cache: "no-store" }),
        fetch(`/gates-report.json?t=${Date.now()}`, { cache: "no-store" }),
      ]);
      if (!rev.ok) throw new Error(`HTTP ${rev.status}`);
      setDados((await rev.json()) as Review);
      setGates(gt.ok ? ((await gt.json()) as GateReport) : null);
    } catch (e) {
      setErro(
        `Não foi possível ler o dossiê (${(e as Error).message}). Rode "npm run report:photo-review".`,
      );
    }
    const { data } = await supabase.from("photo_review_items").select("hash,status");
    const mapa: Record<string, Status> = {};
    for (const r of data ?? []) mapa[r.hash as string] = r.status as Status;
    setStatus(mapa);
    setAuditoria(await lerAuditoria("admin/fotos"));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isRevisor) void carregar();
  }, [isRevisor, carregar]);

  const statusDe = useCallback((hash: string): Status => status[hash] ?? "rascunho", [status]);

  const aplicarStatus = useCallback(
    async (fotos: Foto[], novo: Status) => {
      if (!fotos.length) return;
      if (novo === "publicado" && !isAdmin) {
        toast({
          title: "Permissão insuficiente",
          description: "Somente administradores publicam fotos aprovadas.",
          variant: "destructive",
        });
        return;
      }
      const bloqueadas = fotos.filter((f) => f.exifSuspeito);
      if (bloqueadas.length && novo !== "rascunho") {
        toast({
          title: "Foto bloqueada",
          description: `${bloqueadas.length} foto(s) com assinatura de IA no EXIF não avançam no fluxo.`,
          variant: "destructive",
        });
        return;
      }
      setSalvando(true);
      const { data: u } = await supabase.auth.getUser();
      const { error } = await supabase.from("photo_review_items").upsert(
        fotos.map((f) => ({
          hash: f.hash,
          slug: f.slug,
          status: novo,
          updated_by: u.user?.id,
        })),
        { onConflict: "hash" },
      );
      setSalvando(false);
      if (error) {
        toast({ title: "Falha ao salvar", description: error.message, variant: "destructive" });
        return;
      }
      setStatus((prev) => {
        const next = { ...prev };
        for (const f of fotos) next[f.hash] = novo;
        return next;
      });
      await registrarAuditoria({
        area: "admin/fotos",
        action: `status:${novo}`,
        target: fotos.length === 1 ? fotos[0].slug : `${fotos.length} fotos`,
        details: { slugs: fotos.map((f) => f.slug), perfil },
      });
      setAuditoria(await lerAuditoria("admin/fotos"));
      toast({ title: "Status atualizado", description: `${fotos.length} foto(s) em "${ROTULO[novo]}".` });
    },
    [isAdmin, perfil],
  );

  const fotos = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return (dados?.fotos ?? []).filter(
      (f) =>
        (!termo || f.slug.includes(termo) || f.alt.toLowerCase().includes(termo)) &&
        (filtro === "todos" || statusDe(f.hash) === filtro),
    );
  }, [dados, busca, filtro, statusDe]);

  const selecionadas = useMemo(() => fotos.filter((f) => selecao[f.hash]), [fotos, selecao]);

  const contagem = useMemo(() => {
    const base: Record<Status, number> = { rascunho: 0, em_revisao: 0, aprovado: 0, publicado: 0 };
    for (const f of dados?.fotos ?? []) base[statusDe(f.hash)] += 1;
    return base;
  }, [dados, statusDe]);

  const linhasExport = useMemo(
    () =>
      (dados?.fotos ?? []).map((f) => ({
        slug: f.slug,
        status: ROTULO[statusDe(f.hash)],
        hash: f.hash,
        bytes: f.bytes,
        licenca: f.licenca,
        autor: f.autor,
        exifSuspeito: f.exifSuspeito,
        rotas: f.rotas.join(" | "),
      })),
    [dados, statusDe],
  );

  const exportarGates = (formato: "csv" | "json") => {
    const linhas = gates?.linhas ?? [];
    if (!linhas.length && !gates) {
      toast({
        title: "Relatório dos gates ausente",
        description: 'Rode "npm run report:gates" após o build para gerar o consolidado.',
        variant: "destructive",
      });
      return;
    }
    if (formato === "csv") exportarCsv("gates-qualidade", linhas);
    else exportarJson("gates-qualidade", gates);
    void registrarAuditoria({ area: "admin/fotos", action: `export:gates-${formato}`, details: { total: linhas.length } });
  };

  if (authLoading) {
    return (
      <div className="container mx-auto max-w-6xl space-y-4 px-4 py-8">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-64 w-full" />
        <span className="sr-only">Carregando painel de fotos</span>
      </div>
    );
  }
  if (!session || !isRevisor) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Revisão de fotos reais | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className="container mx-auto max-w-6xl px-4 py-8 animate-fade-in">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Fotos reais — fluxo de revisão</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Rascunho → em revisão → aprovado → publicado, com aprovação em lote e log de auditoria.
              {dados ? ` Dossiê gerado em ${new Date(dados.generatedAt).toLocaleString("pt-BR")}.` : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <Badge variant="outline" className="gap-1">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              Perfil: {perfil === "admin" ? "Administrador" : "Revisor"}
            </Badge>
            <label className="text-xs text-muted-foreground">
              Buscar
              <Input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="slug ou legenda" className="mt-1" />
            </label>
            <Button variant="outline" onClick={() => void carregar()} disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
              Atualizar
            </Button>
          </div>
        </header>

        {erro && (
          <Card className="mt-6 border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">{erro}</Card>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FLUXO.map((s) => (
            <Card key={s} className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{ROTULO[s]}</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{contagem[s]}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-6 flex flex-wrap items-center gap-2 p-4">
          <span className="text-sm text-muted-foreground">
            {selecionadas.length ? `${selecionadas.length} selecionada(s)` : "Selecione fotos para agir em lote"}
          </span>
          {FLUXO.map((s) => (
            <Button
              key={s}
              size="sm"
              variant={s === "publicado" ? "default" : "outline"}
              disabled={!selecionadas.length || salvando || (s === "publicado" && !isAdmin)}
              onClick={() => void aplicarStatus(selecionadas, s)}
            >
              {salvando && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              Mover para {ROTULO[s]}
            </Button>
          ))}
          <div className="ml-auto flex flex-wrap gap-2">
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value as Status | "todos")}
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              aria-label="Filtrar por status"
            >
              <option value="todos">Todos os status</option>
              {FLUXO.map((s) => (
                <option key={s} value={s}>
                  {ROTULO[s]}
                </option>
              ))}
            </select>
            <Button size="sm" variant="outline" onClick={() => exportarCsv("fotos-revisao", linhasExport)}>
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Fotos CSV
            </Button>
            <Button size="sm" variant="outline" onClick={() => exportarGates("csv")}>
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Gates CSV
            </Button>
            <Button size="sm" variant="outline" onClick={() => exportarGates("json")}>
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Gates JSON
            </Button>
          </div>
        </Card>

        {gates && (
          <p className="mt-3 text-xs text-muted-foreground">
            Gates: {gates.linhas.filter((l) => l.severidade === "bloqueio").length} bloqueio(s) ·{" "}
            {gates.linhas.filter((l) => l.severidade === "aviso").length} aviso(s) ·{" "}
            {gates.linhas.filter((l) => l.severidade === "pendencia").length} pendência(s) — snapshot de{" "}
            {new Date(gates.generatedAt).toLocaleString("pt-BR")}.
          </p>
        )}

        {loading && !dados && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Skeleton className="h-56 w-full" />
            <Skeleton className="h-56 w-full" />
          </div>
        )}

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {fotos.map((f) => {
            const atual = statusDe(f.hash);
            return (
              <Card key={f.slug} className="overflow-hidden">
                <img
                  src={f.src}
                  alt={f.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/2] w-full object-cover"
                />
                <div className="space-y-2 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={!!selecao[f.hash]}
                        onCheckedChange={(v) => setSelecao((p) => ({ ...p, [f.hash]: v === true }))}
                        aria-label={`Selecionar ${f.slug}`}
                      />
                      <span className="font-heading text-base font-semibold text-foreground">{f.slug}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <Badge variant={atual === "publicado" ? "default" : "outline"}>{ROTULO[atual]}</Badge>
                      <Badge variant="outline">{kb(f.bytes)}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{f.alt}</p>
                  <p className="text-xs text-muted-foreground">
                    Foto: {f.autor} · {f.licenca} · hash {f.hash}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    EXIF: {f.exif ? f.exif.slice(0, 120) : "sem EXIF legível"}
                    {f.exifSuspeito && <span className="text-destructive"> — assinatura de IA detectada</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Rotas: {f.rotas.length ? f.rotas.join(", ") : "nenhuma"}
                    {f.reuso && <span className="text-amber-600"> · reuso entre rotas</span>}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {FLUXO.map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={atual === s ? "default" : "outline"}
                        disabled={salvando || (s === "publicado" && !isAdmin)}
                        onClick={() => void aplicarStatus([f], s)}
                      >
                        {ROTULO[s]}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </section>

        <section className="mt-8">
          <h2 className="font-heading text-lg font-semibold text-foreground">Páginas indexáveis sem foto real</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Prioridade da próxima onda fotográfica — nenhuma imagem gerada por IA é aceita.
          </p>
          <ul className="mt-3 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
            {(dados?.paginasSemFotoReal ?? []).map((p) => (
              <li key={p} className="truncate">
                {p}
              </li>
            ))}
            {!dados?.paginasSemFotoReal.length && <li>Nenhuma pendência registrada no último build.</li>}
          </ul>
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">Log de auditoria</h2>
            <Button size="sm" variant="outline" onClick={() => exportarCsv("auditoria-fotos", auditoria)}>
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Exportar CSV
            </Button>
          </div>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {auditoria.map((a) => (
              <li key={a.id}>
                {new Date(a.created_at).toLocaleString("pt-BR")} · {a.actor_email ?? "usuário"} · {a.action}
                {a.target ? ` · ${a.target}` : ""}
              </li>
            ))}
            {!auditoria.length && <li>Nenhuma alteração registrada ainda.</li>}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminFotos;
