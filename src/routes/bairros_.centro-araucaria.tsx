import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/centro-araucaria"];

export const Route = createFileRoute("/bairros_/centro-araucaria")({
  component: RouteComponent,
});
