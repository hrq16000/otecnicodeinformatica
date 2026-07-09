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
      opacity: 1,
      background:
        "linear-gradient(155deg,hsl(215,65%,22%) 0%,hsl(215,70%,18%) 55%,hsl(220,55%,28%) 100%)",
      transition: "opacity 160ms ease",
    }}
  >
    <style>{`@keyframes routeLogoPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.62;transform:scale(1.06)}}`}</style>
    <img
      src="/__l5e/assets-v1/957e727d-8074-4275-82c1-a2a326c28b7a/logo-tecnico-curitiba.png"
      alt="Técnico Curitiba"
      width={304}
      height={98}
      decoding="sync"
      style={{
        width: "clamp(13rem, 58vw, 22rem)",
        height: "auto",
        objectFit: "contain",
        filter: "drop-shadow(0 .75rem 1.5rem rgba(0,0,0,.22))",
        animation: "routeLogoPulse 720ms ease-in-out infinite",
      }}
    />
  </div>
);

export default RouteLoader;
