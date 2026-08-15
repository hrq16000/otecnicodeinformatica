import { useEffect } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowRight } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CLUSTER_EQUIPAMENTOS } from "@/lib/clusterEquipamentos";
import { trackPageView } from "@/lib/analytics";

const PATH = "/equipamentos";
const TITLE = "Equipamentos atendidos: notebook, PC, impressora e roteador | O Técnico de Informática";
const DESCRIPTION =
  "Entre pelo equipamento: notebook, desktop, impressora ou roteador. Cada página mostra os sintomas mais comuns, o que é verificado na avaliação e a modalidade indicada.";

/** Hub do cluster EQUIPAMENTOS: entrada por aparelho, ligando sintoma → solução. */
const EquipamentosHub = () => {
  useEffect(() => {
    trackPageView(PATH, "Hub de equipamentos");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Equipamentos", path: PATH },
        ]}
      />
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Equipamentos" }]} />

        <h1 className="mt-6 font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
          Escolha o equipamento e veja o que costuma acontecer
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          O mesmo sintoma tem causas diferentes em cada aparelho. Estas páginas reúnem os problemas
          mais frequentes por equipamento, o que é verificado na avaliação técnica, o que evitar
          antes do atendimento e qual modalidade resolve — remoto, visita ou coleta.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {CLUSTER_EQUIPAMENTOS.map((e) => (
            <Link
              key={e.path}
              to={e.path}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent"
            >
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">{e.titulo}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.metaDescription}</p>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-accent">
                Ver sintomas e caminho de reparo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Prefere começar pelo sintoma?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Se você sabe o que está acontecendo, mas não tem certeza de qual peça ou serviço está
            envolvido, entre pelo hub de problemas. Ele parte da frase do dia a dia — “está lento”,
            “não liga”, “a internet cai” — e chega ao mesmo destino.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link to="/problemas" className="inline-flex items-center gap-2 font-heading text-sm font-bold text-accent">
              Ver problemas por sintoma
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
            Reparo, upgrade ou substituição: como a decisão é tomada
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Antes de orçar peça, a avaliação responde se o aparelho ainda comporta o uso que você faz
            dele. Notebook de escritório com disco mecânico quase sempre responde melhor a um upgrade
            para SSD do que a uma formatação; desktop com fonte instável precisa de teste de
            alimentação antes de qualquer troca de placa; impressora com falha de tracionamento tem
            custo de peça que costuma superar o valor de um equipamento de entrada.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A régua prática é a mesma para todos os aparelhos: quando o reparo passa de 40% a 50% do
            preço de um equivalente novo, a recomendação é substituir e aproveitar o que ainda serve —
            SSD, memória e, em alguns casos, a fonte. Essa conclusão sempre vem depois do diagnóstico,
            nunca antes.
          </p>
        </section>

        <section className="mt-10 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Idade do equipamento muda o diagnóstico
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Aparelho com menos de três anos quase nunca falha por desgaste: as causas dominantes são software, atualização malfeita, armazenamento cheio e superaquecimento por pasta térmica seca ou entrada de ar obstruída. Nesses casos o caminho é limpeza interna, revisão térmica e organização do sistema, não substituição de placa.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Entre três e seis anos entra a faixa em que o upgrade rende mais que qualquer outro serviço: disco mecânico trocado por SSD e memória ampliada devolvem, na prática, a sensação de equipamento novo por uma fração do preço. Acima de seis anos a conta muda de novo — peça de reposição fica escassa, fonte e bateria já perderam capacidade e o custo de manter começa a competir com o de substituir.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Por isso a avaliação sempre registra idade, uso real e histórico de manutenção antes de qualquer orçamento. Dois notebooks com o mesmo sintoma podem receber recomendações opostas apenas por essa diferença de contexto.
          </p>
        </section>

        <section className="mt-10 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Peças: o que usamos e o que recusamos
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Trabalhamos com peça nova, com procedência informada e com a especificação compatível com o aparelho — não com componente recuperado de outro equipamento com defeito. Quando existe alternativa mais barata e tecnicamente adequada, ela é apresentada junto da original, com a diferença de garantia explicada antes da escolha.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Há situações em que recusamos o serviço: painel de tela colado com risco de dano estrutural, placa com corrosão generalizada por líquido, equipamento em garantia de fábrica cuja abertura anularia o direito do cliente. Nesses casos indicamos o caminho correto — assistência autorizada ou substituição — mesmo sem faturar o reparo.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Toda peça substituída fica disponível para devolução ao cliente na entrega, e a garantia de 90 dias cobre a mão de obra do defeito tratado, com a cobertura do componente seguindo o prazo do fabricante.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EquipamentosHub;
