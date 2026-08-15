import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/manutencao-tv/ecoville"];

export const Route = createFileRoute("/servicos_/manutencao-tv_/ecoville")({
  component: RouteComponent,
});
