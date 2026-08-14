import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/cruzeiro"];

export const Route = createFileRoute("/bairros_/cruzeiro")({
  component: RouteComponent,
});
