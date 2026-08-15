import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/antonio-olivero-cm"];

export const Route = createFileRoute("/bairros_/antonio-olivero-cm")({
  component: RouteComponent,
});
