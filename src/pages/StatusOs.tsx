import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Clock, FileText, MessageCircle, CheckCircle2 } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findOsRecord, listOsRecords, OS_ETAPAS, type OsRecord } from "@/lib/osRegistry";
import { trackCTAClick } from "@/lib/analytics";

const PATH = "/status-da-ordem-de-servico";

const StatusOs = () => {
  const [numero, setNumero] = useState("");
  const [buscou, setBuscou] = useState(false);
  const [resultado, setResultado] = useState<OsRecord | undefined>();
  const historico = useMemo(() => listOsRecords(), []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const os = url.searchParams.get("os");
    if (os) {
      setNumero(os);
      setResultado(findOsRecord(os));
      setBuscou(true);
    }
  }, []);

  const consultar = () => {
    setResultado(findOsRecord(numero));
    setBuscou(true);
  };

  const abrirWhatsApp = () => {
    trackCTAClick("whatsapp", "status_os");
    const mensagem = [
      "Olá! Quero consultar o andamento da minha ordem de serviço.",
      numero.trim() ? `• Número da OS: ${numero.trim().toUpperCase()}` : "• Número da OS: (não tenho em mãos)",
      "• Quero saber a etapa atual e o prazo estimado de entrega.",
    ].join("\n");
    window.dispatchEvent(
      new CustomEvent("wa-funnel:open", { detail: { location: "status_os", message: mensagem } }),
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Status da ordem de serviço | Técnico em Curitiba"
        description="Consulte o andamento do seu atendimento pelo número da ordem de serviço e veja as etapas, os prazos estimados e como falar com o técnico responsável."
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Status da ordem de serviço", path: PATH },
        ]}
      />
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-2xl font-bold text-foreground md:text-4xl">
            Status da ordem de serviço
          </h1>
          <p className="mt-4 text-muted-foreground">
            Informe o número da OS gerada no atendimento (formato <strong>OS-MTG-AAAAMMDD-0000</strong>) para ver o
            registro salvo neste dispositivo e as etapas previstas. A confirmação da etapa atual é sempre feita pelo
            técnico no atendimento.
          </p>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <Label htmlFor="os-numero">Número da ordem de serviço</Label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Input
                id="os-numero"
                value={numero}
                maxLength={40}
                onChange={(e) => setNumero(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && consultar()}
                placeholder="OS-MTG-20260806-1234"
                className="flex-1"
              />
              <Button type="button" onClick={consultar} className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" aria-hidden="true" /> Consultar
              </Button>
            </div>

            {buscou && resultado && (
              <div className="mt-5 rounded-lg border border-[hsl(var(--accent))]/40 bg-[hsl(var(--accent))]/10 p-4 text-sm">
                <p className="flex items-center gap-2 font-semibold text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--accent))]" aria-hidden="true" />
                  OS {resultado.protocolo} localizada
                </p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>Aberta em: {new Date(resultado.criadoEm).toLocaleString("pt-BR")}</li>
                  <li>Serviço: {resultado.servico}</li>
                  {resultado.modelo && <li>Configuração: {resultado.modelo}</li>}
                  {resultado.cidade && <li>Cidade/bairro: {resultado.cidade}</li>}
                  {resultado.modalidade && <li>Modalidade: {resultado.modalidade}</li>}
                  {resultado.janela && <li>Janela preferida: {resultado.janela}</li>}
                </ul>
              </div>
            )}

            {buscou && !resultado && (
              <p className="mt-5 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                Não encontramos esse número no histórico deste dispositivo. Isso é normal se a OS foi aberta em outro
                celular ou navegador — o site não guarda seus dados em servidor. Consulte a etapa atual pelo
                atendimento, com o número em mãos.
              </p>
            )}

            <Button type="button" variant="outline" className="mt-4 w-full sm:w-auto" onClick={abrirWhatsApp}>
              <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Consultar andamento no atendimento
            </Button>
          </div>

          {historico.length > 0 && (
            <section className="mt-8">
              <h2 className="font-heading text-xl font-bold text-foreground">Ordens abertas neste dispositivo</h2>
              <ul className="mt-3 space-y-2">
                {historico.map((r) => (
                  <li key={r.protocolo}>
                    <button
                      type="button"
                      onClick={() => {
                        setNumero(r.protocolo);
                        setResultado(r);
                        setBuscou(true);
                      }}
                      className="w-full rounded-lg border border-border px-4 py-3 text-left text-sm transition hover:bg-muted/50"
                    >
                      <span className="font-medium text-foreground">{r.protocolo}</span>
                      <span className="block text-muted-foreground">
                        {new Date(r.criadoEm).toLocaleDateString("pt-BR")} · {r.servico}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-10">
            <h2 className="font-heading text-xl font-bold text-foreground md:text-2xl">
              Etapas e prazos estimados do atendimento
            </h2>
            <ol className="mt-4 space-y-3">
              {OS_ETAPAS.map((etapa) => (
                <li key={etapa.titulo} className="rounded-lg border border-border bg-card p-4">
                  <p className="font-semibold text-foreground">{etapa.titulo}</p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {etapa.prazo}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{etapa.descricao}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">
              Prazos estimados para escopo padrão. Dependência de peça do cliente, atraso de fornecedor ou defeito
              adicional identificado na conferência podem alterar a previsão — sempre com aviso antes.
            </p>
          </section>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link to="/ordem-de-servico" className="font-medium text-[hsl(var(--accent))] underline">
              <FileText className="mr-1 inline h-4 w-4" aria-hidden="true" />
              Como funciona a ordem de serviço
            </Link>
            <Link to="/politica-de-pecas-do-cliente" className="font-medium text-[hsl(var(--accent))] underline">
              Política de peças do cliente
            </Link>
            <Link to="/precos-e-politicas" className="font-medium text-[hsl(var(--accent))] underline">
              Preços e políticas
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StatusOs;
