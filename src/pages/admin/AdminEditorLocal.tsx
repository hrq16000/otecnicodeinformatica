import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "@/lib/router-compat";
import { Helmet } from "react-helmet";
import { AlertTriangle, CheckCircle2, Copy, Download, Loader2, RefreshCw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { useAdminRoles } from "@/hooks/useAdminRoles";
import { lerAuditoria, registrarAuditoria, type AuditRow } from "@/lib/adminAudit";
import { exportarCsv, exportarJson } from "@/lib/exportarRelatorio";
import {
  CLUSTERS,
  PADRAO,
  justificar,
  lerLimiares,
  salvarLimiares,
  type Cluster,
  type Limiar,
} from "@/lib/similaridadeConfig";

/**
 * EDITOR GUIADO DE TEXTO LOCAL (Onda 30 + limiares por cluster da Onda 31).
 *
 * Preenchimento assistido de contexto, sintomas, atendimento e casos por
 * cidade/bairro, com checklist de originalidade ANTES de publicar. O limiar de
 * similaridade agora é configurável por cluster (serviço × problema × bairro) e
 * cada bloqueio mostra score e justificativa do que precisa ser reescrito.
 * O editor não escreve no site — exporta JSON revisado, mantendo fail-closed.
 */

type UrlStatus = { path: string; title?: string; description?: string };

const CAMPOS = [
  { chave: "contexto", rotulo: "Contexto do bairro/cidade", minimo: 320, dica: "Referências reais: vias, perfil de moradores e comércio, deslocamento." },
  { chave: "sintomas", rotulo: "Sintomas mais frequentes na região", minimo: 280, dica: "O que aparece de fato nos chamados dessa área, com detalhe técnico." },
  { chave: "atendimento", rotulo: "Como é o atendimento aqui", minimo: 280, dica: "Modalidade indicada, janela de deslocamento e o que é feito na visita." },
  { chave: "casos", rotulo: "Casos reais atendidos", minimo: 280, dica: "Equipamento, sintoma, diagnóstico e desfecho — sem inventar nada." },
] as const;

type Chave = (typeof CAMPOS)[number]["chave"];
type Rascunho = { local: string; contexto: string; sintomas: string; atendimento: string; casos: string };

const VAZIO: Rascunho = { local: "", contexto: "", sintomas: "", atendimento: "", casos: "" };
const CHAVE_STORAGE = "admin:editor-local";

const normalizar = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const shingles = (t: string, n = 5) => {
  const w = normalizar(t).split(" ").filter(Boolean);
  const set = new Set<string>();
  for (let i = 0; i + n <= w.length; i += 1) set.add(w.slice(i, i + n).join(" "));
  return set;
};

const jaccard = (a: Set<string>, b: Set<string>) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const s of a) if (b.has(s)) inter += 1;
  return inter / (a.size + b.size - inter);
};

const AdminEditorLocal = () => {
  const { loading: authLoading, session, isRevisor, perfil } = useAdminRoles();
  const [rascunho, setRascunho] = useState<Rascunho>(VAZIO);
  const [publicados, setPublicados] = useState<UrlStatus[]>([]);
  const [cluster, setCluster] = useState<Cluster>("bairro");
  const [limiares, setLimiares] = useState<Record<Cluster, Limiar>>(PADRAO);
  const [auditoria, setAuditoria] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_STORAGE);
      if (salvo) setRascunho({ ...VAZIO, ...(JSON.parse(salvo) as Rascunho) });
    } catch {
      /* rascunho começa vazio */
    }
    setLimiares(lerLimiares());
  }, []);

  const atualizar = (chave: Chave | "local", valor: string) => {
    setRascunho((prev) => {
      const next = { ...prev, [chave]: valor };
      try {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(next));
      } catch {
        /* modo privado */
      }
      return next;
    });
  };

  const ajustarLimiar = (id: Cluster, campo: keyof Limiar, valor: number) => {
    setLimiares((prev) => {
      const next = { ...prev, [id]: { ...prev[id], [campo]: valor } };
      salvarLimiares(next);
      return next;
    });
  };

  const carregar = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/publish-status.json?t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const json = (await res.json()) as { urls?: UrlStatus[] };
        setPublicados(json.urls ?? []);
      }
    } catch {
      setPublicados([]);
    }
    setAuditoria(await lerAuditoria("admin/editor-local"));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isRevisor) void carregar();
  }, [isRevisor, carregar]);

  const limite = limiares[cluster] ?? PADRAO[cluster];
  const textoCompleto = CAMPOS.map((c) => rascunho[c.chave]).join(" ");

  const similaridadeExterna = useMemo(() => {
    const meu = shingles(textoCompleto);
    let pior = { path: "", score: 0 };
    for (const u of publicados) {
      const score = jaccard(meu, shingles(`${u.title ?? ""} ${u.description ?? ""}`));
      if (score > pior.score) pior = { path: u.path, score };
    }
    return pior;
  }, [textoCompleto, publicados]);

  const similaridadeInterna = useMemo(() => {
    let pior = { par: "", score: 0 };
    for (let i = 0; i < CAMPOS.length; i += 1) {
      for (let j = i + 1; j < CAMPOS.length; j += 1) {
        const score = jaccard(shingles(rascunho[CAMPOS[i].chave]), shingles(rascunho[CAMPOS[j].chave]));
        if (score > pior.score) pior = { par: `${CAMPOS[i].rotulo} × ${CAMPOS[j].rotulo}`, score };
      }
    }
    return pior;
  }, [rascunho]);

  const checklist = useMemo(() => {
    const itens: Array<{ rotulo: string; ok: boolean; score?: number; justificativa?: string }> = CAMPOS.map((c) => ({
      rotulo: `${c.rotulo} com ${c.minimo}+ caracteres`,
      ok: rascunho[c.chave].trim().length >= c.minimo,
    }));
    itens.push({ rotulo: "Nome do bairro/cidade preenchido", ok: rascunho.local.trim().length > 2 });
    const okExterno = similaridadeExterna.score < limite.externo;
    itens.push({
      rotulo: `Similaridade com páginas publicadas < ${limite.externo.toFixed(2)}`,
      ok: okExterno,
      score: similaridadeExterna.score,
      justificativa: okExterno
        ? undefined
        : justificar("externo", similaridadeExterna.score, limite.externo, similaridadeExterna.path || "página publicada"),
    });
    const okInterno = similaridadeInterna.score < limite.interno;
    itens.push({
      rotulo: `Blocos internos diferentes entre si (< ${limite.interno.toFixed(2)})`,
      ok: okInterno,
      score: similaridadeInterna.score,
      justificativa: okInterno
        ? undefined
        : justificar("interno", similaridadeInterna.score, limite.interno, similaridadeInterna.par || "blocos"),
    });
    itens.push({
      rotulo: "Sem promessa de prazo universal ou avaliação inventada",
      ok: !/30 minutos garantid|nota 5|melhor da cidade|\b5 estrelas\b/i.test(textoCompleto),
    });
    return itens;
  }, [rascunho, similaridadeExterna, similaridadeInterna, textoCompleto, limite]);

  const pronto = checklist.every((c) => c.ok);

  const copiar = async () => {
    await navigator.clipboard.writeText(JSON.stringify({ cluster, ...rascunho }, null, 2));
    await registrarAuditoria({
      area: "admin/editor-local",
      action: "export:json-aprovado",
      target: rascunho.local || "sem local",
      details: {
        cluster,
        limiares: limite,
        scoreExterno: similaridadeExterna.score,
        scoreInterno: similaridadeInterna.score,
        perfil,
      },
    });
    setAuditoria(await lerAuditoria("admin/editor-local"));
    toast({ title: "JSON copiado", description: "Cole no bloco curado da rota correspondente." });
  };

  if (authLoading) {
    return (
      <div className="container mx-auto max-w-5xl space-y-4 px-4 py-8">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-64 w-full" />
        <span className="sr-only">Carregando editor guiado</span>
      </div>
    );
  }
  if (!session || !isRevisor) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Editor guiado de conteúdo local | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className="container mx-auto max-w-5xl px-4 py-8 animate-fade-in">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Editor guiado — conteúdo por cidade/bairro</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Escreva contexto, sintomas, atendimento e casos reais. O checklist compara o rascunho com
              o publicado usando o limiar do cluster escolhido e explica cada bloqueio.
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <Badge variant="outline">Perfil: {perfil === "admin" ? "Administrador" : "Revisor"}</Badge>
            <Button variant="outline" onClick={() => void carregar()} disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
              Recarregar base
            </Button>
          </div>
        </header>

        <Card className="mt-6 p-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">Limiares de similaridade por cluster</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Valem para o checklist deste editor. O gate de build continua bloqueando em 0,62 entre
            páginas publicadas.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {CLUSTERS.map((c) => (
              <div key={c.id} className={`rounded-lg border p-3 ${cluster === c.id ? "border-primary" : "border-border"}`}>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <input
                    type="radio"
                    name="cluster"
                    checked={cluster === c.id}
                    onChange={() => setCluster(c.id)}
                    aria-label={`Usar limiar de ${c.rotulo}`}
                  />
                  {c.rotulo}
                </label>
                <p className="mt-1 text-xs text-muted-foreground">{c.dica}</p>
                <label className="mt-2 block text-xs text-muted-foreground">
                  Externo ({(limiares[c.id] ?? PADRAO[c.id]).externo.toFixed(2)})
                  <input
                    type="range"
                    min={0.2}
                    max={0.7}
                    step={0.01}
                    value={(limiares[c.id] ?? PADRAO[c.id]).externo}
                    onChange={(e) => ajustarLimiar(c.id, "externo", Number(e.target.value))}
                    className="mt-1 w-full accent-primary"
                  />
                </label>
                <label className="mt-1 block text-xs text-muted-foreground">
                  Interno ({(limiares[c.id] ?? PADRAO[c.id]).interno.toFixed(2)})
                  <input
                    type="range"
                    min={0.15}
                    max={0.6}
                    step={0.01}
                    value={(limiares[c.id] ?? PADRAO[c.id]).interno}
                    onChange={(e) => ajustarLimiar(c.id, "interno", Number(e.target.value))}
                    className="mt-1 w-full accent-primary"
                  />
                </label>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mt-6 space-y-4 p-4">
          <label className="block text-sm text-muted-foreground">
            Bairro ou cidade
            <Input
              value={rascunho.local}
              onChange={(e) => atualizar("local", e.target.value)}
              placeholder="Ex.: Portão, Curitiba"
              className="mt-1"
            />
          </label>
          {CAMPOS.map((c) => (
            <label key={c.chave} className="block text-sm text-muted-foreground">
              {c.rotulo}{" "}
              <span className="text-xs">
                ({rascunho[c.chave].trim().length}/{c.minimo}) — {c.dica}
              </span>
              <Textarea
                value={rascunho[c.chave]}
                onChange={(e) => atualizar(c.chave, e.target.value)}
                rows={6}
                className="mt-1"
              />
            </label>
          ))}
        </Card>

        <Card className="mt-6 p-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">Checklist de originalidade</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {checklist.map((c) => (
              <li key={c.rotulo} className="flex gap-2">
                {c.ok ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
                )}
                <span className={c.ok ? "text-muted-foreground" : "text-foreground"}>
                  {c.rotulo}
                  {typeof c.score === "number" && (
                    <Badge variant="outline" className="ml-2">
                      score {c.score.toFixed(3)}
                    </Badge>
                  )}
                  {c.justificativa && (
                    <span className="mt-1 flex gap-2 text-xs text-destructive">
                      <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                      {c.justificativa}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Cluster ativo: {CLUSTERS.find((c) => c.id === cluster)?.rotulo} · máximo com publicado{" "}
            {similaridadeExterna.score.toFixed(3)}
            {similaridadeExterna.path ? ` (${similaridadeExterna.path})` : ""} · entre blocos{" "}
            {similaridadeInterna.score.toFixed(3)}
            {similaridadeInterna.par ? ` (${similaridadeInterna.par})` : ""}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => void copiar()} disabled={!pronto}>
              <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
              {pronto ? "Copiar JSON aprovado" : "Complete o checklist para liberar"}
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                exportarJson("checklist-originalidade", {
                  cluster,
                  limiares: limite,
                  local: rascunho.local,
                  checklist,
                })
              }
            >
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Exportar checklist JSON
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                exportarCsv(
                  "checklist-originalidade",
                  checklist.map((c) => ({
                    item: c.rotulo,
                    ok: c.ok ? "sim" : "não",
                    score: c.score ?? "",
                    justificativa: c.justificativa ?? "",
                  })),
                )
              }
            >
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Exportar checklist CSV
            </Button>
          </div>
        </Card>

        <section className="mt-8">
          <h2 className="font-heading text-lg font-semibold text-foreground">Log de auditoria</h2>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {auditoria.map((a) => (
              <li key={a.id}>
                {new Date(a.created_at).toLocaleString("pt-BR")} · {a.actor_email ?? "usuário"} · {a.action}
                {a.target ? ` · ${a.target}` : ""}
              </li>
            ))}
            {!auditoria.length && <li>Nenhuma exportação registrada ainda.</li>}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminEditorLocal;
