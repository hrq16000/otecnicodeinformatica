/**
 * ONDA 4W — esqueletos de conteúdo unificados.
 *
 * Todos os placeholders usam o token global `.skel` (shimmer + neutralização
 * automática em `prefers-reduced-motion`), evitando variações ad-hoc de
 * `animate-pulse` que fugiam do sistema de movimento.
 */

import { useEffect } from "react";
import { iniciarEstadoCarregamento } from "@/lib/interactionMetrics";

/**
 * Mede quanto tempo um esqueleto ficou na tela.
 *
 * O ciclo abre na montagem e fecha na desmontagem (= conteúdo real entrou),
 * gerando o evento `ui_loading_state` com superfície, rota e duração. É isso
 * que permite correlacionar exibição de skeleton × LoadingButton × conversão
 * no painel /admin/ui-performance e no GA4.
 */
export const useSkeletonTelemetry = (superficie?: string) => {
  useEffect(() => {
    if (!superficie) return;
    const encerrar = iniciarEstadoCarregamento(superficie, "skeleton");
    return () => {
      encerrar("success");
    };
  }, [superficie]);
};

/** Props comuns: `metricSurface` liga a medição de exibição do esqueleto. */
type SkeletonBase = { className?: string; metricSurface?: string };


export const SkeletonCard = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={`bg-card rounded-xl p-6 border border-border ${className}`}
  >
    <div className="flex items-start gap-4">
      <div className="skel w-12 h-12 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="skel skel-line w-3/4" />
        <div className="skel skel-line w-full" />
        <div className="skel skel-line w-1/2" />
      </div>
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3, className = "" }: { lines?: number; className?: string }) => (
  <div aria-hidden="true" className={`space-y-2.5 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="skel skel-line"
        style={{ width: i === lines - 1 ? "60%" : `${100 - i * 7}%` }}
      />
    ))}
  </div>
);

export const SkeletonHero = () => (
  <div aria-hidden="true" className="hero-gradient pt-24 pb-14 md:pt-28 md:pb-18">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 order-2 lg:order-1">
          <div className="skel h-8 rounded-full w-48" />
          <div className="skel h-12 rounded-lg w-3/4" />
          <div className="skel h-8 rounded-lg w-1/2" />
          <div className="space-y-2 mt-4">
            <div className="skel skel-line w-full" />
            <div className="skel skel-line w-4/5" />
          </div>
          <div className="flex gap-4 mt-6">
            <div className="skel h-14 rounded-xl w-48" />
            <div className="skel h-14 rounded-xl w-48" />
          </div>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <div className="skel w-64 h-64 md:w-96 md:h-96 rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 6, className = "" }: { count?: number; className?: string }) => (
  <div aria-hidden="true" className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

/**
 * Esqueletos estruturais adicionais (motion system global).
 * Cada um espelha dimensões, grid e hierarquia do conteúdo real para
 * reduzir layout shift e aumentar a percepção de velocidade.
 */
export const SkeletonTable = ({ rows = 6, cols = 4, className = "" }: { rows?: number; cols?: number; className?: string }) => (
  <div aria-hidden="true" className={`overflow-hidden rounded-xl border border-border ${className}`}>
    <div className="flex gap-4 border-b border-border bg-muted/30 p-4">
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="skel skel-line flex-1" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} className="flex gap-4 border-b border-border/60 p-4 last:border-b-0">
        {Array.from({ length: cols }).map((_, c) => (
          <div key={c} className="skel skel-line flex-1" style={{ maxWidth: c === 0 ? "40%" : undefined }} />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonMetrics = ({ count = 4, className = "" }: { count?: number; className?: string }) => (
  <div aria-hidden="true" className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="rounded-xl border border-border bg-card p-5 space-y-3">
        <div className="skel skel-line w-1/2" />
        <div className="skel skel-title w-2/3" />
        <div className="skel skel-line w-1/3" />
      </div>
    ))}
  </div>
);

export const SkeletonChart = ({ height = 240, className = "" }: { height?: number; className?: string }) => (
  <div aria-hidden="true" className={`rounded-xl border border-border bg-card p-5 ${className}`}>
    <div className="skel skel-line mb-4 w-1/3" />
    <div className="flex items-end gap-2" style={{ height }}>
      {[62, 84, 48, 96, 70, 58, 88, 44].map((h, i) => (
        <div key={i} className="skel flex-1 rounded-md" style={{ height: `${h}%` }} />
      ))}
    </div>
  </div>
);

export const SkeletonForm = ({ fields = 4, className = "" }: { fields?: number; className?: string }) => (
  <div aria-hidden="true" className={`space-y-4 ${className}`}>
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="skel skel-line w-1/4" />
        <div className="skel h-11 w-full rounded-lg" />
      </div>
    ))}
    <div className="skel h-11 w-40 rounded-lg" />
  </div>
);

export const SkeletonPage = ({ className = "" }: { className?: string }) => (
  <div aria-hidden="true" className={`container mx-auto space-y-8 px-4 py-10 ${className}`}>
    <div className="space-y-3">
      <div className="skel skel-line w-40" />
      <div className="skel skel-title w-2/3 max-w-xl" />
      <div className="skel skel-line w-1/2 max-w-md" />
    </div>
    <SkeletonGrid count={6} />
    <div className="space-y-2">
      <div className="skel skel-line w-full" />
      <div className="skel skel-line w-11/12" />
      <div className="skel skel-line w-3/4" />
    </div>
  </div>
);
