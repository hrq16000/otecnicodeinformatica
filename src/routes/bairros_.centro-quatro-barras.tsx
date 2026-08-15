import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/centro-quatro-barras"];

export const Route = createFileRoute("/bairros_/centro-quatro-barras")({
  component: RouteComponent,
});
