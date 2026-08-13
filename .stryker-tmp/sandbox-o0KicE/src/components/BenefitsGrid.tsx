// @ts-nocheck
import { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BenefitsGridProps {
  benefits: Benefit[];
  title?: string;
  subtitle?: string;
}

export const BenefitsGrid = ({ benefits, title, subtitle }: BenefitsGridProps) => {
  return (
    <section className="py-10 md:py-12 bg-muted/40 relative overflow-hidden mesh-gradient-warm noise-overlay">
      <div className="absolute top-0 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none orb-float" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary/4 rounded-full blur-3xl pointer-events-none liquid-blob" />
      <div className="container mx-auto relative z-10">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight reveal-text">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground max-w-2xl mx-auto reveal-text" data-reveal-delay="100">
                {subtitle}
              </p>
            )}
            <div className="glow-separator max-w-xs mx-auto mt-5" />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 stagger-grid">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="glass-card gradient-border rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.04] hover:shadow-[var(--shadow-lg)] text-center group hover-streak animated-border slide-up-stagger"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="w-13 h-13 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-accent/20 group-hover:shadow-[0_0_20px_hsl(var(--accent)/0.2)] group-hover:scale-110 group-hover:rotate-3 relative">
                  <Icon className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-300 icon-bounce" />
                  <div className="absolute inset-0 rounded-xl bg-accent/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-[15px] group-hover:text-accent transition-colors duration-200">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
