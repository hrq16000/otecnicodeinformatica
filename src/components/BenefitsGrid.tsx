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
    <section className="py-12 md:py-16 bg-card/50 cyber-grid relative">
      <div className="container mx-auto relative z-10">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 font-heading neon-text">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground max-w-2xl mx-auto font-mono">
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
                className="bg-background/60 backdrop-blur-sm rounded-xl p-6 neon-border hover-lift text-center anim-scale"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-neon-green/10 rounded-xl flex items-center justify-center mx-auto mb-4 hover-scale">
                  <Icon className="h-7 w-7 text-neon-green" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 font-heading">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground font-mono">
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
