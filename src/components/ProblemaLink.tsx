import { useEffect } from "react";
import { Link, type LinkProps } from "react-router-dom";

/**
 * Wrapper de <Link> que pré-carrega o chunk de `problemaPagesData` quando o
 * link entra no viewport ou recebe hover/focus, melhorando o TTI ao navegar
 * para /problemas/<slug>.
 */
let prefetched = false;
const prefetch = () => {
  if (prefetched) return;
  prefetched = true;
  // dynamic import gera prefetch do chunk e popula o cache do módulo
  import("@/lib/problemaPagesData").catch(() => { prefetched = false; });
};

export const ProblemaLink = ({ children, ...props }: LinkProps) => {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    // observer global leve — qualquer link que entre no viewport dispara
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="/problemas/"]');
    if (!links.length) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        prefetch();
        io.disconnect();
      }
    }, { rootMargin: "200px" });
    links.forEach((l) => io.observe(l));
    return () => io.disconnect();
  }, []);

  return (
    <Link {...props} onMouseEnter={prefetch} onFocus={prefetch} onTouchStart={prefetch}>
      {children}
    </Link>
  );
};

/** Hook standalone: dispara prefetch global de chunks pesados sob proximidade. */
export const useProblemaChunkPrefetch = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onHover = (e: Event) => {
      const t = (e.target as HTMLElement | null)?.closest('a[href^="/problemas/"]');
      if (t) prefetch();
    };
    document.addEventListener("mouseover", onHover, { passive: true });
    document.addEventListener("focusin", onHover, { passive: true });
    document.addEventListener("touchstart", onHover, { passive: true });

    // Observer para links visíveis
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          prefetch();
          io.disconnect();
        }
      }, { rootMargin: "300px" });
      // pequeno delay para o DOM estabilizar após hydration
      const t = window.setTimeout(() => {
        document.querySelectorAll<HTMLAnchorElement>('a[href^="/problemas/"]').forEach((l) => io.observe(l));
      }, 1200);
      return () => {
        window.clearTimeout(t);
        io.disconnect();
        document.removeEventListener("mouseover", onHover);
        document.removeEventListener("focusin", onHover);
        document.removeEventListener("touchstart", onHover);
      };
    }
    return () => {
      document.removeEventListener("mouseover", onHover);
      document.removeEventListener("focusin", onHover);
      document.removeEventListener("touchstart", onHover);
    };
  }, []);
};

export default ProblemaLink;
