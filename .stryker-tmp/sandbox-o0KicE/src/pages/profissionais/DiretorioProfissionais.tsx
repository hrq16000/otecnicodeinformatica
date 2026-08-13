// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, Search, ShieldCheck, Wrench } from "lucide-react";
import {
  formatarPreco,
  getProgramSettings,
  listPartners,
  type Partner,
  type ProgramSettings,
} from "@/lib/partnersApi";

/**
 * DIRETÓRIO NACIONAL DE PROFISSIONAIS PARCEIROS.
 *
 * Fail-closed: enquanto não houver perfil real aprovado, a página existe
 * (para receber cadastros) mas fica noindex — nunca publicamos um diretório
 * vazio como se fosse conteúdo útil.
 */
const DiretorioProfissionais = () => {
  const [parceiros, setParceiros] = useState<Partner[] | null>(null);
  const [config, setConfig] = useState<ProgramSettings | null>(null);
  const [termo, setTermo] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    void listPartners().then(setParceiros);
    void getProgramSettings().then(setConfig);
  }, []);

  const estados = useMemo(
    () => Array.from(new Set((parceiros ?? []).map((p) => p.estado))).sort(),
    [parceiros],
  );

  const filtrados = useMemo(() => {
    const q = termo.trim().toLowerCase();
    return (parceiros ?? []).filter((p) => {
      if (estado && p.estado !== estado) return false;
      if (!q) return true;
      return [p.nome_profissional, p.cidade, p.estado, ...p.especialidades, ...p.servicos]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [parceiros, termo, estado]);

  const temParceiros = (parceiros?.length ?? 0) > 0;

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Profissionais de informática parceiros | Rede nacional"
        description="Encontre profissionais de informática independentes por cidade e especialidade. Perfis reais, com serviços, área de atendimento e contato direto."
        path="/profissionais"
        noindex={!temParceiros}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Profissionais", path: "/profissionais" },
        ]}
      />
      <Header />

      <main>
        <section className="border-b border-border bg-card">
          <div className="container mx-auto py-12 md:py-16">
            <p className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--categoria)/0.12)] px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-[hsl(var(--categoria))]">
              <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
              Rede nacional de parceiros
            </p>
            <h1 className="mt-5 max-w-3xl font-heading text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              Profissionais de informática por cidade e especialidade
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Cada perfil é de um profissional independente, com serviços, área de atendimento e
              contato próprios. O portal divulga o trabalho técnico — a execução e a
              responsabilidade pelo serviço são de quem atende.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-background px-4">
                <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <input
                  value={termo}
                  onChange={(e) => setTermo(e.target.value)}
                  placeholder="Busque por cidade, serviço ou especialidade"
                  aria-label="Buscar profissionais"
                  className="min-h-12 w-full bg-transparent text-base text-foreground outline-none"
                />
              </div>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                aria-label="Filtrar por estado"
                className="min-h-12 rounded-xl border border-border bg-background px-4 text-base text-foreground"
              >
                <option value="">Todos os estados</option>
                {estados.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-12">
          {parceiros === null ? (
            <div role="status" aria-live="polite" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <span className="sr-only">Carregando profissionais…</span>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3 rounded-2xl border border-border bg-card p-5">
                  <div className="skel h-12 w-12 rounded-full" />
                  <div className="skel skel-title w-2/3" />
                  <div className="skel skel-line w-full" />
                  <div className="skel skel-line w-1/2" />
                </div>
              ))}
            </div>
          ) : filtrados.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="font-heading text-xl font-bold text-foreground">
                {temParceiros
                  ? "Nenhum profissional para esse filtro"
                  : "A rede está em formação"}
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {temParceiros
                  ? "Ajuste a busca ou o estado para ver outros profissionais."
                  : "Ainda não há perfis aprovados publicados. Preferimos mostrar nada a mostrar perfis fictícios. Se você é técnico, seu cadastro pode ser um dos primeiros."}
              </p>
              <Link
                to="/profissionais/cadastro"
                className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-accent px-6 font-heading font-bold text-accent-foreground"
              >
                Quero cadastrar meu perfil
              </Link>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtrados.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/profissional/${p.slug}`}
                    className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent"
                  >
                    <h2 className="font-heading text-lg font-bold text-foreground">
                      {p.nome_profissional}
                    </h2>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {p.cidade} — {p.estado}
                    </p>
                    {p.especialidades.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {p.especialidades.slice(0, 3).map((e) => (
                          <li
                            key={e}
                            className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
                          >
                            {e}
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="mt-5 font-heading text-sm font-bold text-accent">
                      Ver perfil completo
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="border-t border-border bg-card">
          <div className="container mx-auto py-12">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              É técnico? Coloque seu trabalho no mapa
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Perfil público com seus serviços, fotos de trabalhos reais, região atendida e contato
              direto.{" "}
              {config
                ? `Plano anual de ${formatarPreco(config.preco_anual_centavos, config.moeda)}.`
                : "Consulte as condições do plano anual na página de cadastro."}
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Todo cadastro passa por análise antes de ser publicado.
            </p>
            <Link
              to="/profissionais/cadastro"
              className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-accent px-6 font-heading font-bold text-accent-foreground"
            >
              Cadastrar meu perfil profissional
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DiretorioProfissionais;
