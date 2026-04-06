import { IMAGES } from "@/lib/images";

type ImageKey = "tecnicoTrabalhando" | "notebookReparo" | "placaMae" | "bancadaTecnica" | "ferramentas" | "atendimentoDomiciliar" | "componentesSsd" | "redesWifi" | "cameraSeguranca" | "diagnostico" | "desktopMontado" | "smartTv" | "suporteRemoto" | "servidores" | "segurancaDigital" | "coletaEntrega" | "clienteSatisfeito";

interface RealImageSectionProps {
  imageKey: ImageKey;
  secondaryImageKey?: ImageKey;
  caption?: string;
  secondaryCaption?: string;
  layout?: "single" | "duo";
}

export const RealImageSection = ({
  imageKey,
  secondaryImageKey,
  caption,
  secondaryCaption,
  layout = "single",
}: RealImageSectionProps) => {
  const src = IMAGES[imageKey];
  const alt = IMAGES[`${imageKey}Alt` as keyof typeof IMAGES] as string;

  if (layout === "duo" && secondaryImageKey) {
    const src2 = IMAGES[secondaryImageKey];
    const alt2 = IMAGES[`${secondaryImageKey}Alt` as keyof typeof IMAGES] as string;
    return (
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <figure>
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                width={600}
                height={400}
                className="rounded-xl w-full h-64 md:h-72 object-cover shadow-md"
              />
              {caption && (
                <figcaption className="text-xs text-muted-foreground mt-2 text-center italic">{caption}</figcaption>
              )}
            </figure>
            <figure>
              <img
                src={src2}
                alt={alt2}
                loading="lazy"
                width={800}
                height={533}
                className="rounded-xl w-full h-64 md:h-72 object-cover shadow-md"
              />
              {secondaryCaption && (
                <figcaption className="text-xs text-muted-foreground mt-2 text-center italic">{secondaryCaption}</figcaption>
              )}
            </figure>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <figure>
            <img
              src={src}
              alt={alt}
              loading="lazy"
              width={800}
              height={533}
              className="rounded-xl w-full h-64 md:h-80 object-cover shadow-md"
            />
            {caption && (
              <figcaption className="text-xs text-muted-foreground mt-2 text-center italic">{caption}</figcaption>
            )}
          </figure>
        </div>
      </div>
    </section>
  );
};
