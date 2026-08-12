import { foto } from "@/lib/fotosLicenciadas";

/**
 * Fotografia REAL licenciada (Creative Commons comercial).
 *
 * Fail-closed: se o slug não existir no manifesto gerado, nada é
 * renderizado — nunca cai para imagem genérica ou sintética.
 * A atribuição exigida pela licença fica visível na legenda.
 */
export const FotoLicenciadaImg = ({
  slug,
  className = "",
  imgClassName = "",
  legenda,
  priority = false,
}: {
  slug: string;
  className?: string;
  imgClassName?: string;
  legenda?: string;
  priority?: boolean;
}) => {
  const f = foto(slug);
  if (!f) return null;

  return (
    <figure className={`overflow-hidden rounded-2xl border border-border bg-card ${className}`}>
      <img
        src={f.src}
        alt={f.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={1024}
        height={683}
        className={`aspect-[3/2] h-auto w-full object-cover ${imgClassName}`}
      />
      <figcaption className="px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        {legenda && <span className="block text-foreground">{legenda}</span>}
        <span>
          Foto:{" "}
          <a href={f.origem} target="_blank" rel="noopener noreferrer nofollow" className="underline">
            {f.autor}
          </a>{" "}
          ·{" "}
          <a href={f.licencaUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline">
            {f.licenca}
          </a>
        </span>
      </figcaption>
    </figure>
  );
};
