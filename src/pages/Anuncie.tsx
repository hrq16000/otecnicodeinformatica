import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Megaphone,
  LayoutPanelTop,
  MapPin,
  Handshake,
  CheckCircle2,
  XCircle,
  MessageCircle,
  FileText,
} from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { FastHeader } from "@/components/FastHeader";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig, whatsappLink } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const CTA_CLASS =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-base font-bold text-accent-foreground shadow-[0_14px_34px_-10px_hsl(var(--accent)/0.6)] transition-transform hover:scale-[1.02]";

const formatos = [
  {
    icon: LayoutPanelTop,
    title: "Banner de topo (above the fold)",
    desc: "Espaço fixo no topo das páginas de serviço, visível antes da primeira rolagem em celular e desktop.",
    obs: "Formato responsivo. Sem pop-up, sem interstitial e sem bloqueio do conteúdo.",
  },
  {
    icon: FileText,
    title: "Bloco no meio do conteúdo",
    desc: "Inserção entre seções editoriais das páginas de conteúdo técnico (sintomas, guias e FAQ).",
    obs: "Sempre identificado como conteúdo publicitário, separado do conteúdo editorial.",
  },
  {
    icon: Handshake,
    title: "Patrocínio de seção",
    desc: "Assinatura discreta de marca em uma vertical inteira (ex.: TV, placas ou redes) por período contratado.",
    obs: "Não altera recomendações técnicas nem o conteúdo das páginas patrocinadas.",
  },
  {
    icon: MapPin,
    title: "Destaque local por cidade ou bairro",
    desc: "Presença de marca nas páginas locais de Curitiba e região metropolitana atendidas pelo portal.",
    obs: "Disponível apenas para as localidades já publicadas no portal.",
  },
];

const publico = [
  "Buscas comerciais por conserto, manutenção e suporte técnico em Curitiba e região metropolitana.",
  "Usuários residenciais com notebook, PC, TV, monitor e rede doméstica com defeito.",
  "Empresas e profissionais liberais procurando suporte de TI, backup e manutenção preventiva.",
  "Intenção alta: a maior parte das visitas chega por termos de problema, preço ou urgência.",
];

const regras = [
  "Todo anúncio é identificado como publicidade e fica separado do conteúdo editorial.",
  "Não vendemos menção editorial disfarçada, review pago nem recomendação técnica.",
  "Não publicamos avaliação, nota ou depoimento de terceiros que não seja real.",
  "Não aceitamos anúncios que violem as políticas de publicidade dos parceiros de mídia.",
  "Reservamo-nos o direito de recusar campanhas incompatíveis com o público do portal.",
];

const naoOferecemos = [
  "Não divulgamos números de audiência sem base verificável: métricas são enviadas sob consulta, direto dos painéis oficiais.",
  "Não garantimos volume de cliques, leads ou posição em buscadores.",
  "Não fazemos permuta por links pagos sem marcação adequada.",
];

const Anuncie = () => {
  useEffect(() => {
    trackPageView("/anuncie", "Anuncie e patrocine");
  }, []);

  const waHref = whatsappLink(
    "Olá! Tenho interesse comercial em anunciar/patrocinar no portal Técnico em Curitiba. Pode me enviar o mídia kit e os formatos disponíveis?",
  );

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Anuncie e Patrocine | Mídia Kit do Técnico em Curitiba"
        description="Formatos de anúncio, posições recomendadas e regras de publicidade do portal Técnico em Curitiba. Fale com o comercial e receba o mídia kit atualizado."
        path="/anuncie"
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Anuncie", path: "/anuncie" },
        ]}
      />

      <FastHeader />
      <main className="pt-[var(--site-header-height)]">
        <Breadcrumbs items={[{ label: "Anuncie" }]} />

        <section className="border-b border-border/60 bg-secondary/40">
          <div className="container mx-auto py-12 md:py-16">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                <Megaphone className="h-4 w-4" />
                Espaço comercial e patrocínio
              </span>
              <h1 className="mt-5 text-3xl font-heading font-bold leading-tight text-foreground md:text-5xl">
                Anuncie no <span className="text-accent">Técnico em Curitiba</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
                Portal de conteúdo técnico e atendimento em informática, TV, placas e redes em{" "}
                {siteConfig.primaryCity} e região metropolitana. Aqui você encontra os formatos disponíveis,
                as posições recomendadas e as regras de publicidade do portal.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={CTA_CLASS}
                  data-cta-location="anuncie_hero"
                  onClick={() => trackCTAClick("anuncie_hero", "whatsapp")}
                >
                  <MessageCircle className="h-5 w-5" />
                  Falar com o comercial
                </a>
                <Link
                  to="/contato"
                  className="inline-flex min-h-14 items-center justify-center rounded-lg border border-border px-6 text-base font-semibold text-foreground transition-colors hover:bg-secondary/60"
                >
                  Enviar proposta pelo contato
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
              Formatos e posições disponíveis
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Todos os formatos respeitam a leitura do conteúdo: nada de pop-up cobrindo a tela, autoplay com som
              ou anúncio que empurre o texto durante a rolagem.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {formatos.map((f) => (
                <article key={f.title} className="rounded-2xl border border-border bg-card p-6">
                  <f.icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-heading font-bold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-muted-foreground">{f.desc}</p>
                  <p className="mt-3 text-sm text-muted-foreground/90">{f.obs}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 bg-secondary/30 py-12 md:py-16">
          <div className="container mx-auto grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
                Público e contexto do portal
              </h2>
              <ul className="mt-5 space-y-3">
                {publico.map((p) => (
                  <li key={p} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
                Métricas de audiência (sessões, páginas mais acessadas e origem de tráfego) são enviadas sob
                consulta, extraídas dos painéis oficiais de analytics e do Search Console — não publicamos
                estimativas sem lastro.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
                Regras de publicidade
              </h2>
              <ul className="mt-5 space-y-3">
                {regras.map((r) => (
                  <li key={r} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-5 space-y-3">
                {naoOferecemos.map((n) => (
                  <li key={n} className="flex gap-3 text-muted-foreground">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
              Transparência, cookies e privacidade
            </h2>
            <p className="mt-4 text-muted-foreground">
              O portal exibe publicidade de terceiros e opera com banner de consentimento configurável
              (anúncios e análise) integrado ao Consent Mode v2. O visitante pode recusar cookies opcionais a
              qualquer momento e continuar navegando normalmente.
            </p>
            <ul className="mt-6 space-y-2 text-muted-foreground">
              <li>
                <Link to="/politica-de-cookies-e-anuncios" className="text-accent underline underline-offset-4">
                  Política de cookies e anúncios
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidade" className="text-accent underline underline-offset-4">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link to="/status-de-anuncios" className="text-accent underline underline-offset-4">
                  Status de anúncios (verificação do ads.txt)
                </Link>
              </li>
              <li>
                <Link to="/termos-e-condicoes" className="text-accent underline underline-offset-4">
                  Termos e condições de uso
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="border-t border-border/60 bg-secondary/40 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
              Receba o mídia kit atualizado
            </h2>
            <p className="mt-4 text-muted-foreground">
              Envie o segmento, a região de interesse e o período da campanha. Respondemos com formatos
              disponíveis, posições livres e as métricas atuais do portal.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className={CTA_CLASS}
                data-cta-location="anuncie_final"
                onClick={() => trackCTAClick("anuncie_final", "whatsapp")}
              >
                <MessageCircle className="h-5 w-5" />
                Solicitar mídia kit
              </a>
              <Link
                to="/servicos"
                className="inline-flex min-h-14 items-center justify-center rounded-lg border border-border px-6 text-base font-semibold text-foreground transition-colors hover:bg-secondary/60"
              >
                Ver páginas de serviço do portal
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Anuncie;
