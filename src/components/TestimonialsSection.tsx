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
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Centenas de clientes satisfeitos em Curitiba confiam no nosso trabalho
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-muted/30 rounded-xl p-5 border border-primary/5 hover:border-primary/20 transition-all hover:shadow-md"
            >
              <Quote className="h-8 w-8 text-accent/30 mb-3" />
              
              <p className="text-foreground/80 text-sm mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              
              <div className="border-t border-primary/10 pt-3">
                <p className="font-semibold text-foreground text-sm">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.location}
                </p>
                <p className="text-xs text-accent mt-1">
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
