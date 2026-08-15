import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-miguel-araucaria"];

export const Route = createFileRoute("/bairros_/sao-miguel-araucaria")({
  component: RouteComponent,
});
