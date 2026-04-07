import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { problemaPagesData } from "@/lib/problemaPagesData";

const DISPLAY_COUNT = 6;

export const ProblemasDestaque = () => {
  const problemas = useMemo(() => {
    const shuffled = [...problemaPagesData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, DISPLAY_COUNT);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-muted relative overflow-hidden">
      <div className="absolute top-0 right-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3 reveal-text">
              Problemas que Resolvemos
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto reveal-text" data-reveal-delay="100">
              Veja alguns dos problemas mais comuns que diagnosticamos e solucionamos em Curitiba e região.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {problemas.map((p, i) => (
              <Link
                key={p.slug}
                to={`/${p.slug}`}
                className="group bg-background rounded-xl p-4 border border-transparent hover:border-accent/20 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1.5 transition-all duration-300 magnetic-hover stagger-item"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-accent/10 rounded-lg p-2 flex-shrink-0 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <AlertTriangle className="h-4 w-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-accent transition-colors line-clamp-2">
                      {p.h1.replace(/\s*[—–-]\s*Causas.*$/i, "").replace(/\s*em Curitiba$/i, "")}
                    </h3>
                    <span className="text-xs text-muted-foreground">{p.categoria}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              to="/problemas-reais-casos"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:underline underline-grow text-sm"
            >
              Ver todos os problemas que resolvemos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
