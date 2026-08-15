import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/manutencao-tv/batel"];

export const Route = createFileRoute("/servicos_/manutencao-tv_/batel")({
  component: RouteComponent,
});
