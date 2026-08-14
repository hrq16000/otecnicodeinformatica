import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/iguacu-araucaria"];

export const Route = createFileRoute("/bairros_/iguacu-araucaria")({
  component: RouteComponent,
});
