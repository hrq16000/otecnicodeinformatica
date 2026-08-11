import { lazy, Suspense } from "react";
import { siteConfig, whatsappLink } from "@/lib/siteConfig";
import { EeatProofsSection } from "@/components/EeatProofsSection";
import { ProvasDeConfiancaSection } from "@/components/home/ProvasDeConfiancaSection";
import { AtendimentoFluxoSection } from "@/components/home/AtendimentoFluxoSection";
import { BancadaRealSection } from "@/components/home/BancadaRealSection";
import { RegioesCuritibaSection } from "@/components/home/RegioesCuritibaSection";

import {
  VALOR_VISITA_LABEL,
  VALOR_PACOTE_2H_LABEL,
  VALOR_COLETA_MINIMO_LABEL,
  REGRA_CANCELAMENTO,
  QUANDO_VISITA_COMPATIVEL,
} from "@/lib/precosConfig";


const ReviewsGrid = lazy(() =>
  import("@/components/ReviewsGrid").then((m) => ({ default: m.ReviewsGrid })),
);

const wa = (msg: string) => whatsappLink(msg);
const track = (loc: string) =>
  import("@/lib/analytics").then(({ trackCTAClick }) => trackCTAClick("whatsapp", loc));

// ── Dados ────────────────────────────────────────────────────────
/**
 * RODADA 2A — a Home começa pelo sintoma, não pelo catálogo. O visitante
 * quase nunca sabe nomear o serviço; ele sabe descrever o que está vendo.
 */
const pains = [
  { t: "Está lento demais", d: "Demora para ligar, trava ao abrir programas e engasga com várias abas." },
  { t: "Não liga", d: "Sem reação, sem luz ou liga e desliga em seguida." },
  { t: "Esquenta e desliga sozinho", d: "Ventoinha acelerada, base quente e desligamento no meio do uso." },
  { t: "Tela azul e erros do Windows", d: "Reinícios inesperados, falha de inicialização e mensagens de erro recorrentes." },
  { t: "Tela sem imagem", d: "O equipamento parece ligar, mas a tela fica preta, piscando ou com manchas." },
  { t: "Ficou sem espaço", d: "Disco cheio, atualização travada e avisos de armazenamento insuficiente." },
  { t: "Bateria ou teclado com defeito", d: "Não segura carga, só funciona na tomada, teclas falhando ou travadas." },
  { t: "Precisa de mais desempenho", d: "SSD, memória ou troca de peça para o equipamento acompanhar o uso atual." },
  { t: "Perdi arquivos", d: "Exclusão acidental, disco não reconhecido ou pasta que sumiu depois de uma falha." },
  { t: "Internet e rede instáveis", d: "Wi-Fi caindo, sinal fraco em parte do imóvel ou cabeamento improvisado." },
  { t: "Computador da empresa fora de operação", d: "Estação parada, sistema inacessível ou impressora e rede travando o time." },
  { t: "Quero montar ou atualizar um PC", d: "Configuração nova, troca de plataforma ou upgrade planejado por etapas." },
];

const services = [
  { t: "Manutenção de notebooks", d: "Limpeza interna, pasta térmica, teclado, dobradiça, carga e falhas de placa.", loc: "svc_notebook", cta: "Ver manutenção de notebook →", href: "/servicos/manutencao-de-notebook" },
  { t: "Manutenção de computadores", d: "Desktop e All in One: diagnóstico de hardware, energia, armazenamento e temperatura.", loc: "svc_pc", cta: "Ver manutenção de PC →", href: "/servicos/manutencao-de-computador" },
  { t: "Formatação e sistemas", d: "Reinstalação do Windows, drivers, contas, licenças e programas de trabalho.", loc: "svc_formatacao", cta: "Ver formatação e sistema →", href: "/servicos/formatacao" },
  { t: "Upgrade de SSD e memória", d: "Troca por SSD, ampliação de RAM e migração do sistema sem começar do zero.", loc: "svc_upgrade", cta: "Ver upgrade de SSD e RAM →", href: "/servicos/upgrade-ssd-ram" },
  { t: "Limpeza e manutenção preventiva", d: "Rotina para evitar superaquecimento, ruído e desligamento em uso pesado.", loc: "svc_preventiva", cta: "Ver manutenção preventiva →", href: "/servicos/manutencao-preventiva-empresas" },
  { t: "Recuperação de dados", d: "Tentativa de leitura e cópia de arquivos conforme o estado real da mídia.", loc: "svc_dados", cta: "Ver recuperação de dados →", href: "/servicos/recuperacao-de-dados" },
  { t: "Montagem e upgrade de PCs", d: "Configuração definida pelo uso — trabalho, estudo, edição ou jogos.", loc: "svc_montagem", cta: "Ver montagem de PC →", href: "/servicos/montagem-de-pc" },
  { t: "Redes e suporte para empresas", d: "Estações, Wi-Fi, cabeamento e suporte técnico para a operação não parar.", loc: "svc_empresa", cta: "Ver suporte empresarial →", href: "/servicos/suporte-tecnico-empresarial" },
];

const faqs = [
  { q: "Quanto custa o atendimento?", a: "Os atendimentos começam a partir de R$ 99,99. Esse é um valor inicial, não um preço fechado: a modalidade (remoto, visita ou coleta), o equipamento e o problema mudam o total. Peças, componentes e licenças nunca estão inclusas." },
  { q: "Preciso saber qual é o defeito antes de chamar?", a: "Não. Descrever o sintoma já basta: o que aparece na tela, quando começou, se cai energia, se faz barulho. Identificar a causa é parte do nosso trabalho, não do seu." },
  { q: "Vocês atendem em casa?", a: "Sim, quando a visita é compatível com o caso. Ela funciona bem quando a máquina liga e a necessidade é configuração, sistema ou instalação de peça. Falha de hardware costuma exigir bancada, e aí o caminho é a coleta." },
  { q: "Atendem empresas?", a: "Sim. Estações de trabalho, rede, impressoras, incidentes que param o time e manutenção programada. A triagem empresarial prioriza o que impede as pessoas de trabalhar." },
  { q: "Fazem atendimento remoto?", a: "Em parte dos casos de software — sistema, configuração, e-mail, programas — o acesso remoto resolve sem deslocamento. Problema físico não se resolve remotamente, e dizemos isso na triagem." },
  { q: "Trabalham com notebook?", a: "Sim, é a maior parte da demanda: lentidão, superaquecimento, não liga, tela, teclado, bateria, carga e upgrades." },
  { q: "Fazem upgrade para SSD?", a: "Sim, com checagem de compatibilidade antes. Quando possível, o sistema é migrado para o SSD para você não perder programas e configurações. O SSD é peça e é cobrado à parte." },
  { q: "Trabalham com computador gamer?", a: "Sim. Montagem, troca de plataforma, refrigeração, fonte e diagnóstico de instabilidade sob carga entram no mesmo escopo técnico." },
  { q: "Recuperam arquivos?", a: "Fazemos a tentativa e explicamos o cenário real antes. Recuperação de dados não é garantida: depende do estado da mídia, e disco com falha mecânica interna exige laboratório especializado." },
  { q: "O diagnóstico tem custo?", a: "Sim, o diagnóstico é trabalho técnico e está dentro do valor da modalidade escolhida. O que não acontece é execução de serviço sem você aprovar antes." },
  { q: "Peças estão incluídas?", a: "Não. Peças, componentes, licenças e materiais são orçados separadamente e só são comprados depois da sua aprovação." },
  { q: "Como funciona a coleta?", a: "Na modalidade de diagnóstico com compromisso, a coleta e a entrega estão inclusas no valor mínimo pré-aprovado de R$ 299,99. O cancelamento vale até 24 horas corridas após a coleta." },
];

/** Hubs de distribuição de autoridade: cada bloco cobre uma intenção distinta. */
const authorityHubs: { t: string; d: string; links: { href: string; label: string }[] }[] = [
  {
    t: "Serviços mais procurados",
    d: "Páginas com escopo, prazo e limites de cada reparo.",
    links: [
      { href: "/servicos/formatacao", label: "Formatação de computador" },
      { href: "/servicos/manutencao-de-notebook", label: "Manutenção de notebook" },
      { href: "/servicos/upgrade-ssd-ram", label: "Upgrade de SSD e memória" },
      { href: "/servicos/recuperacao-de-dados", label: "Recuperação de dados" },
      { href: "/servicos", label: "Ver todos os serviços" },
    ],
  },
  {
    t: "Como o atendimento funciona",
    d: "Formatos, valores e o que esperar antes de agendar.",
    links: [
      { href: "/como-funciona", label: "Como funciona o atendimento" },
      { href: "/precos-e-politicas", label: "Preços e políticas" },
      { href: "/equipamentos-atendidos", label: "Equipamentos atendidos" },
      { href: "/quando-nao-compensa", label: "Quando não compensa consertar" },
      { href: "/faq", label: "Perguntas frequentes" },
    ],
  },
  {
    t: "Diagnóstico e referência",
    d: "Conteúdo técnico para identificar o problema antes do contato.",
    links: [
      { href: "/diagnostico-60s", label: "Diagnóstico em 60 segundos" },
      { href: "/problemas-reais-e-casos", label: "Problemas reais e casos" },
      { href: "/marcas", label: "Marcas atendidas" },
      { href: "/tecnico-informatica-curitiba", label: "Técnico de informática em Curitiba" },
      { href: "/blog", label: "Blog técnico" },
    ],
  },
  {
    t: "Cobertura local",
    d: "Bairros de Curitiba e cidades da região com página própria.",
    links: [
      { href: "/tecnico-informatica-curitiba", label: "Atendimento em Curitiba (página principal)" },
      { href: "/bairros/batel", label: "Atendimento técnico no Batel" },
      { href: "/bairros/agua-verde", label: "Suporte de informática no Água Verde" },
      { href: "/tecnico-informatica-sao-jose-pinhais", label: "Suporte técnico em São José dos Pinhais" },
      { href: "/tecnico-informatica-pinhais", label: "Manutenção de computador em Pinhais" },
    ],
  },
];


// ── UI helpers ───────────────────────────────────────────────────
const SectionTitle = ({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) => (
  <div className="mx-auto mb-10 max-w-2xl text-center">
    {eyebrow && (
      <span className="text-xs font-bold uppercase tracking-wider text-accent">{eyebrow}</span>
    )}
    <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
      {title}
    </h2>
    {sub && <p className="mt-3 text-base text-muted-foreground">{sub}</p>}
  </div>
);

/** Link de transparência obrigatório junto de qualquer CTA único. */
const TermosLink = ({ className = "" }: { className?: string }) => (
  <p className={`text-xs text-muted-foreground ${className}`}>
    Antes de agendar, confira os{" "}
    <a href="/termos-e-condicoes" className="underline underline-offset-2 hover:text-foreground">
      termos, condições, valores e prazos
    </a>
    .
  </p>
);

const FunnelButton = ({ loc, msg, children, variant = "accent" }: { loc: string; msg: string; children: React.ReactNode; variant?: "accent" | "ghost" }) => (

  <a
    href={wa(msg)}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => track(loc)}
    data-cta-location={loc}
    className={
      variant === "accent"
        ? "inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-bold text-accent-foreground transition-transform hover:scale-[1.02]"
        : "inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
    }
  >
    {children}
  </a>
);

export const HomeSections = () => {
  return (
    <>
      {/* 2. DORES */}
      <section className="border-b border-border bg-secondary py-14 md:py-18">
        <div className="container mx-auto">
          <SectionTitle
            eyebrow="Comece pelo sintoma"
            title="Problemas que resolvemos todo dia"
            sub="Você não precisa saber o nome do defeito. Reconheça o sintoma abaixo e descreva com suas palavras — o diagnóstico é nosso trabalho."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pains.map((p) => (
              <div key={p.t} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-base font-bold text-foreground">{p.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVIÇOS */}
      <section id="servicos" className="py-14 md:py-18">
        <div className="container mx-auto">
          <SectionTitle
            eyebrow="Serviços"
            title="O que fazemos, em ordem do que mais chega aqui"
            sub="Notebook e computador em primeiro lugar, depois sistema, upgrade, dados e ambiente empresarial. Cada página explica escopo, limites e o que não está incluso."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.t} className="flex flex-col rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-md)]">
                <h3 className="font-heading text-base font-bold leading-snug text-foreground">
                  <a href={s.href} className="transition-colors hover:text-accent hover:underline">
                    {s.t}
                  </a>
                </h3>
                <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{s.d}</p>
                <a
                  href={s.href}
                  data-cta-location={s.loc}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent hover:underline"
                >
                  {s.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <a href="/servicos" className="font-semibold text-accent hover:underline">Ver todos os serviços</a>
            {" · "}
            <a href="/termos-e-condicoes" className="underline underline-offset-2 hover:text-foreground">
              termos, condições, valores e prazos
            </a>
          </p>

        </div>
      </section>

      {/* 4. ROTEADOR PF × PJ — separa a intenção antes de abrir a triagem */}
      <section className="border-y border-border bg-secondary py-14 md:py-18">
        <div className="container mx-auto">
          <SectionTitle
            eyebrow="Dois contextos diferentes"
            title="Uso pessoal ou operação de empresa?"
            sub="Em casa, o objetivo é devolver o equipamento funcionando. Na empresa, o objetivo é a equipe voltar a trabalhar — e isso muda prioridade, prazo e forma de atendimento."
          />
          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Pessoa física
              </span>
              <h3 className="mt-3 font-heading text-lg font-bold text-foreground">
                Residencial e uso pessoal
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                Notebook e PC lentos, formatação, remoção de vírus, upgrade de SSD/RAM,
                backup de fotos e documentos, Wi-Fi doméstico e recuperação de dados.
                O atendimento pode ser no endereço, remoto ou com coleta, conforme o caso.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/atendimento-domicilio" className="font-semibold text-accent hover:underline">
                    Atendimento em domicílio
                  </a>{" "}
                  — o técnico vai até o seu endereço.
                </li>
                <li>
                  <a href="/coleta-e-entrega" className="font-semibold text-accent hover:underline">
                    Coleta e entrega
                  </a>{" "}
                  — quando o reparo exige bancada.
                </li>
                <li>
                  <a href="/atendimento-remoto" className="font-semibold text-accent hover:underline">
                    Atendimento remoto
                  </a>{" "}
                  — problemas de software resolvidos à distância.
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <FunnelButton
                  loc="home_router_pf"
                  msg="Olá! Sou pessoa física e preciso de atendimento para o meu equipamento."
                >
                  Sou pessoa física
                </FunnelButton>
                <a
                  href="/atendimento-domicilio"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  Ver atendimento residencial
                </a>
              </div>
              <TermosLink className="mt-3" />

            </div>

            <div className="flex flex-col rounded-2xl border border-accent/30 bg-accent/[0.04] p-6">
              <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
                Empresa
              </span>
              <h3 className="mt-3 font-heading text-lg font-bold text-foreground">
                Empresarial e profissional
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                Estações de trabalho, rede e cabeamento, suporte técnico contínuo,
                manutenção preventiva e resposta a urgências operacionais. A triagem
                empresarial prioriza o que impede a equipe de trabalhar.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/empresa-de-ti-curitiba" className="font-semibold text-accent hover:underline">
                    Empresa de TI em Curitiba
                  </a>{" "}
                  — diagnóstico do ambiente e organização do suporte.
                </li>
                <li>
                  <a href="/servicos/suporte-tecnico-empresarial" className="font-semibold text-accent hover:underline">
                    Suporte técnico empresarial
                  </a>{" "}
                  — atendimento recorrente sob demanda.
                </li>
                <li>
                  <a href="/servicos/redes-e-wifi" className="font-semibold text-accent hover:underline">
                    Redes e Wi-Fi
                  </a>{" "}
                  — conexão estável em todo o escritório.
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <FunnelButton
                  loc="home_router_pj"
                  msg="Olá! Represento uma empresa em Curitiba e preciso de suporte de informática."
                >
                  Somos empresa
                </FunnelButton>
                <a
                  href="/empresa-de-ti-curitiba"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  Ver atendimento empresarial
                </a>
              </div>
              <TermosLink className="mt-3" />

            </div>
          </div>
        </div>
      </section>


      {/* 5. COMO FUNCIONA — fluxo de conversão WhatsApp → triagem → diagnóstico → remoto/local/bancada */}
      <AtendimentoFluxoSection />

      {/* 5A. PROVAS DE CONFIANÇA VERIFICÁVEIS (garantia, NF, atendimento local) */}
      <ProvasDeConfiancaSection />

      {/* 5B. PROVA REAL — bancada, técnico identificado e atendimento (fail-closed) */}
      <BancadaRealSection />


      {/* 6. PREÇOS E POLÍTICAS */}
      <section className="border-y border-border bg-secondary py-14 md:py-18">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Como funciona o valor
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Não publicamos preço fechado por serviço porque o mesmo sintoma pode ter causas de
              custo muito diferente. O que publicamos é o ponto de partida e a regra: você aprova
              antes de qualquer execução.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent" aria-hidden="true">▸</span>
                <span>
                  Diagnóstico/visita a partir de <strong className="text-foreground">{VALOR_VISITA_LABEL}</strong> — no
                  atendimento avulso é <strong className="text-foreground">visita técnica de inspeção sem compromisso</strong>,
                  a partir de R$ 99,99 por até (ou a cada) 30 minutos de atendimento.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent" aria-hidden="true">▸</span>
                <span>
                  Pacote pré-acordado de visita técnica de até 2 horas por{" "}
                  <strong className="text-foreground">{VALOR_PACOTE_2H_LABEL}</strong>, sem promessas e sem peças inclusas.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent" aria-hidden="true">▸</span>
                <span>
                  Na maioria dos casos: diagnóstico com compromisso e tentativa de reparos compatíveis, com coleta e entrega
                  inclusas, valor mínimo pré-aprovado de <strong className="text-foreground">{VALOR_COLETA_MINIMO_LABEL}</strong>.
                  Peças não inclusas.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent" aria-hidden="true">▸</span>
                <span>{REGRA_CANCELAMENTO}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent" aria-hidden="true">▸</span>
                <span>{QUANDO_VISITA_COMPATIVEL}</span>
              </li>
            </ul>

            <p className="mt-5 rounded-lg bg-secondary p-4 text-sm text-muted-foreground">
              {siteConfig.pricingDisclaimer}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <FunnelButton loc="pricing_cta" msg="Olá! Quero um valor para meu equipamento.">
                Iniciar atendimento
              </FunnelButton>
              <a
                href="/precos-e-politicas"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Ver preços e políticas
              </a>
            </div>
            <TermosLink className="mt-3" />

          </div>
        </div>
      </section>

      {/* 7. PROVA DE CONFIANÇA REAL (sem rating inventado) */}
      <section className="py-14 md:py-18">
        <div className="container mx-auto">
          <Suspense fallback={<div style={{ minHeight: 320 }} aria-hidden="true" />}>
            <ReviewsGrid title="O que dizem sobre o atendimento" whatsappCta limit={6} />
          </Suspense>
        </div>
      </section>

      {/* 8. ÁREAS ATENDIDAS — regiões e bairros de Curitiba + RMC (sem endereço/CEP) */}
      <RegioesCuritibaSection />


      {/* 8B. DISTRIBUIDORA DE AUTORIDADE — hub de links internos por intenção */}
      <section className="py-14 md:py-18">
        <div className="container mx-auto">
          <SectionTitle
            eyebrow="Continue por aqui"
            title="Encontre a página certa para o seu caso"
            sub="Cada bloco leva direto ao conteúdo específico, sem repetir a mesma explicação."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {authorityHubs.map((hub) => (
              <nav key={hub.t} aria-label={hub.t} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-heading text-base font-bold text-foreground">{hub.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{hub.d}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {hub.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="font-medium text-foreground transition-colors hover:text-accent hover:underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </section>



      {/* 9. FAQ */}
      <section className="py-14 md:py-18">
        <div className="container mx-auto">
          <SectionTitle
            eyebrow="Dúvidas frequentes"
            title="O que as pessoas perguntam antes de chamar"
            sub="Respostas diretas sobre valor, modalidade, peças e limites técnicos."
          />
          <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-accent transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9b. PROVAS DE E-E-A-T (só renderiza com dado real cadastrado) */}
      <EeatProofsSection className="bg-secondary/40" />

      {/* 10. CTA FINAL */}
      <section className="bg-[hsl(var(--hero-bg))] py-16 text-white md:py-20">
        <div className="container mx-auto text-center">
          <h2 className="mx-auto max-w-2xl font-heading text-2xl font-bold tracking-tight md:text-3xl">
            Descreva o problema. A parte técnica é com a gente.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Conte o que está acontecendo com o equipamento pelo WhatsApp e receba a modalidade
            indicada, o prazo estimado e as condições antes de qualquer execução.
          </p>
          <div className="mt-7 flex justify-center">
            <a
              href={wa("Olá! Preciso resolver um problema técnico hoje. Pode me ajudar?")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("cta_final")}
              data-cta-location="cta_final"
              className="inline-flex min-h-14 items-center justify-center rounded-lg bg-accent px-8 text-base font-bold text-accent-foreground shadow-[0_14px_34px_-10px_hsl(var(--accent)/0.6)] transition-transform hover:scale-[1.02]"
            >
              Iniciar atendimento
            </a>
          </div>
          <p className="mt-4 text-xs text-white/70">
            Antes de agendar, confira os{" "}
            <a href="/termos-e-condicoes" className="underline underline-offset-2 hover:text-white">
              termos, condições, valores e prazos
            </a>
            .
          </p>
        </div>

      </section>
    </>
  );
};

export default HomeSections;
