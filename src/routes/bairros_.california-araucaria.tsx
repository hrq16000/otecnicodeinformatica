import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/california-araucaria"];

export const Route = createFileRoute("/bairros_/california-araucaria")({
  component: RouteComponent,
});
