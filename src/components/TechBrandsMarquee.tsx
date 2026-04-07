import { useEffect, useRef } from "react";

const brands = [
  "Dell", "HP", "Lenovo", "Asus", "Acer", "Samsung", "LG", 
  "Apple", "Positivo", "Microsoft", "Intel", "AMD", "NVIDIA",
  "Kingston", "Corsair", "TP-Link", "Intelbras", "Windows",
];

export const TechBrandsMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches && containerRef.current) {
      containerRef.current.style.animationPlayState = "paused";
    }
  }, []);

  return (
    <section className="py-6 md:py-8 bg-muted/30 border-y border-border/50 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-muted/30 via-transparent to-muted/30 z-10 pointer-events-none" />
      <div className="container mx-auto mb-3">
        <p className="text-center text-xs text-muted-foreground uppercase tracking-widest font-medium">
          Marcas que atendemos
        </p>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
        
        <div ref={containerRef} className="flex animate-marquee whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="inline-flex items-center mx-6 md:mx-8 text-muted-foreground/60 font-heading font-bold text-lg md:text-xl tracking-wide hover:text-accent transition-colors duration-300 cursor-default select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
