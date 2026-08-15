import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/estacao-araucaria"];

export const Route = createFileRoute("/bairros_/estacao-araucaria")({
  component: RouteComponent,
});
