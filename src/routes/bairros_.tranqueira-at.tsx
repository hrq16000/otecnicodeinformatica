import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/tranqueira-at"];

export const Route = createFileRoute("/bairros_/tranqueira-at")({
  component: RouteComponent,
});
