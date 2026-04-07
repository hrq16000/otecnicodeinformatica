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
    <section className="py-14 md:py-18 bg-muted/40">
      <div className="container mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border/50 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-accent/20 transition-all duration-300 hover:-translate-y-0.5 text-center ripple-container"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="w-13 h-13 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-[15px]">
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
