import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/formatacao-computador/portao"];

export const Route = createFileRoute("/servicos_/formatacao-computador_/portao")({
  component: RouteComponent,
});
