import { useEffect, useState, useRef, useCallback } from "react";

const brands = [
  "Dell", "HP", "Lenovo", "ASUS", "Acer", "Samsung", "LG", "Apple",
  "Positivo", "Microsoft", "Intel", "AMD", "NVIDIA", "Kingston",
  "Corsair", "TP-Link", "Intelbras", "Motorola", "Xiaomi", "Sony",
];

const animations = [
  "animate-brand-flip",
  "animate-brand-zoom",
  "animate-brand-slide-up",
  "animate-brand-slide-down",
  "animate-brand-rotate",
  "animate-brand-blur-in",
  "animate-brand-bounce-in",
  "animate-brand-glitch",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const TechBrandsMarquee = () => {
  const [visibleBrands, setVisibleBrands] = useState<
    { name: string; anim: string; key: number }[]
  >([]);
  const keyRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const generate = useCallback(() => {
    const shuffled = shuffle(brands).slice(0, 8);
    keyRef.current++;
    setVisibleBrands(
      shuffled.map((name, i) => ({
        name,
        anim: animations[Math.floor(Math.random() * animations.length)],
        key: keyRef.current * 100 + i,
      }))
    );
  }, []);

  useEffect(() => {
    generate();
    intervalRef.current = setInterval(generate, 4000);
    return () => clearInterval(intervalRef.current);
  }, [generate]);

  return (
    <section className="py-8 md:py-10 bg-muted/30 border-y border-border/50 overflow-hidden relative">
      <div className="container mx-auto mb-5">
        <p className="text-center text-xs text-muted-foreground uppercase tracking-widest font-medium">
          Marcas que atendemos
        </p>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 items-center justify-items-center min-h-[60px]">
          {visibleBrands.map((b) => (
            <div
              key={b.key}
              className={`${b.anim} select-none cursor-default group`}
            >
              <span className="text-muted-foreground/60 font-heading font-bold text-lg md:text-xl tracking-wide group-hover:text-accent transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--accent)/0.5)]">
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
