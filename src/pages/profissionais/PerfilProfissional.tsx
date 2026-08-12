import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { MapPin, MessageCircle, Clock, BadgeCheck, ExternalLink } from "lucide-react";
import {
  getPartnerBySlug,
  getPartnerPhotos,
  type Partner,
  type PartnerPhoto,
} from "@/lib/partnersApi";

/**
 * PERFIL PÚBLICO DO PROFISSIONAL PARCEIRO.
 * Só existe para parceiros com cadastro ativo; qualquer outro slug devolve 404
 * real (mesmo componente do NotFound), sem shell da Home.
 */
const PerfilProfissional = () => {
  const { slug = "" } = useParams();
  const [estado, setEstadoCarga] = useState<"carregando" | "ok" | "ausente">("carregando");
  const [parceiro, setParceiro] = useState<Partner | null>(null);
  const [fotos, setFotos] = useState<PartnerPhoto[]>([]);

  useEffect(() => {
    let ativo = true;
    void getPartnerBySlug(slug).then(async (p) => {
      if (!ativo) return;
      if (!p) {
        setEstadoCarga("ausente");
        return;
      }
      setParceiro(p);
      setEstadoCarga("ok");
      setFotos(await getPartnerPhotos(p.id));
    });
    return () => {
      ativo = false;
    };
  }, [slug]);

  if (estado === "ausente") return <NotFound />;

  if (estado === "carregando" || !parceiro) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-20">
          <p className="text-muted-foreground">Carregando perfil…</p>
        </main>
      </div>
    );
  }

  const p = parceiro;
  const waLink = p.whatsapp
    ? `https://wa.me/${p.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Olá, ${p.nome_profissional}. Vi seu perfil e preciso de um serviço técnico.`,
      )}`
    : null;

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={`${p.nome_profissional} — técnico de informática em ${p.cidade}`}
        description={
          p.descricao?.slice(0, 155) ??
          `Profissional de informática em ${p.cidade} (${p.estado}). Serviços, área de atendimento e contato direto.`
        }
        path={`/profissional/${p.slug}`}
        ogType="profile"
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Profissionais", path: "/profissionais" },
          { name: p.nome_profissional, path: `/profissional/${p.slug}` },
        ]}
      />
      <Header />

      <main>
        <section className="border-b border-border bg-card">
          <div className="container mx-auto flex flex-col gap-6 py-12 md:flex-row md:items-center">
            {p.foto_url && (
              <img
                src={p.foto_url}
                alt={`Foto de ${p.nome_profissional}`}
                loading="lazy"
                className="h-28 w-28 rounded-2xl object-cover"
              />
            )}
            <div className="flex-1">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {p.nome_profissional}
              </h1>
              <p className="mt-2 inline-flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {p.cidade} — {p.estado}
              </p>
              {p.horario && (
                <p className="mt-1 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {p.horario}
                </p>
              )}
              <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
                Profissional independente divulgado nesta plataforma. A execução, o orçamento e a
                garantia do serviço são de responsabilidade do próprio profissional.
              </p>
            </div>
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer nofollow"
                data-cta-location="perfil_profissional_whatsapp"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-accent px-6 font-heading font-bold text-accent-foreground"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Falar com o profissional
              </a>
            )}
          </div>
        </section>

        <div className="container mx-auto grid gap-10 py-12 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            {p.descricao && (
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">Sobre o trabalho</h2>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">
                  {p.descricao}
                </p>
              </section>
            )}

            {p.servicos.length > 0 && (
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">Serviços</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {p.servicos.map((s) => (
                    <li
                      key={s}
                      className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {fotos.length > 0 && (
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Trabalhos realizados
                </h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {fotos.map((f) => (
                    <li key={f.id} className="overflow-hidden rounded-xl border border-border">
                      <img
                        src={f.url}
                        alt={f.legenda ?? `Trabalho de ${p.nome_profissional}`}
                        loading="lazy"
                        className="h-44 w-full object-cover"
                      />
                      {f.legenda && (
                        <p className="bg-card p-3 text-xs text-muted-foreground">{f.legenda}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {p.experiencia && (
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">Experiência</h2>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">
                  {p.experiencia}
                </p>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            {p.especialidades.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-heading text-lg font-bold text-foreground">Especialidades</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.especialidades.map((e) => (
                    <li
                      key={e}
                      className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.regioes_atendidas.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-heading text-lg font-bold text-foreground">Onde atende</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  {p.regioes_atendidas.join(" • ")}
                </p>
              </div>
            )}

            {p.formas_atendimento.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-heading text-lg font-bold text-foreground">
                  Formas de atendimento
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  {p.formas_atendimento.join(" • ")}
                </p>
              </div>
            )}

            {p.certificacoes.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="inline-flex items-center gap-2 font-heading text-lg font-bold text-foreground">
                  <BadgeCheck className="h-5 w-5" aria-hidden="true" />
                  Certificações
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {p.certificacoes.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {p.site_url && (
              <a
                href={p.site_url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 text-sm font-bold text-accent"
              >
                Site do profissional
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}

            <Link to="/profissionais" className="block text-sm font-bold text-accent">
              ← Ver outros profissionais
            </Link>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PerfilProfissional;
