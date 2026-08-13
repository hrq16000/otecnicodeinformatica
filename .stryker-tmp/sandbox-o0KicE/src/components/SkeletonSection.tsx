/**
 * ONDA 4T — esqueletos de seção.
 *
 * Substituem o espaço em branco reservado enquanto um bloco lazy carrega.
 * São puramente visuais (`aria-hidden`) e mantêm a mesma altura do bloco
 * final, então não alteram o layout nem o conteúdo indexado (todo o HTML
 * das rotas curadas é pré-renderizado no build).
 */
// @ts-nocheck


export const SkeletonSection = ({ height = "400px" }: { height?: string }) => (
  <div
    aria-hidden="true"
    style={{ minHeight: height }}
    className="w-full px-4 py-10"
  >
    <div className="container mx-auto max-w-5xl space-y-6">
      <div className="skel skel-title mx-auto w-2/3 max-w-md" />
      <div className="skel skel-line mx-auto w-1/2 max-w-sm" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-border p-5">
            <div className="skel h-10 w-10 rounded-lg" />
            <div className="skel skel-line w-3/4" />
            <div className="skel skel-line w-full" />
            <div className="skel skel-line w-2/3" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const SkeletonBand = ({ height = "120px" }: { height?: string }) => (
  <div aria-hidden="true" style={{ minHeight: height }} className="w-full px-4 py-6">
    <div className="container mx-auto flex max-w-5xl items-center gap-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="skel h-10 flex-1 rounded-lg" />
      ))}
    </div>
  </div>
);

export const SkeletonList = ({ rows = 4 }: { rows?: number }) => (
  <div aria-hidden="true" className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="skel h-16 w-full rounded-xl" />
    ))}
  </div>
);

export default SkeletonSection;
