import { useMemo, useState } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TermosCtaLink } from "@/components/TermosCtaLink";
import { geoSuggestion } from "@/lib/geoContext";
import { siteConfig } from "@/lib/siteConfig";

interface OsForm {
  nome: string;
  local: string;
  equipamento: string;
  marcaModelo: string;
  sintoma: string;
  acessorios: string;
  modalidade: string;
}

const MODALIDADES = ["No local (domicílio/empresa)", "Coleta e entrega", "Remoto"];

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
    modalidade: MODALIDADES[0],
  }));
  const [numero, setNumero] = useState<string | null>(null);

  const set = (k: keyof OsForm) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const pronta = form.nome.trim().length >= 2 && form.equipamento.trim().length >= 2 && form.sintoma.trim().length >= 5;

  const resumo = useMemo(() => {
    const linhas = [
      `Ordem de serviço ${numero ?? ""}`.trim(),
      `Cliente: ${form.nome}`,
      form.local ? `Bairro/cidade: ${form.local}` : "",
      `Equipamento: ${form.equipamento}`,
      form.marcaModelo ? `Marca/modelo: ${form.marcaModelo}` : "",
      `Modalidade: ${form.modalidade}`,
      form.acessorios ? `Acessórios entregues: ${form.acessorios}` : "",
      `Problema relatado: ${form.sintoma}`,
      `Valor mínimo de avaliação técnica: ${siteConfig.minPriceLabel}`,
    ].filter(Boolean);
    return linhas.join("\n");
  }, [form, numero]);

  const gerar = () => {
    if (!pronta) return;
    setNumero(gerarNumero());
  };

  const enviar = () => {
    const n = numero ?? gerarNumero();
    if (!numero) setNumero(n);
    window.dispatchEvent(
      new CustomEvent("wa-funnel:open", {
        detail: {
          location: "ordem-de-servico",
          message: `Olá! Registrei a ordem de serviço ${n}.\n\n${resumo}`,
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
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Ordem de serviço</h1>
        <p className="mt-3 text-muted-foreground">
          Preencha os dados do equipamento e do problema. A ordem gerada serve como registro do atendimento
          e pode ser impressa ou enviada para continuar a triagem.
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
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={form.modalidade}
              onChange={(e) => set("modalidade")(e.target.value)}
            >
              {MODALIDADES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
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
              <Button variant="outline" onClick={() => window.print()}>
                Imprimir
              </Button>
            ) : null}
          </div>
          <TermosCtaLink />
        </div>

        {numero ? (
          <section className="mt-10 rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">Registro {numero}</h2>
            <pre className="mt-4 whitespace-pre-wrap text-sm text-muted-foreground">{resumo}</pre>
            <p className="mt-4 text-xs text-muted-foreground">
              {siteConfig.pricingDisclaimer}
            </p>
          </section>
        ) : null}
      </main>
    </div>
  );
};

export default OrdemDeServico;
