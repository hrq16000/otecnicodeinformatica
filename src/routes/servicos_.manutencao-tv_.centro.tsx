import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/manutencao-tv/centro"];

export const Route = createFileRoute("/servicos_/manutencao-tv_/centro")({
  component: RouteComponent,
});
