// @ts-nocheck
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CLUSTER_SOLUCOES } from "@/lib/clusterSolucoes";
import { trackPageView } from "@/lib/analytics";

const PATH = "/solucoes";
const TITLE = "Soluções técnicas: diagnóstico, formatação, SSD, backup e dados | O Técnico de Informática";
const DESCRIPTION =
  "Entre pelo procedimento: diagnóstico, formatação, troca por SSD, backup e recuperação de dados. Cada página mostra etapas reais, o que evitar e a modalidade indicada.";

/** Hub do cluster SOLUÇÕES: entrada pelo procedimento técnico. */
const SolucoesHub = () => {
  useEffect(() => {
    trackPageView(PATH, "Hub de soluções");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Soluções", path: PATH },
        ]}
      />
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Soluções" }]} />

        <h1 className="mt-6 font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
          Escolha o procedimento e veja como ele é executado
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Sintoma parecido nem sempre pede o mesmo serviço. Estas páginas descrevem cada
          procedimento técnico pela ordem real de execução: quando ele é indicado, o que é feito em
          cada etapa, o que evitar antes do atendimento e se o caso resolve em acesso remoto, visita
          técnica ou coleta com entrega.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {CLUSTER_SOLUCOES.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent"
            >
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">{s.titulo}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.metaDescription}</p>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-accent">
                Ver etapas e modalidade indicada
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Ainda não sabe qual procedimento é o seu?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Comece pelo sintoma ou pelo equipamento. Os dois caminhos chegam ao mesmo destino: uma
            avaliação que informa causa provável, o que é reparável e quanto custa cada etapa antes
            de qualquer execução.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link to="/problemas" className="inline-flex items-center gap-2 font-heading text-sm font-bold text-accent">
              Ver problemas por sintoma
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/equipamentos" className="inline-flex items-center gap-2 font-heading text-sm font-bold text-accent">
              Ver por equipamento
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/atendimento" className="inline-flex items-center gap-2 font-heading text-sm font-bold text-accent">
              Abrir o funil de atendimento
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="mt-10 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            A ordem importa mais que a velocidade
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Quase todo prejuízo evitável em manutenção vem de procedimento executado fora de ordem:
            formatar antes de conferir a cópia dos arquivos, instalar SSD sem clonar o sistema,
            continuar ligando um disco com ruído mecânico na esperança de que ele volte. Cada página
            deste hub começa pelo pré-requisito — o que precisa estar feito antes de a primeira etapa
            começar.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Procedimentos de bancada seguem a mesma regra comercial do restante do atendimento:
            coleta sem custo quando o serviço passa de uma a duas horas, mínimo pré-aprovado de
            R$ 299,99, valor acima disso informado antes da execução e 90 dias de garantia na mão de
            obra do defeito tratado.
          </p>
        </section>

        <section className="mt-10 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Prazo real de cada procedimento
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Diagnóstico técnico é o mais rápido: quando o equipamento liga, a avaliação costuma se resolver no mesmo atendimento. Formatação com backup conferido consome mais tempo do que a formatação em si, porque a cópia dos arquivos e a reinstalação dos programas de uso diário é que definem o prazo — normalmente de algumas horas a um dia útil.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Troca por SSD depende de clonagem ou instalação limpa: clonar preserva o ambiente e é mais previsível; instalar do zero exige remontar contas, licenças e programas. Recuperação de dados é a única categoria sem prazo fixo, porque depende do tipo de perda — exclusão lógica responde rápido, disco com falha física exige varredura lenta e pode não ter retorno completo.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Prazo estimado é sempre informado antes da execução, e qualquer mudança relevante durante o serviço é comunicada em vez de descoberta na entrega.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Quando dois procedimentos entram no mesmo atendimento, a ordem é definida pelo risco:
            primeiro o que protege os dados, depois o que altera o sistema, por último o que troca
            hardware. Essa sequência é informada no orçamento para que você saiba o que acontece em
            cada etapa.
          </p>
        </section>

        <section className="mt-10 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Risco de dados por tipo de serviço
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Nem todo procedimento coloca arquivos em risco, e é importante saber qual é qual. Diagnóstico e limpeza não alteram dados. Troca de armazenamento com clonagem preserva o conteúdo, mas exige que a unidade de origem esteja íntegra. Formatação apaga tudo por definição — por isso não começa sem cópia conferida item a item, não apenas iniciada.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            O caso mais delicado é a suspeita de falha física de disco. Cada tentativa de ligar, cada varredura de software de recuperação executada sobre a própria unidade e cada cópia mal-sucedida reduzem a chance de retorno. A orientação nesses casos é desligar o equipamento e não tentar mais nada até a avaliação.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Em todo serviço que envolve dados, o acesso é limitado ao necessário para executar o procedimento, nada é copiado para fora do fluxo do atendimento e as mídias temporárias usadas na cópia são apagadas depois da entrega confirmada.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SolucoesHub;
