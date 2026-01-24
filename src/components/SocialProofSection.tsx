import { Star, Quote, Award, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    name: "Roberto Silva",
    location: "Centro, Curitiba",
    rating: 5,
    text: "Meu notebook estava travando muito e o técnico resolveu em menos de 2 horas. Atendimento excelente e preço justo. O profissional foi muito atencioso e explicou tudo que estava fazendo.",
    service: "Formatação e Upgrade SSD",
    date: "2024-01-15",
    verified: true
  },
  {
    name: "Maria Fernandes",
    location: "Água Verde, Curitiba",
    rating: 5,
    text: "Atendimento remoto muito prático. O técnico removeu todos os vírus do meu computador sem eu precisar sair de casa. Recomendo demais para quem precisa de agilidade!",
    service: "Remoção de Vírus",
    date: "2024-01-10",
    verified: true
  },
  {
    name: "Carlos Eduardo",
    location: "Batel, Curitiba",
    rating: 5,
    text: "Empresa séria e profissional. Contratei o suporte mensal para meu escritório com 15 computadores e nunca mais tive problemas. Atendimento rápido sempre que preciso.",
    service: "Suporte Empresarial",
    date: "2024-01-08",
    verified: true
  },
  {
    name: "Ana Paula Costa",
    location: "Portão, Curitiba",
    rating: 5,
    text: "Recuperaram todos os arquivos do meu HD que achei que tinha perdido para sempre. Fotos de família de mais de 10 anos! Super recomendo o serviço.",
    service: "Recuperação de Dados",
    date: "2024-01-05",
    verified: true
  },
  {
    name: "Fernando Souza",
    location: "São José dos Pinhais",
    rating: 5,
    text: "Técnico chegou no horário combinado e resolveu o problema da rede Wi-Fi do meu escritório. Agora a internet funciona em todos os cantos. Excelente custo-benefício.",
    service: "Configuração de Redes",
    date: "2024-01-02",
    verified: true
  },
  {
    name: "Juliana Mendes",
    location: "CIC, Curitiba",
    rating: 5,
    text: "Meu PC gamer estava superaquecendo e desligando. O técnico fez a limpeza completa e trocou a pasta térmica. Agora funciona perfeitamente mesmo em jogos pesados!",
    service: "Limpeza e Manutenção",
    date: "2023-12-28",
    verified: true
  }
];

const stats = {
  rating: 4.9,
  totalReviews: 347,
  satisfaction: 98
};

export const SocialProofSection = () => {
  // Schema de Reviews para SEO
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Técnico Curitiba - Suporte em Informática",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": stats.rating.toString(),
      "reviewCount": stats.totalReviews.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "datePublished": review.date,
      "reviewBody": review.text
    }))
  };

  return (
    <section className="py-12 md:py-20 bg-background">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="container mx-auto">
        {/* Header com Stats */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
            <Award className="h-4 w-4" />
            <span className="font-medium text-sm">Assistência Técnica Mais Bem Avaliada de Curitiba</span>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-primary mb-6">
            O Que Nossos Clientes Dizem
          </h2>

          {/* Stats Cards */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-secondary rounded-xl px-6 py-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-2xl font-bold text-primary">{stats.rating}</p>
              <p className="text-sm text-muted-foreground">Nota Média</p>
            </div>

            <div className="bg-secondary rounded-xl px-6 py-4 text-center">
              <p className="text-2xl font-bold text-primary">{stats.totalReviews}+</p>
              <p className="text-sm text-muted-foreground">Avaliações</p>
            </div>

            <div className="bg-secondary rounded-xl px-6 py-4 text-center">
              <p className="text-2xl font-bold text-accent">{stats.satisfaction}%</p>
              <p className="text-sm text-muted-foreground">Satisfação</p>
            </div>
          </div>
        </div>

        {/* Grid de Avaliações */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-muted/30 rounded-xl p-6 border border-primary/5 hover:border-accent/20 transition-all hover:shadow-lg"
            >
              <Quote className="h-8 w-8 text-accent/30 mb-4" />
              
              <p className="text-foreground/80 text-sm mb-4 leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              
              <div className="border-t border-primary/10 pt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm flex items-center gap-2">
                      {review.name}
                      {review.verified && (
                        <CheckCircle className="h-4 w-4 text-accent" />
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review.location}
                    </p>
                  </div>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                    {review.service}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA para Avaliação */}
        <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            Faça Parte dos Nossos Clientes Satisfeitos
          </h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Junte-se às centenas de curitibanos que confiam no Técnico Curitiba para resolver seus problemas de informática.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="heroWhatsapp"
              size="lg"
              asChild
            >
              <a 
                href="https://wa.me/5541997452053?text=Olá!%20Preciso%20de%20um%20técnico%20de%20informática." 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Solicitar Atendimento
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <a 
                href="https://g.page/r/tecnicocuritiba/review" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Avaliar no Google
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
