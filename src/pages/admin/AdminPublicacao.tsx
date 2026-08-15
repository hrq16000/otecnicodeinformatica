import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "@/lib/router-compat";
import { Helmet } from "react-helmet";
import { CheckCircle2, Loader2, RefreshCw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminAuth } from "@/hooks/useAdminAuth";

/**
 * PAINEL DE PUBLICAÇÃO POR URL (Onda 27).
 *
 * Lê `public/publish-status.json`, gerado no build por
 * `scripts/report-publish-status.mjs`, e mostra, por rota:
 * rascunho, checklist de meta, fotos reais, originalidade e o estado final
 * (pronto · revisão · rascunho). É a decisão de "entra ou não na próxima onda
 * de sitemap" — nenhuma URL sobe sem estar verde aqui.
 */

type Checklist = {
  rascunho: boolean;
  conteudo: boolean;
  metaTitle: boolean;
  metaDescription: boolean;
  fotos: boolean;
  originalidade: boolean;
};

type Url = {
  path: string;
  url: string;
  grupo: string;
  title?: string;
  description?: string;
  similaridade: number;
  foto: string | null;
  checklist: Checklist;
  pendencias: string[];
  curada: boolean;
  estado: "pronto" | "revisao" | "rascunho" | "sem_meta_curada";
};

type Status = {
  generatedAt: string;
  total: number;
  prontos: number;
  revisao: number;
  rascunho: number;
  semMetaCurada: number;
  urls: Url[];
};

const ROTULO: Record<Url["estado"], string> = {
  pronto: "Pronto para sitemap",
  revisao: "Em revisão",
  rascunho: "Rascunho",
  sem_meta_curada: "Sem meta curada",
};

const COR: Record<Url["estado"], string> = {
  pronto: "bg-primary/15 text-primary border-primary/30",
  revisao: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  rascunho: "bg-muted text-muted-foreground border-border",
  sem_meta_curada: "bg-destructive/10 text-destructive border-destructive/30",
};

const ITENS: { chave: keyof Checklist; rotulo: string }[] = [
  { chave: "rascunho", rotulo: "Rascunho" },
  { chave: "conteudo", rotulo: "Conteúdo" },
  { chave: "metaTitle", rotulo: "Title" },
  { chave: "metaDescription", rotulo: "Description" },
  { chave: "fotos", rotulo: "Fotos reais" },
  { chave: "originalidade", rotulo: "Originalidade" },
];

const AdminPublicacao = () => {
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<"todos" | Url["estado"]>("todos");

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const res = await fetch(`/publish-status.json?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus((await res.json()) as Status);
    } catch (e) {
      setErro(
        `Não foi possível ler o status (${(e as Error).message}). Rode "npm run report:publish-status".`,
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) void carregar();
  }, [isAdmin, carregar]);

  const urls = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return (status?.urls ?? [])
      .filter((u) => (filtro === "todos" ? true : u.estado === filtro))
      .filter((u) => !termo || u.path.toLowerCase().includes(termo) || (u.title ?? "").toLowerCase().includes(termo))
      .sort((a, b) => a.path.localeCompare(b.path));
  }, [status, busca, filtro]);

  if (authLoading) {
    return (
      <div className="container mx-auto max-w-6xl space-y-4 px-4 py-8">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-64 w-full" />
        <span className="sr-only">Carregando painel de publicação</span>
      </div>
    );
  }
  if (!session || !isAdmin) return <Navigate to="/admin/login" replace />;

  const cards: { rotulo: string; valor: number; estado: Url["estado"] }[] = [
    { rotulo: "Prontos", valor: status?.prontos ?? 0, estado: "pronto" },
    { rotulo: "Em revisão", valor: status?.revisao ?? 0, estado: "revisao" },
    { rotulo: "Rascunho", valor: status?.rascunho ?? 0, estado: "rascunho" },
    { rotulo: "Sem meta curada", valor: status?.semMetaCurada ?? 0, estado: "sem_meta_curada" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Publicação por URL | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className="container mx-auto max-w-6xl px-4 py-8 animate-fade-in">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Status de publicação por URL
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Rascunho, checklist de meta, fotos reais e originalidade de cada rota antes de entrar
              na próxima onda de sitemap.
              {status ? ` Gerado em ${new Date(status.generatedAt).toLocaleString("pt-BR")}.` : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <label className="text-xs text-muted-foreground">
              Buscar
              <Input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="/problemas/…"
                className="mt-1"
              />
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
          <Card className="mt-6 border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
            {erro}
          </Card>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Card key={c.estado} className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{c.rotulo}</p>
              <p className="mt-1 font-heading text-2xl font-bold text-foreground">{c.valor}</p>
              <Button
                variant={filtro === c.estado ? "default" : "ghost"}
                size="sm"
                className="mt-2"
                onClick={() => setFiltro(filtro === c.estado ? "todos" : c.estado)}
              >
                {filtro === c.estado ? "Mostrando" : "Filtrar"}
              </Button>
            </Card>
          ))}
        </div>

        <section className="mt-8 space-y-3">
          {loading && !status && <Skeleton className="h-64 w-full" />}
          {urls.map((u) => (
            <Card key={u.path} className="p-4 transition-colors hover:border-primary/40">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-mono text-sm text-foreground">{u.path}</p>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                    {u.title ?? "sem title curado"}
                  </p>
                </div>
                <Badge variant="outline" className={COR[u.estado]}>
                  {ROTULO[u.estado]}
                </Badge>
              </div>

              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {ITENS.map((item) => {
                  const ok = u.checklist[item.chave];
                  return (
                    <li
                      key={item.chave}
                      className={`inline-flex items-center gap-1 text-xs ${ok ? "text-muted-foreground" : "text-destructive"}`}
                    >
                      {ok ? (
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      {item.rotulo}
                    </li>
                  );
                })}
                <li className="text-xs text-muted-foreground">
                  similaridade {(u.similaridade * 100).toFixed(0)}%
                </li>
              </ul>

              {u.pendencias.length > 0 && (
                <p className="mt-2 text-xs text-amber-600">Pendências: {u.pendencias.join(" · ")}</p>
              )}
            </Card>
          ))}
          {!loading && status && urls.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhuma URL neste filtro.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminPublicacao;
