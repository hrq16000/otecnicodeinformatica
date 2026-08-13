import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CheckCircle2, Copy, Loader2, RefreshCw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";

/**
 * EDITOR GUIADO DE TEXTO LOCAL (Onda 30).
 *
 * Preenchimento assistido de contexto, sintomas comuns, como é o atendimento e
 * casos reais por cidade/bairro, com checklist de originalidade ANTES de
 * publicar: mede a similaridade (Jaccard sobre 5-gramas) do rascunho contra as
 * descrições já publicadas (publish-status.json) e contra os próprios blocos.
 * O editor não escreve no site — exporta o JSON revisado para virar conteúdo
 * curado, mantendo o fluxo fail-closed.
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
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
  const [rascunho, setRascunho] = useState<Rascunho>(VAZIO);
  const [publicados, setPublicados] = useState<UrlStatus[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_STORAGE);
      if (salvo) setRascunho({ ...VAZIO, ...(JSON.parse(salvo) as Rascunho) });
    } catch {
      /* rascunho começa vazio */
    }
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
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) void carregar();
  }, [isAdmin, carregar]);

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
    const itens = CAMPOS.map((c) => ({
      rotulo: `${c.rotulo} com ${c.minimo}+ caracteres`,
      ok: rascunho[c.chave].trim().length >= c.minimo,
    }));
    itens.push({ rotulo: "Nome do bairro/cidade preenchido", ok: rascunho.local.trim().length > 2 });
    itens.push({ rotulo: "Similaridade com páginas publicadas < 0,45", ok: similaridadeExterna.score < 0.45 });
    itens.push({ rotulo: "Blocos internos diferentes entre si (< 0,35)", ok: similaridadeInterna.score < 0.35 });
    itens.push({
      rotulo: "Sem promessa de prazo universal ou avaliação inventada",
      ok: !/30 minutos garantid|nota 5|melhor da cidade|\b5 estrelas\b/i.test(textoCompleto),
    });
    return itens;
  }, [rascunho, similaridadeExterna, similaridadeInterna, textoCompleto]);

  const pronto = checklist.every((c) => c.ok);

  const copiar = async () => {
    await navigator.clipboard.writeText(JSON.stringify(rascunho, null, 2));
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
  if (!session || !isAdmin) return <Navigate to="/admin/login" replace />;

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
              Escreva contexto, sintomas, atendimento e casos reais. O checklist de originalidade
              compara o rascunho com o que já está publicado antes de liberar a publicação.
            </p>
          </div>
          <Button variant="outline" onClick={() => void carregar()} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            Recarregar base
          </Button>
        </header>

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
              <li key={c.rotulo} className="flex items-center gap-2">
                {c.ok ? (
                  <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" aria-hidden="true" />
                )}
                <span className={c.ok ? "text-muted-foreground" : "text-foreground"}>{c.rotulo}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Similaridade máxima com publicado: {similaridadeExterna.score.toFixed(2)}
            {similaridadeExterna.path ? ` (${similaridadeExterna.path})` : ""} · entre blocos:{" "}
            {similaridadeInterna.score.toFixed(2)}
            {similaridadeInterna.par ? ` (${similaridadeInterna.par})` : ""}
          </p>
          <Button className="mt-4" onClick={() => void copiar()} disabled={!pronto}>
            <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
            {pronto ? "Copiar JSON aprovado" : "Complete o checklist para liberar"}
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default AdminEditorLocal;
