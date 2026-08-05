import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PrecoModalidades } from "@/components/PrecoModalidades";
import { REGRA_CANCELAMENTO } from "@/lib/precosConfig";
import {
  MessageCircle,
  Home,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

/**
 * Conteúdo canônico de TERMOS, CONDIÇÕES, VALORES E PRAZOS.
 * Fonte única — usado na página fundida /precos-e-politicas e no alias
 * /termos-e-condicoes. Nenhuma outra página deve republicar valores.
 */

export const TERMOS_FAQ = [
  {
    q: "Quanto custa a visita técnica avulsa em Curitiba e região?",
    a: "No atendimento avulso é visita técnica de inspeção sem compromisso, a partir de R$ 99,99 por até (ou a cada) 30 minutos de atendimento. Não inclui peças, componentes, licenças nem abertura de placas. O valor mínimo pode variar conforme a região de deslocamento.",
  },
  {
    q: "Existe pacote de visita técnica mais longo?",
    a: "Sim. Existe o pacote pré-acordado de visita técnica de até 2 horas por R$ 279,99, sem promessas de resultado e sem peças inclusas. Ele precisa ser combinado antes do deslocamento.",
  },
  {
    q: "Como funciona o diagnóstico com compromisso e coleta?",
    a: "Na maioria dos casos o atendimento é com coleta e entrega: diagnóstico com compromisso e tentativa de reparos compatíveis, com coleta e entrega inclusas, valor mínimo pré-aprovado de R$ 299,99. Peças não estão inclusas e reparos acima do mínimo dependem de autorização por escrito.",
  },
  {
    q: "Posso cancelar depois da coleta?",
    a: "O cancelamento é válido somente até 24 horas corridas após a coleta. Após esse prazo não é compatível o cancelamento nem a desistência do diagnóstico.",
  },
  {
    q: "Quando a visita técnica é realmente compatível?",
    a: "Quando a máquina está ligando e funcionando e a necessidade é atualização de sistema, configuração, upgrade simples ou instalação de peça que o cliente já possui. Quando o reparo exige bancada ou ferramenta específica, o atendimento é convertido em coleta e entrega.",
  },
  {
    q: "Quais casos não compensa consertar?",
    a: "Placas-mãe de desktops antigos ou de entrada e aparelhos de linha básica quase nunca compensam financeiramente. Nestes casos avisamos antes e indicamos substituição. Filosofia: quase tudo tem conserto, mas nem tudo vale a pena.",
  },
  {
    q: "Qual é a garantia dos serviços?",
    a: "90 dias de garantia sobre a mão de obra do serviço executado. Peças e componentes seguem a garantia do fornecedor/fabricante.",
  },
  {
    q: "Vocês atendem fora de Curitiba?",
    a: "Sim. Atendemos Curitiba e municípios da Região Metropolitana mediante consulta de agenda e deslocamento. Não mantemos loja ou laboratório em outras cidades.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://tecnico.curitiba.br/precos-e-politicas#faq",
  mainEntity: TERMOS_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

interface Props {
  /** Renderiza também o JSON-LD de FAQPage (default: true). */
  withJsonLd?: boolean;
  className?: string;
}

export const TermosConteudo = ({ withJsonLd = true, className = "" }: Props) => (
  <div className={`container mx-auto px-4 max-w-4xl ${className}`}>
    {withJsonLd && (
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
    )}

    <PrecoModalidades className="mb-12" />

    <section className="mb-12" aria-labelledby="como-funciona-termos">
      <h2 id="como-funciona-termos" className="text-2xl font-bold mb-6 text-foreground">
        Como funciona o atendimento
      </h2>
      <ol className="space-y-3">
        {[
          { icon: MessageCircle, title: "1. Triagem pelo WhatsApp", desc: "Você descreve o problema e envia fotos. A triagem define a modalidade adequada ao caso." },
          { icon: Home, title: "2. Visita técnica de inspeção (avulsa)", desc: "A partir de R$ 99,99 por até (ou a cada) 30 minutos. Sem compromisso de solução no local e sem peças inclusas." },
          { icon: Clock, title: "3. Pacote de até 2 horas (opcional)", desc: "R$ 279,99 pré-acordado antes do deslocamento, sem promessas de resultado e sem peças inclusas." },
          { icon: Wrench, title: "4. Diagnóstico com compromisso + coleta", desc: "Caminho da maioria dos casos: coleta e entrega inclusas, valor mínimo pré-aprovado de R$ 299,99. Peças não inclusas." },
          { icon: AlertTriangle, title: "5. Cancelamento", desc: REGRA_CANCELAMENTO },
          { icon: CheckCircle2, title: "6. Garantia de 90 dias", desc: "Sobre a mão de obra do serviço executado. Peças seguem a garantia do fornecedor/fabricante." },
        ].map((s) => (
          <li key={s.title} className="flex gap-4 p-4 rounded-lg border border-border bg-card">
            <s.icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>

    <section className="mb-12 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-xl font-bold text-foreground">Quando não compensa consertar</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Avisamos antes de iniciar qualquer serviço. Casos típicos: placas-mãe de desktops antigos ou
            de entrada e aparelhos de linha básica. Nestes equipamentos, indicamos substituição em vez de reparo.
          </p>
        </div>
      </div>
    </section>

    <section className="mb-12" aria-labelledby="faq-termos">
      <h2 id="faq-termos" className="text-2xl font-bold mb-6 text-foreground">
        Perguntas frequentes sobre termos, valores e prazos
      </h2>
      <div className="space-y-3">
        {TERMOS_FAQ.map((f) => (
          <details key={f.q} className="group rounded-lg border border-border bg-card p-4">
            <summary className="cursor-pointer font-semibold text-foreground flex items-center justify-between gap-2">
              {f.q}
              <Clock className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground text-center">
        <Link to="/como-funciona" className="underline hover:text-foreground">Ver como funciona</Link>
        {" · "}
        <Link to="/ordem-de-servico" className="underline hover:text-foreground">Gerar ordem de serviço</Link>
      </p>
    </section>
  </div>
);

export default TermosConteudo;
