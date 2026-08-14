import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/cachoeira-at"];

export const Route = createFileRoute("/bairros_/cachoeira-at")({
  component: RouteComponent,
});
