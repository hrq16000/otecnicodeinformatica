import { FileCheck, MapPin, ReceiptText, ShieldCheck } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/siteConfig";
import { GARANTIA, NOTA_FISCAL } from "@/lib/politicaComercial";

const track = (loc: string) =>
  import("@/lib/analytics").then(({ trackCTAClick }) => trackCTAClick("whatsapp", loc));

/**
 * RODADA 2A — provas de confiança verificáveis.
 *
 * Regra da marca: aqui só entra compromisso que já está publicado em
 * /precos-e-politicas e /termos-e-condicoes. Nada de selo, avaliação,
 * número de clientes, tempo de resposta ou promessa que não possa ser
 * conferida pelo próprio cliente no registro do atendimento.
 */
const provas = [
  {
    icon: ShieldCheck,
    titulo: "Garantia por escrito, com escopo definido",
    linhas: [
      GARANTIA.servicoLabel + ".",
      GARANTIA.registroLabel + ".",
      GARANTIA.pecasLabel + ".",
    ],
    ressalva: GARANTIA.ressalvaLabel + ".",
  },
  {
    icon: ReceiptText,
    titulo: "Nota fiscal quando aplicável",
    linhas: [
      NOTA_FISCAL.servicoLabel + ".",
      NOTA_FISCAL.pecaLabel + ".",
      NOTA_FISCAL.ressalvaLabel + ".",
    ],
    ressalva: "Atendimento para pessoa física e pessoa jurídica, com os dados confirmados antes do fechamento.",
  },
  {
    icon: MapPin,
    titulo: `Atendimento local em ${siteConfig.primaryCity} e RMC`,
    linhas: [
      "Curitiba e São José dos Pinhais como área principal de atendimento presencial.",
      "Demais municípios da Região Metropolitana conforme a modalidade e a agenda.",
      "Casos de software podem ser resolvidos remotamente, sem deslocamento.",
    ],
    ressalva: "Não anunciamos loja física nem equipe fixa em cada bairro — a logística é combinada na triagem.",
  },
  {
    icon: FileCheck,
    titulo: "Registro do atendimento do início ao fim",
    linhas: [
      "Escopo, valor aprovado, peças utilizadas e condições ficam registrados.",
      "Nada é executado antes da sua aprovação explícita.",
      "Peças, componentes e licenças são orçados à parte, nunca embutidos.",
    ],
    ressalva: "O que não puder ser cumprido é dito na triagem, não depois do serviço.",
  },
];

export const ProvasDeConfiancaSection = ({ className = "" }: { className?: string }) => (
  <section className={`border-y border-border bg-secondary py-14 md:py-18 ${className}`} aria-labelledby="provas-confianca-title">
    <div className="container mx-auto">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">Compromissos verificáveis</span>
        <h2
          id="provas-confianca-title"
          className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl"
        >
          O que você pode cobrar da gente
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Sem selo inventado e sem nota média. Abaixo estão apenas compromissos publicados nas
          condições comerciais — os mesmos que ficam registrados no seu atendimento.
        </p>
      </div>

      <ul className="grid gap-5 md:grid-cols-2">
        {provas.map((p) => (
          <li key={p.titulo} className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <p.icon className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <h3 className="font-heading text-base font-bold text-foreground">{p.titulo}</h3>
            </div>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
              {p.linhas.map((l) => (
                <li key={l} className="flex gap-2">
                  <span className="text-accent" aria-hidden="true">▸</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-secondary p-3 text-xs leading-relaxed text-muted-foreground">
              {p.ressalva}
            </p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-3 text-center">
        <a
          href={whatsappLink("Olá! Quero entender as condições de garantia e o valor para o meu caso.")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("provas_confianca_cta")}
          data-cta-location="provas_confianca_cta"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-bold text-accent-foreground transition-transform hover:scale-[1.02]"
        >
          Solicitar orçamento
        </a>
        <p className="text-xs text-muted-foreground">
          Condições completas em{" "}
          <a href="/precos-e-politicas" className="underline underline-offset-2 hover:text-foreground">
            termos, condições, valores e prazos
          </a>
          .
        </p>
      </div>
    </div>
  </section>
);

export default ProvasDeConfiancaSection;
