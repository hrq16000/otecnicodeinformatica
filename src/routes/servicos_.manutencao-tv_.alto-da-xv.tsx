import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/manutencao-tv/alto-da-xv"];

export const Route = createFileRoute("/servicos_/manutencao-tv_/alto-da-xv")({
  component: RouteComponent,
});
