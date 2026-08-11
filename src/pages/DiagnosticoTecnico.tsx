import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { IMAGES } from "@/lib/images";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER as WA_NUMBER, SITE_BASE_URL } from "@/lib/siteConfig";
import { commercialConfig } from "@/lib/config/commercial";
import { VALOR_COLETA_MINIMO_LABEL } from "@/lib/precosConfig";
import {
  Search, AlertTriangle, CheckCircle2, ArrowRight,
  MessageCircle, DollarSign, Wrench, CircleDollarSign, ClipboardList,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const WHATSAPP_NUMBER = WA_NUMBER;

const TITLE = "Diagnóstico técnico de computador e notebook em Curitiba";
const DESCRIPTION =
  "Diagnóstico técnico para descobrir a causa real da falha antes de trocar peça: o que é testado, o que o laudo entrega, limites e como o valor é definido.";

/** O que é testado, organizado por sintoma relatado — não por catálogo de serviço. */
const ROTEIRO_POR_SINTOMA = [
  {
    sintoma: "Não liga ou não dá vídeo",
    testes: [
      "Fonte, carregador e circuito de alimentação",
      "Sinal de energia na placa e resposta ao acionamento",
      "Memória e vídeo isolados, um componente por vez",
      "Tela, cabo e conector quando há som mas não há imagem",
    ],
  },
  {
    sintoma: "Lentidão e travamento",
    testes: [
      "Saúde do armazenamento e taxa real de leitura",
      "Consumo de memória em uso normal e multitarefa",
      "Processos de inicialização, serviços e extensões",
      "Temperatura sob carga para descartar redução de desempenho por calor",
    ],
  },
  {
    sintoma: "Desliga, reinicia ou dá tela azul",
    testes: [
      "Registro de erros e códigos de parada do sistema",
      "Teste de memória e de integridade do disco",
      "Estabilidade da fonte e comportamento sob carga",
      "Temperatura de processador e placa de vídeo em uso contínuo",
    ],
  },
  {
    sintoma: "Esquenta, faz ruído ou perde desempenho",
    testes: [
      "Fluxo de ar, obstrução do dissipador e estado do cooler",
      "Condição da interface térmica e da montagem do conjunto",
      "Curva de temperatura antes e depois da limpeza",
      "Leitura dos sensores para descartar falha de medição",
    ],
  },
  {
    sintoma: "Não reconhece o disco ou perdeu arquivos",
    testes: [
      "Reconhecimento da mídia sem gravar nada por cima",
      "Leitura dos indicadores de saúde e de setores com falha",
      "Estrutura de partição e integridade do sistema de arquivos",
      "Viabilidade de cópia antes de qualquer tentativa de reparo",
    ],
  },
  {
    sintoma: "Rede, internet ou periféricos falhando",
    testes: [
      "Cobertura de sinal, canal e interferência no ambiente",
      "Cabo, porta, adaptador e driver do equipamento",
      "Comportamento da falha em outro ponto e em outro aparelho",
      "Configuração de rede, compartilhamento e impressora quando aplicável",
    ],
  },
];

const ENTREGAS = [
  { title: "Causa provável identificada", desc: "Qual componente ou camada está gerando o sintoma, e com qual grau de certeza." },
  { title: "O que foi testado", desc: "A lista dos testes realizados e o resultado de cada um — sem 'achismo' registrado como conclusão." },
  { title: "Viabilidade do reparo", desc: "Se o serviço compensa frente ao valor do equipamento, e quando a resposta honesta é não reparar." },
  { title: "Caminhos possíveis", desc: "As alternativas disponíveis, com o que cada uma preserva, custa e resolve." },
  { title: "Valor para aprovação", desc: "O valor do serviço apresentado antes da execução, para você decidir sem pressa." },
  { title: "Riscos declarados", desc: "O que pode aparecer durante a execução e o que não é possível garantir de antemão." },
];

const NAO_E = [
  "Não é reparo: o diagnóstico identifica a causa, a execução vem depois e só com a sua aprovação.",
  "Não é garantia de conserto: existem falhas sem reparo viável, e dizemos isso em vez de tentar às cegas.",
  "Não é orçamento por telefone: uma estimativa dada pela descrição do sintoma não substitui o teste no equipamento.",
  "Não é troca por tentativa: nenhuma peça é substituída para 'ver se resolve' às suas custas.",
  "Não é perícia forense nem laudo judicial: esse escopo exige profissional habilitado para essa finalidade.",
];

const FAQ_ITEMS = [
  { q: "O diagnóstico é cobrado?", a: `Sim. O diagnóstico é o trabalho técnico de descobrir a causa e parte de ${commercialConfig.diagnosticoLabel}. Quando o serviço é aprovado, esse valor é abatido do total. Se você preferir não seguir, paga somente o diagnóstico e recebe a explicação do que foi encontrado.` },
  { q: "Consigo um valor sem enviar o equipamento?", a: "Conseguimos indicar faixas e cenários prováveis pela descrição do sintoma, e isso já ajuda a decidir se vale seguir. O valor firme, porém, só sai depois dos testes: o mesmo sintoma pode ter causas de custos bem diferentes." },
  { q: "Quanto tempo leva?", a: "Depende do sintoma. Falhas que se reproduzem na hora são identificadas na própria avaliação; falhas intermitentes exigem tempo de observação em uso, porque um equipamento que só falha depois de uma hora ligado precisa ficar uma hora ligado. O prazo estimado é informado assim que o caso é aberto." },
  { q: "Dá para diagnosticar remotamente?", a: "Quando a máquina liga e conecta, boa parte da investigação de software pode ser feita por acesso remoto. Sintomas de energia, temperatura, tela, conector e ruído precisam do equipamento em mãos, porque dependem de medição física." },
  { q: "O equipamento pode piorar durante a avaliação?", a: "O objetivo do diagnóstico é justamente evitar isso, e por isso trabalhamos do teste menos invasivo para o mais invasivo. Em mídias com suspeita de falha física, avaliamos sem gravar nada por cima. Ainda assim, equipamentos já danificados podem apresentar agravamento no momento em que são ligados — quando esse risco existe, avisamos antes." },
  { q: "E se o diagnóstico apontar que não compensa consertar?", a: "Você recebe os números e a explicação do porquê. Preferimos perder um reparo do que entregar um serviço caro em um equipamento que voltaria com problema. Nesses casos orientamos sobre aproveitamento de peças, migração de dados e substituição do aparelho." },
  { q: "Já sei qual é o defeito. Preciso mesmo do diagnóstico?", a: "Se o componente já está identificado e o serviço é direto, seguimos para a execução com o valor aprovado. A avaliação existe para quando o sintoma admite mais de uma causa — que é a maioria dos casos de lentidão, desligamento e falha de inicialização." },
  { q: "O diagnóstico serve para decidir entre consertar e trocar?", a: "Sim, e essa é uma das razões mais úteis para fazê-lo. Com a causa na mesa dá para comparar o custo do reparo, a vida útil restante do equipamento e o valor de um aparelho equivalente." },
  { q: "Vocês avaliam equipamento que já passou por outro técnico?", a: "Avaliamos, e isso é comum. Informe o que já foi feito e quais peças foram trocadas: esse histórico encurta a investigação e evita repetir o mesmo teste." },
  { q: "Como funciona quando o equipamento precisa ser coletado?", a: `Na modalidade com coleta e entrega existe um valor mínimo pré-aprovado de ${VALOR_COLETA_MINIMO_LABEL}, que cobre retirada, transporte e a avaliação. As condições completas estão na página de preços e políticas.` },
];

const DiagnosticoTecnico = () => {
  useEffect(() => {
    document.title = TITLE;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", DESCRIPTION);
    trackPageView("/diagnostico-tecnico", "Diagnóstico Técnico");
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Quero um diagnóstico técnico. Vou descrever o que está acontecendo com o equipamento.")}`;
  const handleCTA = (label: string) => trackCTAClick("whatsapp", `diagnostico-${label}`);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title={TITLE} description={DESCRIPTION} path="/diagnostico-tecnico" breadcrumbs={[{ name: "Início", path: "/" }, { name: "Diagnóstico Técnico", path: "/diagnostico-tecnico" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map(f => ({
          "@type": "Question", name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Diagnóstico Técnico", item: `${SITE_BASE_URL}/diagnostico-tecnico` },
        ],
      })}} />
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Diagnóstico Técnico" }]} />

      <main>
        {/* HERO — problema primeiro */}
        <section className="relative hero-gradient pt-10 pb-10 md:pt-12 md:pb-12">
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/80">
                Avaliação técnica em Curitiba
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                Diagnóstico técnico antes do reparo
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                O equipamento trava, desliga sozinho, ficou lento ou simplesmente não liga — e ninguém
                consegue dizer o motivo. O diagnóstico existe para responder isso com teste, não com
                palpite: qual componente está falhando, se o reparo compensa e quanto custa antes de
                você aprovar qualquer coisa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="heroWhatsapp" size="lg" asChild onClick={() => handleCTA("hero")}>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" /> Descrever meu problema
                  </a>
                </Button>
                <Button variant="heroCta" size="lg" asChild>
                  <Link to="/precos-e-politicas">
                    <DollarSign className="h-5 w-5" /> Preços e políticas
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-0 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto -mt-8 relative z-20">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img src={IMAGES.diagnostico} alt={IMAGES.diagnosticoAlt} className="w-full h-48 md:h-64 object-cover" loading="eager" width="800" height="400" />
              </div>
            </div>
          </div>
        </section>

        {/* POR QUE O MESMO SINTOMA TEM VÁRIAS CAUSAS */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Por que o mesmo sintoma tem várias causas possíveis
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Um computador que reinicia sozinho pode estar com fonte instável, memória com
                  defeito, superaquecimento, driver conflitante ou disco no fim da vida. São cinco
                  origens diferentes, com cinco custos diferentes, produzindo exatamente o mesmo
                  sintoma na sua mesa. É por isso que trocar peça pela descrição do problema costuma
                  sair mais caro: quando a primeira tentativa não resolve, a segunda também é paga.
                </p>
                <p>
                  O diagnóstico inverte essa lógica. Em vez de partir da peça, parte do sintoma e
                  elimina hipóteses por teste — isolando componente por componente até sobrar a causa
                  que se sustenta. Só então a conversa passa a ser sobre serviço, peça e valor.
                </p>
                <p>
                  Ele também tem uma função menos óbvia e igualmente importante: dizer quando
                  <strong className="text-foreground"> não</strong> vale consertar. Equipamento antigo com
                  falha em componente caro é uma conta que raramente fecha, e você merece saber disso
                  antes de investir, não depois.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* O QUE É TESTADO POR SINTOMA */}
        <section className="py-8 md:py-10 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                O que é testado, conforme o sintoma relatado
              </h2>
              <p className="text-muted-foreground mb-8 max-w-3xl">
                Não existe uma bateria única aplicada a todo equipamento. O roteiro muda conforme o
                que você descreve na triagem — e é isso que evita cobrar tempo por teste que não tem
                relação com o seu caso.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {ROTEIRO_POR_SINTOMA.map((bloco) => (
                  <div key={bloco.sintoma} className="rounded-xl bg-background p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Search className="h-5 w-5 flex-shrink-0 text-accent" />
                      <h3 className="font-bold text-foreground">{bloco.sintoma}</h3>
                    </div>
                    <ul className="space-y-2">
                      {bloco.testes.map((t) => (
                        <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* O QUE VOCÊ RECEBE */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                O que você recebe no fim da avaliação
              </h2>
              <p className="text-muted-foreground mb-8 max-w-3xl">
                O diagnóstico só cumpre a função quando vira informação que você consegue usar para
                decidir — inclusive para decidir não fazer o serviço conosco.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {ENTREGAS.map((item) => (
                  <div key={item.title} className="rounded-xl bg-secondary p-5">
                    <ClipboardList className="mb-2 h-5 w-5 text-accent" />
                    <h3 className="mb-1 font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* O QUE O DIAGNÓSTICO NÃO É */}
        <section className="py-8 md:py-10 bg-accent/5">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                O que o diagnóstico não é
              </h2>
              <ul className="space-y-3">
                {NAO_E.map((t) => (
                  <li key={t} className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* MODALIDADES */}
        <section className="py-8 md:py-10 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Onde a avaliação acontece
              </h2>
              <p className="text-muted-foreground mb-8 max-w-3xl">
                A modalidade é escolhida pelo tipo de sintoma, não pela conveniência de agenda. Um
                problema de configuração não exige tirar o equipamento da sua mesa; uma falha de
                energia exige medição, e medição precisa do aparelho em mãos.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { title: "Remoto", desc: "Sistema, lentidão, configuração, rede lógica e acessos. Você acompanha a sessão do começo ao fim.", to: "/atendimento-remoto", label: "Como funciona o remoto" },
                  { title: "No seu endereço", desc: "Quando o equipamento não pode sair do lugar ou o problema envolve o ambiente: rede, cabeamento, energia, periféricos.", to: "/atendimento-domicilio", label: "Atendimento em domicílio" },
                  { title: "Com coleta e entrega", desc: "Sintomas que exigem tempo de bancada e observação em uso contínuo, com transporte agendado.", to: "/coleta-e-entrega", label: "Coleta e entrega" },
                ].map((m) => (
                  <div key={m.title} className="flex flex-col rounded-xl bg-background p-5">
                    <Wrench className="mb-2 h-5 w-5 text-accent" />
                    <h3 className="mb-1 font-bold text-foreground">{m.title}</h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">{m.desc}</p>
                    <Link to={m.to} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
                      {m.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VALOR */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="rounded-2xl border-2 border-accent/20 bg-secondary p-8">
                <CircleDollarSign className="mb-4 h-10 w-10 text-accent" />
                <h2 className="mb-4 text-2xl md:text-3xl font-bold text-foreground">
                  Como o valor é definido
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Atendimentos a partir de <strong className="text-foreground">{commercialConfig.minPriceLabel}</strong>,
                    e o diagnóstico parte de <strong className="text-foreground">{commercialConfig.diagnosticoLabel}</strong>.
                    Aprovando o serviço, o valor do diagnóstico é abatido do total.
                  </p>
                  <p>
                    Na modalidade com coleta e entrega existe um valor mínimo pré-aprovado de{" "}
                    <strong className="text-foreground">{VALOR_COLETA_MINIMO_LABEL}</strong>, que cobre
                    retirada, transporte e avaliação. Se você desistir depois do resultado, o
                    combinado da modalidade é o que vale — sempre informado antes da coleta.
                  </p>
                  <p className="text-sm">{commercialConfig.pricingDisclaimer}</p>
                  <p className="text-sm">{commercialConfig.policies.preAprovacao}</p>
                </div>
                <Button variant="cta" size="lg" asChild className="mt-6">
                  <Link to="/precos-e-politicas">
                    Ver preços e políticas <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-8 md:py-10 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Dúvidas sobre o diagnóstico
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {FAQ_ITEMS.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border-none bg-background px-5">
                    <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Links relacionados */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <h2 className="mb-5 text-center text-xl md:text-2xl font-bold text-foreground">
              Depois do diagnóstico
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-muted-foreground">
              A execução só acontece após a sua aprovação. Falhas intermitentes podem exigir mais de
              uma etapa de observação, e nem todo reparo é viável — quando não for, dizemos.
            </p>
            <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
              {[
                { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
                { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook" },
                { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
                { label: "Upgrade de SSD e memória", to: "/servicos/upgrade-ssd-ram" },
                { label: "Quando não compensa reparar", to: "/quando-nao-compensa" },
                { label: "Como funciona o atendimento", to: "/como-funciona" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {l.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-primary py-10 md:py-20">
          <div className="container mx-auto text-center">
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white">
              Descreva o sintoma e nós indicamos o próximo passo
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-white/90">
              Quanto mais detalhe você der — quando começou, o que muda o comportamento, o que já foi
              tentado —, mais curta fica a investigação.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="heroWhatsapp" size="lg" asChild onClick={() => handleCTA("cta-final")}>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" /> Falar no WhatsApp
                </a>
              </Button>
              <Button variant="heroCta" size="lg" asChild>
                <Link to="/como-funciona">
                  Como funciona <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default DiagnosticoTecnico;
