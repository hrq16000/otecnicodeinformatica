import { useEffect } from "react";
import { Link } from "react-router-dom";
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
      </main>
      <Footer />
    </div>
  );
};

export default EquipamentosHub;
