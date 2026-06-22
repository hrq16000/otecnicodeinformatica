/**
 * Loader compartilhado por TODOS os Suspense de rota.
 * Reproduz exatamente o shell estático do `index.html` (gradiente azul +
 * logo pulsando), para que a transição shell → loader → página seja
 * visualmente contínua — o usuário só vê a logo pulsando 1–2 vezes.
 */
export const RouteLoader = () => (
  <div
    role="status"
    aria-label="Carregando"
    style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      background:
        "linear-gradient(155deg,hsl(215,65%,22%) 0%,hsl(215,70%,18%) 55%,hsl(220,55%,28%) 100%)",
    }}
  >
    <img
      src="/lovable-uploads/87899615-1234-4c6d-a8ca-ee38ec566ef4.webp"
      alt="Técnico Curitiba"
      width={304}
      height={98}
      decoding="sync"
      fetchPriority="high"
      className="motion-safe:animate-pulse"
      style={{
        width: "clamp(10.5rem, 46vw, 17rem)",
        height: "auto",
        objectFit: "contain",
        filter: "drop-shadow(0 .75rem 1.5rem rgba(0,0,0,.22))",
        animationDuration: "900ms",
      }}
    />
  </div>
);

export default RouteLoader;
