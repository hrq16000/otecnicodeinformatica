import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/suporte-tecnico-empresarial"];

export const Route = createFileRoute("/servicos_/suporte-tecnico-empresarial")({
  component: RouteComponent,
});
