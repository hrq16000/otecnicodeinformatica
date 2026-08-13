import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LazyOnVisible } from "@/components/LazyOnVisible";
import { SkeletonList } from "@/components/SkeletonSection";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CalculadoraDeslocamento } from "@/components/CalculadoraDeslocamento";
import { whatsappLink } from "@/lib/siteConfig";
import { trackPageView } from "@/lib/analytics";
import { AlertTriangle, Building2, Network, Printer, ShieldCheck } from "lucide-react";

/**
 * ÁREA EMPRESARIAL — atendimento PJ tratado como operação, não como um item
 * da lista residencial. Página de conversão (noindex): o conteúdo indexável
 * do cluster empresarial continua em /empresa-de-ti-curitiba, sem canibalizar.
 */

const CENARIOS = [
  {
    icon: AlertTriangle,
    titulo: "Alguém não consegue trabalhar agora",
    texto:
      "Estação travada, sistema que não abre, máquina que não liga. A triagem empresarial começa por quem está parado, não pelo equipamento.",
  },
  {
    icon: Network,
    titulo: "A rede está instável",
    texto:
      "Wi-Fi que cai em parte do escritório, cabeamento improvisado, roteador saturado, VPN que derruba o acesso ao sistema.",
  },
  {
    icon: Printer,
    titulo: "Impressoras e periféricos somem da rede",
    texto:
      "Fila travada, impressora que aparece só em algumas máquinas, digitalização que parou depois de uma troca de roteador.",
  },
  {
    icon: Building2,
    titulo: "Parque desatualizado ou crescendo",
    texto:
      "Computadores lentos demais para o uso atual, novas estações a configurar, padronização de máquinas e contas.",
  },
  {
    icon: ShieldCheck,
    titulo: "Backup e continuidade",
    texto:
      "Arquivos só na máquina do funcionário, backup que ninguém confere, risco concentrado em um único disco.",
  },
];

const PRIORIDADES = [
  { id: "parado", label: "Tem gente parada agora" },
  { id: "hoje", label: "Precisa ser resolvido hoje" },
  { id: "semana", label: "Pode ser nesta semana" },
  { id: "planejado", label: "É planejamento / preventiva" },
];

const Empresas = () => {
  const [form, setForm] = useState({
    empresa: "",
    responsavel: "",
    contato: "",
    equipamentos: "",
    regiao: "",
    problema: "",
  });
  const [prioridade, setPrioridade] = useState("parado");

  useEffect(() => {
    trackPageView("/empresas", "Empresas");
  }, []);

  const campo = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value.slice(0, 1200) })),
  });

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const prio = PRIORIDADES.find((p) => p.id === prioridade)?.label ?? "";
    const msg = [
      "Atendimento empresarial",
      `Empresa: ${form.empresa}`,
      `Responsável: ${form.responsavel}`,
      `Contato: ${form.contato}`,
      `Equipamentos (aprox.): ${form.equipamentos}`,
      `Região: ${form.regiao}`,
      `Prioridade: ${prio}`,
      `Situação: ${form.problema}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.assign(whatsappLink(msg));
  };

  const inputClass =
    "mt-1 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Atendimento técnico para empresas | Solicitar suporte"
        description="Solicite atendimento técnico empresarial: estação parada, rede instável, impressoras, backup e manutenção preventiva. Triagem por prioridade de operação."
        path="/empresas"
        noindex
      />
      <Header />

      <main>
        <section className="border-b border-border bg-card">
          <div className="container mx-auto py-12 md:py-16">
            <p className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--categoria)/0.12)] px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-[hsl(var(--categoria))]">
              <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
              Operação empresarial
            </p>
            <h1 className="mt-5 max-w-3xl font-heading text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              O que está impedindo sua equipe de trabalhar?
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              A triagem empresarial é diferente da residencial: primeiro medimos o impacto na
              operação, depois o equipamento. Quem está parado entra na frente.
            </p>
            <a
              href="#solicitar"
              className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-accent px-6 font-heading font-bold text-accent-foreground"
            >
              Solicitar atendimento empresarial
            </a>
          </div>
        </section>

        <section className="container mx-auto py-12">
          <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
            Situações que atendemos
          </h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CENARIOS.map(({ icon: Icon, titulo, texto }, i) => (
              <li key={titulo}>
                <AnimatedSection delay={Math.min(i, 5) * 60}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-0.5">
                    <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                    <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{titulo}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{texto}</p>
                  </div>
                </AnimatedSection>
              </li>
            ))}
          </ul>
        </section>

        <section id="solicitar" className="border-y border-border bg-card">
          <div className="container mx-auto grid gap-10 py-12 lg:grid-cols-[3fr_2fr]">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                Solicitar atendimento empresarial
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Poucos campos: o suficiente para dimensionar a urgência e responder com um cenário
                real. O restante é conversado direto com o técnico.
              </p>

              <form onSubmit={enviar} className="mt-8 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-foreground">
                    Empresa
                    <input required maxLength={120} className={inputClass} {...campo("empresa")} />
                  </label>
                  <label className="block text-sm font-semibold text-foreground">
                    Responsável
                    <input required maxLength={120} className={inputClass} {...campo("responsavel")} />
                  </label>
                  <label className="block text-sm font-semibold text-foreground">
                    WhatsApp para contato
                    <input required inputMode="tel" maxLength={20} className={inputClass} {...campo("contato")} />
                  </label>
                  <label className="block text-sm font-semibold text-foreground">
                    Equipamentos (aproximado)
                    <input inputMode="numeric" maxLength={10} className={inputClass} {...campo("equipamentos")} />
                  </label>
                  <label className="block text-sm font-semibold text-foreground sm:col-span-2">
                    Região / bairro do atendimento
                    <input required maxLength={120} className={inputClass} {...campo("regiao")} />
                  </label>
                </div>

                <fieldset>
                  <legend className="text-sm font-semibold text-foreground">Prioridade</legend>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {PRIORIDADES.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => setPrioridade(p.id)}
                          aria-pressed={prioridade === p.id}
                          className={`min-h-11 rounded-full border px-4 text-sm ${
                            prioridade === p.id
                              ? "border-accent bg-accent text-accent-foreground"
                              : "border-border bg-background text-foreground"
                          }`}
                        >
                          {p.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </fieldset>

                <label className="block text-sm font-semibold text-foreground">
                  O que está acontecendo
                  <textarea required rows={5} maxLength={1200} className={`${inputClass} py-3`} {...campo("problema")} />
                </label>

                <button
                  type="submit"
                  data-cta-location="empresas_solicitar_atendimento"
                  className="inline-flex min-h-12 items-center rounded-xl bg-accent px-6 font-heading font-bold text-accent-foreground"
                >
                  Enviar solicitação pelo WhatsApp
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <LazyOnVisible
                minHeight="320px"
                rootMargin="0px 0px 200px"
                placeholder={<SkeletonList rows={4} />}
              >
                <CalculadoraDeslocamento />
              </LazyOnVisible>
              <div className="rounded-2xl border border-border bg-background p-6">
                <h3 className="font-heading text-lg font-bold text-foreground">Como conduzimos</h3>
                <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>1. Entendimento do impacto na operação.</li>
                  <li>2. Definição da modalidade: remoto, visita ou coleta.</li>
                  <li>3. Diagnóstico e cenário real, com o que é e o que não é possível.</li>
                  <li>4. Autorização antes de qualquer serviço ou peça adicional.</li>
                  <li>5. Execução, conclusão e registro do que foi feito.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-12">
          <h2 className="font-heading text-2xl font-bold text-foreground">Continue por aqui</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Empresa de TI em Curitiba", href: "/empresa-de-ti-curitiba" },
              { label: "Suporte técnico empresarial", href: "/servicos/suporte-tecnico-empresarial" },
              { label: "Manutenção preventiva para empresas", href: "/servicos/manutencao-preventiva-empresas" },
              { label: "Backup para empresas", href: "/servicos/backup-para-empresas" },
              { label: "Suporte para home office", href: "/servicos/suporte-home-office" },
              { label: "Redes e Wi-Fi", href: "/servicos/redes-e-wifi" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="block rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground hover:border-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Empresas;
