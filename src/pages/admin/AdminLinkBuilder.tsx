import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Copy, Link2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
  PRESETS_AQUISICAO,
  construirLinkAquisicao,
  type PresetAquisicao,
} from "@/lib/utmLinkBuilder";

/**
 * RODADA 8C — GERADOR DE LINKS DE AQUISIÇÃO (/admin/link-builder)
 *
 * Produz URLs rastreáveis para GBP, social orgânico e QR offline seguindo
 * `docs/governanca-utm.md`. Só monta o link: nunca publica nada externamente.
 */
const AdminLinkBuilder = () => {
  const { loading, session, isAdmin } = useAdminAuth();
  const [preset, setPreset] = useState<PresetAquisicao>(PRESETS_AQUISICAO[0]);
  const [destino, setDestino] = useState(PRESETS_AQUISICAO[0].destinoSugerido);
  const [content, setContent] = useState("");

  const resultado = useMemo(
    () =>
      construirLinkAquisicao({
        destino,
        utm_source: preset.utm_source,
        utm_medium: preset.utm_medium,
        utm_campaign: preset.utm_campaign,
        utm_content: content.trim() || undefined,
      }),
    [destino, preset, content],
  );

  const faltaContent = preset.exigeContent && !content.trim();

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
      </div>
    );
  if (!session || !isAdmin) return <Navigate to="/admin/login" replace />;

  const copiar = async () => {
    if (!resultado.ok) return;
    await navigator.clipboard.writeText(resultado.url);
    toast.success("Link copiado");
  };

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <Helmet>
        <title>Link builder de aquisição | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <h1 className="flex items-center gap-2 font-heading text-2xl font-bold">
        <Link2 className="h-5 w-5" aria-hidden="true" /> Link builder de aquisição
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Presets canônicos da Rodada 8C. UTM nunca entra em canonical, sitemap ou link interno
        permanente — use estas URLs apenas em perfis, posts e peças offline.
      </p>

      <Card className="mt-6 space-y-5 p-5">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Preset
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS_AQUISICAO.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setPreset(p);
                  setDestino(p.destinoSugerido);
                  setContent("");
                }}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  p.id === preset.id
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{preset.descricao}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="lb-destino" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Destino (caminho interno canônico)
            </label>
            <Input
              id="lb-destino"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="/tecnico-informatica-curitiba"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="lb-content" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              utm_content {preset.exigeContent ? "(obrigatório)" : "(opcional)"}
            </label>
            <Input
              id="lb-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="notebook-lento"
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="secondary">utm_source={preset.utm_source}</Badge>
          <Badge variant="secondary">utm_medium={preset.utm_medium}</Badge>
          <Badge variant="secondary">utm_campaign={preset.utm_campaign}</Badge>
        </div>

        {faltaContent && (
          <p className="text-sm text-destructive">
            Este preset exige <code>utm_content</code> com o tema da peça.
          </p>
        )}
        {!resultado.ok && (
          <p className="text-sm text-destructive">{resultado.erro}</p>
        )}

        {resultado.ok && !faltaContent && (
          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <p className="break-all font-mono text-xs">{resultado.url}</p>
            <Button type="button" size="sm" className="mt-3 gap-2" onClick={copiar}>
              <Copy className="h-4 w-4" aria-hidden="true" /> Copiar URL
            </Button>
          </div>
        )}
      </Card>
    </main>
  );
};

export default AdminLinkBuilder;
