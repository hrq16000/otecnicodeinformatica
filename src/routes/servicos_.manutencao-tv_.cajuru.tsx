import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/manutencao-tv/cajuru"];

export const Route = createFileRoute("/servicos_/manutencao-tv_/cajuru")({
  component: RouteComponent,
});
