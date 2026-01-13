import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { trackPageView } from "@/lib/analytics";
import { Calendar, Clock, ArrowLeft, CheckCircle } from "lucide-react";

const blogPostsContent: Record<string, {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: React.ReactNode;
}> = {
  "como-deixar-computador-mais-rapido": {
    title: "Como Deixar o Computador Mais Rápido: 7 Dicas Práticas",
    excerpt: "Seu PC está lento? Descubra 7 técnicas simples que você pode aplicar hoje mesmo para melhorar a velocidade do seu computador sem gastar nada.",
    date: "2024-01-10",
    readTime: "5 min",
    category: "Dicas",
    content: (
      <>
        <p className="lead">Se você está cansado de esperar o computador ligar ou programas demorarem para abrir, este artigo é para você. Veja 7 dicas práticas que podem ser aplicadas hoje mesmo.</p>
        
        <h2>1. Desative Programas na Inicialização</h2>
        <p>Muitos programas se configuram para iniciar junto com o Windows, deixando o boot mais lento. Abra o Gerenciador de Tarefas (Ctrl+Shift+Esc), vá em "Inicializar" e desative os programas que não precisa abrir automaticamente.</p>
        
        <h2>2. Limpe Arquivos Temporários</h2>
        <p>O Windows acumula arquivos temporários que ocupam espaço e podem deixar o sistema lento. Use o "Limpeza de Disco" (digite na busca do Windows) para remover esses arquivos com segurança.</p>
        
        <h2>3. Desinstale Programas que Não Usa</h2>
        <p>Vá em Configurações {'>'} Aplicativos e remova programas que você não utiliza mais. Além de liberar espaço, alguns podem estar rodando processos em segundo plano.</p>
        
        <h2>4. Verifique se Há Vírus</h2>
        <p>Malwares consomem recursos do computador. Execute uma verificação completa com o Windows Defender ou um antivírus de sua confiança.</p>
        
        <h2>5. Atualize Drivers e Windows</h2>
        <p>Drivers desatualizados podem causar problemas de desempenho. Mantenha o Windows e os drivers sempre atualizados através do Windows Update.</p>
        
        <h2>6. Verifique o Espaço em Disco</h2>
        <p>Um disco muito cheio prejudica a performance. Idealmente, mantenha pelo menos 15-20% do disco livre. Se necessário, mova arquivos para um HD externo ou nuvem.</p>
        
        <h2>7. Considere um Upgrade de Hardware</h2>
        <p>Se seu computador tem mais de 5 anos, pode ser hora de um upgrade. Adicionar mais memória RAM ou trocar o HD por um SSD pode fazer seu PC parecer novo.</p>
        
        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Ainda está lento?</h3>
          <p className="text-muted-foreground mb-0">Se após seguir essas dicas o computador continuar lento, pode haver um problema mais sério. Um técnico especializado pode fazer um diagnóstico completo e identificar a causa.</p>
        </div>
      </>
    ),
  },
  "sinais-computador-com-virus": {
    title: "5 Sinais de Que Seu Computador Está com Vírus",
    excerpt: "Aprenda a identificar os principais sintomas de uma infecção por vírus ou malware e saiba quando é hora de procurar um técnico especializado.",
    date: "2024-01-08",
    readTime: "4 min",
    category: "Segurança",
    content: (
      <>
        <p className="lead">Vírus e malwares evoluem constantemente, mas alguns sintomas clássicos continuam sendo bons indicadores de infecção. Conheça os principais sinais.</p>
        
        <h2>1. Lentidão Repentina</h2>
        <p>Se o computador que funcionava bem começou a ficar lento do dia para a noite, pode ser sinal de malware consumindo recursos do sistema em segundo plano.</p>
        
        <h2>2. Pop-ups e Propagandas Estranhas</h2>
        <p>Janelas de propaganda aparecendo mesmo quando você não está navegando, ou anúncios diferentes dos habituais em sites conhecidos, são sinais clássicos de adware.</p>
        
        <h2>3. Programas Desconhecidos</h2>
        <p>Note programas que você não lembra de ter instalado? Barras de ferramentas no navegador? Isso indica que algum software malicioso pode ter se instalado sem seu conhecimento.</p>
        
        <h2>4. Redirecionamentos no Navegador</h2>
        <p>Ao pesquisar no Google você é redirecionado para sites estranhos? Sua página inicial mudou sozinha? Esses são sinais de sequestro de navegador.</p>
        
        <h2>5. Arquivos Desaparecendo ou Criptografados</h2>
        <p>Este é o sinal mais grave. Se seus arquivos sumiram ou aparece uma mensagem pedindo pagamento para recuperá-los, você pode ter sido vítima de ransomware.</p>
        
        <div className="bg-destructive/10 rounded-xl p-6 my-8 border border-destructive/20">
          <h3 className="text-destructive font-bold mb-2">⚠️ Atenção</h3>
          <p className="text-muted-foreground mb-0">Se você identificou algum desses sinais, evite fazer transações bancárias ou digitar senhas importantes até resolver o problema. Um técnico pode remover as ameaças e garantir que seus dados estejam seguros.</p>
        </div>
      </>
    ),
  },
  "quando-trocar-hd-por-ssd": {
    title: "Quando Vale a Pena Trocar o HD por SSD?",
    excerpt: "Entenda as vantagens do SSD sobre o HD tradicional, quanto custa o upgrade e se essa mudança faz sentido para o seu uso do computador.",
    date: "2024-01-05",
    readTime: "6 min",
    category: "Hardware",
    content: (
      <>
        <p className="lead">O SSD (Solid State Drive) é uma das melhores atualizações que você pode fazer em um computador antigo. Mas será que vale a pena no seu caso?</p>
        
        <h2>O Que é um SSD?</h2>
        <p>Diferente do HD tradicional que usa discos magnéticos girando, o SSD armazena dados em chips de memória flash. Isso significa que não há partes móveis, resultando em mais velocidade, silêncio e resistência.</p>
        
        <h2>Vantagens do SSD</h2>
        <ul>
          <li><strong>Velocidade:</strong> O Windows pode iniciar em 15-30 segundos em vez de 2-3 minutos</li>
          <li><strong>Programas abrem instantaneamente:</strong> Word, navegador, jogos - tudo carrega muito mais rápido</li>
          <li><strong>Silêncio:</strong> SSDs não fazem barulho</li>
          <li><strong>Durabilidade:</strong> Sem partes móveis, são mais resistentes a quedas</li>
          <li><strong>Menor consumo:</strong> Ideal para notebooks, pois economiza bateria</li>
        </ul>
        
        <h2>Quando Vale a Pena?</h2>
        <p>A troca vale a pena se:</p>
        <ul>
          <li>Seu computador demora muito para ligar</li>
          <li>Programas abrem devagar mesmo com memória RAM suficiente</li>
          <li>Você quer prolongar a vida útil do computador</li>
          <li>Usa notebook e quer mais velocidade e economia de bateria</li>
        </ul>
        
        <h2>Quanto Custa?</h2>
        <p>Um SSD de 240GB (suficiente para Windows e programas) custa entre R$ 100 e R$ 200. Modelos de 480GB a 1TB custam mais, mas são ideais se você tem muitos arquivos.</p>
        
        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa de ajuda com o upgrade?</h3>
          <p className="text-muted-foreground mb-0">A troca de HD por SSD inclui migrar o sistema e seus arquivos. Um técnico pode fazer isso de forma segura, garantindo que você não perca nada no processo.</p>
        </div>
      </>
    ),
  },
  "backup-como-proteger-seus-arquivos": {
    title: "Backup: Como Proteger Seus Arquivos Importantes",
    excerpt: "Não espere perder seus dados para fazer backup. Conheça as melhores práticas para manter seus arquivos seguros usando métodos simples e eficientes.",
    date: "2024-01-02",
    readTime: "5 min",
    category: "Segurança",
    content: (
      <>
        <p className="lead">Fotos de família, documentos importantes, trabalhos - tudo pode ser perdido em segundos por falha de hardware, vírus ou acidente. Veja como se proteger.</p>
        
        <h2>A Regra 3-2-1</h2>
        <p>Profissionais de TI usam a regra 3-2-1 para backups seguros:</p>
        <ul>
          <li><strong>3 cópias</strong> dos seus arquivos importantes</li>
          <li><strong>2 tipos</strong> de mídia diferentes (ex: HD externo + nuvem)</li>
          <li><strong>1 cópia</strong> fora de casa (em caso de incêndio, roubo, etc.)</li>
        </ul>
        
        <h2>Opções de Backup</h2>
        
        <h3>HD Externo</h3>
        <p>Simples e prático. Conecte periodicamente e copie seus arquivos importantes. Um HD de 1TB custa cerca de R$ 250-350.</p>
        
        <h3>Nuvem (Google Drive, OneDrive, iCloud)</h3>
        <p>Seus arquivos ficam sincronizados automaticamente e acessíveis de qualquer lugar. A maioria oferece espaço gratuito limitado e planos pagos para mais espaço.</p>
        
        <h3>Pen Drive</h3>
        <p>Bom para arquivos pequenos e documentos importantes. Não recomendado como único backup devido à facilidade de perder.</p>
        
        <h2>O Que Fazer Backup?</h2>
        <ul>
          <li>Fotos e vídeos pessoais</li>
          <li>Documentos importantes (RG, CPF, contratos)</li>
          <li>Arquivos de trabalho</li>
          <li>Favoritos do navegador e senhas (use um gerenciador)</li>
        </ul>
        
        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Já perdeu arquivos?</h3>
          <p className="text-muted-foreground mb-0">Em alguns casos ainda é possível recuperar dados de HDs com problema. Quanto mais rápido agir, maiores as chances. Procure um técnico especializado.</p>
        </div>
      </>
    ),
  },
  "notebook-superaquecendo-o-que-fazer": {
    title: "Notebook Superaquecendo: O Que Fazer?",
    excerpt: "Seu notebook esquenta demais e desliga sozinho? Descubra as causas do superaquecimento e como resolver esse problema comum.",
    date: "2023-12-28",
    readTime: "4 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">O superaquecimento é um dos problemas mais comuns em notebooks e pode danificar componentes caros. Entenda as causas e soluções.</p>
        
        <h2>Por Que o Notebook Esquenta?</h2>
        <p>Notebooks são compactos e têm pouco espaço para circulação de ar. Com o tempo, poeira se acumula nas saídas de ar e a pasta térmica (que ajuda a dissipar calor do processador) resseca.</p>
        
        <h2>Sinais de Superaquecimento</h2>
        <ul>
          <li>Base do notebook muito quente ao toque</li>
          <li>Ventoinha fazendo muito barulho constantemente</li>
          <li>Desligamentos repentinos durante uso intenso</li>
          <li>Travamentos quando joga ou usa programas pesados</li>
          <li>Redução de performance após alguns minutos de uso</li>
        </ul>
        
        <h2>O Que Você Pode Fazer</h2>
        <ul>
          <li><strong>Use em superfícies duras:</strong> Evite usar o notebook na cama ou sofá, que bloqueiam a ventilação</li>
          <li><strong>Use um suporte:</strong> Elevar o notebook melhora a circulação de ar</li>
          <li><strong>Limpe as saídas de ar:</strong> Com ar comprimido, remova poeira das grades de ventilação</li>
          <li><strong>Evite luz solar direta:</strong> Não deixe o notebook exposto ao sol</li>
        </ul>
        
        <h2>Quando Procurar um Técnico</h2>
        <p>Se as dicas acima não resolverem, provavelmente é hora de uma limpeza interna e troca de pasta térmica. Esse serviço requer abrir o notebook e deve ser feito por um profissional para não danificar os componentes.</p>
        
        <div className="bg-destructive/10 rounded-xl p-6 my-8 border border-destructive/20">
          <h3 className="text-destructive font-bold mb-2">⚠️ Importante</h3>
          <p className="text-muted-foreground mb-0">Ignorar o superaquecimento pode queimar o processador ou placa de vídeo, resultando em consertos caros ou até a necessidade de trocar o notebook.</p>
        </div>
      </>
    ),
  },
  "wifi-lento-como-melhorar": {
    title: "Wi-Fi Lento em Casa? Veja Como Melhorar o Sinal",
    excerpt: "Dicas práticas para melhorar a cobertura e velocidade da sua internet sem fio. Do posicionamento do roteador às configurações ideais.",
    date: "2023-12-25",
    readTime: "5 min",
    category: "Redes",
    content: (
      <>
        <p className="lead">A internet funciona bem perto do roteador, mas some em outros cômodos? Veja como resolver problemas de cobertura Wi-Fi.</p>
        
        <h2>1. Posicione o Roteador Corretamente</h2>
        <p>O lugar onde o roteador está faz toda diferença:</p>
        <ul>
          <li>Coloque no centro da casa, não em um canto</li>
          <li>Deixe em local alto (prateleira ou parede)</li>
          <li>Evite colocar dentro de armários ou atrás de móveis</li>
          <li>Mantenha longe de micro-ondas, telefones sem fio e outros equipamentos que causam interferência</li>
        </ul>
        
        <h2>2. Escolha o Canal Certo</h2>
        <p>Se muitos vizinhos usam o mesmo canal Wi-Fi, há congestionamento. Acesse as configurações do roteador e troque para um canal menos usado. Aplicativos como "WiFi Analyzer" ajudam a identificar o melhor canal.</p>
        
        <h2>3. Use a Frequência 5GHz</h2>
        <p>Roteadores modernos oferecem duas frequências:</p>
        <ul>
          <li><strong>2.4GHz:</strong> Alcança mais longe, mas é mais lenta e sofre mais interferência</li>
          <li><strong>5GHz:</strong> Mais rápida, menos interferência, mas alcance menor</li>
        </ul>
        <p>Use 5GHz onde o sinal chega bem e 2.4GHz nos cômodos mais distantes.</p>
        
        <h2>4. Considere um Repetidor ou Mesh</h2>
        <p>Se a casa é grande ou tem muitas paredes, um repetidor Wi-Fi ou sistema mesh pode ser necessário para cobrir todos os ambientes.</p>
        
        <h2>5. Atualize o Roteador</h2>
        <p>Roteadores muito antigos podem não suportar velocidades altas ou ter tecnologia ultrapassada. Se seu roteador tem mais de 4-5 anos, considere trocar por um modelo mais moderno.</p>
        
        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa de ajuda com a rede?</h3>
          <p className="text-muted-foreground mb-0">Um técnico pode analisar a cobertura da sua casa, configurar o roteador corretamente e instalar equipamentos adicionais se necessário.</p>
        </div>
      </>
    ),
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPostsContent[slug] : null;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Blog | Técnico Curitiba`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", post.excerpt);
      }
      trackPageView(`/blog/${slug}`, `Blog - ${post.title}`);
    }
  }, [post, slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <Header />
      <main>
        {/* Hero */}
        <section className="hero-gradient pt-24 pb-12 md:pt-28 md:pb-16">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Blog
              </Link>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium bg-white/20 text-white px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-white/70 text-xs">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-1 text-white/70 text-xs">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime} de leitura</span>
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <article className="max-w-3xl mx-auto prose prose-lg prose-headings:text-primary prose-headings:font-heading prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-accent">
              {post.content}
            </article>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default BlogPost;
