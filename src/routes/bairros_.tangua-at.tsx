import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/tangua-at"];

export const Route = createFileRoute("/bairros_/tangua-at")({
  component: RouteComponent,
});
