import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/formatacao-computador/sao-jose-dos-pinhais"];

export const Route = createFileRoute("/servicos_/formatacao-computador_/sao-jose-dos-pinhais")({
  component: RouteComponent,
});
