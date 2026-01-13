import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { trackPageView } from "@/lib/analytics";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    slug: "como-deixar-computador-mais-rapido",
    title: "Como Deixar o Computador Mais Rápido: 7 Dicas Práticas",
    excerpt: "Seu PC está lento? Descubra 7 técnicas simples que você pode aplicar hoje mesmo para melhorar a velocidade do seu computador sem gastar nada.",
    date: "2024-01-10",
    readTime: "5 min",
    category: "Dicas",
  },
  {
    slug: "sinais-computador-com-virus",
    title: "5 Sinais de Que Seu Computador Está com Vírus",
    excerpt: "Aprenda a identificar os principais sintomas de uma infecção por vírus ou malware e saiba quando é hora de procurar um técnico especializado.",
    date: "2024-01-08",
    readTime: "4 min",
    category: "Segurança",
  },
  {
    slug: "quando-trocar-hd-por-ssd",
    title: "Quando Vale a Pena Trocar o HD por SSD?",
    excerpt: "Entenda as vantagens do SSD sobre o HD tradicional, quanto custa o upgrade e se essa mudança faz sentido para o seu uso do computador.",
    date: "2024-01-05",
    readTime: "6 min",
    category: "Hardware",
  },
  {
    slug: "backup-como-proteger-seus-arquivos",
    title: "Backup: Como Proteger Seus Arquivos Importantes",
    excerpt: "Não espere perder seus dados para fazer backup. Conheça as melhores práticas para manter seus arquivos seguros usando métodos simples e eficientes.",
    date: "2024-01-02",
    readTime: "5 min",
    category: "Segurança",
  },
  {
    slug: "notebook-superaquecendo-o-que-fazer",
    title: "Notebook Superaquecendo: O Que Fazer?",
    excerpt: "Seu notebook esquenta demais e desliga sozinho? Descubra as causas do superaquecimento e como resolver esse problema comum.",
    date: "2023-12-28",
    readTime: "4 min",
    category: "Manutenção",
  },
  {
    slug: "wifi-lento-como-melhorar",
    title: "Wi-Fi Lento em Casa? Veja Como Melhorar o Sinal",
    excerpt: "Dicas práticas para melhorar a cobertura e velocidade da sua internet sem fio. Do posicionamento do roteador às configurações ideais.",
    date: "2023-12-25",
    readTime: "5 min",
    category: "Redes",
  },
];

const Blog = () => {
  useEffect(() => {
    document.title = "Blog | Dicas de Informática | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Dicas de informática, tutoriais e artigos sobre manutenção de computadores, segurança digital e tecnologia. Blog do Técnico Curitiba."
      );
    }
    trackPageView("/blog", "Blog");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <Header />
      <main>
        {/* Hero */}
        <section className="hero-gradient pt-24 pb-12 md:pt-28 md:pb-16">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
                Blog de Informática
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Dicas, tutoriais e artigos para você cuidar melhor do seu computador
              </p>
            </div>
          </div>
        </section>

        {/* Posts */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {blogPosts.map((post, index) => (
                  <article
                    key={index}
                    className="bg-secondary rounded-xl p-6 hover:shadow-lg transition-all border border-transparent hover:border-accent/20"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <h2 className="text-xl md:text-2xl font-bold text-primary mb-2 hover:text-accent transition-colors">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>
                        
                        <p className="text-muted-foreground mb-4">
                          {post.excerpt}
                        </p>
                        
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
                        >
                          Ler artigo completo
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Precisa de Ajuda com Seu Computador?
              </h2>
              <p className="text-muted-foreground mb-6">
                Se as dicas do blog não resolveram seu problema, fale com um técnico especializado
              </p>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Falar com Técnico
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Blog;
