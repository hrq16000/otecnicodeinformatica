import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "@/lib/router-compat";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { MapPin } from "lucide-react";
import { listPartners, type Partner } from "@/lib/partnersApi";

const titulizar = (slug: string) =>
  slug
    .split("-")
    .map((p) => (p.length <= 2 ? p.toUpperCase() : p.charAt(0).toUpperCase() + p.slice(1)))
    .join(" ");

/**
 * PÁGINAS LOCAIS DA REDE — /profissionais/[estado] e /profissionais/[estado]/[cidade].
 *
 * Fail-closed por princípio: a página só existe quando há profissional real
 * naquele recorte. Sem parceiro, devolve 404 — nada de doorway page vazia
 * gerada em massa para SEO.
 */
const ProfissionaisLocal = () => {
  const { estado = "", cidade } = useParams();
  const [parceiros, setParceiros] = useState<Partner[] | null>(null);

  useEffect(() => {
    void listPartners({ estado, cidade }).then(setParceiros);
  }, [estado, cidade]);

  const nomeEstado = useMemo(() => titulizar(estado), [estado]);
  const nomeCidade = useMemo(() => (cidade ? titulizar(cidade) : null), [cidade]);
  const local = nomeCidade ? `${nomeCidade} — ${nomeEstado}` : nomeEstado;
  const path = cidade ? `/profissionais/${estado}/${cidade}` : `/profissionais/${estado}`;

  if (parceiros === null) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-20">
          <p className="text-muted-foreground">Carregando profissionais…</p>
        </main>
      </div>
    );
  }

  if (parceiros.length === 0) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={`Profissionais de informática em ${local}`}
        description={`Profissionais de informática independentes atuando em ${local}: especialidades, serviços e contato direto com quem executa.`}
        path={path}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Profissionais", path: "/profissionais" },
          { name: local, path },
        ]}
      />
      <Header />

      <main>
        <section className="border-b border-border bg-card">
          <div className="container mx-auto py-12">
            <h1 className="max-w-3xl font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Profissionais de informática em {local}
            </h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              {parceiros.length === 1
                ? "1 profissional independente com perfil ativo neste recorte."
                : `${parceiros.length} profissionais independentes com perfil ativo neste recorte.`}{" "}
              A contratação, o orçamento e a garantia são tratados diretamente com cada profissional.
            </p>
          </div>
        </section>

        <section className="container mx-auto py-12">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {parceiros.map((p) => (
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
                    <p className="mt-3 text-sm text-muted-foreground">
                      {p.especialidades.slice(0, 4).join(" • ")}
                    </p>
                  )}
                  <span className="mt-5 font-heading text-sm font-bold text-accent">
                    Ver perfil completo
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/profissionais" className="mt-8 inline-block font-bold text-accent">
            ← Ver a rede completa
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProfissionaisLocal;
