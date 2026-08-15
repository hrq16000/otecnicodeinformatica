import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/manutencao-tv/jardim-das-americas"];

export const Route = createFileRoute("/servicos_/manutencao-tv_/jardim-das-americas")({
  component: RouteComponent,
});
