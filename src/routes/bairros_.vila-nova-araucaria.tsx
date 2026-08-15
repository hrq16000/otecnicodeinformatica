import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/vila-nova-araucaria"];

export const Route = createFileRoute("/bairros_/vila-nova-araucaria")({
  component: RouteComponent,
});
