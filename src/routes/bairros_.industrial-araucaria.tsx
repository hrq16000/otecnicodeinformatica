import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/industrial-araucaria"];

export const Route = createFileRoute("/bairros_/industrial-araucaria")({
  component: RouteComponent,
});
