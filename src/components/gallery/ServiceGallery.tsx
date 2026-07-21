import { memo } from "react";

export interface ServiceGalleryImage {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
}

interface ServiceGalleryProps {
  title: string;
  subtitle?: string;
  images: ServiceGalleryImage[];
  id?: string;
}

/**
 * Galeria responsiva "o que está incluso no atendimento".
 * - `loading="lazy"` + `decoding="async"` para preservar LCP fora do fold.
 * - Fonte de imagens é externa (Unsplash CDN já responde em WebP quando o
 *   browser envia `Accept: image/webp`, mantido pelo `auto=format` na URL).
 * - Cada `<figure>` tem alt e legenda visíveis para acessibilidade e SEO.
 */
export const ServiceGallery = memo(function ServiceGallery({
  title,
  subtitle,
  images,
  id,
}: ServiceGalleryProps) {
  return (
    <section id={id} className="py-10 md:py-14 bg-secondary/40">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">{title}</h2>
            {subtitle && (
              <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img) => (
              <figure
                key={img.src}
                className="rounded-xl overflow-hidden bg-background border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  width={img.width || 600}
                  height={img.height || 400}
                  className="w-full h-48 md:h-56 object-cover"
                />
                <figcaption className="p-3 text-xs md:text-sm text-muted-foreground text-center italic">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
