import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/boa-vista-at"];

export const Route = createFileRoute("/bairros_/boa-vista-at")({
  component: RouteComponent,
});
