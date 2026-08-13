// @ts-nocheck
import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import {
  formatarPreco,
  getProgramSettings,
  submitPartnerApplication,
  type ProgramSettings,
} from "@/lib/partnersApi";

const ESPECIALIDADES = [
  "Manutenção de computador",
  "Manutenção de notebook",
  "Formatação e sistemas",
  "Redes e Wi-Fi",
  "Recuperação de dados",
  "Conserto de placa eletrônica",
  "Conserto de TV",
  "Conserto de monitor",
  "Impressoras",
  "CFTV e câmeras",
  "Suporte para empresas",
];

const FORMAS = ["Atendimento a domicílio", "Bancada / laboratório", "Atendimento remoto", "Coleta e entrega"];

const toggle = (lista: string[], valor: string) =>
  lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor];

/** Cadastro do profissional parceiro — entra sempre como "aguardando análise". */
const CadastroParceiro = () => {
  const [config, setConfig] = useState<ProgramSettings | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [form, setForm] = useState({
    nome_profissional: "",
    cidade: "",
    estado: "",
    whatsapp: "",
    documento_tipo: "CPF",
    documento: "",
    regioes_atendidas: "",
    descricao: "",
    experiencia: "",
    servicos: "",
  });
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [formas, setFormas] = useState<string[]>([]);
  const [aceite, setAceite] = useState(false);

  useEffect(() => {
    void getProgramSettings().then(setConfig);
  }, []);

  const campo = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value.slice(0, 4000) })),
  });

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    setErro(null);
    if (!aceite) return setErro("É necessário aceitar os termos do programa.");
    if (especialidades.length === 0) return setErro("Selecione ao menos uma especialidade.");

    setEnviando(true);
    const { error } = await submitPartnerApplication({
      nome_profissional: form.nome_profissional.trim(),
      cidade: form.cidade.trim(),
      estado: form.estado.trim(),
      whatsapp: form.whatsapp.replace(/\D/g, "").slice(0, 20),
      documento_tipo: form.documento_tipo,
      documento: form.documento.replace(/\D/g, "").slice(0, 20),
      especialidades,
      formas_atendimento: formas,
      servicos: form.servicos.split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 30),
      regioes_atendidas: form.regioes_atendidas.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 30),
      descricao: form.descricao.trim(),
      experiencia: form.experiencia.trim(),
    });
    setEnviando(false);
    if (error) {
      setErro("Não foi possível enviar o cadastro agora. Revise os dados e tente novamente.");
      return;
    }
    setEnviado(true);
  };

  const inputClass =
    "mt-1 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Cadastro de profissional parceiro | Rede de técnicos"
        description="Cadastre seu perfil profissional de informática: serviços, região atendida, fotos de trabalhos e contato direto. Cadastro sujeito a análise."
        path="/profissionais/cadastro"
        noindex
      />
      <Header />

      <main className="container mx-auto py-12 md:py-16">
        <h1 className="max-w-3xl font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Cadastre seu perfil de profissional parceiro
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Você mantém sua autonomia: o perfil divulga o seu trabalho e o contato é direto com você.
          {config
            ? ` O plano é anual, de ${formatarPreco(config.preco_anual_centavos, config.moeda)}, cobrado somente após a aprovação do cadastro.`
            : " As condições do plano anual são informadas após a análise do cadastro."}
        </p>
        <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Nenhum perfil é publicado sem análise. Não usamos perfis fictícios.
        </p>

        {config && !config.aceitando_cadastros ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-8">
            <h2 className="font-heading text-xl font-bold text-foreground">
              Cadastros temporariamente fechados
            </h2>
            <p className="mt-3 text-muted-foreground">
              No momento não estamos aceitando novos profissionais. Volte em breve.
            </p>
            <Link to="/profissionais" className="mt-6 inline-block font-bold text-accent">
              Ver a rede de profissionais
            </Link>
          </div>
        ) : enviado ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-8">
            <h2 className="inline-flex items-center gap-2 font-heading text-xl font-bold text-foreground">
              <CheckCircle2 className="h-5 w-5 text-accent" aria-hidden="true" />
              Cadastro recebido
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Seu cadastro entrou na fila de análise. Se aprovado, entramos em contato pelo WhatsApp
              informado para ativar o perfil e combinar o plano anual.
            </p>
            <Link to="/profissionais" className="mt-6 inline-block font-bold text-accent">
              Ver a rede de profissionais
            </Link>
          </div>
        ) : (
          <form onSubmit={enviar} className="mt-10 max-w-3xl space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-foreground">
                Nome profissional
                <input required maxLength={120} className={inputClass} {...campo("nome_profissional")} />
              </label>
              <label className="block text-sm font-semibold text-foreground">
                WhatsApp (com DDD)
                <input required inputMode="tel" maxLength={20} className={inputClass} {...campo("whatsapp")} />
              </label>
              <label className="block text-sm font-semibold text-foreground">
                Cidade
                <input required maxLength={80} className={inputClass} {...campo("cidade")} />
              </label>
              <label className="block text-sm font-semibold text-foreground">
                Estado (UF)
                <input required maxLength={40} className={inputClass} {...campo("estado")} />
              </label>
              <label className="block text-sm font-semibold text-foreground">
                Tipo de documento
                <select className={inputClass} {...campo("documento_tipo")}>
                  <option value="CPF">CPF</option>
                  <option value="CNPJ">CNPJ</option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-foreground">
                Número do documento
                <input required maxLength={20} className={inputClass} {...campo("documento")} />
              </label>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold text-foreground">Especialidades</legend>
              <ul className="mt-3 flex flex-wrap gap-2">
                {ESPECIALIDADES.map((e) => (
                  <li key={e}>
                    <button
                      type="button"
                      onClick={() => setEspecialidades((l) => toggle(l, e))}
                      aria-pressed={especialidades.includes(e)}
                      className={`min-h-11 rounded-full border px-4 text-sm ${
                        especialidades.includes(e)
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border bg-card text-foreground"
                      }`}
                    >
                      {e}
                    </button>
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-foreground">Formas de atendimento</legend>
              <ul className="mt-3 flex flex-wrap gap-2">
                {FORMAS.map((f) => (
                  <li key={f}>
                    <button
                      type="button"
                      onClick={() => setFormas((l) => toggle(l, f))}
                      aria-pressed={formas.includes(f)}
                      className={`min-h-11 rounded-full border px-4 text-sm ${
                        formas.includes(f)
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border bg-card text-foreground"
                      }`}
                    >
                      {f}
                    </button>
                  </li>
                ))}
              </ul>
            </fieldset>

            <label className="block text-sm font-semibold text-foreground">
              Bairros ou cidades atendidas (separe por vírgula)
              <input maxLength={500} className={inputClass} {...campo("regioes_atendidas")} />
            </label>

            <label className="block text-sm font-semibold text-foreground">
              Serviços que você executa (um por linha)
              <textarea rows={5} maxLength={2000} className={`${inputClass} py-3`} {...campo("servicos")} />
            </label>

            <label className="block text-sm font-semibold text-foreground">
              Sobre o seu trabalho
              <textarea required rows={5} maxLength={4000} className={`${inputClass} py-3`} {...campo("descricao")} />
            </label>

            <label className="block text-sm font-semibold text-foreground">
              Experiência (tempo de atuação, formação, certificações)
              <textarea rows={4} maxLength={2000} className={`${inputClass} py-3`} {...campo("experiencia")} />
            </label>

            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={aceite}
                onChange={(e) => setAceite(e.target.checked)}
                className="mt-1 h-5 w-5"
              />
              <span>
                Declaro que as informações são verdadeiras, que atuo como profissional independente
                e aceito os{" "}
                <Link to="/termos-e-condicoes" className="font-bold text-accent">
                  termos e condições
                </Link>{" "}
                do programa de parceiros.
              </span>
            </label>

            {erro && (
              <p role="alert" className="text-sm font-semibold text-destructive">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={enviando}
              data-cta-location="cadastro_parceiro_enviar"
              className="inline-flex min-h-12 items-center rounded-xl bg-accent px-6 font-heading font-bold text-accent-foreground disabled:opacity-60"
            >
              {enviando ? "Enviando…" : "Enviar cadastro para análise"}
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CadastroParceiro;
