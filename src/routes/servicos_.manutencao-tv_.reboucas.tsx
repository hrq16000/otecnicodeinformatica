import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/manutencao-tv/reboucas"];

export const Route = createFileRoute("/servicos_/manutencao-tv_/reboucas")({
  component: RouteComponent,
});
