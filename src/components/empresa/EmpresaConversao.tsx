import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/siteConfig";
import { trackCTAClick } from "@/lib/analytics";
import {
  MessageCircle,
  AlertTriangle,
  Clock,
  ShieldCheck,
  FileCheck2,
  Laptop,
  Store,
  Stethoscope,
  Scale,
  Factory,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

/**
 * Blocos de conversão do hub /empresa-de-ti-curitiba.
 * Estritamente apresentacional: reaproveita `trackCTAClick` e os links wa.me já
 * existentes na página — não toca no funil de triagem PF × PJ.
 */

// Provas verificáveis apenas. Proibido prometer prazo, SLA ou "Conforme agenda" —
// a operação não garante janela de atendimento por escrito.
export const provasRapidas = [
  { icon: FileCheck2, label: "Orçamento antes da execução", desc: "Nada é executado sem a sua aprovação por escrito." },
  { icon: ShieldCheck, label: "Garantia no serviço", desc: "Reparo e configuração com garantia formal registrada." },
  { icon: Laptop, label: "Presencial ou remoto", desc: "Visita no escritório ou acesso remoto, conforme o chamado." },
  { icon: Clock, label: "Chamado com prazo combinado", desc: "A janela de atendimento é acordada no início, caso a caso." },
];

const sinais = [
  "Computadores travando e atrasando o atendimento ao cliente",
  "Wi-Fi que cai no meio de reuniões, PDV ou sistema na nuvem",
  "Ninguém sabe quem cuida do backup — nem se ele existe",
  "Cada máquina com um programa e uma configuração diferente",
  "Impressora e rede que só um funcionário 'sabe arrumar'",
  "Equipamentos antigos custando mais em parada do que em troca",
];

const passos = [
  { n: "1", t: "Você conta a situação", d: "Pelo WhatsApp, em poucos minutos, sem formulário longo nem visita comercial." },
  { n: "2", t: "Diagnóstico do ambiente", d: `Avaliação de equipamentos, rede e rotinas a partir de ${siteConfig.minPriceLabel}.` },
  { n: "3", t: "Orçamento e prioridades", d: "Você recebe o que é urgente, o que pode esperar e quanto custa cada frente." },
  { n: "4", t: "Execução e acompanhamento", d: "Presencial ou remoto, com registro do que foi feito em cada máquina." },
];

const segmentos = [
  { icon: Store, label: "Comércio e varejo" },
  { icon: Scale, label: "Escritórios e contabilidade" },
  { icon: Stethoscope, label: "Clínicas e consultórios" },
  { icon: Factory, label: "Indústria leve e oficinas" },
  { icon: GraduationCap, label: "Escolas e cursos" },
  { icon: Laptop, label: "Coworkings e autônomos" },
];

/** Barra de prova rápida logo abaixo do hero. */
export const EmpresaTrustBar = () => (
  <section className="border-b border-border bg-card/60 py-6" aria-label="Diferenciais do atendimento empresarial">
    <div className="container mx-auto grid gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
      {provasRapidas.map((p) => (
        <div key={p.label} className="flex items-start gap-3">
          <p.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-foreground">{p.label}</p>
            <p className="text-xs text-muted-foreground">{p.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/** Dor + CTA intermediário: o ponto de conversão do meio da página. */
export const EmpresaSinaisSection = ({ whatsappUrl }: { whatsappUrl: string }) => (
  <section className="bg-background py-12 md:py-14">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-3 text-2xl font-heading font-bold text-foreground md:text-3xl">
          Sinais de que a TI da sua empresa já está custando dinheiro
        </h2>
        <p className="mb-6 max-w-2xl text-muted-foreground">
          Na maioria das empresas de Curitiba que atendemos, o prejuízo não vem de uma pane
          grande: vem de pequenas paradas diárias que ninguém mede. Se você reconhece dois ou
          mais itens abaixo, vale uma avaliação do ambiente.
        </p>
        <ul className="mb-8 grid gap-3 sm:grid-cols-2">
          {sinais.map((s) => (
            <li key={s} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-sm text-foreground">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
        <div className="rounded-xl border border-accent/40 bg-accent/5 p-6 text-center">
          <p className="mb-4 text-base font-medium text-foreground">
            Descreva a situação da sua empresa e receba uma avaliação do ambiente com as
            prioridades e o custo de cada frente — sem compromisso.
          </p>
          <Button
            variant="whatsapp"
            size="lg"
            className="px-8 transition-transform hover:scale-105"
            asChild
            onClick={() => trackCTAClick("whatsapp", "empresa_ti_hub_meio")}
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              Pedir avaliação do ambiente
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

/** Como funciona em 4 passos — reduz atrito antes do contato. */
export const EmpresaPassosSection = () => (
  <section className="bg-secondary py-12 md:py-14">
    <div className="container mx-auto px-4">
      <h2 className="mb-8 text-center text-2xl font-heading font-bold text-foreground md:text-3xl">
        Como funciona o atendimento de TI para empresas
      </h2>
      <ol className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {passos.map((p) => (
          <li key={p.n} className="rounded-xl border border-border bg-card p-6">
            <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 font-bold text-accent">
              {p.n}
            </span>
            <h3 className="mb-1 text-base font-bold text-foreground">{p.t}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.d}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/** Segmentos atendidos — reconhecimento imediato do público-alvo. */
export const EmpresaSegmentosSection = () => (
  <section className="bg-background py-12 md:py-14">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-center text-2xl font-heading font-bold text-foreground md:text-3xl">
          Empresas que atendemos em Curitiba
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted-foreground">
          O escopo é adaptado ao número de máquinas, à rede e ao horário de funcionamento de
          cada operação — de dois computadores a dezenas de estações.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {segmentos.map((s) => (
            <div key={s.label} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
              <s.icon className="h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
              <span className="text-sm text-foreground">{s.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Precisa de um chamado pontual em vez de estruturação?{" "}
          <Link to="/servicos/suporte-tecnico-empresarial" className="text-accent underline underline-offset-2">
            Ver suporte técnico empresarial
          </Link>
          <ArrowRight className="ml-1 inline h-3.5 w-3.5 text-accent" aria-hidden="true" />
        </p>
      </div>
    </div>
  </section>
);
