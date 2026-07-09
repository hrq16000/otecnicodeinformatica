import { FastHeader } from "@/components/FastHeader";

/**
 * Header público. Renderiza o FastHeader (fixo, out-of-flow) e um spacer
 * in-flow com a altura do header, garantindo que o conteúdo de QUALQUER
 * página que use <Header /> nunca fique escondido atrás do header fixo.
 * A home (Index) usa <FastHeader /> diretamente com seu próprio spacer.
 */
export const Header = () => (
  <>
    <FastHeader />
    <div aria-hidden="true" className="h-[var(--site-header-height)]" />
  </>
);
