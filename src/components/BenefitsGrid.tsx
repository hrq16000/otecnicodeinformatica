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
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-background rounded-xl p-6 border border-primary/5 hover:border-accent/30 hover-lift hover:glow-accent text-center anim-scale ripple-container"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 hover-scale transition-colors duration-300 group-hover:bg-accent/20">
                  <Icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
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
