import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/colonia-antonio-prado"];

export const Route = createFileRoute("/bairros_/colonia-antonio-prado")({
  component: RouteComponent,
});
