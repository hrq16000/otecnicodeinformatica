import { useEffect, useRef } from "react";

const brands = [
  { name: "Dell", logo: "https://logo.clearbit.com/dell.com" },
  { name: "HP", logo: "https://logo.clearbit.com/hp.com" },
  { name: "Lenovo", logo: "https://logo.clearbit.com/lenovo.com" },
  { name: "ASUS", logo: "https://logo.clearbit.com/asus.com" },
  { name: "Acer", logo: "https://logo.clearbit.com/acer.com" },
  { name: "Samsung", logo: "https://logo.clearbit.com/samsung.com" },
  { name: "LG", logo: "https://logo.clearbit.com/lg.com" },
  { name: "Apple", logo: "https://logo.clearbit.com/apple.com" },
  { name: "Positivo", logo: "https://logo.clearbit.com/positivo.com.br" },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
  { name: "Intel", logo: "https://logo.clearbit.com/intel.com" },
  { name: "AMD", logo: "https://logo.clearbit.com/amd.com" },
  { name: "NVIDIA", logo: "https://logo.clearbit.com/nvidia.com" },
  { name: "Kingston", logo: "https://logo.clearbit.com/kingston.com" },
  { name: "Corsair", logo: "https://logo.clearbit.com/corsair.com" },
  { name: "TP-Link", logo: "https://logo.clearbit.com/tp-link.com" },
  { name: "Intelbras", logo: "https://logo.clearbit.com/intelbras.com" },
  { name: "Windows", logo: "https://logo.clearbit.com/windows.com" },
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
      <div className="container mx-auto mb-4">
        <p className="text-center text-xs text-muted-foreground uppercase tracking-widest font-medium">
          Marcas que atendemos
        </p>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
        
        <div ref={containerRef} className="flex animate-marquee whitespace-nowrap items-center">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2.5 mx-6 md:mx-8 hover:scale-110 transition-transform duration-300 cursor-default select-none group"
            >
              <img
                src={brand.logo}
                alt={`Logo ${brand.name}`}
                width={32}
                height={32}
                loading="lazy"
                className="h-7 w-7 md:h-8 md:w-8 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 dark:brightness-0 dark:invert dark:opacity-40 dark:group-hover:opacity-80"
              />
              <span className="text-muted-foreground/60 font-heading font-bold text-lg md:text-xl tracking-wide group-hover:text-accent transition-colors duration-300">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
