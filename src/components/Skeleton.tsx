export const SkeletonCard = ({ className = "" }: { className?: string }) => (
  <div className={`bg-card rounded-xl p-6 border border-border animate-pulse ${className}`}>
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-muted rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-muted rounded-md w-3/4" />
        <div className="h-3 bg-muted rounded-md w-full" />
        <div className="h-3 bg-muted rounded-md w-1/2" />
      </div>
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3, className = "" }: { lines?: number; className?: string }) => (
  <div className={`space-y-2.5 animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-3.5 bg-muted rounded-md"
        style={{ width: i === lines - 1 ? '60%' : `${85 + Math.random() * 15}%` }}
      />
    ))}
  </div>
);

export const SkeletonHero = () => (
  <div className="hero-gradient pt-24 pb-14 md:pt-28 md:pb-18 animate-pulse">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 order-2 lg:order-1">
          <div className="h-8 bg-white/10 rounded-full w-48" />
          <div className="h-12 bg-white/10 rounded-lg w-3/4" />
          <div className="h-8 bg-white/10 rounded-lg w-1/2" />
          <div className="space-y-2 mt-4">
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-4/5" />
          </div>
          <div className="flex gap-4 mt-6">
            <div className="h-14 bg-white/10 rounded-xl w-48" />
            <div className="h-14 bg-white/10 rounded-xl w-48" />
          </div>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <div className="w-64 h-64 md:w-96 md:h-96 bg-white/10 rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 6, className = "" }: { count?: number; className?: string }) => (
  <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);
