import { useEffect } from "react";
import { FastHeader } from "@/components/FastHeader";
import { Footer } from "@/components/Footer";
import { upsertCanonical } from "@/lib/canonicalUrl";
import { siteConfig } from "@/lib/siteConfig";
import { FOTOS_LICENCIADAS } from "@/lib/fotosLicenciadas";

/**
 * Créditos das fotografias reais (Etapa 10). Página utilitária: noindex,
 * mas linkável do rodapé e das seções que exibem foto.
 */
const CreditosDeImagens = () => {
  useEffect(() => {
    document.title = `Créditos de imagens | ${siteConfig.brandName}`;
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (robots) robots.setAttribute("content", "noindex, follow");
    upsertCanonical(`${siteConfig.baseUrl}/creditos-de-imagens`);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <FastHeader />
      <div aria-hidden="true" className="h-[var(--site-header-height)]" />
      <main className="container mx-auto py-12 md:py-16">
        <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
          Créditos das fotografias
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Todas as fotos do site são reais e possuem licença compatível com uso comercial. Nenhuma
          imagem foi gerada por inteligência artificial. Abaixo estão autor, origem e licença de
          cada arquivo.
        </p>

        {FOTOS_LICENCIADAS.length === 0 ? (
          <p className="mt-8 text-muted-foreground">Nenhuma fotografia licenciada publicada.</p>
        ) : (
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {FOTOS_LICENCIADAS.map((f) => (
              <li key={f.slug} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                <img
                  src={f.src}
                  alt={f.alt}
                  loading="lazy"
                  decoding="async"
                  width={160}
                  height={110}
                  className="h-[110px] w-[160px] shrink-0 rounded-lg object-cover"
                />
                <div className="text-sm">
                  <p className="font-heading font-bold text-foreground">{f.alt}</p>
                  <p className="mt-1 text-muted-foreground">
                    Autor:{" "}
                    {f.autorUrl ? (
                      <a href={f.autorUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline">
                        {f.autor}
                      </a>
                    ) : (
                      f.autor
                    )}
                  </p>
                  <p className="text-muted-foreground">
                    Licença:{" "}
                    <a href={f.licencaUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline">
                      {f.licenca}
                    </a>{" "}
                    · Fonte: {f.fonte}
                  </p>
                  <p className="mt-1">
                    <a href={f.origem} target="_blank" rel="noopener noreferrer nofollow" className="underline">
                      Página de origem
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CreditosDeImagens;
