import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/rio-verde-cm"];

export const Route = createFileRoute("/bairros_/rio-verde-cm")({
  component: RouteComponent,
});
