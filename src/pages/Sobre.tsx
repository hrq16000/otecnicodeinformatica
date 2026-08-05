import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Eye,
  Lock,
  MessageCircle,
  CheckCircle,
  XCircle,
  Home,
  Building2,
  ArrowRight,
} from "lucide-react";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { PageSEO } from "@/components/PageSEO";
import { FastHeader } from "@/components/FastHeader";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildOrganizationSchema } from "@/lib/organizationJsonLd";
import { siteConfig, whatsappLink } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { EeatProofsSection } from "@/components/EeatProofsSection";
import { GESTOR } from "@/lib/gestorResponsavel";
import { GARANTIA, NOTA_FISCAL, experienciaLabel } from "@/lib/politicaComercial";

const CTA_CLASS =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-base font-bold text-accent-foreground shadow-[0_14px_34px_-10px_hsl(var(--accent)/0.6)] transition-transform hover:scale-[1.02]";

const comoTrabalhamos = [
  { title: "Triagem por WhatsApp", desc: "Você descreve o problema e recebe as primeiras orientações antes de qualquer deslocamento." },
  { title: "Diagnóstico primeiro", desc: "Avaliamos o equipamento para entender a causa real, sem chutes e sem empurrar peça." },
  { title: "valor aprovado por você", desc: "Nada é executado sem sua aprovação. Você sabe o que será feito e quanto custa." },
  { title: "Garantia sobre o serviço", desc: "O serviço realizado tem garantia. Explicamos as condições em cada caso." },
];

const naoPrometemos = [
  "Não prometemos preço fechado universal por telefone — o valor depende da avaliação real.",
  "Não garantimos recuperação de dados: é sempre uma tentativa que depende do estado da mídia.",
  "Não garantimos tempo fixo de chegada — combinamos horário e logística conforme a agenda.",
  "Não usamos avaliações falsas, número de estrelas inventado nem depoimentos fictícios.",
  "Não mantemos equipe fixa nem endereço comercial anunciado em cada cidade.",
];

const Sobre = () => {
  useEffect(() => {
    trackPageView("/sobre", "Sobre");
  }, []);

  const waHref = whatsappLink("Olá! Quero saber mais sobre o atendimento do Técnico em Curitiba.");

  const orgSchema = buildOrganizationSchema();


  useJsonLdSlot(SCHEMA_SLOTS.organization, orgSchema, SLOT_PRIORITY.page);

  return (

    <div className="min-h-screen bg-background">
      <PageSEO
        title="Sobre o Técnico em Curitiba | Informática, PC, Notebook e Suporte"
        description="Conheça o Técnico em Curitiba: foco em informática, notebook, PC, redes e suporte empresarial em Curitiba e região, com diagnóstico honesto e valor transparente."
        path="/sobre"
        breadcrumbs={[{ name: "Início", path: "/" }, { name: "Sobre", path: "/sobre" }]}
      />
      
      <FastHeader />
      <main className="pt-[var(--site-header-height)]">
        <Breadcrumbs items={[{ label: "Sobre" }]} />

        {/* Hero */}
        <section className="border-b border-border/60 bg-secondary/40">
          <div className="container mx-auto py-12 md:py-16">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                <ShieldCheck className="h-4 w-4" />
                Diagnóstico honesto, valor transparente
              </span>
              <h1 className="mt-5 text-3xl font-heading font-bold leading-tight text-foreground md:text-5xl">
                Sobre o <span className="text-accent">Técnico em Curitiba</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
                Assistência técnica em informática com foco em resolver o problema do cliente, sem termos
                confusos e sem cobrança surpresa.
              </p>
            </div>
          </div>
        </section>

        {/* Quem somos + O que atendemos */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">Quem somos</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  O <strong className="text-foreground">Técnico em Curitiba</strong> é um serviço de assistência
                  técnica em informática voltado a residências, profissionais liberais e empresas de Curitiba e
                  região metropolitana. A proposta é simples: você fala direto com quem entende do problema,
                  entende o que está acontecendo com o equipamento e decide com clareza.
                </p>
                <p>
                  Nosso trabalho começa pela triagem no WhatsApp e segue por diagnóstico, orientação, valor do atendimento e
                  execução — sempre nessa ordem. Casos simples podem ser resolvidos em atendimento a domicílio;
                  reparos que exigem bancada seguem para a oficina com o seu acompanhamento.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">O que atendemos</h2>
              <p className="mt-4 text-muted-foreground">
                Nosso foco é informática — nada de dispersar em áreas fora da nossa competência:
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  "Notebooks",
                  "Computadores (desktop)",
                  "Formatação e sistema",
                  "Upgrade de SSD e memória",
                  "Remoção de vírus",
                  "Recuperação de dados",
                  "Redes e Wi-Fi",
                  "Suporte empresarial",
                ].map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-accent" />
                    {s}
                  </li>
                ))}
              </ul>
              <Link to="/servicos" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                Ver todos os serviços <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Como trabalhamos */}
        <section className="border-y border-border/60 bg-secondary/40 py-12 md:py-16">
          <div className="container mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">Como trabalhamos</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {comoTrabalhamos.map((c) => (
                <div key={c.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Residencial x empresarial */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <Home className="h-8 w-8 text-accent" />
              <h3 className="mt-3 text-lg font-semibold text-foreground">Atendimento residencial</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Atendimento a domicílio ou por coleta e entrega, com horário combinado. Ideal para home office,
                estudo e uso do dia a dia — formatação, lentidão, vírus, upgrade e Wi-Fi.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <Building2 className="h-8 w-8 text-accent" />
              <h3 className="mt-3 text-lg font-semibold text-foreground">Atendimento empresarial</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Suporte a estações de trabalho, servidores locais e rede da empresa, de forma pontual ou
                recorrente sob consulta, pensado para reduzir paradas.
              </p>
            </div>
          </div>
        </section>

        {/* O que não prometemos */}
        <section className="border-y border-border/60 bg-secondary/40 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">O que não prometemos</h2>
            <p className="mt-3 text-muted-foreground">
              Transparência também é dizer o que não fazemos. Preferimos ser honestos a criar expectativa falsa.
            </p>
            <ul className="mt-6 space-y-3">
              {naoPrometemos.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Compromissos */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6">
              <Eye className="h-8 w-8 text-accent" />
              <h3 className="mt-3 text-lg font-semibold text-foreground">Transparência</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Diagnóstico antes de informar o valor e nenhuma execução sem sua aprovação.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <Lock className="h-8 w-8 text-accent" />
              <h3 className="mt-3 text-lg font-semibold text-foreground">Cuidado com seus dados</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tratamos seus arquivos com discrição. Quando possível, fazemos backup antes de intervir no sistema.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <ShieldCheck className="h-8 w-8 text-accent" />
              <h3 className="mt-3 text-lg font-semibold text-foreground">Atendimento na região</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Curitiba e região metropolitana, incluindo São José dos Pinhais, Pinhais, Colombo, Araucária e
                Campo Largo.
              </p>
            </div>
          </div>
        </section>

        {/* Provas verificáveis (E-E-A-T) */}
        <EeatProofsSection className="border-y border-border/60 bg-secondary/40" />

        {/* Responsabilidade técnica */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
              Responsabilidade técnica
            </h2>
            <p className="mt-3 text-muted-foreground">
              {experienciaLabel}. Os atendimentos são executados sob a supervisão do{" "}
              <strong className="text-foreground">
                {GESTOR.nome.trim() ? `${GESTOR.nome} — ${GESTOR.cargo}` : GESTOR.cargo.toLowerCase()}
              </strong>{" "}
              e faturados por {siteConfig.legalEntityName} (CNPJ {siteConfig.cnpj}).{" "}
              {GARANTIA.servicoLabel} e {NOTA_FISCAL.servicoLabel.toLowerCase()}.
            </p>

            <Link
              to="/gestor-responsavel"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
              Conhecer o gestor responsável <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>



        {/* CTA final */}
        <section className="pb-14">
          <div className="container mx-auto">
            <div className="rounded-2xl border border-border bg-card p-8 text-center md:p-12">
              <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
                Vamos resolver o seu problema?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Descreva o que está acontecendo pelo WhatsApp e receba as primeiras orientações.
              </p>
              <div className="mt-7">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta-location="sobre_final"
                  data-wa-source="whatsapp_cta"
                  onClick={() => trackCTAClick("whatsapp", "sobre_final")}
                  className={CTA_CLASS}
                >
                  <MessageCircle className="h-5 w-5" />
                  Iniciar atendimento
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sobre;
