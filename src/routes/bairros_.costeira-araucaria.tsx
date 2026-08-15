import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/costeira-araucaria"];

export const Route = createFileRoute("/bairros_/costeira-araucaria")({
  component: RouteComponent,
});
