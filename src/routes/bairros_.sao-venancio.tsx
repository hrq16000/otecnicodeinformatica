import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-venancio"];

export const Route = createFileRoute("/bairros_/sao-venancio")({
  component: RouteComponent,
});
