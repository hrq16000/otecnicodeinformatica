import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Roberto Silva",
    location: "Centro, Curitiba",
    rating: 5,
    text: "Meu notebook estava travando muito e o técnico resolveu em menos de 2 horas. Atendimento excelente e preço justo!",
    service: "Formatação e Upgrade SSD"
  },
  {
    name: "Maria Fernandes",
    location: "Água Verde, Curitiba",
    rating: 5,
    text: "Atendimento remoto muito prático. O técnico removeu todos os vírus do meu computador sem eu precisar sair de casa.",
    service: "Remoção de Vírus"
  },
  {
    name: "Carlos Eduardo",
    location: "Batel, Curitiba",
    rating: 5,
    text: "Empresa séria e profissional. Contratei o suporte mensal para meu escritório e nunca mais tive problemas.",
    service: "Suporte Empresarial"
  },
  {
    name: "Ana Paula Costa",
    location: "Portão, Curitiba",
    rating: 5,
    text: "Recuperaram todos os arquivos do meu HD que achei que tinha perdido. Super recomendo!",
    service: "Recuperação de Dados"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-background relative overflow-hidden ambient-glow noise-overlay">
      <div data-parallax="0.1" className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/[0.03] blur-[80px] pointer-events-none orb-float" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full bg-accent/[0.04] blur-[80px] pointer-events-none liquid-blob" />
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3 reveal-text">
            O Que Nossos Clientes <span className="gradient-text">Dizem</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto reveal-text" data-reveal-delay="100">
            Centenas de clientes satisfeitos em Curitiba confiam no nosso trabalho
          </p>
          <div className="glow-separator max-w-xs mx-auto mt-5" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card gradient-border rounded-xl p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[var(--shadow-lg)] group hover-streak animated-border slide-up-stagger"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <Quote className="h-8 w-8 text-accent/30 mb-3 group-hover:text-accent/60 group-hover:scale-110 transition-all duration-300 quote-glow" />
              
              <p className="text-foreground/80 text-sm mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              
              <div className="border-t border-primary/10 pt-3">
                <p className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors duration-200">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.location}
                </p>
                <p className="text-xs text-accent mt-1 font-medium">
                  {testimonial.service}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
