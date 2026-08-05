import { useEffect, useMemo, useState } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TermosCtaLink } from "@/components/TermosCtaLink";
import { geoSuggestion, subscribeGeo } from "@/lib/geoContext";
import { trackCTAClick } from "@/lib/analytics";
import { MODALIDADES, REGRA_CANCELAMENTO, NOTA_VISITA_AVULSA } from "@/lib/precosConfig";
import { toast } from "sonner";

interface OsForm {
  nome: string;
  local: string;
  equipamento: string;
  marcaModelo: string;
  sintoma: string;
  acessorios: string;
  modalidadeId: string;
}

const gerarNumero = () => {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `OS-${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${rand}`;
};

const OrdemDeServico = () => {
  const [form, setForm] = useState<OsForm>(() => ({
    nome: "",
    local: geoSuggestion(),
    equipamento: "",
    marcaModelo: "",
    sintoma: "",
    acessorios: "",
    modalidadeId: MODALIDADES[0].id,
  }));
  const [numero, setNumero] = useState<string | null>(null);

  // Pré-preenche bairro/cidade assim que a detecção (IP ou precisa) resolver,
  // sem sobrescrever o que o usuário já digitou.
  useEffect(() => subscribeGeo(() => {
    const sugestao = geoSuggestion();
    if (!sugestao) return;
    setForm((p) => (p.local.trim() ? p : { ...p, local: sugestao }));
  }), []);

  const set = (k: keyof OsForm) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const modalidade = MODALIDADES.find((m) => m.id === form.modalidadeId) ?? MODALIDADES[0];

  const pronta =
    form.nome.trim().length >= 2 && form.equipamento.trim().length >= 2 && form.sintoma.trim().length >= 5;

  const resumo = useMemo(() => {
    const linhas = [
      `Ordem de serviço ${numero ?? ""}`.trim(),
      `Data: ${new Date().toLocaleDateString("pt-BR")}`,
      `Cliente: ${form.nome}`,
      form.local ? `Bairro/cidade: ${form.local}` : "",
      `Equipamento: ${form.equipamento}`,
      form.marcaModelo ? `Marca/modelo: ${form.marcaModelo}` : "",
      form.acessorios ? `Acessórios entregues: ${form.acessorios}` : "",
      `Problema relatado: ${form.sintoma}`,
      "",
      `Modalidade: ${modalidade.titulo}`,
      `Valor: ${modalidade.valorLabel} (${modalidade.unidade})`,
      ...modalidade.detalhes.map((d) => `- ${d}`),
      "",
      `Cancelamento: ${REGRA_CANCELAMENTO}`,
      NOTA_VISITA_AVULSA,
    ].filter(Boolean);
    return linhas.join("\n");
  }, [form, numero, modalidade]);

  const garantirNumero = () => {
    const n = numero ?? gerarNumero();
    if (!numero) setNumero(n);
    return n;
  };

  const gerar = () => {
    if (!pronta) return;
    garantirNumero();
  };

  const mensagemWhatsApp = (n: string) =>
    [
      `Olá! Registrei a ordem de serviço ${n}.`,
      "",
      `Modalidade: ${modalidade.titulo}`,
      `Valor: ${modalidade.valorLabel} (${modalidade.unidade})`,
      form.local ? `Bairro/cidade: ${form.local}` : "",
      `Equipamento: ${form.equipamento}${form.marcaModelo ? ` (${form.marcaModelo})` : ""}`,
      `Problema: ${form.sintoma}`,
      "",
      "Registro completo:",
      resumo.replace(/^Ordem de serviço.*$/m, `Ordem de serviço ${n}`),
    ]
      .filter(Boolean)
      .join("\n");

  const copiar = async () => {
    const n = garantirNumero();
    try {
      await navigator.clipboard.writeText(mensagemWhatsApp(n));
      toast.success("Conteúdo copiado — cole no WhatsApp.");
    } catch {
      toast.error("Não foi possível copiar automaticamente. Selecione o texto abaixo.");
    }
  };

  const baixar = () => {
    const n = garantirNumero();
    const conteudo = resumo.replace(/^Ordem de serviço.*$/m, `Ordem de serviço ${n}`);
    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${n}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const enviar = () => {
    const n = garantirNumero();
    trackCTAClick("whatsapp", "ordem-de-servico");
    window.dispatchEvent(
      new CustomEvent("wa-funnel:open", {
        detail: {
          location: "ordem-de-servico",
          message: mensagemWhatsApp(n),
        },
      }),
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Ordem de serviço | Técnico em Curitiba"
        description="Registre os dados do equipamento e gere uma ordem de serviço para acompanhar o atendimento técnico."
        path="/ordem-de-servico"
        noindex
      />
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Ordem de serviço
        </h1>
        <p className="mt-3 text-muted-foreground">
          Preencha os dados do equipamento e do problema. A ordem gerada serve como registro do atendimento,
          traz a modalidade escolhida com as condições aplicáveis e pode ser baixada, impressa ou copiada.
        </p>

        <div className="mt-8 grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="os-nome">Nome do cliente</Label>
            <Input id="os-nome" value={form.nome} onChange={(e) => set("nome")(e.target.value)} placeholder="Como podemos te chamar?" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="os-local">Bairro e cidade</Label>
            <Input
              id="os-local"
              value={form.local}
              onChange={(e) => set("local")(e.target.value)}
              placeholder="Ex.: Batel, Curitiba"
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="os-equip">Equipamento</Label>
              <Input id="os-equip" value={form.equipamento} onChange={(e) => set("equipamento")(e.target.value)} placeholder="Notebook, PC, impressora..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="os-modelo">Marca e modelo</Label>
              <Input id="os-modelo" value={form.marcaModelo} onChange={(e) => set("marcaModelo")(e.target.value)} placeholder="Ex.: Dell Inspiron 15" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="os-modalidade">Modalidade de atendimento</Label>
            <select
              id="os-modalidade"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
              value={form.modalidadeId}
              onChange={(e) => set("modalidadeId")(e.target.value)}
            >
              {MODALIDADES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.titulo} — {m.valorLabel}
                </option>
              ))}
            </select>
            <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">
                {modalidade.valorLabel}{" "}
                <span className="text-xs font-normal uppercase tracking-wide">({modalidade.unidade})</span>
              </p>
              <p className="mt-2">{modalidade.resumo}</p>
              <ul className="mt-2 space-y-1">
                {modalidade.detalhes.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">▸</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="os-acess">Acessórios entregues</Label>
            <Input id="os-acess" value={form.acessorios} onChange={(e) => set("acessorios")(e.target.value)} placeholder="Fonte, cabo, mouse..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="os-sintoma">Problema relatado</Label>
            <Textarea id="os-sintoma" rows={4} value={form.sintoma} onChange={(e) => set("sintoma")(e.target.value)} placeholder="Descreva o que acontece, quando começou e o que já foi tentado." />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={gerar} disabled={!pronta} variant="secondary">
              Gerar ordem de serviço
            </Button>
            <Button onClick={enviar} disabled={!pronta} data-cta-location="ordem-de-servico">
              Solicitar atendimento
            </Button>
            {numero ? (
              <>
                <Button variant="outline" onClick={copiar}>
                  Copiar para o WhatsApp
                </Button>
                <Button variant="outline" onClick={baixar}>
                  Baixar documento
                </Button>
                <Button variant="outline" onClick={() => window.print()}>
                  Imprimir
                </Button>
              </>
            ) : null}
          </div>
          <TermosCtaLink />
        </div>

        {numero ? (
          <section className="mt-10 rounded-xl border border-border bg-card p-6" data-testid="os-documento">
            <h2 className="font-heading text-xl font-semibold text-foreground">Registro {numero}</h2>
            <pre className="mt-4 whitespace-pre-wrap font-sans text-sm text-muted-foreground">{resumo}</pre>
            <p className="mt-4 text-xs text-muted-foreground">{REGRA_CANCELAMENTO}</p>
          </section>
        ) : null}
      </main>
    </div>
  );
};

export default OrdemDeServico;
