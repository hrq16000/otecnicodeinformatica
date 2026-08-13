// @ts-nocheck
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { trackPageView } from "@/lib/analytics";
import { Handshake, Scale, Wrench, Clock, GraduationCap } from "lucide-react";

/**
 * PÁGINA EDITORIAL — Valorização do Trabalho Técnico.
 * Posição institucional da marca. Tom educativo, nunca confronto com cliente.
 * Nenhum número inventado: apenas a política de diária mínima adotada.
 */
const ValorizacaoTrabalhoTecnico = () => {
  useEffect(() => {
    trackPageView("/valorizacao-do-trabalho-tecnico", "Valorização do Trabalho Técnico");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Valorização do trabalho técnico | Posição da marca"
        description="Por que serviço técnico bem feito tem custo: conhecimento, ferramentas, responsabilidade e tempo. Nossa política contra leilão de preço e diárias incompatíveis."
        path="/valorizacao-do-trabalho-tecnico"
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Valorização do trabalho técnico", path: "/valorizacao-do-trabalho-tecnico" },
        ]}
      />
      <Header />

      <main>
        <section className="border-b border-border bg-card">
          <div className="container mx-auto py-12 md:py-16">
            <p className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--categoria)/0.12)] px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-[hsl(var(--categoria))]">
              <Scale className="h-3.5 w-3.5" aria-hidden="true" />
              Posição institucional
            </p>
            <h1 className="mt-5 max-w-3xl font-heading text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              Valorização do trabalho técnico
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Consertar não é apertar um parafuso. É saber onde apertar, por que apertar e o que
              acontece se apertar errado. Essa diferença é o que separa um reparo que dura de um
              problema que volta em duas semanas.
            </p>
          </div>
        </section>

        <article className="container mx-auto max-w-3xl space-y-12 py-12">
          <section>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              O que está dentro de um serviço técnico
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Quando alguém compara dois orçamentos e vê apenas o número final, o que fica invisível
              é justamente o que determina o resultado. Um atendimento técnico honesto carrega, no
              mesmo preço, coisas que ninguém enxerga na hora.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                {
                  icon: GraduationCap,
                  titulo: "Conhecimento acumulado",
                  texto:
                    "Anos identificando padrões de falha. O diagnóstico rápido não é sorte: é repertório.",
                },
                {
                  icon: Wrench,
                  titulo: "Ferramenta e bancada",
                  texto:
                    "Instrumento de medição, estação de solda, peças de teste, insumos e manutenção do próprio equipamento de trabalho.",
                },
                {
                  icon: Clock,
                  titulo: "Tempo real de trabalho",
                  texto:
                    "Deslocamento, testes, espera de peça, validação depois do reparo. O tempo cobrado é menor que o tempo gasto.",
                },
                {
                  icon: Handshake,
                  titulo: "Responsabilidade",
                  texto:
                    "Quem assume o equipamento assume o risco. Garantia sobre a mão de obra executada é um compromisso, não um enfeite.",
                },
              ].map(({ icon: Icon, titulo, texto }) => (
                <li key={titulo} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <h3 className="font-heading font-bold text-foreground">{titulo}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{texto}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              O que esta plataforma não incentiva
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Existe um modelo de mercado que coloca profissionais para disputar quem cobra menos
              até o serviço deixar de ser viável. Ele parece bom para o cliente por uma semana — e
              costuma custar caro no mês seguinte. Não trabalhamos assim.
            </p>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li>• Leilão de menor preço entre técnicos disputando o mesmo chamado.</li>
              <li>• Concorrência destrutiva que empurra o reparo para a solução mais barata, não para a correta.</li>
              <li>• Exploração de profissionais em jornadas e valores incompatíveis com trabalho qualificado.</li>
              <li>• Orçamento artificialmente baixo que vira surpresa depois que o equipamento já está aberto.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Política de diária profissional
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Adotamos como política institucional não promover diárias profissionais abaixo de{" "}
              <strong className="text-foreground">R$ 200,00</strong>. Diária profissional é a
              contratação de um técnico por um período de trabalho — não é o preço mínimo de
              qualquer serviço pontual.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Um atendimento simples, remoto ou rápido continua tendo seu próprio valor, informado
              antes da execução. São coisas diferentes e a gente prefere dizer isso com todas as
              letras.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Preço justo também é obrigação nossa
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Defender o valor do trabalho técnico só faz sentido se o cliente receber o outro lado
              do acordo. Para nós, preço justo significa:
            </p>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li>• Orçamento antes da execução, com o cenário real explicado em português.</li>
              <li>• Autorização obrigatória para qualquer serviço ou peça adicional.</li>
              <li>• Transparência sobre deslocamento, diagnóstico, mão de obra e peça — separados.</li>
              <li>• Garantia sobre a mão de obra executada, registrada no orçamento aprovado.</li>
              <li>• Dizer quando não compensa consertar, mesmo que isso signifique não vender.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-foreground">Onde seguir</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Preços e políticas", href: "/precos-e-politicas" },
                { label: "Quando não compensa consertar", href: "/quando-nao-compensa" },
                { label: "Como funciona o atendimento", href: "/como-funciona" },
                { label: "Rede de profissionais parceiros", href: "/profissionais" },
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
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ValorizacaoTrabalhoTecnico;
