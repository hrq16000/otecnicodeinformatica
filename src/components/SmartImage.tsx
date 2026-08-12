import { useCallback, useRef, useState, type ImgHTMLAttributes } from "react";

type SmartImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "onLoad"> & {
  /** Renderiza o esqueleto shimmer atrás da imagem enquanto ela decodifica. */
  skeleton?: boolean;
  /** LCP: desliga lazy/fade e prioriza o download. */
  priority?: boolean;
  /** Classe aplicada ao wrapper (que reserva o espaço). */
  wrapperClassName?: string;
};

/**
 * ONDA 4T — imagem com carregamento previsível.
 *
 * - Reserva o espaço pelo wrapper (CLS 0), mostra shimmer enquanto carrega.
 * - Faz fade-in curto quando a imagem decodifica; `prefers-reduced-motion`
 *   remove o fade via CSS.
 * - `priority` desliga o lazy e o fade (usado no LCP).
 * - `alt`, `src`, `width` e `height` continuam no HTML — nada muda para SEO.
 */
export const SmartImage = ({
  skeleton = true,
  priority = false,
  wrapperClassName = "",
  className = "",
  loading,
  decoding,
  fetchPriority,
  ...rest
}: SmartImageProps) => {
  const [loaded, setLoaded] = useState(priority);
  const ref = useRef<HTMLImageElement | null>(null);

  // Imagem vinda do cache pode completar antes do listener: checamos no ref.
  const attach = useCallback((node: HTMLImageElement | null) => {
    ref.current = node;
    if (node?.complete) setLoaded(true);
  }, []);

  const showSkeleton = skeleton && !priority && !loaded;

  return (
    <span className={`relative block ${wrapperClassName}`.trim()}>
      {showSkeleton ? (
        <span aria-hidden="true" className="skel absolute inset-0 block" />
      ) : null}
      <img
        ref={attach}
        loading={loading ?? (priority ? "eager" : "lazy")}
        decoding={decoding ?? (priority ? "sync" : "async")}
        fetchPriority={fetchPriority ?? (priority ? "high" : undefined)}
        data-loaded={loaded ? "true" : "false"}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`${priority ? "" : "img-fade"} relative ${className}`.trim()}
        {...rest}
      />
    </span>
  );
};

export default SmartImage;
