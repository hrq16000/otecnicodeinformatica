import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/manutencao-tv/boa-vista"];

export const Route = createFileRoute("/servicos_/manutencao-tv_/boa-vista")({
  component: RouteComponent,
});
