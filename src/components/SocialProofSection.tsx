import { Star, Quote, Award, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const reviews = [
  { name: "Roberto Silva", location: "Centro, Curitiba", rating: 5, text: "Meu notebook estava travando muito e o técnico resolveu em menos de 2 horas. Atendimento excelente e preço justo. O profissional foi muito atencioso e explicou tudo que estava fazendo.", service: "Formatação e Upgrade SSD", date: "2024-01-15", verified: true },
  { name: "Maria Fernandes", location: "Água Verde, Curitiba", rating: 5, text: "Atendimento remoto muito prático. O técnico removeu todos os vírus do meu computador sem eu precisar sair de casa. Recomendo demais para quem precisa de agilidade!", service: "Remoção de Vírus", date: "2024-01-10", verified: true },
  { name: "Carlos Eduardo", location: "Batel, Curitiba", rating: 5, text: "Empresa séria e profissional. Contratei o suporte mensal para meu escritório com 15 computadores e nunca mais tive problemas. Atendimento rápido sempre que preciso.", service: "Suporte Empresarial", date: "2024-01-08", verified: true },
  { name: "Ana Paula Costa", location: "Portão, Curitiba", rating: 5, text: "Recuperaram todos os arquivos do meu HD que achei que tinha perdido para sempre. Fotos de família de mais de 20 anos! Super recomendo o serviço.", service: "Recuperação de Dados", date: "2024-01-05", verified: true },
  { name: "Fernando Souza", location: "São José dos Pinhais", rating: 5, text: "Técnico chegou no horário combinado e resolveu o problema da rede Wi-Fi do meu escritório. Agora a internet funciona em todos os cantos. Excelente custo-benefício.", service: "Configuração de Redes", date: "2024-01-02", verified: true },
  { name: "Juliana Mendes", location: "CIC, Curitiba", rating: 5, text: "Meu PC gamer estava superaquecendo e desligando. O técnico fez a limpeza completa e trocou a pasta térmica. Agora funciona perfeitamente mesmo em jogos pesados!", service: "Limpeza e Manutenção", date: "2023-12-28", verified: true },
];

const stats = { rating: 4.9, totalReviews: 347, satisfaction: 98 };

export const SocialProofSection = () => {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Técnico Curitiba - Suporte em Informática",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": stats.rating.toString(), "reviewCount": stats.totalReviews.toString(), "bestRating": "5", "worstRating": "1" },
    "review": reviews.map(review => ({
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": review.rating.toString(), "bestRating": "5" },
      "author": { "@type": "Person", "name": review.name },
      "datePublished": review.date,
      "reviewBody": review.text
    }))
  };

  return (
    <section className="py-10 md:py-14 bg-background relative overflow-hidden mesh-gradient-warm noise-overlay">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none orb-float" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none orb-float-reverse" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/[0.03] morph-blob pointer-events-none blur-[100px]" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4 shimmer-sweep float-badge">
            <Award className="h-4 w-4" />
            <span className="font-medium text-sm">Assistência Técnica Mais Bem Avaliada de Curitiba</span>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-4 tracking-tight reveal-text">
            O Que Nossos <span className="gradient-text">Clientes</span> Dizem
          </h2>
          <div className="glow-separator max-w-xs mx-auto mb-6" />


            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
            <div className="bg-card rounded-xl px-6 py-4 text-center border border-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1.5 transition-all duration-300 card-shine stat-reveal" style={{ animationDelay: '0ms' }}>
              <div className="flex items-center justify-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-2xl font-bold text-foreground glow-pulse-text">{stats.rating}</p>
              <p className="text-xs text-muted-foreground">Nota Média</p>
            </div>
            <div className="bg-card rounded-xl px-6 py-4 text-center border border-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1.5 transition-all duration-300 card-shine stat-reveal" style={{ animationDelay: '100ms' }}>
              <p className="text-2xl font-bold text-foreground">
                <AnimatedCounter end={stats.totalReviews} suffix="+" />
              </p>
              <p className="text-xs text-muted-foreground">Avaliações</p>
            </div>
            <div className="bg-card rounded-xl px-6 py-4 text-center border border-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1.5 transition-all duration-300 card-shine stat-reveal" style={{ animationDelay: '200ms' }}>
              <p className="text-2xl font-bold text-accent">
                <AnimatedCounter end={stats.satisfaction} suffix="%" />
              </p>
              <p className="text-xs text-muted-foreground">Satisfação</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-card border border-border gradient-border rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] group card-shine animated-border hover-streak slide-up-stagger shadow-sm"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <Quote className="h-7 w-7 text-accent/25 mb-3 group-hover:text-accent/50 group-hover:scale-110 transition-all duration-300" />
              
              <p className="text-foreground text-sm mb-4 leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </div>
              
              <div className="border-t border-border pt-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                      {review.name}
                      {review.verified && <CheckCircle className="h-3.5 w-3.5 text-accent" />}
                    </p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                  <span className="text-[11px] bg-accent/10 text-accent px-2 py-1 rounded-full whitespace-nowrap">
                    {review.service}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="premium-gradient rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-accent/[0.06] blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Faça Parte dos Nossos Clientes Satisfeitos
            </h3>
            <p className="text-white/75 mb-6 max-w-2xl mx-auto leading-relaxed">
              Junte-se às centenas de curitibanos que confiam no Técnico Curitiba para resolver seus problemas de informática.
            </p>
            <div className="flex justify-center">
              <Button variant="heroWhatsapp" size="lg" className="ripple-container shadow-lg" asChild>
                <a 
                  href="https://wa.me/5541997452053?text=Olá!%20Vi%20as%20avaliações%20e%20gostaria%20de%20agendar%20um%20atendimento%20técnico."
                  data-cta-location="social_proof" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Solicitar Atendimento
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
