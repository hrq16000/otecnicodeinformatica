import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/manutencao-de-notebook"];

export const Route = createFileRoute("/servicos_/manutencao-de-notebook")({
  component: RouteComponent,
});
