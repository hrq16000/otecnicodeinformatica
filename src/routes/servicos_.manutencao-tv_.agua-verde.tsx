import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/manutencao-tv/agua-verde"];

export const Route = createFileRoute("/servicos_/manutencao-tv_/agua-verde")({
  component: RouteComponent,
});
