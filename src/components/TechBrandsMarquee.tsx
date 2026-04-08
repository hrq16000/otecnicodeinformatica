import { useEffect, useRef } from "react";

const brands = [
  "Dell", "HP", "Lenovo", "ASUS", "Acer", "Samsung", "LG", "Apple",
  "Positivo", "Microsoft", "Intel", "AMD", "NVIDIA", "Kingston",
  "Corsair", "TP-Link", "Intelbras", "Motorola", "Xiaomi", "Sony",
];

export const TechBrandsMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches && containerRef.current) {
      containerRef.current.style.animationPlayState = "paused";
    }
  }, []);

  const allBrands = [...brands, ...brands];

  return (
    <section className="py-6 md:py-8 bg-muted/30 border-y border-border/50 overflow-hidden relative">
      <div className="container mx-auto mb-4">
        <p className="text-center text-xs text-muted-foreground uppercase tracking-widest font-medium">
          Marcas que atendemos
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
        
        <div ref={containerRef} className="flex animate-marquee whitespace-nowrap items-center">
          {allBrands.map((brand, i) => (
            <div
              key={i}
              className="inline-flex items-center mx-5 md:mx-7 hover:scale-110 transition-transform duration-300 cursor-default select-none group"
            >
              <span className="text-muted-foreground/50 font-heading font-bold text-lg md:text-xl tracking-wide group-hover:text-accent transition-colors duration-300">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
