import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/formatacao-computador/centro"];

export const Route = createFileRoute("/servicos_/formatacao-computador_/centro")({
  component: RouteComponent,
});
