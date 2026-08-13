import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CLUSTER_PROBLEMAS } from "@/lib/clusterProblemas";
import { TriagemRapidaHub } from "@/components/problemas/TriagemRapidaHub";
import { trackPageView } from "@/lib/analytics";
import { AnimatedSection } from "@/components/AnimatedSection";

const PATH = "/problemas";
const TITLE = "Problemas comuns de computador, rede e dados | O Técnico de Informática";
const DESCRIPTION =
  "Entre pelo sintoma: computador lento, notebook que não liga, Wi-Fi caindo, tela azul ou arquivos apagados. Cada página explica causas, o que checar e o atendimento indicado.";

/** Hub do cluster PROBLEMAS: entrada por sintoma, não por nome de serviço. */
const ProblemasHub = () => {
  useEffect(() => {
    trackPageView(PATH, "Hub de problemas");
  }, []);

  const fixos = [
    {
      path: "/problemas/computador-lento",
      titulo: "Computador ou notebook lento",
      resumo:
        "Demora para ligar, trava ao abrir programas e piora com o tempo de uso. Quando SSD ou memória resolvem — e quando não resolvem.",
      waMessage: "Olá! Meu computador está lento e quero uma avaliação técnica.",
    },
    {
      path: "/problemas/notebook-nao-liga",
      titulo: "Notebook não liga",
      resumo:
        "Sem luz, sem imagem ou liga e apaga. Como separar fonte, bateria, placa e tela antes de qualquer orçamento.",
      waMessage: "Olá! Meu notebook não liga e preciso de diagnóstico.",
    },
  ];

  const doCluster = CLUSTER_PROBLEMAS.map((p) => ({
    path: p.path,
    titulo: p.titulo,
    resumo: p.metaDescription,
    waMessage: p.waMessage,
  }));

  const todos = [...fixos, ...doCluster];

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Problemas", path: PATH },
        ]}
      />
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Problemas" }]} />

        <h1 className="mt-6 font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
          Comece pelo que está acontecendo
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Você não precisa saber o nome técnico da falha. Escolha o sintoma mais parecido com o seu
          caso: cada página mostra as causas que investigamos, o que dá para checar sozinho antes de
          chamar alguém e qual modalidade de atendimento costuma resolver.
        </p>

        <TriagemRapidaHub
          opcoes={todos.map((p) => ({ path: p.path, titulo: p.titulo, waMessage: p.waMessage }))}
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {todos.map((p, i) => (
            <AnimatedSection key={p.path} delay={Math.min(i, 6) * 60} className="h-full">
            <Link
              to={p.path}
              className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent"
            >
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">{p.titulo}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.resumo}</p>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-accent">
                Ver o que costuma causar
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
            </AnimatedSection>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">Não achou o seu caso?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Descreva o sintoma em linguagem comum no funil de atendimento. Ele identifica o
            equipamento, sugere a modalidade e mostra a estimativa de deslocamento antes de você
            confirmar qualquer coisa.
          </p>
          <Link
            to="/atendimento"
            className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-bold text-accent"
          >
            Abrir o funil de atendimento
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <section className="mt-10 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Quando o sintoma vira urgência
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Nem todo problema precisa de pressa, mas alguns sinais mudam a prioridade: ruído metálico
            ou clique repetido vindo do disco, cheiro de queimado, desligamento súbito por
            aquecimento e tela azul que se repete a cada poucos minutos. Nesses casos, continuar
            usando o equipamento aumenta o risco de perder dados de forma definitiva — a orientação é
            desligar e tratar a cópia dos arquivos como primeira etapa.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Lentidão progressiva, travamento em um programa específico, Wi-Fi oscilante e atualização
            que não conclui raramente são emergência. Costumam ser resolvidos por acesso remoto ou em
            uma visita técnica com janela de até 30 minutos para inspeção, diagnóstico e tentativa de
            reparo rápido compatível, sem compromisso e sem peças inclusas.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProblemasHub;
