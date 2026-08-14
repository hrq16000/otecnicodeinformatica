import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/suporte-tecnico-empresarial")({
  component: legacyRouteElements["/servicos/suporte-tecnico-empresarial"],
});
