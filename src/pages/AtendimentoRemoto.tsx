import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { absoluteUrl } from "@/lib/siteConfig";
import { trackPageView } from "@/lib/analytics";
import { MessageCircle, Zap, Download, MapPinOff, CheckCircle2, Ban, ShieldCheck, ArrowRight, Lock } from "lucide-react";

const PATH = "/atendimento-remoto";
const TITLE = "Atendimento Remoto de Informática em Curitiba";
const DESCRIPTION =
  "Suporte remoto de informática em Curitiba para configurações, sistema, programas, e-mail, impressora já conectada, orientação e home office — com autorização e acompanhamento.";

const WHATSAPP_MESSAGE = "Preciso de suporte remoto de informática.";

const podeRemoto = [
  "Configuração de programas legítimos e ajustes do sistema",
  "Erros do Windows, atualizações pendentes e drivers",
  "Contas de e-mail que pararam de sincronizar",
  "Impressora já conectada ao computador ou à rede",
  "Acesso a arquivos, pastas, permissões e contas de usuário",
  "Problemas de navegação, extensões e configurações do navegador",
  "Orientação técnica ao usuário durante o uso real",
  "Suporte a quem trabalha em home office",
  "Diagnóstico inicial e verificação de lentidão ligada a software",
  "Configuração de ferramentas compatíveis com acesso remoto",
];

const naoRemoto = [
  "Equipamento que não liga",
  "Tela sem imagem",
  "Falhas físicas, aquecimento ou dano por líquido",
  "Conector quebrado ou bateria defeituosa",
  "HD ou SSD fisicamente danificado",
  "Falha de fonte ou de placa-mãe",
  "Rede completamente indisponível no local",
  "Qualquer situação que impeça o acesso ao sistema",
];

const comoComeca = [
  {
    titulo: "1. Triagem pelo WhatsApp",
    desc: "Você descreve o problema e conferimos se ele é compatível com acesso remoto. Casos que exigem intervenção física são redirecionados para visita ou coleta antes de qualquer cobrança.",
  },
  {
    titulo: "2. Programa de acesso de fonte legítima",
    desc: "Indicamos o programa a ser usado e a origem oficial do download. Nunca peça para instalar software de acesso enviado por remetente desconhecido ou por anúncio.",
  },
  {
    titulo: "3. Autorização explícita",
    desc: "A sessão só inicia quando você libera o acesso no próprio computador. Nada é iniciado em segundo plano nem sem o seu conhecimento.",
  },
  {
    titulo: "4. Execução acompanhada",
    desc: "Você acompanha tudo na tela enquanto o serviço é feito, e pode interromper a sessão a qualquer momento.",
  },
  {
    titulo: "5. Encerramento",
    desc: "Ao final, o acesso é encerrado. Se o programa não for mais necessário, orientamos a remoção do computador.",
  },
];

const seguranca = [
  "O acesso remoto acontece somente com a sua autorização, e você acompanha a sessão do início ao fim.",
  "Senhas bancárias, códigos de autenticação e credenciais sensíveis não devem ser enviados pelo WhatsApp.",
  "Nenhuma solicitação financeira é feita durante a sessão remota.",
  "Programas de acesso devem vir sempre de fonte legítima, indicada no atendimento.",
  "Dados pessoais são acessados apenas quando o próprio serviço exige — por isso não afirmamos que nenhum arquivo será aberto.",
  "O acesso deve ser encerrado depois do atendimento, e o programa pode ser removido a seu pedido.",
];

const fatoresValor = [
  { titulo: "Complexidade do problema", desc: "Um ajuste pontual é diferente de reconfigurar sistema, contas e programas de trabalho." },
  { titulo: "Tempo de sessão", desc: "Casos que exigem atualizações longas ou várias reinicializações ocupam mais tempo." },
  { titulo: "Quantidade de equipamentos", desc: "Atender uma máquina é diferente de padronizar várias estações de uma empresa." },
  { titulo: "Qualidade da conexão", desc: "Conexão instável alonga a sessão e, em alguns casos, inviabiliza o atendimento remoto." },
  { titulo: "Necessidade de retorno", desc: "Quando o remoto revela causa física, o caso migra para visita ou coleta, com escopo próprio." },
];

const faqs = [
  {
    question: "O que pode ser resolvido remotamente?",
    answer:
      "Configurações do sistema, erros do Windows, atualizações, drivers, instalação de programas legítimos, e-mail, impressora já conectada, acesso a arquivos e pastas, ajustes de navegador, orientação ao usuário e o diagnóstico inicial de lentidão ligada a software.",
  },
  {
    question: "Meu computador precisa estar funcionando?",
    answer:
      "Sim. O atendimento remoto depende de o equipamento ligar, o sistema carregar e existir conexão de internet estável. Sem esses três itens não há como estabelecer a sessão, e o caso passa para atendimento presencial ou coleta.",
  },
  {
    question: "O técnico consegue ver meus arquivos?",
    answer:
      "Durante a sessão, a tela do seu computador fica visível para quem atende, e alguns serviços exigem abrir pastas ou configurações. O acesso é limitado ao necessário para executar o que foi combinado, e você acompanha cada passo.",
  },
  {
    question: "Preciso informar minha senha?",
    answer:
      "Apenas a senha do próprio computador, quando o serviço não puder ser executado sem ela — e no momento do atendimento. Senhas bancárias, códigos de autenticação em duas etapas e credenciais sensíveis não devem ser enviados por mensagem.",
  },
  {
    question: "O programa de acesso fica instalado depois?",
    answer:
      "Não precisa ficar. Encerramos o acesso ao final do atendimento e, se você preferir, orientamos a remoção do programa. Não mantemos acesso permanente nem monitoramento contínuo do seu equipamento.",
  },
  {
    question: "Problemas de hardware podem ser resolvidos remotamente?",
    answer:
      "Não. Equipamento que não liga, tela sem imagem, aquecimento, dano por líquido, bateria, fonte, placa-mãe ou disco fisicamente danificado exigem avaliação presencial ou coleta. O remoto pode, no máximo, ajudar a levantar indícios antes da visita.",
  },
  {
    question: "O atendimento remoto possui garantia?",
    answer:
      "O serviço executado tem garantia sobre aquilo que foi feito, nas condições descritas na página de preços e políticas. A garantia não cobre novo problema de causa diferente nem alterações feitas depois por outra pessoa.",
  },
  {
    question: "O valor é informado antes do início?",
    answer:
      "Sim. Depois da triagem, confirmamos se o caso é compatível com acesso remoto e apresentamos o valor do atendimento. A sessão só começa após a sua aprovação.",
  },
];

const benefits = [
  {
    icon: MessageCircle,
    title: "Triagem pelo WhatsApp",
    description: "Você descreve o problema e confirmamos se ele é compatível com acesso remoto",
  },
  {
    icon: Zap,
    title: "Sem espera por deslocamento",
    description: "Casos compatíveis começam assim que a sessão é autorizada e agendada",
  },
  {
    icon: Download,
    title: "Sistema, programas e contas",
    description: "Configurações, atualizações, drivers, e-mail e programas legítimos ajustados",
  },
  {
    icon: MapPinOff,
    title: "Curitiba e região",
    description: "Atendimento remoto para residências, home office e empresas da região",
  },
];

const AtendimentoRemoto = () => {
  useEffect(() => {
    trackPageView(PATH, "Atendimento Remoto");
  }, []);

  useJsonLdSlot(
    SCHEMA_SLOTS.faq,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${absoluteUrl(PATH)}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    SLOT_PRIORITY.page,
  );

  return (
    <div className="min-h-screen bg-background">
      <LocalBusinessJsonLd
        scriptId="ld-localbusiness-remoto"
        path={PATH}
        name="Técnico em Curitiba — Suporte remoto"
        description="Suporte técnico remoto para sistemas, programas, configurações e orientações, atendendo Curitiba e região metropolitana."
        services={[
          { name: "Suporte remoto", url: "/atendimento-remoto" },
          { name: "Formatação e reinstalação de sistema", url: "/servicos/formatacao" },
          { name: "Remoção de vírus", url: "/servicos/remocao-de-virus" },
        ]}
      />
      <PageSEO
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: "Atendimento Remoto", path: PATH },
        ]}
      />
      <JsonLdSchema />
      <Header />
      <main>
        <PageHero
          title="Atendimento remoto de informática em Curitiba"
          subtitle="Resolvemos remotamente o que não exige intervenção física: configurações, sistema, programas, e-mail, impressora já conectada e orientação — com a sua autorização e o seu acompanhamento na tela."
          ctaText="Pedir suporte remoto"
          whatsappMessage={WHATSAPP_MESSAGE}
        />

        <BenefitsGrid
          benefits={benefits}
          title="Por que escolher o atendimento remoto"
          subtitle="Solução prática para problemas de software, configuração e orientação"
        />

        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-4 text-2xl md:text-3xl font-bold text-foreground">O que é atendimento remoto</h2>
              <p className="mb-3 text-muted-foreground leading-relaxed">
                Atendimento remoto é o suporte técnico executado à distância, com um programa de acesso que permite ao
                técnico operar o seu computador enquanto você acompanha tudo na tela. É a modalidade indicada quando o
                equipamento liga, o sistema carrega e existe conexão de internet estável — ou seja, quando o problema
                está no software, na configuração ou no uso, e não em uma peça.
              </p>
              <p className="mb-3 text-muted-foreground leading-relaxed">
                A vantagem é objetiva: sem deslocamento, o atendimento pode ser combinado para o horário que funciona
                para você e costuma resolver em uma única sessão o que exigiria uma visita inteira. Para quem trabalha
                em casa, isso significa voltar a produzir sem perder o dia esperando alguém chegar.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A limitação também é objetiva e é dita antes: nenhum acesso remoto conserta hardware. Se durante a
                triagem ficar claro que a causa é física, indicamos{" "}
                <Link to="/atendimento-domicilio" className="font-semibold text-accent hover:underline">
                  atendimento em domicílio
                </Link>{" "}
                ou{" "}
                <Link to="/coleta-e-entrega" className="font-semibold text-accent hover:underline">
                  coleta e entrega
                </Link>{" "}
                em vez de iniciar uma sessão que não resolveria o caso.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                O que pode (e o que não pode) ser resolvido remotamente
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background rounded-xl p-6 border-l-4 border-accent">
                  <CheckCircle2 className="h-8 w-8 text-accent mb-3" />
                  <h3 className="text-lg font-bold text-foreground mb-3">Atendido remotamente</h3>
                  <ul className="space-y-2">
                    {podeRemoto.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-background rounded-xl p-6 border-l-4 border-destructive">
                  <Ban className="h-8 w-8 text-destructive mb-3" />
                  <h3 className="text-lg font-bold text-foreground mb-3">Exige atendimento físico</h3>
                  <ul className="space-y-2">
                    {naoRemoto.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Ban className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6 text-2xl md:text-3xl font-bold text-foreground">Como a sessão começa</h2>
              <div className="space-y-5">
                {comoComeca.map((e) => (
                  <div key={e.titulo} className="rounded-xl border border-border bg-card p-5">
                    <h3 className="mb-1 font-semibold text-foreground">{e.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-4 flex items-center gap-2 text-2xl md:text-3xl font-bold text-foreground">
                <Lock className="h-6 w-6 text-accent" /> Segurança de senhas e arquivos
              </h2>
              <ul className="space-y-2">
                {seguranca.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-muted-foreground">
                    <ShieldCheck className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                As práticas completas de tratamento de arquivos, credenciais e cópias temporárias estão descritas em{" "}
                <Link to="/seguranca-dos-dados" className="font-semibold text-accent hover:underline">
                  segurança dos dados
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto grid gap-5 md:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="mb-2 text-lg font-bold text-foreground">Atendimento residencial</h2>
                <p className="text-sm text-muted-foreground">
                  Computador da família com sistema travando, programas para instalar, e-mail desconfigurado ou dúvida
                  de uso: resolvido em sessão acompanhada, sem ninguém precisar sair de casa.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="mb-2 text-lg font-bold text-foreground">Atendimento empresarial</h2>
                <p className="text-sm text-muted-foreground">
                  Usuários com problema pontual de sistema, e-mail ou programa. Demandas de estrutura, servidores e
                  padronização seguem no{" "}
                  <Link to="/servicos/suporte-tecnico-empresarial" className="font-semibold text-accent hover:underline">
                    suporte técnico empresarial
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="mb-2 text-lg font-bold text-foreground">Home office</h2>
                <p className="text-sm text-muted-foreground">
                  Câmera, microfone, reuniões, e-mail e arquivos de trabalho. O contexto completo está em{" "}
                  <Link to="/servicos/suporte-home-office" className="font-semibold text-accent hover:underline">
                    suporte para home office
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-5 text-2xl md:text-3xl font-bold text-foreground">
                Fatores que influenciam o valor do atendimento
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {fatoresValor.map((f) => (
                  <div key={f.titulo} className="rounded-xl bg-background p-5">
                    <h3 className="mb-1 font-semibold text-foreground">{f.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                As condições comerciais vigentes estão publicadas em{" "}
                <Link to="/precos-e-politicas" className="font-semibold text-accent hover:underline">
                  preços e políticas
                </Link>{" "}
                e o valor é apresentado antes da sessão começar. Veja também{" "}
                <Link to="/como-funciona" className="font-semibold text-accent hover:underline">
                  como funciona o atendimento
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <h2 className="mb-5 text-center text-xl md:text-2xl font-bold text-foreground">
              Serviços e modalidades relacionadas
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {[
                { label: "Suporte para home office", to: "/servicos/suporte-home-office" },
                { label: "Suporte empresarial", to: "/servicos/suporte-tecnico-empresarial" },
                { label: "Segurança dos dados", to: "/seguranca-dos-dados" },
                { label: "Como funciona", to: "/como-funciona" },
                { label: "Preços e políticas", to: "/precos-e-politicas" },
                { label: "Remoção de vírus", to: "/servicos/remocao-de-virus" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {l.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Perguntas frequentes sobre suporte remoto
              </h2>
              <div className="space-y-4">
                {faqs.map((f) => (
                  <div key={f.question} className="rounded-xl border border-border bg-background p-5">
                    <h3 className="flex items-start gap-2 font-bold text-foreground mb-2">
                      <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                      {f.question}
                    </h3>
                    <p className="pl-7 text-muted-foreground leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <TrustSection />
        <CTASection />
      </main>
      <RealImageSection imageKey="suporteRemoto" caption="Suporte técnico remoto profissional" />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default AtendimentoRemoto;
