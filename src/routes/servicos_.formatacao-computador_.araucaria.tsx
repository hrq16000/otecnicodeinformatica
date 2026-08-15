import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/formatacao-computador/araucaria"];

export const Route = createFileRoute("/servicos_/formatacao-computador_/araucaria")({
  component: RouteComponent,
});
