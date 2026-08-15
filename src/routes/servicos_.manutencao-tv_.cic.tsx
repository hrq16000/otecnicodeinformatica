import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/manutencao-tv/cic"];

export const Route = createFileRoute("/servicos_/manutencao-tv_/cic")({
  component: RouteComponent,
});
