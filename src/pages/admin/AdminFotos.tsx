import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CheckCircle2, Loader2, RefreshCw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminAuth } from "@/hooks/useAdminAuth";

/**
 * PAINEL DE REVISÃO DE FOTOS REAIS (Onda 30).
 *
 * Lê `public/photo-review.json`, gerado por `scripts/report-photo-review.mjs`,
 * e mostra preview, hash, bytes, EXIF, crédito/licença e as rotas que usam
 * cada foto — além das páginas indexáveis que ainda estão sem fotografia real.
 * A aprovação fica registrada localmente (por hash) e serve de checklist antes
 * do deploy. Nenhuma imagem de IA entra no manifesto.
 */

type Foto = {
  slug: string;
  src: string;
  alt: string;
  autor: string;
  autorUrl: string;
  origem: string;
  licenca: string;
  licencaUrl: string;
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

const CHAVE = "admin:fotos-aprovadas";

const kb = (n: number) => `${Math.round(n / 1024)} KB`;

const AdminFotos = () => {
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
  const [dados, setDados] = useState<Review | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [aprovadas, setAprovadas] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      setAprovadas(JSON.parse(localStorage.getItem(CHAVE) ?? "{}"));
    } catch {
      setAprovadas({});
    }
  }, []);

  const alternar = (hash: string) => {
    setAprovadas((prev) => {
      const next = { ...prev, [hash]: !prev[hash] };
      try {
        localStorage.setItem(CHAVE, JSON.stringify(next));
      } catch {
        /* modo privado: aprovação só na sessão */
      }
      return next;
    });
  };

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const res = await fetch(`/photo-review.json?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setDados((await res.json()) as Review);
    } catch (e) {
      setErro(
        `Não foi possível ler o dossiê (${(e as Error).message}). Rode "npm run report:photo-review".`,
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) void carregar();
  }, [isAdmin, carregar]);

  const fotos = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return (dados?.fotos ?? []).filter(
      (f) => !termo || f.slug.includes(termo) || f.alt.toLowerCase().includes(termo),
    );
  }, [dados, busca]);

  const aprovadasCount = useMemo(
    () => (dados?.fotos ?? []).filter((f) => aprovadas[f.hash]).length,
    [dados, aprovadas],
  );

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
  if (!session || !isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Revisão de fotos reais | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className="container mx-auto max-w-6xl px-4 py-8 animate-fade-in">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Fotos reais — revisão e aprovação</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Preview, hash, EXIF e crédito de cada fotografia licenciada, mais as páginas que ainda
              não têm foto real.
              {dados ? ` Gerado em ${new Date(dados.generatedAt).toLocaleString("pt-BR")}.` : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-2">
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
          {[
            { rotulo: "Fotos no manifesto", valor: dados?.totalFotos ?? 0 },
            { rotulo: "Aprovadas por você", valor: aprovadasCount },
            { rotulo: "Com reuso entre rotas", valor: dados?.comReuso ?? 0 },
            { rotulo: "Páginas sem foto real", valor: dados?.paginasSemFotoReal.length ?? 0 },
          ].map((c) => (
            <Card key={c.rotulo} className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{c.rotulo}</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{c.valor}</p>
            </Card>
          ))}
        </div>

        {loading && !dados && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Skeleton className="h-56 w-full" />
            <Skeleton className="h-56 w-full" />
          </div>
        )}

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {fotos.map((f) => (
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
                  <h2 className="font-heading text-base font-semibold text-foreground">{f.slug}</h2>
                  <Badge variant="outline">{kb(f.bytes)}</Badge>
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
                <Button
                  size="sm"
                  variant={aprovadas[f.hash] ? "default" : "outline"}
                  onClick={() => alternar(f.hash)}
                  className="mt-1"
                >
                  {aprovadas[f.hash] ? (
                    <CheckCircle2 className="mr-2 h-4 w-4" aria-hidden="true" />
                  ) : (
                    <XCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                  )}
                  {aprovadas[f.hash] ? "Aprovada para deploy" : "Aprovar para deploy"}
                </Button>
              </div>
            </Card>
          ))}
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
      </main>
    </div>
  );
};

export default AdminFotos;
