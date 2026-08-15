import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/cachoeira-araucaria"];

export const Route = createFileRoute("/bairros_/cachoeira-araucaria")({
  component: RouteComponent,
});
