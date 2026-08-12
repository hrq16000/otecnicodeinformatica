/**
 * ONDA 4W — esqueletos de conteúdo unificados.
 *
 * Todos os placeholders usam o token global `.skel` (shimmer + neutralização
 * automática em `prefers-reduced-motion`), evitando variações ad-hoc de
 * `animate-pulse` que fugiam do sistema de movimento.
 */

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
