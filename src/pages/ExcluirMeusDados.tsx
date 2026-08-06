import { useEffect } from "react";
import { ShieldCheck, Trash2, Clock, FileText } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/siteConfig";
import { trackDataDeletionRequest, trackWaClick } from "@/lib/funnelAnalytics";

const MENSAGEM =
  "Olá! Quero solicitar a EXCLUSÃO dos meus dados e arquivos anexados (fotos, vídeos e Ordem de Serviço).\n\n" +
  "Protocolo/OS (se tiver): \nNome informado no atendimento: \nData aproximada do atendimento: ";

const RETENCAO = [
  {
    item: "Fotos e vídeos enviados no orçamento",
    prazo: "30 dias após a conclusão ou desistência",
    base: "Execução do serviço solicitado",
  },
  {
    item: "Ordem de Serviço em PDF e checklist técnico",
    prazo: "5 anos (prazo legal de garantia e comprovação)",
    base: "Cumprimento de obrigação legal e defesa em processo",
  },
  {
    item: "Mensagens de WhatsApp do atendimento",
    prazo: "12 meses",
    base: "Histórico de atendimento e garantia",
  },
  {
    item: "Avaliações enviadas pelo site",
    prazo: "Até o pedido de exclusão; publicação só com autorização",
    base: "Consentimento",
  },
];

const ExcluirMeusDados = () => {
  useEffect(() => {
    document.title = "Excluir meus dados | Técnico em Curitiba";
  }, []);

  const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(MENSAGEM)}`;

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Excluir meus dados e arquivos | Técnico em Curitiba"
        description="Solicite a exclusão dos seus dados, fotos e Ordem de Serviço. Veja os prazos de retenção, a base legal de cada registro e como recebemos a confirmação do pedido."
        path="/excluir-meus-dados"
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Excluir meus dados", path: "/excluir-meus-dados" },
        ]}
      />
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
            Exclusão de dados e arquivos anexados
          </h1>
          <p className="mt-4 text-muted-foreground">
            Você pode pedir a qualquer momento a remoção das fotos, vídeos, dados de contato e da
            Ordem de Serviço vinculados ao seu atendimento. O pedido é registrado com data e hora,
            e você recebe a confirmação por escrito no mesmo WhatsApp usado no atendimento.
          </p>

          <section className="mt-8 rounded-2xl border border-border bg-card p-5 md:p-7">
            <h2 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-accent" aria-hidden="true" /> Como solicitar
            </h2>
            <ol className="mt-4 space-y-3 text-sm text-muted-foreground list-decimal pl-5">
              <li>Abra o WhatsApp pelo botão abaixo com a mensagem já preenchida.</li>
              <li>Informe o número da OS (ou nome e data aproximada do atendimento).</li>
              <li>
                Confirmamos a identidade com uma pergunta simples do atendimento (equipamento,
                sintoma ou bairro) para evitar exclusão indevida por terceiros.
              </li>
              <li>
                A exclusão é executada em até <strong className="text-foreground">5 dias úteis</strong>{" "}
                e você recebe a confirmação com a lista do que foi apagado e do que precisa ficar
                retido por obrigação legal.
              </li>
            </ol>
            <Button asChild className="mt-6 min-h-12 w-full sm:w-auto text-base font-semibold">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackDataDeletionRequest({ via: "whatsapp" });
                  trackWaClick("excluir-dados");
                }}
              >
                Solicitar exclusão pelo WhatsApp
              </a>
            </Button>
          </section>

          <section className="mt-8">
            <h2 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" aria-hidden="true" /> Registro de retenção
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Nem tudo pode ser apagado imediatamente: documentos de garantia e nota fiscal têm prazo
              legal. Abaixo está o que guardamos, por quanto tempo e por quê.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-foreground">
                    <th className="py-3 pr-4 font-semibold">Registro</th>
                    <th className="py-3 pr-4 font-semibold">Prazo de retenção</th>
                    <th className="py-3 font-semibold">Base</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {RETENCAO.map((r) => (
                    <tr key={r.item} className="border-b border-border/60">
                      <td className="py-3 pr-4">{r.item}</td>
                      <td className="py-3 pr-4">{r.prazo}</td>
                      <td className="py-3">{r.base}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-border bg-card p-5 md:p-7">
            <h2 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" /> Confirmação e provas
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Toda solicitação gera um protocolo de exclusão. A confirmação enviada informa a data do
              pedido, a data da execução, quais arquivos foram removidos e quais registros seguem
              retidos por prazo legal. Se algum item retido for questionado, indicamos a base legal
              correspondente.
            </p>
            <p className="mt-3 text-sm text-muted-foreground flex items-start gap-2">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              Documentos relacionados:{" "}
              <a href="/politica-de-pecas-do-cliente" className="underline">
                política de peças do cliente
              </a>{" "}
              e{" "}
              <a href="/seguranca-dos-dados" className="underline">
                segurança dos dados
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExcluirMeusDados;
